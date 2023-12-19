
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');


async function getVaultCredentials(vaultUri, secretName) {
    const credential = new DefaultAzureCredential();
    const secretClient = new SecretClient(vaultUri, credential);

    try {
        const secret = await secretClient.getSecret(secretName);

        // console.log(secret);
        return secret;
    } catch (error) {
        console.error('Error fetching secret from Azure Key Vault:', error);
        throw error;
    }

}



module.exports = { getVaultCredentials };
