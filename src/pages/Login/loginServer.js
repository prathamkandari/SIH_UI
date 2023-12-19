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

    try {
        const secret = await getVaultCredentials(vaultUri, secretName);
        const dbConfig = JSON.parse(secret.value);

        const dbConnections = {};

        for (const [dbName, config] of Object.entries(dbConfig)) {
            if (databaseHandlers[dbName]) {
                dbConnections[dbName] = await databaseHandlers[dbName](config);
            } else {
                throw new Error(`Unsupported database type: ${dbName}`);
            }
        }
        sendConnectionStringToPythonServer();
        res.json({ message: 'Successfully connected to the databases' });


    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

