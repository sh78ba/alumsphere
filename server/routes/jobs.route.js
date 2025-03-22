const express = require('express');
const jwt = require('jsonwebtoken');
const Job = require('../models/Job');
const User = require('../models/User');

const router = express.Router();
const jwtSecret = 'your_jwt_secret'; // use env variable in production

// Middleware to check token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Post a job (only alumni)
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const user = await User.findById(req.user);
    if (!user || !user.isAlumni)
      return res.status(401).json({ msg: 'Only alumni can post jobs' });
    
    const job = new Job({ title, description, postedBy: user._id });
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', ['name', 'email']);
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
