require('dotenv').config()

const DEVELOPMENT = require('./development')
const PRODUCTION = require('./production')
const { NODE_ENV } = process.env

let currentEnv = DEVELOPMENT

if (NODE_ENV === 'production') {
    currentEnv = PRODUCTION
}

module.exports = currentEnv