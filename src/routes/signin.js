const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).send({ error: 'Must Provide E-mail and Password.' });

  const user = await User.findOne({ email });
  if (!user) return res.status(422).send({ error: 'E-mail not found.' });

  try {
    console.log('User', User);
    await User.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    res.status(422).send({ error: 'Invalid Password or E-mail' });
  }
});

module.exports = router;
