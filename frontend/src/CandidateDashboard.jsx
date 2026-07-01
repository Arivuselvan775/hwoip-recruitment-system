import React from 'react';
import { Briefcase, Clock, CheckCircle2, User, LogOut, Layout } from 'lucide-react';

export default function CandidateDashboard({ user, onLogout }) {
  
  // Realtime Status Track Node Parameter Setup
  const applicationStatus = "Under Review"; // Applied → Under Review → Interview Scheduled

  const steps = [
    { label: 'Applied', desc: 'Profile payload processed successfully.' },
    { label: 'Under Review', desc: 'Core structural screening active by operational recruiters.' },
    { label: 'Interview Scheduled', desc: 'Verification assessment panel slot allocated.' }
  ];

  const currentStepIndex = steps.findIndex(step => step.label === applicationStatus);

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: '#f8fafc', boxSizing: 'border-box' }}>
      
      {/* HEADER SECTION CONFIG */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0f172a' }}>
          <Layout size={22} style={{ color: '#2563eb' }} />
          <span style={{ fontWeight: '800', fontSize: '18px', letterSpacing: '-0.5px' }}>Candidate Workspace</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
            <div style={{ background: '#f1f5f9', padding: '6px', borderRadius: '50%' }}><User size={14} /></div>
            {user?.name || "Candidate Operational Node"}
          </div>
          <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600' }}><LogOut size={15}/> Logout</button>
        </div>
      </header>

      {/* BODY INTERACTION ROUTING WORKSPACE */}
      <div style={{ display: 'flex', gap: '30px', padding: '40px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
        
        {/* LEFT COMPONENT COLUMN: JOBS STREAM */}
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* APPLIED JOBS GRID LIST */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#22c55e' }}/> Applied Jobs</h3>
            <div style={{ border: '1px solid #eff6ff', background: '#fafafa', borderRadius: '12px', padding: '16px' }}>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>Full Stack AI Engineer</h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>Department: Engineering | Location: Hybrid</p>
              <div style={{ marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '700', background: '#fff7ed', color: '#c2410c', padding: '4px 10px', borderRadius: '20px' }}><Clock size={12}/> Current Phase: {applicationStatus}</div>
            </div>
          </div>

          {/* OTHER OPEN PIPELINE VACANCIES TRACK */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={16} style={{ color: '#2563eb' }}/> Ongoing Jobs Stream</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>UI/UX Product Design track node setup is active inside database parameters matrix.</p>
          </div>

        </div>

        {/* RIGHT COMPONENT COLUMN: PROGRESS TIMELINE */}
        <div style={{ width: '50%', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '30px' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Application Status Timeline</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative', paddingLeft: '10px' }}>
            
            {/* Timeline structural line accent connector track */}
            <div style={{ position: 'absolute', left: '21px', top: '10px', bottom: '20px', width: '2px', background: '#e2e8f0', zIndex: 1 }}></div>

            {steps.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isActive = idx === currentStepIndex;

              return (
                <div key={idx} style={{ display: 'flex', gap: '20px', position: 'relative', zIndex: 5 }}>
                  <div style={{ 
                    width: '24px', height: '24px', borderRadius: '50%', 
                    background: isCompleted ? '#2563eb' : '#ffffff', 
                    border: isCompleted ? '2px solid #2563eb' : '2px solid #cbd5e1',
                    display: 'flex', alignItems: 'center', justifyContnet: 'center',
                    boxShadow: isActive ? '0 0 0 4px rgba(37,99,235,0.15)' : 'none'
                  }}>
                    {isCompleted && <div style={{ width: '6px', height: '6px', background: '#fff', borderRadius: '50%', margin: 'auto' }}></div>}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: isCompleted ? '#0f172a' : '#94a3b8' }}>{step.label}</h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>{step.desc}</p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </div>
  );
}