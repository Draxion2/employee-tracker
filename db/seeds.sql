INSERT INTO department (department_name)
VALUES
('Human Resources'),
('Marketing'),
('Engineering'),
('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
('HR Manager', 82000, 1),
('HR Associate', 30000, 1),
('Communications Manager', 90000, 2),
('Digital Marketing', 51000, 2),
('IT Manager', 42000, 3),
('Software Technican', 70000, 3),
('Accountant', 39000, 4),
('Payroll Administrator', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Holdan", "McMullen", 6, NULL),
("Alex", "McMullen", 2, 3),
("Travis", "McMullen", 1, NULL),
("Ryan", "McMullen", 4, NULL),
("Jared", "Pedro", 3, 3),
("James", "Webster", 8, NULL),
("Henry", "White", 7, 6);