export async function main(ns) {
  const gray = '\x1b[37m'
  const files = [
    "fetchservers.js", // Throwing an error with assertion? Sometimes?
    "primer.js",
    "hwgw.js",
    "daemon.js"];
  let filesDeleted = true
  for (let file of files) {
    const removee = `scripts/${file}`
    const result = await ns.rm(removee);
    filesDeleted = filesDeleted && result
    // Update this to check for only outdated files rather than axing everything in /scripts/*
    ns.tprint(`${gray}Clearing Outdated File: ${file}: ${result ? '✔️' : '❌'}${reset}`);
  }

  if (filesDeleted) {
    ns.tprint('SUCCESS: Old scripts have been cleared successfully.');
    ns.tprint('INFO: Attempting to download updated files from the Git Repo.');
  } else {
    ns.tprint('ERROR: File clearing failed. Debug import.js');
  }

  ns.tprint('='.repeat(20));
  const rootUrl = 'https://raw.githubusercontent.com/TTFreya/bitburner/main/';
  const downloadFileName = `${rootUrl}download.js?t=${Date.now()}`;
  await ns.wget(downloadFileName, `download.js`);
  ns.run(`download.js`, 1, `--rootUrl=${rootUrl}`);
}
