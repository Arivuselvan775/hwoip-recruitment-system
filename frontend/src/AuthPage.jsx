import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/api/auth";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  
  // 1. Login Form States
  const [loginInput, setLoginInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Login aanathukku apram user info-va store panna puthu state
  const [loggedInUser, setLoggedInUser] = useState(null);

  // 2. Candidate Registration States (Only for Candidate)
  const [regUser, setRegUser] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');

  // LOGIN PROCESS (Handles all 8 roles automatically)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username_or_email: loginInput,
        password: loginPassword
      });
      
      // Backend send panra user details (username, role) ah state la save panroom
      setLoggedInUser(response.data.user);
      alert("Login Successful!");
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed! Input data-va check pannunga.");
    }
  };

  // REGISTER PROCESS (Strictly only for Candidate role)
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/register`, {
        username: regUser,
        email: regEmail,
        password: regPass,
        full_name: regName,
        mobile_number: regMobile
      });
      
      alert("Candidate Profile Registered Successfully! Ippo niga login pannalam.");
      setIsLogin(true); // Auto switch to login tab
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed!");
    }
  };

  // LOGOUT PROCESS
  const handleLogout = () => {
    setLoggedInUser(null);
    setLoginInput('');
    setLoginPassword('');
  };

  // 🚪 USER SUCCESSFULLY LOGGED IN: SHOW SEPARATE ROLE VIEWS
  if (loggedInUser) {
    return (
      <div style={{ maxWidth: '500px', margin: '50px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '12px', fontFamily: 'sans-serif', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#007bff' }}>HWOIP Workspace Portal</h2>
        <p>Welcome back, <strong>{loggedInUser.username}</strong>!</p>
        
        {/* 🌟 ROLE BASED CONDITIONAL RENDERING SCREEN */}
        <div style={{ padding: '20px', background: '#f1f3f5', borderRadius: '8px', margin: '20px 0', borderLeft: '5px solid #007bff' }}>
          {loggedInUser.role === 'CANDIDATE' && (
            <div>
              <h3 style={{ color: '#28a745' }}>🎯 Candidate Dashboard</h3>
              <p>Unga profile active-ah iruku. HR selection process updates-a inga paarkalam.</p>
            </div>
          )}
          {loggedInUser.role === 'DELIVERY_HEAD' && (
            <div>
              <h3>📋 Delivery Head Management Panel</h3>
              <p>New Manpower Requisitions-a create and approve panna intha panel-a use pannunga.</p>
            </div>
          )}
          {loggedInUser.role === 'HR_EXECUTIVE' && (
            <div>
              <h3>💼 HR Executive Dashboard</h3>
              <p>Candidates schedules tracking matrum screening processes assigned views.</p>
            </div>
          )}
          {loggedInUser.role === 'HR_MANAGER' && (
            <div>
              <h3>👑 HR Manager Control Room</h3>
              <p>Interviews workflows validation matrum offer deployment tracking operations.</p>
            </div>
          )}
          {loggedInUser.role === 'OPERATIONS_MANAGER' && (
            <div>
              <h3>⚙️ Operations Panel</h3>
              <p>Technical evaluation feedback matrum operational loops status review screen.</p>
            </div>
          )}
          {loggedInUser.role === 'TRAINER' && (
            <div>
              <h3>📚 Trainer Assessment Suite</h3>
              <p>Incoming candidates skills training tracking and evaluations panel.</p>
            </div>
          )}
          {loggedInUser.role === 'MANAGEMENT' && (
            <div>
              <h3>📊 Executive Management View</h3>
              <p>High-level recruitment analytics reports and final financial approvals.</p>
            </div>
          )}
          {loggedInUser.role === 'SYSTEM_ADMINISTRATOR' && (
            <div>
              <h3>🔒 System Admin Control Center</h3>
              <p>Platform system settings logs and security roles override configurations.</p>
            </div>
          )}
        </div>

        <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Logout / Exit Portal
        </button>
      </div>
    );
  }

  // 📝 USER IS NOT LOGGED IN: SHOW LOGIN/REGISTER TABS
  return (
    <div style={{ maxWidth: '420px', margin: '60px auto', padding: '30px', border: '1px solid #e0e0e0', borderRadius: '12px', fontFamily: 'Segoe UI, sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#1a1a1a', marginBottom: '25px' }}>HWOIP Recruitment Platform</h2>
      
      {/* Tab Selectors */}
      <div style={{ display: 'flex', marginBottom: '25px', gap: '10px' }}>
        <button 
          type="button"
          onClick={() => setIsLogin(true)} 
          style={{ flex: 1, padding: '10px', cursor: 'pointer', backgroundColor: isLogin ? '#007bff' : '#f8f9fa', color: isLogin ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Portal Login
        </button>
        <button 
          type="button"
          onClick={() => setIsLogin(false)} 
          style={{ flex: 1, padding: '10px', cursor: 'pointer', backgroundColor: !isLogin ? '#28a745' : '#f8f9fa', color: !isLogin ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Candidate Registration
        </button>
      </div>

      {isLogin ? (
        /* LOGIN SYSTEM FOR ALL 8 ROLES */
        <form onSubmit={handleLogin}>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>Sign In</h3>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Username or Email Address:</label>
            <input type="text" value={loginInput} onChange={(e) => setLoginInput(e.target.value)} required style={{ width: '94%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password:</label>
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required style={{ width: '94%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Secure Login</button>
        </form>
      ) : (
        /* STRICT REGISTER SYSTEM - ONLY FOR CANDIDATES */
        <form onSubmit={handleRegister}>
          <h3 style={{ marginBottom: '15px', color: '#28a745' }}>Create Candidate Account</h3>
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
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Secure Password:</label>
            <input type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} required style={{ width: '94%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Register Profile</button>
        </form>
      )}
    </div>
  );
}