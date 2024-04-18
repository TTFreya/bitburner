/** @param {NS} ns */
// Write a script that consistently deploys a HWGW batch such that each job finishes in the correct order and within 20ms of each other and successfully returns the server to a prepped state.

export async function main(ns) {
    ns.getPortHandle(1); // This is the port that links to hwgw-batch. Not sure if this is needed. 
    ns.clearPort(1); // This is the port that links to hwgw-batch.
    if ( ns.readPort(1) == "2"); { // There's probably a better way to handle this.
        ns.clearPort(1);
    }
    if ( ns.readPort(1) == "NULL PORT DATA");
      // Import server code here
      ns.writePort(1, "1") // Not sure if this is needed, just want to avoid an infinite loop.
      ns.exec("hwgw-batch.js", "home");
  
  
  }