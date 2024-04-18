/** @param {NS} ns */
// Primes our found servers for our hwgw batch to work.
// Prime a server, then push the name of the server to port[3].
export async function main(ns) {
    servers = ns.getPortHandle(2); // This is the port that connects to fetchservers.js. Not sure if this line is needed.
    for (let i = 0; i < servers.length; i++) {
        
    }
}