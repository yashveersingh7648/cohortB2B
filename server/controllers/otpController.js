// const crypto = require('crypto');
// const OTP = require('../models/OTP');
// const transporter = require('../utils/emailSender');

// // Email validation configuration
// const EMAIL_CONFIG = {
//   ALLOWED_PREFIXES: ['support', 'info', 'admin', 'hr', 'accounts']
// };

// // Enhanced email validation - checks prefix only, any domain allowed
// const validateBusinessEmail = (email) => {
//   if (!email || typeof email !== 'string') return false;
  
//   // Check if email contains exactly one @ symbol
//   const atCount = email.split('@').length - 1;
//   if (atCount !== 1) return false;
  
//   const [prefix] = email.split('@');
  
//   // Validate prefix only - domain can be anything
//   const isValidPrefix = EMAIL_CONFIG.ALLOWED_PREFIXES.some(
//     allowedPrefix => prefix.startsWith(allowedPrefix)
//   );
  
//   return isValidPrefix;
// };

// exports.sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email is required'
//       });
//     }

//     if (!validateBusinessEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: `Only business emails with prefixes (${EMAIL_CONFIG.ALLOWED_PREFIXES.join(', ')}) are allowed. Domain can be anything.`
//       });
//     }

//     // Generate 6-digit OTP
//     const otp = crypto.randomInt(100000, 999999).toString();
//     const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

//     // Save OTP to database
//     await OTP.findOneAndUpdate(
//       { email },
//       { otp, expiresAt },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     // Send email
//     const mailOptions = {
//        from: `"COHORT Portal" <cohort-real-email@gmail.com>`,
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

//     if (!email || !otp) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and OTP are required'
//       });
//     }

//     if (!validateBusinessEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid business email format'
//       });
//     }

//     if (otp.length !== 6 || !/^\d+$/.test(otp)) {
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












const crypto = require('crypto');
const OTP = require('../models/OTP');
const transporter = require('../utils/emailSender');

// Email configuration
const EMAIL_CONFIG = {
  ALLOWED_PREFIXES: ['support', 'info', 'admin', 'hr', 'accounts'],
  SENDER_NAME: 'COHORT Portal',
  SENDER_EMAIL: 'cohort@gmail.com' 
};

// Validate business email format
const validateBusinessEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  const [prefix] = email.split('@');
  return EMAIL_CONFIG.ALLOWED_PREFIXES.some(p => prefix.startsWith(p));
};

// Send OTP to business email
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    if (!validateBusinessEmail(email)) {
      return res.status(400).json({
        success: false,
        message: `Only business emails with prefixes (${EMAIL_CONFIG.ALLOWED_PREFIXES.join(', ')}) are allowed`
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

    // Prepare email with hardcoded sender
    const mailOptions = {
      from: `"${EMAIL_CONFIG.SENDER_NAME}" <${EMAIL_CONFIG.SENDER_EMAIL}>`,
      to: email,
      subject: 'Your COHORT Portal Access Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">COHORT Portal OTP</h2>
          <p>Your one-time access code is:</p>
          <div style="font-size: 24px; font-weight: bold; margin: 20px 0; padding: 15px; 
               background: #f3f4f6; display: inline-block; letter-spacing: 5px;">
            ${otp}
          </div>
          <p>This code will expire in 15 minutes.</p>
          <p style="color: #6b7280; font-size: 12px;">
            For security reasons, please do not share this code.
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    res.json({
      success: true,
      message: 'OTP sent to your business email',
      ...(process.env.NODE_ENV === 'development' && { debugOtp: otp }) // Only show OTP in development
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again later.'
    });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Step 1: Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    if (!validateBusinessEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid business email format'
      });
    }

    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP format. Must be 6 digits.'
      });
    }

    // Step 2: Check if OTP exists and is valid
    const existingOTP = await OTP.findOne({ email, otp });

    if (!existingOTP) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    if (existingOTP.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: existingOTP._id }); // delete it anyway
      return res.status(400).json({
        success: false,
        message: 'OTP expired'
      });
    }

    // Step 3: OTP is valid, now delete it
    await OTP.deleteOne({ _id: existingOTP._id });

    // Step 4: Send success response
    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      user: {
        email,
        verified: true
      }
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while verifying OTP'
    });
  }
};