const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(session({
  secret: 'mortgage_secret',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// Routes
const brokerRoutes = require('./routes/brokerRoutes');
const lenderRoutes = require('./routes/lenderRoutes');
app.use('/api/broker', brokerRoutes);
app.use('/api/lender', lenderRoutes);

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
