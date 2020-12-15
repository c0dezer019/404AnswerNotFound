require('dotenv').config();
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const credential = new DefaultAzureCredential();
const vault = 'db404';

const url = `https://${vault}.vault.azure.net`;

const client = new SecretClient(url, credential);

const vaultUtility = async () => {
     try {
          const database = await client.getSecret('404title');
          const username = await client.getSecret('404u');
          const password = await client.getSecret('404p');

          return {
               development: {
                    username: username.value,
                    password: password.value,
                    database: database.value,
                    host: '404server.database.windows.net',
                    dialect: 'mssql',
                    encrypt: 'true',
               },
               test: {
                    username: username.value,
                    password: password.value,
                    database: database.value,
                    host: '404server.database.windows.net',
                    dialect: 'mssql',
               },
               production: {
                    username: username.value,
                    password: password.value,
                    database: database.value,
                    host: '404server.database.windows.net',
                    dialect: 'mssql',
                    encrypt: 'true',
               },
          };
     } catch (err) {
          console.log(err);
     }
};

module.exports = vaultUtility;
