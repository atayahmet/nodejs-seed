var express = require('express')
var app = express()
var bodyParser = bodyParser = require('body-parser')

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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})