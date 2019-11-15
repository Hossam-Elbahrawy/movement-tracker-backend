const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(auth);

// MongoDb Connection
const mongoUri = 'mongodb://127.0.0.1:27017';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDb');
});

mongoose.connection.on('Error', err => {
  console.log('Error connectiong to MongoDb', err);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
