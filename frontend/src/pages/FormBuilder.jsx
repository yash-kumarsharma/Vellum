import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formService } from '../services/api';
import { Plus, Trash2, Settings, Eye, Send, MoreVertical, Copy, X, ArrowLeft, Share2, Globe, Lock, CheckSquare, ChevronDown, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

const FormBuilder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: 'Untitled form', description: '', questions: [], isPublic: true });
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [toast, setToast] = useState(null);

    const notify = (msg, type = 'info') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    useEffect(() => {
        if (id !== 'new') {
            const fetchForm = async () => {
                try {
                    const res = await formService.getOne(id);
                    setForm(res.data);
                    setLoading(false);
                } catch (err) {
                    console.error(err);
                    setLoading(false);
                    notify('Vellum: Access to this studio is restricted or form not found.', 'error');
                    setTimeout(() => navigate('/'), 2000);
                }
            };
            fetchForm();
        } else { setLoading(false); }
    }, [id]);

    const saveForm = async () => {
        setSaving(true);
        try {
            if (id === 'new') {
                const res = await formService.create(form);
                navigate(`/forms/${res.data.id}`);
            } else {
                await formService.update(id, form);
            }
            notify('Vellum: Studio sychronized successfully!');
        } catch (err) {
            console.error(err);
            notify('Failed to synchronize studio.', 'error');
        } finally { setSaving(false); }
    };

    const addQuestion = () => {
        const newQuestion = { id: Date.now().toString(), type: 'TEXT', label: 'New Question', options: ['Option 1'], required: false };
        setForm({ ...form, questions: [...form.questions, newQuestion] });
        setActiveQuestion(newQuestion.id);
    };

    const updateQuestion = (qId, updates) => {
        setForm({
            ...form,
            questions: form.questions.map(q => q.id === qId ? { ...q, ...updates } : q)
        });
    };

    const deleteQuestion = (qId) => setForm({ ...form, questions: form.questions.filter((q) => q.id !== qId) });

    const addOption = (qId) => {
        const q = form.questions.find(item => item.id === qId);
        const newOptions = [...(q.options || []), `Option ${(q.options?.length || 0) + 1}`];
        updateQuestion(qId, { options: newOptions });
    };

    const updateOption = (qId, idx, val) => {
        const q = form.questions.find(item => item.id === qId);
        const newOptions = [...q.options];
        newOptions[idx] = val;
        updateQuestion(qId, { options: newOptions });
    };

    const removeOption = (qId, idx) => {
        const q = form.questions.find(item => item.id === qId);
        const newOptions = q.options.filter((_, i) => i !== idx);
        updateQuestion(qId, { options: newOptions });
    };

    const copyLink = () => {
        const link = `${window.location.origin}/public/${id}`;
        navigator.clipboard.writeText(link);
        notify('Vellum Link copied to clipboard!');
    };

    if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}>Preparing the studio...</div>;

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '3rem' }}>
            <nav className="vellum-nav vellum-glass">
                <div className="flex" style={{ alignItems: 'center', gap: '1.5rem' }}>
                    <Link to="/" className="btn btn-ghost"><ArrowLeft size={20} /></Link>
                    <div className="brand-text" style={{ fontSize: '1.25rem' }}>Vellum Studio</div>
                </div>
                <div className="flex" style={{ gap: '1rem' }}>
                    <Link to={`/forms/${id}/responses`} className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>Responses</Link>
                    <button className="btn btn-ghost" onClick={() => window.open(`/public/${id}`, '_blank')} title="Preview"><Eye size={20} /></button>
                    <button className="btn btn-ghost" onClick={() => setShowShare(true)} title="Share"><Share2 size={20} /></button>
                    <button className="btn btn-primary" onClick={saveForm} disabled={saving}>
                        {saving ? 'Sychronizing...' : 'Save Changes'}
                    </button>
                </div>
            </nav>

            <div className="container" style={{ maxWidth: '720px', marginTop: '3rem' }}>
                {/* Form Header Section */}
                <div className="vellum-card" style={{ borderTop: '8px solid hsl(var(--v-primary))', padding: '0' }}>
                    <div style={{ padding: '2.5rem' }}>
                        <input
                            className="vellum-input"
                            style={{ fontSize: '2rem', fontWeight: '700', border: 'none', padding: '0', marginBottom: '1rem', background: 'transparent' }}
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Form Title"
                        />
                        <textarea
                            className="vellum-input"
                            style={{ border: 'none', padding: '0', background: 'transparent', resize: 'none', minHeight: '60px', color: 'hsl(var(--v-text-muted))' }}
                            placeholder="Add a refined description for your respondents..."
                            value={form.description || ''}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                    </div>
                </div>

                {form.questions.map((q) => (
                    <div
                        key={q.id}
                        className="vellum-card fade-in"
                        style={{
                            borderLeft: activeQuestion === q.id ? '4px solid hsl(var(--v-primary))' : '1px solid hsl(var(--v-border))',
                            padding: activeQuestion === q.id ? '2.5rem' : '1.5rem',
                            background: activeQuestion === q.id ? 'hsl(var(--v-surface-raised))' : 'hsl(var(--v-surface) / 0.5)'
                        }}
                        onClick={() => setActiveQuestion(q.id)}
                    >
                        {activeQuestion === q.id ? (
                            <div className="flex-column" style={{ gap: '2rem' }}>
                                <div className="flex" style={{ gap: '1.5rem' }}>
                                    <input
                                        className="vellum-input"
                                        style={{ flex: 2, background: 'transparent' }}
                                        value={q.label}
                                        onChange={(e) => updateQuestion(q.id, { label: e.target.value })}
                                        placeholder="Enter your question"
                                    />
                                    <select
                                        className="vellum-input"
                                        style={{ flex: 1, background: 'hsl(var(--v-surface))' }}
                                        value={q.type}
                                        onChange={(e) => updateQuestion(q.id, { type: e.target.value })}
                                    >
                                        <option value="TEXT">Short Answer</option>
                                        <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                                        <option value="CHECKBOX">Checkboxes</option>
                                        <option value="DROPDOWN">Dropdown</option>
                                    </select>
                                </div>

                                {(q.type === 'MULTIPLE_CHOICE' || q.type === 'CHECKBOX' || q.type === 'DROPDOWN') && (
                                    <div className="flex-column" style={{ gap: '1rem', paddingLeft: '1rem' }}>
                                        {q.options.map((opt, idx) => (
                                            <div key={idx} className="flex" style={{ alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '12px', height: '12px', border: '2px solid hsl(var(--v-border))', borderRadius: q.type === 'CHECKBOX' ? '2px' : '50%' }}></div>
                                                <input
                                                    className="vellum-input"
                                                    style={{ border: 'none', borderBottom: '1px solid hsl(var(--v-border))', borderRadius: '0', padding: '0.5rem 0', background: 'transparent' }}
                                                    value={opt}
                                                    onChange={(e) => updateOption(q.id, idx, e.target.value)}
                                                />
                                                <button className="btn btn-ghost" style={{ padding: '0.5rem' }} onClick={() => removeOption(q.id, idx)}><X size={16} /></button>
                                            </div>
                                        ))}
                                        <button className="btn btn-ghost" style={{ justifyContent: 'flex-start', fontSize: '0.875rem', color: 'hsl(var(--v-primary))' }} onClick={() => addOption(q.id)}>+ Add option</button>
                                    </div>
                                )}

                                <div className="flex-between" style={{ borderTop: '1px solid hsl(var(--v-border))', paddingTop: '1.5rem' }}>
                                    <div className="flex" style={{ gap: '1.5rem' }}>
                                        <button className="btn btn-ghost" onClick={(e) => { e.stopPropagation(); deleteQuestion(q.id) }}><Trash2 size={20} /></button>
                                    </div>
                                    <div className="flex" style={{ alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Required</span>
                                        <input
                                            type="checkbox"
                                            style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'hsl(var(--v-primary))' }}
                                            checked={q.required}
                                            onChange={(e) => updateQuestion(q.id, { required: e.target.checked })}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div style={{ fontWeight: '600', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{q.label} {q.required && <span style={{ color: 'hsl(var(--v-primary))' }}>*</span>}</div>
                                <div style={{ color: 'hsl(var(--v-text-muted))', fontSize: '0.875rem', opacity: 0.6 }}>
                                    {q.type === 'TEXT' ? 'Short answer text' : `${q.options.length} options`}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                <div className="flex-center" style={{ marginTop: '2rem' }}>
                    <button className="btn btn-primary" onClick={addQuestion} style={{ borderRadius: '50px', padding: '1rem 2rem' }}>
                        <Plus size={20} /> Add Question
                    </button>
                </div>
            </div>

            {/* Floating Actions Bar */}
            <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="btn btn-primary" style={{ width: '60px', height: '60px', borderRadius: '50%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }} onClick={() => setShowSettings(true)}>
                    <Settings size={24} />
                </button>
            </div>

            {/* Modals */}
            {showSettings && (
                <div className="flex-center" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 2000 }} onClick={() => setShowSettings(false)}>
                    <div className="vellum-card fade-in" style={{ width: '400px', margin: 0, background: 'hsl(var(--v-surface-raised))' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Preferences</h2>
                        <div className="flex-column" style={{ gap: '1.5rem' }}>
                            <div className="flex-between">
                                <div className="flex" style={{ gap: '1rem' }}>
                                    {form.isPublic ? <Globe size={20} color="hsl(var(--v-primary))" /> : <Lock size={20} />}
                                    <div>
                                        <div style={{ fontWeight: '600' }}>Public Access</div>
                                        <div style={{ fontSize: '0.75rem', color: 'hsl(var(--v-text-muted))' }}>Allow anyone with the link to response</div>
                                    </div>
                                </div>
                                <input type="checkbox" checked={form.isPublic} onChange={e => setForm({ ...form, isPublic: e.target.checked })} style={{ accentColor: 'hsl(var(--v-primary))' }} />
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { saveForm(); setShowSettings(false); }}>Save Preferences</button>
                        </div>
                    </div>
                </div>
            )}

            {showShare && (
                <div className="flex-center" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 2000 }} onClick={() => setShowShare(false)}>
                    <div className="vellum-card fade-in" style={{ width: '500px', margin: 0, background: 'hsl(var(--v-surface-raised))' }} onClick={e => e.stopPropagation()}>
                        <div className="flex-between" style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>Share Vellum</h2>
                            <button className="btn btn-ghost" onClick={() => setShowShare(false)}><X size={20} /></button>
                        </div>
                        <div style={{ backgroundColor: 'hsl(var(--v-bg))', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--v-border))', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <code style={{ flex: 1, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', color: 'hsl(var(--v-text-main))' }}>{window.location.origin}/public/{id}</code>
                            <button className="btn btn-primary" onClick={copyLink}><Copy size={16} /> Copy</button>
                        </div>
                    </div>
                </div>
            )}

            {toast && (
                <div className="vellum-toast fade-in" style={{ borderColor: toast.type === 'error' ? '#ef4444' : 'hsl(var(--v-primary))' }}>
                    {toast.type === 'error' ? <AlertCircle size={18} color="#ef4444" /> : <CheckCircle size={18} color="hsl(var(--v-primary))" />}
                    {toast.msg}
                </div>
            )}
        </div>
    );
};

export default FormBuilder;
