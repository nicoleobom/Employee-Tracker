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
                            name: 'Update Manager',
                            value: 'update_manager',
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
                    case 'update_manager':
                        updateManager();
                        break;
                    case 'quit':
                        quit();
                        break;
                }
            });
}

function viewEmployees() {
    connection.query('SELECT e.first_name, e.last_name, r.title, r.salary, d.name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id;',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        })
};

function addEmployees() {
    inquirer
    .prompt([
        {
            name: 'fname',
            type: 'input',
            message: 'What\'s the employee\'s first name?'
        },
        {
            name: 'lname',
            type: 'input',
            message: 'What\'s the employee\'s last name?'
        },
        {
            name: 'role',
            type: 'list',
            message: 'What\'s the employee\'s role?',
            choices: [
                'account manager',
                'software engineer',
                'sales executive',
                'finance manager',
                'lawyer'
            ]
        },
        {
            name: 'manager',
            type: 'list',
            message: 'Who is the employee\'s manager?',
            choices: [
                'Demi Lovato',
                'Hilary Duff',
                'Selena Gomez',
                'Joe Jonas',
                'Amanda Bynes'
            ]
        }
    ]).then(answers=> {
        switch (answers.role) {
            case "account manager":
                answers.role = 1;
                break;
            case "software engineer":
                answers.role = 2;
                break;
            case "sales executive":
                answers.role = 3;
                break;
            case "finance manager":
                answers.role = 4;
                break;
            case "lawyer":
                answers.role = 5;
                break;
        }

        switch (answers.manager) {
            case "Demi Lovato":
                answers.manager = 1;
                break;
            case "Hilary Duff":
                answers.manager = 2;
                break;
            case "Selena Gomez":
                answers.manager = 3;
                break;
            case "Joe Jonas":
                answers.manager = 4;
                break;
            case "Amanda Bynes":
                answers.manager = 5;
                break;
        }

        connection.query('INSERT INTO employee SET ?', {
            first_name: answers.fname,
            last_name: answers.lname,
            role_id: answers.role,
            manager_id: answers.manager,
            
        }, function(error) {
            if (error) throw error;
            console.log('Employee added!');
            start();
        })
    })
};

function viewRoles() {
    connection.query('SELECT * FROM role',
    function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addRoles() {
    inquirer
    .prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What\'s the title of the role you\'re adding?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What\'s the salary of the role you\'re adding?'
        },
        {
            name: 'departments',
            type: 'list',
            message: 'What\'s the department of the role you\'re adding?',
            choices: [
                'Sales',
                'Engineering',
                'HR & Finance',
                'Legal'
            ]
        }
    ]).then(answers=> {
        switch (answers.departments) {
            case "Sales":
                answers.departments = 1;
                break;
            case "Engineering":
                answers.departments = 2;
                break;
            case "HR & Finance":
                answers.departments = 3;
                break;
            case "Legal":
                answers.departments = 4;
        }

        connection.query('INSERT INTO role SET ?', {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.departments,
        }, function(error) {
            if (error) throw error;
            console.log('Added!');
            start();
        })
    })
}

function updateRoles() {
    connection.query('SELECT id, first_name, last_name FROM employee;', function(error, res) {
        if (error) throw error;
        roleArray = [];
        for (var i = 0; i < res.length; i++) {
            let employee = res[i];
            let name = `${employee.first_name} ${employee.last_name}`;
            let info = {
                name: empName,
                val: employee.id
            }
            roleArray.push(info);
        }

        inquirer
        .prompt([
            {
                name: 'name',
                type: 'list',
                message: 'Which employee do you want to update?',
                choices: roleArray
            },
            {
                name: 'role',
                type: 'list',
                message: 'What is his/her new role?',
                choices: [
                    'Account Manager',
                    'Software Engineer',
                    'Sales Executive',
                    'Finance Manager',
                    'Lawyer',
                ]
            }
        ]).then(answers => {
            switch(answers.role) {
                case "Account Manager":
                    answers.role = 1;
                    break;
                case 'Software Engineer':
                    answers.role = 2;
                    break;
                case 'Sales Executive':
                    answers.role = 3;
                    break;
                case 'Finance Manager':
                    answers.role = 4;
                    break;
                case 'Lawyer':
                    answers.role = 5;
                    break;
            }

            connection.query(`UPDATE employee SET role_id = ${answers.role} WHERE id = ${amswers.name};`, function(error) {
                if (error) throw error;
                console.log('Updated!');
                start();
            })
        })
    })
}

function viewDepartments() {
    connection.query('SELECT * FROM department',
    function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addDepartments() {
    inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department that you would like to add?",
        validate: validateEntry
      }
    ])
    .then(answers => {
      connection.query(
        "INSERT INTO department SET ?", {"name": answers.department}, function(error) {
          if (error) throw error;
          console.log("Department added!");
          start();
        }
      );
    });
}
