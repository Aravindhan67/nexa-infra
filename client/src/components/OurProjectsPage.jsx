import React, { useEffect, useRef } from 'react';

const OurProjectsPage = () => {

    return (
        <div className="projects-page">
            <section className="projects-hero container">
                <h1 className="heading-font animate-fade-in">OUR PROJECTS</h1>
                <p>Explore our latest 360° virtual tours.</p>
            </section>

            <section className="projects-content container">
                <div className="kuula-container animate-fade-in" style={{ animationDelay: '0.2s', width: '100%', height: '640px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: '40px' }}>
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://kuula.co/share/collection/7fQzw?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
                        frameBorder="0"
                        allowFullScreen
                        allow="xr-spatial-tracking; gyroscope; accelerometer"
                        title="Nexa Infra 360 Virtual Tour 1"
                    ></iframe>
                </div>
                <div className="kuula-container animate-fade-in" style={{ animationDelay: '0.4s', width: '100%', height: '640px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://kuula.co/share/collection/7fQCn?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
                        frameBorder="0"
                        allowFullScreen
                        allow="xr-spatial-tracking; gyroscope; accelerometer"
                        title="Nexa Infra 360 Virtual Tour 2"
                    ></iframe>
                </div>
            </section>

            <style jsx>{`
                .projects-page {
                    padding: 150px 0 100px;
                }
                .projects-hero {
                    text-align: center;
                    margin-bottom: 60px;
                }
                .projects-hero h1 {
                    font-size: 3.5rem;
                    margin-bottom: 20px;
                }
            `}</style>
        </div>
    );
};

export default OurProjectsPage;
