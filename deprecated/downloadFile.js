const axios = require('axios');
const fs = require('fs');
const sharp = require('sharp');

async function downloadFile(url, folderPath, fileName) {
    try {
        const res = await axios({
            url,
            responseType: 'stream',
        }).catch((err) => {
            console.log('axios get err', err);
        });
        if (!res) {
            console.log('axios failed');
            return;
        }

        const webpFile = `${folderPath}${fileName}.webp`;
        const storeResult = await new Promise((resolve, reject) => {
            res.data
                .pipe(fs.createWriteStream(webpFile))
                .on('finish', () => resolve(`${folderPath} created`))
                .on('error', (e) => reject(e));
        });

        const outputFile = `images/${fileName}.png`;
        const sharpResult = await sharp(webpFile).png().toFile(outputFile);
        console.log('done converting');
        return outputFile;
    } catch (error) {
        console.log('downloadFile -> error:', error);
    }
}

module.exports = { downloadFile };
