import React from 'react';
import { Camera, Layers, ArrowRight } from 'lucide-react';

const ExperiencePage = ({ onSelectModule }) => {
    const experiences = [
        {
            id: 'tour',
            title: '360° Virtual Tour',
            description: 'Immerse yourself in our premium designs with a high-fidelity 360-degree virtual experience. Explore every corner and detail.',
            icon: <Camera size={40} />,
            image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
            accent: 'var(--accent-teal)'
        },
        {
            id: 'design',
            title: 'Design Studio',
            description: 'Become the designer. Customize wall colors, swap furniture, and visualize your dream space in real-time.',
            icon: <Layers size={40} />,
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
            accent: 'var(--accent-purple, #8b5cf6)'
        }
    ];

    return (
        <div className="experience-page">
            <section className="experience-hero">
                <div className="container">
                    <h1 className="experience-title heading-font animate-fade-in">EXPERIENCE HUB</h1>
                    <p className="experience-subtitle animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        Step into the future of interior design. Choose how you want to explore our world of infrastructure excellence.
                    </p>
                </div>
            </section>

            <section className="experience-grid-section">
                <div className="container grid experience-grid">
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className="experience-card animate-fade-in"
                            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                            onClick={() => onSelectModule(exp.id)}
                        >
                            <div className="card-image-box">
                                <img src={exp.image} alt={exp.title} className="card-img" />
                                <div className="card-overlay"></div>
                                <div className="card-icon" style={{ backgroundColor: exp.accent }}>
                                    {exp.icon}
                                </div>
                            </div>
                            <div className="card-content">
                                <h2 className="card-title heading-font">{exp.title}</h2>
                                <p className="card-desc">{exp.description}</p>
                                <button className="card-btn">
                                    LAUNCH NOW <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <style jsx>{`
                .experience-page {
                    padding-top: 80px;
                    min-height: 100vh;
                    background-color: var(--primary-white);
                }

                .experience-hero {
                    background: linear-gradient(rgba(0,0,0,0.05), transparent);
                    padding: 120px 0 60px;
                    text-align: center;
                }

                .experience-title {
                    font-size: 5rem;
                    margin-bottom: 20px;
                    letter-spacing: -2px;
                }

                .experience-subtitle {
                    color: var(--text-grey);
                    font-size: 1.2rem;
                    max-width: 700px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .experience-grid-section {
                    padding: 60px 0 120px;
                }

                .experience-grid {
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                }

                .experience-card {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    cursor: pointer;
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
                    position: relative;
                }

                .experience-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
                }

                .card-image-box {
                    position: relative;
                    height: 300px;
                    overflow: hidden;
                }

                .card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .experience-card:hover .card-img {
                    transform: scale(1.1);
                }

                .card-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
                }

                .card-icon {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 2;
                }

                .card-content {
                    padding: 40px;
                }

                .card-title {
                    font-size: 2.2rem;
                    margin-bottom: 20px;
                }

                .card-desc {
                    color: var(--text-grey);
                    line-height: 1.8;
                    margin-bottom: 30px;
                    font-size: 1rem;
                }

                .card-btn {
                    display: inline-flex;
                    align-items: center;
                    font-weight: 700;
                    font-size: 0.85rem;
                    letter-spacing: 0.1em;
                    color: var(--accent-dark);
                    transition: color 0.3s ease;
                }

                .experience-card:hover .card-btn {
                    color: var(--accent-teal);
                }

                @media (max-width: 992px) {
                    .experience-grid {
                        grid-template-columns: 1fr;
                    }
                    .experience-title {
                        font-size: 3.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default ExperiencePage;
