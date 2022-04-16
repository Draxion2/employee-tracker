const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");

const startApp = () =>  {
    console.log("===== EMPLOYEE TRACKER =====")
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
                // function department_view() goes here
                console.log(choice.firstOptions);
                break;
            case "View all roles":
                // function role_view() goes here
                console.log(choice.firstOptions);
                break;
            case "Add a department":
                // function department_add() goes here
                console.log(choice.firstOptions);
                break;
            case "Add a role":
                // function role_add() goes here
                console.log(choice.firstOptions);
                break;
            case "Add an employee":
                // function employee_add() goes here
                console.log(choice.firstOptions);
                break;
            case "Update an employee role":
                // function employee_update() goes here
                console.log(choice.firstOptions);
                break;
        };
    });
}

// init app
startApp();