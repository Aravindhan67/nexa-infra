const express = require('express');
const router = express.Router();
const Estimate = require('../models/Estimate');

// POST save a new estimate
router.post('/', async (req, res) => {
    try {
        const { email, sqft, roomType, quality, minCost, maxCost } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email is required to save an estimate.' });
        }

        const newEstimate = new Estimate({
            email, sqft, roomType, quality, minCost, maxCost
        });

        await newEstimate.save();
        res.status(201).json({ message: 'Estimate saved successfully!', estimate: newEstimate });
    } catch (error) {
        console.error('Save estimate error:', error);
        res.status(500).json({ error: 'Failed to save estimate. Please try again later.' });
    }
});

// GET user specific estimates
router.get('/me/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const estimates = await Estimate.find({ email }).sort({ createdAt: -1 });
        res.json(estimates);
    } catch (error) {
        console.error('Fetch user estimates error:', error);
        res.status(500).json({ error: 'Failed to fetch your saved estimates.' });
    }
});

module.exports = router;
