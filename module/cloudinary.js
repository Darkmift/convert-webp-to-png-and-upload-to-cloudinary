const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'livepublic',
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const cloudinaryUploadFile = async (
    path,
    cloudFolderName,
    cloudFileName,
    ver
) => {
    if (
        path === '' ||
        cloudFolderName === '' ||
        cloudFileName === '' ||
        ver === ''
    ) {
        return Promise.reject(
            'empty args detected' +
                JSON.stringify({
                    path,
                    folderName: cloudFolderName,
                    filename: cloudFileName,
                    ver,
                })
        );
    }
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            {
                public_id: `${ver}/${cloudFolderName}/${cloudFileName}`,
                tags: `livePublicImg,${ver}`,
                format: 'png',
                overwrite: false,
            },
            function (err, image) {
                if (err) return resolve({ err, errMsg: 'failed to upload' });
                console.log('file uploaded to Cloudinary');
                resolve(image);
            }
        );
    });
};

function streamToCloudinary(readStream, options = {}) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {options},
            function (err, image) {
                if (err) {
                    console.error('failed streaming to cloudinary', err);
                    reject(err);
                }
                resolve(image);
            }
        );

        readStream.pipe(uploadStream);
    });
}
module.exports = { cloudinaryUploadFile, streamToCloudinary };
