import React, { useState } from 'react';
import axios from 'axios';
import { User, Lock, Mail, Phone, ShieldCheck, CheckCircle2, AlertCircle, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';

const API_BASE_URL = "http://127.0.0.1:8000/api/auth";

export default function AuthPage() {
  const [viewMode, setViewMode] = useState('LOGIN'); // 'LOGIN' or 'REGISTER'
  const [showPassword, setShowPassword] = useState(false);

  // 1. Pure Blank Login States 
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // 2. Candidate Signup States
  const [regUser, setRegUser] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');

  // 3. System Dynamic Notification Toasts State
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4500);
  };

  // 🚪 AUTOMATIC ROLE-DETECTING LOGIN LOGIC
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username_or_email: loginUsername,
        password: loginPassword
      });

      const user = response.data.user;
      
      // Dynamic Alert Popup replacing base system notifications
      triggerToast(`Successfully verified! Auto Detected Role: ${user.role}`, 'success');
      
      setLoginUsername('');
      setLoginPassword('');
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Authentication Failed: Invalid Record Coordinates!";
      triggerToast(errMsg, 'error');
    }
  };

  // 📝 STRICT CANDIDATE REGISTRATION HANDLER
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/register`, {
        username: regUser,
        email: regEmail,
        password: regPass,
        full_name: regName,
        mobile_number: regMobile
      });
      
      triggerToast("Candidate Profile Registered Successfully! Mapped into DB.", 'success');
      setViewMode('LOGIN');
      
      setRegUser(''); setRegEmail(''); setRegPass(''); setRegName(''); setRegMobile('');
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Candidate Registration Blocked! Check Input constraints.";
      triggerToast(errMsg, 'error');
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', background: '#0f172a', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* 🔔 Dynamic Slide-in Custom Toast System Notifications (FR-010 Integration) */}
      {toast.show && (
        <div style={{
          position: 'fixed', top: '25px', right: '25px',
          background: toast.type === 'success' ? '#065f46' : '#991b1b',
          color: '#fff', padding: '16px 24px', borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
          display: 'flex', alignItems: 'center', gap: '14px', zIndex: 9999,
          border: `1px solid ${toast.type === 'success' ? '#34d399' : '#f87171'}`,
          animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {toast.type === 'success' ? <CheckCircle2 size={22} style={{ color: '#34d399' }} /> : <AlertCircle size={22} style={{ color: '#f87171' }} />}
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: '700', letterSpacing: '1px' }}>SYSTEM ALERT</div>
            <div style={{ fontSize: '14px', fontWeight: '500', marginTop: '2px' }}>{toast.message}</div>
          </div>
        </div>
      )}

      {/* 🔮 Immersive Animated Fluid Blur Glow Shapes */}
      <div style={{ position: 'absolute', width: '450px', height: '450px', background: '#2563eb', borderRadius: '50%', filter: 'blur(120px)', top: '-10%', left: '-5%', opacity: 0.35 }}></div>
      <div style={{ position: 'absolute', width: '400px', height: '400px', background: '#db2777', borderRadius: '50%', filter: 'blur(120px)', bottom: '-10%', right: '-5%', opacity: 0.25 }}></div>

      {/* 💳 Glassmorphic Responsive Card Hub */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.45)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        padding: '40px', borderRadius: '28px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        width: '100%', maxWidth: '460px', border: '1px solid rgba(255, 255, 255, 0.08)', zIndex: 10, boxSizing: 'border-box'
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
          <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', padding: '14px', borderRadius: '18px', color: '#fff', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)' }}>
            <ShieldCheck size={32} />
          </div>
        </div>

        <h2 style={{ textAlign: 'center', margin: '0 0 6px 0', color: '#f8fafc', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>HWOIP Workspace</h2>
        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', margin: '0 0 32px 0', lineHeight: '1.4' }}>
          Healthcare Workforce Operations & Intelligence Platform
        </p>

        {/* Dynamic Navigation Toggles (Custom Modern Tabs Layout) */}
        <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.6)', padding: '6px', borderRadius: '14px', gap: '6px', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button
            type="button"
            onClick={() => setViewMode('LOGIN')}
            style={{
              flex: 1, padding: '12px', cursor: 'pointer', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '13px',
              background: viewMode === 'LOGIN' ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: viewMode === 'LOGIN' ? '#fff' : '#64748b', transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <LogIn size={15} /> Secure Sign In
            </div>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('REGISTER')}
            style={{
              flex: 1, padding: '12px', cursor: 'pointer', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '13px',
              background: viewMode === 'REGISTER' ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: viewMode === 'REGISTER' ? '#fff' : '#64748b', transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <UserPlus size={15} /> Join Candidate Pipeline
            </div>
          </button>
        </div>

        {viewMode === 'LOGIN' ? (
          /* 🔒 CLEAN AUTO ROLE DETECTING SIGN IN GATEWAY */
          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '20px', position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', letterSpacing: '0.5px' }}>SYSTEM IDENTIFIER (USERNAME / EMAIL)</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#475569' }} />
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  placeholder="Enter system username or email..."
                  style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', boxSizing: 'border-box', outline: 'none', background: 'rgba(15, 23, 42, 0.4)', color: '#fff', fontSize: '14px', transition: 'all 0.2s' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '28px', position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', letterSpacing: '0.5px' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#475569' }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '14px 44px 14px 44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', boxSizing: 'border-box', outline: 'none', background: 'rgba(15, 23, 42, 0.4)', color: '#fff', fontSize: '14px', transition: 'all 0.2s' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '14px', background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff', fontWeight: '600', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.25)', transition: 'all 0.2s' }}>
              Authorize & Verify Access Role
            </button>
          </form>
        ) : (
          /* 📝 CANDIDATE PIPELINE SIGNUP COMPONENT */
          <form onSubmit={handleRegisterSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', color: '#94a3b8' }}>FULL NAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#475569' }} />
                  <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} required style={{ width: '100%', padding: '11px 12px 11px 38px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', boxSizing: 'border-box', background: 'rgba(15, 23, 42, 0.4)', color: '#fff', fontSize: '13px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', color: '#94a3b8' }}>CONTACT MOBILE</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#475569' }} />
                  <input type="text" value={regMobile} onChange={(e) => setRegMobile(e.target.value)} required style={{ width: '100%', padding: '11px 12px 11px 38px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', boxSizing: 'border-box', background: 'rgba(15, 23, 42, 0.4)', color: '#fff', fontSize: '13px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', color: '#94a3b8' }}>SYSTEM USERNAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#475569' }} />
                  <input type="text" value={regUser} onChange={(e) => setRegUser(e.target.value)} required style={{ width: '100%', padding: '11px 12px 11px 38px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', boxSizing: 'border-box', background: 'rgba(15, 23, 42, 0.4)', color: '#fff', fontSize: '13px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', color: '#94a3b8' }}>EMAIL CORRESPONDENCE</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#475569' }} />
                  <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required style={{ width: '100%', padding: '11px 12px 11px 38px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', boxSizing: 'border-box', background: 'rgba(15, 23, 42, 0.4)', color: '#fff', fontSize: '13px' }} />
                </div>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', color: '#94a3b8' }}>PORTAL ACCESS PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#475569' }} />
                  <input type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} required style={{ width: '100%', padding: '11px 12px 11px 38px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', boxSizing: 'border-box', background: 'rgba(15, 23, 42, 0.4)', color: '#fff', fontSize: '13px' }} />
                </div>
              </div>

              <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', fontWeight: '600', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.25)' }}>
                Initialize Candidate Profile
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Embedded Animations Layout Config */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        input:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }
      `}</style>
    </div>
  );
}