const express = require('express');
const bodyParser = require('body-parser');
const utils = require('./utils/utils');

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var words = require('../database-mysql');
// var words = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
// Serve static files from ../react-client
app.use(express.static(__dirname + '/../react-client/dist'));

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// Only parses json (uniform resource locators)
// Any new body object containing the parsed data is populated on the request object after the middleware (ie req.body).
app.use(bodyParser.json());

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));



app.get('/words', (req, res) => {
  console.log('Inside get /words');
  res.send(utils.tempWords);
});

app.post('/words', (req, res) => {
  console.log('Inside post /words', req.body.word, typeof req.body.word);
  utils.getDefinition(req.body.word, (error, results) => {
    if (error) {
      res.sendStatus(500);
      res.send();
    } else {
      // Results from getDefinition function invokation + historical results.
      console.log('Results from api search and historic results', results);
      res.json(results); //Could have used res.send(results);
    }
  }); 
});



app.listen(3000, function() {
  console.log('listening on port 3000!');
});