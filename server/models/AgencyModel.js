const mongoose = require("mongoose");

const AgencySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyEmail: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  categoryType: String,
  contactName: String,
  companyGst: String,
  companyPhone: String,
  companyCity: String,
  companyPincode: String,
  companyState: String,
  totalManpower: String,
  companyLogo: String,
  companyBanner: String,
  profilePdf: String,
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add indexes for better performance
AgencySchema.index({ companyEmail: 1 }); // For email searches
AgencySchema.index({ companyName: 'text' }); // For text searches

const AgencyModel = mongoose.model("Agency", AgencySchema);

module.exports = AgencyModel;