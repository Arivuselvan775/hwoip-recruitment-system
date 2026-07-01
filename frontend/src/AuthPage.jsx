import React from 'react';
import { FaSignInAlt, FaBriefcase, FaDollarSign, FaMapMarkerAlt, FaClock, FaArrowRight, FaLock, FaEnvelope } from 'react-icons/fa';

const AuthPage = ({ jobs, onApplyClick, authForm, onAuthChange, onSignIn, authError, successMessage, roleOptions }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#f8f9fa', overflow: 'hidden' }}>
      <style>{`
        * { scrollbar-width: none; -ms-overflow-style: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{ flex: 2, overflowY: 'auto', padding: '24px 20px', backgroundColor: '#fff', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
        <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }}></div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '340px' }}>
          <div style={{ marginBottom: '18px' }}>
            <FaSignInAlt size={44} style={{ color: '#fff', margin: '0 auto', display: 'block', marginBottom: '12px' }} />
            <h2 style={{ margin: '0 0 6px', color: '#fff', fontSize: '1.6rem', fontWeight: '800' }}>Sign In</h2>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem' }}>Access your account</p>
          </div>

          {authError ? (
            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '10px 12px', borderRadius: '6px', marginBottom: '12px', fontSize: '0.8rem', backdropFilter: 'blur(10px)' }}>
              ⚠️ {authError}
            </div>
          ) : successMessage ? (
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.5)', color: '#d1fae5', padding: '10px 12px', borderRadius: '6px', marginBottom: '12px', fontSize: '0.8rem' }}>
              ✓ {successMessage}
            </div>
          ) : null}

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

          <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>
            New here? <span style={{ color: '#fff', fontWeight: '600' }}>Apply for a job</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;