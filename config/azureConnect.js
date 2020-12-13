const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const vault = async (env, key) => {
	const vault = process.env[`${env}`];
	const KVUri = 'https://'+ vault + '.vault.azure.net';

	const credential = new DefaultAzureCredential();
	const client = new SecretClient(KVUri, credential)

	const secret = await client.getSecret(`${key}`);

	return secret.value
}

module.exports = vault;