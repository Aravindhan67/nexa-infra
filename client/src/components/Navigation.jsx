import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navigation = ({ activeModule, setActiveModule }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', module: 'home' },
        { name: 'About', module: 'about' },
        { name: 'Products', module: 'products' },
        { name: 'Projects', module: 'projects' },
        { name: 'Experience', module: 'experience' },
        { name: 'Gallery', module: 'gallery' },
        { name: 'Contact', module: 'contact' },
    ];

    return (
        <header className={`header ${isScrolled || activeModule !== 'home' ? 'scrolled' : ''}`}>
            <div className="container header-content">
                <div className="logo" onClick={() => setActiveModule('home')}>
                    <img src="/nexa.png" alt="Nexa Infra Logo" className="logo-img" onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                    }} />
                    <span className="logo-text" style={{ display: 'none' }}>NEXA INFRA</span>
                </div>

                <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-list">
                        {navLinks.map((link, index) => (
                            <li key={index} className="nav-item">
                                <button
                                    className={`nav-link ${activeModule === link.module ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveModule(link.module);
                                        setIsMobileMenuOpen(false);
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="header-actions">
                    <button className="btn-get-started" onClick={() => setActiveModule('experience')}>
                        EXPERIENCE CENTER
                    </button>
                    <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            <style jsx>{`
                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    padding: 25px 0;
                    background: transparent;
                    z-index: 1000;
                    transition: var(--transition-smooth);
                }

                .header.scrolled {
                    padding: 15px 0;
                    background: var(--primary-white);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }

                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .logo {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }

                .logo-img {
                    height: 45px;
                    width: auto;
                }

                .logo-text {
                    font-family: 'Epilogue', serif;
                    font-weight: 700;
                    font-size: 1.5rem;
                    color: var(--accent-dark);
                }

                .nav-list {
                    display: flex;
                    gap: 30px;
                }

                .nav-link {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--accent-dark);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    opacity: 0.7;
                    transition: var(--transition-smooth);
                }

                .nav-link:hover, .nav-link.active {
                    opacity: 1;
                    color: var(--accent-teal);
                }

                .btn-get-started {
                    background: var(--accent-dark);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                }

                .btn-get-started:hover {
                    background: var(--text-dark);
                }

                .mobile-toggle {
                    display: none;
                    color: var(--accent-dark);
                }

                @media (max-width: 992px) {
                    .nav-menu {
                        position: fixed;
                        top: 0;
                        right: -100%;
                        width: 100%;
                        height: 100vh;
                        background: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: 0.3s ease;
                    }

                    .nav-menu.open {
                        right: 0;
                    }

                    .nav-list {
                        flex-direction: column;
                        align-items: center;
                        gap: 40px;
                    }

                    .mobile-toggle {
                        display: block;
                        margin-left: 20px;
                    }
                }
            `}</style>
        </header>
    );
};

export default Navigation;
