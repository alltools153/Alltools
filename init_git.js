const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

async function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'dist' || file === 'build') {
      continue;
    }
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = await getAllFiles(fullPath, arrayOfFiles);
    } else {
      const relPath = path.relative(__dirname, fullPath).replace(/\\/g, '/');
      arrayOfFiles.push(relPath);
    }
  }

  return arrayOfFiles;
}

async function main() {
  const dir = __dirname;
  console.log('[+] Initializing local Git repository in:', dir);
  await git.init({ fs, dir, defaultBranch: 'main' });

  console.log('[+] Setting remote origin -> https://github.com/alltools153/Alltools.git');
  try {
    await git.removeRemote({ fs, dir, remote: 'origin' });
  } catch {}
  await git.addRemote({ fs, dir, remote: 'origin', url: 'https://github.com/alltools153/Alltools.git' });

  console.log('[+] Collecting project files...');
  const files = await getAllFiles(dir);
  console.log(`[+] Found ${files.length} source files to stage across all 3 projects.`);

  console.log('[+] Staging files into Git index...');
  for (const file of files) {
    await git.add({ fs, dir, filepath: file });
  }

  console.log('[+] Creating initial commit...');
  const sha = await git.commit({
    fs,
    dir,
    message: 'Initial commit: Age Milestone Calculator, Bengali Calendar Panjika, and VAPT Scanner Suite (Lead Architect: Santanu Batabyal)',
    author: {
      name: 'Santanu Batabyal',
      email: 'santanu.batabyal@users.noreply.github.com',
    },
  });

  console.log(`[✓] Commit successful! SHA: ${sha}`);
  console.log('[+] Current branch: main');
}

main().catch(console.error);
