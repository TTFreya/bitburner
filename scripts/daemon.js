/** @param {NS} ns */
// Daemon.

export async function main(ns) {
    ns.tail();
    await ns.getPortHandle(1); // This is the port that links to hwgw-batch. Not sure if this is needed.   
    
    for (let i = 1; i < 255; i++) {
      await ns.clearPort(i)
    } // 255 is an arbitrary number until I can figure out how to fetch all used ports
    
    
    
    
    if (await ns.readPort(1) == "2"); {
        await ns.clearPort(1);
    }
    if (await ns.readPort(1) == "NULL PORT DATA"); {
      // Import server code here
      await ns.writePort(1, "1") 
      ns.exec("scripts/fetchservers.js", "home");
      await ns.closeTail();
    }
  
  
  }
