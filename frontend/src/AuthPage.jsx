import React, { useState } from 'react';
import axios from 'axios';

// Arivu run panra FastAPI backend URL string
const API_BASE_URL = "http://127.0.0.1:8000/api/auth";

export default function AuthPage() {
  // Main view toggler: 'LOGIN' illa 'REGISTER'
  const [viewMode, setViewMode] = useState('LOGIN');
  
  // 7 Internal Corporate Roles + 1 Candidate = Total 8 Roles selector
  const [selectedRole, setSelectedRole] = useState('DELIVERY_HEAD');

  // 1. Core Login Inputs (No pre-filled fields or visible mock hints)
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // 2. Candidate Registration Inputs (Strictly only for Candidates)
  const [regUser, setRegUser] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');

  // 🚪 UNIVERSAL LOGIN HANDLER WITH ROLE COMPLIANCE CHECK
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username_or_email: loginUsername,
        password: loginPassword
      });

      const user = response.data.user;

      // ⚠️ ROLE VALIDATION MATCH CHECK:
      // User select panna Tab-um database-la avangaluku irukra Role-um correct-ah match aaganum
      if (user.role !== selectedRole) {
        alert(`🚨 Login Failed: Intha credentials '${selectedRole}' role-ku uriyathu illai! Unga correct role tab-a click panni login pannunga.`);
        return;
      }

      // 🎉 SUCCESS ROLE DETECTION NOTIFICATION:
      alert(`🔔 SUCCESSFUL NOTIFICATION:\n-----------------------------------\n👤 User: ${user.username}\n🎯 Detected Role: ${user.role}\n🟢 Access Status: Granted to Workspace!`);
      
    } catch (err) {
      alert(err.response?.data?.detail || "🚨 Login Failed: Invalid Username or Password! Database variables check pannunga.");
    }
  };

  // 📝 CANDIDATE SIGNUP HANDLER
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
      
      alert("✅ Candidate Profile Registered Successfully! Ippo Portal Login tab-la poyi login pannalam.");
      setViewMode('LOGIN');
      setSelectedRole('CANDIDATE'); // Auto shift to candidate view
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed! Inputs check pannunga.");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '12px', fontFamily: 'sans-serif', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#111', marginBottom: '20px' }}>HWOIP Corporate Platform</h2>
      
      {/* SECTION 1: SYSTEM VIEW TOGGLE (LOGIN VS REGISTER) */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
        <button 
          type="button" 
          onClick={() => { setViewMode('LOGIN'); }} 
          style={{ flex: 1, padding: '12px', cursor: 'pointer', background: viewMode === 'LOGIN' ? '#007bff' : '#f8f9fa', color: viewMode === 'LOGIN' ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Portal Login Dashboard
        </button>
        <button 
          type="button" 
          onClick={() => { setViewMode('REGISTER'); }} 
          style={{ flex: 1, padding: '12px', cursor: 'pointer', background: viewMode === 'REGISTER' ? '#28a745' : '#f8f9fa', color: viewMode === 'REGISTER' ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Candidate Registration Page
        </button>
      </div>

      {viewMode === 'LOGIN' ? (
        <div>
          {/* SECTION 2: SEPARATE INDIVIDUAL LOGIN TABS FOR EVERY ROLE */}
          <h4 style={{ marginBottom: '8px', color: '#555' }}>Select Your Specific Corporate/User Role:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '25px' }}>
            {[
              'DELIVERY_HEAD', 'HR_EXECUTIVE', 'HR_MANAGER', 
              'OPERATIONS_MANAGER', 'TRAINER', 'MANAGEMENT', 
              'SYSTEM_ADMINISTRATOR', 'CANDIDATE'
            ].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  setSelectedRole(role);
                  setLoginUsername('');
                  setLoginPassword('');
                }}
                style={{
                  padding: '10px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: selectedRole === role ? '#343a40' : '#ffffff',
                  color: selectedRole === role ? '#ffffff' : '#333',
                  textAlign: 'center'
                }}
              >
                💼 {role.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* SECTION 3: STRICT CLEAN LOGIN FORM (NO INFIELD MOCK VALUES) */}
          <form onSubmit={handleLoginSubmit} style={{ border: '1px dashed #bbb', padding: '20px', borderRadius: '8px', backgroundColor: '#fafafa' }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
              Secure Gateway: <span style={{ color: '#007bff' }}>{selectedRole.replace('_', ' ')}</span>
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Username / Email Account:</label>
              <input 
                type="text" 
                value={loginUsername} 
                onChange={(e) => setLoginUsername(e.target.value)} 
                required 
                placeholder={`Enter ${selectedRole.toLowerCase()} username`}
                style={{ width: '95%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} 
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' }}>Password:</label>
              <input 
                type="password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
                required 
                placeholder="••••••••"
                style={{ width: '95%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} 
              />
            </div>

            <button type="submit" style={{ width: '100%', padding: '12px', background: '#343a40', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
              Verify & Enter Workspace
            </button>
          </form>
        </div>
      ) : (
        /* SECTION 4: CANDIDATE SIGNUP FORM */
        <form onSubmit={handleRegisterSubmit} style={{ border: '1px dashed #28a745', padding: '20px', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <h3 style={{ marginTop: 0, color: '#28a745', marginBottom: '15px' }}>Candidate Profile Registration</h3>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Full Name:</label>
            <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} required style={{ width: '95%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Mobile Number:</label>
            <input type="text" value={regMobile} onChange={(e) => setRegMobile(e.target.value)} required style={{ width: '95%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Desired Username:</label>
            <input type="text" value={regUser} onChange={(e) => setRegUser(e.target.value)} required style={{ width: '95%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Email Address:</label>
            <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required style={{ width: '95%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Password:</label>
            <input type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} required style={{ width: '95%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
            Create My Candidate Account
          </button>
        </form>
      )}
    </div>
  );
}