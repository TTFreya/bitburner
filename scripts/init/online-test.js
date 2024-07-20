/** @param {NS} ns */
export async function main(ns) {
    await ns.getPortHandle(4);
    const gray = '\x1b[37m'
    const reset = '\u001b[0m'
    const files = [
        "test.txt"
    ];
    let online = true;
    for (let file of files) {
      const remoteFileName = `${rootUrl}${file}?t=${Date.now()}`;
      const result = await ns.wget(remoteFileName, `/${folder}/${file}`);
      online = online && result;
      ns.print(`${gray}Online Test: ${result ? '✓' : '✗'}${reset}`);
    }
    if (online == true) {
        ns.exec("scripts/init/online-fetching/online-import.js", "home");
    } else {
        ns.exec("scripts/init/offline-fetching/offline-import.js", "home");
    }

}