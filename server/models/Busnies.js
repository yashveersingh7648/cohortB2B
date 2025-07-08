const mongoose = require('mongoose');

const busniesSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyType: { type: String, required: true },
  contactName: { type: String, required: true },
  designation: { type: String, required: true },
  productsHandling: { type: String, required: true },
  companyCity: { type: String, required: true },
  companyPincode: { type: String, required: true },
  companyState: { type: String, required: true },
  companyEmail: { 
    type: String, 
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Busnies', busniesSchema);