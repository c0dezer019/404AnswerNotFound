require('dotenv').config();


module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DEV_DB,
    host: process.env.HOST,
    dialect: 'postgres',
    encrypt: 'true'
  },
  test: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.TEST_DB,
    host: process.env.HOST,
    dialect: 'postgres',
    encrypt: 'true'
  },
  production: {
    use_heroku: true,
    dialect: 'postgres',
  },
}
