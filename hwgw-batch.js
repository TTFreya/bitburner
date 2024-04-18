/** @param {NS} ns */
// Write a script that consistently deploys a HWGW batch such that each job finishes in the correct order and within 20ms of each other and successfully returns the server to a prepped state.
// Weaken: 0
// Weaken II: 20
// Grow: weaktime - growtime + 20
// Hack: growtime - hacktime + 20

export async function main(ns) {
    ns.getPortHandle(1); // This port connects to our daemon. Not sure if this is needed.
    ns.getPortHandle(2); // This port connects to fetchservers.js. Not sure if this is needed.
    
    let hacktime = ns.getHackTime(); // PH
    let growtime = hacktime * 3.2;
    let weaktime = hacktime * 4;
  
    ns.weaken(); // PH
    await ns.sleep(20);
    ns.weaken(); // PH
    await ns.sleep(weaktime - growtime + 20);
    ns.grow(); // PH
    await ns.sleep(growtime - hacktime + 20);
    await ns.hack(); // PH
  
    ns.writePort(1, "2");
  }