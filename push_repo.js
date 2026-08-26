const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (ans) => {
      rl.close();
      resolve(ans.trim());
    });
  });
}

async function main() {
  const dir = __dirname;
  let username = process.argv[2];
  let password = process.argv[3];

  if (!username) {
    username = await prompt('Enter GitHub Username or Personal Access Token: ');
  }

  // If username looks like a token (starts with ghp_ or github_pat_ or no password given)
  if (!password) {
    if (username.startsWith('ghp_') || username.startsWith('github_pat_') || username.length > 30) {
      password = '';
    } else {
      password = await prompt('Enter GitHub Password / Personal Access Token: ');
    }
  }

  console.log('[+] Initiating push to https://github.com/alltools153/Alltools.git on branch main...');

  try {
    const pushResult = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      ref: 'main',
      force: true,
      onAuth: () => {
        return {
          username: username,
          password: password || '',
        };
      },
    });

    console.log('[✓] SUCCESS: All 3 projects pushed to https://github.com/alltools153/Alltools.git');
    console.log(pushResult);
  } catch (err) {
    console.error('[!] Push error:', err.message);
    if (err.data) {
      console.error('[!] Response details:', err.data);
    }
  }
}

main();
