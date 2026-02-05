const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all projects
router.get('/', (req, res) => {
    db.all('SELECT * FROM projects', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Seed sample projects if empty
router.post('/seed', (req, res) => {
    const projects = [
        { title: 'Modern Living Room', description: 'A spacious modern living room with panoramic view.', image_url: '/assets/360/living_room.jpg', type: 'residential' },
        { title: 'Executive Office', description: 'Professional office space with city view.', image_url: '/assets/360/office.jpg', type: 'commercial' },
        { title: 'Cozy Bedroom', description: 'Warm and inviting bedroom design.', image_url: '/assets/360/bedroom.jpg', type: 'residential' }
    ];

    const stmt = db.prepare('INSERT INTO projects (title, description, image_url, type) VALUES (?, ?, ?, ?)');
    projects.forEach(p => stmt.run(p.title, p.description, p.image_url, p.type));
    stmt.finalize();
    res.json({ message: 'Seeding successful' });
});

module.exports = router;
