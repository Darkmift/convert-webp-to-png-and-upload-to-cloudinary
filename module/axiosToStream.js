const Axios = require('Axios');
async function axiosToStream(url) {
    try {
        const res = await Axios({
            method: 'get',
            url,
            responseType: 'stream',
        });
        return res.data;
    } catch (err) {
        console.error('axios', err);
        return { err };
    }
}
module.exports = { axiosToStream };
