export async function main(ns) {
    const rootUrl = 'https://raw.githubusercontent.com/TTFreya/bitburner/main/';
    const downloadFileName = `${rootUrl}download.js?t=${Date.now()}`;
    await ns.wget(downloadFileName, `download.js`);
    ns.run(`download.js`, 1, `--rootUrl=${rootUrl}`);
  }