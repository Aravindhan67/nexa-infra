import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An error occurred. Please check your connection and try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="contact-page">
            <section className="contact-hero container">
                <h1 className="heading-font animate-fade-in">CONTACT US</h1>
                <p>Have a project in mind? We'd love to hear from you.</p>
            </section>

            <section className="contact-content container">
                <div className="contact-grid">
                    <div className="contact-info-panel animate-fade-in">
                        <h2 className="heading-font">Get in Touch</h2>
                        <div className="contact-details">
                            <div className="contact-item">
                                <div className="contact-icon-box"><MapPin size={24} /></div>
                                <div>
                                    <h3>Our Office</h3>
                                    <p>117/1 Sathy Road, K Kullam,Erode - 638002</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon-box"><Phone size={24} /></div>
                                <div>
                                    <h3>Call Us</h3>
                                    <p>+91 8144761678</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon-box"><Mail size={24} /></div>
                                <div>
                                    <h3>Email Us</h3>
                                    <p>nexahomeindia@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            {status.message && (
                                <div className={`status-message ${status.type}`}>
                                    {status.message}
                                </div>
                            )}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input 
                                        type="text" 
                                        name="firstName"
                                        placeholder="John" 
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input 
                                        type="text" 
                                        name="lastName"
                                        placeholder="Doe" 
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="john@example.com" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea 
                                    name="message"
                                    placeholder="Tell us about your project..." 
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'} <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .contact-page {
                    padding: 150px 0 100px;
                }
                .contact-hero {
                    text-align: center;
                    margin-bottom: 80px;
                }
                .contact-hero h1 {
                    font-size: 4rem;
                    margin-bottom: 20px;
                }
                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 80px;
                }
                .contact-info-panel h2 {
                    font-size: 2rem;
                    margin-bottom: 40px;
                }
                .contact-details {
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                }
                .contact-item {
                    display: flex;
                    gap: 20px;
                }
                .contact-icon-box {
                    width: 60px;
                    height: 60px;
                    background: var(--bg-light);
                    color: var(--accent-teal);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }
                .contact-item h3 {
                    font-size: 1.1rem;
                    margin-bottom: 5px;
                }
                .contact-item p {
                    color: var(--text-grey);
                    font-size: 0.95rem;
                }
                .contact-form-panel {
                    background: white;
                    padding: 50px;
                    border-radius: 8px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.05);
                }
                .form-row {
                    display: flex;
                    gap: 20px;
                }
                .form-group {
                    margin-bottom: 25px;
                    flex: 1;
                }
                .form-group label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 600;
                    margin-bottom: 10px;
                }
                .form-group input, .form-group textarea {
                    width: 100%;
                    padding: 15px;
                    border: 1px solid var(--border-light);
                    border-radius: 4px;
                    font-family: inherit;
                    font-size: 0.95rem;
                }
                .w-full {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                }
                .w-full:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .status-message {
                    padding: 15px;
                    border-radius: 4px;
                    margin-bottom: 20px;
                    font-size: 0.95rem;
                }
                .status-message.success {
                    background-color: #f0fdf4;
                    color: #166534;
                    border: 1px solid #bbf7d0;
                }
                .status-message.error {
                    background-color: #fef2f2;
                    color: #991b1b;
                    border: 1px solid #fecaca;
                }
                @media (max-width: 992px) {
                    .contact-grid {
                        grid-template-columns: 1fr;
                        gap: 60px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ContactPage;
