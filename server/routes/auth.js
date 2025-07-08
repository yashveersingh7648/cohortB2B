const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();

// Initialize Google client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    
    // Here you would typically:
    // 1. Check if user exists in your database
    // 2. Create new user if doesn't exist
    // 3. Get the user's ID from your database
    
    // For this example, we'll just use the Google payload
    const user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    };
    
    // Create JWT for your app
    const appToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ 
      success: true,
      token: appToken,
      user 
    });
    
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ 
      success: false,
      message: 'Authentication failed',
      error: error.message 
    });
  }
});

module.exports = router;