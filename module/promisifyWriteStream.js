const fs = require('fs');
function promisifyWriteStream(readStream, writePath) {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(writePath);
        readStream.pipe(writeStream);

        writeStream.on('error', (err) => {
            fs.unlink(writePath);
            reject(err);
        });
        writeStream.on('finish', () => {
            writeStream.close(() => {
                resolve(writePath);
            });
        });
    });
}

module.exports = { promisifyWriteStream };
