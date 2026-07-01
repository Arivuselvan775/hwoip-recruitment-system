import React, { useState } from 'react';
import { FaArrowLeft, FaUser, FaBook, FaBriefcase, FaFileAlt, FaClipboardList, FaClock } from 'react-icons/fa';

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value;
    setSlots(updatedSlots);
  };

  const addSlot = () => {
    if (slots.length < 10) {
      setSlots((prev) => [...prev, createEmptySlot()]);
    }
  };

  const removeSlot = (index) => {
    if (slots.length > 1) {
      setSlots((prev) => prev.filter((_, slotIndex) => slotIndex !== index));
    }
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

    if (slots.length < 3) {
      setFormError('Please add at least 3 availability slots.');
      return;
    }

    if (slots.length > 10) {
      setFormError('You can add at most 10 availability slots.');
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

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    if (!formData.resumeName || !formData.resumeData) {
      setFormError('Resume upload is mandatory.');
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px 40px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <button type="button" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '16px', color: '#fff', padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s', marginBottom: '16px' }}>
          <FaArrowLeft size={16} />
          Back
        </button>
        <h1 style={{ color: '#fff', margin: '0 0 8px', fontSize: '2rem' }}>{job.title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '1rem' }}>Complete your application to apply for this position</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        {formError && (
          <div style={{ backgroundColor: '#fee', border: '1px solid #fcc', color: '#c33', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <div>
              <strong>Error:</strong> {formError}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Personal Details Section */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <FaUser size={24} style={{ color: '#667eea' }} />
              <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.5rem' }}>Personal Details</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
              <input name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleChange} required style={inputStyle} />
              <input name="email" type="email" placeholder="Email *" value={formData.email} onChange={handleChange} required style={inputStyle} />
              <input name="phoneNumber" placeholder="Phone Number *" value={formData.phoneNumber} onChange={handleChange} required style={inputStyle} />
              <input name="address" placeholder="Address *" value={formData.address} onChange={handleChange} required style={inputStyle} />
              <select name="gender" value={formData.gender} onChange={handleChange} style={selectStyle}>
                <option value="Prefer not to say">Gender - Prefer not to say</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input name="password" type="password" placeholder="Password *" value={formData.password} onChange={handleChange} required style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input name="confirmPassword" type="password" placeholder="Confirm Password *" value={formData.confirmPassword} onChange={handleChange} required style={inputStyle} />
            </div>
          </section>

          {/* Education Section */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <FaBook size={24} style={{ color: '#f59e0b' }} />
              <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.5rem' }}>Education</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
              <input name="degree" placeholder="Degree *" value={formData.degree} onChange={handleChange} required style={inputStyle} />
              <input name="graduationYear" type="number" placeholder="Graduation Year" value={formData.graduationYear} onChange={handleChange} style={inputStyle} />
            </div>
          </section>

          {/* Professional Section */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <FaBriefcase size={24} style={{ color: '#10b981' }} />
              <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.5rem' }}>Professional</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
              <input name="experience" placeholder="Experience *" value={formData.experience} onChange={handleChange} required style={inputStyle} />
              <input name="skills" placeholder="Skills *" value={formData.skills} onChange={handleChange} required style={inputStyle} />
              <input name="currentCompany" placeholder="Current Company" value={formData.currentCompany} onChange={handleChange} style={inputStyle} />
              <input name="expectedSalary" placeholder="Expected Salary" value={formData.expectedSalary} onChange={handleChange} style={inputStyle} />
            </div>
          </section>

          {/* Documents Section */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <FaFileAlt size={24} style={{ color: '#ef4444' }} />
              <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.5rem' }}>Documents</h2>
            </div>
            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', marginBottom: '12px', color: '#4b5563', fontWeight: '500' }}>
                Resume (PDF, DOC, DOCX) *
              </label>
              <div style={{ border: '2px dashed #d1d5db', borderRadius: '8px', padding: '24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} required style={{ display: 'none' }} id="resumeInput" />
                <label htmlFor="resumeInput" style={{ cursor: 'pointer', display: 'block' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📄</div>
                  <p style={{ margin: '0 0 4px', color: '#4b5563' }}>Click to upload or drag and drop</p>
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.875rem' }}>PDF, DOC or DOCX (Max 10MB)</p>
                </label>
              </div>
              {formData.resumeName && (
                <p style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '6px' }}>
                  ✓ {formData.resumeName}
                </p>
              )}
            </div>
          </section>

          {/* Additional Section */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <FaClipboardList size={24} style={{ color: '#8b5cf6' }} />
              <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.5rem' }}>Additional Information</h2>
            </div>
            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', marginBottom: '12px', color: '#4b5563', fontWeight: '500' }}>
                Cover Letter
              </label>
              <textarea name="coverLetter" placeholder="Tell us why you're interested in this position..." value={formData.coverLetter} onChange={handleChange} rows={5} style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} />
            </div>
          </section>

          {/* Availability Slots Section */}
          <section style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <FaClock size={24} style={{ color: '#06b6d4' }} />
              <h2 style={{ margin: '0', color: '#1a202c', fontSize: '1.5rem' }}>Interview Availability</h2>
              <span style={{ marginLeft: 'auto', backgroundColor: '#e0e7ff', color: '#667eea', padding: '4px 12px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: '500' }}>
                {slots.length}/10 slots
              </span>
            </div>
            <p style={{ marginTop: '12px', color: '#6b7280', fontSize: '0.875rem' }}>Select at least 3 and at most 10 time slots when you're available for an interview</p>
            
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {slots.map((slot, index) => (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 80px', gap: '12px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb', alignItems: 'center' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Date</label>
                    <input type="date" value={slot.date} onChange={(event) => handleSlotChange(index, 'date', event.target.value)} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Start Time</label>
                    <input type="time" value={slot.startTime} onChange={(event) => handleSlotChange(index, 'startTime', event.target.value)} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block', marginBottom: '4px' }}>End Time</label>
                    <input type="time" value={slot.endTime} onChange={(event) => handleSlotChange(index, 'endTime', event.target.value)} required style={inputStyle} />
                  </div>
                  <button type="button" onClick={() => removeSlot(index)} style={{ padding: '8px 12px', border: '1px solid #fca5a5', borderRadius: '6px', background: '#fee', color: '#dc2626', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button type="button" onClick={addSlot} disabled={slots.length >= 10} style={{ marginTop: '16px', padding: '12px 20px', border: '2px dashed #d1d5db', borderRadius: '8px', background: '#fff', color: '#667eea', cursor: slots.length >= 10 ? 'not-allowed' : 'pointer', fontWeight: '500', transition: 'all 0.2s', opacity: slots.length >= 10 ? 0.5 : 1 }}>
              + Add Another Slot
            </button>
          </section>

          {/* Submit Button */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '20px' }}>
            <button type="button" onClick={onClose} style={{ padding: '12px 32px', border: '2px solid #d1d5db', borderRadius: '8px', background: '#fff', color: '#4b5563', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', transition: 'all 0.2s' }}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} style={{ padding: '12px 32px', border: 'none', borderRadius: '8px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: '600', transition: 'all 0.2s', opacity: isSubmitting ? 0.7 : 1, boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)' }}>
              {isSubmitting ? '⏳ Submitting...' : '✓ Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '8px',
  border: '1.5px solid #e5e7eb',
  boxSizing: 'border-box',
  fontSize: '1rem',
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
  paddingRight: '36px'
};

const sectionStyle = {
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
};

const sectionHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
};

export default ApplicationForm;