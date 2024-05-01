export async function main(ns) {
  const gray = '\x1b[37m'
  const reset = '\u001b[0m'
  const files = [
    "fetchservers.js", // Throwing an error with assertion? Sometimes?
    "primer.js",
    "hwgw.js",
    "daemon.js"];
  let filesDeleted = true
  
  ns.tail();

  for (let file of files) {
    const removee = `scripts/${file}`
    const result = await ns.rm(removee);
    filesDeleted = filesDeleted && result
    // Update this to check for only outdated files rather than axing everything in /scripts/*
    ns.print(`${gray}Clearing Outdated File: ${file}: ${result ? '✓' : '✗'}${reset}`);
  }

  if (filesDeleted) {
    ns.print('SUCCESS: Old scripts have been cleared successfully.');
    ns.print('INFO: Attempting to download updated files from the Git Repo.');
  } else {
    ns.print(`ERROR: File clearing failed. Debug import.js if this isn't your first time running this.`);
  }

  ns.print(${gray}'='.repeat(20));
  const rootUrl = 'https://raw.githubusercontent.com/TTFreya/bitburner/main/';
  const downloadFileName = `${rootUrl}download.js?t=${Date.now()}`;
  const dljsresult = await ns.wget(downloadFileName, `download.js`); // How do I get wget to shut up?
  ns.print(`${gray}Downloading File: download.js: ${dljsresult ? '✓' : '✗'}${reset}`);
  ns.run(`download.js`, 1, `--rootUrl=${rootUrl}`);
}

// Add an updater for import.js
