const mongoose = require('mongoose');

const estimateSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    sqft: {
        type: Number,
        required: true
    },
    roomType: {
        type: String,
        required: true,
        enum: ['full-home', 'kitchen', 'bedroom', 'living-room']
    },
    quality: {
        type: String,
        required: true,
        enum: ['standard', 'premium', 'luxury']
    },
    minCost: {
        type: Number,
        required: true
    },
    maxCost: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Estimate', estimateSchema);
