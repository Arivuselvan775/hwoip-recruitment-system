import React from 'react';
import { FaSignInAlt, FaBriefcase, FaDollarSign, FaMapMarkerAlt, FaClock, FaArrowRight, FaLock, FaEnvelope } from 'react-icons/fa';

const AuthPage = ({ jobs, jobsLoading, onApplyClick, authForm, onAuthChange, onSignIn, authError, successMessage, roleOptions }) => {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#f0f4f8', overflow: 'hidden' }}>
      <style>{`
        * { scrollbar-width: thin; scrollbar-color: #ccc #f0f4f8; }
        *::-webkit-scrollbar { width: 8px; }
        *::-webkit-scrollbar-track { background: #f0f4f8; }
        *::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
        input::placeholder { color: rgba(255,255,255,0.7); }
      `}</style>

      {/* Jobs Listing Section */}
      <div style={{
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        boxSizing: 'border-box',
        padding: '24px 32px',
        backgroundColor: '#fff',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ flexShrink: 0, marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)' }}>TS</div>
            <div>
              <h1 style={{ fontSize: '1.6rem', margin: '0', color: '#1a202c', fontWeight: '900' }}>TECH SOLUTIONS</h1>
              <p style={{ margin: '4px 0 0', color: '#667eea', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.5px' }}>HEALTHCARE WORKFORCE</p>
            </div>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#4b5563', margin: '8px 0 0', maxWidth: '600px' }}>
            Innovating the future of healthcare workforce management with modern hiring experiences and talent solutions.
          </p>
        </div>

        {/* Featured Jobs Section */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', margin: '0 0 4px', color: '#1a202c', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🚀</span>
                Opening Positions
              </h2>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>
                {jobsLoading ? 'Loading the latest openings...' : 'Select a role that matches your expertise and apply in minutes.'}
              </p>
            </div>
            <span style={{ backgroundColor: '#eef2ff', color: '#4338ca', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700' }}>
              {jobsLoading ? 'Loading…' : `${jobs.length} active roles`}
            </span>
          </div>
          {jobsLoading ? (
            <div style={{ padding: '50px 0', textAlign: 'center', color: '#64748b', fontSize: '1rem', width: '100%' }}>
              Loading job openings quickly for you...
            </div>
          ) : jobs.length === 0 ? (
            <div style={{ padding: '50px 0', textAlign: 'center', color: '#64748b', fontSize: '1rem', width: '100%' }}>
              No openings available right now. Please refresh or check back shortly.
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              height: '410px',
              maxHeight: '410px',
              overflowY: 'auto',
              paddingRight: '6px'
            }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    height: '130px',
                    boxSizing: 'border-box',
                    border: '1.5px solid #e5e7eb',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(15, 23, 42, 0.03)',
                    cursor: 'pointer',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.06)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.borderColor = '#667eea';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(15, 23, 42, 0.03)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}>
                  {/* Row 1: Dept & Title & Open Tag */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 6px', borderRadius: '999px', backgroundColor: '#eef2ff', color: '#4338ca', fontSize: '0.62rem', fontWeight: '700', flexShrink: 0 }}>
                        <FaBriefcase size={8} /> {job.dept}
                      </div>
                      <h3 style={{ margin: 0, fontSize: '0.88rem', color: '#0f172a', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {job.title}
                      </h3>
                    </div>
                    <span style={{ flexShrink: 0, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '2px 8px', borderRadius: '999px', fontSize: '0.62rem', fontWeight: '800' }}>Open</span>
                  </div>

                  {/* Row 2: JD (truncated to 2 lines) */}
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.75rem', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {job.jd}
                  </p>

                  {/* Row 3: Meta details */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px', fontSize: '0.72rem', color: '#4b5563' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaClock size={9} style={{ color: '#f59e0b', flexShrink: 0 }} />
                      <span>{job.exp}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaDollarSign size={9} style={{ color: '#10b981', flexShrink: 0 }} />
                      <span>{job.salary}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaMapMarkerAlt size={9} style={{ color: '#ef4444', flexShrink: 0 }} />
                      <span>{job.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaBriefcase size={9} style={{ color: '#8b5cf6', flexShrink: 0 }} />
                      <span>{job.type}</span>
                    </div>
                  </div>

                  {/* Row 4: Skills & Apply Button */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {job.skills?.split(',').slice(0, 3).map((skill) => (
                        <span key={skill} style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '2px 6px', borderRadius: '999px', fontSize: '0.62rem', fontWeight: '600' }}>
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => onApplyClick(job)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        border: 'none',
                        borderRadius: '6px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 4px rgba(102, 126, 234, 0.15)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(102, 126, 234, 0.15)';
                      }}>
                      Apply <FaArrowRight size={9} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sign In Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 28px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', position: 'relative', overflow: 'hidden', boxShadow: '-4px 0 20px rgba(0,0,0,0.1)' }}>
        {/* Decorative shapes */}
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '240px', height: '240px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-50px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}></div>

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '360px' }}>
          {/* Sign In Header */}
          <div style={{ marginBottom: '24px' }}>
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

            {/* Sign In Button (Moved below password) */}
            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '700',
                width: '100%',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              }}>
              <FaSignInAlt size={16} /> Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;