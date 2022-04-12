const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');

const app = express()

// Use express middleware
app.use(express.json());

// Set templating engine
app.set('view engine', 'html');
app.engine("html", ejs.renderFile);



// Render index page
app.get('/', function(req, res) {
    res.render('index')
})


// Connect to mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bincom_test'
  })

  db.connect((err) => {
      if(err) throw err;

      console.log("Connected to database")
  })

// Create DB
// app.get('/createDB', (req, res) => {
//     let sql = 'CREAT DATABASE bincom_exercise';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Database created');
//     })
// })

// Question 1 Route
app.get('/getdata', (req, res) => {
    let sql = 'SELECT * from announced_pu_results WHERE polling_unit_uniqueid = 10';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        else{
            res.render('./p_u.ejs', { results : results }) 
            console.log(results);
        }
    })
})


// Question 2 Route
app.get('/getTotal', (req,res) => {
    let sql = ''
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posted')
    })
});


// Question 3 Route
app.get('/getParties', (req,res) => {
    let sql = ''
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posted')
    });

})


// Connection port
const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`App running on port ${port}`))