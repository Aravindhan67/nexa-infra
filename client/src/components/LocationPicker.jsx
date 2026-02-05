import React, { useState } from 'react';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';

const LocationPicker = ({ onLocationSelect, initialValue = '' }) => {
    const [location, setLocation] = useState(initialValue);
    const [isDetecting, setIsDetecting] = useState(false);
    const [status, setStatus] = useState('');

    const detectLocation = () => {
        setIsDetecting(true);
        setStatus('Detecting...');

        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
            setIsDetecting(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                // Here we could use a reverse geocoding API like OpenStreetMap (Nominatim)
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    const address = data.display_name || `${latitude}, ${longitude}`;
                    setLocation(address);
                    onLocationSelect(address);
                    setStatus('Location detected!');
                } catch (error) {
                    const fallback = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                    setLocation(fallback);
                    onLocationSelect(fallback);
                    setStatus('Position found (Coordinates)');
                }
                setIsDetecting(false);
            },
            (error) => {
                setStatus('Unable to retrieve location');
                setIsDetecting(false);
            }
        );
    };

    return (
        <div className="location-picker">
            <div className="input-with-icon">
                <MapPin className="input-icon" size={18} />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => {
                        setLocation(e.target.value);
                        onLocationSelect(e.target.value);
                    }}
                    placeholder="Enter location or use auto-detect"
                    className="location-input"
                />
            </div>

            <div className="picker-actions">
                <button
                    type="button"
                    className={`btn-detect ${isDetecting ? 'loading' : ''}`}
                    onClick={detectLocation}
                    disabled={isDetecting}
                >
                    <Navigation size={14} style={{ marginRight: '8px' }} />
                    {isDetecting ? 'GETTING POSITION...' : 'FIND MY LOCATION'}
                </button>
                {status && (
                    <span className={`location-status ${status.includes('found') || status.includes('detected') ? 'success' : 'error'}`}>
                        {status.includes('found') || status.includes('detected') ? <CheckCircle size={12} style={{ marginRight: '4px' }} /> : null}
                        {status}
                    </span>
                )}
            </div>

            <style jsx>{`
                .location-picker {
                    width: 100%;
                }
                .input-with-icon {
                    position: relative;
                    margin-bottom: 12px;
                }
                .input-icon {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--accent-teal);
                }
                .location-input {
                    width: 100%;
                    padding: 12px 12px 12px 45px;
                    border: 1px solid var(--border-light);
                    border-radius: 4px;
                    font-size: 0.95rem;
                    background: transparent;
                }
                .location-input:focus {
                    border-color: var(--accent-teal);
                    outline: none;
                }
                .picker-actions {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .btn-detect {
                    display: flex;
                    align-items: center;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--accent-teal);
                    letter-spacing: 0.05em;
                    cursor: pointer;
                    transition: opacity 0.3s ease;
                }
                .btn-detect:hover:not(:disabled) {
                    opacity: 0.8;
                }
                .btn-detect:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .location-status {
                    font-size: 0.75rem;
                    display: flex;
                    align-items: center;
                }
                .location-status.success { color: #10b981; }
                .location-status.error { color: #ef4444; }
                
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
                .loading { animation: pulse 1s infinite; }
            `}</style>
        </div>
    );
};

export default LocationPicker;
