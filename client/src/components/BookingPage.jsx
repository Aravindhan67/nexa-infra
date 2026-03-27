import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle } from 'lucide-react';

const BookingPage = () => {
    const [date, setDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        time: '',
        projectDetails: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Get today's date in YYYY-MM-DD format for the min attribute
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (date) {
            fetchAvailableSlots(date);
        } else {
            setAvailableSlots([]);
        }
    }, [date]);

    const fetchAvailableSlots = async (selectedDate) => {
        setIsLoadingSlots(true);
        setStatus({ type: '', message: '' });
        
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/slots?date=${selectedDate}`);
            const data = await response.json();
            
            if (response.ok) {
                setAvailableSlots(data.availableSlots || []);
                // Reset selected time if it's no longer available
                if (formData.time && !(data.availableSlots || []).includes(formData.time)) {
                    setFormData(prev => ({ ...prev, time: '' }));
                }
            } else {
                setStatus({ type: 'error', message: 'Failed to fetch available times.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Could not connect to server.' });
        } finally {
            setIsLoadingSlots(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleTimeSelect = (timeSlot) => {
        setFormData({ ...formData, time: timeSlot });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!date || !formData.time) {
            setStatus({ type: 'error', message: 'Please select a date and time.' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        const payload = { ...formData, date };

        try {
            const response = await fetch('http://localhost:5000/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
            } else {
                setStatus({ type: 'error', message: data.error || 'Booking failed.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Could not connect to server.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="booking-page success-view container">
                <div className="success-card animate-fade-in">
                    <CheckCircle size={64} className="success-icon" />
                    <h2 className="heading-font">Booking Confirmed!</h2>
                    <p>Thank you, {formData.name}. Your consultation is booked.</p>
                    <div className="booking-details">
                        <p><strong>Date:</strong> {date}</p>
                        <p><strong>Time:</strong> {formData.time}</p>
                    </div>
                    <p className="success-note">We will send a confirmation email shortly.</p>
                    <button className="btn-primary" onClick={() => window.location.reload()}>Book Another</button>
                </div>
                <style jsx>{`
                    .success-view { padding: 150px 0; text-align: center; display: flex; justify-content: center; }
                    .success-card { background: var(--bg-light); padding: 50px; border-radius: 12px; max-width: 500px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                    .success-icon { color: var(--accent-teal); margin-bottom: 20px; }
                    .booking-details { background: var(--primary-white); padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid var(--border-light); }
                    .success-note { color: var(--text-grey); margin-bottom: 30px; font-size: 0.9rem; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="booking-page">
            <section className="booking-hero container text-center">
                <h1 className="heading-font animate-fade-in">Book a Consultation</h1>
                <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    Schedule a meeting with our specialized interior design team.
                </p>
            </section>

            <section className="booking-content container">
                <div className="booking-grid">
                    
                    {/* Step 1: Date & Time Selection */}
                    <div className="booking-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <h3 className="panel-title"><Calendar size={20}/> 1. Select Date & Time</h3>
                        
                        <div className="form-group">
                            <label>Pick a Date</label>
                            <input 
                                type="date" 
                                min={today}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="date-input"
                            />
                        </div>

                        {date && (
                            <div className="time-slots-container">
                                <label><Clock size={16} style={{marginRight: '5px'}}/> Available Times</label>
                                {isLoadingSlots ? (
                                    <p className="loading-text">Loading slots...</p>
                                ) : availableSlots.length > 0 ? (
                                    <div className="slots-grid">
                                        {availableSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                type="button"
                                                className={`slot-btn ${formData.time === slot ? 'selected' : ''}`}
                                                onClick={() => handleTimeSelect(slot)}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-slots">No available slots for this date.</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Step 2: User Details Form */}
                    <div className="booking-panel animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <h3 className="panel-title"><User size={20}/> 2. Your Details</h3>
                        
                        <form onSubmit={handleSubmit} className="booking-form">
                            {status.message && (
                                <div className={`status-message ${status.type}`}>{status.message}</div>
                            )}

                            <div className="form-group input-with-icon">
                                <User className="input-icon" size={18} />
                                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="form-group input-with-icon">
                                <Mail className="input-icon" size={18} />
                                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="form-group input-with-icon">
                                <Phone className="input-icon" size={18} />
                                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                            </div>

                            <div className="form-group input-with-icon align-top">
                                <FileText className="input-icon" size={18} style={{marginTop: '15px'}} />
                                <textarea name="projectDetails" placeholder="Briefly describe your project..." rows="4" value={formData.projectDetails} onChange={handleChange}></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="btn-primary w-full" 
                                disabled={isSubmitting || !date || !formData.time}
                            >
                                {isSubmitting ? 'BOOKING...' : 'CONFIRM BOOKING'}
                            </button>
                        </form>
                    </div>

                </div>
            </section>

            <style jsx>{`
                .booking-page {
                    padding: 120px 0 100px;
                }
                .booking-hero h1 {
                    font-size: 3.5rem;
                    margin-bottom: 15px;
                }
                .booking-hero p {
                    color: var(--text-grey);
                    font-size: 1.1rem;
                }
                .booking-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    margin-top: 50px;
                }
                .booking-panel {
                    background: var(--primary-white);
                    border: 1px solid var(--border-light);
                    border-radius: 12px;
                    padding: 40px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.03);
                }
                .panel-title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 1.4rem;
                    margin-bottom: 30px;
                    color: var(--accent-dark);
                    border-bottom: 2px solid var(--bg-light);
                    padding-bottom: 15px;
                }
                .form-group {
                    margin-bottom: 25px;
                }
                .form-group label {
                    display: block;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-bottom: 10px;
                    color: var(--text-dark);
                }
                input, textarea {
                    width: 100%;
                    padding: 15px;
                    border: 1px solid var(--border-light);
                    border-radius: 6px;
                    font-family: inherit;
                    font-size: 1rem;
                    background: var(--primary-white);
                    color: var(--text-dark);
                    transition: var(--transition-smooth);
                }
                input:focus, textarea:focus {
                    border-color: var(--accent-teal);
                    box-shadow: 0 0 0 3px rgba(0, 128, 128, 0.1);
                }
                .date-input {
                    cursor: pointer;
                }
                .time-slots-container {
                    margin-top: 30px;
                }
                .time-slots-container label {
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                    margin-bottom: 15px;
                    color: var(--text-dark);
                }
                .slots-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }
                .slot-btn {
                    padding: 12px 10px;
                    background: var(--bg-light);
                    border: 1px solid var(--border-light);
                    border-radius: 6px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: var(--text-dark);
                    transition: var(--transition-smooth);
                }
                .slot-btn:hover {
                    background: var(--border-light);
                }
                .slot-btn.selected {
                    background: var(--accent-teal);
                    color: white;
                    border-color: var(--accent-teal);
                }
                .loading-text, .no-slots {
                    color: var(--text-grey);
                    font-size: 0.95rem;
                    padding: 20px;
                    background: var(--bg-light);
                    border-radius: 6px;
                    text-align: center;
                }
                .input-with-icon {
                    position: relative;
                }
                .input-icon {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-grey);
                }
                .align-top .input-icon {
                    top: 0;
                    transform: none;
                }
                .input-with-icon input, .input-with-icon textarea {
                    padding-left: 45px;
                }
                .w-full {
                    width: 100%;
                }
                .w-full:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .status-message {
                    padding: 12px;
                    border-radius: 6px;
                    margin-bottom: 20px;
                    font-size: 0.9rem;
                }
                .status-message.error {
                    background: #fef2f2;
                    color: #991b1b;
                    border: 1px solid #fecaca;
                }
                @media (max-width: 900px) {
                    .booking-grid {
                        grid-template-columns: 1fr;
                    }
                }
                @media (max-width: 500px) {
                    .slots-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .booking-panel {
                        padding: 25px;
                    }
                }
            `}</style>
        </div>
    );
};

export default BookingPage;
