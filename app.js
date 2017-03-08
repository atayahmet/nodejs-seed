var bodyParser = require('body-parser')
var express = require('express')
var moment = require('moment')
var app = express()

app.use(bodyParser.json());

app.post('/getRecord', (req, res) => {

  const key = req.body.key;

  // Retrieve
  var MongoClient = require('mongodb').MongoClient;

  // Connect to the db
  MongoClient.connect("mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon", (err, db) => {
    if(!err) {
      db.collection('records', (err, collection) => {
        collection.findOne({ key }, {key: 1, value: 1, createdAt: 1, _id: 0}, (err, data) => {

          if(data) data.createdAt = moment(data.createdAt).format("YYYY-MM-DD");

          const response = data ? data : { "status" : 404 }

          res.json(response);
        });
      });
    }
  });
})

var port = process.env.PORT || 8000

app.listen(port,  () => {
  console.log('Example app listening on port ' + port + '!')
})