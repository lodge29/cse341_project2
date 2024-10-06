// express web server
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

// get port number from .env file
const port = process.env.PORT || 3000;

// api header
app.use(bodyParser.json());
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
);
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
next();
});

// routing
app.use('/', require('./routes'));

// err if Mongodb doesn't listen
mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {console.log('DATABASE MONGO is listening and NODE running on PORT ' + port)});
  }
});