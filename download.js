export async function main(ns) {
    const gray = '\x1b[37m'
    const reset = "\u001b[0m"
    const { rootUrl } = ns.flags([['rootUrl', 'https://raw.githubusercontent.com/TTFreya/bitburner/main/']]);
    const folder = 'scripts';
    const files = [
      "fetchservers.js",
      "primer.js",
      "hwgw.js",
      "daemon.js"
    ];
    const shutup = [
      "disableLog",
      "wget",
    ]
    function separate() {
      ns.print(`${gray}=`.repeat(50));
    }
    ns.tail();
    for (let command of shutup) {
      ns.disableLog(command)
    }
    separate();
    let filesImported = true;
    for (let file of files) {
      const remoteFileName = `${rootUrl}scripts/${file}?t=${Date.now()}`;
      const result = await ns.wget(remoteFileName, `/${folder}/${file}`); // ty Hydrogenious in the Bitburner `cord for telling me how to shut up wget
      filesImported = filesImported && result;
      ns.print(`${gray}File: ${file}: ${result ? '✓' : '✗'}${reset}`);
    }
    separate();
    if (filesImported) {
      ns.print(`${gray}SUCCESS: Scripts have been downloaded.`);
      ns.print(`${gray}INFO: You've installed these in the ${folder} directory.`);
      ns.print(`${gray}INFO: \Run /${folder}/daemon.js\``); // Fix a text error here, replace with apostrophes at your own peril
    } else {
      ns.print(`${gray}ERROR:File download failed.`);
    }
    separate();
  }
  