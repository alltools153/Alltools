const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');

const IGNORED = new Set([
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  '__pycache__',
  '.turbo',
  '.cache',
  'package-lock.json.bak'
]);

function getAllFiles(dirPath, rootDir, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (IGNORED.has(file) || file.endsWith('.pyc') || file.endsWith('.tsbuildinfo')) {
      continue;
    }
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, rootDir, arrayOfFiles);
    } else {
      const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
      arrayOfFiles.push(relPath);
    }
  }

  return arrayOfFiles;
}

async function main() {
  const dir = __dirname;
  console.log('[+] Collecting files in:', dir);
  const files = getAllFiles(dir, dir);
  console.log(`[+] Staging ${files.length} project files...`);

  for (const file of files) {
    await git.add({ fs, dir, filepath: file });
  }

  console.log('[+] Creating commit...');
  const sha = await git.commit({
    fs,
    dir,
    message: 'Update AllTools: unified multi-tool suite with JSON converter, Dev micro-tools, Bengali calendar, age milestone calculator, and VAPT scanner',
    author: {
      name: 'Santanu Batabyal',
      email: 'santanu.batabyal@users.noreply.github.com',
    },
  });

  console.log(`[✓] Commit successful! SHA: ${sha}`);
}

main().catch(err => {
  console.error('[!] Error:', err);
  process.exit(1);
});
