import React from 'react';

const ProcessSection = () => {
    const steps = [
        { id: "01", title: "MEET DESIGNER", desc: "Briefing and site visit with our experts." },
        { id: "02", title: "FINALIZE DESIGN", desc: "Interactive layouts and 3D visualisations." },
        { id: "03", title: "PLACE ORDER", desc: "Fabrication and material procurement." },
        { id: "04", title: "INSTALLATION", desc: "Precise execution by skilled craftsmen." },
        { id: "05", title: "READY", desc: "Quality check and final handover." },
    ];

    return (
        <section className="process-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">HOW IT WORKS</h2>
                </div>

                <div className="process-steps">
                    {steps.map((step, index) => (
                        <div key={index} className="process-step">
                            <div className="step-number">{step.id}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <div className="step-line"></div>
                            <p className="step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .process-section {
                    background-color: var(--primary-white);
                }

                .process-steps {
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                    margin-top: 50px;
                }

                .process-step {
                    flex: 1;
                    position: relative;
                }

                .step-number {
                    font-size: 3rem;
                    font-family: 'Epilogue', serif;
                    color: #eeeeee;
                    font-weight: 700;
                    line-height: 1;
                    margin-bottom: 20px;
                }

                .step-title {
                    font-size: 1rem;
                    letter-spacing: 1px;
                    margin-bottom: 15px;
                }

                .step-line {
                    width: 40px;
                    height: 2px;
                    background-color: var(--accent-teal);
                    margin-bottom: 20px;
                }

                .step-desc {
                    color: var(--text-grey);
                    font-size: 0.85rem;
                    line-height: 1.6;
                }

                @media (max-width: 992px) {
                    .process-steps {
                        flex-direction: column;
                        gap: 40px;
                    }
                    .process-step {
                        text-align: left;
                        max-width: 300px;
                    }
                }
            `}</style>
        </section>
    );
};

export default ProcessSection;
