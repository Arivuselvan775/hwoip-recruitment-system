import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthPage from './AuthPage';
import ApplicationForm from './ApplicationForm';
import CandidateDashboard from './CandidateDashboard';

const roleOptions = [
  { value: 'DELIVERY_HEAD', label: 'Delivery Head' },
  { value: 'HR_EXECUTIVE', label: 'HR Executive' },
  { value: 'HR_MANAGER', label: 'HR Manager' },
  { value: 'OPERATIONS_MANAGER', label: 'Operations Manager' },
  { value: 'TRAINER', label: 'Trainer' },
  { value: 'MANAGEMENT', label: 'Management' },
  { value: 'SYSTEM_ADMINISTRATOR', label: 'System Administrator' }
];

function App() {
  // Page refresh analum state maintain aaga localStorage initialize pandrom
  const [view, setView] = useState(() => localStorage.getItem('app_view') || 'auth');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [authForm, setAuthForm] = useState({ usernameOrEmail: '', password: '', role: 'DELIVERY_HEAD' });
  const [authError, setAuthError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [candidateUser, setCandidateUser] = useState(() => {
    const savedUser = localStorage.getItem('candidate_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // State maarumpothu localstorage-il update seiyum side-effects
  useEffect(() => {
    localStorage.setItem('app_view', view);
  }, [view]);

  useEffect(() => {
    if (candidateUser) {
      localStorage.setItem('candidate_user', JSON.stringify(candidateUser));
    } else {
      localStorage.removeItem('candidate_user');
    }
  }, [candidateUser]);

  // Public Jobs load panna
  useEffect(() => {
    const loadJobs = async () => {
      setJobsLoading(true);
      try {
        const response = await axios.get(`${apiBaseUrl}/api/jobs`);
        const payloadJobs = response.data?.jobs || [];
        setJobs(payloadJobs);
      } catch (error) {
        console.error("Failed to load jobs:", error);
        setJobs([]);
      } finally {
        setJobsLoading(false);
      }
    };
    loadJobs();
  }, [apiBaseUrl]);

  // Candidate login aanavudan allathu page refresh aanavudan applied jobs-ai real-time-il fetch seiyum logic
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (candidateUser && candidateUser.id) {
        try {
          const response = await axios.get(`${apiBaseUrl}/api/candidates/${candidateUser.id}/applications`);
          setAppliedJobs(response.data.applied_jobs || []);
        } catch (error) {
          console.error("Error fetching applied jobs:", error);
        }
      }
    };
    fetchAppliedJobs();
  }, [candidateUser, apiBaseUrl]);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setView('form');
    setAuthError('');
    setSuccessMessage('');
  };

  const handleAuthChange = (event) => {
    const { name, value } = event.target;
    setAuthForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setAuthError('');
    setSuccessMessage('');

    try {
      const response = await axios.post(`${apiBaseUrl}/api/auth/login`, {
        username_or_email: authForm.usernameOrEmail,
        password: authForm.password
      });

      const user = response.data.user;
      const roleLabel = user.role.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

      if (user.role === 'CANDIDATE') {
        setCandidateUser(user);
        setView('dashboard');
        setSuccessMessage(`Signed in successfully as ${roleLabel}.`);
      } else {
        setSuccessMessage(`Signed in successfully as ${roleLabel}.`);
        setView('auth');
      }
    } catch (error) {
      setAuthError(error.response?.data?.detail || 'Sign in failed.');
      setSuccessMessage('');
    }
  };

  const handleApplicationSubmit = async (payload) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/applications/submit`, {
        ...payload,
        jobTitle: selectedJob.title,
        department: selectedJob.dept,
        experienceRequired: selectedJob.exp,
        salaryRange: selectedJob.salary,
        location: selectedJob.location,
        employmentType: selectedJob.type,
        skillsRequired: selectedJob.skills,
        fullJobDescription: selectedJob.jd
      });

      // Submit aanathum fresh list-ai back-end-il irunthu automatic-ah pull panna fetch-i handle pannum
      setSelectedJob(null);
      setView('auth');
      setAuthForm({ usernameOrEmail: payload.email, password: payload.password, role: 'DELIVERY_HEAD' });
      setSuccessMessage(response.data.message || 'Job application submitted successfully.');
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Unable to submit application.');
    }
  };

  // Sign out method candidate dashboard refresh validation-ku easy-ah erukum
  const handleSignOut = () => {
    setCandidateUser(null);
    setAppliedJobs([]);
    setView('auth');
    localStorage.clear();
  };

  return (
    <div>
      {view === 'auth' ? (
        <AuthPage
          jobs={jobs}
          onApplyClick={handleApplyClick}
          authForm={authForm}
          onAuthChange={handleAuthChange}
          onSignIn={handleSignIn}
          authError={authError}
          successMessage={successMessage}
          roleOptions={roleOptions}
        />
      ) : view === 'form' && selectedJob ? (
        <ApplicationForm job={selectedJob} onClose={() => { setSelectedJob(null); setView('auth'); }} onSubmit={handleApplicationSubmit} />
      ) : (
        <CandidateDashboard candidateUser={candidateUser} appliedJobs={appliedJobs} ongoingJobs={jobs} onSignOut={handleSignOut} />
      )}
    </div>
  );
}

export default App;