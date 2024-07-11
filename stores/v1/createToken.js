const jwt = require('jsonwebtoken')

function createJWTokenFunction(userObj, secretKey) {
    const userJWT = jwt.sign(userObj,
    secretKey,
    {
        algorithm: 'RS256',
        expiresIn: '1h'
    }
    )
    return userJWT
}

module.exports = createJWTokenFunction