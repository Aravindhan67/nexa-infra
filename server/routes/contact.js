const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;

        // Basic validation
        if (!firstName || !email || !message) {
            return res.status(400).json({ error: 'Please provide all required fields (First Name, Email, Message)' });
        }

        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can change this to another service if not using Gmail
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Setup email data
        const mailOptions = {
            from: `"${firstName} ${lastName || ''}" <${email}>`,
            to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER, // Send to yourself
            replyTo: email,
            subject: 'New Contact Form Submission - Nexa Infra',
            text: `You have a new contact form submission:\n\nName: ${firstName} ${lastName || ''}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
});

module.exports = router;
