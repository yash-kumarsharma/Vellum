import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formService, responseService } from '../services/api';
import PublicHeader from '../components/PublicHeader';
import { Calendar, ChevronDown, CheckSquare, Circle, Type, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
            setError(err.response?.data?.message || "Failed to submit response. The form might be private or closed.");
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
                setError("This form is either private or does not exist.");
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
        </div>
    );

    if (error) return (
        <div className="flex-center" style={{ minHeight: '100vh', background: 'hsl(var(--v-bg))', flexDirection: 'column', gap: '1rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="vellum-card-premium"
                style={{ padding: '3rem', maxWidth: '500px', textAlign: 'center', borderTop: '4px solid #ef4444' }}
            >
                <AlertCircle size={48} color="#ef4444" style={{ margin: '0 auto 1.5rem', opacity: 0.8 }} />
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>Form Unavailable</h2>
                <p style={{ color: 'hsl(var(--v-text-muted))', lineHeight: 1.6 }}>{error}</p>
                <button className="btn btn-outline" style={{ marginTop: '2rem' }} onClick={() => window.location.href = '/'}>
                    Go to Vellum
                </button>
            </motion.div>
        </div>
    );

    const renderQuestion = (q, index) => {
        return (
            <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="vellum-card-premium" // Changed from plain div to card for each question
                style={{ marginBottom: '1.5rem', padding: '1.5rem', border: '1px solid hsl(var(--v-border))' }}
            >
                <label style={{ display: 'block', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'hsl(var(--v-text-main))' }}>
                    {q.label}
                    {q.required && <span style={{ color: '#ef4444', marginLeft: '0.25rem' }} title="Required">*</span>}
                </label>

                {q.type === 'TEXT' && (
                    <input
                        type="text"
                        className="vellum-input"
                        placeholder="Your answer"
                        value={answers[q.id] || ''}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        required={q.required}
                        style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', background: 'hsl(var(--v-surface))', border: '1px solid hsl(var(--v-border))', borderRadius: 'var(--radius-md)' }}
                    />
                )}

                {q.type === 'MULTIPLE_CHOICE' && (
                    <div className="flex-column" style={{ gap: '0.75rem' }}>
                        {q.options?.map((opt, i) => (
                            <label key={i} className="flex" style={{ alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem', borderRadius: '8px', border: '1px solid hsl(var(--v-border))', background: answers[q.id] === opt ? 'hsl(var(--v-primary) / 0.05)' : 'transparent', borderColor: answers[q.id] === opt ? 'hsl(var(--v-primary))' : 'hsl(var(--v-border))', transition: 'all 0.2s' }}>
                                <input
                                    type="radio"
                                    name={q.id}
                                    value={opt}
                                    checked={answers[q.id] === opt}
                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                    required={q.required}
                                    style={{ accentColor: 'hsl(var(--v-primary))', width: 18, height: 18 }}
                                />
                                <span style={{ fontSize: '0.95rem' }}>{opt}</span>
                            </label>
                        ))}
                    </div>
                )}

                {q.type === 'CHECKBOX' && (
                    <div className="flex-column" style={{ gap: '0.75rem' }}>
                        {q.options?.map((opt, i) => (
                            <label key={i} className="flex" style={{ alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem', borderRadius: '8px', border: '1px solid hsl(var(--v-border))', background: (answers[q.id]?.includes(opt)) ? 'hsl(var(--v-primary) / 0.05)' : 'transparent', borderColor: (answers[q.id]?.includes(opt)) ? 'hsl(var(--v-primary))' : 'hsl(var(--v-border))', transition: 'all 0.2s' }}>
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
                                <span style={{ fontSize: '0.95rem' }}>{opt}</span>
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
                            style={{ width: '100%', padding: '0.8rem', appearance: 'none', background: 'hsl(var(--v-surface))', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--v-border))', fontSize: '1rem' }}
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
                    <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                        <input
                            type="date"
                            className="vellum-input"
                            value={answers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            required={q.required}
                            style={{ padding: '0.8rem', paddingLeft: '2.5rem', width: '100%', background: 'hsl(var(--v-surface))', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--v-border))' }}
                        />
                        <Calendar size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'hsl(var(--v-text-muted))' }} />
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '4rem', overflowX: 'hidden', background: 'hsl(var(--v-bg))' }}>
            {/* Background Orbs */}
            <div className="dashboard-background">
                <div className="dashboard-orb d-orb-1" style={{ top: '-10%', left: '-10%', opacity: 0.4 }}></div>
                <div className="dashboard-orb d-orb-3" style={{ bottom: '-10%', right: '-10%', opacity: 0.3 }}></div>
            </div>

            <div style={{ position: 'relative', zIndex: 10 }}>
                {/* Minimal Header */}
                <div className="vellum-glass" style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid hsl(var(--v-border))', position: 'sticky', top: 0, zIndex: 50 }}>
                    <div style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, hsl(var(--v-primary)), hsl(var(--v-accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Vellum
                    </div>
                </div>

                {/* Hero Banner */}
                <div style={{ height: '280px', background: 'linear-gradient(135deg, hsl(var(--v-primary)), hsl(var(--v-accent)))', marginBottom: '-100px', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'url("https://www.transparenttextures.com/patterns/cubes.png")', opacity: 0.1 }}></div>
                    <div style={{ position: 'absolute', bottom: '-50px', left: 0, right: 0, height: '100px', background: 'hsl(var(--v-bg))', clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0 100%)' }}></div>
                </div>

                <div className="container" style={{ maxWidth: '720px', position: 'relative', zIndex: 10, padding: '0 1.5rem' }}>
                    {/* Title Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="vellum-card-premium"
                        style={{ padding: '3.5rem', marginBottom: '2rem', borderTop: '8px solid hsl(var(--v-primary))', marginTop: '-40px' }}
                    >
                        <h1 style={{ fontSize: '2.75rem', marginBottom: '1rem', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em' }}>{form?.title}</h1>
                        <p style={{ color: 'hsl(var(--v-text-muted))', fontSize: '1.125rem', lineHeight: 1.7 }}>{form?.description || "Please fill out this form."}</p>
                    </motion.div>

                    {/* Questions */}
                    {submitted ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="vellum-card-premium"
                            style={{ padding: '4rem 2rem', textAlign: 'center' }}
                        >
                            <div style={{ width: 80, height: 80, background: 'hsl(var(--v-success) / 0.1)', color: 'hsl(var(--v-success))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                <CheckSquare size={40} />
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>Response Recorded</h2>
                            <p style={{ color: 'hsl(var(--v-text-muted))', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Thank you! Your response has been successfully submitted.</p>
                            <button className="btn btn-outline btn-large" onClick={() => window.location.reload()}>Submit Another Response</button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {form?.questions?.map((q, i) => renderQuestion(q, i))}

                            {/* Submit Button */}
                            <div className="flex-column" style={{ alignItems: 'center', marginTop: '3rem', paddingBottom: '3rem' }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn btn-primary btn-large"
                                    style={{ padding: '1.25rem 4rem', fontSize: '1.125rem', borderRadius: '50px', boxShadow: '0 10px 30px -10px hsl(var(--v-primary) / 0.5)', width: '100%', maxWidth: '400px' }}
                                    disabled={submitting}
                                >
                                    {submitting ? 'Submitting...' : 'Submit Response'}
                                </motion.button>
                                <div style={{ fontSize: '0.875rem', color: 'hsl(var(--v-text-muted))', opacity: 0.6, marginTop: '1.5rem' }}>
                                    Powered by <strong style={{ color: 'hsl(var(--v-text-main))' }}>Vellum</strong>
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
