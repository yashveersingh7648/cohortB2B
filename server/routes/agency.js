// const express = require('express');
// const router = express.Router();
// const authenticate = require('../middleware/authenticateAgency');
// const Agency = require('../models/AgencyModel');

// // Get logged-in agency profile
// router.get('/profile', authenticate, async (req, res) => {
//   try {
//     // Find agency by userEmail (from authenticated user)
//     const agency = await Agency.findOne({ userEmail: req.user.email });
    
//     if (!agency) {
//       return res.status(404).json({
//         success: false,
//         message: 'Agency not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Agency profile fetched successfully',
//       data: agency
//     });

//   } catch (err) {
//     console.error('Error fetching agency:', err);
//     res.status(500).json({
//       success: false,
//       message: 'Server error while fetching agency profile'
//     });
//   }
// });

// module.exports = router;









// routes/agency.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticateAgency');
const Agency = require('../models/AgencyModel');

router.get('/profile', authenticate, async (req, res) => {
  try {
    const agency = await Agency.findOne({ userEmail: req.user.email });

    if (!agency) {
      return res.status(404).json({ success: false, message: 'Agency not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Agency profile fetched successfully',
      data: agency
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
