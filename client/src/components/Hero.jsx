import React from 'react';

const Hero = ({ onStart }) => {
    return (
        <section className="hero">
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title animate-fade-in">
                        WE DESIGN <br />
                        <span className="accent-text">DREAM SPACES</span>
                    </h1>
                    <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Leading infrastructure and interior design solutions for modern living.
                        Experience the perfect blend of luxury, functionality, and innovation.
                    </p>
                    <div className="hero-btns animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <button className="btn-primary" onClick={onStart}>EXPLORE TOURS</button>
                        <button className="btn-outline" style={{ marginLeft: '20px' }}>OUR PROJECTS</button>
                    </div>
                </div>
                <div className="hero-image-box animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="hero-image-overlay"></div>
                    {/* Fallback image if custom ones aren't available */}
                    <img
                        src="/OIP.jpg"
                        alt="Modern Interior Design"
                        className="hero-img"
                    />
                </div>
            </div>

            <style jsx>{`
                .hero {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    background-color: var(--primary-white);
                    padding-top: 80px;
                }

                .hero-container {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 50px;
                    align-items: center;
                }

                .hero-title {
                    font-size: 5.5rem;
                    line-height: 1.1;
                    margin-bottom: 30px;
                    letter-spacing: -2px;
                }

                .accent-text {
                    color: var(--accent-teal);
                }

                .hero-subtitle {
                    font-size: 1.1rem;
                    color: var(--text-grey);
                    max-width: 500px;
                    margin-bottom: 40px;
                    line-height: 1.8;
                }

                .hero-image-box {
                    position: relative;
                    height: 600px;
                    width: 100%;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .hero-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .hero-image-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to right, rgba(255,255,255,0.2), transparent);
                    z-index: 1;
                }

                @media (max-width: 1200px) {
                    .hero-title {
                        font-size: 4rem;
                    }
                }

                @media (max-width: 992px) {
                    .hero {
                        height: auto;
                        padding: 120px 0 60px;
                    }
                    .hero-container {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                    .hero-subtitle {
                        margin: 0 auto 40px;
                    }
                    .hero-image-box {
                        height: 400px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
