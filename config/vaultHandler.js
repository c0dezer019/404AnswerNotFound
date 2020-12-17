const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const credential = new DefaultAzureCredential();

const vaultHandler = async (vault, mode, name, secret) => {
	const url = `https://${vault}.vault.azure.net`;
	const client = new SecretClient(url, credential);

	switch(mode) {
		case 'set':
			await client.setSecret(name, secret);
			break;
		case 'get':
			const getResponse = await client.getSecret(name);
			return getResponse.value;
		case 'delete':
			await client.beginDeleteSecret(name);
			break;
		case 'recover':
			await client.beginRecoverDeletedSecret(name);
			break;
		case 'purge':
			await client.purgeDeletedSecret(name);
			console.log(`${name} purged.`);
			break;
		default:
			console.log('No such mode.');
	}
};

module.exports = vaultHandler;