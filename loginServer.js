const express = require('express');
const { connectToSQLDatabase } = require('./authenticateDatabase');
const { getVaultCredentials } = require('./getVaultCredentials');

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

        const connection = await connectToSQLDatabase(dbConfig);

        res.json({ message: 'Successfully connected to the database' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
