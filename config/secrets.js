const getSecretValue = require('../services/secretManagerServices.js')

const secretName = process.env.SECRT_NAME || "QuickServe";
console.log(secretName);

let secretCache = null 

const loadSecrets = async () => {
    if(!secretCache){
        secretCache = await getSecretValue(secretName)
    }
    return secretCache
}


module.exports = loadSecrets