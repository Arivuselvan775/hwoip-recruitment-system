import React, { useState } from 'react';
import axios from 'axios';

// Arivu-oda FastAPI server address
const API_BASE_URL = "http://127.0.0.1:8000/api/auth";

export default function AuthPage() {
  const [viewMode, setViewMode] = useState('LOGIN'); // 'LOGIN' or 'REGISTER'

  // 1. Pure Blank Login States (No dropdowns, no selectors, no pre-filled values)
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // 2. Candidate Signup States
  const [regUser, setRegUser] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');

  // 🚪 AUTOMATIC ROLE-DETECTING LOGIN LOGIC (Handles all 8 roles dynamically)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending request directly from React frontend UI form to Arivu's backend connection
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username_or_email: loginUsername,
        password: loginPassword
      });

      const user = response.data.user;

      // 🎉 NOTIFICATION POPUP - Displays exact dynamic role fetched directly from Ajay's database
      alert(`🔔 NOTIFICATION ALERT:\n-----------------------------------\n👤 User Account: ${user.username}\n🎯 Auto Detected Role: ${user.role}\n🟢 Platform Status: Authentication Verified Successfully!`);
      
      // Clear inputs after successful verification
      setLoginUsername('');
      setLoginPassword('');

    } catch (err) {
      // If user details or password hashes mismatch inside database system
      alert(err.response?.data?.detail || "🚨 Authentication Failed: Invalid Username or Password! Check your Database records.");
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
      
      alert("✅ Candidate Profile Registered Successfully! Dynamic account mapped into database. Please log in.");
      setViewMode('LOGIN'); // Auto-switch view back to login dashboard
      
      // Clear signup fields
      setRegUser(''); setRegEmail(''); setRegPass(''); setRegName(''); setRegMobile('');
    } catch (err) {
      alert(err.response?.data?.detail || "🚨 Candidate Registration Failed! Try changing inputs.");
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '60px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '12px', fontFamily: 'Segoe UI, sans-serif', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#111', marginBottom: '25px' }}>HWOIP Workspace Portal</h2>
      
      {/* Dynamic Navigation Toggles */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <button 
          type="button" 
          onClick={() => setViewMode('LOGIN')} 
          style={{ flex: 1, padding: '12px', cursor: 'pointer', background: viewMode === 'LOGIN' ? '#007bff' : '#f8f9fa', color: viewMode === 'LOGIN' ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Secure Portal Login
        </button>
        <button 
          type="button" 
          onClick={() => setViewMode('REGISTER')} 
          style={{ flex: 1, padding: '12px', cursor: 'pointer', background: viewMode === 'REGISTER' ? '#28a745' : '#f8f9fa', color: viewMode === 'REGISTER' ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Candidate Registration
        </button>
      </div>

      {viewMode === 'LOGIN' ? (
        /* 🔒 SINGLE COMMON CLEAN LOGIN FORM (NO ROLE SELECTOR) */
        <form onSubmit={handleLoginSubmit}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Sign In Gateway</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>Username / Email Address:</label>
            <input 
              type="text" 
              value={loginUsername} 
              onChange={(e) => setLoginUsername(e.target.value)} 
              required 
              placeholder="Enter your system identifier..."
              style={{ width: '95%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }} 
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>Password:</label>
            <input 
              type="password" 
              value={loginPassword} 
              onChange={(e) => setLoginPassword(e.target.value)} 
              required 
              placeholder="••••••••"
              style={{ width: '95%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }} 
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
            Authorize & Verify Role
          </button>
        </form>
      ) : (
        /* 📝 CANDIDATE SIGNUP FORM */
        <form onSubmit={handleRegisterSubmit}>
          <h3 style={{ marginTop: 0, color: '#28a745', marginBottom: '20px' }}>Candidate Profile Setup</h3>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Full Name:</label>
            <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} required style={{ width: '95%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Mobile Number:</label>
            <input type="text" value={regMobile} onChange={(e) => setRegMobile(e.target.value)} required style={{ width: '95%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Username:</label>
            <input type="text" value={regUser} onChange={(e) => setRegUser(e.target.value)} required style={{ width: '95%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Email ID:</label>
            <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required style={{ width: '95%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Password:</label>
            <input type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} required style={{ width: '95%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
            Register as Candidate
          </button>
        </form>
      )}
    </div>
  );
}