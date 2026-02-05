const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Simple signup route
router.post('/signup', async (req, res) => {
    const { username, email, password, location } = req.body;

    try {
        const user = new User({ username, email, password, location });
        await user.save();
        res.json({ message: 'User created successfully', userId: user._id });
    } catch (err) {
        res.status(400).json({ error: 'User already exists or database error', details: err.message });
    }
});

// Simple login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Exclude password from response
        const { password: userPassword, ...userWithoutPassword } = user.toObject();
        res.json({ message: 'Login successful', user: userWithoutPassword });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

module.exports = router;
