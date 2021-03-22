const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
const userJson = require('./data/json/users.raw.json');
async function main() {
    try {
        var userCollection = userJson.results.map((user) => {
            const {
                name: { first, last },
                login: { username },
                picture: { large },
            } = user;
            return {
                username: (first + '_' + last).toLowerCase(),
                fullname: first + ' ' + last,
                imgUrl: large,
                password: '12345',
            };
        });
        console.log(
            '🚀 ~ file: convertUsers.js ~ line 10 ~ main ~ userCollection',
            jsonify(userCollection)
        );
    } catch (error) {
        console.log('🚀 ~MAIN CATCH ERROR', error);
    }
}

/***
 *     "username": "userone",
    "fullname": "John Doe",
    "imgUrl": "https://randomuser.me/api/portraits/women/47.jpg"
 */

main();

function jsonify(obj) {
    return JSON.stringify(obj, null, 2);
}
