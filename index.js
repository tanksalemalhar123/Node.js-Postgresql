const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const fs = require("fs");
let abc = [];
let name1 = "";




//Hello World

app.get('/', (request, response) => {
  response.send('Hello '+abc+' From Database')
});



//DB Connection

const { Pool } = require('pg');
const config = {
  user: 'malhar',
  host: 'localhost',
  database: 'test_database',
  password: 'malhar',
  port: 5432,
}

const pool = new Pool(config);
pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});


//Get By ID

app.get('/:id', function (req, res) {
  // First read existing users.
  pool.query(`SELECT name FROM products WHERE id = ${req.params.id}`, function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
   // console.log('Output:', res);
    // abc = res.rows[0].name;
    console.log("New Output"+res.rows[0].name);
    name1 = res.rows[0].name;
});
res.send("Name is: "+name1);
})


//Add User

app.get('/api/v1/addUser/', function (req, res) {
  pool.query(`INSERT INTO products (product_no, name,price) VALUES ('30', 'Ranjana','10')`, function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    console.log('Output:', res);
   //  abc = res.rows[0].name;
 
});
if(res){
  res.send("Added Record In Db");
}

})


//Update 


app.get('/api/v1/updateUser/:id', function (req, res) {
  pool.query(`UPDATE products SET name='Anant' WHERE id = ${req.params.id}`, function(err, res) {
    if(err) {
        return console.error('error running query', err);
    }
    console.log('Output:', res);
   //  abc = res.rows[0].name;
  });
if(res){
  res.send("Updated Record In Db");
}

})






//Listening On Port

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

