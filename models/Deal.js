const mongoose = require('mongoose');
const dealSchema = new mongoose.Schema({
  propertyAddress: String,
  loanAmount: Number,
  creditScore: Number,
  status: String,
  brokerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Broker' }
});
module.exports = mongoose.model('Deal', dealSchema);
