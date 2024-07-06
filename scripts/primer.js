/** @param {NS} ns */
// Primes our found servers for our hwgw batch to work.
// Prime a server, then push the name of the server to port[3] [if it can be hacked].
export async function main(ns) {
    ns.tail();
    await ns.getPortHandle(2); // This is the port that connects to fetchservers.js.
    var dataRead = ns.readPort(2);
    var server = JSON.parse(dataRead); 
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
    let nukeprog = 0
    let isbreaking = 0
    for (let i = 0; i < server.length; i++) {
        if (ns.getServerRequiredHackingLevel(server[i]) <= ns.getHackingLevel()) {
            for (let j = 0; j < (prog.length) - 1; j++) {
                if (ns.fileExists(prog[j] - "()" + ".exe")) {
                    nukeprog++
                    progfunc[j](server[i]);
                } 
                if (nukeprog >= ns.getServerNumPortsRequired(server[i])) {
                    if (ns.fileExists(prog[5]) - "()" + ".exe") {
                        progfunc[5](server[i]);
                    }
                } else {
                    isbreaking = 1
                    break;
                }
            }
        }
        nukeprog = 0
        if (isbreaking = 0) {
            var jsonStr = JSON.stringify(server[i]);
            ns.print(server[i], ' primed successfully. [✓]')
            ns.writePort(3, jsonStr);
            ns.exec("scripts/hwgw.js", "home");
        } else {
            ns.print(server[i], ' prime failed. Moving on. [X]')
        }
    }
}