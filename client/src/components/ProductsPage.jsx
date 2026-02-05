import React from 'react';

const ProductsPage = () => {
    const products = [
        { title: "Modular Kitchens", img: "https://images.unsplash.com/photo-1556911220-e15224bbbe39?auto=format&fit=crop&w=600&q=80", features: ["L-Shaped", "Island", "U-Shaped", "Parallel"] },
        { title: "Wardrobes", img: "https://images.unsplash.com/photo-1595428774223-ef52624120ec?auto=format&fit=crop&w=600&q=80", features: ["Sliding", "Hinged", "Walk-in", "Open-shelf"] },
        { title: "TV Units", img: "https://images.unsplash.com/photo-1593060613302-2888cf36c6bc?auto=format&fit=crop&w=600&q=80", features: ["Wall-mounted", "Floor-standing", "Multi-functional"] },
        { title: "Space Saving Furniture", img: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=600&q=80", features: ["Murphy Beds", "Extendable Tables", "Convertible Sofas"] },
    ];

    return (
        <div className="products-page">
            <section className="products-hero">
                <div className="container">
                    <h1 className="heading-font">OUR SOLUTIONS</h1>
                    <p>High-quality, durable, and stylish interior products for every home.</p>
                </div>
            </section>

            <section className="products-list container">
                <div className="products-grid">
                    {products.map((p, i) => (
                        <div key={i} className="product-card">
                            <div className="product-img">
                                <img src={p.img} alt={p.title} />
                            </div>
                            <div className="product-info">
                                <h2 className="heading-font">{p.title}</h2>
                                <ul className="product-features">
                                    {p.features.map((f, j) => <li key={j}>{f}</li>)}
                                </ul>
                                <button className="btn-outline">VIEW CATALOGUE</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <style jsx>{`
                .products-page {
                    padding-top: 80px;
                }
                .products-hero {
                    background: var(--bg-light);
                    padding: 80px 0;
                    text-align: center;
                }
                .products-hero h1 {
                    font-size: 3rem;
                    margin-bottom: 15px;
                }
                .products-hero p {
                    color: var(--text-grey);
                }
                .products-list {
                    padding: 80px 0;
                }
                .products-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                }
                .product-card {
                    display: flex;
                    background: white;
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    overflow: hidden;
                    transition: var(--transition-smooth);
                }
                .product-card:hover {
                    box-shadow: 0 15px 30px rgba(0,0,0,0.05);
                    transform: translateY(-5px);
                }
                .product-img {
                    width: 45%;
                }
                .product-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .product-info {
                    width: 55%;
                    padding: 30px;
                }
                .product-info h2 {
                    font-size: 1.5rem;
                    margin-bottom: 20px;
                }
                .product-features {
                    margin-bottom: 30px;
                }
                .product-features li {
                    font-size: 0.9rem;
                    color: var(--text-grey);
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .product-features li::before {
                    content: "•";
                    color: var(--accent-teal);
                }
                @media (max-width: 992px) {
                    .products-grid {
                        grid-template-columns: 1fr;
                    }
                    .product-card {
                        flex-direction: column;
                    }
                    .product-img, .product-info {
                        width: 100%;
                    }
                    .product-img {
                        height: 250px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ProductsPage;
