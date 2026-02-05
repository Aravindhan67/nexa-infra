const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all designs
router.get('/', (req, res) => {
    db.all('SELECT * FROM designs ORDER BY created_at DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Save a new design
router.post('/', (req, res) => {
    const { name, image_data } = req.body;
    db.run('INSERT INTO designs (name, image_data) VALUES (?, ?)', [name, image_data], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name, image_data });
    });
});

module.exports = router;
