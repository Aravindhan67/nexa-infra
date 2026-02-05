import React from 'react';

const AboutPage = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <h1 className="about-title heading-font animate-fade-in">OUR STORY</h1>
                    <p className="about-subtitle">Defining excellence in infrastructure and interior design since inception.</p>
                </div>
            </section>

            <section className="about-content">
                <div className="container grid about-grid">
                    <div className="about-text animate-fade-in">
                        <h2 className="heading-font">Who We Are</h2>
                        <p>Nexa Infra is a premier full-service interior design and infrastructure firm committed to excellence. Our approach is rooted in the belief that design has the power to transform lives and businesses.</p>
                        <p>From residential sanctuaries to high-performance commercial spaces, we bring a unique perspective to every project, blending aesthetic beauty with functional precision.</p>
                    </div>
                    <div className="about-image animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" alt="Team Work" />
                    </div>
                </div>
            </section>

            <section className="values-section">
                <div className="container">
                    <h2 className="text-center heading-font">OUR CORE VALUES</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <h3>Quality</h3>
                            <p>We never compromise on materials or craftsmanship. Our 10-year warranty is a testament to our commitment.</p>
                        </div>
                        <div className="value-card">
                            <h3>Innovation</h3>
                            <p>Using 360° virtual tours and VR, we let you experience your space before it's even built.</p>
                        </div>
                        <div className="value-card">
                            <h3>Transparency</h3>
                            <p>Fixed pricing, detailed schedules, and regular updates. No hidden costs or surprises.</p>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .about-page {
                    padding-top: 80px;
                }
                .about-hero {
                    background: var(--bg-light);
                    padding: 100px 0;
                    text-align: center;
                }
                .about-title {
                    font-size: 4rem;
                    margin-bottom: 20px;
                }
                .about-subtitle {
                    color: var(--text-grey);
                    font-size: 1.2rem;
                }
                .about-content {
                    padding: 100px 0;
                }
                .about-grid {
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: center;
                }
                .about-text h2 {
                    font-size: 2.5rem;
                    margin-bottom: 30px;
                }
                .about-text p {
                    color: var(--text-grey);
                    margin-bottom: 20px;
                    line-height: 1.8;
                }
                .about-image img {
                    width: 100%;
                    border-radius: 8px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }
                .values-section {
                    background: var(--accent-dark);
                    color: white;
                    padding: 100px 0;
                }
                .values-section h2 {
                    color: white;
                    margin-bottom: 60px;
                    font-size: 2.5rem;
                }
                .values-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 30px;
                }
                .value-card {
                    background: rgba(255,255,255,0.05);
                    padding: 40px;
                    border-radius: 4px;
                    text-align: center;
                }
                .value-card h3 {
                    color: var(--accent-teal);
                    margin-bottom: 20px;
                    font-size: 1.5rem;
                }
                .value-card p {
                    color: #ccc;
                    line-height: 1.6;
                }
                @media (max-width: 992px) {
                    .about-grid {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                    .values-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default AboutPage;
