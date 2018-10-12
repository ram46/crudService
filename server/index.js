var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var db = require('../database-mysql/model.js');
// var snsUtil = require('./sns-sms-email.js')

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

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


function createioc(req, res) {
  var query = req.body.query;
  db.create(query, (error, result) => {
    if (error) res.end(ERROR_MSG);
    if (result) {
      request('http://email-node:5004/snsPublish', ((err, resp, body) => {
        res.end(SUCCESS_MSG);
      }))
    }

  })
}


function readioc(req, res) {
  var query = req.body.query
  db.read(query,(error, result) => {
    if (error) res.send(ERROR_MSG);
    if (result) res.send(result);
  })

}


function updateioc(req, res) {
  var query = req.body.query;
  db.update(query, (error, result) => {
    if (error) res.end(ERROR_MSG);
    if (result) {
      request('http://email-node:5004/snsPublish', ((err, resp, body) => {
        console.log(body)
        res.end(SUCCESS_MSG);
      }))

    }

  })
}

function deleteioc(req, res) {
  var filter = JSON.parse(req.body.query);
  var query = req.body.query
  db.delete(query, (error, result) => {
    if (error) res.send(ERROR_MSG);
    if (result) res.send(SUCCESS_MSG);
  })
}


function getAllCases(req, res) {
  db.getAllCases((error, cases) => {
    if (error) res.send(['no case found'])
    else res.send(cases)
  })
}

function getCaseVersions(req, res) {
  var caseName = String(req.body.caseName)
  db.getCaseVersions(caseName, (error, versions) => {
    if (error) res.send(['no version found'])
    else res.send(versions)
  });
}


var port = process.env.PORT || 5001;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});



