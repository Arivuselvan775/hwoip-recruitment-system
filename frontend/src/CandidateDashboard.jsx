import React from 'react';

import { FaArrowRight, FaCheckCircle, FaClipboardList, FaBriefcase, FaUser, FaClock, FaMapMarkerAlt, FaDollarSign, FaFileAlt,  FaSignOutAlt } from "react-icons/fa";

const CandidateDashboard = ({ candidateUser, appliedJobs, ongoingJobs,  onLogout }) => {
  const applicationStatus = 'Under Review';
  const steps = [
    { label: 'Applied', desc: 'Your profile has been received', icon: '📋', completed: true },
    { label: 'Under Review', desc: 'Screening in progress', icon: '👀', completed: true },
    { label: 'Interview Scheduled', desc: 'Awaiting confirmation', icon: '📞', completed: false }
  ];

  const currentStepIndex = steps.findIndex((step) => step.label === applicationStatus);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: '0' }}>
      {/* Header */}
<div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '32px 40px', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
        <FaUser size={24} />
      </div>

      <div>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900' }}>Welcome Back, {candidateUser?.username || 'Candidate'}</h1>

        <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
          Your application journey dashboard
        </p>
      </div>
    </div>

    <div style={{ display: 'flex', gap: '12px' }}>
      <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', border: 'none', borderRadius: '8px', background: '#ef4444', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  </div>
</div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          {/* Applied Jobs Card */}
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#1a202c', fontSize: '0.95rem', fontWeight: '700' }}>Applications</h3>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <FaClipboardList size={18} />
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '2rem', color: '#667eea', fontWeight: '900', marginBottom: '4px' }}>{appliedJobs.length}</p>
            <p style={{ margin: 0, color: '#999', fontSize: '0.8rem' }}>Total applications</p>
          </div>

          {/* Open Positions Card */}
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#1a202c', fontSize: '0.95rem', fontWeight: '700' }}>Open Positions</h3>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <FaBriefcase size={18} />
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '2rem', color: '#10b981', fontWeight: '900', marginBottom: '4px' }}>{ongoingJobs.length}</p>
            <p style={{ margin: 0, color: '#999', fontSize: '0.8rem' }}>Available positions</p>
          </div>

          {/* Status Card */}
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, color: '#1a202c', fontSize: '0.95rem', fontWeight: '700' }}>Current Status</h3>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <FaClock size={18} />
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '1.3rem', color: '#f59e0b', fontWeight: '900', marginBottom: '4px' }}>Under Review</p>
            <p style={{ margin: 0, color: '#999', fontSize: '0.8rem' }}>Latest application status</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '40px' }}>
          {/* Applied Jobs Section */}
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h2 style={{ margin: '0 0 20px', color: '#1a202c', fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaFileAlt size={20} style={{ color: '#667eea' }} />
              My Applications
            </h2>

            {appliedJobs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {appliedJobs.map((job, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '16px',
                      backgroundColor: '#f9fafb',
                      borderRadius: '10px',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f8';
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <h3 style={{ margin: '0 0 4px', color: '#1a202c', fontSize: '0.95rem', fontWeight: '800' }}>{job.title}</h3>
                        <p style={{ margin: 0, color: '#667eea', fontSize: '0.8rem', fontWeight: '700' }}>{job.dept}</p>
                      </div>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        backgroundColor: job.status === 'Applied' ? '#e0e7ff' : job.status === 'Shortlisted' ? '#ecfdf5' : '#fee',
                        color: job.status === 'Applied' ? '#667eea' : job.status === 'Shortlisted' ? '#065f46' : '#991b1b'
                      }}>
                        {job.status || 'Applied'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#666' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FaClock size={12} /> {job.exp}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FaDollarSign size={12} /> {job.salary}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FaMapMarkerAlt size={12} /> {job.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>No applications yet. Start by applying to open positions!</p>
              </div>
            )}
          </div>

          {/* Application Timeline */}
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h2 style={{ margin: '0 0 20px', color: '#1a202c', fontSize: '1.3rem', fontWeight: '800' }}>Timeline</h2>
            <div style={{ position: 'relative' }}>
              {/* Timeline connector */}
              <div style={{ position: 'absolute', left: '19px', top: '40px', bottom: '0', width: '2px', background: 'linear-gradient(180deg, #667eea 0%, #ccc 100%)' }}></div>

              {/* Timeline items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {steps.map((step, index) => (
                  <div key={step.label} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: index <= currentStepIndex ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: '700',
                      flexShrink: 0,
                      zIndex: 1,
                      boxShadow: index <= currentStepIndex ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none'
                    }}>
                      {index <= currentStepIndex ? <FaCheckCircle size={18} /> : index + 1}
                    </div>
                    <div style={{ paddingTop: '6px' }}>
                      <p style={{ margin: '0', color: index <= currentStepIndex ? '#1a202c' : '#999', fontWeight: '700', fontSize: '0.9rem' }}>
                        {step.label} {index <= currentStepIndex ? '✓' : ''}
                      </p>
                      <p style={{ margin: '4px 0 0', color: '#666', fontSize: '0.8rem', lineHeight: 1.3 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ongoing Opportunities */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 20px', color: '#1a202c', fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaBriefcase size={20} style={{ color: '#10b981' }} />
            More Opportunities
          </h2>

          {ongoingJobs.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {ongoingJobs.slice(0, 6).map((job) => (
                <div
                  key={job.id}
                  style={{
                    padding: '18px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '10px',
                    border: '1.5px solid #e5e7eb',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px', color: '#1a202c', fontSize: '0.95rem', fontWeight: '800' }}>{job.title}</h3>
                      <p style={{ margin: 0, color: '#667eea', fontSize: '0.8rem', fontWeight: '700' }}>{job.dept}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#666', marginBottom: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FaClock size={12} style={{ color: '#f59e0b' }} /> {job.exp}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FaDollarSign size={12} style={{ color: '#10b981' }} /> {job.salary}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FaMapMarkerAlt size={12} style={{ color: '#ef4444' }} /> {job.location}
                    </span>
                  </div>

                  <button
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: 'none',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                    View Details <FaArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#999', textAlign: 'center', padding: '40px 20px' }}>No ongoing opportunities at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
