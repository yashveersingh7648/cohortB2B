// server/models/AgencyModel.js
const mongoose = require("mongoose");

const AgencySchema = new mongoose.Schema({
  companyName: String,
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
}, { timestamps: true });

const AgencyModel = mongoose.model("Agency", AgencySchema);

module.exports = AgencyModel;
