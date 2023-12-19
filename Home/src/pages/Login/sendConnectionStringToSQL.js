const fetch = require('node-fetch');

async function sendConnectionStringToPythonServer(){
    const conn_str = `Driver={ODBC Driver 18 for SQL Server};Server=tcp:sihadmin.database.windows.net,1433;Database=sih;Uid=sihadmin;Pwd=sih@12345;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=990;`;

    try {
        const response = await fetch('http://127.0.0.1:5000/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ conn_str: conn_str })
        });

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