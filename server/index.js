var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

app.get('/monitor', monitor);
<<<<<<< HEAD
app.post('/readioc', readioc)
=======
app.get('/find/:case/:type', findIOC);
>>>>>>> 6943387be3933636a0f4b0861562e2cc6394adc6
/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

function monitor(req,res) {
  request('http://localhost:9001/getMicroservices', (error, response, body) => {
    if (error) res.send('Error while getting microservices')
    else res.send(body)
  })
}

<<<<<<< HEAD
function readioc(req, res) {
  ioc = req.body
  console.log(ioc)
}

function restrict() {
// code here if cookie is verified
  // next()
// else redirect to login page
}

function getItems(req, res) {
  // req.params.id
=======
function findIOC(req, res) {
  console.log(req.params);
>>>>>>> 6943387be3933636a0f4b0861562e2cc6394adc6
}



var port = process.env.PORT || 5001;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

