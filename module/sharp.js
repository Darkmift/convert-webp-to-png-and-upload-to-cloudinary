const sharp = require('sharp');

function convertToPng(inputFilePath, size, outputFilePath) {
    if (!inputFilePath || !outputFilePath)
        Promise.reject(
            'invalid args' + JSON.stringify({ inputFilePath, outputFilePath })
        );
    const { width, height } = size;
    if ((size && isNaN(width)) || isNaN(height)) {
        Promise.reject('invalid size' + JSON.stringify({ width, height }));
    }

    var image = sharp(inputFilePath);
    if (width && height) {
        image.resize({ width, height });
    }
    return image
        .png()
        .toFile(outputFilePath)
        .then((info) => {
            console.log(JSON.stringify(info));
        });
}

module.exports = { convertToPng };
