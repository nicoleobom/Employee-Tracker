const mysql = require('mysql');
const inquirer = require('inquirer');
const consoletable = require('console.table');

// Server connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'obomsa12',
    database: 'employees_db'
});


connection.connect(function(error) {
    if (error) throw error;
    console.log('Welcome to the Employee Tracker Database')
    start();
})

async function start() {
    const choice = await
    inquirer
    .prompt({
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
            }
        ]
    });

    switch (choice.selection) {
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
}

function viewEmployees() {
    let sqlQuery = '';
    connection.query(sqlQuery, (error, res) => {
        if (error) throw error;
        console.log('\n' + cTable.getTable(res));
        start();
    });
}

async function addEmployees() {
    const choice1 = await
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'fName',
            message: 'What\'s the employee\'s first name?',
            validate: (answer) => answer.length > 0, 
        },
        {
            type: 'input',
            name: 'lName',
            message: 'What\'s the employee\'s last name?',
            validate: (answer) => answer.length > 0,
        },
        {
            type: 'list',
            name: 'empDept',
            message: 'What department is the employee in?',
            choices: await showDepartments()
        },
    ]);

    const choice2 = await
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'role',
            message: 'What\'s the employee\'s role?',
            choices: await showRoles(choice1.department),
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: await showEmployees()
        },
    ]);

    const employee = {...choice1, ...choice2};

    const sqlQuery = 'INSERT INTO employee SET ?'
    const val = [
        {
            first_name : employee.first_name,
            last_name : employee.last_name,
            role_id : await findRoleID(employee.role),
            manager_id : await findManagerID(employee.manager),
        }
    ]

    connection.query(sqlQuery, values, (error) => {
        if (error) throw error;
        viewEmployees();
    });
}
