import React from 'react';
import { Trash2, Copy, MoreVertical, Plus, X } from 'lucide-react';

const QuestionCard = ({ question, index, onUpdate, onDelete, onDuplicate }) => {
    const handleChange = (field, value) => {
        onUpdate(question.id, { ...question, [field]: value });
    };

    const handleOptionChange = (optIndex, value) => {
        const newOptions = [...(question.options || [])];
        newOptions[optIndex] = value;
        handleChange('options', newOptions);
    };

    const addOption = () => {
        handleChange('options', [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`]);
    };

    const removeOption = (optIndex) => {
        const newOptions = question.options.filter((_, i) => i !== optIndex);
        handleChange('options', newOptions);
    };

    const isChoiceType = ['MULTIPLE_CHOICE', 'CHECKBOX', 'DROPDOWN'].includes(question.type);

    return (
        <div className="vellum-card question-card-hover" style={{ padding: '2rem', marginBottom: '1.5rem', borderLeft: '4px solid hsl(var(--v-primary))', position: 'relative', transition: 'all 0.2s ease', boxShadow: 'var(--shadow-sm)' }}>
            {/* Header / Meta */}
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'hsl(var(--v-primary))', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'hsl(var(--v-primary) / 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                    Question {index + 1} • {question.type.replace('_', ' ')}
                </div>
                <div className="flex" style={{ gap: '0.5rem' }}>
                    <button className="btn btn-ghost btn-icon" onClick={() => onDuplicate(question)} title="Duplicate">
                        <Copy size={16} />
                    </button>
                    <button className="btn btn-ghost btn-icon" onClick={() => onDelete(question.id)} title="Delete" style={{ color: '#ef4444' }}>
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Question Label */}
            <div style={{ marginBottom: '1rem' }}>
                <input
                    className="vellum-input"
                    value={question.label}
                    onChange={(e) => handleChange('label', e.target.value)}
                    placeholder="Enter your question here..."
                    style={{ fontSize: '1.1rem', fontWeight: 500, padding: '0.75rem' }}
                    autoFocus
                />
            </div>

            {/* Options Editor (for choice types) */}
            {isChoiceType && (
                <div style={{ marginLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {question.options?.map((opt, i) => (
                        <div key={i} className="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: 16, height: 16, border: '2px solid hsl(var(--v-border))', borderRadius: question.type === 'MULTIPLE_CHOICE' ? '50%' : '4px' }}></div>
                            <input
                                className="vellum-input"
                                value={opt}
                                onChange={(e) => handleOptionChange(i, e.target.value)}
                                style={{ padding: '0.4rem', fontSize: '0.9rem', width: '100%' }}
                            />
                            <button className="btn btn-ghost btn-icon" onClick={() => removeOption(i)}>
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    <button className="btn btn-ghost" onClick={addOption} style={{ width: 'fit-content', fontSize: '0.85rem', color: 'hsl(var(--v-primary))', paddingLeft: 0 }}>
                        <Plus size={16} style={{ marginRight: '0.25rem' }} /> Add Option
                    </button>
                </div>
            )}

            {/* Footer / Settings */}
            <div className="flex-between" style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid hsl(var(--v-border))' }}>
                <label className="flex" style={{ alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                        type="checkbox"
                        checked={question.required || false}
                        onChange={(e) => handleChange('required', e.target.checked)}
                        style={{ accentColor: 'hsl(var(--v-primary))' }}
                    />
                    Required
                </label>
            </div>
        </div>
    );
};

export default QuestionCard;
