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

db.query('SELECT * FROM department' function(err, results){
    console.log(results)
})

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})
