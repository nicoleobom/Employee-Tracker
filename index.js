const mysql = require('mysql');
const inquirer = require('inquirer');
const consoletable = require('console.table');

// Server connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3300,
    password: 'obomsa12',
    database: 'employees_db'
});

connection.connect((err) => {
	if (err) throw err;
	console.log('Welcome to the Employee Tracker!');

	start();
});


async function start() {
    const questions = await
    inquirer
    .prompt([
        {
            name: 'userChoices',
            message: 'What would you like to do?',
            type: 'list',
            choices: [
                {
                    name: 'View Employees',
                    value: 'view_employees',
                },
                {
                    name: 'Add Employees',
                    value: 'add_employees',
                },
                {
                    name: 'Update Employees',
                    value: 'update_employees',
                },
                {
                    name: 'View Roles',
                    value: 'view_roles',
                },
                {
                    name: 'Add Roles',
                    value: 'add_roles',
                },
                {
                    name: 'Update Roles',
                    value: 'update_roles',
                },
                {
                    name: 'View Departments',
                    value: 'view_departments',
                },
                {
                    name: 'Add Departments',
                    value: 'add_departments',
                },
                {
                    name: 'Update Departments',
                    value: 'update_departments',
                },
                {
                    name: 'Quit',
                    value: 'quit'
                }]
        }
    ]).then(answers => {
        switch (answers.userChoices) {
            case 'view_employees':
                viewEmployees();
                break;
            case 'add_employees':
                addEmployees();
                break;
            case 'update_employees':
                updateEmployees();
                break;
            case 'view_roles':
                viewRoles();
                break;
            case 'add_roles':
                addRoles();
                break;
            case 'update_roles':
                updateRoles();
                break;
            case 'view_departments':
                viewDepartments();
                break;
            case 'add_departments':
                addDepartments();
                break;
            case 'update_departments':
                updateDepartments();
                break;
            case 'quit':
                quit();
                break;
        }
    });
}

function viewEmployees() {
    connection.query('SELECT e.first_name, e.last_name, r.title, r.salary, d.name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id;', 
      function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
      })
  };