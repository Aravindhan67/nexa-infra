const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Reuse existing transporter configuration for emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

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

// Admin back-door for testing (Promote user to Admin)
router.post('/make-admin', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOneAndUpdate({ email }, { role: 'admin' }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User upgraded to Admin', user });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            // Return success even if not found to prevent email enumeration
            return res.json({ message: 'If that email is registered, a reset link has been sent.' });
        }

        // Generate token
        const resetToken = crypto.randomBytes(20).toString('hex');
        
        // Save to user object (expires in 1 hour)
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();

        // Send email
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Nexa Infra - Password Reset',
            text: `You requested a password reset. \n\nPlease click on the following link, or paste it into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        await transporter.sendMail(mailOptions);
        
        res.json({ message: 'If that email is registered, a reset link has been sent.' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Failed to process request.' });
    }
});

// Reset Password Route
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } // Ensure token hasn't expired
        });

        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
        }

        // Update password and clear reset fields
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Your password has been successfully updated! You may now login.' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Failed to reset password.' });
    }
});

module.exports = router;
