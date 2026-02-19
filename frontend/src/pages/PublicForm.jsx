import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formService, responseService } from '../services/api';
import PublicHeader from '../components/PublicHeader';
import { Calendar, ChevronDown, CheckSquare, Circle, Type } from 'lucide-react';

const PublicForm = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(null);
    const [error, setError] = useState(null);

    // Form response state
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await responseService.submit(id, { answers });
            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setError("Failed to submit response. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const res = await formService.getById(id);
                setForm(res.data);
            } catch (err) {
                console.error(err);
                setError("Form not found or unavailable.");
            } finally {
                setLoading(false);
            }
        };
        fetchForm();
    }, [id]);

    const handleAnswerChange = (qId, value) => {
        setAnswers({ ...answers, [qId]: value });
    };

    if (loading) return (
        <div className="flex-center" style={{ minHeight: '100vh', background: 'hsl(var(--v-bg))' }}>
            <div className="spinner" style={{ width: 40, height: 40, border: '3px solid hsl(var(--v-primary))', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
    if (error) return <div className="flex-center" style={{ minHeight: '100vh' }}>{error}</div>;

    const renderQuestion = (q, index) => {
        return (
            <div key={q.id} className="vellum-question-compact" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem', color: 'hsl(var(--v-text-main))' }}>
                    {q.label}
                    {q.required && <span style={{ color: '#ef4444', marginLeft: '0.25rem' }}>*</span>}
                </label>

                {q.type === 'TEXT' && (
                    <input
                        type="text"
                        className="vellum-input"
                        placeholder="Your answer"
                        value={answers[q.id] || ''}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        required={q.required}
                        style={{ width: '100%', padding: '0.6rem', fontSize: '0.95rem', background: 'hsl(var(--v-bg))' }}
                    />
                )}

                {q.type === 'MULTIPLE_CHOICE' && (
                    <div className="flex-column" style={{ gap: '0.75rem' }}>
                        {q.options?.map((opt, i) => (
                            <label key={i} className="flex" style={{ alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', border: '1px solid hsl(var(--v-border))', transition: 'all 0.2s' }}>
                                <input
                                    type="radio"
                                    name={q.id}
                                    value={opt}
                                    checked={answers[q.id] === opt}
                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                    required={q.required}
                                    style={{ accentColor: 'hsl(var(--v-primary))', width: 18, height: 18 }}
                                />
                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>
                )}

                {q.type === 'CHECKBOX' && (
                    <div className="flex-column" style={{ gap: '0.75rem' }}>
                        {q.options?.map((opt, i) => (
                            <label key={i} className="flex" style={{ alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', border: '1px solid hsl(var(--v-border))', transition: 'all 0.2s' }}>
                                <input
                                    type="checkbox"
                                    name={q.id}
                                    value={opt}
                                    checked={answers[q.id]?.includes(opt) || false}
                                    onChange={(e) => {
                                        const current = answers[q.id] || [];
                                        if (e.target.checked) {
                                            handleAnswerChange(q.id, [...current, opt]);
                                        } else {
                                            handleAnswerChange(q.id, current.filter(v => v !== opt));
                                        }
                                    }}
                                    style={{ accentColor: 'hsl(var(--v-primary))', width: 18, height: 18 }}
                                />
                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>
                )}

                {q.type === 'DROPDOWN' && (
                    <div style={{ position: 'relative' }}>
                        <select
                            className="vellum-input"
                            value={answers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            required={q.required}
                            style={{ width: '100%', padding: '0.75rem', appearance: 'none', background: 'hsl(var(--v-surface))' }}
                        >
                            <option value="">Select an option</option>
                            {q.options?.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <ChevronDown size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'hsl(var(--v-text-muted))' }} />
                    </div>
                )}

                {q.type === 'DATE' && (
                    <div style={{ position: 'relative', width: 'fit-content' }}>
                        <input
                            type="date"
                            className="vellum-input"
                            value={answers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            required={q.required}
                            style={{ padding: '0.75rem', paddingLeft: '2.5rem' }}
                        />
                        <Calendar size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'hsl(var(--v-text-muted))' }} />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '4rem', overflowX: 'hidden' }}>
            {/* Background Orbs */}
            <div className="dashboard-background">
                <div className="dashboard-orb d-orb-1"></div>
                <div className="dashboard-orb d-orb-3"></div>
            </div>

            <div style={{ position: 'relative', zIndex: 10 }}>
                <PublicHeader />

                {/* Form Header */}
                <div style={{ height: '240px', background: 'linear-gradient(135deg, hsl(var(--v-primary)), hsl(var(--v-accent)))', marginBottom: '-80px', position: 'relative', zIndex: 5 }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'url("https://www.transparenttextures.com/patterns/cubes.png")', opacity: 0.1 }}></div>
                </div>

                <div className="container" style={{ maxWidth: '720px', position: 'relative', zIndex: 10 }}>
                    {/* Title Card */}
                    <div className="vellum-card-premium" style={{ padding: '3rem', marginBottom: '2rem', borderTop: '8px solid hsl(var(--v-primary))' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2, fontWeight: 700 }}>{form.title}</h1>
                        <p style={{ color: 'hsl(var(--v-text-muted))', fontSize: '1.1rem', lineHeight: 1.6 }}>{form.description || "Please fill out this form."}</p>
                    </div>

                    {/* Questions */}
                    {submitted ? (
                        <div className="vellum-card-premium" style={{ padding: '3rem', textAlign: 'center' }}>
                            <div style={{ width: 64, height: 64, background: 'hsl(var(--v-success) / 0.1)', color: 'hsl(var(--v-success))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <CheckSquare size={32} />
                            </div>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Response Recorded</h2>
                            <p style={{ color: 'hsl(var(--v-text-muted))', marginBottom: '2rem' }}>Thank you! Your response has been successfully submitted.</p>
                            <button className="btn btn-outline" onClick={() => window.location.reload()}>Submit Another Response</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {form.questions?.map((q, i) => renderQuestion(q, i))}

                            {/* Submit Button */}
                            <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem' }}>
                                <button
                                    className="btn btn-primary btn-large"
                                    style={{ padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: '30px' }}
                                    disabled={submitting}
                                >
                                    {submitting ? 'Submitting...' : 'Submit Response'}
                                </button>
                                <div style={{ fontSize: '0.875rem', color: 'hsl(var(--v-text-muted))', opacity: 0.7 }}>
                                    Powered by <strong>Vellum</strong>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicForm;
