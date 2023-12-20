const { Connection } = require('tedious');

const {MongoClient} = require('mongodb');


async function connectToSQLDatabase(config) {
    try {
       
        const { userName, password, server_name, database, port , metadataURI } = config;

        const sqlConfig = {
            authentication: {
                options: {
                    userName: userName,
                    password: password,
                },
                type: 'default'
            },
            server: server_name,
            options: {
                database: database,
                encrypt: true,
                trustServerCertificate: false,
                connectionTimeout: 990,
                port: 1433
            }
        };

        const connection = new Connection(sqlConfig);

        connection.on('connect', err => {
            if (err) {
                console.error('Connection error: ', err);
            } else {
                console.log('Connected to SQL Server');
            }
        });

        connection.connect();
        return connection;
    } catch (error) {
        console.error('Error connecting to SQL Database:', error);
        throw error;
    }
}



async function connectToMongoDB(dbConfig) {
    try {
        const { uri, database } = dbConfig;

        const client = new MongoClient(uri);

        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(database);
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}



module.exports = { connectToSQLDatabase ,  connectToMongoDB };
