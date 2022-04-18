const inquirer = require("inquirer");
const db = require("./db/connection");
const Department = require("./db/sql_queries/department-queries");
const Roles = require("./db/sql_queries/role-queries");
const Employee = require("./db/sql_queries/employee-queries");

// connect sql queries
const sql_department = new Department(startQuestions);
const sql_roles = new Roles(startQuestions);
const sql_employee = new Employee(startQuestions);

const startApp = () =>  {
    return inquirer
    .prompt([

        // set up questions
        {
            type: "list",
            name: "firstOptions",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a new department",
                "Add a new role",
                "Add a new employee",
                "Update an employee's role",
                "Update an employee's manager",
                "Delete an employee",
                "Delete a role",
                "Delete a department",
                "Delete all employees",
                "Delete all roles",
                "Delete all departments"
            ]
        }
    ])
    .then(choice => {
        switch(choice.firstOptions) {
            case "View all departments":
                sql_department.view();
                break;
            case "View all roles":
                sql_roles.view();
                break;
            case "View all employees":
                sql_employee.view();
                break;
            case "Add a new department":
                departmentQuestions();
                break;
            case "Add a new role":
                roleQuestions();
                break;
            case "Add a new employee":
                employeeQuestions();
                break;
            case "Update an employee's role":
                sql_employee.updateRole();
                break;
            case "Update an employee's manager":
                sql_employee.updateManager();
                break;
            case "Delete an employee":
                sql_employee.delete();
                break;
            case "Delete a role":
                sql_roles.delete();
                break;
            case "Delete a department":
                sql_department.delete();
                break;
            case "Delete all employees":
                deleteAllRows("employees");
                break;
            case "Delete all roles":
                deleteAllRows("roles");
                break;
            case "Delete all departments":
                deleteAllRows();
                break;
        };
    });
};

// validation for complete deletion
function deleteAllRows(choice) {
    if (choice === "employees") {
        inquirer.prompt([
            {
                type: "confirm",
                name: "deleteConfirm",
                message: "Are you sure you want to delete all employees?",
                default: false
            }
        ])
        .then(input => {
            if (input.deleteConfirm) {
                sql_employee.deleteAll();
            } else {
                startQuestions();
            }
        });
    }
    else  if (choice === "roles") {
        inquirer.prompt([
            {
                type: "confirm",
                name: "deleteConfirm",
                message: "Are you sure you want to delete all roles?",
                default: false
            }
        ])
        .then(input => {
            if (input.deleteConfirm) {
                sql_roles.deleteAll();
            } else {
                startQuestions();
            }
        });
    } else {
        inquirer.prompt([
            {
                type: "confirm",
                name: "deleteConfirm",
                message: "Are you sure you want to delete all departments?",
                default: false
            }
        ])
        .then(input => {
            if (input.deleteConfirm) {
                sql_department.deleteAll();
            } else {
                startQuestions();
            }
        });
    }
}

// questions for adding a new department
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
    });
};

// questions for adding a new role
function roleQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "role_title",
            message: "What is the new role's name?"
        },
        {
            type: "input",
            name: "role_salary",
            message: "What is the role's salary?",
            validate: salaryInput => {
                if (isNaN(salaryInput)) {
                    console.log("Please input a valid number");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "role_department",
            message: "What is the role's departemnt id?",
            validate: departmentInput => {
                if (isNaN(departmentInput)) {
                    console.log("Please input a valid number");
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
    .then(input => {
        sql_roles.add(
            input.role_title,
            input.role_salary,
            input.role_department
        );
    });
}

// questions for adding a new employee
function employeeQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "role",
            message: "What is the employee's role id?",
            validate: roleInput => {
                if (isNaN(roleInput)) {
                    console.log("Please input a valid number");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "manager",
            message: "What is the empoloyee's manager id?",
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
        sql_employee.add(
            input.first_name,
            input.last_name,
            input.role,
            input.manager
        )
    })
}


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