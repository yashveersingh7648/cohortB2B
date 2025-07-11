


const express = require("express");
const FormDataModel = require("../models/FormData");
const router = express.Router();

// GET all agencies or filtered list
router.get("/", async (req, res) => {
  const { q } = req.query;

  const filter = q
    ? {
        $or: [
          { companyName: { $regex: q, $options: "i" } },
          { companyCity: { $regex: q, $options: "i" } },
          { companyPincode: { $regex: q, $options: "i" } },
        ],
      }
    : {};

  try {
    const results = await FormDataModel.find(filter)
      .lean()
      .select([
        "companyName",
        "categoryType",
        "contactName",
        "companyPhone",
        "totalManpower",
        "companyGst",
        "companyState",
        "companyCity",
        "companyPincode",
        "companyLogo",
        "companyBanner",
        "profilePdf",
        "isActive",
      ]);

    const dataWithUrls = results.map((item) => ({
      ...item,
      logoUrl: item.companyLogo
        ? `http://localhost:8000/uploads/${item.companyLogo}`
        : null,
      bannerUrl: item.companyBanner
        ? `http://localhost:8000/uploads/${item.companyBanner}`
        : null,
      pdfUrl: item.profilePdf
        ? `http://localhost:8000/uploads/${item.profilePdf}`
        : null,
    }));

    res.json(dataWithUrls);
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🔥 NEW: GET single agency by ID
router.get("/:id", async (req, res) => {
  try {
    const agency = await FormDataModel.findById(req.params.id).lean();
    if (!agency) {
      return res.status(404).json({ message: "Agency not found" });
    }

    agency.logoUrl = agency.companyLogo
      ? `http://localhost:8000/uploads/${agency.companyLogo}`
      : null;
    agency.bannerUrl = agency.companyBanner
      ? `http://localhost:8000/uploads/${agency.companyBanner}`
      : null;
    agency.pdfUrl = agency.profilePdf
      ? `http://localhost:8000/uploads/${agency.profilePdf}`
      : null;

    res.json(agency);
  } catch (err) {
    console.error("Error fetching agency:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    // Find by email instead of ID
    const agency = await AgencyModel.findOne({ companyEmail: email }).lean();
    
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    // Add file URLs if needed
    agency.logoUrl = agency.companyLogo 
      ? `${process.env.BASE_URL || 'http://localhost:8000'}/uploads/${agency.companyLogo}`
      : null;
    
    res.json(agency);
  } catch (err) {
    console.error('Error fetching agency:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
