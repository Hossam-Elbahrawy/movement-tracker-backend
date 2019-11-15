const express = require('express');
const mongoose = require('mongoose');

const app = express();
const mongoUri = 'mongodb://127.0.0.1:27017';

app.get('/', (req, res) => {
  res.send('Hi there!');
});

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
