const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  agencyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Agency' 
  },
  role: { 
    type: String, 
    enum: ['admin', 'agency_admin', 'user'], 
    default: 'user' 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);