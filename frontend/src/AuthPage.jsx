import React, { useState } from 'react';
import axios from 'axios';
import { User, Lock, Mail, Phone, ShieldCheck, CheckCircle2, AlertCircle, Eye, EyeOff, UserPlus, LogIn, Sun, Moon } from 'lucide-react';
import './App.css';

const API_BASE_URL = "http://127.0.0.1:8000/api/auth";

export default function AuthPage() {
  const [viewMode, setViewMode] = useState('LOGIN'); // 'LOGIN' or 'REGISTER'
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // 💡 NEW: Theme Switch State

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

  // 🎨 Dynamic Colors Based on Theme State
  const colors = {
    bg: isDarkMode ? '#0f172a' : '#f8fafc',
    cardBg: isDarkMode ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.75)',
    border: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
    textMain: isDarkMode ? '#f8fafc' : '#0f172a',
    textMuted: isDarkMode ? '#94a3b8' : '#64748b',
    inputBg: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : '#ffffff',
    tabActive: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.05)',
  };

  return (
    <div style={{ 
      position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', 
      minHeight: '100vh', width: '100vw', background: colors.bg, overflow: 'hidden', 
      fontFamily: 'system-ui, sans-serif', padding: '20px', boxSizing: 'border-box',
      transition: 'background-color 0.3s ease'
    }}>
      
    

      {/* 🔔 Slide-in Custom Toast System Notifications */}
      {toast.show && (
        <div style={{
          position: 'fixed', top: '25px', right: '25px',
          background: toast.type === 'success' ? '#10b981' : '#ef4444',
          color: '#fff', padding: '16px 24px', borderRadius: '14px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          display: 'flex', alignItems: 'center', gap: '14px', zIndex: 9999,
          animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {toast.type === 'success' ? <CheckCircle2 size={22} style={{ color: '#fff' }} /> : <AlertCircle size={22} style={{ color: '#fff' }} />}
          <div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', fontWeight: '700', letterSpacing: '1px' }}>SYSTEM ALERT</div>
            <div style={{ fontSize: '14px', fontWeight: '500', marginTop: '2px' }}>{toast.message}</div>
          </div>
        </div>
      )}

      {/* 🔮 Aesthetic Gradient Backdrop Shapes (Dynamic opacity for light/dark) */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)', top: '-10%', left: '-5%', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(0,0,0,0) 70%)', bottom: '-10%', right: '-5%', pointerEvents: 'none' }}></div>

      {/* 💳 Sleek Flat Modern Card Hub */}
      <div style={{
        background: colors.cardBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        padding: '40px', borderRadius: '24px', 
        border: `1px solid ${colors.border}`,
        boxShadow: isDarkMode ? '0 25px 50px -12px rgba(0, 0, 0, 0.4)' : '0 25px 50px -12px rgba(15, 23, 42, 0.08)',
        width: '100%', maxWidth: '450px', zIndex: 10, boxSizing: 'border-box',
        transition: 'all 0.3s ease'
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', padding: '14px', borderRadius: '16px', color: '#fff' }}>
            <ShieldCheck size={30} />
          </div>
        </div>

        <h2 style={{ textAlign: 'center', margin: '0 0 6px 0', color: colors.textMain, fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px' }}>HWOIP Workspace</h2>
        <p style={{ textAlign: 'center', color: colors.textMuted, fontSize: '13px', margin: '0 0 32px 0', lineHeight: '1.4' }}>
          Healthcare Workforce Operations Platform
        </p>

        {/* Dynamic Navigation Toggles (Minimal Flat Segmented Tab) */}
        <div style={{ display: 'flex', background: isDarkMode ? '#0f172a' : '#f1f5f9', padding: '4px', borderRadius: '12px', gap: '4px', marginBottom: '32px' }}>
          <button
            type="button"
            onClick={() => setViewMode('LOGIN')}
            style={{
              flex: 1, padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px',
              background: viewMode === 'LOGIN' ? colors.inputBg : 'transparent',
              color: viewMode === 'LOGIN' ? colors.textMain : colors.textMuted,
              boxShadow: viewMode === 'LOGIN' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <LogIn size={14} /> Sign In
            </div>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('REGISTER')}
            style={{
              flex: 1, padding: '10px', cursor: 'pointer', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '13px',
              background: viewMode === 'REGISTER' ? colors.inputBg : 'transparent',
              color: viewMode === 'REGISTER' ? colors.textMain : colors.textMuted,
              boxShadow: viewMode === 'REGISTER' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <UserPlus size={14} /> Register
            </div>
          </button>
        </div>

        {viewMode === 'LOGIN' ? (
          /* 🔒 CLEAN ACCESS GATEWAY FORM */
          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '20px', position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', color: colors.textMuted, letterSpacing: '0.5px' }}>SYSTEM IDENTIFIER</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: colors.textMuted }} />
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  placeholder="Username or email..."
                  style={{ width: '100%', padding: '13px 14px 13px 42px', borderRadius: '10px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.textMain }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '28px', position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', color: colors.textMuted, letterSpacing: '0.5px' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: colors.textMuted }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '13px 42px 13px 42px', borderRadius: '10px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.textMain }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '13px', background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}>
              Authorize & Access Role
            </button>
          </form>
        ) : (
          /* 📝 CANDIDATE PIPELINE SIGNUP COMPONENT */
          <form onSubmit={handleRegisterSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '600', color: colors.textMuted }}>FULL NAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={15} style={{ position: 'absolute', left: '12px', top: '12px', color: colors.textMuted }} />
                  <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} required style={{ width: '100%', padding: '11px 12px 11px 36px', borderRadius: '8px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.textMain }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '600', color: colors.textMuted }}>CONTACT MOBILE</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} style={{ position: 'absolute', left: '12px', top: '12px', color: colors.textMuted }} />
                  <input type="number" value={regMobile} onChange={(e) => setRegMobile(e.target.value)} required style={{ width: '100%', padding: '11px 12px 11px 36px', borderRadius: '8px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.textMain }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '600', color: colors.textMuted }}>SYSTEM USERNAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={15} style={{ position: 'absolute', left: '12px', top: '12px', color: colors.textMuted }} />
                  <input type="text" value={regUser} onChange={(e) => setRegUser(e.target.value)} required style={{ width: '100%', padding: '11px 12px 11px 36px', borderRadius: '8px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.textMain }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '600', color: colors.textMuted }}>EMAIL CORRESPONDENCE</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: '12px', top: '12px', color: colors.textMuted }} />
                  <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required style={{ width: '100%', padding: '11px 12px 11px 36px', borderRadius: '8px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.textMain }} />
                </div>
              </div>

              <div style={{ marginBottom: '6px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '600', color: colors.textMuted }}>PORTAL ACCESS PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} style={{ position: 'absolute', left: '12px', top: '12px', color: colors.textMuted }} />
                  <input type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} required style={{ width: '100%', padding: '11px 12px 11px 36px', borderRadius: '8px', border: `1px solid ${colors.border}`, background: colors.inputBg, color: colors.textMain }} />
                </div>
              </div>

              <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' }}>
                Initialize Candidate Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}