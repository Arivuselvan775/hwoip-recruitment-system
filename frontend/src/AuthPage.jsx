import React, { useState } from 'react';
import axios from 'axios';

// Arivu run panra FastAPI oda URL string
const API_BASE_URL = "http://127.0.0.1:8000/api/auth";

export default function AuthPage() {
  // Login tab illa Register tab-nu pakura state toggler
  const [isLogin, setIsLogin] = useState(true);
  
  // 1. Login Form States
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // 2. Candidate Registration States (FR-003)
  const [regUser, setRegUser] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');

  // LOGIN CLICK FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Axios moolama Arivu-oda login API-ku data-va anupuroom
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username_or_email: loginInput,
        password: loginPassword
      });
      
      // Success response vantha user details-a alert-la katuroom
      alert(`Vandhanangal! Logged in successfully as ${response.data.user.role}!`);
      console.log("Logged In User Data:", response.data.user);
      
      // Solution Design step-ku intha role-a use panni thaan dashboard-ku route pannanum
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed! Please check values.");
    }
  };

  // REGISTER CLICK FUNCTION (Only for Candidate Role)
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Candidate field validation check
      const response = await axios.post(`${API_BASE_URL}/register`, {
        username: regUser,
        email: regEmail,
        password: regPass,
        full_name: regName,
        mobile_number: regMobile
      });
      
      alert("Registration Successful! Please login using your credentials.");
      setIsLogin(true); // Auto-ah login tab-ku switch pannidum
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed! Check data.");
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '60px auto', padding: '30px', border: '1px solid #e0e0e0', borderRadius: '12px', fontFamily: 'Segoe UI, sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#1a1a1a', marginBottom: '25px' }}>HWOIP Recruitment Platform</h2>
      
      {/* Navigation Buttons for Login/Register */}
      <div style={{ display: 'flex', marginBottom: '25px', gap: '10px' }}>
        <button 
          onClick={() => setIsLogin(true)} 
          style={{ flex: 1, padding: '10px', cursor: 'pointer', backgroundColor: isLogin ? '#007bff' : '#f8f9fa', color: isLogin ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Login
        </button>
        <button 
          onClick={() => setIsLogin(false)} 
          style={{ flex: 1, padding: '10px', cursor: 'pointer', backgroundColor: !isLogin ? '#28a745' : '#f8f9fa', color: !isLogin ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Candidate Join Us
        </button>
      </div>

      {isLogin ? (
        /* LOGIN UI - ACCEPTS ALL 8 ROLES */
        <form onSubmit={handleLogin}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>Sign In</h3>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Username or Email:</label>
            <input type="text" value={loginInput} onChange={(e) => setLoginInput(e.target.value)} required style={{ width: '94%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password:</label>
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required style={{ width: '94%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Login</button>
          
          <div style={{ marginTop: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '6px', fontSize: '12px', color: '#666' }}>
            <strong>💡 Ajay's Mock logins to test:</strong><br/>
            • HR Executive: <code>hr_exec1</code><br/>
            • Delivery Head: <code>delivery_boss</code><br/>
            • Password: <code>mock_password_123</code>
          </div>
        </form>
      ) : (
        /* CANDIDATE REGISTRATION UI - ONLY ALLOWS CANDIDATE ROLE */
        <form onSubmit={handleRegister}>
          <h3 style={{ marginBottom: '15px', color: '#28a745' }}>Create Candidate Profile</h3>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Full Name:</label>
            <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} required style={{ width: '94%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Mobile Number:</label>
            <input type="text" value={regMobile} onChange={(e) => setRegMobile(e.target.value)} required style={{ width: '94%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Desired Username:</label>
            <input type="text" value={regUser} onChange={(e) => setRegUser(e.target.value)} required style={{ width: '94%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Email Address:</label>
            <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required style={{ width: '94%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Set Password:</label>
            <input type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} required style={{ width: '94%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Register Profile</button>
        </form>
      )}
    </div>
  );
}