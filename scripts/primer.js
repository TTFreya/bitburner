/** @param {NS} ns */
// Primes our found servers for our hwgw batch to work.
// Prime a server, then push the name of the server to port[3] [if it can be hacked].
export async function main(ns) {
    ns.tail();
    await ns.getPortHandle(2); // This is the port that connects to fetchservers.js.
    var dataRead = ns.readPort(2);
    ns.print("dataRead defined as: ", dataRead);
    var jsonStrRead = String.fromCharCode.apply(null, new Uint8Array(dataRead)); // ! ERROR IS HERE !
    ns.print("jsonStrRead defined as: ", jsonStrRead);
    var server = JSON.parse(jsonStrRead); 
    ns.print("server defined as: ", server);
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
    let isbreaking = False
    for (let i = 0; i < server.length; i++) {
        if (ns.getServerRequiredHackingLevel(server[i]) <= ns.getHackingLevel()) {
            for (let j = 0; j < (prog.length) - 1; j++) {
                if (ns.fileExists(prog[j] - "()" + ".exe")) {
                    nukeprog++
                    progfunc[j](server[i]);
                }
                if (ns.getServerNumberPortsRequired(server[i]) > nukeprog) {
                    isbreaking = True
                    break;
                }
            }
        }
        if (isbreaking = False) {
            var jsonStr = JSON.stringify(server[i]); // Needs Fixing
            ns.writePort(3, jsonStr);  // Needs Fixing
            ns.exec("scripts/hwgw.js", "home");
        } else {
            break;
        }
    }
}

// ! OVERSIGHT !
// 
// The script pushes servers to port 3 regardless of whether or not they can be backdoored / hacked with the number of ports opened.
//
// ! OVERSIGHT !
// ! DEBUGGING !
//
// SYNTAX ERROR
// scripts/primer.js@home (PID - 6)
//
// Unexpected end of JSON input (sorry we can't be more helpful)
//
// ! DEBUGGING !