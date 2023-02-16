const jwt = require('jsonwebtoken');
const uuid4 = require('uuid4');
const dotenv = require('dotenv')
dotenv.config()

const app_access_key = process.env.ACCESS_KEY;
const app_secret = process.env.SECRET;

const getManagementToken = async () => {
    
    const token = await jwt.sign(
        {
            access_key: app_access_key,
            type: 'management',
            version: 2,
            iat: Math.floor(Date.now() / 1000),
            nbf: Math.floor(Date.now() / 1000)
        },
        app_secret,
        {
            algorithm: 'HS256',
            expiresIn: '24h',
            jwtid: uuid4()
        },
        (err, token) => {
            console.log(token);
        }
    ) 
    return token;
}

module.exports = getManagementToken;