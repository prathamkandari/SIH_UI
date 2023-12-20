const express = require('express');
const { getVaultCredentials } = require('./getVaultCredentials');
const { databaseHandlers } = require('./configMapHandler');
const { sendConnectionStringToPythonServer } = require('./sendConnectionStringToSQL');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const port = 3000;

app.post('/login', async (req, res) => {
    const { vaultUri, secretName } = req.body;

    // console.log(req.body);

    try {
        console.log(secretName);
        console.log(vaultUri);
        const secret = await getVaultCredentials(vaultUri, secretName);
        const dbConfig = JSON.parse(secret.value);
        

        const dbConnections = {};
        let sqlConfig, metadataURI;

        for (const [dbName, config] of Object.entries(dbConfig)) {
            if (databaseHandlers[dbName]) {
                dbConnections[dbName] = await databaseHandlers[dbName](config);

                if (dbName === 'sql') {
                    sqlConfig = config;
                    metadataURI = config.metadataURI;

                    console.log('metadata_uri:', metadataURI);
                }
            } else {
                throw new Error(`Unsupported database type: ${dbName}`);
            }
        }

        if (sqlConfig) {
            const conn_str = `Driver={ODBC Driver 18 for SQL Server};Server=tcp:${sqlConfig.server_name},${sqlConfig.port};Database=${sqlConfig.database};Uid=${sqlConfig.userName};Pwd=${sqlConfig.password};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=990;`;
            console.log(metadataURI)
            await sendConnectionStringToPythonServer(conn_str, metadataURI);
        }

        res.json({ message: 'Successfully connected to the databases' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
