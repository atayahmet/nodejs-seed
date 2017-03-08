var bodyParser = require('body-parser')
var express = require('express')
var app = express()

app.use(bodyParser.json());

app.post('/getRecord', function (req, res) {

  const key = req.body.key;

  // Retrieve
  var MongoClient = require('mongodb').MongoClient;

  // Connect to the db
  MongoClient.connect("mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon", function(err, db) {
    if(!err) {
      db.collection('records', function(err, collection) {
        collection.findOne({ key }, function(err, data) {
          const response = data ? data : { "status" : 404 }

          res.json(response);
        });
      });
    }
  });
})

var port = process.env.PORT || 8000

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})