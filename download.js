export async function main(ns) {
  const gray = '\x1b[37m'
  const reset = "\u001b[0m"
  const { rootUrl } = ns.flags([['rootUrl', 'https://raw.githubusercontent.com/TTFreya/bitburner/main/']]);
  const folder = 'scripts';
  const files = [
    "fetchservers.js",
    "primer.js",
    "hwgw.js",
    "daemon.js"];

  ns.tail(); 
  
  let filesImported = true;
  for (let file of files) {
    const remoteFileName = `${rootUrl}scripts/${file}?t=${Date.now()}`;
    const result = await ns.wget(remoteFileName, `/${folder}/${file}`); // How do I get wget to shut up?
    filesImported = filesImported && result;
    ns.print(`${gray}File: ${file}: ${result ? '✓' : '✗'}${reset}`);
  }

  ns.print('='.repeat(20));
  if (filesImported) {
    ns.print('SUCCESS: Scripts have been downloaded.');
    ns.print(`INFO: You've installed these in the ${folder} directory.`);
    ns.print(`INFO: \'Run /${folder}/daemon.js\``); // Fix a text error here, replace with apostrophes at your own peril
  } else {
    ns.print('ERROR:File download failed.');
  }
}
