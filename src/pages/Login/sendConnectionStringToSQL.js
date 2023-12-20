const fetch = require('node-fetch');

async function sendConnectionStringToPythonServer(conn_str, metadataURI) {

    try {
        const response = await fetch('http://127.0.0.1:5000/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ conn_str, metadataURI })
        });

        console.log('Sent to Python server:', { conn_str, metadataURI });

        if (response.ok) {
            console.log('Successfully connected to the database');
        } else {
            console.error('Failed to connect to the database');
        }
    } catch (error) {
        console.error('Error connecting to Python server:', error);
    }
}


module.exports = { sendConnectionStringToPythonServer };