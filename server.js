const express = require('express');
const mysql = require('mysql2')
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Frosty2010@',
        database: 'work_db'
    },
    console.log('connected to work_db')
);




// db.query('SELECT * FROM department', function(err, results){
//     console.log(results)
// })

// db.query('SELECT * FROM role', function(err, results){
//     console.log(results)
// })
// db.query('SELECT * FROM employee', function(err, results){
//     console.log(results)
// })
// db.query('SHOW TABLES', function(err, results){
//     console.log(results)
// })


app.listen(PORT, ()=> {
     console.log(`server running on port ${PORT}`)
    
})


function startApp(){inquirer.prompt([
    
  
    {
      type: 'list',
      name: 'work_directory',
      message: 'What would you like to do?',
      default: 'none',
      choices: [{key:"1" ,value:"View All Employees"},{key:2, value:"Add Employee"},{key:3,value:"Update Employee Role"},{key:4, value:"View All Roles"},{key:5, value:"Add Role"}, {key:6, value:"View All Departments"},{key:7, value:"Add Department"},{key:8, value:"Quit"}
        
      ],
    },
    // {
    //   type: 'input',
    //   name: 'features',
    //   message: 'What features does your project have?',
    // },
   
  ])
  
  .then((answers) => {
    console.log(answers)
    if(answers.work_directory==="View All Roles"){
        db.query('SELECT * FROM role', function(err, results){
     console.table(results)
     startApp();
  })
      } else if(answers.work_directory === "View All Departments"){
        db.query('SELECT * FROM department', function(err, results){
            console.table(results)
            startApp();
         })
      } else if(answers.work_directory === "View All Employees"){
        db.query('SELECT employee.ID, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_ID from department join role on department.ID = role.department_ID join employee on role.ID = employee.role_ID;', function(err, results){
            console.table(results)
            startApp();
         })

      } else if (answers.work_directory === "Add Employee"){
          addEmployee();
      }
  })
}


function addEmployee(){inquirer.prompt([
    
  

    {
      type: 'input',
      name: 'firstName',
      message: 'What is the employees first name?',
    }, {
        type: 'input',
        name: 'lastName',
        message: 'What is the employees last name?',
      },
      {
        type: 'input',
        name: 'roleID',
        message: 'What is the employees role ID?',
      },
      {
        type: 'input',
        name: 'managerID',
        message: 'What is the employees manager ID?',
      },
  ])
  .then((answers) => {
    console.log(answers)
    db.query(`INSERT INTO employee (first_name,last_name,role_ID,manager_ID) VALUES ("${answers.firstName}", "${answers.lastName}", "${answers.roleID}","${answers.managerID}");`, function(err, results){
        
        console.table(results)
        startApp();
     })

}
    
    )}






    startApp();