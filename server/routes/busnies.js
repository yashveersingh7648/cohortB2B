const express = require('express');
const router = express.Router();
const Busnies = require('../models/Busnies');

// Create new business entry
router.post('/', async (req, res) => {
  try {
    const { 
      companyName,
      companyType,
      contactName,
      designation,
      productsHandling,
      companyCity,
      companyPincode,
      companyState,
      companyEmail
    } = req.body;

    // Validate required fields
    if (!companyName || !companyType || !contactName || !designation || 
        !productsHandling || !companyCity || !companyPincode || !companyState || !companyEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Create new business document
    const newBusnies = new Busnies({
      companyName,
      companyType,
      contactName,
      designation,
      productsHandling,
      companyCity,
      companyPincode,
      companyState,
      companyEmail
    });

    // Save to MongoDB
    const savedBusnies = await newBusnies.save();

    res.status(201).json({
      success: true,
      message: 'Business details saved successfully',
      data: savedBusnies
    });

  } catch (error) {
    console.error('Error saving business details:', error);
    
    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern.companyEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
        errors: { companyEmail: 'This email is already registered' }
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Server error occurred',
      error: error.message 
    });
  }
});
// routes/busnies.js
router.get('/', async (req, res) => {
  try {
    const { q = '', field = 'companyName' } = req.query;
    
    let query = {};
    if (q) {
      query[field] = { $regex: q, $options: 'i' }; // Case-insensitive search
    }

    const businesses = await Busnies.find(query);
    
    res.json({
      success: true,
      data: businesses
    });
    
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error occurred',
      error: error.message 
    });
  }
});
module.exports = router;