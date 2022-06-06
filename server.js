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
  })
      } else if(answers.work_directory === "View All Departments"){
        db.query('SELECT * FROM department', function(err, results){
            console.table(results)
         })
      } else if(answers.work_directory === "View All Employees"){
        db.query('SELECT * FROM employee', function(err, results){
            console.table(results)
         })

      }
  })
}
    startApp();