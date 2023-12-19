const { Connection } = require('tedious');

async function connectToSQLDatabase(dbConfig) {
    try {

        const { userName, password, server_name, database } = dbConfig;

        const config = {
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

        const connection = new Connection(config);

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

module.exports = { connectToSQLDatabase };
