// const nodemailer = require('nodemailer');
// require('dotenv').config();

// // Email transporter configuration for Gmail
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // your Gmail
//     pass: process.env.EMAIL_PASS  // your app password
//   }
// });

// // Verify connection
// transporter.verify((error) => {
//   if (error) {
//     console.error('❌ Email setup error:', error);
//     console.log('Troubleshooting:');
//     console.log('1. Enable "Less secure apps" in Google account');
//     console.log('2. Or create App Password if 2FA is enabled');
//     console.log('3. Check .env file has correct credentials');
//   } else {
//     console.log('✅ Email service ready for OTPs');
    
//     // Test email to yourself
//     transporter.sendMail({
//       from: `"CipherERP OTP Service" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER,
//       subject: 'OTP Service Test - Success!',
//       text: 'Your OTP email service is working correctly',
//       html: '<p><strong>OTP emails will work!</strong></p>'
//     })
//     .then(info => console.log('Test email sent:', info.messageId))
//     .catch(err => console.error('Test email failed:', err));
//   }
// });

// module.exports = transporter;
























// testing
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yashveersingh7648@gmail.com',
    pass: 'qooypnqesetvinbz'
  },
  tls: {
    rejectUnauthorized: false // Temporary for testing
  }
});

// Test email configuration
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email setup error:', error);
    console.log('🔧 Quick fixes:');
    console.log('1. Enable Less Secure Apps: https://myaccount.google.com/lesssecureapps');
    console.log('2. Unlock Captcha: https://accounts.google.com/DisplayUnlockCaptcha');
  } else {
    console.log('✅ Email service ready');
    
    // Send test email to YOUR REAL EMAIL
    const testEmail = 'your-real-email@gmail.com'; // CHANGE THIS TO YOUR EMAIL
    transporter.sendMail({
      from: '"OTP Tester" <yashveersingh7648@gmail.com>',
      to: testEmail,
      subject: 'Test OTP Email Working',
      text: 'If you receive this, your OTP system will work'
    })
    .then(info => console.log(`Test email sent to ${testEmail}`))
    .catch(err => console.error('Test email failed:', err));
  }
});

module.exports = transporter;