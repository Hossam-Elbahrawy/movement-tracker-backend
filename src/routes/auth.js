const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const user = new User({ email, password });
  const newUser = await user.save();

  res.status(200).send('New User Created!');
});

module.exports = router;
