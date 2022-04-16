const inquirer = require("inquirer");
const db = require("../../db/connection");
const table = require("console.table");

function Employee(startQuestions) {

    // view employees
    this.view = () => {
        const sql = `SELECT * FROM employee`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(rows);
            startQuestions();
        });
    }

    // add a new employee
    this.add = (first_name, last_name, role, manager) => {
        const sql =  `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [first_name, last_name, role, manager];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Added ${params[0]} to database!`);
            startQuestions();
        });
    }

    // update an employee's role
    this.update = () => {
        const list = [];
        const sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            result.forEach(item => {
                const employee_names = `${item.first_name}`;
                list.push(employee_names);
            });
            inquirer.prompt([
                {
                    type: "list",
                    name: "updatedRole",
                    message: "Which employee's role would you like to update?",
                    choices: list
                },
                {
                    type: "input",
                    name: "newRole",
                    message: "What is their new role's id?",
                    validate: roleInput => {
                        if (isNaN(roleInput)) {
                            console.log("Please input a valid number");
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            ])
            .then(input => {
                const id = list.indexOf(input.updatedRole) + 1;
                console.log(id);
                const sql = `UPDATE employee SET role_id = ${input.newRole} WHERE id = ${id}`;
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(`Updated ${input.updatedRole}'s role`);
                    startQuestions();
                });
            });
        });
    }
}

module.exports = Employee;