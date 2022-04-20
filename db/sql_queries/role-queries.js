const inquirer = require("inquirer");
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
            if (rows.length > 0) {
                console.table(rows);
            } else {
                console.log("There are no roles in the database");
            }
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

    // delete a role
    this.delete = () => {
        const list = [];
        const sql = `SELECT roles.id, roles.title FROM roles`;
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            result.forEach(item => {
                const roleNames = `${item.title}`;
                list.push(roleNames);
            });
            inquirer.prompt([
                {
                    type: "list",
                    name: "deletedRole",
                    message: "Which role would you like to remove?",
                    choices: list
                }
            ])
            .then(input => {
                const sql = `DELETE FROM roles WHERE title = ?`;
                const params = input.deletedRole;
                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(`Deleted ${input.deletedRole} from database!`);
                    startQuestions();
                })
            })
        });
    }

    // delete all roles
    this.deleteAll = () => {
        const sql = `DELETE FROM roles`;
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Removed all roles!`);
            startQuestions();
        });
    }
};

module.exports = Roles;