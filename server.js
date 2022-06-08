const express = require('express');
const mysql = require('mysql2')

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



app.listen(PORT, ()=> {
     console.log(`server running on port ${PORT}`)
    
})

function startApp(){inquirer.prompt([
    
  
    {
      type: 'list',
      name: 'work_directory',
      message: 'What would you like to do?',
      default: 'none',
      choices: [{key:"1" ,value:"View All Employees"},{key:2, value:"Add Employee"},{key:3,value:"Update Employee Role"},{key:4, value:"View All Roles"},{key:5, value:"Add Role"}, {key:6, value:"View All Departments"},{key:7, value:"Add Department"},{key:8, value:"Delete Employee"},{key:9, value:"Quit"}
        
      ],
    },
    
   
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
      } else if(answers.work_directory === "Add Role"){
          addRole();
      }else if(answers.work_directory === "Add Department"){
        addDepartment();
    } else if(answers.work_directory === "Update Employee Role"){
    updateEmployeeRole();
    } else if(answers.work_directory === "Delete Employee"){
        deleteEmployee();
    }
  })
}

function deleteEmployee(){    
    
    inquirer.prompt([
    {
      type: 'input',
      name: 'deleteEmployee',
      message: 'What is the ID of the employee you would like to delete?',
    }, 
]).then((answers) => {
    console.log(answers)
    db.query(`DELETE FROM employee WHERE ID = ${answers.deleteEmployee};`, function(err, results){
        
        console.table(results)
        console.log("Employee successfully deleted!")
        startApp();
     })

})

    
}




function updateEmployeeRole(){inquirer.prompt([
    {
      type: 'input',
      name: 'roleID',
      message: 'What is the role ID that you would like to change employee to?',
    }, {
        type: 'input',
        name: 'employeeID',
        message: 'What is the employees ID?',
      },
]).then((answers) => {
    console.log(answers)
    db.query(`UPDATE employee SET role_ID = ${answers.roleID} where id = ${answers.employeeID};`, function(err, results){
        
        console.table(results)
        startApp();
     })

})

}

function addDepartment(){inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'What is the name of the department you would like to add?',
    },
]).then((answers) => {
    console.log(answers)
    db.query(`INSERT INTO department (name) VALUES ("${answers.newDepartment}");`, function(err, results){
        
        console.table(results)
        startApp();
     })

})
}

function addRole(){inquirer.prompt([
    {
      type: 'input',
      name: 'newTitle',
      message: 'What is the title of the role you would like to add?',
    }, {
        type: 'input',
        name: 'titleSalary',
        message: 'What is the salaray of the title?',
      },{
        type: 'input',
        name: 'departmentID',
        message: 'What is the department ID?',
      },
]).then((answers) => {
    console.log(answers)
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.newTitle}", "${answers.titleSalary}", "${answers.departmentID}");`, function(err, results){
        
        console.table(results)
        startApp();
     })

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