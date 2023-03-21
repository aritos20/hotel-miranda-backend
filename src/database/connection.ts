const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Georgios.2009',
    database: 'my_db'
})

connection.connect((error: any) => {
    if (error) {
        console.error('Error connecting to MySql database: ' + error.stack)
        return;
    }
    console.log('Connected to MySql database with connection ID ' + connection.threadId);
})

connection.query('SELECT * FROM mytable', (error: any, results: any, fields: any) => {
    if (error) throw error;
    console.log(results);
});