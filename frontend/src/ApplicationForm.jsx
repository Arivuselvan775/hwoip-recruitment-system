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
      {/* Header with back button - Reduced padding for compactness */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '16px 40px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ color: '#fff', margin: '0 0 4px', fontSize: '1.6rem', fontWeight: '800' }}>{job.title}</h1>
            <p style={{ color: 'rgba(255,255,255,0.95)', margin: 0, fontSize: '0.85rem', fontWeight: '400' }}>Complete all sections to submit your application</p>
          </div>
          <button type="button" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '13px', color: '#fff', padding: '8px 14px', borderRadius: '6px', transition: 'all 0.2s', fontWeight: '600' }}>
            <FaArrowLeft size={12} />
            Back to Jobs
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '950px', margin: '0 auto', padding: '20px 20px' }}>
        {formError && (
          <div style={{ backgroundColor: '#fee5e5', border: '1px solid #f5a5a5', color: '#c33', padding: '12px 14px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '16px', marginTop: '2px', flexShrink: 0 }}>⚠️</span>
            <div>
              <strong style={{ display: 'block', marginBottom: '2px', fontSize: '0.9rem' }}>Error:</strong>
              <span style={{ fontSize: '0.85rem' }}>{formError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Section 1: Personal Details */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                <FaUser size={14} />
              </div>
              <div>
                <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.05rem', fontWeight: '700' }}>Personal Details</h2>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              {/* Row 1 */}
              <div style={compactRowStyle}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Full Name <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                  <input name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Email <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                  <input name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Phone Number <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                  <input name="phoneNumber" placeholder="9876543210" value={formData.phoneNumber} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>

              {/* Row 2 */}
              <div style={compactRowStyle}>
                <div style={{ flex: 2 }}>
                  <label style={labelStyle}>Address <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                  <input name="address" placeholder="123 Main Street" value={formData.address} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} style={selectStyle}>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 3 - Passwords */}
              <div style={compactRowStyle}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Password <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                  <input name="password" type="password" placeholder="Minimum 8 characters" value={formData.password} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Confirm Password <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                  <input name="confirmPassword" type="password" placeholder="Re-enter password" value={formData.confirmPassword} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Education */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                <FaBook size={14} />
              </div>
              <div>
                <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.05rem', fontWeight: '700' }}>Education</h2>
              </div>
            </div>
            
            <div style={{ ...compactRowStyle, marginTop: '12px' }}>
              <div style={{ flex: 2 }}>
                <label style={labelStyle}>Degree <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                <input name="degree" placeholder="e.g., B.Tech in Computer Science" value={formData.degree} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Graduation Year</label>
                <input name="graduationYear" type="number" placeholder="2023" value={formData.graduationYear} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
          </section>

          {/* Section 3: Professional Experience */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                <FaBriefcase size={14} />
              </div>
              <div>
                <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.05rem', fontWeight: '700' }}>Professional Experience</h2>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              <div style={compactRowStyle}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Experience <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                  <input name="experience" placeholder="e.g., 2.5 years" value={formData.experience} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Skills <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                  <input name="skills" placeholder="e.g., React, JavaScript, Python" value={formData.skills} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>
              <div style={compactRowStyle}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Current Company</label>
                  <input name="currentCompany" placeholder="e.g., Tech Corp" value={formData.currentCompany} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Expected Salary</label>
                  <input name="expectedSalary" placeholder="e.g., 10-15 LPA" value={formData.expectedSalary} onChange={handleChange} style={inputStyle} />
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 & 5: Documents & Cover Letter (Merged side-by-side for extreme compactness) */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <section style={{ ...sectionStyle, flex: 1, minWidth: '300px' }}>
              <div style={sectionHeaderStyle}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                  <FaFileAlt size={14} />
                </div>
                <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.05rem', fontWeight: '700' }}>Documents</h2>
              </div>
              <div style={{ marginTop: '12px' }}>
                <label style={labelStyle}>Resume (PDF, DOC, DOCX) <span style={{ color: '#ef4444', fontWeight: '700' }}>*</span></label>
                <div style={{ border: '2px dashed #d1d5db', borderRadius: '8px', padding: '16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', backgroundColor: '#f9fafb', marginTop: '6px' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#667eea'; e.currentTarget.style.backgroundColor = '#e8eaff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} required style={{ display: 'none' }} id="resumeInput" />
                  <label htmlFor="resumeInput" style={{ cursor: 'pointer', display: 'block' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>📄</div>
                    <p style={{ margin: '0 0 2px', color: '#1a202c', fontWeight: '600', fontSize: '0.85rem' }}>Click to upload or drag & drop</p>
                  </label>
                </div>
                {formData.resumeName && (
                  <div style={{ marginTop: '8px', padding: '6px 12px', backgroundColor: '#ecfdf5', color: '#065f46', borderRadius: '6px', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaCheckCircle size={14} />
                    <span style={{ fontWeight: '500', fontSize: '0.8rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{formData.resumeName}</span>
                  </div>
                )}
              </div>
            </section>

            <section style={{ ...sectionStyle, flex: 1, minWidth: '300px' }}>
              <div style={sectionHeaderStyle}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                  <FaClipboardList size={14} />
                </div>
                <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.05rem', fontWeight: '700' }}>Additional Info</h2>
              </div>
              <div style={{ marginTop: '12px' }}>
                <label style={labelStyle}>Cover Letter</label>
                <textarea name="coverLetter" placeholder="Why you're interested..." value={formData.coverLetter} onChange={handleChange} rows={3} style={{ ...inputStyle, minHeight: '68px', resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
            </section>
          </div>

          {/* Section 6: Interview Availability - High Compact Slot Selection Row Layout */}
          <section style={sectionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', wrap: 'wrap', gap: '8px' }}>
              <div style={sectionHeaderStyle}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                  <FaClock size={14} />
                </div>
                <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.05rem', fontWeight: '700' }}>Interview Availability</h2>
              </div>
              <div style={{ padding: '6px 10px', backgroundColor: '#dbeafe', borderLeft: '3px solid #0284c7', borderRadius: '4px' }}>
                <p style={{ margin: 0, color: '#0c4a6e', fontSize: '0.8rem' }}>
                  <strong>Required:</strong> Select exactly 3 slots.
                </p>
              </div>
            </div>
            
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {slots.map((slot, index) => (
                <div key={index} style={{ padding: '8px 14px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#667eea'; e.currentTarget.style.backgroundColor = '#f3f4f8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}>
                  
                  <div style={{ minWidth: '70px' }}>
                    <h3 style={{ margin: 0, color: '#1a202c', fontSize: '0.85rem', fontWeight: '700' }}>Slot {index + 1}</h3>
                  </div>

                  {/* Compact Inputs in a single continuous row */}
                  <div style={{ display: 'flex', flex: 1, gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: 2, minWidth: '130px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: '600' }}>Date:</span>
                      <input type="date" value={slot.date} onChange={(e) => handleSlotChange(index, 'date', e.target.value)} required style={{ ...inputStyle, padding: '6px 10px' }} />
                    </div>
                    <div style={{ flex: 1.5, minWidth: '100px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: '600' }}>Start:</span>
                      <input type="time" value={slot.startTime} onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)} required style={{ ...inputStyle, padding: '6px 10px' }} />
                    </div>
                    <div style={{ flex: 1.5, minWidth: '100px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: '600' }}>End:</span>
                      <input type="time" value={slot.endTime} onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)} required style={{ ...inputStyle, padding: '6px 10px' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid #e5e7eb', marginTop: '12px' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 24px', border: '1.5px solid #d1d5db', borderRadius: '8px', background: '#fff', color: '#4b5563', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#999'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = '#fff'; }}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} style={{ padding: '8px 24px', border: 'none', borderRadius: '8px', background: isSubmitting ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? '⏳ Submitting...' : '✓ Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Compact style updates
const labelStyle = {
  display: 'block',
  marginBottom: '4px',
  color: '#4a5568',
  fontWeight: '600',
  fontSize: '0.8rem'
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1.5px solid #e5e7eb',
  boxSizing: 'border-box',
  fontSize: '0.88rem',
  fontFamily: 'inherit',
  transition: 'all 0.2s',
  outline: 'none',
  backgroundColor: '#fff'
};

const compactRowStyle = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap'
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
  backgroundSize: '1rem',
  paddingRight: '28px'
};

const sectionStyle = {
  backgroundColor: '#fff',
  padding: '16px 20px',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
};

const sectionHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '4px'
};

export default ApplicationForm;