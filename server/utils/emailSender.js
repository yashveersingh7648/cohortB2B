const nodemailer = require('nodemailer');
require('dotenv').config();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS  
  }
});

// Verify connection
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email setup error:', error);
    console.log('Troubleshooting:');
    console.log('1. Enable "Less secure apps" in Google account');
    console.log('2. Or create App Password if 2FA is enabled');
    console.log('3. Check .env file has correct credentials');
  } else {
    console.log('✅ Email service ready for OTPs');
    
    // Test email - uses display email only
    transporter.sendMail({
      from: `"COHORT Portal" <cohort@gmail.com>`, 
      to: process.env.ADMIN_EMAIL || 'admin@example.com', 
      subject: 'COHORT OTP Service Test - Success!',
      text: 'Your COHORT OTP email service is working correctly',
      html: '<p><strong>COHORT OTP emails will work!</strong></p>'
    })
    .then(info => console.log('Test email sent from COHORT Portal'))
    .catch(err => console.error('Test email failed:', err));
  }
});

module.exports = transporter;






















// testing
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// // Debug log to check if env variables are loading
// console.log('Email User:', process.env.BUSINESS_EMAIL);
// console.log('Email Pass:', process.env.BUSINESS_EMAIL_PASSWORD ? '*****' : 'NOT FOUND');

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.BUSINESS_EMAIL,
//     pass: process.env.BUSINESS_EMAIL_PASSWORD
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// // Verify connection
// transporter.verify((error) => {
//   if (error) {
//     console.error('❌ Email setup failed:', error);
//     console.log('🔧 Troubleshooting Steps:');
//     console.log('1. Check .env file exists in server directory');
//     console.log('2. Verify BUSINESS_EMAIL and BUSINESS_EMAIL_PASSWORD are set');
//     console.log('3. Ensure email password is correct (use App Password if 2FA enabled)');
//     console.log('4. Check Google Account > Security > Less secure app access');
//   } else {
//     console.log('✅ Email server is ready');
//   }
// });

// module.exports = transporter;