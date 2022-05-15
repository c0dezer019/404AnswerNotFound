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
     heroku: {
       username: process.env.H_USERNAME,
       password: process.env.H_PASSWORD,
       database: process.env.H_DB,
       host: process.env.H_HOST,
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
          username: process.env.USERNAME,
          password: process.env.PASSWORD,
          database: process.env.PROD_DB,
          host: process.env.HOST,
          dialect: 'postgres',
          encrypt: 'true'
     }
}
