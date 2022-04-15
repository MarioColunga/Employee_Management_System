require('dotenv').config();
const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '12345678*',
        database: 'hr_db',
    },
    console.log('Connected to the hr_db database.')
);

connection.connect((err) => {
    if (err) {
        throw err;
    }
})

module.exports = connection;