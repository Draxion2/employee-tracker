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
            if (rows.length > 0) {
                console.table(rows);
            } else {
                console.log("There are no employees in the database");
            }
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
    this.updateRole = () => {
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

    // update an employee's manager
    this.updateManager = () => {
        const list = [];
        const sql = `SELECT employee.id, employee.first_name FROM employee`;
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
                    name: "updatedManager",
                    message: "Which employee would you like to update?",
                    choices: list
                },
                {
                    type: "input",
                    name: "newManager",
                    message: "What is their new manager's id?",
                    validate: managerInput => {
                        if (isNaN(managerInput)) {
                            console.log("Please input a valid number");
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            ])
            .then(input => {
                const id = list.indexOf(input.updatedManager) + 1;
                const sql = `UPDATE employee SET manager_id = ${input.newManager} WHERE id = ${id}`;
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(`Updated ${input.updatedManager}'s role`);
                    startQuestions();
                });
            });
        });
    }

    // delete an employee
    this.delete = () => {
        const list = [];
        const sql = `SELECT employee.id, employee.first_name FROM employee`;
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
                    name: "deletedEmployee",
                    message: "Which employee would you like to remove?",
                    choices: list
                }
            ])
            .then(input => {
                const sql = `DELETE FROM employee WHERE first_name = ?`;
                const params = input.deletedEmployee;
                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(`Deleted ${input.deletedEmployee} from database!`);
                    startQuestions();
                })
            })
        });
    }

    // delete all employees
    this.deleteAll = () => {
        const sql = `DELETE FROM employee`;
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Removed all employees!`);
            startQuestions();
        });
    }
}

module.exports = Employee;