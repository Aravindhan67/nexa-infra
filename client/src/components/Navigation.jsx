import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navigation = ({ activeModule, setActiveModule, currentUser, onLogout }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();

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
        { name: 'Our Projects', module: 'our-projects' },
        { name: 'Gallery', module: 'gallery' },
        { name: 'Contact', module: 'contact' },
        { name: 'Book', module: 'booking' },
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
                        {currentUser ? (
                            <>
                                {currentUser.role === 'admin' && (
                                    <li className="nav-item">
                                        <button className={`nav-link ${activeModule === 'admin' ? 'active' : ''}`} onClick={() => setActiveModule('admin')}>
                                            ADMIN
                                        </button>
                                    </li>
                                )}
                                <li className="nav-item d-flex align-items-center gap-2">
                                    <span className="nav-link user-pill">
                                        {currentUser.username}
                                    </span>
                                    <button 
                                        className="nav-link logout-btn" 
                                        onClick={() => {
                                            if(onLogout) onLogout();
                                            setActiveModule('home');
                                        }}
                                        title="Logout"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => setActiveModule('auth')}>
                                    LOGIN
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>

                <div className="header-actions">
                    <button className="theme-toggle" onClick={toggleTheme}>
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
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

                .user-pill {
                    background: var(--primary-accent);
                    color: white !important;
                    padding: 4px 12px !important;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
                .logout-btn {
                    padding: 4px 8px !important;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-dark) !important;
                    opacity: 0.7;
                    transition: all 0.2s ease;
                }
                .logout-btn:hover {
                    opacity: 1;
                    color: #e53e3e !important;
                    transform: scale(1.05);
                }
                .header-actions {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .theme-toggle {
                    color: var(--accent-dark);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8px;
                    border-radius: 50%;
                    background: var(--bg-light);
                    transition: var(--transition-smooth);
                }

                .theme-toggle:hover {
                    background: rgba(0,0,0,0.05);
                }

                .mobile-toggle {
                    display: none;
                    color: var(--accent-dark);
                }

                /* Dark theme override for nav menu on mobile */
                :global(body.dark-theme) .nav-menu {
                    background: var(--primary-white);
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
