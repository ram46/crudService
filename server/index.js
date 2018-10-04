var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var db = require('../database-mysql/model.js');
var db2 = require('../database-mysql/model2.js');

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
app.get('/getAllCases', getAllCases)
app.post('/getCaseVersions', getCaseVersions)

const SUCCESS_MSG = 'transaction succeeded';
const ERROR_MSG = 'transaction failed'

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
    if (error) res.send(ERROR_MSG);
    if (result) res.send(SUCCESS_MSG);
  })
}


function readioc(req, res) {
  console.log('HEEEEEEEEEEEEEERRREEEEE in readioc crud server', req.body)
  var filter = JSON.parse(req.body.query);
  console.log('**** called /readioc')
  db2.readIOC(filter.caseName, parseInt(filter.versionNum), (error, result) => {
    if (error) res.send(ERROR_MSG);
    if (result) res.send(result);
  })
  // db.read(filter, (error, result) => {
  //   if (error) res.send(ERROR_MSG);
  //   if (result) res.send(result);
  // })

}


function updateioc(req, res) {
  var query = JSON.parse(req.body.query);
  db.update(query.newValues, query.where, (error, result) => {
    if (error) res.send(ERROR_MSG);
    if (result) res.send(SUCCESS_MSG);
  })
}

function deleteioc(req, res) {
  var filter = JSON.parse(req.body.query);
  db.delete(filter, (error, result) => {
    if (error) res.send(ERROR_MSG);
    if (result) res.send(SUCCESS_MSG);
  })
}


function getAllCases(req, res) {
  db2.getAllCases((error, cases) => {
    if (error) res.send(['no case found'])
    else res.send(cases)
  })
}

function getCaseVersions(req, res) {
  console.log('***** req of getCaseVersions****')
  var caseName = req.body.caseName
  console.log(req.body.caseName)

  db2.getCaseVersions(caseName, (error, versions) => {
    if (error) res.send(['no version found'])
    else res.send(versions)
  })

}


var port = process.env.PORT || 5001;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});



