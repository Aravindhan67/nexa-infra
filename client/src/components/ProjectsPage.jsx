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
                    background-color: var(--primary-white);
                    color: var(--text-dark);
                    min-height: 100vh;
                    padding-top: 80px;
                }

                .projects-hero {
                    height: 75vh;
                    position: relative;
                    margin-bottom: 80px;
                    overflow: hidden;
                    border-bottom: 1px solid var(--border-light);
                }

                .panoramic-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
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
                    background: transparent;
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
                    letter-spacing: 0.3em;
                    font-weight: 700;
                    font-size: 0.85rem;
                    margin-bottom: 20px;
                    display: block;
                }

                .project-title {
                    font-size: 5rem;
                    margin-bottom: 20px;
                    line-height: 1.1;
                    letter-spacing: -3px;
                    color: var(--accent-dark);
                    font-weight: 800;
                }

                .project-meta {
                    display: flex;
                    gap: 30px;
                    color: var(--text-grey);
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .projects-list-section {
                    padding-bottom: 120px;
                }

                .section-header {
                    margin-bottom: 50px;
                    border-left: 4px solid var(--accent-teal);
                    padding-left: 20px;
                }

                .section-header h2 {
                    font-size: 2.5rem;
                    margin-bottom: 5px;
                    color: var(--accent-dark);
                }

                .section-subtitle {
                    color: var(--text-grey);
                    font-size: 1.1rem;
                }

                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 30px;
                }

                .project-item {
                    background: white;
                    border: 1px solid var(--border-light);
                    padding: 40px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                }

                .project-item:hover, .project-item.active {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.08);
                    border-color: var(--accent-teal);
                }

                .project-item.active {
                    background: var(--bg-light);
                    border-left: 4px solid var(--accent-teal);
                }

                .project-item h3 {
                    font-size: 1.8rem;
                    margin-bottom: 15px;
                    color: var(--accent-dark);
                }

                .project-item p {
                    color: var(--text-grey);
                    font-size: 1rem;
                    line-height: 1.7;
                    margin-bottom: 25px;
                }

                .view-project-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 700;
                    font-size: 0.85rem;
                    letter-spacing: 0.1em;
                    color: var(--accent-teal);
                    text-transform: uppercase;
                }

                .project-item:hover .view-project-btn {
                    gap: 15px;
                }

                @media (max-width: 992px) {
                    .project-title {
                        font-size: 3rem;
                    }
                    .projects-hero {
                        height: 50vh;
                    }
                    .projects-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default ProjectsPage;
