const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image_data: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Design', designSchema);
