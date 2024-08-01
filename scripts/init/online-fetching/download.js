/** @param {NS} ns */
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
    const shutup = [ // kudos Hydrogenious
      "disableLog",
      "wget",
    ]
    for (let command of shutup) {
      ns.disableLog(command)
    }
    function separate() {
      ns.print(`${gray}=`.repeat(50));
    }
    ns.tail();
    separate();
    let filesImported = true;
    for (let file of files) {
      const remoteFileName = `${rootUrl}scripts/main/${file}?t=${Date.now()}`;
      const result = await ns.wget(remoteFileName, `/${folder}/${file}`);
      filesImported = filesImported && result;
      ns.print(`${gray}File: ${file}: ${result ? '✓' : '✗'}${reset}`);
    }
    separate();
    if (filesImported) {
      ns.print(`${gray}SUCCESS: Scripts have been downloaded.`);
      ns.print(`${gray}INFO: You've installed these in the ${folder} directory.`);
      ns.print(`${gray}INFO: Run /${folder}/daemon.js`);
    } else {
      ns.print(`${gray}ERROR:File download failed.`);
    }
    separate();
    await ns.closeTail();
  }
  