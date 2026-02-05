import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
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
                                    <p>123 Design Square, Tech Hub, Chennai - 600001</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon-box"><Phone size={24} /></div>
                                <div>
                                    <h3>Call Us</h3>
                                    <p>+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon-box"><Mail size={24} /></div>
                                <div>
                                    <h3>Email Us</h3>
                                    <p>info@nexainfra.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <form className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" placeholder="John" />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="john@example.com" />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea placeholder="Tell us about your project..." rows="5"></textarea>
                            </div>
                            <button type="button" className="btn-primary w-full">
                                SEND MESSAGE <Send size={16} />
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
