
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const Company = require('../models/FormData');

// Configure uploads directory
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed!'), false);
    }
  }
});

// Handle company form submission
router.post('/', upload.fields([
  { name: 'companyLogo', maxCount: 1 },
  { name: 'companyBanner', maxCount: 1 },
  { name: 'profilePdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const formData = req.body;
    const fileData = {};

    // Process uploaded files
    if (req.files) {
      if (req.files.companyLogo) fileData.companyLogo = req.files.companyLogo[0].filename;
      if (req.files.companyBanner) fileData.companyBanner = req.files.companyBanner[0].filename;
      if (req.files.profilePdf) fileData.profilePdf = req.files.profilePdf[0].filename;
    }

    // Convert establishment date to proper Date object
    if (formData.companyEstablished) {
      // Handle both MM/YYYY and ISO date formats
      if (formData.companyEstablished.includes('/')) {
        const [month, year] = formData.companyEstablished.split('/');
        formData.companyEstablished = new Date(year, month - 1, 1);
      } else {
        formData.companyEstablished = new Date(formData.companyEstablished);
      }
    }

    // Create and save company
    const newCompany = await Company.create({
      ...formData,
      ...fileData
    });

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      data: newCompany
    });

  } catch (error) {
    console.error('Error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      
      // Clean up uploaded files if validation fails
      if (req.files) {
        Object.values(req.files).forEach(fileArray => {
          fileArray.forEach(file => {
            try {
              fs.unlinkSync(path.join(uploadsDir, file.filename));
            } catch (err) {
              console.error('Error deleting file:', err);
            }
          });
        });
      }
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

module.exports = router;