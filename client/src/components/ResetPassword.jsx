import React, { useState } from 'react';
import { Lock, ArrowRight, ArrowLeft } from 'lucide-react';

const ResetPassword = ({ token, onBackToLogin }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to reset password');
            }

            setSuccess(data.message);
            // Hide the form visually
            setTimeout(() => {
                onBackToLogin();
            }, 3000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <button className="back-btn" onClick={onBackToLogin}>
                <ArrowLeft size={20} /> TO LOGIN
            </button>

            <div className="auth-card-container">
                <div className="auth-card animate-fade-in">
                    <div className="auth-header">
                        <h1 className="heading-font">NEW PASSWORD</h1>
                        <p>Enter a secure new password for your account</p>
                    </div>

                    {error && <div className="auth-error mb-4">{error}</div>}
                    {success && <div className="auth-success mb-4" style={{color: '#166534', background: '#bbf7d0', padding: '15px', borderRadius: '4px', textAlign: 'center', lineHeight: '1.5'}}>{success} <br/>Redirecting to Login...</div>}

                    {!success && (
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label><Lock size={16} /> New Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter new password"
                                />
                            </div>
                            
                            <div className="input-group">
                                <label><Lock size={16} /> Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Verify new password"
                                />
                            </div>

                            <button type="submit" className="btn-primary auth-submit w-100 mt-4" disabled={loading}>
                                {loading ? 'SAVING...' : 'UPDATE PASSWORD'}
                                {!loading && <ArrowRight size={18} style={{ marginLeft: '10px' }} />}
                            </button>
                        </form>
                    )}
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
                    background: transparent;
                    border: none;
                    cursor: pointer;
                }
                .back-btn:hover { opacity: 1; }
                .auth-card-container { width: 100%; max-width: 500px; }
                .auth-card {
                    background: white;
                    padding: 50px;
                    border-radius: 8px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                }
                .auth-header { text-align: center; margin-bottom: 30px; }
                .auth-header h1 { font-size: 2.2rem; margin-bottom: 10px; color: var(--accent-dark); }
                .auth-header p { color: var(--text-grey); font-size: 0.95rem; }
                .auth-form { display: flex; flex-direction: column; gap: 20px; }
                .input-group label {
                    display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.85rem; margin-bottom: 10px; color: var(--text-dark);
                }
                .input-group input {
                    width: 100%; padding: 12px 15px; border: 1px solid var(--border-light); border-radius: 4px; font-size: 1rem;
                }
                .input-group input:focus { border-color: var(--accent-teal); outline: none; }
                .auth-submit { height: 55px; display: flex; align-items: center; justify-content: center; }
                .w-100 { width: 100%; }
                .mb-4 { margin-bottom: 1.5rem; }
                .mt-4 { margin-top: 1.5rem; }
                .auth-error {
                    color: #ef4444; background: #fee2e2; padding: 10px; border-radius: 4px; font-size: 0.85rem; text-align: center;
                }
            `}</style>
        </div>
    );
};

export default ResetPassword;
