require('dotenv').config();
const vault = require('./azureConnect')

const database = vault('DB404', '404title')
const password = vault('DB404', '404p');
const server = vault('DB404', '404server');
const username = vault('DB404', '404u');

module.exports = {
  "development": {
    "username": username,
    "password": password,
    "database": database,
    "host": server,
    "dialect": "mssql",
    "encrypt": "true"
  },
  "test": {
    "username": username,
    "password": password,
    "database": process.env.AZURE_DB,
    "host": server,
    "dialect": "mssql"
  },
  "production": {
    "username": username,
    "password": password,
    "database": database,
    "host": server,
    "dialect": "mssql"
  }
}