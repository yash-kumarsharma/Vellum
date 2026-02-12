import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { responseService, formService } from '../services/api';
import api from '../services/api';
import { Download, ArrowLeft, MessageSquare, Clock, User, Filter, Search } from 'lucide-react';

const Responses = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [formRes, respRes] = await Promise.all([
                    formService.getById(id),
                    responseService.list(id)
                ]);
                setForm(formRes.data);
                setResponses(respRes.data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchData();
    }, [id]);

    const handleExport = async () => {
        try {
            const res = await api.get(`/exports/${id}/excel`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${form.title}_responses.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert('Vellum: Failed to export Excel. Please try again.');
        }
    };

    const filteredResponses = responses.filter(resp =>
        Object.values(resp.answers || {}).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}>Aggregating Vellum insights...</div>;
    if (!form) return <div className="flex-center" style={{ minHeight: '100vh' }}>Form not found.</div>;

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
            <nav className="vellum-nav vellum-glass">
                <div className="flex" style={{ alignItems: 'center', gap: '1.5rem' }}>
                    <Link to={`/forms/${id}`} className="btn btn-ghost"><ArrowLeft size={20} /></Link>
                    <div className="brand-text" style={{ fontSize: '1.25rem' }}>{form.title} <span style={{ fontWeight: '400', color: 'hsl(var(--v-text-muted))', marginLeft: '0.5rem', fontSize: '1rem' }}>/ Insights</span></div>
                </div>
                <button className="btn btn-primary" onClick={handleExport}>
                    <Download size={18} /> Export Results
                </button>
            </nav>

            <div className="container" style={{ marginTop: '3rem' }}>
                <div className="flex-between" style={{ marginBottom: '3rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem' }}>{filteredResponses.length}</h2>
                        <p style={{ color: 'hsl(var(--v-text-muted))' }}>{responses.length === filteredResponses.length ? 'Total responses collected' : 'Matches found'}</p>
                    </div>
                    <div className="flex" style={{ gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--v-text-muted))' }} />
                            <input
                                className="vellum-input"
                                placeholder="Search in responses..."
                                style={{ padding: '0.5rem 1rem 0.5rem 3rem', width: '300px', fontSize: '0.875rem' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-outline"><Filter size={18} /> Filters</button>
                    </div>
                </div>

                {filteredResponses.length === 0 ? (
                    <div className="vellum-card flex-center flex-column" style={{ padding: '6rem 2rem', textAlign: 'center', background: 'transparent', borderStyle: 'dashed' }}>
                        <MessageSquare size={48} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
                        <h3>{responses.length === 0 ? 'The silence is golden.' : 'No matches found.'}</h3>
                        <p style={{ color: 'hsl(var(--v-text-muted))', marginTop: '0.5rem' }}>
                            {responses.length === 0 ? 'Start sharing your Vellum to see responses appear here in real-time.' : 'Try adjusting your search terms.'}
                        </p>
                    </div>
                ) : (
                    <div className="flex-column" style={{ gap: '2rem' }}>
                        {filteredResponses.map((resp, idx) => (
                            <div key={resp.id} className="vellum-card fade-in" style={{ padding: '2rem' }}>
                                <div className="flex-between" style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid hsl(var(--v-border))' }}>
                                    <div className="flex" style={{ gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'hsl(var(--v-primary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '700' }}>
                                            {responses.length - idx}
                                        </div>
                                        <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>Response #{responses.length - idx}</span>
                                    </div>
                                    <div className="flex" style={{ color: 'hsl(var(--v-text-muted))', fontSize: '0.75rem', gap: '0.5rem' }}>
                                        <Clock size={14} /> {new Date(resp.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <div className="flex-column" style={{ gap: '1.5rem' }}>
                                    {form.questions.map(q => (
                                        <div key={q.id}>
                                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'hsl(var(--v-text-muted))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{q.label}</div>
                                            <div style={{ fontSize: '1rem', color: 'hsl(var(--v-text-main))' }}>
                                                {resp.answers[q.id] ? (
                                                    Array.isArray(resp.answers[q.id]) ? resp.answers[q.id].join(', ') : resp.answers[q.id]
                                                ) : (
                                                    <span style={{ opacity: 0.3, fontStyle: 'italic' }}>No response provided</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Responses;
