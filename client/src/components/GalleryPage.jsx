import React, { useState } from 'react';

const GalleryPage = () => {
    const [filter, setFilter] = useState('all');

    const items = [
        { id: 1, category: 'living', title: 'Modern Living Room', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80' },
        { id: 2, category: 'kitchen', title: 'Modular Kitchen', img: 'https://images.unsplash.com/photo-1556911220-e15224bbbe39?auto=format&fit=crop&w=600&q=80' },
        { id: 3, category: 'bedroom', title: 'Serene Bedroom', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80' },
        { id: 4, category: 'office', title: 'Corporate Office', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80' },
        { id: 5, category: 'living', title: 'Minimalist Lounge', img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=600&q=80' },
        { id: 6, category: 'kitchen', title: 'Classic Kitchen', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80' },
    ];

    const filteredItems = filter === 'all' ? items : items.filter(i => i.category === filter);

    return (
        <div className="gallery-page">
            <section className="gallery-header container">
                <h1 className="heading-font animate-fade-in">OUR PORTFOLIO</h1>
                <div className="gallery-filters animate-fade-in">
                    {['all', 'living', 'kitchen', 'bedroom', 'office'].map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>
            </section>

            <section className="gallery-grid-section container">
                <div className="gallery-grid">
                    {filteredItems.map(item => (
                        <div key={item.id} className="gallery-item animate-fade-in">
                            <img src={item.img} alt={item.title} />
                            <div className="gallery-overlay">
                                <h3>{item.title}</h3>
                                <span>{item.category.toUpperCase()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <style jsx>{`
                .gallery-page {
                    padding: 150px 0 100px;
                }
                .gallery-header {
                    text-align: center;
                    margin-bottom: 60px;
                }
                .gallery-header h1 {
                    font-size: 3.5rem;
                    margin-bottom: 30px;
                }
                .gallery-filters {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                .filter-btn {
                    padding: 8px 20px;
                    border: 1px solid var(--border-light);
                    font-size: 0.8rem;
                    font-weight: 600;
                    letter-spacing: 1px;
                }
                .filter-btn.active {
                    background: var(--accent-dark);
                    color: white;
                    border-color: var(--accent-dark);
                }
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 30px;
                }
                .gallery-item {
                    position: relative;
                    height: 400px;
                    overflow: hidden;
                    border-radius: 4px;
                }
                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }
                .gallery-item:hover img {
                    transform: scale(1.1);
                }
                .gallery-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 30px;
                    background: linear-gradient(transparent, rgba(0,0,0,0.8));
                    color: white;
                    opacity: 0;
                    transition: var(--transition-smooth);
                    transform: translateY(20px);
                }
                .gallery-item:hover .gallery-overlay {
                    opacity: 1;
                    transform: translateY(0);
                }
                .gallery-overlay h3 {
                    color: white;
                    margin-bottom: 5px;
                }
                .gallery-overlay span {
                    font-size: 0.75rem;
                    letter-spacing: 1px;
                    color: var(--accent-teal);
                }
                @media (max-width: 768px) {
                    .gallery-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default GalleryPage;
