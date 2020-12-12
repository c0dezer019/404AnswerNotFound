const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

export const openSesame = async () => {
	const vault404 = process.env['VAULT404'];
	const KVUri = 'https://'+ vault404 + '.vault.azure.net';

	const credential = new DefaultAzureCredential();
	const client = new SecretClient(KVUri, credential)

	const secret = await client.getSecret('session');

	return secret.value
}