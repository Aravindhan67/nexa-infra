const express = require('express');
const router = express.Router();
const Design = require('../models/Design');

// Get all designs
router.get('/', async (req, res) => {
    try {
        const designs = await Design.find().sort({ created_at: -1 });
        res.json(designs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Save a new design
router.post('/', async (req, res) => {
    const { name, image_data } = req.body;
    try {
        const design = new Design({ name, image_data });
        await design.save();
        res.json(design);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
