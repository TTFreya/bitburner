/** @param {NS} ns */
// Primes our found servers for our hwgw batch to work.
// Prime a server, then push the name of the server to port[3].
export async function main(ns) {
    await ns.getPortHandle(2); // This is the port that connects to fetchservers.js. Not sure if this line is needed.
    var dataRead = ns.readPort(2);
    var jsonStrRead = String.fromCharCode.apply(null, new Uint8Array(dataRead));  // 100% a better way to do this btw
    var server = JSON.parse(jsonStrRead);  // 100% a better way to do this btw
    let prog = [
        "BruteSSH",
        "FTPCrack",
        "HTTPWorm",
        "SQLInject",
        "RelaySMTP",
        "NUKE"
    ];
    let progfunc = [
        ns.brutessh,
        ns.ftpcrack,
        ns.httpworm,
        ns.sqlinject,
        ns.relaysmtp,
        ns.nuke
    ];
    
    for (let i = 0; i < server.length; i++) {
        if (ns.getServerRequiredHackingLevel(server[i]) <= ns.getHackingLevel()) {
            for (let j = 0; j < prog.length; j++) {
                if (ns.fileExists(prog[j] - "()" + ".exe")) {
                    progfunc[j](server[i]);
                }
            }
        }
        var jsonStr = JSON.stringify(server[i]);  // 100% a better way to do this btw
        ns.writePort(3, jsonStr);  // 100% a better way to do this btw
        ns.exec("scripts/hwgw.js", "home");
    }
}
