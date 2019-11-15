const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');

const app = express();
app.use(auth);
const mongoUri = 'mongodb://127.0.0.1:27017';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
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
