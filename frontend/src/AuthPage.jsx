import React, { useState } from 'react';
import axios from 'react';
import { User, Lock, Mail, Phone, ShieldCheck, CheckCircle2, AlertCircle, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';
import './App.css';

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
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', background: '#0b0f19', overflow: 'hidden', fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      
      {/* 🔔 3D Slide-in Custom Toast System Notifications */}
      {toast.show && (
        <div style={{
          position: 'fixed', top: '25px', right: '25px',
          background: toast.type === 'success' ? '#065f46' : '#7f1d1d',
          color: '#fff', padding: '16px 24px', borderRadius: '16px',
          boxShadow: '0 15px 0px rgba(0,0,0,0.3), 0 25px 30px rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', gap: '14px', zIndex: 9999,
          border: `2px solid ${toast.type === 'success' ? '#10b981' : '#ef4444'}`,
          animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {toast.type === 'success' ? <CheckCircle2 size={22} style={{ color: '#34d399' }} /> : <AlertCircle size={22} style={{ color: '#f87171' }} />}
          <div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: '800', letterSpacing: '1.5px' }}>SYSTEM ALERT</div>
            <div style={{ fontSize: '14px', fontWeight: '600', marginTop: '2px' }}>{toast.message}</div>
          </div>
        </div>
      )}

      {/* 🔮 Background Deep Light Effects */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(0,0,0,0) 70%)', top: '-10%', left: '-5%', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(219,39,119,0.15) 0%, rgba(0,0,0,0) 70%)', bottom: '-10%', right: '-5%', pointerEvents: 'none' }}></div>

      {/* 💳 Soft 3D Heavy Glassmorphic Responsive Card */}
      <div style={{
        background: 'rgba(22, 30, 49, 0.75)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        padding: '40px 36px', borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        borderTop: '2px solid rgba(255, 255, 255, 0.15)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 12px 0px #060912, 0 30px 60px rgba(0, 0, 0, 0.6)',
        width: '100%', maxWidth: '460px', zIndex: 10, boxSizing: 'border-box',
        transform: 'translateY(-4px)'
      }}>
        
        {/* Top Floating 3D Icon Container */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '22px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', 
            padding: '16px', borderRadius: '22px', color: '#fff',
            borderTop: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 6px 0px #133285, 0 10px 20px rgba(37, 99, 235, 0.3)'
          }}>
            <ShieldCheck size={32} />
          </div>
        </div>

        <h2 style={{ textAlign: 'center', margin: '0 0 6px 0', color: '#ffffff', fontSize: '25px', fontWeight: '800', letterSpacing: '-0.5px' }}>HWOIP Workspace</h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '13px', margin: '0 0 32px 0', fontWeight: '500' }}>
          Healthcare Workforce Operations Platform
        </p>

        {/* 3D Modern Layered Segmented Control (Tabs) */}
        <div style={{ 
          display: 'flex', background: '#0f172a', padding: '6px', borderRadius: '18px', gap: '6px', marginBottom: '32px', 
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.03)' 
        }}>
          <button
            type="button"
            onClick={() => setViewMode('LOGIN')}
            style={{
              flex: 1, padding: '12px', cursor: 'pointer', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '13px',
              background: viewMode === 'LOGIN' ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' : 'transparent',
              color: viewMode === 'LOGIN' ? '#fff' : '#475569',
              boxShadow: viewMode === 'LOGIN' ? '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 0px rgba(255,255,255,0.1), 0 2px 0px rgba(255,255,255,0.05)' : 'none',
              borderTop: viewMode === 'LOGIN' ? '1px solid rgba(255,255,255,0.08)' : 'none',
              transform: viewMode === 'LOGIN' ? 'translateY(-1px)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <LogIn size={15} style={{ color: viewMode === 'LOGIN' ? '#3b82f6' : '#475569' }} /> Secure Sign In
            </div>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('REGISTER')}
            style={{
              flex: 1, padding: '12px', cursor: 'pointer', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '13px',
              background: viewMode === 'REGISTER' ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' : 'transparent',
              color: viewMode === 'REGISTER' ? '#fff' : '#475569',
              boxShadow: viewMode === 'REGISTER' ? '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 0px rgba(255,255,255,0.1), 0 2px 0px rgba(255,255,255,0.05)' : 'none',
              borderTop: viewMode === 'REGISTER' ? '1px solid rgba(255,255,255,0.08)' : 'none',
              transform: viewMode === 'REGISTER' ? 'translateY(-1px)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <UserPlus size={15} style={{ color: viewMode === 'REGISTER' ? '#10b981' : '#475569' }} /> Join Pipeline
            </div>
          </button>
        </div>

        {viewMode === 'LOGIN' ? (
          /* 🔒 LOGIN GATEWAY FORM */
          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '22px', position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.8px' }}>SYSTEM IDENTIFIER</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: '#475569', zIndex: 2 }} />
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  placeholder="Username or email address"
                  style={{ width: '100%', padding: '15px 15px 15px 48px', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '32px', position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.8px' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: '#475569', zIndex: 2 }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '15px 48px 15px 48px', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '16px', top: '15px', background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" style={{ 
              width: '100%', padding: '15px', borderRadius: '14px', border: 'none', 
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff', 
              fontWeight: '700', fontSize: '15px', cursor: 'pointer',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 5px 0px #1d4ed8, 0 8px 15px rgba(37, 99, 235, 0.3)'
            }}>
              Authorize & Verify Access Role
            </button>
          </form>
        ) : (
          /* 📝 CANDIDATE SIGNUP COMPONENT */
          <form onSubmit={handleRegisterSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>FULL NAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', top: '13px', color: '#475569', zIndex: 2 }} />
                  <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} required style={{ width: '100%', padding: '13px 14px 13px 42px', boxSizing: 'border-box', outline: 'none', fontSize: '13px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>CONTACT MOBILE</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '14px', top: '13px', color: '#475569', zIndex: 2 }} />
                  <input type="text" value={regMobile} onChange={(e) => setRegMobile(e.target.value)} required style={{ width: '100%', padding: '13px 14px 13px 42px', boxSizing: 'border-box', outline: 'none', fontSize: '13px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>SYSTEM USERNAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', top: '13px', color: '#475569', zIndex: 2 }} />
                  <input type="text" value={regUser} onChange={(e) => setRegUser(e.target.value)} required style={{ width: '100%', padding: '13px 14px 13px 42px', boxSizing: 'border-box', outline: 'none', fontSize: '13px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>EMAIL CORRESPONDENCE</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '14px', top: '13px', color: '#475569', zIndex: 2 }} />
                  <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required style={{ width: '100%', padding: '13px 14px 13px 42px', boxSizing: 'border-box', outline: 'none', fontSize: '13px' }} />
                </div>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>PORTAL ACCESS PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '14px', top: '13px', color: '#475569', zIndex: 2 }} />
                  <input type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} required style={{ width: '100%', padding: '13px 14px 13px 42px', boxSizing: 'border-box', outline: 'none', fontSize: '13px' }} />
                </div>
              </div>

              <button type="submit" style={{ 
                width: '100%', padding: '15px', borderRadius: '14px', border: 'none', 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', 
                fontWeight: '700', fontSize: '15px', cursor: 'pointer',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 5px 0px #047857, 0 8px 15 rgba(16, 185, 129, 0.25)'
              }}>
                Initialize Candidate Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}