const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Seed sample projects
router.post('/seed', async (req, res) => {
    const projects = [
        { title: 'Modern Living Room', description: 'A spacious modern living room with panoramic view.', image_url: '/assets/360/living_room.jpg', type: 'residential' },
        { title: 'Executive Office', description: 'Professional office space with city view.', image_url: '/assets/360/office.jpg', type: 'commercial' },
        { title: 'Cozy Bedroom', description: 'Warm and inviting bedroom design.', image_url: '/assets/360/bedroom.jpg', type: 'residential' }
    ];

    try {
        await Project.deleteMany({}); // Clear existing
        await Project.insertMany(projects);
        res.json({ message: 'Seeding successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
