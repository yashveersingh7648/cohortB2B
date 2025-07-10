// const crypto = require('crypto');
// const OTP = require('../models/OTP');
// const transporter = require('../utils/emailSender');

// // Business email validation
// const validateBusinessEmail = (email) => {
//   const ALLOWED_PREFIXES = ['support', 'info', 'admin', 'hr', 'accounts'];
//   const COMPANY_DOMAIN = '@ciphererp.com';
  
//   if (!email.includes('@')) return false;
  
//   const [prefix] = email.split('@');
//   return email.endsWith(COMPANY_DOMAIN) && 
//          ALLOWED_PREFIXES.some(allowedPrefix => prefix.startsWith(allowedPrefix));
// };

// exports.sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!validateBusinessEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Only company business emails (support@, info@, admin@, hr@, accounts@)ciphererp.com are allowed'
//       });
//     }

//     // Generate 6-digit OTP
//     const otp = crypto.randomInt(100000, 999999).toString();
//     const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

//     // Save OTP to database
//     await OTP.findOneAndUpdate(
//       { email },
//       { otp, expiresAt },
//       { upsert: true, new: true }
//     );

//     // Send email
//     const mailOptions = {
//       from: `"CipherERP Business Portal" <support@ciphererp.com>`,
//       to: email,
//       subject: 'Your Business Portal Access Code',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #2563eb;">Business Portal Verification</h2>
//           <p>Your one-time access code is:</p>
//           <div style="font-size: 24px; font-weight: bold; margin: 20px 0; padding: 15px; 
//                background: #f3f4f6; display: inline-block; letter-spacing: 5px;">
//             ${otp}
//           </div>
//           <p>This code will expire in 15 minutes.</p>
//           <p style="color: #6b7280; font-size: 12px;">
//             For security reasons, please do not share this code.
//           </p>
//         </div>
//       `
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({
//       success: true,
//       message: 'OTP sent to your business email',
//       ...(process.env.NODE_ENV === 'development' && { debugOtp: otp })
//     });

//   } catch (error) {
//     console.error('Business OTP error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to send OTP to business email'
//     });
//   }
// };

// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!validateBusinessEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid business email format'
//       });
//     }

//     if (!otp || otp.length !== 6) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide a valid 6-digit OTP'
//       });
//     }

//     // Verify OTP
//     const validOTP = await OTP.findOneAndDelete({
//       email,
//       otp,
//       expiresAt: { $gt: new Date() }
//     });

//     if (!validOTP) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid or expired OTP'
//       });
//     }

//     // Successful verification
//     res.json({
//       success: true,
//       message: 'OTP verified successfully',
//       user: { email, verified: true }
//     });

//   } catch (error) {
//     console.error('OTP verification error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error verifying OTP'
//     });
//   }
// };














// Testing ka leya 
const crypto = require('crypto');
const OTP = require('../models/OTP');
const transporter = require('../utils/emailSender');

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

    // Save OTP to database
    await OTP.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // Send email
    const mailOptions = {
      from: `"CipherERP Support" <yashveersingh7648@gmail.com>`,
      to: email,
      subject: 'Your OTP Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">OTP Verification</h2>
          <p>Your one-time verification code is:</p>
          <div style="font-size: 24px; font-weight: bold; margin: 20px 0; padding: 15px; 
               background: #f3f4f6; display: inline-block; letter-spacing: 5px;">
            ${otp}
          </div>
          <p>This code expires in 15 minutes.</p>
          <p style="color: #6b7280; font-size: 12px;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
      text: `Your OTP code is: ${otp}\nExpires in 15 minutes.`
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: `OTP sent to ${email}`,
      // For testing only - remove in production
      ...(process.env.NODE_ENV === 'development' && { debugOtp: otp })
    });

  } catch (error) {
    console.error('OTP send error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp || otp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid email and 6-digit OTP'
      });
    }

    const validOTP = await OTP.findOneAndDelete({
      email,
      otp,
      expiresAt: { $gt: new Date() }
    });

    if (!validOTP) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    res.json({
      success: true,
      message: 'OTP verified successfully'
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP'
    });
  }
};

module.exports = {
  sendOTP,
  verifyOTP
};