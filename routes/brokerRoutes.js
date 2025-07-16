const express = require('express');
const router = express.Router();
const Broker = require('../models/Broker');
const Deal = require('../models/Deal');

// Broker login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const broker = await Broker.findOne({ email });
  if (broker && broker.password === password) {
    req.session.brokerId = broker._id;
    res.redirect('/broker-dashboard.html');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Upload a deal
router.post('/upload-deal', async (req, res) => {
  if (!req.session.brokerId) return res.status(403).send('Unauthorized');
  const { propertyAddress, loanAmount, creditScore } = req.body;
  try {
    const deal = new Deal({
      propertyAddress,
      loanAmount,
      creditScore,
      brokerId: req.session.brokerId,
      status: 'submitted'
    });
    await deal.save();
    res.redirect('/broker-dashboard.html');
  } catch (err) {
    res.status(500).send('Error submitting deal');
  }
});

module.exports = router;
