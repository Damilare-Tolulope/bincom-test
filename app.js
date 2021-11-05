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

// <% mascots.forEach(function(mascot) { %>
//     <li>
//       <strong><%= mascot.name %></strong>
//       representing <%= mascot.organization %>,
//       born <%= mascot.birth_year %>
//     </li>
//   <% }); %>

// <%= tagline %>


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