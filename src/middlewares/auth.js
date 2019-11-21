const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send('Unauthorized');
  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, 'MY_SECRET_KEY', async (err, paylaod) => {
    if (err) return res.status(401).send({ error: 'You must be logged in.' });
    const { userId } = paylaod;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
