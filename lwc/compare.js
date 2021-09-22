import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import * as path from 'path';
import escape from 'escape-html';


const pickFailures = results => {
  const testFailures = new Map();

  for (const entry of results) {
    if (entry.status === 'SKIP') {
      continue;
    }

    let subtestFailures;
    for (const subtest of entry.subtests) {
      if (subtest.status === 'PASS' || subtest.status === 'NOTRUN') {
        continue;
      }
      subtestFailures = subtestFailures || new Map();
      subtestFailures.set(subtest.name, subtest);
    }

    if (subtestFailures) {
      testFailures.set(entry.test, subtestFailures);
    }
  }
  return testFailures;
};

const getUniqueFailures = (failuresA, failuresB) => {
  const onlyInA = new Map();

  for (const [test, testFailures] of failuresA) {
    if (failuresB.has(test)) {
      let subtestFailuresOnlyInA;
      const subtestFailuresB = failuresB.get(test);

      for (const [subtest, subtestEntry] of testFailures) {
        if (!subtestFailuresB.has(subtest)) {
          if (!subtestFailuresOnlyInA) {
            subtestFailuresOnlyInA = new Map();
          }
          subtestFailuresOnlyInA.set(subtest, subtestEntry);
        }
      }

      if (subtestFailuresOnlyInA) {
        onlyInA.set(test, subtestFailuresOnlyInA);
      }
    } else {
      onlyInA.set(test, testFailures);
    }
  }

  return onlyInA;
};

const wrapInDetails = (isOpenByDefault, summary, content, inlineStyles) =>
  `<details${isOpenByDefault ? ' open' : ''}${inlineStyles ? ` style="${inlineStyles}"` : ''}>
    ${summary ? `<summary>${summary}</summary>` : ''}
    ${content}
  </details>`;

const constructSubtestHTML = subtest => `
  <li>
    <b>${escape(subtest.name)}</b>
    <ul style="padding-left: 24px;">
      <li><b>Status:</b> ${subtest.status}</li>
      <li><b>Message:</b> <code>${escape(subtest.message)}</code>
    </ul>
  </li>
`;

const insertTestFailures = (parent, pathSegments, subtestFailures) => {
  if (pathSegments.length === 1) {
    parent[pathSegments[0]] = subtestFailures;
  } else {
    const childKey = pathSegments[0];
    const child = parent[childKey] = parent[childKey] || {};
    insertTestFailures(child, pathSegments.slice(1), subtestFailures);
  }
};

const createFailureTree = failures => {
  const root = {};
  for (const [test, subtestFailures] of failures.entries()) {
    const pathSegments = test.split('/');
    insertTestFailures(root, pathSegments, subtestFailures);
  }
  return root;
};

const constructFailureTreeHTML = root => {
  if (root instanceof Map) {
    return `<ul>
      ${[...root.values()].map(constructSubtestHTML).join('\n      ')}
    </ul>`;
  } else {
    return Object.keys(root).map(
      pathSegment => wrapInDetails(
        false,
        `<i>${pathSegment}${root[pathSegment] instanceof Map ? '' : '/'}</i>`,
        constructFailureTreeHTML(root[pathSegment]),
        'padding-left: 24px;'
      )
    ).join('\n');
  }
};

const countTests = results => {
  let numTests = 0;
  let numSubtests = 0;
  for (const entry of results) {
    numTests += 1;
    numSubtests += entry.subtests.length;
  }
  return { numTests, numSubtests };
};

const countFailures = failures => {
  let numFailedTests = 0;
  let numFailedSubtests = 0;
  for (const subtestFailures of failures.values()) {
    numFailedTests += 1;
    numFailedSubtests += [...subtestFailures.values()].length
  }
  return { numFailedTests, numFailedSubtests };
};

const constructSummaryHTML = metadata => `
  <div class="summary">
    <h2>Summary</h2>
    <ul>
      <li>A total of ${metadata.total.numTests.toLocaleString()} tests were run with ${metadata.total.numSubtests.toLocaleString()} sub-tests.</li>
      <li>
        On master (no polyfill):
        <ul>
          <li>a total of ${metadata.withoutSyntheticShadow.overall.numFailedTests.toLocaleString()} tests and ${metadata.withoutSyntheticShadow.overall.numFailedSubtests.toLocaleString()} subtests failed.</li>
          <li>of those, some tests <i>did not</i> fail when the polyfill is present: ${metadata.withoutSyntheticShadow.unique.numFailedTests.toLocaleString()} tests and ${metadata.withoutSyntheticShadow.unique.numFailedSubtests.toLocaleString()} subtests.</li>
        </ul>
      </li>
      <li>
        With the synthetic shadow polyfill present, a total of ${metadata.withSyntheticShadow.overall.numFailedTests.toLocaleString()} tests and ${metadata.withSyntheticShadow.overall.numFailedSubtests.toLocaleString()} subtests failed.
        <ul>
          <li>a total of ${metadata.withSyntheticShadow.overall.numFailedTests.toLocaleString()} tests and ${metadata.withSyntheticShadow.overall.numFailedSubtests.toLocaleString()} subtests failed.</li>
          <li>of those, some tests <i>did not</i> fail without the polyfill: ${metadata.withSyntheticShadow.unique.numFailedTests.toLocaleString()} tests and ${metadata.withSyntheticShadow.unique.numFailedSubtests.toLocaleString()} subtests.</li>
        </ul>
      </li>
    </ul>
  </div>
`;

const constructHTMLReport = (uniqueFailuresInMaster, uniqueFailuresWithSS, summaryHTML) => {
  const failureTreeMaster = createFailureTree(uniqueFailuresInMaster);
  const failureTreeSS = createFailureTree(uniqueFailuresWithSS);

  return `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css">
      <style>
        .markdown-body {
          box-sizing: border-box;
          min-width: 200px;
          max-width: 980px;
          margin: 0 auto;
          padding: 45px;
        }

        @media (max-width: 767px) {
          .markdown-body {
            padding: 15px;
          }
        }
      </style>
    </head>
    <body>
      <article class="markdown-body">
        <h1>Web Platform Tests with Synthetic Shadow Polyfill</h1>

        <p>The following report details which of the
        <a href="https://github.com/web-platform-tests/wpt">Web Platform Tests</a>
        fails when
        <a href="https://github.com/salesforce/lwc/tree/master/packages/%40lwc/synthetic-shadow">@lwc/synthetic-shadow</a>
        is loaded prior to the test harness.<p>

        ${summaryHTML}

        <h2>Failure Details</h2>

        ${wrapInDetails(false, '<b>Failing with Polyfill Loaded</b>', `
          <p style="padding-left: 24px;"><i>These tests <b>pass</b> in master but fail when the
          synthetic shadow polyfill is loaded.</i></p>

          ${constructFailureTreeHTML(failureTreeMaster)}
        `)}

        ${wrapInDetails(false, '<b>Fixed with Polyfill Loaded</b>', `

          <p style="padding-left: 24px;"><i>These tests <b>fail</b> in master but do not fail when the
          synthetic shadow polyfill is loaded.</i></p>

          ${constructFailureTreeHTML(failureTreeSS)}
        `)}

      </article>
    </body>
    </html>
  `;
};

(() => {
  let [ , , pathMaster, pathSS ] = process.argv;
  if (!pathMaster || !pathSS) {
    throw new Error('You must provide two arguments: master-report.json synthetic-shadow-report.json');
  }

  pathMaster = path.resolve(process.cwd(), pathMaster);
  pathSS = path.resolve(process.cwd(), pathSS);

  const { results: resultsMaster } = JSON.parse(readFileSync(pathMaster));
  const { results: resultsSS } = JSON.parse(readFileSync(pathSS));
  
  const failuresMaster = pickFailures(resultsMaster);
  const failuresSS = pickFailures(resultsSS);
  const uniqueFailuresInMaster = getUniqueFailures(failuresMaster, failuresSS);
  const uniqueFailuresWithSS = getUniqueFailures(failuresSS, failuresMaster);

  const summaryMetadata = {
    total: countTests(resultsMaster),
    withSyntheticShadow: {
      overall: countFailures(failuresSS),
      unique: countFailures(uniqueFailuresWithSS),
    },
    withoutSyntheticShadow: {
      overall: countFailures(failuresMaster),
      unique: countFailures(uniqueFailuresInMaster),
    },
  };

  const reportHtml = constructHTMLReport(
    uniqueFailuresInMaster,
    uniqueFailuresWithSS,
    constructSummaryHTML(summaryMetadata),
  );

  console.log(reportHtml);
})();


