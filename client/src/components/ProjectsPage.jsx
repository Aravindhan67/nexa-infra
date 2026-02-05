import React, { useState } from 'react';
import { ExternalLink, MapPin, Calendar, ArrowRight } from 'lucide-react';

const ProjectsPage = () => {
    const projects = [
        {
            id: 1,
            title: 'Modern Living Room',
            category: 'Residential',
            location: 'New York, NY',
            date: '2023',
            description: 'High-end residential project with open floor plan and custom panoramic glass walls.',
            image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
            tags: ['Panoramic', 'Minimalist', 'Luxury']
        },
        {
            id: 2,
            title: 'Executive Office',
            category: 'Commercial',
            location: 'Chicago, IL',
            date: '2022',
            description: 'Professional commercial space with premium finishes and ergonomic design. Focus on productivity and natural light.',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
            tags: ['Modern', 'Efficient', 'Glass']
        },
        {
            id: 3,
            title: 'Nexa Infrastructure',
            category: 'Industrial',
            location: 'Singapore',
            date: '2024',
            description: 'Custom 360° visualization for the Nexa project. Integrating smart infrastructure with aesthetic design.',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
            tags: ['Smart', 'Sustainable', 'Industrial']
        }
    ];

    const [activeProject, setActiveProject] = useState(projects[0]);

    return (
        <div className="projects-page">
            <section className="projects-hero">
                <div className="panoramic-container">
                    <img src={activeProject.image} alt={activeProject.title} className="panoramic-img" />
                    <div className="panoramic-overlay"></div>
                    <div className="panoramic-content">
                        <div className="container">
                            <span className="project-category">{activeProject.category}</span>
                            <h1 className="project-title heading-font">{activeProject.title}</h1>
                            <div className="project-meta">
                                <span className="meta-item"><MapPin size={16} /> {activeProject.location}</span>
                                <span className="meta-item"><Calendar size={16} /> {activeProject.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="projects-list-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="heading-font">Our Projects</h2>
                        <p className="section-subtitle">A collection of our most iconic transformations.</p>
                    </div>

                    <div className="projects-grid">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`project-item ${activeProject.id === project.id ? 'active' : ''}`}
                                onClick={() => setActiveProject(project)}
                            >
                                <div className="project-item-content">
                                    <h3 className="heading-font">{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div className="project-footer">
                                        <button className="view-project-btn">
                                            VIEW DETAILS <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
                .projects-page {
                    background-color: #0c0c0c;
                    color: white;
                    min-height: 100vh;
                }

                .projects-hero {
                    height: 70vh;
                    position: relative;
                }

                .panoramic-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }

                .panoramic-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 1.2s ease;
                }

                .panoramic-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to top, rgba(12,12,12,1), rgba(12,12,12,0.4), transparent);
                }

                .panoramic-content {
                    position: absolute;
                    bottom: 60px;
                    left: 0;
                    width: 100%;
                    z-index: 10;
                }

                .project-category {
                    color: var(--accent-teal);
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    font-weight: 700;
                    font-size: 0.8rem;
                    margin-bottom: 20px;
                    display: block;
                }

                .project-title {
                    font-size: 4.5rem;
                    margin-bottom: 20px;
                    line-height: 1.1;
                    letter-spacing: -2px;
                }

                .project-meta {
                    display: flex;
                    gap: 30px;
                    color: rgba(255,255,255,0.7);
                    font-size: 0.9rem;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .projects-list-section {
                    padding: 80px 0 120px;
                }

                .section-header {
                    margin-bottom: 60px;
                }

                .section-header h2 {
                    font-size: 2.5rem;
                    margin-bottom: 10px;
                }

                .section-subtitle {
                    color: rgba(255,255,255,0.5);
                }

                .projects-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 20px;
                }

                .project-item {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    padding: 30px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .project-item:hover, .project-item.active {
                    background: rgba(255,255,255,0.08);
                    border-color: var(--accent-teal);
                }

                .project-item.active {
                    box-shadow: inset 4px 0 0 var(--accent-teal);
                }

                .project-item h3 {
                    font-size: 1.5rem;
                    margin-bottom: 10px;
                }

                .project-item p {
                    color: rgba(255,255,255,0.6);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    max-width: 800px;
                    margin-bottom: 20px;
                }

                .view-project-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 700;
                    font-size: 0.75rem;
                    letter-spacing: 0.1em;
                    color: var(--accent-teal);
                }

                @media (max-width: 992px) {
                    .project-title {
                        font-size: 3rem;
                    }
                    .projects-hero {
                        height: 50vh;
                    }
                }
            `}</style>
        </div>
    );
};

export default ProjectsPage;
