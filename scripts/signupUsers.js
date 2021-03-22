const Axios = require('Axios');
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
const userJson = require('./data/json/users.json');
async function main() {
    const url = 'http://localhost:3030/api/auth/signup';
    try {
        var userCollection = userJson;

        for (const user of userCollection) {
            const signupAttempt = await Axios.post(url, user);

            console.log(
                '🚀 ~ file: signupUsers.js ~ line 19 ~ main ~ signupAttempt',
                signupAttempt
            );
        }
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
