import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col brand-col">
                        <div className="footer-logo">NEXA INFRA</div>
                        <p className="footer-tagline">Building the future of infrastructure and design.</p>
                        <div className="social-links">
                            <a href="#"><Instagram size={20} /></a>
                            <a href="#"><Facebook size={20} /></a>
                            <a href="#"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">OUR SERVICES</h4>
                        <ul className="footer-links">
                            <li><a href="#">Residential Design</a></li>
                            <li><a href="#">Commercial Space</a></li>
                            <li><a href="#">Infrastructure Planning</a></li>
                            <li><a href="#">Project Management</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">CONTACT US</h4>
                        <div className="contact-info">
                            <div className="contact-item">
                                <MapPin size={18} className="contact-icon" />
                                <span>123 Design Square, Tech Hub, Chennai, India</span>
                            </div>
                            <div className="contact-item">
                                <Phone size={18} className="contact-icon" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="contact-item">
                                <Mail size={18} className="contact-icon" />
                                <span>info@nexainfra.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 Nexa Infra. All Rights Reserved.</p>
                    <div className="bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms & Conditions</a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .footer {
                    background-color: var(--accent-dark);
                    color: white;
                    padding: 80px 0 30px;
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr 1.5fr;
                    gap: 50px;
                    margin-bottom: 60px;
                }

                .footer-logo {
                    font-family: 'Epilogue', serif;
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    letter-spacing: 2px;
                }

                .footer-tagline {
                    color: #bbbbbb;
                    font-size: 0.95rem;
                    margin-bottom: 25px;
                    max-width: 300px;
                }

                .social-links {
                    display: flex;
                    gap: 15px;
                }

                .social-links a {
                    color: white;
                    opacity: 0.7;
                }

                .social-links a:hover {
                    opacity: 1;
                    color: var(--accent-teal);
                }

                .footer-heading {
                    font-size: 0.9rem;
                    letter-spacing: 2px;
                    margin-bottom: 25px;
                    text-transform: uppercase;
                }

                .footer-links li {
                    margin-bottom: 12px;
                }

                .footer-links a {
                    color: #bbbbbb;
                    font-size: 0.95rem;
                }

                .footer-links a:hover {
                    color: white;
                    padding-left: 5px;
                }

                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .contact-item {
                    display: flex;
                    gap: 12px;
                    color: #bbbbbb;
                    font-size: 0.9rem;
                    line-height: 1.4;
                }

                .contact-icon {
                    flex-shrink: 0;
                    color: var(--accent-teal);
                }

                .footer-bottom {
                    border-top: 1px solid rgba(255,255,255,0.1);
                    padding-top: 30px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                    color: #888888;
                }

                .bottom-links {
                    display: flex;
                    gap: 20px;
                }

                .bottom-links a:hover {
                    color: white;
                }

                @media (max-width: 992px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }
                    .footer-bottom {
                        flex-direction: column;
                        gap: 20px;
                        text-align: center;
                    }
                    .bottom-links {
                        justify-content: center;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
