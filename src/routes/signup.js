const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    const newUser = await user.save();
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');

    res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
});

module.exports = router;
