require('dotenv').config();
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

let username, password, database, server;

const vault = async () => {
     const KVUri = 'https://' + 'db404' + '.vault.azure.net';

     const credential = new DefaultAzureCredential();
     const client = new SecretClient(KVUri, credential);

    username = await client.getSecret('404u');
    password = await client.getSecret('404p');
    database = await client.getSecret('404title');
    server = await client.getSecret('404server');
};

vault();

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