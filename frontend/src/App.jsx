import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FormBuilder from './pages/FormBuilder';
import FormPreview from './pages/FormPreview';
import PublicForm from './pages/PublicForm';
import Responses from './pages/Responses';
import HomePage from './pages/HomePage';
import { Menu, Search, MoreHorizontal, Plus, FileText, Layout, BarChart, Settings, Home, ArrowRight, CheckCircle, Sun, Moon, LogOut, User, X } from 'lucide-react';
import { formService } from './services/api';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}>Loading...</div>;
    return user ? <Navigate to="/dashboard" /> : children;
};


const AppHeader = () => {
    const { user, logout, isDarkMode, toggleTheme } = useAuth();
    const [showProfile, setShowProfile] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
            <nav className="vellum-nav vellum-glass">
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
                        <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/public/:id" element={<PublicForm />} />
                        <Route path="/forms/:id/responses" element={<PrivateRoute><Responses /></PrivateRoute>} />
                        <Route path="/forms/:id/preview" element={<PrivateRoute><FormPreview /></PrivateRoute>} />
                        <Route path="/forms/:id" element={<PrivateRoute><FormBuilder /></PrivateRoute>} />
                        <Route path="/dashboard" element={
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
