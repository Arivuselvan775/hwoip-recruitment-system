import React from 'react';

const CandidateDashboard = ({ candidateUser, appliedJobs, ongoingJobs }) => {
  const applicationStatus = 'Under Review';
  const steps = [
    { label: 'Applied', desc: 'Profile payload processed successfully.' },
    { label: 'Under Review', desc: 'Core structural screening active by operational recruiters.' },
    { label: 'Interview Scheduled', desc: 'Verification assessment panel slot allocated.' }
  ];

  const currentStepIndex = steps.findIndex((step) => step.label === applicationStatus);

  return (
    <div style={{ minHeight: '100vh', padding: '24px', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ marginTop: 0 }}>Welcome, {candidateUser?.username || 'Candidate'}</h2>
          <h3>Applied Jobs</h3>
          {appliedJobs.length > 0 ? (
            <ul>
              {appliedJobs.map((job) => (
                <li key={job.id} style={{ marginBottom: '8px' }}>
                  {job.title} - <strong>{job.status || 'Applied'}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>No applications yet.</p>
          )}

          <h3>Ongoing Jobs</h3>
          <ul>
            {ongoingJobs.map((job) => (
              <li key={job.id} style={{ marginBottom: '8px' }}>{job.title}</li>
            ))}
          </ul>
        </div>

        <div style={{ flex: '1 1 320px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
          <h3>Application Status Timeline</h3>
          <div style={{ borderLeft: '3px solid #2563eb', paddingLeft: '12px' }}>
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              return (
                <div key={step.label} style={{ marginBottom: '12px' }}>
                  <p style={{ margin: 0, fontWeight: 700, color: isCompleted ? '#0f172a' : '#94a3b8' }}>
                    {step.label} {isCompleted ? '✅' : '⏳'}
                  </p>
                  <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
