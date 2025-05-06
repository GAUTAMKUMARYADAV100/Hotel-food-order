const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { name, mobile, room } = req.body;

  if (!name || !mobile || !room) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find user by mobile
    let user = await User.findOne({ mobile });

    if (!user) {
      // Create new user if not found
      user = new User({ name, mobile, room });
    } else {
      // Update name and room if user already exists
      user.name = name;
      user.room = room;
    }

    // Save user (whether newly created or updated)
    await user.save();
    console.log("login entry hui");
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
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
