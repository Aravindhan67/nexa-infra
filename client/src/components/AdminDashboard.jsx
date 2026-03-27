import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle } from 'lucide-react';

const AdminDashboard = ({ currentUser }) => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') {
            setError('Unauthorized Access');
            setIsLoading(false);
            return;
        }

        fetchAppointments();
    }, [currentUser]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/appointments/all');
            if (response.ok) {
                const data = await response.json();
                setAppointments(data);
            } else {
                setError('Failed to fetch appointments');
            }
        } catch (err) {
            setError('Could not connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (appointmentId, newStatus) => {
        setUpdatingId(appointmentId);
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            
            if (response.ok) {
                // Update local state to reflect the new status instantly
                setAppointments(appointments.map(apt => 
                    apt._id === appointmentId ? { ...apt, status: newStatus } : apt
                ));
            } else {
                alert('Failed to update status');
            }
        } catch (err) {
            alert('Error connecting to server');
        } finally {
            setUpdatingId(null);
        }
    };

    if (error) {
        return (
            <div className="admin-dashboard container">
                <div className="error-message">
                    <h2>{error}</h2>
                    <p>Only administrators can access this page.</p>
                </div>
                <style jsx>{`.admin-dashboard { padding: 150px 0; text-align: center; } .error-message { padding: 40px; background: #fef2f2; color: #991b1b; border-radius: 8px; }`}</style>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <section className="dashboard-hero container">
                <h1 className="heading-font animate-fade-in">Admin Dashboard</h1>
                <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    Welcome, {currentUser?.username}. Here are all the booked consultations.
                </p>
            </section>

            <section className="dashboard-content container animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {isLoading ? (
                    <div className="loading-state">Loading appointments...</div>
                ) : appointments.length === 0 ? (
                    <div className="empty-state">No appointments found.</div>
                ) : (
                    <div className="appointments-table-wrapper">
                        <table className="appointments-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Client Name</th>
                                    <th>Contact Data</th>
                                    <th>Project Details</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((apt) => (
                                    <tr key={apt._id}>
                                        <td className="font-semibold">{apt.date}</td>
                                        <td>{apt.time}</td>
                                        <td>{apt.name}</td>
                                        <td>
                                            <div className="contact-info">
                                                <span><Mail size={14}/> {apt.email}</span>
                                                <span><Phone size={14}/> {apt.phone}</span>
                                            </div>
                                        </td>
                                        <td className="project-details">{apt.projectDetails || 'N/A'}</td>
                                        <td>
                                            <select 
                                                className={`status-select ${apt.status.toLowerCase()}`}
                                                value={apt.status}
                                                onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                                                disabled={updatingId === apt._id}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                            {updatingId === apt._id && <span className="updating-text">...</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <style jsx>{`
                .admin-dashboard {
                    padding: 120px 0 100px;
                    min-height: 100vh;
                    background-color: var(--bg-light);
                }
                .dashboard-hero {
                    margin-bottom: 40px;
                }
                .dashboard-hero h1 {
                    font-size: 3rem;
                    margin-bottom: 10px;
                }
                .appointments-table-wrapper {
                    background: var(--primary-white);
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    overflow-x: auto;
                    border: 1px solid var(--border-light);
                }
                .appointments-table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }
                .appointments-table th, .appointments-table td {
                    padding: 20px;
                    border-bottom: 1px solid var(--border-light);
                }
                .appointments-table th {
                    background: #f8f9fa;
                    font-weight: 600;
                    color: var(--text-dark);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .appointments-table tbody tr:hover {
                    background-color: rgba(0,0,0,0.01);
                }
                .font-semibold {
                    font-weight: 600;
                }
                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    font-size: 0.85rem;
                    color: var(--text-grey);
                }
                .contact-info span {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .project-details {
                    max-width: 250px;
                    font-size: 0.9rem;
                    color: var(--text-grey);
                }
                .status-select {
                    padding: 8px 14px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    border: 1px solid var(--border-light);
                    cursor: pointer;
                    appearance: none;
                    outline: none;
                    transition: var(--transition-smooth);
                }
                .status-select.pending {
                    background-color: #fef08a;
                    color: #854d0e;
                    border-color: #fde047;
                }
                .status-select.confirmed {
                    background-color: #bbf7d0;
                    color: #166534;
                    border-color: #86efac;
                }
                .status-select.completed {
                    background-color: #bfdbfe;
                    color: #1e3a8a;
                    border-color: #93c5fd;
                }
                .status-select.cancelled {
                    background-color: #fecaca;
                    color: #991b1b;
                    border-color: #fca5a5;
                }
                .updating-text {
                    font-size: 0.8rem;
                    color: var(--text-grey);
                    margin-left: 8px;
                }
                .loading-state, .empty-state {
                    padding: 60px;
                    text-align: center;
                    background: var(--primary-white);
                    border-radius: 12px;
                    color: var(--text-grey);
                    font-size: 1.1rem;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
