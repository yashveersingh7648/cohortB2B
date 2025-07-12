// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   agencyId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Agency' 
//   },
//   role: { 
//     type: String, 
//     enum: ['admin', 'agency_admin', 'user'], 
//     default: 'user' 
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);




// 12-07-25
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    select: false
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  isGoogleAuth: {
    type: Boolean,
    default: false
  },
  profileImage: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);