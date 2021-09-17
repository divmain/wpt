import { opendir, writeFile } from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { exec as _exec } from 'child_process';
import { promisify } from 'util';

const exec = promisify(_exec);

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootPath = path.resolve(__dirname, '..');
//                  <script src="/resources/testharness.js"></script>
const harnessTag = '<script src="/resources/testharness.js"></script>';
const syntheticShadowTag = '<script src="/resources/synthetic-shadow.js"></script>\n';

async function* findHtmlFiles (basePath) {
  const directory = await opendir(basePath);

  for await (const dirEntry of directory) {
    const fullPath = path.join(basePath, dirEntry.name);
    if (dirEntry.isDirectory()) {
      yield* findHtmlFiles(fullPath);
    }
    if (
      dirEntry.isFile() &&
      (dirEntry.name.endsWith('.html') || dirEntry.name.endsWith('.htm'))
    ) {
      yield fullPath;
    }
  }
}

async function* getPathPairs (rootPath, fullPaths) {
  for await (const fullPath of fullPaths) {
    yield [
      path.relative(rootPath, fullPath),
      fullPath,
    ];
  }
}

async function getSourceFromMaster (relPath) {
  try {
    const { stdout } = await exec(`git show master:${relPath}`, {
      cwd: rootPath,
      shell: true,
    });
    return stdout;
  } catch (err) {
    if (err.stderr) {
      throw new Error(err.stderr);
    } else {
      throw new Error(`Unknown error for file: ${relPath}`)
    }
  }
}

function insertSyntheticShadowDependency (originalSource, relPath) {
  const harnessTagIdx = originalSource.indexOf(harnessTag);
  if (harnessTagIdx === -1) {
    return originalSource;
  }
  return `${originalSource.slice(0, harnessTagIdx)}${syntheticShadowTag}${originalSource.slice(harnessTagIdx)}`;
}

(async function main () {
  const htmlFileFullPaths = findHtmlFiles(rootPath)
  for await (const [relPath, fullPath] of getPathPairs(rootPath, htmlFileFullPaths)) {
    process.stdout.write(`processing ${relPath}... `);
    try {
      const originalSource = await getSourceFromMaster(relPath);
      const newSource = insertSyntheticShadowDependency(originalSource, relPath);
      await writeFile(fullPath, newSource);
      console.log(originalSource === newSource ? 'skipped.' : 'done.');
    } catch (err) {
      console.log(err)
    }
  }
})();
