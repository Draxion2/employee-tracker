const inquirer = require("inquirer");
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
            if (rows.length > 0) {
                console.table(rows);
            } else {
                console.log("There are no departments in the database");
            }
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

    // delete a department
    this.delete = () => {
        const list = [];
        const sql = `SELECT department.id, department.department_name FROM department`;
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            result.forEach(item => {
                const departmentNames = `${item.department_name}`;
                list.push(departmentNames);
            });
            inquirer.prompt([
                {
                    type: "list",
                    name: "deletedDepartment",
                    message: "Which department would you like to remove?",
                    choices: list
                }
            ])
            .then(input => {
                const sql = `DELETE FROM department WHERE department_name = ?`;
                const params = input.deletedDepartment;
                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(`Deleted ${input.deletedDepartment} from database!`);
                    startQuestions();
                })
            })
        });
    }

    // delete all departments
    this.deleteAll = () => {
        const sql = `DELETE FROM department`;
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Removed all departments!`);
            startQuestions();
        });
    }
};

module.exports = Department;