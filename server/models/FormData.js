// const mongoose = require('mongoose');

// const companySchema = new mongoose.Schema({
//   // Company Basic Information
//   companyName: { 
//     type: String, 
//     required: [true, 'Company name is required'],
//     trim: true,
//     maxlength: [100, 'Company name cannot exceed 100 characters']
//   },
//   companyType: { 
//     type: String, 
//     required: [true, 'Company type is required'],
//     enum: {
//       values: ['Private Limited', 'Public Limited', 'LLP', 'Partnership', 'Proprietorship', 'Other'],
//       message: 'Please select a valid company type'
//     }
//   },
//   categoryType: { 
//     type: String, 
//     required: [true, 'Category type is required'],
//     enum: {
//       values: ['Call Centre', 'Tele Calling', 'Field', 'Hybrid', 'Legal', 'Digital', 'Other'],
//       message: 'Please select a valid category type'
//     }
//   },
//   companyRegNo: { 
//     type: String, 
//     required: [true, 'Registration number is required'],
//     trim: true,
//     maxlength: [50, 'Registration number cannot exceed 50 characters']
//   },
//   companyEstablished: { 
//     type: Date, 
//     required: [true, 'Establishment date is required'],
//     validate: {
//       validator: function(value) {
//         return value <= new Date();
//       },
//       message: 'Establishment date cannot be in the future'
//     }
//   },

//   // Contact Information
//   contactName: { 
//     type: String, 
//     required: [true, 'Contact name is required'],
//     trim: true,
//     maxlength: [50, 'Contact name cannot exceed 50 characters']
//   },
//   totalManpower: { 
//     type: Number, 
//     required: [true, 'Total manpower is required'],
//     min: [1, 'Total manpower must be at least 1'],
//     max: [100000, 'Total manpower cannot exceed 100,000']
//   },
//   companyEmail: { 
//     type: String, 
//     required: [true, 'Email is required'],
//     match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
//     trim: true,
//     lowercase: true,
//     maxlength: [100, 'Email cannot exceed 100 characters']
//   },
//   companyPhone: { 
//     type: String, 
//     required: [true, 'Phone number is required'],
//     match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
//     trim: true
//   },
//   operationalLocations: { 
//     type: String, 
//     required: [true, 'Operational locations are required'],
//     trim: true,
//     maxlength: [500, 'Operational locations cannot exceed 500 characters']
//   },

//   // Registration Information
//   msmeRegistered: { 
//     type: String, 
//     required: [true, 'MSME registration status is required'],
//     enum: {
//       values: ['Yes', 'No'],
//       message: 'Please select MSME registration status'
//     }
//   },
//   companyGst: { 
//     type: String, 
//     required: [true, 'GST number is required'],
//     match: [/^[0-9A-Z]{15}$/, 'Please enter a valid 15-digit GST number'],
//     trim: true,
//     uppercase: true
//   },
//   draCertified: { 
//     type: String, 
//     required: [true, 'DRA certification status is required'],
//     enum: {
//       values: ['Yes', 'No'],
//       message: 'Please select DRA certification status'
//     }
//   },

//   // Address Information
//   companyAddress: { 
//     type: String, 
//     required: [true, 'Company address is required'],
//     trim: true,
//     maxlength: [500, 'Address cannot exceed 500 characters']
//   },
//   workstations: { 
//     type: Number, 
//     required: [true, 'Number of workstations is required'],
//     min: [1, 'Workstations must be at least 1'],
//     max: [10000, 'Workstations cannot exceed 10,000']
//   },
//   associatedCompanies: { 
//   type: Number, 
//   required: [true, 'Number of associated companies is required'],
//   min: [0, 'Associated companies cannot be negative'],
//   max: [100000, 'Associated companies cannot exceed 100,000'] // Updated max here
// },
//   associatedWith: { 
//     type: String, 
//     required: [true, 'Associated with information is required'],
//     trim: true,
//     maxlength: [200, 'Associated with cannot exceed 200 characters']
//   },

//   // Business Information
//   expertise: { 
//     type: String, 
//     required: [true, 'Expertise is required'],
//     enum: {
//       values: ['Flows', 'Recovery', 'Both'],
//       message: 'Please select valid expertise'
//     }
//   },
//   productType: { 
//     type: String, 
//     required: [true, 'Product type is required'],
//     enum: {
//       values: ['Unsecured', 'Secured'],
//       message: 'Please select valid product type'
//     }
//   },
//   productsHandling: { 
//     type: String, 
//     required: [true, 'Products handling is required'],
//     enum: {
//       values: ['PL/BL', 'Credit Card', 'STPL', 'CD', 'HL/LAP', 'Auto Loan', 'Two Wheeler', 'CV/CE', 'Gold Loan'],
//       message: 'Please select valid products handling'
//     }
//   },

//   // Location Information
//   companyCity: { 
//     type: String, 
//     required: [true, 'City is required'],
//     trim: true,
//     maxlength: [50, 'City name cannot exceed 50 characters']
//   },
//   companyPincode: { 
//     type: String, 
//     required: [true, 'Pincode is required'],
//     match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode'],
//     trim: true
//   },
//   companyCountry: { 
//     type: String, 
//     required: [true, 'Country is required'],
//     enum: {
//       values: ['India', 'USA', 'UK', 'Canada', 'Australia'],
//       message: 'Please select a valid country'
//     }
//   },
//   companyState: { 
//     type: String, 
//     required: [true, 'State is required'],
//     enum: {
//       values: ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'],
//       message: 'Please select a valid state'
//     }
//   },
//   comments: { 
//     type: String, 
//     required: [true, 'Comments are required'],
//     trim: true,
//     maxlength: [1000, 'Comments cannot exceed 1000 characters']
//   },

//   // File Uploads
//   companyLogo: { 
//     type: String,
//     trim: true,
//     validate: {
//       validator: function(v) {
//         return /\.(jpg|jpeg|png|gif)$/i.test(v);
//       },
//       message: 'Company logo must be an image file (jpg, jpeg, png, gif)'
//     }
//   },
//   companyBanner: { 
//     type: String,
//     trim: true,
//     validate: {
//       validator: function(v) {
//         return /\.(jpg|jpeg|png|gif)$/i.test(v);
//       },
//       message: 'Company banner must be an image file (jpg, jpeg, png, gif)'
//     }
//   },
//   profilePicture: { 
//     type: String,
//     trim: true,
//     validate: {
//       validator: function(v) {
//         return /\.(jpg|jpeg|png|gif)$/i.test(v);
//       },
//       message: 'Profile picture must be an image file (jpg, jpeg, png, gif)'
//     }
//   },
//   profilePdf: {
//     type: String,
//     trim: true,
//     validate: {
//       validator: function(v) {
//         return /\.pdf$/i.test(v);
//       },
//       message: 'Company profile must be a PDF file'
//     }
//   },

//   // System Fields
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   updatedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// }, { 
//   timestamps: true,
//   toJSON: { 
//     virtuals: true,
//     transform: function(doc, ret) {
//       delete ret.__v;
//       delete ret.createdAt;
//       delete ret.updatedAt;
//       return ret;
//     }
//   },
//   toObject: { 
//     virtuals: true,
//     transform: function(doc, ret) {
//       delete ret.__v;
//       delete ret.createdAt;
//       delete ret.updatedAt;
//       return ret;
//     }
//   }
// });

// // Virtual for formatted establishment date
// companySchema.virtual('establishedYear').get(function () {
//   return this.companyEstablished instanceof Date
//     ? this.companyEstablished.getFullYear()
//     : null;
// });

// companySchema.virtual('establishedMonth').get(function () {
//   return this.companyEstablished instanceof Date
//     ? this.companyEstablished.getMonth() + 1
//     : null;
// });

// // Indexes for better query performance
// companySchema.index({ companyName: 1 });
// companySchema.index({ companyEmail: 1 }, { unique: true });
// companySchema.index({ companyGst: 1 }, { unique: true });
// companySchema.index({ companyPhone: 1 });
// companySchema.index({ companyCity: 1 });
// companySchema.index({ companyState: 1 });
// companySchema.index({ companyCountry: 1 });
// companySchema.index({ isActive: 1 });

// // Middleware to validate before save
// companySchema.pre('save', function(next) {
//   // You can add any pre-save validation logic here
//   next();
// });

// // Static method to find active companies
// companySchema.statics.findActive = function() {
//   return this.find({ isActive: true });
// };

// // Instance method to get formatted address
// companySchema.methods.getFormattedAddress = function() {
//   return `${this.companyAddress}, ${this.companyCity}, ${this.companyState} - ${this.companyPincode}, ${this.companyCountry}`;
// };


// // Add these virtuals right before exporting the model
// companySchema.virtual('logoUrl').get(function() {
//   if (!this.companyLogo) return null;
//   const normalizedPath = this.companyLogo.startsWith('/Uploads/') 
//     ? this.companyLogo 
//     : `/Uploads/${this.companyLogo}`;
//   return `${process.env.BASE_URL || 'http://localhost:8000'}${normalizedPath}`;
// });

// companySchema.virtual('bannerUrl').get(function() {
//   if (!this.companyBanner) return null;
//   const normalizedPath = this.companyBanner.startsWith('/Uploads/') 
//     ? this.companyBanner 
//     : `/Uploads/${this.companyBanner}`;
//   return `${process.env.BASE_URL || 'http://localhost:8000'}${normalizedPath}`;
// });

// companySchema.virtual('pdfUrl').get(function() {
//   if (!this.profilePdf) return null;
//   const normalizedPath = this.profilePdf.startsWith('/Uploads/') 
//     ? this.profilePdf 
//     : `/Uploads/${this.profilePdf}`;
//   return `${process.env.BASE_URL || 'http://localhost:8000'}${normalizedPath}`;
// });

// // Enable virtuals
// companySchema.set('toJSON', { virtuals: true });
// companySchema.set('toObject', { virtuals: true });





// module.exports = mongoose.model('Company', companySchema);






const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  // Company Basic Information
   companyName: { 
    type: String, 
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
 companyType: { 
    type: String, 
    required: [true, 'Company type is required'],
    enum: ['Private Limited', 'Public Limited', 'LLP', 'Partnership', 'Proprietorship', 'Other']
  },
  categoryType: { 
    type: String, 
    required: [true, 'Category type is required'],
    enum: {
      values: ['Call Centre', 'Tele Calling', 'Field', 'Hybrid', 'Legal', 'Digital', 'Other'],
      message: 'Please select a valid category type'
    }
  },
  companyRegNo: { 
    type: String, 
    required: [true, 'Registration number is required'],
    trim: true,
    maxlength: [50, 'Registration number cannot exceed 50 characters']
  },
  companyEstablished: { 
    type: Date, 
    required: [true, 'Establishment date is required'],
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Establishment date cannot be in the future'
    }
  },

  // Contact Information
  contactName: { 
    type: String, 
    required: [true, 'Contact name is required'],
    trim: true,
    maxlength: [50, 'Contact name cannot exceed 50 characters']
  },
  totalManpower: { 
    type: Number, 
    required: [true, 'Total manpower is required'],
    min: [1, 'Total manpower must be at least 1'],
    max: [100000, 'Total manpower cannot exceed 100,000']
  },
  companyEmail: { 
    type: String, 
    required: [true, 'Email is required'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    trim: true,
    lowercase: true,
    maxlength: [100, 'Email cannot exceed 100 characters']
  },
 userEmail: { 
    type: String, 
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
    trim: true,
    lowercase: true
  },
  companyPhone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
    trim: true
  },
  operationalLocations: { 
    type: String, 
    required: [true, 'Operational locations are required'],
    trim: true,
    maxlength: [500, 'Operational locations cannot exceed 500 characters']
  },

  // Registration Information
  msmeRegistered: { 
    type: String, 
    required: [true, 'MSME registration status is required'],
    enum: {
      values: ['Yes', 'No'],
      message: 'Please select MSME registration status'
    }
  },
  companyGst: { 
    type: String, 
    required: [true, 'GST number is required'],
    validate: {
      validator: function(v) {
        // Updated GST validation pattern
        return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v);
      },
      message: props => `${props.value} is not a valid GST number! Format: 22AAAAA0000A1Z5`
    },
    trim: true,
    uppercase: true
  },
  draCertified: { 
    type: String, 
    required: [true, 'DRA certification status is required'],
    enum: {
      values: ['Yes', 'No'],
      message: 'Please select DRA certification status'
    }
  },

  // Address Information
  companyAddress: { 
    type: String, 
    required: [true, 'Company address is required'],
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  workstations: { 
    type: Number, 
    required: [true, 'Number of workstations is required'],
    min: [1, 'Workstations must be at least 1'],
    max: [10000, 'Workstations cannot exceed 10,000']
  },
  associatedCompanies: { 
  type: Number, 
  required: [true, 'Number of associated companies is required'],
  min: [0, 'Associated companies cannot be negative'],
  max: [100000, 'Associated companies cannot exceed 100,000'] // Updated max here
},
  associatedWith: { 
    type: String, 
    required: [true, 'Associated with information is required'],
    trim: true,
    maxlength: [200, 'Associated with cannot exceed 200 characters']
  },

  // Business Information
  expertise: { 
    type: String, 
    required: [true, 'Expertise is required'],
    enum: {
      values: ['Flows', 'Recovery', 'Both'],
      message: 'Please select valid expertise'
    }
  },
  productType: { 
    type: String, 
    required: [true, 'Product type is required'],
    enum: {
      values: ['Unsecured', 'Secured'],
      message: 'Please select valid product type'
    }
  },
  productsHandling: { 
    type: String, 
    required: [true, 'Products handling is required'],
    enum: {
      values: ['PL/BL', 'Credit Card', 'STPL', 'CD', 'HL/LAP', 'Auto Loan', 'Two Wheeler', 'CV/CE', 'Gold Loan'],
      message: 'Please select valid products handling'
    }
  },

  // Location Information
  companyCity: { 
    type: String, 
    required: [true, 'City is required'],
    trim: true,
    maxlength: [50, 'City name cannot exceed 50 characters']
  },
  companyPincode: { 
    type: String, 
    required: [true, 'Pincode is required'],
    match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode'],
    trim: true
  },
  companyCountry: { 
    type: String, 
    required: [true, 'Country is required'],
    enum: {
      values: ['India', 'USA', 'UK', 'Canada', 'Australia'],
      message: 'Please select a valid country'
    }
  },
  companyState: { 
    type: String, 
    required: [true, 'State is required'],
    enum: {
      values: ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'],
      message: 'Please select a valid state'
    }
  },
  comments: { 
    type: String, 
    required: [true, 'Comments are required'],
    trim: true,
    maxlength: [1000, 'Comments cannot exceed 1000 characters']
  },

  // File Uploads
  companyLogo: { 
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /\.(jpg|jpeg|png|gif)$/i.test(v);
      },
      message: 'Company logo must be an image file (jpg, jpeg, png, gif)'
    }
  },
  companyBanner: { 
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /\.(jpg|jpeg|png|gif)$/i.test(v);
      },
      message: 'Company banner must be an image file (jpg, jpeg, png, gif)'
    }
  },
  profilePicture: { 
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /\.(jpg|jpeg|png|gif)$/i.test(v);
      },
      message: 'Profile picture must be an image file (jpg, jpeg, png, gif)'
    }
  },
  profilePdf: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /\.pdf$/i.test(v);
      },
      message: 'Company profile must be a PDF file'
    }
  },

  // System Fields
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { 
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    }
  },
  toObject: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    }
  }
});

// Virtual for formatted establishment date
companySchema.virtual('establishedYear').get(function () {
  return this.companyEstablished instanceof Date
    ? this.companyEstablished.getFullYear()
    : null;
});

companySchema.virtual('establishedMonth').get(function () {
  return this.companyEstablished instanceof Date
    ? this.companyEstablished.getMonth() + 1
    : null;
});

// Indexes for better query performance
companySchema.index({ companyName: 1 });
companySchema.index({ companyEmail: 1 }, { unique: true });
companySchema.index({ companyGst: 1 }, { unique: true });
companySchema.index({ companyPhone: 1 });
companySchema.index({ companyCity: 1 });
companySchema.index({ companyState: 1 });
companySchema.index({ companyCountry: 1 });
companySchema.index({ isActive: 1 });

// Middleware to validate before save
companySchema.pre('save', function(next) {
  // You can add any pre-save validation logic here
  next();
});

// Static method to find active companies
companySchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

// Instance method to get formatted address
companySchema.methods.getFormattedAddress = function() {
  return `${this.companyAddress}, ${this.companyCity}, ${this.companyState} - ${this.companyPincode}, ${this.companyCountry}`;
};


// Add these virtuals right before exporting the model
companySchema.virtual('logoUrl').get(function() {
  if (!this.companyLogo) return null;
  const normalizedPath = this.companyLogo.startsWith('/Uploads/') 
    ? this.companyLogo 
    : `/Uploads/${this.companyLogo}`;
  return `${process.env.BASE_URL || 'http://localhost:8000'}${normalizedPath}`;
});

companySchema.virtual('bannerUrl').get(function() {
  if (!this.companyBanner) return null;
  const normalizedPath = this.companyBanner.startsWith('/Uploads/') 
    ? this.companyBanner 
    : `/Uploads/${this.companyBanner}`;
  return `${process.env.BASE_URL || 'http://localhost:8000'}${normalizedPath}`;
});

companySchema.virtual('pdfUrl').get(function() {
  if (!this.profilePdf) return null;
  const normalizedPath = this.profilePdf.startsWith('/Uploads/') 
    ? this.profilePdf 
    : `/Uploads/${this.profilePdf}`;
  return `${process.env.BASE_URL || 'http://localhost:8000'}${normalizedPath}`;
});

// Enable virtuals
companySchema.set('toJSON', { virtuals: true });
companySchema.set('toObject', { virtuals: true });





module.exports = mongoose.model('Company', companySchema);