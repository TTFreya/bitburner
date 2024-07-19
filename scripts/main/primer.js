/** @param {NS} ns */
// Primes our found servers for our hwgw batch to work.
// Prime a server, then push the name of the server to port[3] [if it can be hacked].
export async function main(ns) {
    const shutup = [
      "disableLog",
      "getServerRequiredHackingLevel",
      "getHackingLevel",
      "getServerNumPortsRequired"
    ]
    for (let command of shutup) {
      ns.disableLog(command)
    }
    ns.tail();
    await ns.getPortHandle(2); // This is the port that connects to fetchservers.js.
    var dataRead = ns.readPort(2);
    var server = JSON.parse(dataRead);
    ns.tprint(typeof (server));
    ns.tprint(server);
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
      let nukeprog = 0
      if (ns.getServerRequiredHackingLevel(server[i]) <= ns.getHackingLevel()) {
        for (let j = 0; j < (prog.length) - 1; j++) {
          if (ns.fileExists(prog[j] + ".exe")) {
            nukeprog++
            progfunc[j](server[i]);
          }
          if (nukeprog >= ns.getServerNumPortsRequired(server[i])) {
            if (ns.fileExists(prog[5]) + ".exe") {
              progfunc[5](server[i]);
              var jsonStr = JSON.stringify(server[i]);
              ns.tprint(server[i], ' primed successfully. [✓]')
              ns.writePort(3, jsonStr);
              break;
            }
          } else {
            ns.tprint(server[i], ' prime failed. Moving on. [X]')
            break;
          }
        }
      }
      nukeprog = 0
    if (ns.peek(2) != "NULL PORT DATA") {
      ns.print("Prime parsing success (or false positives but shut up)!")
      ns.exec("scripts/main/hwgw.js", "home");
    }
    else {
      ns.print("Prime parsing failed. You should be able to hack SOMETHING, please debug.")
      ns.writePort(1, "ERROR");
      ns.exec("scripts/main/daemon.js", "home");
      
    await ns.closeTail();
    }
    }
  }