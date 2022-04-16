const db = require("../../db/connection");
const table = require("console.table");

function Department(startQuestions) {

    // view departments
    this.view = () => {
        const sql = `SELECT * FROM department`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(rows);
            startQuestions();
        });
    }

    // add a new department
    this.add = input => {
        const sql =  `INSERT INTO department(department_name) VALUES (?)`;
        db.query(sql, input, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Added ${input} to database!`);
            startQuestions();
        });
    }
};

module.exports = Department;