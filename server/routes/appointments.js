const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get available slots for a specific date
router.get('/slots', async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ error: 'Date is required' });
        }

        // Fetch all appointments for the given date
        const appointments = await Appointment.find({ date });
        const bookedSlots = appointments.map(app => app.time);

        // Define all possible slots (e.g., 9 AM to 5 PM)
        const allSlots = [
            '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
            '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
        ];

        // Filter out booked slots
        const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

        res.json({ availableSlots });
    } catch (error) {
        console.error('Error fetching slots:', error);
        res.status(500).json({ error: 'Failed to fetch available slots' });
    }
});

// Create a new appointment
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, date, time, projectDetails } = req.body;

        if (!name || !email || !phone || !date || !time) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        // Check if the slot is already booked
        const existingAppointment = await Appointment.findOne({ date, time });
        if (existingAppointment) {
            return res.status(400).json({ error: 'This time slot is already booked. Please choose another one.' });
        }

        const newAppointment = new Appointment({
            name,
            email,
            phone,
            date,
            time,
            projectDetails
        });

        await newAppointment.save();
        
        res.status(201).json({ message: 'Appointment booked successfully!', appointment: newAppointment });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ error: 'Failed to book appointment. Please try again later.' });
    }
});

module.exports = router;
