import 'dotenv/config';
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

export const dbQuery = (query: string, params: any) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error: any, result: any) => {
            if (error) reject(error);
            resolve(result);
        })
    })
}

export default connection;