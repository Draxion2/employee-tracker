const mysql = require("mysql2");
require('dotenv').config();

// connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: "employees_db"

    },
    console.log("Connected to the employees database")
);

module.exports = db;