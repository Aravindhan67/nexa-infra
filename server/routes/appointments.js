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

// GET all appointments (For Admin)
router.get('/all', async (req, res) => {
    try {
        // Here we could add an isAdmin check, but relying on frontend routing for this simple project
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json(appointments);
    } catch (error) {
        console.error('Fetch all error:', error);
        res.status(500).json({ error: 'Failed to fetch appointments.' });
    }
});

// Update appointment status (For Admin)
router.put('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.json({ message: 'Status updated successfully', appointment });
    } catch (error) {
        console.error('Update status error:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

module.exports = router;
