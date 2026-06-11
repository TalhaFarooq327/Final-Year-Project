import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import AuthIllustration from '../components/AuthIllustration';
import './Register.css';

/* ─── Password strength helper ─── */
const getStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8)              score++;
  if (/[A-Z]/.test(pw))           score++;
  if (/[0-9]/.test(pw))           score++;
  if (/[^A-Za-z0-9]/.test(pw))   score++;
  const map = [
    { label: 'Too short',  color: '#FC8181' },
    { label: 'Weak',       color: '#F6AD55' },
    { label: 'Fair',       color: '#F6E05E' },
    { label: 'Good',       color: '#68D391' },
    { label: 'Strong',     color: '#38A169' },
  ];
  return { score, ...map[score] };
};

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors]       = useState({});
  const [showPass, setShowPass]   = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [terms, setTerms]         = useState(false);
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [apiError, setApiError]   = useState('');

  const strength = getStrength(formData.password);

  /* ─── Validation ─── */
  const validate = () => {
    const e = {};
    if (!formData.fullName.trim())
      e.fullName = 'Full name is required.';
    if (!formData.email.trim())
      e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = 'Please enter a valid email address.';
    if (!formData.password)
      e.password = 'Password is required.';
    else if (formData.password.length < 8)
      e.password = 'Password must be at least 8 characters.';
    if (!formData.confirmPassword)
      e.confirmPassword = 'Please confirm your password.';
    else if (formData.password !== formData.confirmPassword)
      e.confirmPassword = 'Passwords do not match.';
    if (!terms)
      e.terms = 'You must accept the Terms and Conditions.';
    return e;
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    setApiError('');
  };

  /* ─── Submit ─── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setApiError('');

    /* TODO: replace with real Flask API call
       const res = await fetch('/api/auth/register', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           full_name: formData.fullName,
           email:     formData.email,
           password:  formData.password,
         }),
       });
       const data = await res.json();
       if (!res.ok) { setApiError(data.message); setLoading(false); return; }
    */

    await new Promise(r => setTimeout(r, 1800)); // simulate network
    setLoading(false);
    setSuccess(true);
    login('user'); // auto-login after registration
    setTimeout(() => navigate('/dashboard'), 2800);
  };

  /* ─── Success Screen ─── */
  if (success) {
    return (
      <div className="auth-page register-page">
        <div className="auth-success-screen">
          <div className="auth-success-card">
            <div className="auth-success-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="#38A169" fillOpacity="0.12" stroke="#38A169" strokeWidth="1.5"/>
                <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#38A169" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="auth-success-ring auth-success-ring--1"></div>
              <div className="auth-success-ring auth-success-ring--2"></div>
            </div>
            <h2 className="auth-success-title">Account Created!</h2>
            <p className="auth-success-desc">
              Welcome to Psoriasis AI, <strong>{formData.fullName.split(' ')[0]}</strong>!<br />
              Redirecting you to sign in…
            </p>
            <div className="auth-success-progress">
              <div className="auth-success-progress__bar"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Registration Form ─── */
  return (
    <div className="auth-page register-page">
      {/* ── Left Panel ── */}
      <div className="auth-panel auth-panel--left auth-panel--green">
        <div className="auth-panel__inner">
          <AuthIllustration variant="register" />

          <div className="auth-panel__copy">
            <h1 className="auth-panel__title">Join Psoriasis AI</h1>
            <p className="auth-panel__desc">
              Create an account to track your psoriasis assessments and access your full analysis history.
            </p>
          </div>

          <div className="auth-panel__badges">
            <span className="auth-badge"><span className="auth-badge__dot auth-badge__dot--green"></span>Free to Start</span>
            <span className="auth-badge"><span className="auth-badge__dot auth-badge__dot--blue"></span>AI-Powered Reports</span>
            <span className="auth-badge"><span className="auth-badge__dot auth-badge__dot--teal"></span>Dermatologist Insights</span>
          </div>
        </div>
        <div className="auth-blob auth-blob--1" aria-hidden="true"></div>
        <div className="auth-blob auth-blob--2" aria-hidden="true"></div>
      </div>

      {/* ── Right Panel ── */}
      <div className="auth-panel auth-panel--right">
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Create Account</h2>
            <p className="auth-form-sub">Start your skin health journey today</p>
          </div>

          {apiError && (
            <div className="auth-alert auth-alert--error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              {apiError}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <FormInput
              id="reg-fullname"
              label="Full Name"
              type="text"
              value={formData.fullName}
              onChange={handleChange('fullName')}
              error={errors.fullName}
              placeholder="Dr. Jane Doe"
              autoComplete="name"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/></svg>
              }
            />

            <FormInput
              id="reg-email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              error={errors.email}
              placeholder="you@example.com"
              autoComplete="email"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              }
            />

            <div className="form-field-group">
              <FormInput
                id="reg-password"
                label="Password"
                type={showPass ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange('password')}
                error={errors.password}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="1.8"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                }
                suffix={
                  <button type="button" className="input-toggle-btn" onClick={() => setShowPass(p => !p)} aria-label={showPass ? 'Hide' : 'Show'}>
                    {showPass
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>
                    }
                  </button>
                }
              />
              {/* Password Strength Meter */}
              {formData.password && (
                <div className="pw-strength">
                  <div className="pw-strength__bars">
                    {[1,2,3,4].map(i => (
                      <div
                        key={i}
                        className="pw-strength__bar"
                        style={{ background: i <= strength.score ? strength.color : '#E2E8F0' }}
                      />
                    ))}
                  </div>
                  <span className="pw-strength__label" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            <FormInput
              id="reg-confirm-password"
              label="Confirm Password"
              type={showConf ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              }
              suffix={
                <button type="button" className="input-toggle-btn" onClick={() => setShowConf(p => !p)} aria-label={showConf ? 'Hide' : 'Show'}>
                  {showConf
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>
                  }
                </button>
              }
            />

            {/* Terms checkbox */}
            <div>
              <label className="auth-checkbox" htmlFor="reg-terms">
                <input
                  type="checkbox"
                  id="reg-terms"
                  checked={terms}
                  onChange={e => { setTerms(e.target.checked); if (errors.terms) setErrors(p => ({...p, terms:''})); }}
                />
                <span className="auth-checkbox__box"></span>
                <span className="auth-checkbox__label">
                  I agree to the{' '}
                  <a href="#terms" className="auth-switch-link">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#privacy" className="auth-switch-link">Privacy Policy</a>
                </span>
              </label>
              {errors.terms && <p className="form-error-msg" style={{ marginTop: 6 }}>{errors.terms}</p>}
            </div>

            <button
              type="submit"
              className={`auth-btn auth-btn--register ${loading ? 'auth-btn--loading' : ''}`}
              disabled={loading}
              id="register-submit-btn"
            >
              {loading
                ? <><span className="auth-spinner auth-spinner--green"></span>Creating account…</>
                : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/><line x1="19" y1="8" x2="19" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="22" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>Create Account</>
              }
            </button>
          </form>

          <p className="auth-switch-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-switch-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
