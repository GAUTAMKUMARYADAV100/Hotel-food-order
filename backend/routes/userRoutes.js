const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { name, mobile, room } = req.body;

  if (!name || !mobile || !room) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Step 1: Find existing user
    let user = await User.findOne({ mobile });

    // Step 2: If user doesn't exist, create new one
    if (!user) {
      user = new User({ name, mobile, room });
    } else {
      // Step 3: If user exists, update their data
      user.name = name;
      user.room = room;
    }

    // Step 4: Save the user
    await user.save();

    // Step 5: Only after successful save, send the response
    console.log("✅ Login entry processed successfully");
    return res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
});



router.get('/', async (req, res) => {
  try {
    const { mobile } = req.query;

    if (!mobile) {
      return res.status(400).json({ error: 'Mobile number is required.' });
    }

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
