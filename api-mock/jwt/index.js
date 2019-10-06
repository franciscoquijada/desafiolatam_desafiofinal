const fs = require('fs')
const jwt = require('jsonwebtoken')

const privateKey = fs.readFileSync('./keys/jwtRS256.key');
// const token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });
// console.log(token);

const sign = (username, callback) => {
    jwt.sign({ username: username }, privateKey, { algorithm: 'RS256' },
        callback,
    )
};

module.exports = sign;