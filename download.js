export async function main(ns) {
    const { rootUrl } = ns.flags([['rootUrl', 'https://raw.githubusercontent.com/TTFreya/bitburner/main/']]); 
    const folder = 'scripts';

    const files = [
        "fetchservers.js",
        "primer.js",
        "hwgw.js",
        "daemon.js"
    ];
    
    let filesImported = true;
    for (let file of files) {
        const remoteFileName = `${rootUrl}scripts/${file}?t=${Date.now()}`;
        const result = await ns.wget(remoteFileName, `/${folder}/${file}`);
        filesImported = filesImported && result;
        ns.tprint(`File: ${file}: ${result ? '✔️' : '❌'}`);
    }

    ns.tprint('='.repeat(20));
    
    if (filesImported) {
        ns.tprint('Scripts have been downloaded.');
        ns.tprint(`You've installed these in the ${folder} directory.`);
        ns.tprint(`\`Run /${folder}/daemon.js\``);
    } else {
        ns.tprint('File download failed.');
    }
}