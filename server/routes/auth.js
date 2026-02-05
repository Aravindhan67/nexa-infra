const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Simple signup route
router.post('/signup', (req, res) => {
    const { username, email, password, location } = req.body;

    // NOTE: In a production app, password should be hashed (e.g., using bcrypt)
    const query = `INSERT INTO users (username, email, password, location) VALUES (?, ?, ?, ?)`;

    db.run(query, [username, email, password, location], function (err) {
        if (err) {
            return res.status(400).json({ error: 'User already exists or database error', details: err.message });
        }
        res.json({ message: 'User created successfully', userId: this.lastID });
    });
});

// Simple login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

    db.get(query, [email, password], (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Exclude password from response
        const { password, ...userWithoutPassword } = user;
        res.json({ message: 'Login successful', user: userWithoutPassword });
    });
});

module.exports = router;
