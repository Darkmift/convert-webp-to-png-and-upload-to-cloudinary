const axios = require('axios');
const fs = require('fs');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'livepublic',
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

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

function makeId(length = 5) {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const uploadImg = async (path, folderName, filename, ver) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            {
                public_id: `${ver}/${folderName}/${filename}`,
                tags: `livePublicImg,${ver}`,
            },
            function (err, image) {
                if (err) return resolve(err);
                console.log('file uploaded to Cloudinary');
                // remove file from server
                // const fs = require('fs');
                // fs.unlinkSync(path);
                // return image details
                resolve(image);
            }
        );
    });
};

module.exports = { downloadFile, uploadImg };
