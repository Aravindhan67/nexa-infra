import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import LocationPicker from './LocationPicker';

const AuthPage = ({ onAuthSuccess, onBack }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        location: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLocationSelect = (location) => {
        setFormData({ ...formData, location });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
        const payload = isLogin
            ? { email: formData.email, password: formData.password }
            : formData;

        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            if (isLogin) {
                onAuthSuccess(data.user);
            } else {
                setIsLogin(true);
                alert('Account created! Please log in.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <button className="back-btn" onClick={onBack}>
                <ArrowLeft size={20} /> BACK
            </button>

            <div className="auth-card-container">
                <div className="auth-card animate-fade-in">
                    <div className="auth-header">
                        <h1 className="heading-font">{isLogin ? 'WELCOME BACK' : 'JOIN NEXA INFRA'}</h1>
                        <p>{isLogin ? 'Log in to access your projects' : 'Create an account to start your journey'}</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="input-group">
                                <label><User size={16} /> Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter username"
                                />
                            </div>
                        )}

                        <div className="input-group">
                            <label><Mail size={16} /> Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="input-group">
                            <label><Lock size={16} /> Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter password"
                            />
                        </div>

                        {!isLogin && (
                            <div className="input-group">
                                <label>Your Location</label>
                                <LocationPicker onLocationSelect={handleLocationSelect} />
                            </div>
                        )}

                        {error && <div className="auth-error">{error}</div>}

                        <button type="submit" className="btn-primary auth-submit" disabled={loading}>
                            {loading ? 'PROCESSING...' : (isLogin ? 'LOG IN' : 'SIGN UP')}
                            {!loading && <ArrowRight size={18} style={{ marginLeft: '10px' }} />}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'SIGN UP NOW' : 'LOG IN NOW'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .auth-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, var(--accent-dark) 0%, #1a1519 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 80px 20px;
                    position: relative;
                }
                .back-btn {
                    position: absolute;
                    top: 100px;
                    left: 40px;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    font-size: 0.8rem;
                    opacity: 0.7;
                }
                .back-btn:hover { opacity: 1; }
                
                .auth-card-container {
                    width: 100%;
                    max-width: 500px;
                }
                .auth-card {
                    background: white;
                    padding: 50px;
                    border-radius: 8px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                }
                .auth-header {
                    text-align: center;
                    margin-bottom: 40px;
                }
                .auth-header h1 {
                    font-size: 2.2rem;
                    margin-bottom: 10px;
                    color: var(--accent-dark);
                }
                .auth-header p {
                    color: var(--text-grey);
                    font-size: 0.95rem;
                }
                .auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                }
                .input-group label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    font-size: 0.85rem;
                    margin-bottom: 10px;
                    color: var(--text-dark);
                }
                .input-group input:not(.location-input) {
                    width: 100%;
                    padding: 12px 15px;
                    border: 1px solid var(--border-light);
                    border-radius: 4px;
                    font-size: 1rem;
                }
                .input-group input:focus {
                    border-color: var(--accent-teal);
                    outline: none;
                }
                .auth-submit {
                    margin-top: 10px;
                    height: 55px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .auth-error {
                    color: #ef4444;
                    background: #fee2e2;
                    padding: 10px;
                    border-radius: 4px;
                    font-size: 0.85rem;
                    text-align: center;
                }
                .auth-footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 0.9rem;
                    color: var(--text-grey);
                }
                .toggle-btn {
                    margin-left: 8px;
                    color: var(--accent-teal);
                    font-weight: 700;
                    font-size: 0.8rem;
                    letter-spacing: 0.05em;
                }
                @media (max-width: 576px) {
                    .auth-card { padding: 30px 20px; }
                }
            `}</style>
        </div>
    );
};

export default AuthPage;
