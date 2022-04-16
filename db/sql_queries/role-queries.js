const db = require("../../db/connection");
const table = require("console.table");

function Roles(startQuestions) {

    // view roles
    this.view = () => {
        const sql = `SELECT * FROM roles`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(rows);
            startQuestions();
        });
    }

    // add a new role
    this.add = (title, salary, department) => {
        const sql =  `INSERT INTO roles(title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [title, salary, department];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Added ${params[0]} to database!`);
            startQuestions();
        });
    }
};

module.exports = Roles;