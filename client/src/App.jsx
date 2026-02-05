import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import ComparisonSection from './components/ComparisonSection';
import Footer from './components/Footer';
import TourViewer from './components/TourViewer';
import DesignCustomizer from './components/DesignCustomizer';
import AboutPage from './components/AboutPage';
import GalleryPage from './components/GalleryPage';
import ProductsPage from './components/ProductsPage';
import ContactPage from './components/ContactPage';
import ExperiencePage from './components/ExperiencePage';
import AuthPage from './components/AuthPage';

function App() {
    const [activeModule, setActiveModule] = useState('home');
    const [currentUser, setCurrentUser] = useState(null);

    const handleAuthSuccess = (user) => {
        setCurrentUser(user);
        setActiveModule('home');
    };

    const renderContent = () => {
        switch (activeModule) {
            case 'tour':
                return (
                    <div className="experience-module-container">
                        <TourViewer onBack={() => setActiveModule('home')} />
                    </div>
                );
            case 'design':
                return (
                    <div className="experience-module-container">
                        <DesignCustomizer onBack={() => setActiveModule('home')} />
                    </div>
                );
            case 'about':
                return <AboutPage />;
            case 'gallery':
                return <GalleryPage />;
            case 'products':
                return <ProductsPage />;
            case 'contact':
                return <ContactPage />;
            case 'experience':
                return <ExperiencePage onSelectModule={setActiveModule} />;
            case 'auth':
                return <AuthPage onAuthSuccess={handleAuthSuccess} onBack={() => setActiveModule('home')} />;
            default:
                return (
                    <>
                        <Hero onStart={() => setActiveModule('tour')} />
                        <ServicesSection />
                        <ProcessSection />
                        <section className="cta-banner">
                            <div className="container text-center">
                                <h2 className="cta-title">See. Touch. Experience.</h2>
                                <p className="cta-desc">Step into the future of interior design with our 360° virtual tours.</p>
                                <button className="btn-primary" onClick={() => setActiveModule('tour')}>GET STARTED</button>
                            </div>
                            <style jsx>{`
                                .cta-banner {
                                    background: linear-gradient(rgba(65, 48, 62, 0.8), rgba(65, 48, 62, 0.8)), 
                                                url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80');
                                    background-size: cover;
                                    background-position: center;
                                    padding: 100px 0;
                                    color: white;
                                }
                                .cta-title {
                                    color: white;
                                    font-size: 3rem;
                                    margin-bottom: 20px;
                                }
                                .cta-desc {
                                    font-size: 1.2rem;
                                    margin-bottom: 40px;
                                    opacity: 0.9;
                                }
                            `}</style>
                        </section>
                        <ComparisonSection />
                    </>
                );
        }
    };

    return (
        <div className="app-container">
            <Navigation
                activeModule={activeModule}
                setActiveModule={setActiveModule}
                currentUser={currentUser}
                onLogout={() => setCurrentUser(null)}
            />
            <main className="content">
                {renderContent()}
            </main>
            {/* Show footer on all pages except full-screen modules */}
            {activeModule !== 'tour' && activeModule !== 'design' && <Footer />}
        </div>
    );
}

export default App;
