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
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  }
}
