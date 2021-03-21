const path = require('path');
const sharp = require('sharp');

const { makeId } = require('./module/makeId');
const { axiosToStream } = require('./module/axiosToStream');
const { promisifyWriteStream } = require('./module/promisifyWriteStream');

const INPUT_IMAGE_DIR = path.join(__dirname, 'data', 'images', 'input');
const OUTPUT_IMAGE_DIR = path.join(__dirname, 'data', 'images', 'output');

async function main() {
    try {
        console.log({ INPUT_IMAGE_DIR, OUTPUT_IMAGE_DIR });

        const filePath = path.join(INPUT_IMAGE_DIR, makeId() + '.png');
        const url =
            'https://www.rd.com/wp-content/uploads/2019/04/shutterstock_1013848126.jpg';

        const resStream = await axiosToStream(url);
        console.log('🚀 ~ file: server.js ~ line 26 ~ main ~ res', resStream);
        if (resStream.err) throw resStream.err;

        const transformer = sharp()
            .resize({
                width: 600,
                height: 400,
                fit: sharp.fit.cover,
                position: sharp.strategy.entropy,
            })
            .toFormat('png');

        const stream = resStream.pipe(transformer);
        const writeResult = await promisifyWriteStream(stream, filePath);

        console.log('done', writeResult);
    } catch (error) {
        console.log('🚀 ~MAIN CATCH ERROR', error);
    }
}

main();
