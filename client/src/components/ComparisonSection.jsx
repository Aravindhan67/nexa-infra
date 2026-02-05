import React from 'react';
import { Check, X } from 'lucide-react';

const ComparisonSection = () => {
    const features = [
        { label: "Warranty", typical: "1-2 Years", nexa: "10 Years Warranty*" },
        { label: "Design Process", typical: "2D Drawings", nexa: "360° Virtual Tours" },
        { label: "Delivery Time", typical: "4-6 Months", nexa: "45 Days Delivery" },
        { label: "Price Transparency", typical: "Hidden Costs", nexa: "Fixed Price Policy" },
        { label: "Expert Designers", typical: "Freelancers", nexa: "In-house Experts" },
    ];

    return (
        <section className="comparison-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">WHY NEXA INFRA?</h2>
                    <p className="section-subtitle">A comparison of value and reliability.</p>
                </div>

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Criteria</th>
                                <th>Typical Experience</th>
                                <th className="highlight-col">Nexa Infra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((f, i) => (
                                <tr key={i}>
                                    <td className="criteria-label">{f.label}</td>
                                    <td className="typical-cell">
                                        <div className="cell-content">
                                            <X size={16} color="#ff4d4d" />
                                            <span>{f.typical}</span>
                                        </div>
                                    </td>
                                    <td className="nexa-cell">
                                        <div className="cell-content">
                                            <Check size={16} color="#008080" />
                                            <span>{f.nexa}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                .comparison-section {
                    background-color: var(--bg-light);
                }

                .comparison-table-wrapper {
                    margin-top: 50px;
                    overflow-x: auto;
                }

                .comparison-table {
                    width: 100%;
                    border-collapse: collapse;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                }

                .comparison-table th, .comparison-table td {
                    padding: 25px 30px;
                    text-align: left;
                    border-bottom: 1px solid var(--border-light);
                }

                .comparison-table th {
                    background: #fdfdfd;
                    font-weight: 600;
                    text-transform: uppercase;
                    font-size: 0.85rem;
                    letter-spacing: 1px;
                }

                .criteria-label {
                    font-weight: 500;
                    color: var(--accent-dark);
                }

                .highlight-col {
                    background: #f0fafa !important;
                    color: var(--accent-teal);
                }

                .nexa-cell {
                    background: #f0fafa;
                    font-weight: 600;
                    color: var(--accent-dark);
                }

                .cell-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                @media (max-width: 768px) {
                    .comparison-table th, .comparison-table td {
                        padding: 15px 20px;
                        font-size: 0.85rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default ComparisonSection;
