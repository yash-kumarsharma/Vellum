import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formService, responseService } from '../services/api';
import { Download, ArrowLeft, Calendar, User, Search, Filter, BarChart2 } from 'lucide-react';


const Responses = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(null);
    const [responses, setResponses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await formService.getOne(id);
                setForm(res.data);

                // Fetch Real Responses
                try {
                    // Use responseService instead of formService
                    const respRes = await responseService.list(id);
                    console.log("Fetched Responses:", respRes.data); // DEBUG
                    setResponses(respRes.data || []);
                } catch (rErr) {
                    console.error("Failed to fetch responses", rErr);
                    setResponses([]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleExportCSV = () => {
        if (!responses.length) return;

        // Create CSV Header
        const headers = ['Submission ID', 'Date', ...form.questions.map(q => q.label)];

        // Create CSV Rows
        const rows = responses.map(r => {
            const answerCells = form.questions.map(q => {
                // Real mapping: answers are stored as { [questionId]: answer }
                const ans = r.answers ? r.answers[q.id] : '';
                return ans ? `"${ans.toString().replace(/"/g, '""')}"` : '-';
            });
            // Use createdAt as the submission date
            return [r.id, new Date(r.createdAt).toLocaleDateString(), ...answerCells].join(',');
        });

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${form.title}_responses.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div className="flex-center" style={{ minHeight: '100vh', background: 'hsl(var(--v-bg))' }}>Loading Responses...</div>;

    return (
        <div className="flex-column" style={{ minHeight: '100vh', position: 'relative', background: 'hsl(var(--v-bg))' }}>
            {/* Background Orbs */}
            <div className="dashboard-background">
                <div className="dashboard-orb d-orb-1"></div>
                <div className="dashboard-orb d-orb-3"></div>
            </div>

            {/* Header */}
            <div className="vellum-glass" style={{
                height: '72px',
                borderBottom: '1px solid hsl(var(--v-border))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                position: 'fixed',
                top: 0, left: 0, right: 0,
                zIndex: 50
            }}>
                <div className="flex" style={{ alignItems: 'center', gap: '1rem' }}>
                    <button className="btn btn-ghost btn-icon" onClick={() => navigate(`/forms/${id}`)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{form?.title}</h1>
                        <span style={{ fontSize: '0.8rem', color: 'hsl(var(--v-text-muted))' }}>{responses.length} responses</span>
                    </div>
                </div>
                <div className="flex" style={{ gap: '1rem' }}>
                    <button
                        className="btn btn-ghost"
                        onClick={() => {
                            setLoading(true);
                            // re-trigger fetch somehow, or just reload page easiest for now, 
                            // but better is to extract fetch logic. 
                            // Since fetch is in useEffect[id], let's just use window.location.reload() for a hard refresh 
                            // OR better: extract fetchData outside.
                            window.location.reload();
                        }}
                        title="Refresh Data"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21h5v-5" /></svg>
                    </button>
                    <button className="btn btn-primary" onClick={handleExportCSV} style={{ boxShadow: '0 4px 12px hsl(var(--v-primary) / 0.3)' }}>
                        <Download size={18} style={{ marginRight: '0.5rem' }} /> Export to CSV
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="container" style={{ marginTop: '72px', paddingBottom: '4rem', maxWidth: '1200px', position: 'relative', zIndex: 10 }}>
                {/* Stats Cards (Mini) */}
                <div className="dashboard-stats-grid" style={{ marginBottom: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    <div className="vellum-card-premium" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '0.875rem', color: 'hsl(var(--v-text-muted))', marginBottom: '0.5rem' }}>Total Responses</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{responses.length}</div>
                    </div>
                    <div className="vellum-card-premium" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '0.875rem', color: 'hsl(var(--v-text-muted))', marginBottom: '0.5rem' }}>Completion Rate</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>100%</div>
                    </div>
                    <div className="vellum-card-premium" style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '0.875rem', color: 'hsl(var(--v-text-muted))', marginBottom: '0.5rem' }}>Avg. Time</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>2m 14s</div>
                    </div>
                </div>

                {/* Table */}
                <div className="vellum-card-premium" style={{ overflow: 'hidden', padding: 0 }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid hsl(var(--v-border))', display: 'flex', gap: '1rem' }}>
                        <div className="vellum-input" style={{ width: '300px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Search size={16} color="hsl(var(--v-text-muted))" />
                            <input type="text" placeholder="Search responses..." style={{ border: 'none', background: 'transparent', width: '100%' }} />
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ background: 'hsl(var(--v-surface-raised))', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem', fontWeight: 600, color: 'hsl(var(--v-text-muted))', width: '200px' }}>Date</th>
                                    {form?.questions.slice(0, 4).map((q, i) => (
                                        <th key={i} style={{ padding: '1rem', fontWeight: 600, color: 'hsl(var(--v-text-muted))' }}>{q.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {responses.map((r, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid hsl(var(--v-border))' }}>
                                        <td style={{ padding: '1rem', color: 'hsl(var(--v-text-muted))' }}>
                                            {new Date(r.createdAt).toLocaleString()}
                                        </td>
                                        {form?.questions.slice(0, 4).map((q, j) => {
                                            let answerVal = '-';
                                            if (r.answers) {
                                                // Handle if answers is a string (rare but possible if double stringified)
                                                const answersObj = typeof r.answers === 'string' ? JSON.parse(r.answers) : r.answers;
                                                const val = answersObj[q.id];
                                                if (val) {
                                                    answerVal = Array.isArray(val) ? val.join(', ') : val.toString();
                                                }
                                            }
                                            return (
                                                <td key={j} style={{ padding: '1rem' }}>
                                                    {answerVal}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Responses;
