/** @param {NS} ns */
// Our HWGW batch.
export async function main(ns) {
    ns.tail();
    await ns.getPortHandle(1); // This port connects to daemon.js. Not sure if this is line needed.
    await ns.getPortHandle(2); // This port connects to fetchservers.js. Not sure if this line is needed.
    await ns.getPortHandle(3); // This port connects to primer.js. Not sure if this line is needed.
    var dataRead = ns.readPort(3); // Needs Fixing
    var jsonStrRead = String.fromCharCode.apply(null, new Uint8Array(dataRead)); // Needs Fixing
    let server = JSON.parse(jsonStrRead); // Needs Fixing
    for (let i = 0; i < server.length; i++) {
            let hacktime = ns.getHackTime(server[i]);
            let growtime = hacktime * 3.2;
            let weaktime = hacktime * 4;
        
            ns.weaken(server[i]);
            await ns.sleep(20);
            ns.weaken(server[i]);
            await ns.sleep(weaktime - growtime + 20);
            ns.grow(server[i]);
            await ns.sleep(growtime - hacktime + 20);
            await ns.hack(server[i]);
    
    }
    await ns.writePort(1, "2");
  }
