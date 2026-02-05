import React from 'react';
import { Home, Layout, PenTool } from 'lucide-react';

const ServicesSection = () => {
    const services = [
        {
            icon: <Home size={40} />,
            title: "RESIDENTIAL DESIGN",
            desc: "Expertly curated interiors that reflect your personal style and enhance your daily living experience."
        },
        {
            icon: <Layout size={40} />,
            title: "MODULAR KITCHENS",
            desc: "State-of-the-art modular solutions that combine style with maximum space efficiency and durability."
        },
        {
            icon: <PenTool size={40} />,
            title: "ROOM DESIGNS",
            desc: "Custom designs for bedrooms, living rooms, and workspaces tailored to your specific needs."
        }
    ];

    return (
        <section className="services-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">WHAT WE DO</h2>
                    <p className="section-subtitle">Transforming your vision into structured reality.</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                            <div className="service-icon-box">
                                {service.icon}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.desc}</p>
                            <a href="#" className="service-link">LEARN MORE</a>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .services-section {
                    background-color: var(--bg-light);
                }

                .section-header {
                    margin-bottom: 70px;
                }

                .section-title {
                    font-size: 2.5rem;
                    letter-spacing: 2px;
                    margin-bottom: 15px;
                }

                .section-subtitle {
                    color: var(--text-grey);
                    font-size: 1.1rem;
                }

                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 30px;
                }

                .service-card {
                    background: white;
                    padding: 50px 40px;
                    border-radius: 4px;
                    transition: var(--transition-smooth);
                    border: 1px solid var(--border-light);
                }

                .service-card:hover {
                    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
                    transform: translateY(-10px);
                }

                .service-icon-box {
                    color: var(--accent-teal);
                    margin-bottom: 30px;
                    background: #f0fafa;
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }

                .service-title {
                    font-size: 1.2rem;
                    letter-spacing: 1px;
                    margin-bottom: 20px;
                }

                .service-desc {
                    color: var(--text-grey);
                    margin-bottom: 30px;
                    font-size: 0.95rem;
                    line-height: 1.8;
                }

                .service-link {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--accent-dark);
                    letter-spacing: 1px;
                    border-bottom: 2px solid var(--accent-teal);
                    padding-bottom: 4px;
                }

                @media (max-width: 992px) {
                    .services-grid {
                        grid-template-columns: 1fr;
                    }
                    .service-card {
                        padding: 40px;
                    }
                }
            `}</style>
        </section>
    );
};

export default ServicesSection;
