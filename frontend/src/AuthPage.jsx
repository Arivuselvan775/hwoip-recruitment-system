import React from 'react';
import { FaSignInAlt, FaBriefcase, FaDollarSign, FaMapMarkerAlt, FaClock, FaArrowRight, FaLock, FaEnvelope } from 'react-icons/fa';

const AuthPage = ({ jobs, onApplyClick, authForm, onAuthChange, onSignIn, authError, successMessage, roleOptions }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#f0f4f8', overflow: 'hidden' }}>
      <style>{`
        * { scrollbar-width: thin; scrollbar-color: #ccc #f0f4f8; }
        *::-webkit-scrollbar { width: 8px; }
        *::-webkit-scrollbar-track { background: #f0f4f8; }
        *::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
        input::placeholder { color: rgba(255,255,255,0.7); }
      `}</style>

      {/* Jobs Listing Section */}
      <div style={{ flex: 2, overflowY: 'auto', padding: '40px 32px', backgroundColor: '#fff', scrollbarWidth: 'thin' }}>
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)' }}>TS</div>
            <div>
              <h1 style={{ fontSize: '1.6rem', margin: '0', color: '#1a202c', fontWeight: '900' }}>TECH SOLUTIONS</h1>
              <p style={{ margin: '4px 0 0', color: '#667eea', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.5px' }}>HEALTHCARE WORKFORCE</p>
            </div>
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#4b5563', marginTop: '12px', maxWidth: '600px' }}>
            Innovating the future of healthcare workforce management with modern hiring experiences and talent solutions.
          </p>
        </div>

        {/* Featured Jobs Section */}
        <div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#1a202c', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🚀</span>
            Open Positions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
            {jobs.map((job) => (
              <div
                key={job.id}
                style={{
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '18px',
                  backgroundColor: '#f9fafb',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; 
                  e.currentTarget.style.transform = 'translateY(-4px)'; 
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.backgroundColor = '#f3f4f8';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#1a202c', fontWeight: '800' }}>{job.title}</h3>
                    <p style={{ margin: 0, color: '#667eea', fontSize: '0.8rem', fontWeight: '700' }}>{job.dept}</p>
                  </div>
                  <span style={{ backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>NEW</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#4b5563', fontSize: '0.85rem' }}>
                    <FaClock size={13} style={{ color: '#f59e0b', flexShrink: 0 }} />
                    <span><strong>Experience:</strong> {job.exp}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#4b5563', fontSize: '0.85rem' }}>
                    <FaDollarSign size={13} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span><strong>Salary:</strong> {job.salary}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#4b5563', fontSize: '0.85rem' }}>
                    <FaMapMarkerAlt size={13} style={{ color: '#ef4444', flexShrink: 0 }} />
                    <span><strong>Location:</strong> {job.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#4b5563', fontSize: '0.85rem' }}>
                    <FaBriefcase size={13} style={{ color: '#8b5cf6', flexShrink: 0 }} />
                    <span><strong>Type:</strong> {job.type}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <p style={{ margin: '0 0 6px', color: '#6b7280', fontSize: '0.8rem', fontWeight: '700' }}>📋 Required Skills</p>
                  <p style={{ margin: 0, color: '#4b5563', fontSize: '0.85rem' }}>{job.skills}</p>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <p style={{ margin: '0 0 6px', color: '#6b7280', fontSize: '0.8rem', fontWeight: '700' }}>📄 Description</p>
                  <p style={{ margin: 0, color: '#4b5563', fontSize: '0.85rem', lineHeight: 1.4 }}>{job.jd}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onApplyClick(job)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '10px 16px',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.transform = 'translateY(-2px)'; 
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.5)'; 
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.transform = 'translateY(0)'; 
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)'; 
                  }}>
                  Apply Now <FaArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sign In Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 28px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', position: 'relative', overflow: 'hidden', boxShadow: '-4px 0 20px rgba(0,0,0,0.1)' }}>
        {/* Decorative shapes */}
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '240px', height: '240px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-50px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}></div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '360px' }}>
          {/* Sign In Header */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', backdropFilter: 'blur(10px)' }}>
              <FaSignInAlt size={28} style={{ color: '#fff' }} />
            </div>
            <h2 style={{ margin: '0 0 8px', color: '#fff', fontSize: '1.8rem', fontWeight: '800' }}>Sign In</h2>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.95)', fontSize: '0.9rem', fontWeight: '400' }}>Access your candidate account</p>
          </div>

          {/* Messages */}
          {authError ? (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '12px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem', backdropFilter: 'blur(10px)' }}>
              ⚠️ {authError}
            </div>
          ) : successMessage ? (
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#a7f3d0', padding: '12px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem', backdropFilter: 'blur(10px)' }}>
              ✓ {successMessage}
            </div>
          ) : null}

          {/* Sign In Form */}
          <form onSubmit={onSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Email/Username Input */}
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.95)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '700' }}>Email or Username</label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)', pointerEvents: 'none' }} />
                <input
                  name="usernameOrEmail"
                  type="text"
                  placeholder="john@example.com"
                  value={authForm.usernameOrEmail}
                  onChange={onAuthChange}
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '14px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    borderRadius: '8px',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(10px)',
                    outline: 'none',
                    fontWeight: '500'
                  }}
                  onFocus={(e) => { 
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; 
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; 
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                  }}
                  onBlur={(e) => { 
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; 
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; 
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.95)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '700' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <FaLock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)', pointerEvents: 'none' }} />
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={authForm.password}
                  onChange={onAuthChange}
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '14px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    borderRadius: '8px',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(10px)',
                    outline: 'none',
                    fontWeight: '500'
                  }}
                  onFocus={(e) => { 
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; 
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; 
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                  }}
                  onBlur={(e) => { 
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; 
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; 
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              style={{
                padding: '12px 18px',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.25)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '700',
                transition: 'all 0.3s ease',
                marginTop: '8px',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.background = 'rgba(255,255,255,0.35)'; 
                e.currentTarget.style.transform = 'translateY(-2px)'; 
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}>
              Sign In
            </button>
          </form>

          {/* Demo Info */}
          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', fontWeight: '700' }}>Demo Account</p>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '10px 12px', borderRadius: '6px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, backdropFilter: 'blur(10px)' }}>
              <p style={{ margin: '0 0 4px' }}><strong>Email:</strong> hrexecutive@hwoip.com</p>
              <p style={{ margin: '0' }}><strong>Pass:</strong> HrExec@123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;