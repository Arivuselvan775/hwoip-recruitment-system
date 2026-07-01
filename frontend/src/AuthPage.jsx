<<<<<<< HEAD
import React, { useState } from 'react';
import { LogIn, Briefcase, MapPin, DollarSign, Eye, EyeOff, ShieldCheck, Code, Layers } from 'lucide-react';
import CandidateApplyForm from './CandidateApplyForm'; // Ensure this file path is correct
import CandidateDashboard from './CandidateDashboard'; // Ensure this file path is correct

const MOCK_JOBS = [
  { id: 1, title: 'Full Stack Developer', dept: 'Engineering', exp: '1-3 Years', salary: '₹35,000 - ₹55,000', loc: 'Chennai, IN', type: 'Hybrid', skills: 'React, Node.js, JavaScript, Supabase', jd: 'We are looking for an elite full stack specialist to architect next-gen applications, web platforms, and operational developer pipelines.' },
  { id: 2, title: 'UI/UX Designer', dept: 'Product Design', exp: '1-2 Years', salary: '₹25,000 - ₹40,000', loc: 'Remote', type: 'Remote', skills: 'Figma, Glassmorphism Aesthetics, Minimalist UI', jd: 'Design advanced clean minimal system interfaces with high usability parameters, premium interactive screens, and web concepts.' }
];

export default function AuthPage() {
  // Navigation State Matrix
  const [currentView, setCurrentView] = useState('FEED_LOGIN'); // FEED_LOGIN | APPLY_FORM | DASHBOARD
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [sessionUser, setSessionUser] = useState(null);

  // Sign In Form States
  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [selectedRole, setSelectedRole] = useState('HR Manager');

  // Strict 7-Role configuration list (Candidate role totally removed)
  const AVAILABLE_ROLES = ['HR Manager', 'Operations Director', 'Intelligence Analyst', 'System Administrator', 'Recruiter', 'Finance Head', 'Executive Board'];

  const handleApplyClick = (jobTitle) => {
    setSelectedJobTitle(jobTitle);
    setCurrentView('APPLY_FORM'); // Safely triggers the Form View switcher node
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Simulate candidate login bypass for dashboard verification view
    setSessionUser({ name: emailOrUser, email: emailOrUser });
    setCurrentView('DASHBOARD');
  };

  // ROUTING RENDER VIEW SELECTION SWITCH
  if (currentView === 'APPLY_FORM') {
    return (
      <CandidateApplyForm 
        jobTitle={selectedJobTitle} 
        onBackToFeed={() => setCurrentView('FEED_LOGIN')} 
      />
    );
  }

  if (currentView === 'DASHBOARD') {
    return (
      <CandidateDashboard 
        user={sessionUser} 
        onLogout={() => {
          setSessionUser(null);
          setCurrentView('FEED_LOGIN');
        }} 
      />
    );
  }
=======
import React from 'react';
import { FaSignInAlt, FaBriefcase, FaDollarSign, FaMapMarkerAlt, FaClock, FaTools, FaArrowRight, FaLock, FaEnvelope } from 'react-icons/fa';
>>>>>>> d6a61e4 (17:49)

const AuthPage = ({ jobs, onApplyClick, authForm, onAuthChange, onSignIn, authError, successMessage, roleOptions }) => {
  return (
<<<<<<< HEAD
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: '#f8fafc', boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
      
      {/* LEFT SIDE: COMPANY INFO & JOB OPENINGS BOARD */}
      <div style={{ width: '60%', padding: '50px', display: 'flex', flexDirection: 'column', gap: '30px', overflowY: 'auto', maxHeight: '100vh', boxSizing: 'border-box', borderRight: '1px solid #e2e8f0' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#2563eb', marginBottom: '4px' }}>
            <Code size={32} strokeWidth={2.5} />
            <span style={{ fontSize: '14px', fontWeight: '800', tracking: '1px', textTransform: 'uppercase', color: '#64748b' }}>Service Hub</span>
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-1px' }}>
            CarePulse Ops
          </h1>
          <p style={{ fontSize: '15px', color: '#475569', marginTop: '12px', lineHeight: '1.6', maxWidth: '650px' }}>
          "Next-Generation Healthcare Workforce Logistics & Recruitment Intelligence Platform."
          </p>
        </div>

        <hr style={{ border: 'none', height: '1px', background: '#e2e8f0', margin: 0 }} />

        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} style={{ color: '#2563eb' }} /> Ongoing Job Openings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {MOCK_JOBS.map(job => (
              <div key={job.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: '700', background: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '20px' }}>{job.dept}</span>
                    <h4 style={{ margin: '8px 0 4px 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>{job.title}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b', display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '6px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><MapPin size={14}/> {job.loc} ({job.type})</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Briefcase size={14}/> {job.exp}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><DollarSign size={14}/> {job.salary}</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => handleApplyClick(job.title)} 
                    style={{ padding: '11px 22px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.15)', whiteSpace: 'nowrap' }}
                  >
                    Apply Now
                  </button>
                </div>
                <div style={{ marginTop: '14px', fontSize: '13px', color: '#334155', background: '#f8fafc', padding: '12px', borderRadius: '8px', lineHeight: '1.5' }}>{job.jd}</div>
                <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}><strong>Required Stack:</strong> {job.skills}</div>
              </div>
            ))}
          </div>
=======
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#f8f9fa', overflow: 'hidden' }}>
      <style>{`
        * { scrollbar-width: none; -ms-overflow-style: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>
      {/* Left Side - Company Info & Job Listings */}
      <div style={{ flex: 2, overflowY: 'auto', padding: '24px 20px', backgroundColor: '#fff', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Company Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>TS</div>
            <div>
              <h1 style={{ fontSize: '1.4rem', margin: '0', color: '#1a202c', fontWeight: '800' }}>TECH SOLUTIONS</h1>
              <p style={{ margin: '0', color: '#667eea', fontSize: '0.75rem', fontWeight: '600' }}>Healthcare Workforce</p>
            </div>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#4b5563', marginTop: '8px', maxWidth: '600px' }}>
            Innovating the future of healthcare workforce management with modern hiring experiences.
          </p>
        </div>

        {/* Job Listings */}
        <div>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '16px', color: '#1a202c', fontWeight: '700' }}>🚀 Open Positions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
            {jobs.map((job) => (
              <div
                key={job.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '12px',
                  backgroundColor: '#fff',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 2px', fontSize: '0.95rem', color: '#1a202c', fontWeight: '700' }}>{job.title}</h3>
                    <p style={{ margin: 0, color: '#667eea', fontSize: '0.75rem', fontWeight: '600' }}>{job.dept}</p>
                  </div>
                  <span style={{ backgroundColor: '#e0e7ff', color: '#667eea', padding: '3px 8px', borderRadius: '16px', fontSize: '0.65rem', fontWeight: '700' }}>NEW</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4b5563', fontSize: '0.8rem' }}>
                    <FaClock size={12} style={{ color: '#f59e0b' }} />
                    <span><strong>Exp:</strong> {job.exp}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4b5563', fontSize: '0.8rem' }}>
                    <FaDollarSign size={12} style={{ color: '#10b981' }} />
                    <span><strong>Salary:</strong> {job.salary}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4b5563', fontSize: '0.8rem' }}>
                    <FaMapMarkerAlt size={12} style={{ color: '#ef4444' }} />
                    <span><strong>Loc:</strong> {job.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#4b5563', fontSize: '0.8rem' }}>
                    <FaBriefcase size={12} style={{ color: '#8b5cf6' }} />
                    <span><strong>Type:</strong> {job.type}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <p style={{ margin: '0 0 2px', color: '#6b7280', fontSize: '0.75rem', fontWeight: '600' }}>📋 Skills:</p>
                  <p style={{ margin: 0, color: '#4b5563', fontSize: '0.8rem' }}>{job.skills}</p>
                </div>

                <div style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid #e5e7eb' }}>
                  <p style={{ margin: '0 0 2px', color: '#6b7280', fontSize: '0.75rem', fontWeight: '600' }}>📄 Description:</p>
                  <p style={{ margin: 0, color: '#4b5563', fontSize: '0.8rem', lineHeight: 1.3 }}>{job.jd}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onApplyClick(job)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    width: '100%',
                    padding: '8px 14px',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)'; }}
                >
                  Apply <FaArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
        <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }}></div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '340px' }}>
          <div style={{ marginBottom: '18px' }}>
            <FaSignInAlt size={44} style={{ color: '#fff', margin: '0 auto', display: 'block', marginBottom: '12px' }} />
            <h2 style={{ margin: '0 0 6px', color: '#fff', fontSize: '1.6rem', fontWeight: '800' }}>Sign In</h2>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem' }}>Access your account</p>
          </div>

          {authError && (
            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '10px 12px', borderRadius: '6px', marginBottom: '12px', fontSize: '0.8rem', backdropFilter: 'blur(10px)' }}>
              ⚠️ {authError}
            </div>
          )}

          {successMessage && (
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.5)', color: '#d1fae5', padding: '10px 12px', borderRadius: '6px', marginBottom: '12px', fontSize: '0.8rem' }}>
              ✓ {successMessage}
            </div>
          )}

          <form onSubmit={onSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem', marginBottom: '6px', fontWeight: '600' }}>Username or Email</label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope size={14} style={{ position: 'absolute', left: '12px', top: '12px', color: 'rgba(255,255,255,0.5)', pointerEvents: 'none' }} />
                <input
                  name="usernameOrEmail"
                  type="text"
                  placeholder="username or email"
                  value={authForm.usernameOrEmail}
                  onChange={onAuthChange}
                  style={{
                    width: '100%',
                    paddingLeft: '36px',
                    paddingRight: '12px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    borderRadius: '7px',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(10px)',
                    outline: 'none'
                  }}
                  onFocus={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                  onBlur={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                />
                <style>{`
                  input::placeholder { color: rgba(255,255,255,0.6); }
                `}</style>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem', marginBottom: '6px', fontWeight: '600' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <FaLock size={14} style={{ position: 'absolute', left: '12px', top: '12px', color: 'rgba(255,255,255,0.5)', pointerEvents: 'none' }} />
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={authForm.password}
                  onChange={onAuthChange}
                  style={{
                    width: '100%',
                    paddingLeft: '36px',
                    paddingRight: '12px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    borderRadius: '7px',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(10px)',
                    outline: 'none'
                  }}
                  onFocus={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                  onBlur={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                />
                <style>{`
                  input::placeholder { color: rgba(255,255,255,0.6); }
                `}</style>
              </div>
            </div>

            <button
              type="submit"
              style={{
                padding: '10px 18px',
                borderRadius: '7px',
                border: 'none',
                backgroundColor: '#fff',
                color: '#667eea',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '700',
                marginTop: '6px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'; }}
            >
              Sign In
            </button>
          </form>

          <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>
            New here? <span style={{ color: '#fff', fontWeight: '600' }}>Apply for a job</span>
          </p>
>>>>>>> d6a61e4 (17:49)
        </div>
      </div>

      {/* RIGHT SIDE: SECURE 7-ROLE SIGN IN SECTION */}
      <div style={{ width: '40%', background: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px', borderRadius: '14px', color: '#16a34a', marginBottom: '12px' }}><ShieldCheck size={26} /></div>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>Sign In</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Access system control gateway dashboard</p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>SYSTEM OPERATIONAL ROLE ({AVAILABLE_ROLES.length} Active)</label>
              <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px', fontWeight: '600', color: '#334155', background: '#f8fafc' }}>
                {AVAILABLE_ROLES.map(role => <option key={role} value={role}>{role}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>USERNAME OR EMAIL</label>
              <input type="text" value={emailOrUser} onChange={(e) => setEmailOrUser(e.target.value)} required placeholder="Enter login credential..." style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" style={{ width: '100%', padding: '12px 40px 12px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>

            <button type="submit" style={{ width: '100%', padding: '13px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '5px' }}><LogIn size={16} /> Sign In</button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default AuthPage;