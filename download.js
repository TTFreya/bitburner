export async function main(ns) {
  const { rootUrl } = ns.flags([['rootUrl', 'https://raw.githubusercontent.com/TTFreya/bitburner/main/']]);
  const folder = 'scripts';
  const files = [
    "fetchservers.js",
    "primer.js",
    "hwgw.js",
    "daemon.js"];
  let filesImported = true;
  for (let file of files) {
    const remoteFileName = `${rootUrl}scripts/${file}?t=${Date.now()}`;
    const result = await ns.wget(remoteFileName, `/${folder}/${file}`);
    filesImported = filesImported && result;
    ns.tprint(`File: ${file}: ${result ? '✔️' : '❌'}`);
  }
  ns.tprint('='.repeat(20));
  if (filesImported) {
    ns.tprint('SUCCESS: Scripts have been downloaded.');
    ns.tprint(`INFO: You've installed these in the ${folder} directory.`);
    ns.tprint(`INFO: \'Run /${folder}/daemon.js\``); // Fix a text error here, replace with apostrophes at your own peril
  } else {
    ns.tprint('ERROR:File download failed.');
  }
}
