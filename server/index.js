
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const axios = require("axios");
const router = express.Router();

// Import routes and models
const submitRoutes = require("./routes/submit");
const dashboardRoutes = require("./routes/dashboard");
const User = require("./models/User");
const Company = require("./models/FormData");
const AgencyModel = require('./models/AgencyModel');
const busniesRoutes = require('./routes/busnies');

const app = express();
const PORT = process.env.PORT || 8000;

// 1. FIXED: Correct Static Files Configuration
const publicDir = path.join(__dirname, 'public');
const uploadsDir = path.join(publicDir, 'uploads');
const upload = multer({ dest: 'server/public/uploads/' });
// Ensure directories exist
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Uploads directory created at:', uploadsDir);
}
const uploadsPath = path.join(__dirname, 'public', 'uploads');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Serve static files with proper headers
app.use('/uploads', express.static(uploadsDir, {
  setHeaders: (res, filePath) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.set('Access-Control-Allow-Credentials', 'true');
    
    // Set proper Content-Type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    if (['.jpg', '.jpeg'].includes(ext)) {
      res.set('Content-Type', 'image/jpeg');
    } else if (ext === '.png') {
      res.set('Content-Type', 'image/png');
    } else if (ext === '.pdf') {
      res.set('Content-Type', 'application/pdf');
    }
  }
}));

// CORS Configuration
app.use('/uploads', express.static(uploadsPath));

// Enable CORS if needed
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// 2. FIXED: File Upload Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Now using absolute path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only image and PDF files are allowed!'), false);
  }
};

// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024 // 10MB limit
//   }
// });

// Database Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/companyDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: "majority"
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

// Rate Limiting
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api/submit", submitRoutes);
app.use("/api/dashboard", dashboardRoutes);
// Routes
app.use('/api/busnies', busniesRoutes);
// 3. ADDED: Debug Endpoints
app.get('/file-info', (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir);
    res.json({
      status: 'success',
      uploadsDir: uploadsDir,
      filesAvailable: files,
      testFileExists: fs.existsSync(path.join(uploadsDir, 'companyLogo-1751612038813-21608629.jpg'))
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
      uploadsDir: uploadsDir,
      dirExists: fs.existsSync(uploadsDir)
    });
  }
});


app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ filePath });
});
// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK",
    uploadsDir: uploadsDir,
    dirExists: fs.existsSync(uploadsDir),
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// Authentication Routes (unchanged)
app.post("/api/register", async (req, res) => {
  /* ... existing code ... */
});

app.post("/api/login", async (req, res) => {
  /* ... existing code ... */
});

// Email Service (unchanged)
app.post("/api/contact-email", async (req, res) => {
  /* ... existing code ... */
});

// // Company Routes
app.use('/api/companies', submitRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  
  // Handle file upload errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ 
      error: "File upload error",
      message: err.message 
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ 
      error: "Invalid token",
      message: "Please log in again" 
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: "Validation error",
      message: err.message 
    });
  }

  // Generic error handler
  res.status(500).json({ 
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Endpoint not found",
    message: "The requested resource could not be found" 
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ 
      error: "File upload error",
      message: err.message 
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ 
      error: "Invalid token",
      message: "Please log in again" 
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: "Validation error",
      message: err.message 
    });
  }

  res.status(500).json({ 
    error: "Internal server error",
    message: err.message
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Endpoint not found",
    message: "The requested resource could not be found",
    availableEndpoints: [
      '/api/submit',
      '/api/dashboard',
      '/uploads',
      '/health',
      '/file-info'
    ]
  });
});

app.get('/api/dashboard/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const agency = await AgencyModel.findById(id);
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }
    res.json(agency);
  } catch (error) {
    console.error('Error fetching agency:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




// Agency profile route pe (server-side)
router.get('/agency/:id', async (req, res) => {
  const agency = await Agency.findById(req.params.id);
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${agency.companyName}</title>
        <meta property="og:title" content="${agency.companyName}" />
        <meta property="og:description" content="${agency.categoryType} in ${agency.companyCity}" />
        <meta property="og:image" content="${agency.logoUrl}" />
        <meta property="og:url" content="https://yourdomain.com/agency/${agency._id}" />
      </head>
      <body>
        <div id="root"></div>
        <script src="/clientApp.js"></script>
      </body>
    </html>
  `;
  
  res.send(html);
});



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📁 Serving files from: ${uploadsDir}`);
  console.log(`📄 Test URL: http://localhost:${PORT}/uploads/companyLogo-1751612038813-21608629.jpg`);
});