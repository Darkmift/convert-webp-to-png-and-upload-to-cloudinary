const result = require('dotenv').config();

if (result.error) {
    throw result.error;
}
const imgJson = require('./data/src.json');
if (!imgJson) {
    throw new Error('Is there a json?');
}
const { downloadFile, uploadImg } = require('./downloadFile');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
    try {
        const urls = imgJson.map((obj) => obj.src);
        var count = 1;
        console.log({ urls, length: urls.length });
        for (const homeImgs of urls) {
            const folderName = 'house_';
            let nCount = 1;
            for (const url of homeImgs) {
                const path = `${folderName + count}_${'' + nCount}`;
                const res = await downloadFile(url, 'converted/', path);

                if (!res) {
                    console.log('res bad:', res);
                    continue;
                }
                await delay(100);
                const folderPath = folderName + count;
                console.log({
                    res,
                    folderPath,
                    path,
                });
                uploadImg(res, folderPath, '' + nCount, 'v1.9');
                nCount++;
            }
            count++;
            console.log('done folder', count);
        }
        console.log('done');
    } catch (error) {
        console.log('🚀 ~ file: index.js ~ line 43 ~ main ~ error', error);
    }
}

main();
