const express = require('express');
const router = express.Router();
const Lender = require('../models/Lender');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const lender = await Lender.findOne({ email });
  if (lender && lender.password === password) {
    req.session.lenderId = lender._id;
    res.redirect('/lender-dashboard.html');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

module.exports = router;
