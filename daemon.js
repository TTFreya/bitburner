/** @param {NS} ns */
// Daemon.

export async function main(ns) {
    await ns.getPortHandle(1); // This is the port that links to hwgw-batch. Not sure if this is needed.   
    
    for (let i = 1; i < 255; i++) {
      await ns.clearPort(i)
    }// 255 is an arbitrary number until I can figure out how to fetch all used ports
    
    
    
    
    if (await ns.readPort(1) == "2"); { // There's probably a better way to handle this.
        await ns.clearPort(1);
    }
    if (await ns.readPort(1) == "NULL PORT DATA"); {
      // Import server code here
      await ns.writePort(1, "1") // Not sure if this is needed, just want to avoid an infinite loop.
      ns.exec("fetchservers.js", "home");
    }
  
  
  }