import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formService } from '../services/api';
import { Save, Eye, ArrowLeft, Plus, Type, List, CheckSquare, Calendar, ChevronDown, CheckCircle, Globe, Lock, Share2, Copy, BarChart2 } from 'lucide-react';
import QuestionCard from '../components/builder/QuestionCard';
import { motion } from 'framer-motion';

const QUESTION_TYPES = [
    { type: 'TEXT', label: 'Short Answer', icon: <Type size={18} /> },
    { type: 'MULTIPLE_CHOICE', label: 'Multiple Choice', icon: <List size={18} /> },
    { type: 'CHECKBOX', label: 'Checkboxes', icon: <CheckSquare size={18} /> },
    { type: 'DROPDOWN', label: 'Dropdown', icon: <ChevronDown size={18} /> },
    { type: 'DATE', label: 'Date', icon: <Calendar size={18} /> }
];

const FormBuilder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const res = await formService.getOne(id);
                setForm(res.data);
                setTitle(res.data.title);
                setDescription(res.data.description || '');
                setIsPublic(res.data.isPublic);
                setQuestions(res.data.questions || []);
            } catch (err) {
                console.error(err);
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchForm();
    }, [id, navigate]);

    const handleSave = async () => {
        try {
            setSaving(true);
            const updatedForm = {
                title,
                description,
                isPublic,
                questions: questions.map((q, index) => ({
                    ...q,
                    order: index // Ensure order is preserved
                }))
            };
            const res = await formService.update(id, updatedForm);
            setForm(res.data);
            showToast('Form saved successfully');
        } catch (err) {
            console.error("Failed to save", err);
            showToast('Failed to save', 'error');
        } finally {
            setSaving(false);
        }
    };

    const addQuestion = (type) => {
        const newQuestion = {
            id: `temp-${Date.now()}`, // Temporary ID
            type,
            label: '',
            required: false,
            options: ['Option 1']
        };
        setQuestions([...questions, newQuestion]);
        // Scroll to bottom logic could go here
    };

    const updateQuestion = (qId, updatedData) => {
        setQuestions(questions.map(q => q.id === qId ? updatedData : q));
    };

    const deleteQuestion = (qId) => {
        setQuestions(questions.filter(q => q.id !== qId));
    };

    const duplicateQuestion = (question) => {
        const newQuestion = {
            ...question,
            id: `temp-${Date.now()}`,
            label: `${question.label} (Copy)`
        };
        setQuestions([...questions, newQuestion]);
    };

    const handleShare = () => {
        setShowShareModal(true);
    };

    const copyLink = () => {
        const url = `${window.location.origin}/public/${id}`;
        navigator.clipboard.writeText(url);
        showToast('Link copied to clipboard!');
        setShowShareModal(false);
    };

    if (loading) return (
        <div className="flex-center" style={{ minHeight: '100vh', background: 'hsl(var(--v-bg))', color: 'hsl(var(--v-text-muted))' }}>
            <div className="spinner" style={{ width: 40, height: 40, border: '3px solid hsl(var(--v-border))', borderTopColor: 'hsl(var(--v-primary))', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        </div>
    );

    return (
        <div className="flex-column" style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Background Orbs */}
            <div className="dashboard-background">
                <div className="dashboard-orb d-orb-1"></div>
                <div className="dashboard-orb d-orb-2"></div>
            </div>
            {/* Builder Header */}
            <div className="vellum-glass" style={{
                height: '64px',
                borderBottom: '1px solid hsl(var(--v-border))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1.5rem',
                position: 'relative',
                zIndex: 50
            }}>
                <div className="flex" style={{ alignItems: 'center', gap: '1rem' }}>
                    <button className="btn btn-ghost btn-icon" onClick={() => navigate('/dashboard')}>
                        <ArrowLeft size={20} />
                    </button>
                    <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                        {title || 'Untitled Form'}
                    </span>
                </div>

                <div className="flex" style={{ gap: '0.75rem', alignItems: 'center' }}>
                    <div
                        className="flex"
                        style={{ alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: isPublic ? 'hsl(142 76% 36%)' : 'hsl(var(--v-text-muted))', fontWeight: 500, marginRight: '1rem', cursor: 'pointer' }}
                        onClick={() => setIsPublic(!isPublic)}
                        title="Toggle Public/Private"
                    >
                        {isPublic ? <Globe size={16} /> : <Lock size={16} />}
                        {isPublic ? 'Public' : 'Private'}
                    </div>
                    <button
                        className="btn btn-ghost"
                        onClick={() => navigate(`/forms/${id}/responses`)}
                        title="View Responses"
                    >
                        <BarChart2 size={18} style={{ marginRight: '0.5rem' }} /> Responses
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => window.open(`/public/${id}`, '_blank')}
                    >
                        <Eye size={18} style={{ marginRight: '0.5rem' }} /> Preview
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleShare}
                        title="Share Form"
                        style={{ background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none' }}
                    >
                        <Share2 size={18} style={{ marginRight: '0.5rem' }} /> Share
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : <><Save size={18} style={{ marginRight: '0.5rem' }} /> Save</>}
                    </button>
                </div>
            </div>

            {/* Builder Content */}
            <div className="flex" style={{ flex: 1, overflow: 'hidden' }}>
                {/* Tools Sidebar (Left) */}
                <div className="vellum-glass" style={{
                    width: '260px',
                    borderRight: '1px solid hsl(var(--v-border))',
                    padding: '1.5rem',
                    overflowY: 'auto',
                    zIndex: 40
                }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'hsl(var(--v-text-muted))', textTransform: 'uppercase', marginBottom: '1rem' }}>
                        Add Question
                    </h3>
                    <div className="flex-column" style={{ gap: '0.75rem' }}>
                        {QUESTION_TYPES.map(t => (
                            <button
                                key={t.type}
                                className="btn btn-ghost"
                                onClick={() => addQuestion(t.type)}
                                style={{ justifyContent: 'flex-start', background: 'hsl(var(--v-surface))', border: '1px solid hsl(var(--v-border))' }}
                            >
                                <span style={{ marginRight: '0.75rem', opacity: 0.7 }}>{t.icon}</span>
                                {t.label}
                                <Plus size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Canvas (Center) */}
                <div style={{ flex: 1, padding: '3rem', overflowY: 'auto', position: 'relative', zIndex: 10 }}>
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>

                        {/* Title & Description Card */}
                        <div className="vellum-card-premium" style={{
                            padding: '2rem',
                            marginBottom: '2rem',
                            borderTop: '4px solid hsl(var(--v-primary))'
                        }}>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Form Title"
                                style={{
                                    width: '100%',
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                    border: 'none',
                                    background: 'transparent',
                                    outline: 'none',
                                    marginBottom: '1rem',
                                    color: 'hsl(var(--v-text-main))'
                                }}
                            />
                            <textarea
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                                placeholder="Form Description"
                                style={{
                                    width: '100%',
                                    fontSize: '1rem',
                                    border: 'none',
                                    background: 'transparent',
                                    outline: 'none',
                                    resize: 'none',
                                    minHeight: '40px',
                                    color: 'hsl(var(--v-text-muted))',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        {questions.length === 0 ? (
                            <div className="empty-state" style={{ padding: '4rem', textAlign: 'center', border: '2px dashed hsl(var(--v-border))', borderRadius: 'var(--radius-lg)' }}>
                                <div style={{ marginBottom: '1rem', color: 'hsl(var(--v-text-muted))' }}>No questions yet</div>
                                <p>Click a question type from the sidebar to start building.</p>
                            </div>
                        ) : (
                            questions.map((q, i) => (
                                <QuestionCard
                                    key={q.id}
                                    index={i}
                                    question={q}
                                    onUpdate={updateQuestion}
                                    onDelete={deleteQuestion}
                                    onDuplicate={duplicateQuestion}
                                />
                            ))
                        )}
                        <div style={{ height: '100px' }}></div>
                    </div>
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div className="vellum-toast fade-in" style={{ borderColor: toast.type === 'error' ? '#ef4444' : 'hsl(var(--v-primary))', bottom: '2rem' }}>
                    {toast.type === 'error' ? <X size={18} /> : <CheckCircle size={18} color="hsl(var(--v-primary))" />}
                    {toast.msg}
                </div>
            )}
            {/* Share Modal */}
            {showShareModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="vellum-card-premium" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
                        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Share Form</h3>
                            <button className="btn btn-ghost btn-icon" onClick={() => setShowShareModal(false)}>
                                <span style={{ fontSize: '1.5rem' }}>&times;</span>
                            </button>
                        </div>
                        <p style={{ marginBottom: '1rem', color: 'hsl(var(--v-text-muted))' }}>
                            Share this link with others to start collecting responses.
                        </p>
                        <div className="flex" style={{ gap: '0.5rem' }}>
                            <input
                                type="text"
                                readOnly
                                value={`${window.location.origin}/public/${id}`}
                                className="vellum-input"
                                style={{ flex: 1, background: 'hsl(var(--v-bg))' }}
                            />
                            <button className="btn btn-primary" onClick={copyLink}>
                                <Copy size={18} style={{ marginRight: '0.5rem' }} /> Copy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormBuilder;
