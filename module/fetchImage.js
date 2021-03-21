const Axios = require('Axios');
const fs = require('fs');
async function saveImageFromUrl(fileUrl, outputLocationPath) {
    if (fileUrl === '' || outputLocationPath === '') {
        return Promise.reject(
            'invalid args' + JSON.stringify({ fileUrl, outputLocationPath })
        );
    }

    return Axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
    })
        .catch((err) => {
            console.error('saveImageFromUrl', err);
            return { err };
        })
        .then(async (response) => {
            if (response.err) return Promise.reject(response.err);
            return new Promise((resolve, reject) => {
                var writeToFile = fs.createWriteStream(outputLocationPath);
                response.data.pipe(writeToFile);
                writeToFile.on('finish', () => {
                    resolve(outputLocationPath);
                });
                writeToFile.on('error', reject);
                // writeToFile.end();
            });
        });
}

module.exports = { saveImageFromUrl };
