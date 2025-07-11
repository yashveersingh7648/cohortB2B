const express = require("express");
const AgencyModel = require("../models/AgencyModel");
const router = express.Router();

// Get agency by email
router.get("/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    
    const agency = await AgencyModel.findOne({ companyEmail: email }).lean();
    
    if (!agency) {
      return res.status(404).json({ 
        success: false,
        message: "Agency not found with this email" 
      });
    }

    // Add file URLs
    const baseUrl = process.env.BASE_URL || 'http://localhost:8000';
    agency.logoUrl = agency.companyLogo ? `${baseUrl}/uploads/${agency.companyLogo}` : null;
    agency.bannerUrl = agency.companyBanner ? `${baseUrl}/uploads/${agency.companyBanner}` : null;
    agency.pdfUrl = agency.profilePdf ? `${baseUrl}/uploads/${agency.profilePdf}` : null;

    res.json({
      success: true,
      data: agency
    });

  } catch (err) {
    console.error("Error fetching agency:", err);
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching agency",
      error: err.message 
    });
  }
});

module.exports = router;