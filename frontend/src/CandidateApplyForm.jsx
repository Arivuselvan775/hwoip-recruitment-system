import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, FileText } from 'lucide-react';

export default function CandidateApplyForm({ jobTitle, onBackToFeed }) {
  // Required Personal State Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('Male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Education & Professional Metrics
  const [degree, setDegree] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);

  // Time slots parameters array setup
  const [slots, setSlots] = useState([
    { id: 1, date: '', startTime: '', endTime: '' },
    { id: 2, date: '', startTime: '', endTime: '' },
    { id: 3, date: '', startTime: '', endTime: '' } // Base minimum 3 setup
  ]);

  const handleAddSlot = () => {
    if (slots.length >= 10) return alert("System Threshold Warning: Maximum allowed availability parameter is 10 slots!");
    setSlots([...slots, { id: Date.now(), date: '', startTime: '', endTime: '' }]);
  };

  const handleRemoveSlot = (id) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  const handleSlotChange = (id, field, value) => {
    setSlots(slots.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verification Rules Matrix Checks
    if (password !== confirmPassword) return alert("Validation Mismatch: Passwords do not match!");
    if (!resume) return alert("Mandatory Document Alert: Please upload your Resume file!");
    if (slots.length < 3 || slots.length > 10) {
      return alert(`Validation Alert: Provided interview slots count must be between 3 and 10! Current slots configuration count: ${slots.length}`);
    }

    alert("Job application submitted successfully.");
    onBackToFeed(); // Redirects profile node matrix directly back to layout login feed
  };

  return (
    <div style={{ maxWidth: '750px', margin: '40px auto', background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.02)', boxSizing: 'border-box' }}>
      <button onClick={onBackToFeed} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748b', fontWeight: '700', cursor: 'pointer', marginBottom: '20px', fontSize: '13px' }}><ArrowLeft size={16}/> Back to Opportunities</button>
      
      <div style={{ marginBottom: '30px' }}>
        <span style={{ fontSize: '11px', fontWeight: '800', background: '#f0fdf4', color: '#16a34a', padding: '5px 12px', borderRadius: '30px', letterSpacing: '0.5px' }}>APPLYING FOR</span>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '6px 0 0 0' }}>{jobTitle}</h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* SECTION 1: PERSONAL DETAILS */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '16px' }}>1. Personal Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>FULL NAME *</label>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>EMAIL ADDRESS *</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>PHONE NUMBER *</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>GENDER *</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', boxSizing: 'border-box' }}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>PERMANENT ADDRESS *</label>
              <textarea required value={address} onChange={(e) => setAddress(e.target.value)} rows="2" style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', resize: 'vertical' }}></textarea>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>PORTAL ACCOUNT PASSWORD *</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>CONFIRM PASSWORD *</label>
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
          </div>
        </div>

        {/* SECTION 2: ACADEMICS & PROFESSIONAL CREDENTIALS */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '16px' }}>2. Education & Professional Metrics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>DEGREE / QUALIFICATION *</label>
              <input type="text" required placeholder="B.E. Computer Science, BSC, etc." value={degree} onChange={(e) => setDegree(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>GRADUATION YEAR *</label>
              <input type="number" required placeholder="2024" value={gradYear} onChange={(e) => setGradYear(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>RELEVANT EXPERIENCE *</label>
              <input type="text" required placeholder="e.g. 2.5 Years" value={experience} onChange={(e) => setExperience(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>EXPECTED SALARY (PER MONTH) *</label>
              <input type="text" required placeholder="e.g. ₹45,000" value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>CORE SKILLS MATRIX *</label>
              <input type="text" required placeholder="React, JavaScript, PostgreSQL, Git..." value={skills} onChange={(e) => setSkills(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>CURRENT COMPANY (IF APPLICABLE)</label>
              <input type="text" value={currentCompany} onChange={(e) => setCurrentCompany(e.target.value)} style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>
          </div>
        </div>

        {/* SECTION 3: DOCUMENTS & ATTACHMENTS */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '16px' }}>3. Mandatory Documents</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>UPLOAD RESUME (PDF/DOCX) *</label>
              <div style={{ border: '2px dashed #cbd5e1', padding: '20px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', background: '#f8fafc' }}>
                <input type="file" required accept=".pdf,.docx" onChange={(e) => setResume(e.target.files[0])} style={{ display: 'none' }} id="resume-file" />
                <label htmlFor="resume-file" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569' }}>
                  <FileText size={24} style={{ color: '#94a3b8' }} />
                  {resume ? <span style={{ color: '#2563eb', fontWeight: '600' }}>Selected: {resume.name}</span> : <span>Click to select file path tracking node</span>}
                </label>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>COVER LETTER</label>
              <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows="3" placeholder="Brief brief overview concerning operational role fit..." style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', resize: 'vertical' }}></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 4: INTERVIEW AVAILABILITY SLOT PICKER (3-10 Rule Checker) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: 0 }}>4. Availability Slot Selection</h3>
            <button type="button" onClick={handleAddSlot} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#eff6ff', color: '#2563eb', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}><Plus size={14}/> Add Slot</button>
          </div>
          <p style={{ margin: '-10px 0 14px 0', fontSize: '12px', color: '#64748b' }}>Configure metrics between <strong>3 to 10 slots</strong> maximum for evaluation operations scheduling.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {slots.map((slot, index) => (
              <div key={slot.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 1fr 50px', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textAlign: 'center' }}>#{index + 1}</span>
                <input type="date" required value={slot.date} onChange={(e) => handleSlotChange(slot.id, 'date', e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <input type="time" required value={slot.startTime} onChange={(e) => handleSlotChange(slot.id, 'startTime', e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <input type="time" required value={slot.endTime} onChange={(e) => handleSlotChange(slot.id, 'endTime', e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <button type="button" onClick={() => handleRemoveSlot(slot.id)} disabled={slots.length <= 3} style={{ background: 'none', border: 'none', color: slots.length <= 3 ? '#cbd5e1' : '#ef4444', cursor: slots.length <= 3 ? 'not-allowed' : 'pointer', display: 'inline-flex', justifyContent: 'center' }}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff', fontWeight: '700', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(37,99,235,0.2)', textAlign: 'center' }}>Submit Application Profiles</button>

      </form>
    </div>
  );
}