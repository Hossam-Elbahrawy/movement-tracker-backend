const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const track = require('./routes/track');
const auth = require('./middlewares/auth');
const app = express();

// Middlewares
app.use(bodyParser.json());

//api endpoints
app.use('/signup', signup);
app.use('/signin', signin);
app.use('/tracks', track);

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
