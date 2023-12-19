
const {connectToSQLDatabase , connectToMongoDB} = require('./authenticateDatabase');


const databaseHandlers = {
    sql: connectToSQLDatabase,
    mongodb: connectToMongoDB
};

module.exports = {databaseHandlers};