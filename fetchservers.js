/** @param {NS} ns */
export async function main(ns) {
    ns.getPortHandle(2); // This is the port that broadcasts the known server array to other documents. Used by: hwgw-batch.js
    const knownservers = ['home']; // Shoutout to Cald for the help with fixing an infinite loop here!
    for (let i = 0; i < knownservers.length; i++) {
        knownservers.push(...ns.scan(knownservers[i]).filter(server => !knownservers.includes(server) && !knownservers.includes("RAM")));
    } // The above script needs to be added onto to include optimal targeting when possible, but this isn't the priority right now.
}
