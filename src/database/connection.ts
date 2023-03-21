const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((error: any) => {
    if (error) {
        console.error('Error connecting to MySql database: ' + error.stack)
        return;
    }
    console.log('Connected to MySql database with connection ID ' + connection.threadId);
})