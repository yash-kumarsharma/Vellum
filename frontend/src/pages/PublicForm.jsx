import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formService, responseService } from '../services/api';
import { Check, ChevronRight } from 'lucide-react';

const PublicForm = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const res = await formService.getById(id);
                setForm(res.data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchForm();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await responseService.submit(id, { answers });
            setSubmitted(true);
        } catch (err) {
            alert('Vellum: Failed to record response.');
        }
    };

    const handleCheckboxChange = (qId, option, checked) => {
        const currentAnswers = answers[qId] || [];
        if (checked) {
            setAnswers({ ...answers, [qId]: [...currentAnswers, option] });
        } else {
            setAnswers({ ...answers, [qId]: currentAnswers.filter(o => o !== option) });
        }
    };

    if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}>Opening Vellum...</div>;
    if (!form) return <div className="flex-center" style={{ minHeight: '100vh' }}>Form not found.</div>;
    if (!form.isPublic) return <div className="flex-center" style={{ minHeight: '100vh' }}>This Vellum is private.</div>;

    if (submitted) {
        return (
            <div className="container flex-center flex-column" style={{ minHeight: '90vh', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'hsl(var(--v-primary) / 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                    <Check size={40} color="hsl(var(--v-primary))" />
                </div>
                <h1 style={{ marginBottom: '1rem' }}>Response Recorded</h1>
                <p style={{ color: 'hsl(var(--v-text-muted))', maxWidth: '400px' }}>Thank you for your time. Your answers have been securely synchronized with Vellum.</p>
                <button className="btn btn-ghost" style={{ marginTop: '2rem' }} onClick={() => window.location.reload()}>Submit another</button>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', padding: '4rem 1rem' }}>
            <form className="container" style={{ maxWidth: '640px' }} onSubmit={handleSubmit}>
                <div className="vellum-card" style={{ borderTop: '8px solid hsl(var(--v-primary))', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{form.title}</h1>
                    <p style={{ color: 'hsl(var(--v-text-muted))', fontSize: '1.1rem' }}>{form.description}</p>
                </div>

                {form.questions.sort((a, b) => a.order - b.order).map(q => (
                    <div key={q.id} className="vellum-card fade-in" style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: '2rem 0', borderBottom: '1px solid hsl(var(--v-border))', borderRadius: 0 }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '2rem' }}>
                            {q.label} {q.required && <span style={{ color: 'hsl(var(--v-primary))' }}>*</span>}
                        </div>

                        <div className="vellum-card" style={{ background: 'hsl(var(--v-surface))', padding: '2rem', border: '1px solid hsl(var(--v-border))', boxShadow: 'var(--shadow-md)' }}>
                            {q.type === 'TEXT' && (
                                <input
                                    className="vellum-input"
                                    placeholder="Type your answer here..."
                                    required={q.required}
                                    value={answers[q.id] || ''}
                                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                                    style={{ border: 'none', borderBottom: '2px solid hsl(var(--v-border))', borderRadius: 0, paddingLeft: 0, background: 'transparent' }}
                                />
                            )}

                            {q.type === 'MULTIPLE_CHOICE' && (
                                <div className="flex-column" style={{ gap: '1.25rem' }}>
                                    {q.options.map((opt, idx) => (
                                        <label key={idx} className="flex" style={{ alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--v-border))', transition: 'all 0.2s' }}>
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={opt}
                                                required={q.required}
                                                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                                                style={{ width: '18px', height: '18px', accentColor: 'hsl(var(--v-primary))' }}
                                            />
                                            <span style={{ fontWeight: '500' }}>{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {q.type === 'CHECKBOX' && (
                                <div className="flex-column" style={{ gap: '1.25rem' }}>
                                    {q.options.map((opt, idx) => (
                                        <label key={idx} className="flex" style={{ alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--v-border))', transition: 'all 0.2s' }}>
                                            <input
                                                type="checkbox"
                                                value={opt}
                                                checked={(answers[q.id] || []).includes(opt)}
                                                onChange={(e) => handleCheckboxChange(q.id, opt, e.target.checked)}
                                                style={{ width: '18px', height: '18px', accentColor: 'hsl(var(--v-primary))' }}
                                            />
                                            <span style={{ fontWeight: '500' }}>{opt}</span>
                                        </label>
                                    ))}
                                    {q.required && (answers[q.id] || []).length === 0 && <input type="checkbox" required style={{ opacity: 0, position: 'absolute' }} />}
                                </div>
                            )}

                            {q.type === 'DROPDOWN' && (
                                <select
                                    className="vellum-input"
                                    required={q.required}
                                    value={answers[q.id] || ''}
                                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                                    style={{ background: 'hsl(var(--v-surface))' }}
                                >
                                    <option value="">Select an option</option>
                                    {q.options.map((opt, idx) => (
                                        <option key={idx} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                ))}

                <div className="flex-between" style={{ marginTop: '4rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                        Submit Response <ChevronRight size={20} />
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={() => setAnswers({})}>Clear form</button>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--v-text-muted))', marginTop: '4rem', textAlign: 'center', opacity: 0.5 }}>
                    Powered by Vellum • Refinement in every form.
                </p>
            </form>
        </div>
    );
};

export default PublicForm;
