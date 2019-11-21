const express = require('express');
const mongoose = require('mongoose');
const Track = require('../models/Track');
const auth = require('../middlewares/auth');

const router = express.Router();
router.use(auth);

router.get('/', async (req, res) => {
  const userId = req.user._id;
  const tracks = await Track.find({ userId });
  res.status(200).send(tracks);
});

router.get('/:id', async (req, res) => {});

router.post('/', async (req, res) => {
  const { name, locations } = req.body;
  const userId = req.user._id;
  if (!name || !locations)
    return res
      .status(422)
      .send({ error: 'You must provide a name and locations' });

  try {
    const track = new Track({ userId, name, locations });
    await track.save();
    res.status(200).send(track);
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});

module.exports = router;
