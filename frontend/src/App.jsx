import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import FormBuilder from './pages/FormBuilder';
import PublicForm from './pages/PublicForm';
import Responses from './pages/Responses';
import { Menu, Search, MoreHorizontal, Plus, FileText, Layout, BarChart, Settings, Home, ArrowRight, CheckCircle, Sun, Moon, LogOut, User, X } from 'lucide-react';
import { formService } from './services/api';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}>Loading...</div>;
    return user ? children : <Navigate to="/landing" />;
};

const LandingPage = () => {
    const { isDarkMode, toggleTheme } = useAuth();
    return (
        <div className="fade-in" style={{ background: 'hsl(var(--v-bg))', minHeight: '100vh', color: 'hsl(var(--v-text-main))' }}>
            <nav className="vellum-nav vellum-glass">
                <div className="brand-text">Vellum</div>
                <div className="flex" style={{ gap: '1.5rem', alignItems: 'center' }}>
                    <button className="btn btn-ghost" onClick={toggleTheme} style={{ padding: '0.5rem' }}>
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <Link to="/login" className="btn btn-ghost">Sign in</Link>
                    <Link to="/register" className="btn btn-primary" style={{ borderRadius: '50px' }}>Join Vellum</Link>
                </div>
            </nav>

            <div className="container" style={{ textAlign: 'center', padding: '120px 1rem' }}>
                <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                    Craft beautiful forms, <br />
                    <span style={{ background: 'linear-gradient(to right, hsl(var(--v-primary)), #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>effortlessly.</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'hsl(var(--v-text-muted))', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                    Stop building generic surveys. Vellum provides a professional, minimalist studio for creators who value aesthetic and focus.
                </p>
                <div className="flex-center" style={{ gap: '1.5rem' }}>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '50px' }}>
                        Create your Vellum <ArrowRight size={20} />
                    </Link>
                </div>
            </div>

            <div className="container" id="features" style={{ padding: '80px 1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    <div className="vellum-card" style={{ border: 'none', background: 'hsl(var(--v-primary) / 0.03)' }}>
                        <div style={{ color: 'hsl(var(--v-primary))', marginBottom: '1.5rem' }}><Layout size={32} /></div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Zen Studio</h3>
                        <p style={{ color: 'hsl(var(--v-text-muted))', lineHeight: 1.5 }}>A distraction-free environment designed to help you craft the perfect questions.</p>
                    </div>
                    <div className="vellum-card" style={{ border: 'none', background: 'hsl(var(--v-primary) / 0.03)' }}>
                        <div style={{ color: 'hsl(var(--v-primary))', marginBottom: '1.5rem' }}><BarChart size={32} /></div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Deep Insights</h3>
                        <p style={{ color: 'hsl(var(--v-text-muted))', lineHeight: 1.5 }}>Real-time analytics and professional Excel exports at your fingertips.</p>
                    </div>
                    <div className="vellum-card" style={{ border: 'none', background: 'hsl(var(--v-primary) / 0.03)' }}>
                        <div style={{ color: 'hsl(var(--v-primary))', marginBottom: '1.5rem' }}><CheckCircle size={32} /></div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Premium Delivery</h3>
                        <p style={{ color: 'hsl(var(--v-text-muted))', lineHeight: 1.5 }}>High-conversion public forms that adapt beautifully to any device.</p>
                    </div>
                </div>
            </div>

            <footer style={{ borderTop: '1px solid hsl(var(--v-border))', padding: '5rem 0 3rem', marginTop: '4rem', background: 'hsl(var(--v-primary) / 0.02)' }}>
                <div className="container">
                    <div className="flex-between" style={{ alignItems: 'flex-start', marginBottom: '4rem' }}>
                        <div>
                            <div className="brand-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Vellum</div>
                            <p style={{ color: 'hsl(var(--v-text-muted))', maxWidth: '300px', lineHeight: 1.6 }}>Crafting beautiful interfaces for the modern web. Built with precision and a focus on clarity.</p>
                        </div>
                        <div className="flex" style={{ gap: '4rem' }}>
                            <div className="flex-column" style={{ gap: '1rem' }}>
                                <div style={{ fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product</div>
                                <Link to="/register" className="btn btn-ghost" style={{ padding: '0', height: 'auto', fontSize: '0.875rem' }}>Templates</Link>
                                <a href="#features" className="btn btn-ghost" style={{ padding: '0', height: 'auto', fontSize: '0.875rem' }}>Studio</a>
                            </div>
                            <div className="flex-column" style={{ gap: '1rem' }}>
                                <div style={{ fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</div>
                                <span style={{ fontSize: '0.875rem', color: 'hsl(var(--v-text-muted))' }}>About</span>
                                <span style={{ fontSize: '0.875rem', color: 'hsl(var(--v-text-muted))' }}>Contact</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid hsl(var(--v-border))', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'hsl(var(--v-text-muted))' }}>
                        <div>© 2026 Vellum Platform. All rights reserved.</div>
                        <div className="flex" style={{ gap: '2rem' }}>
                            <span>Privacy Policy</span>
                            <span>Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [toast, setToast] = useState(null);

    const notify = (msg, type = 'info') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    useEffect(() => {
        const handleSearch = (e) => setSearchTerm(e.detail);
        const handleNotify = (e) => notify(e.detail.msg, e.detail.type);
        window.addEventListener('vellum-search', handleSearch);
        window.addEventListener('vellum-notify', handleNotify);
        return () => {
            window.removeEventListener('vellum-search', handleSearch);
            window.removeEventListener('vellum-notify', handleNotify);
        };
    }, []);

    const templates = [
        { id: 't1', title: 'Customer Feedback', type: 'FEEDBACK', questions: [{ label: 'How would you rate our service?', type: 'MULTIPLE_CHOICE', options: ['Excellent', 'Good', 'Average', 'Poor'] }, { label: 'Any suggestions for improvement?', type: 'TEXT' }] },
        { id: 't2', title: 'Event Registration', type: 'EVENT', questions: [{ label: 'Full Name', type: 'TEXT', required: true }, { label: 'Email', type: 'TEXT', required: true }, { label: 'Dietary Requirements', type: 'TEXT' }] },
        { id: 't3', title: 'Product Market Fit', type: 'RESEARCH', questions: [{ label: 'How disappointed would you be if you could no longer use Vellum?', type: 'MULTIPLE_CHOICE', options: ['Very disappointed', 'Somewhat disappointed', 'Not disappointed'] }] }
    ];

    const fetchForms = async () => {
        try {
            const res = await formService.list();
            setForms(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const filteredForms = forms.filter(f =>
        f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchForms();
    }, []);

    const createFromTemplate = async (template) => {
        try {
            setLoading(true);
            const res = await formService.create({
                title: template.title,
                questions: template.questions
            });
            navigate(`/forms/${res.data.id}`);
        } catch (err) {
            console.error("Template creation failed:", err);
            setLoading(false);
        }
    };

    const createNewForm = async () => {
        try {
            const res = await formService.create({ title: 'Untitled Vellum' });
            navigate(`/forms/${res.data.id}`);
        } catch (err) {
            console.error("Failed to create new form:", err);
        }
    };

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            await formService.delete(deletingId);
            fetchForms();
            setShowDeleteModal(false);
            setDeletingId(null);
        } catch (err) {
            notify('Vellum: Protection script blocked the deletion.', 'error');
        }
    };

    if (loading && forms.length === 0) {
        return (
            <div className="container fade-in">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', opacity: 0.5 }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} className="vellum-card" style={{ height: '240px', background: 'hsl(var(--v-primary) / 0.05)', borderStyle: 'dashed' }}></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container fade-in" style={{ paddingBottom: '5rem' }}>
            <div className="flex-between" style={{ marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem', fontSize: '2.5rem' }}>Welcome, {user?.name.split(' ')[0]}</h1>
                    <p style={{ color: 'hsl(var(--v-text-muted))', fontSize: '1.1rem' }}>You have {forms.length} active Vellums.</p>
                </div>
                <button className="btn btn-primary" onClick={createNewForm} style={{ padding: '1rem 2rem', borderRadius: '50px' }}>
                    <Plus size={20} /> Create New Vellum
                </button>
            </div>

            <section style={{ marginBottom: '4rem' }}>
                <h3 style={{ fontSize: '0.925rem', color: 'hsl(var(--v-text-muted))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>Quick Templates</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                    {templates.map(t => (
                        <div key={t.id} className="vellum-card vellum-glass" style={{ padding: '1.5rem', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid hsl(var(--v-primary) / 0.1)' }} onClick={() => createFromTemplate(t)}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'hsl(var(--v-primary) / 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'hsl(var(--v-primary))' }}>
                                <FileText size={20} />
                            </div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{t.title}</div>
                            <div style={{ fontSize: '0.825rem', color: 'hsl(var(--v-text-muted))' }}>{t.questions.length} sections</div>
                        </div>
                    ))}
                </div>
            </section>

            <h3 style={{ fontSize: '0.925rem', color: 'hsl(var(--v-text-muted))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
                {searchTerm ? `Search Results for "${searchTerm}"` : 'Your Vellums'}
            </h3>
            {filteredForms.length === 0 ? (
                <div className="vellum-card flex-center flex-column" style={{ padding: '6rem 2rem', textAlign: 'center', background: 'transparent', borderStyle: 'dashed', borderColor: 'hsl(var(--v-border))' }}>
                    <Layout size={48} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
                    <h3>{searchTerm ? 'No Vellums match your search.' : 'Your studio is empty.'}</h3>
                    <p style={{ color: 'hsl(var(--v-text-muted))', marginTop: '0.5rem', marginBottom: '2rem' }}>
                        {searchTerm ? 'Try a different keyword or create a new Vellum.' : 'Start your next masterpiece by creating your first Vellum.'}
                    </p>
                    <button className="btn btn-primary" onClick={createNewForm}>Get Started</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {filteredForms.map((f) => (
                        <Link to={`/forms/${f.id}`} key={f.id} className="vellum-card fade-in" style={{ padding: '0', overflow: 'hidden', display: 'block' }}>
                            <div style={{ height: '140px', background: `linear-gradient(135deg, hsl(var(--v-primary) / 0.1), hsl(var(--v-primary) / 0.05))`, position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'hsl(var(--v-surface))', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '600', color: f.isPublic ? 'hsl(var(--v-primary))' : 'hsl(var(--v-text-muted))', border: '1px solid hsl(var(--v-border))' }}>
                                    {f.isPublic ? 'Live' : 'Private'}
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '600' }}>{f.title}</h3>
                                <div className="flex-between" style={{ marginTop: '1.5rem' }}>
                                    <div className="flex" style={{ gap: '0.5rem', color: 'hsl(var(--v-text-muted))', fontSize: '0.875rem' }}>
                                        <BarChart size={16} /> {f._count?.responses || 0} responses
                                    </div>
                                    <div
                                        className="btn btn-ghost"
                                        style={{ padding: '0.5rem', color: '#ef4444', position: 'relative', zIndex: 10 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setDeletingId(f.id);
                                            setShowDeleteModal(true);
                                        }}
                                        title="Delete Vellum"
                                    >
                                        <LogOut size={16} style={{ transform: 'rotate(180deg)' }} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Delete Vellum?</h2>
                        <p style={{ marginBottom: '2rem' }}>This action is permanent and will securely erase all questions and collected responses from the Vellum vault.</p>
                        <div className="flex" style={{ gap: '1rem', justifyContent: 'flex-end' }}>
                            <button className="btn btn-ghost" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="btn btn-primary" style={{ background: '#ef4444' }} onClick={handleDelete}>Delete Permanently</button>
                        </div>
                    </div>
                </div>
            )}

            {toast && (
                <div className="vellum-toast fade-in" style={{ borderColor: toast.type === 'error' ? '#ef4444' : 'hsl(var(--v-primary))' }}>
                    {toast.type === 'error' ? <LogOut size={18} style={{ transform: 'rotate(180deg)', color: '#ef4444' }} /> : <CheckCircle size={18} color="hsl(var(--v-primary))" />}
                    {toast.msg}
                </div>
            )}
        </div>
    );
};

const AppHeader = () => {
    const { user, logout, isDarkMode, toggleTheme } = useAuth();
    const [showProfile, setShowProfile] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
            <nav className="vellum-nav vellum-glass" style={{ marginBottom: '2rem' }}>
                <div className="flex" style={{ alignItems: 'center', gap: '1.5rem' }}>
                    <Link to="/" className="brand-text" style={{ fontSize: '1.5rem', textDecoration: 'none' }}>Vellum</Link>
                    <div className="flex" style={{ borderLeft: '1px solid hsl(var(--v-border))', paddingLeft: '1.5rem', marginLeft: '0.5rem', gap: '1rem' }}>
                        <Link to="/" className="btn btn-ghost" style={{ fontSize: '0.875rem' }}><Home size={18} /> Studio</Link>
                    </div>
                </div>

                <div className="flex" style={{ alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                        <input
                            className="vellum-input"
                            placeholder="Search Vellums..."
                            style={{ padding: '0.4rem 1rem 0.4rem 2.5rem', width: '240px', fontSize: '0.875rem', height: '36px' }}
                            onChange={(e) => window.dispatchEvent(new CustomEvent('vellum-search', { detail: e.target.value }))}
                        />
                    </div>

                    <button className="btn btn-ghost" onClick={toggleTheme} title="Toggle Theme" style={{ padding: '0.5rem' }}>
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <div style={{ position: 'relative' }}>
                        <div
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: JSON.parse(localStorage.getItem('vellum_avatar_pref'))?.color || 'hsl(var(--v-primary))',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.875rem'
                            }}
                            onClick={() => setShowProfile(!showProfile)}
                        >
                            {user?.name?.[0].toUpperCase() || 'U'}
                        </div>

                        {showProfile && (
                            <>
                                <div style={{ position: 'fixed', inset: 0, zIndex: 900 }} onClick={() => setShowProfile(false)}></div>
                                <div className="vellum-card fade-in" style={{ position: 'absolute', top: '120%', right: 0, width: '260px', padding: '0.5rem', zIndex: 1000, boxShadow: 'var(--shadow-lg)', background: 'hsl(var(--v-surface-raised))' }}>
                                    <div style={{ padding: '1rem', borderBottom: '1px solid hsl(var(--v-border))', marginBottom: '0.5rem' }}>
                                        <div style={{ fontWeight: '600', fontSize: '0.925rem' }}>{user?.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'hsl(var(--v-text-muted))', marginTop: '0.125rem' }}>{user?.email}</div>
                                    </div>
                                    <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem', fontSize: '0.875rem' }} onClick={() => { setShowSettings(true); setShowProfile(false); }}>
                                        <User size={16} style={{ marginRight: '0.75rem' }} /> View Profile
                                    </button>
                                    <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem', fontSize: '0.875rem' }} onClick={() => { setShowSettings(true); setShowProfile(false); }}>
                                        <Settings size={16} style={{ marginRight: '0.75rem' }} /> Settings
                                    </button>
                                    <div style={{ borderTop: '1px solid hsl(var(--v-border))', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                                        <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#ef4444' }} onClick={logout}>
                                            <LogOut size={16} style={{ marginRight: '0.75rem' }} /> Sign out
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {showSettings && (
                <div className="flex-center" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 2000 }} onClick={() => setShowSettings(false)}>
                    <div className="vellum-card fade-in" style={{ width: '450px', margin: 0, background: 'hsl(var(--v-surface-raised))' }} onClick={e => e.stopPropagation()}>
                        <div className="flex-between" style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>Account Settings</h2>
                            <button className="btn btn-ghost" onClick={() => setShowSettings(false)}><X size={20} /></button>
                        </div>

                        <div className="flex-column" style={{ gap: '2rem' }}>
                            <div className="flex-center flex-column" style={{ padding: '1rem' }}>
                                <div
                                    id="profile-avatar-preview"
                                    style={{ width: '80px', height: '80px', borderRadius: '50%', background: JSON.parse(localStorage.getItem('vellum_avatar_pref'))?.color || 'hsl(var(--v-primary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', boxShadow: '0 0 20px hsl(var(--v-primary) / 0.2)' }}
                                >
                                    {user?.name?.[0].toUpperCase()}
                                </div>
                                <div className="flex" style={{ gap: '0.75rem' }}>
                                    {['hsl(262, 80%, 52%)', 'hsl(215, 80%, 52%)', 'hsl(142, 70%, 45%)', 'hsl(346, 80%, 52%)', 'hsl(24, 90%, 50%)'].map(color => (
                                        <div
                                            key={color}
                                            className="avatar-color-swatch"
                                            style={{ width: '24px', height: '24px', borderRadius: '50%', background: color, cursor: 'pointer', border: '2px solid transparent' }}
                                            onClick={() => document.getElementById('profile-avatar-preview').style.background = color}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex-column" style={{ gap: '1.25rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'hsl(var(--v-text-muted))', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Full Name</label>
                                    <input id="profile-name-input" className="vellum-input" defaultValue={user?.name} style={{ background: 'hsl(var(--v-bg))' }} />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'hsl(var(--v-text-muted))', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Email Address</label>
                                    <input className="vellum-input" defaultValue={user?.email} disabled style={{ background: 'hsl(var(--v-bg))', opacity: 0.6 }} />
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid hsl(var(--v-border))', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button className="btn btn-ghost" onClick={() => setShowSettings(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={() => {
                                    const nameInput = document.getElementById('profile-name-input');
                                    const avatarPreview = document.getElementById('profile-avatar-preview');
                                    if (nameInput && avatarPreview) {
                                        const name = nameInput.value;
                                        const avatarColor = avatarPreview.style.background;
                                        localStorage.setItem('vellum_avatar_pref', JSON.stringify({ name, color: avatarColor }));
                                        window.dispatchEvent(new CustomEvent('vellum-notify', { detail: { msg: 'Vellum Profile synced. Updating studio...' } }));
                                        setShowSettings(false);
                                        setTimeout(() => window.location.reload(), 1500);
                                    }
                                }}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div style={{ minHeight: '100vh' }}>
                    <Routes>
                        <Route path="/landing" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/public/:id" element={<PublicForm />} />
                        <Route path="/forms/:id/responses" element={<PrivateRoute><Responses /></PrivateRoute>} />
                        <Route path="/forms/:id" element={<PrivateRoute><FormBuilder /></PrivateRoute>} />
                        <Route path="/" element={
                            <PrivateRoute>
                                <>
                                    <AppHeader />
                                    <Dashboard />
                                </>
                            </PrivateRoute>
                        } />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
