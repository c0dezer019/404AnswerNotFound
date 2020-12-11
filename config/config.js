require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.AZURE_USER,
    "password": process.env.AZURE_PASS,
    "database": process.env.AZURE_DB,
    "host": process.env.AZURE_SERVER,
    "dialect": "mssql",
    "encrypt": "true"
  },
  "test": {
    "username": process.env.AZURE_USER,
    "password": process.env.AZURE_PASS,
    "database": process.env.AZURE_DB,
    "host": process.env.AZURE_SERVER,
    "dialect": "mssql"
  },
  "production": {
    "username": process.env.AZURE_USER,
    "password": process.env.AZURE_PASS,
    "database": process.env.AZURE_DB,
    "host": process.env.AZURE_SERVER,
    "dialect": "mssql"
  }
}