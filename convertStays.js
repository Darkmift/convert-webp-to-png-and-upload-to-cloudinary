const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
const stayJson = require('./data/json/stays.raw.json');
const userJson = require('./data/json/users.json');

async function main() {
    try {
        const users = userJson.map((user) => {
            const { _id, fullname, imgUrl } = user;
            return { _id, fullname, imgUrl };
        });

        const owner = {
            _id: '605882438a46640774775bf6',
            username: 'magic_jhonson',
            fullname: 'Magic Jhonson',
            imgUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
        };

        const { fullname, imgUrl, _id } = owner;

        var stayCollection = stayJson.map((stay) => {
            delete stay._id;
            stay.host = { fullname, imgUrl, _id };
            stay.reviews = stay.reviews.map((review) => {
                const randomuser = users[getRandomIntInclusive(5, 55)];
                const { fullname, imgUrl, _id } = randomuser;
                review.by = { fullname, imgUrl, _id };
                return review;
            });
            stay.likes = stay.likes.map((like) => {
                const randomuser = users[getRandomIntInclusive(5, 55)];
                const { _id } = randomuser;
                like.userId = _id;
                return like;
            });
            return stay;
        });
        console.log(
            '🚀 ~ file: convertstays.js ~ line 10 ~ main ~ stayCollection',
            jsonify(stayCollection)
        );
    } catch (error) {
        console.log('🚀 ~MAIN CATCH ERROR', error);
    }
}

main();

function jsonify(obj) {
    return JSON.stringify(obj, null, 2);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
