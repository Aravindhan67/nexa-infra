import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, FileUp, MessageSquare, Clock, Calculator, IndianRupee } from 'lucide-react';

const ClientPortal = ({ currentUser }) => {
    const [appointments, setAppointments] = useState([]);
    const [estimates, setEstimates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!currentUser) {
            setError('Please log in to view your portal');
            setIsLoading(false);
            return;
        }

        fetchMyAppointments();
    }, [currentUser]);

    const fetchMyAppointments = async () => {
        try {
            const [aptRes, estRes] = await Promise.all([
                fetch(`http://localhost:5000/api/appointments/me/${currentUser.email}`),
                fetch(`http://localhost:5000/api/estimates/me/${currentUser.email}`)
            ]);
            
            if (aptRes.ok) {
                const aptData = await aptRes.json();
                setAppointments(aptData);
            }
            if (estRes.ok) {
                const estData = await estRes.json();
                setEstimates(estData);
            }
        } catch (err) {
            setError('Could not connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

    if (error) {
        return (
            <div className="client-portal container">
                <div className="error-message">
                    <h2>{error}</h2>
                </div>
                <style jsx>{`.client-portal { padding: 150px 0; text-align: center; } .error-message { padding: 40px; background: #fef2f2; color: #991b1b; border-radius: 8px; }`}</style>
            </div>
        );
    }

    return (
        <div className="client-portal">
            <section className="portal-hero container">
                <h1 className="heading-font animate-fade-in">My Portal</h1>
                <p className="subtitle animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    Welcome back, {currentUser?.username}. Manage your appointments and designs.
                </p>
            </section>

            <section className="portal-content container animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="portal-grid">
                    {/* Left Column: Appointments */}
                    <div className="appointments-section">
                        <div className="section-header">
                            <CalendarIcon size={24} color="var(--primary-accent)" />
                            <h2>My Consultations</h2>
                        </div>
                        
                        {isLoading ? (
                            <div className="loading-state">Loading your schedule...</div>
                        ) : appointments.length === 0 ? (
                            <div className="empty-state">
                                <p>You haven't booked any consultations yet.</p>
                            </div>
                        ) : (
                            <div className="appointments-list mb-5">
                                {appointments.map((apt) => (
                                    <div key={apt._id} className="appointment-card">
                                        <div className="apt-header">
                                            <div className="apt-date-time">
                                                <span className="date">{apt.date}</span>
                                                <span className="time"><Clock size={14}/> {apt.time}</span>
                                            </div>
                                            <span className={`status-badge ${apt.status.toLowerCase()}`}>
                                                {apt.status}
                                            </span>
                                        </div>
                                        <div className="apt-body">
                                            <p className="project-desc"><strong>Project:</strong> {apt.projectDetails || 'No details provided'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="section-header mt-5">
                            <Calculator size={24} color="var(--primary-accent)" />
                            <h2>Saved Estimates</h2>
                        </div>
                        
                        {isLoading ? (
                            <div className="loading-state">Loading estimates...</div>
                        ) : estimates.length === 0 ? (
                            <div className="empty-state">
                                <p>You haven't saved any cost estimates yet.</p>
                            </div>
                        ) : (
                            <div className="appointments-list">
                                {estimates.map((est) => (
                                    <div key={est._id} className="appointment-card">
                                        <div className="apt-header">
                                            <div className="apt-date-time">
                                                <span className="date">{est.roomType.toUpperCase().replace('-', ' ')}</span>
                                                <span className="time">{est.sqft} sqft • {est.quality}</span>
                                            </div>
                                            <span className="date">
                                                {new Date(est.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="apt-body">
                                            <p className="project-desc d-flex align-items-center gap-2">
                                                <IndianRupee size={16} color="var(--accent-teal)" />
                                                <strong>{formatCurrency(est.minCost)}</strong> - <strong>{formatCurrency(est.maxCost)}</strong>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Actions */}
                    <div className="actions-section">
                        <div className="action-card">
                            <div className="icon"><FileUp size={32} /></div>
                            <h3>Upload Floor Plan</h3>
                            <p>Send our design team your layout for a faster estimate.</p>
                            <button className="btn-outline w-100" onClick={() => alert('This feature will securely upload your PDF/DWG files in the next update!')}>
                                UPLOAD FILE
                            </button>
                        </div>
                        
                        <div className="action-card outline">
                            <div className="icon"><MessageSquare size={32} /></div>
                            <h3>Direct Messages</h3>
                            <p>Chat directly with your assigned lead designer.</p>
                            <button className="btn-primary w-100" onClick={() => alert('Chat support is currently offline.')}>
                                OPEN CHAT
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .client-portal {
                    padding: 120px 0 100px;
                    min-height: 100vh;
                    background-color: var(--bg-light);
                }
                .portal-hero {
                    margin-bottom: 50px;
                }
                .portal-hero h1 {
                    font-size: 3rem;
                    color: var(--text-dark);
                    margin-bottom: 15px;
                }
                .subtitle {
                    color: var(--text-grey);
                    font-size: 1.1rem;
                }
                .portal-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 40px;
                }
                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 30px;
                }
                .section-header h2 {
                    font-size: 1.8rem;
                    margin: 0;
                    font-family: 'Epilogue', serif;
                    color: var(--text-dark);
                }

                /* Appointments List */
                .appointments-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .appointment-card {
                    background: var(--primary-white);
                    border-radius: 12px;
                    padding: 25px;
                    border: 1px solid var(--border-light);
                    box-shadow: 0 5px 20px rgba(0,0,0,0.02);
                    transition: transform 0.2s ease;
                }
                .appointment-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(0,0,0,0.05);
                }
                .apt-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid var(--border-light);
                }
                .apt-date-time {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .date {
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: var(--text-dark);
                }
                .time {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.95rem;
                    color: var(--text-grey);
                }
                .status-badge {
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .status-badge.pending {
                    background: #fef08a;
                    color: #854d0e;
                }
                .status-badge.confirmed {
                    background: #bbf7d0;
                    color: #166534;
                }
                .status-badge.completed {
                    background: #bfdbfe;
                    color: #1e3a8a;
                }
                .status-badge.cancelled {
                    background: #fecaca;
                    color: #991b1b;
                }
                .project-desc {
                    color: var(--text-grey);
                    line-height: 1.6;
                    margin: 0;
                }
                .mt-5 {
                    margin-top: 3rem;
                }
                .mb-5 {
                    margin-bottom: 3rem;
                }

                /* Actions Right */
                .actions-section {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                }
                .action-card {
                    background: var(--primary-white);
                    border-radius: 16px;
                    padding: 30px;
                    text-align: center;
                    border: 1px solid var(--border-light);
                    box-shadow: 0 5px 20px rgba(0,0,0,0.02);
                }
                .action-card.outline {
                    background: transparent;
                    border: 2px dashed var(--border-light);
                }
                .action-card .icon {
                    color: var(--primary-accent);
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: center;
                }
                .action-card h3 {
                    font-family: 'Epilogue', serif;
                    margin-bottom: 10px;
                    color: var(--text-dark);
                }
                .action-card p {
                    color: var(--text-grey);
                    font-size: 0.95rem;
                    margin-bottom: 25px;
                }
                .w-100 {
                    width: 100%;
                }
                .loading-state, .empty-state {
                    padding: 40px;
                    text-align: center;
                    background: var(--primary-white);
                    border-radius: 12px;
                    color: var(--text-grey);
                }

                @media (max-width: 992px) {
                    .portal-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default ClientPortal;
