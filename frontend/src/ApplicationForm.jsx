import React, { useState } from 'react';
import { FaArrowLeft, FaUser, FaBook, FaBriefcase, FaFileAlt, FaClipboardList, FaClock, FaCheckCircle } from 'react-icons/fa';

const createEmptySlot = () => ({ date: '', startTime: '', endTime: '' });

const ApplicationForm = ({ job, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    gender: 'Prefer not to say',
    password: '',
    confirmPassword: '',
    degree: '',
    graduationYear: '',
    experience: '',
    skills: '',
    currentCompany: '',
    expectedSalary: '',
    resumeName: '',
    resumeData: '',
    coverLetter: ''
  });
  const [slots, setSlots] = useState([createEmptySlot(), createEmptySlot(), createEmptySlot()]);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = ['Personal', 'Education', 'Professional', 'Documents', 'Interview', 'Review'];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value;
    setSlots(updatedSlots);
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, resumeName: file.name, resumeData: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate exactly 3 slots
    if (slots.length !== 3) {
      setFormError('You must select exactly 3 interview time slots.');
      return;
    }

    // Validate that all slots have date and time information
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      if (!slot.date || !slot.startTime || !slot.endTime) {
        setFormError(`Slot ${i + 1} is incomplete. Please fill in date, start time, and end time.`);
        return;
      }
      // Validate that end time is after start time
      if (slot.startTime >= slot.endTime) {
        setFormError(`Slot ${i + 1}: End time must be after start time on the same day.`);
        return;
      }
    }

    // Validate password matching
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    // Validate resume upload
    if (!formData.resumeName || !formData.resumeData) {
      setFormError('Resume upload is mandatory.');
      return;
    }

    // Validate all required personal fields
    if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.address) {
      setFormError('All personal details are required.');
      return;
    }

    // Validate education
    if (!formData.degree) {
      setFormError('Degree is required.');
      return;
    }

    // Validate professional
    if (!formData.experience || !formData.skills) {
      setFormError('Experience and skills are required.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        graduationYear: formData.graduationYear ? Number(formData.graduationYear) : null,
        slots
      });
      onClose();
    } catch (error) {
      setFormError(error.message || 'Unable to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Header with back button */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px 40px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <button type="button" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '14px', color: '#fff', padding: '10px 18px', borderRadius: '8px', transition: 'all 0.2s', marginBottom: '20px', fontWeight: '600' }}>
          <FaArrowLeft size={14} />
          Back to Jobs
        </button>
        <h1 style={{ color: '#fff', margin: '0 0 8px', fontSize: '2rem', fontWeight: '800' }}>{job.title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.95)', margin: 0, fontSize: '0.95rem', fontWeight: '400' }}>Complete all sections to submit your application</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        {formError && (
          <div style={{ backgroundColor: '#fee5e5', border: '1px solid #f5a5a5', color: '#c33', padding: '16px 18px', borderRadius: '10px', marginBottom: '28px', display: 'flex', alignItems: 'flex-start', gap: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>⚠️</span>
            <div>
              <strong style={{ display: 'block', marginBottom: '2px' }}>Error:</strong>
              <span style={{ fontSize: '0.9rem' }}>{formError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Section 1: Personal Details */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <FaUser size={18} />
                </div>
                <div>
                  <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.2rem', fontWeight: '700' }}>Personal Details</h2>
                  <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.85rem' }}>Your basic information</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
              <div>
                <label style={labelStyle}>Full Name <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                <input name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                <input name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                <input name="phoneNumber" placeholder="9876543210" value={formData.phoneNumber} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Address <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                <input name="address" placeholder="123 Main Street" value={formData.address} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} style={selectStyle}>
                  <option value="Prefer not to say">Prefer not to say</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              <div>
                <label style={labelStyle}>Password <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                <input name="password" type="password" placeholder="Minimum 8 characters" value={formData.password} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Confirm Password <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                <input name="confirmPassword" type="password" placeholder="Re-enter password" value={formData.confirmPassword} onChange={handleChange} required style={inputStyle} />
              </div>
            </div>
          </section>

          {/* Section 2: Education */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <FaBook size={18} />
                </div>
                <div>
                  <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.2rem', fontWeight: '700' }}>Education</h2>
                  <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.85rem' }}>Your academic background</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
              <div>
                <label style={labelStyle}>Degree <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                <input name="degree" placeholder="e.g., B.Tech in Computer Science" value={formData.degree} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Graduation Year</label>
                <input name="graduationYear" type="number" placeholder="2023" value={formData.graduationYear} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
          </section>

          {/* Section 3: Professional Experience */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <FaBriefcase size={18} />
                </div>
                <div>
                  <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.2rem', fontWeight: '700' }}>Professional Experience</h2>
                  <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.85rem' }}>Your work background</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
              <div>
                <label style={labelStyle}>Experience <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                <input name="experience" placeholder="e.g., 2.5 years" value={formData.experience} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Skills <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                <input name="skills" placeholder="e.g., React, JavaScript, Python" value={formData.skills} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Current Company</label>
                <input name="currentCompany" placeholder="e.g., Tech Corp" value={formData.currentCompany} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Expected Salary</label>
                <input name="expectedSalary" placeholder="e.g., 10-15 LPA" value={formData.expectedSalary} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
          </section>

          {/* Section 4: Documents */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <FaFileAlt size={18} />
                </div>
                <div>
                  <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.2rem', fontWeight: '700' }}>Documents</h2>
                  <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.85rem' }}>Your resume and documents</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <label style={labelStyle}>Resume (PDF, DOC, DOCX) <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
              <div style={{ border: '2px dashed #d1d5db', borderRadius: '12px', padding: '32px 24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', backgroundColor: '#f9fafb', marginTop: '10px' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#667eea'; e.currentTarget.style.backgroundColor = '#e8eaff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} required style={{ display: 'none' }} id="resumeInput" />
                <label htmlFor="resumeInput" style={{ cursor: 'pointer', display: 'block' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📄</div>
                  <p style={{ margin: '0 0 6px', color: '#1a202c', fontWeight: '600', fontSize: '0.95rem' }}>Click to upload or drag and drop</p>
                  <p style={{ margin: 0, color: '#999', fontSize: '0.85rem' }}>PDF, DOC or DOCX (Max 10MB)</p>
                </label>
              </div>
              {formData.resumeName && (
                <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#ecfdf5', color: '#065f46', borderRadius: '8px', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaCheckCircle size={16} />
                  <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{formData.resumeName}</span>
                </div>
              )}
            </div>
          </section>

          {/* Section 5: Cover Letter */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <FaClipboardList size={18} />
                </div>
                <div>
                  <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.2rem', fontWeight: '700' }}>Additional Information</h2>
                  <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.85rem' }}>Tell us more about yourself</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <label style={labelStyle}>Cover Letter</label>
              <textarea name="coverLetter" placeholder="Explain why you're interested in this position and what you can contribute..." value={formData.coverLetter} onChange={handleChange} rows={5} style={{ ...inputStyle, minHeight: '140px', resize: 'vertical', fontFamily: 'inherit' }} />
            </div>
          </section>

          {/* Section 6: Interview Availability */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <FaClock size={18} />
                </div>
                <div>
                  <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.2rem', fontWeight: '700' }}>Interview Availability</h2>
                  <p style={{ margin: '2px 0 0', color: '#666', fontSize: '0.85rem' }}>Select your preferred interview time slots</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '16px', padding: '12px 14px', backgroundColor: '#dbeafe', borderLeft: '4px solid #0284c7', borderRadius: '6px' }}>
              <p style={{ margin: 0, color: '#0c4a6e', fontSize: '0.9rem' }}>
                <strong>Required:</strong> You must select exactly 3 time slots for interviews.
              </p>
            </div>
            
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {slots.map((slot, index) => (
                <div key={index} style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '10px', border: '1.5px solid #e5e7eb', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#667eea'; e.currentTarget.style.backgroundColor = '#f3f4f8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <h3 style={{ margin: 0, color: '#1a202c', fontSize: '0.95rem', fontWeight: '700' }}>Slot {index + 1}</h3>
                    <span style={{ backgroundColor: '#e8eaff', color: '#667eea', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' }}>Preferred Time</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', gap: '14px' }}>
                    <div>
                      <label style={labelStyle}>Date <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                      <input type="date" value={slot.date} onChange={(e) => handleSlotChange(index, 'date', e.target.value)} required style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Start Time <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                      <input type="time" value={slot.startTime} onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)} required style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>End Time <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                      <input type="time" value={slot.endTime} onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)} required style={inputStyle} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid #e5e7eb', marginTop: '28px' }}>
            <button type="button" onClick={onClose} style={{ padding: '12px 32px', border: '2px solid #d1d5db', borderRadius: '10px', background: '#fff', color: '#4b5563', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#999'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = '#fff'; }}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} style={{ padding: '12px 32px', border: 'none', borderRadius: '10px', background: isSubmitting ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '0.95rem', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)', opacity: isSubmitting ? 0.7 : 1 }}
              onMouseEnter={(e) => { !isSubmitting && (e.currentTarget.style.transform = 'translateY(-2px)'); }}
              onMouseLeave={(e) => { !isSubmitting && (e.currentTarget.style.transform = 'translateY(0)'); }}>
              {isSubmitting ? '⏳ Submitting...' : '✓ Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: '#1a202c',
  fontWeight: '600',
  fontSize: '0.9rem'
};

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '8px',
  border: '1.5px solid #e5e7eb',
  boxSizing: 'border-box',
  fontSize: '0.95rem',
  fontFamily: 'inherit',
  transition: 'all 0.2s',
  outline: 'none',
  backgroundColor: '#fff'
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  backgroundSize: '1.2em',
  paddingRight: '32px'
};

const sectionStyle = {
  backgroundColor: '#fff',
  padding: '28px 24px',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  transition: 'all 0.2s'
};

const sectionHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  marginBottom: '0'
};

export default ApplicationForm;