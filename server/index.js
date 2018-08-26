var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var db = require('../database-mysql/model.js');

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

app.get('/monitor', monitor);
app.post('/createioc', createioc)
app.post('/readioc', readioc)
app.post('/updateioc', updateioc)
app.post('/deleteioc', deleteioc)

/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

function restrict() {
// code here if cookie is verified
  // next()
// else redirect to login page
}

function monitor(req,res) {
  request('http://localhost:9001/getMicroservices', (error, response, body) => {
    if (error) res.send('Error while getting microservices')
    else res.send(body)
  })
}

function createioc(req, res) {
  iocs = JSON.parse(req.body.query);
  console.log('in the createIOC place', iocs)
  db.create(iocs, (error, result) => {
    if (error) res.send(error);
    if (result) res.send('sdsds');
  })
}


function readioc(req, res) {
  var filter = JSON.parse(req.body.query);
  console.log('**** called /readioc')
  db.read(filter, (error, result) => {
    res.send(result);
  })

}


function updateioc(req, res) {
  var query = JSON.parse(req.body.query);
  db.update(query, (error, result) => {
    res.send(result);
  })
}

function deleteioc(req, res) {

}

var port = process.env.PORT || 5001;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

