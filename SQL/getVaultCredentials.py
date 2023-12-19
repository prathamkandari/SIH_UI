from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

def getSQLVaultCredentials(vault_uri , secret_name):
    credential = DefaultAzureCredential()

    secretclient =  SecretClient(vault_url=vault_uri, credential=credential)

    secret = secretclient.get_secret(secret_name)

    return secret



secret_val = getSQLVaultCredentials("https://sih-data.vault.azure.net/" , "sihadmin")

print(secret_val.value)

