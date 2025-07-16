const mongoose = require('mongoose');
const lenderSchema = new mongoose.Schema({
  email: String,
  password: String
});
module.exports = mongoose.model('Lender', lenderSchema);
