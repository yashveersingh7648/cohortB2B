// const jwt = require('jsonwebtoken');

// const authenticateAgency = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
  
//   if (!token) return res.status(401).json({ message: 'Authentication required' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user data to request
//     next();
//   } catch (error) {
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authenticateAgency;







// 12-07-25
// authenticateAgency.js
// const jwt = require('jsonwebtoken');
// const config = require('../config');

// module.exports = function(req, res, next) {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
  
//   if (!token) {
//     return res.status(401).json({ msg: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, config.jwtSecret);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     console.error('Token verification error:', err);
//     return res.status(401).json({ msg: 'Invalid token' });
//   }
// };




const jwt = require('jsonwebtoken');

const authenticateAgency = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Should contain { email: ... }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticateAgency;
