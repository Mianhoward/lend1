const mongoose = require('mongoose');
const brokerSchema = new mongoose.Schema({
  email: String,
  password: String
});
module.exports = mongoose.model('Broker', brokerSchema);
