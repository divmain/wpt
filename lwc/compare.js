import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import * as path from 'path';
import escape from 'escape-html';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFullPath = relPath => path.resolve(__dirname, relPath);

const { results: resultsMaster } = JSON.parse(readFileSync(getFullPath('../../report-master.json')));
const { results: resultsSS }= JSON.parse(readFileSync(getFullPath('../../report-synthetic-shadow.json')));


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

const wrapInDetails = (isOpenByDefault, summary, content) => `<details${ isOpenByDefault ? ' open' : ''}>${summary ? `<summary>${summary}</summary>` : ''}

${content}
</details>`;

const constructSubtestHTML = subtest => `<li>${subtest.name}
<ul>
  <li><b>Status:</b> ${subtest.status}</li>
  <li><b>Message:</b> <code>${escape(subtest.message)}</code></li>
</ul>`;

const constructTestHTML = ([testPath, subtestFailures]) => wrapInDetails(false, testPath, `
<ul>
${[...subtestFailures.values()].map(constructSubtestHTML).join('\n')}
</ul>
`);

const constructHTMLReport = (uniqueFailuresInMaster, uniqueFailuresWithSS) => `
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
    <a href="https://github.com/web-platform-tests/wpt)">Web Platform Tests</a>
    fails when
    <a href="https://github.com/salesforce/lwc/tree/master/packages/%40lwc/synthetic-shadow">@lwc/synthetic-shadow</a>
    is loaded prior to the test harness.<p>

    ${wrapInDetails(true, '<b>Failing with Polyfill Loaded</b>', `
      <p><b>Note:</b> These tests <i>pass</i> in master but fail when the
      synthetic shadow polyfill is loaded.</p>

      ${[...uniqueFailuresWithSS.entries()].map(constructTestHTML).join('\n')}
    `)}

    ${wrapInDetails(true, '<b>Fixed with Polyfill Loaded</b>', `

      <p><b>Note:</b> These tests <i>fail</i> in master but do not fail when the
      synthetic shadow polyfill is loaded.</p>

      ${[...uniqueFailuresInMaster.entries()].map(constructTestHTML).join('\n')}
    `)}

  </article>
</body>
</html>
`;

const failuresMaster = pickFailures(resultsMaster);
const failuresSS = pickFailures(resultsSS);
const uniqueFailuresInMaster = getUniqueFailures(failuresMaster, failuresSS);
const uniqueFailuresWithSS = getUniqueFailures(failuresSS, failuresMaster);

console.log(constructHTMLReport(uniqueFailuresInMaster, uniqueFailuresWithSS))
