require('dotenv').config()

module.exports = {
    port: process.env.port,
    secretKey: process.env.secretKey,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    HOSTURL: process.env.HOSTURL
}