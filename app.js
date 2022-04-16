const inquirer = require("inquirer");
const db = require("./db/connection");
const department = require("./db/sql_queries/department-queries");
const roles = require("./db/sql_queries/role-queries");

// connect sql queries
const sql_department = new department;
const sql_roles = new roles;

const startApp = () =>  {
    return inquirer
    .prompt([

        // set up first questions
        {
            type: "list",
            name: "firstOptions",
            message: "What would you like to do to start off?",
            choices: [
                "View all departments",
                "View all roles",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role"
            ]
        }
    ])
    .then(choice => {
        switch(choice.firstOptions) {
            case "View all departments":
                startQuestions();
                sql_department.view();
                break;
            case "View all roles":
                sql_roles.view();
                startQuestions();
                break;
            case "Add a department":
                departmentQuestions();
                break;
            case "Add a role":
                // function role_add() goes here
                break;
            case "Add an employee":
                // function employee_add() goes here
                break;
            case "Update an employee role":
                // function employee_update() goes here
                break;
        };
    });
};

function departmentQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the department's new name?"
        }
    ])
    .then(input => {
        sql_department.add(input.department_name);
        startQuestions();
    });
};

// start questions again
function startQuestions() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm_start",
            message: "Would you like to continue?",
            default: false
        }
    ])
    .then(input => {
        if (input.confirm_start) {
            startApp();
        } else {
            db.end();
        }
    });
}

// init app
startApp();