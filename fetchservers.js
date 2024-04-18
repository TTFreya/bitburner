/** @param {NS} ns */
// Broadcasts every non-purchased server we can find to port[2]
export async function main(ns) {
    await ns.getPortHandle(2); // This is the port that broadcasts the known server array to other documents. Used by: primer.js.
    const knownservers = ['home']; // Shoutout to Cald for the help with fixing an bad loop here!
    for (let i = 0; i < knownservers.length; i++) {
        knownservers.push(...ns.scan(knownservers[i]).filter(server => !knownservers.includes(server) && !knownservers.includes("RAM")));
    } // The above script needs to be added onto to include optimal targeting when possible, but that isn't the priority right now.
    await ns.writePort(2, knownservers);
}
