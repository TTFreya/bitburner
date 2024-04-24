/** @param {NS} ns */
// Primes our found servers for our hwgw batch to work.
// Prime a server, then push the name of the server to port[3].
export async function main(ns) {
    await ns.getPortHandle(2);
    let server = JSON.parse(ns.readPort(2)); // This is the port that connects to fetchservers.js. Not sure if this line is needed.
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
        ns.writePort(3, JSON.stringify(server[i]));
        ns.exec("hwgw.js", "home");
    }
}