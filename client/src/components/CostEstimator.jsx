import React, { useState, useEffect } from 'react';
import { Calculator, House, Maximize, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

const CostEstimator = ({ onBookNow }) => {
    // Calculator State
    const [sqft, setSqft] = useState(1000);
    const [roomType, setRoomType] = useState('full-home');
    const [quality, setQuality] = useState('premium');
    const [estimate, setEstimate] = useState({ min: 0, max: 0 });

    // Multipliers
    const typeMultipliers = {
        'full-home': 1,
        'kitchen': 1.5, // Kitchens are dense and expensive per sqft
        'bedroom': 0.8,
        'living-room': 0.9,
        'bathroom': 1.8 // Bathrooms are very expensive per sqft
    };

    const qualityMultipliers = {
        'standard': 1500, // ₹ per sqft base
        'premium': 2500,
        'luxury': 4000
    };

    // Calculate dynamically when inputs change
    useEffect(() => {
        const baseRate = qualityMultipliers[quality];
        const typeRate = typeMultipliers[roomType];
        
        let calculatedBase = sqft * baseRate * typeRate;
        
        // Add realistic range (± 15%)
        const minCost = calculatedBase * 0.85;
        const maxCost = calculatedBase * 1.15;
        
        setEstimate({ min: minCost, max: maxCost });
    }, [sqft, roomType, quality]);

    // Format currency
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="estimator-page">
            <section className="estimator-hero container text-center">
                <div className="icon-wrapper animate-fade-in">
                    <Calculator size={48} color="var(--primary-accent)" />
                </div>
                <h1 className="heading-font animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    Instant Cost Estimator
                </h1>
                <p className="subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    Get an immediate, data-driven estimate for your interior design project before you even book a consultation.
                </p>
            </section>

            <section className="calculator-section container animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="calculator-grid">
                    {/* Controls */}
                    <div className="calc-controls">
                        <div className="input-group">
                            <label><Maximize size={18}/> Carpet Area (Sq. Ft.)</label>
                            <input 
                                type="number" 
                                value={sqft} 
                                onChange={(e) => setSqft(Number(e.target.value))}
                                min="100"
                                max="10000"
                                className="number-input"
                            />
                            <input 
                                type="range" 
                                min="100" 
                                max="5000" 
                                step="50"
                                value={sqft} 
                                onChange={(e) => setSqft(Number(e.target.value))}
                                className="slider-input"
                            />
                            <div className="slider-labels">
                                <span>100 sqft</span>
                                <span>5000+ sqft</span>
                            </div>
                        </div>

                        <div className="input-group">
                            <label><House size={18}/> Project Type</label>
                            <div className="radio-group">
                                <label className={`radio-btn ${roomType === 'full-home' ? 'active' : ''}`}>
                                    <input type="radio" name="roomType" value="full-home" onChange={() => setRoomType('full-home')} /> Full Home
                                </label>
                                <label className={`radio-btn ${roomType === 'kitchen' ? 'active' : ''}`}>
                                    <input type="radio" name="roomType" value="kitchen" onChange={() => setRoomType('kitchen')} /> Modular Kitchen
                                </label>
                                <label className={`radio-btn ${roomType === 'bedroom' ? 'active' : ''}`}>
                                    <input type="radio" name="roomType" value="bedroom" onChange={() => setRoomType('bedroom')} /> Bedroom
                                </label>
                                <label className={`radio-btn ${roomType === 'living-room' ? 'active' : ''}`}>
                                    <input type="radio" name="roomType" value="living-room" onChange={() => setRoomType('living-room')} /> Living Room
                                </label>
                            </div>
                        </div>

                        <div className="input-group">
                            <label><Sparkles size={18}/> Finish Quality</label>
                            <div className="quality-cards">
                                <div className={`quality-card ${quality === 'standard' ? 'active' : ''}`} onClick={() => setQuality('standard')}>
                                    <h5>Standard</h5>
                                    <p>Essential materials, clean finish</p>
                                </div>
                                <div className={`quality-card ${quality === 'premium' ? 'active' : ''}`} onClick={() => setQuality('premium')}>
                                    <h5>Premium</h5>
                                    <p>High-end plywood, soft-close hardware</p>
                                </div>
                                <div className={`quality-card ${quality === 'luxury' ? 'active' : ''}`} onClick={() => setQuality('luxury')}>
                                    <h5>Ultra Luxury</h5>
                                    <p>Italian marble, smart lighting, veneer</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="calc-result">
                        <div className="result-card">
                            <div className="result-header">
                                <TrendingUp size={24} />
                                <h3>Estimated Cost</h3>
                            </div>
                            
                            <div className="price-range">
                                <div className="price-value">{formatCurrency(estimate.min)}</div>
                                <div className="price-divider">to</div>
                                <div className="price-value highlight">{formatCurrency(estimate.max)}</div>
                            </div>

                            <div className="disclaimer">
                                <AlertCircle size={14} />
                                <p>This is a rough estimate based on average market rates in India. Final quotes may vary depending on exact material choices and site conditions.</p>
                            </div>

                            <button className="btn-primary w-100 book-btn" onClick={onBookNow}>
                                BOOK A CONSULTATION
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .estimator-page {
                    padding: 120px 0 100px;
                    min-height: 100vh;
                    background-color: var(--bg-light);
                }
                .estimator-hero {
                    margin-bottom: 50px;
                }
                .icon-wrapper {
                    margin-bottom: 20px;
                    display: inline-block;
                    padding: 15px;
                    background: rgba(0, 128, 128, 0.1);
                    border-radius: 50%;
                }
                .estimator-hero h1 {
                    font-size: 3rem;
                    margin-bottom: 15px;
                    color: var(--text-dark);
                }
                .subtitle {
                    color: var(--text-grey);
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .calculator-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 40px;
                    background: var(--primary-white);
                    padding: 40px;
                    border-radius: 20px;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.04);
                    border: 1px solid var(--border-light);
                }

                /* Controls Side */
                .input-group {
                    margin-bottom: 35px;
                }
                .input-group label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    margin-bottom: 15px;
                    color: var(--text-dark);
                    font-size: 1.1rem;
                }
                .number-input {
                    width: 100%;
                    padding: 15px;
                    font-size: 1.2rem;
                    border: 2px solid var(--border-light);
                    border-radius: 12px;
                    margin-bottom: 15px;
                    background: var(--bg-light);
                    color: var(--text-dark);
                }
                .number-input:focus {
                    border-color: var(--primary-accent);
                    outline: none;
                }
                .slider-input {
                    width: 100%;
                    accent-color: var(--primary-accent);
                }
                .slider-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                    color: var(--text-grey);
                    margin-top: 5px;
                }

                /* Radios & Cards */
                .radio-group {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .radio-btn {
                    padding: 10px 20px;
                    border: 1px solid var(--border-light);
                    border-radius: 30px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    color: var(--text-grey);
                }
                .radio-btn input {
                    display: none;
                }
                .radio-btn.active {
                    background: var(--primary-accent);
                    color: white;
                    border-color: var(--primary-accent);
                }
                .quality-cards {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                }
                .quality-card {
                    border: 2px solid var(--border-light);
                    border-radius: 12px;
                    padding: 20px 15px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .quality-card h5 {
                    margin-bottom: 5px;
                    font-weight: 700;
                    color: var(--text-dark);
                }
                .quality-card p {
                    font-size: 0.8rem;
                    color: var(--text-grey);
                    margin: 0;
                    line-height: 1.4;
                }
                .quality-card:hover {
                    border-color: rgba(0, 128, 128, 0.5);
                }
                .quality-card.active {
                    border-color: var(--primary-accent);
                    background: rgba(0, 128, 128, 0.05);
                }

                /* Result Side */
                .result-card {
                    background: linear-gradient(135deg, var(--bg-dark) 0%, #2a1f28 100%);
                    border-radius: 20px;
                    padding: 40px;
                    color: white;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }
                .result-card::before {
                    content: '';
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, rgba(0,128,128,0.2) 0%, transparent 70%);
                }
                .result-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 30px;
                    color: var(--accent-teal);
                }
                .result-header h3 {
                    font-family: 'Epilogue', serif;
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin: 0;
                }
                .price-range {
                    margin-bottom: 40px;
                }
                .price-value {
                    font-size: 2.8rem;
                    font-weight: 700;
                    font-family: 'Epilogue', serif;
                    line-height: 1.2;
                }
                .price-value.highlight {
                    color: var(--accent-teal);
                }
                .price-divider {
                    font-size: 1.2rem;
                    opacity: 0.6;
                    margin: 5px 0;
                }
                .disclaimer {
                    display: flex;
                    gap: 10px;
                    background: rgba(255,255,255,0.05);
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                }
                .disclaimer p {
                    font-size: 0.85rem;
                    margin: 0;
                    opacity: 0.8;
                    line-height: 1.5;
                }
                .book-btn {
                    padding: 18px;
                    font-size: 1.1rem;
                    letter-spacing: 1px;
                    box-shadow: 0 10px 20px rgba(0, 128, 128, 0.3);
                }
                .w-100 {
                    width: 100%;
                }

                @media (max-width: 992px) {
                    .calculator-grid {
                        grid-template-columns: 1fr;
                    }
                    .quality-cards {
                        grid-template-columns: 1fr;
                    }
                    .price-value {
                        font-size: 2.2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default CostEstimator;
