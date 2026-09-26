import React, { useState } from 'react';
import {
  LogIn,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  RefreshCw,
  Sparkles,
  Phone,
} from 'lucide-react';
import { AuthService, TeamService } from '../../services/registrationService';
import { setActiveParticipant, setPurchasedPass } from '../../services/sessionService';

export const LoginModal = ({ isOpen, onClose, onLoginSuccess, onRegisterClick }) => {
  // Mode: 'login' | 'forgot_email' | 'forgot_code' | 'forgot_success'
  const [mode, setMode] = useState('login');

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [devOtpHint, setDevOtpHint] = useState(null);

  if (!isOpen) return null;

  // Handle standard login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your Registered Email, Phone, or Registration ID.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await AuthService.login(identifier, password);
      if (res.success && res.user) {
        setActiveParticipant(res.user);
        setPurchasedPass(res.user);
        setLoading(false);
        onLoginSuccess(res.user);
        onClose();
      } else {
        setLoading(false);
        setError(res.error || 'Invalid credentials. If you forgot your password, click below.');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Lookup error. Please check your connection.');
    }
  };

  // Handle sending OTP email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    const cleanEmail = forgotEmail.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please enter a valid registered email address.');
      return;
    }

    setLoading(true);
    setError(null);
    setDevOtpHint(null);

    try {
      const res = await AuthService.sendOtp(cleanEmail);
      setLoading(false);
      if (res.success) {
        setSuccessMsg(res.message);
        if (res.otp) {
          setDevOtpHint(res.otp); // Convenient test hint for developer
        }
        setMode('forgot_code');
      } else {
        setError(res.error || 'Failed to send verification code.');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Error sending code.');
    }
  };

  // Handle verifying OTP & logging in
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await AuthService.verifyOtp(forgotEmail, otpCode);
      if (res.success && res.user) {
        // If user entered a new password, save it
        if (newPassword.trim()) {
          AuthService.resetPassword(forgotEmail, newPassword.trim());
          res.user.password = newPassword.trim();
        }

        // Set active session
        setActiveParticipant(res.user);
        setPurchasedPass(res.user);
        setLoading(false);
        onLoginSuccess(res.user);
        onClose();
      } else {
        setLoading(false);
        setError(res.error || 'Invalid verification code.');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Verification failed.');
    }
  };

  const resetAll = () => {
    setMode('login');
    setError(null);
    setSuccessMsg(null);
    setDevOtpHint(null);
    setPassword('');
    setOtpCode('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{
          maxWidth: '480px',
          padding: 'clamp(24px, 4vw, 38px)',
          background: 'rgba(8, 12, 20, 0.95)',
          backdropFilter: 'blur(28px)',
          border: '1.5px solid rgba(223, 238, 203, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(223, 238, 203, 0.12)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(223, 238, 203, 0.2) 0%, rgba(27, 59, 111, 0.35) 100%)',
                border: '1px solid rgba(223, 238, 203, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(223, 238, 203, 0.15)',
              }}
            >
              {mode === 'login' ? <LogIn size={20} color="#dfeecb" /> : <KeyRound size={20} color="#dfeecb" />}
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: '#ffffff', margin: 0, letterSpacing: '0.03em' }}>
                {mode === 'login' ? 'DELEGATE LOGIN' : 'PASSWORD RECOVERY'}
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#dfeecb', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {mode === 'login' ? 'FOUNDRIX 2026 • ATTENDEE PORTAL' : 'EMAIL VERIFICATION CODE'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              resetAll();
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            ✕
          </button>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '8px',
              marginBottom: '18px',
              fontSize: '0.84rem',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        {/* Global Success Banner */}
        {successMsg && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '8px',
              marginBottom: '18px',
              fontSize: '0.84rem',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#6ee7b7',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
            }}
          >
            <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 1: REGULAR LOGIN FORM */}
        {/* ========================================================================= */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                EMAIL, PHONE OR REGISTRATION ID *
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. rahul@gmail.com or 9876543210 or FDX-101"
                autoFocus
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(223, 238, 203, 0.22)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#dfeecb';
                  e.target.style.boxShadow = '0 0 15px rgba(223, 238, 203, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(223, 238, 203, 0.22)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                  PASSWORD *
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setSuccessMsg(null);
                    setForgotEmail(identifier.includes('@') ? identifier : '');
                    setMode('forgot_email');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dfeecb',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(223, 238, 203, 0.22)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#dfeecb';
                  e.target.style.boxShadow = '0 0 15px rgba(223, 238, 203, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(223, 238, 203, 0.22)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '22px', lineHeight: '1.4' }}>
              First time logging in? If you did not set a password during registration, click <strong style={{ color: '#dfeecb' }}>Forgot Password</strong> to verify via email code.
            </span>

            {/* Radiant Champagne-Mint Login Button (Zero Blue, Pops Luxuriously) */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '16px',
                backgroundColor: '#dfeecb',
                color: '#060709',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.94rem',
                fontWeight: '900',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 25px rgba(223, 238, 203, 0.45)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#edf7e2';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(223, 238, 203, 0.7)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dfeecb';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(223, 238, 203, 0.45)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span>{loading ? 'VERIFYING...' : 'LOGIN TO DASHBOARD'}</span>
              <ArrowRight size={16} color="#060709" />
            </button>

            <div
              style={{
                textAlign: 'center',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Don't have a delegate pass yet?
              </span>
              <br />
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRegisterClick();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dfeecb',
                  fontWeight: '700',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  marginTop: '6px',
                  textDecoration: 'underline',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>Register for ₹799 Pass Now</span>
                <ArrowRight size={14} color="#dfeecb" />
              </button>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: FORGOT PASSWORD - STEP 1 (ENTER EMAIL) */}
        {/* ========================================================================= */}
        {mode === 'forgot_email' && (
          <form onSubmit={handleSendOtp}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '20px' }}>
              Enter the <strong>Gmail / Email address</strong> you used during your ₹799 pass registration. We will send a 6-digit verification code to log you in.
            </p>

            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                REGISTERED EMAIL ADDRESS *
              </label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="e.g. yourname@gmail.com"
                autoFocus
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(223, 238, 203, 0.22)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#dfeecb';
                  e.target.style.boxShadow = '0 0 15px rgba(223, 238, 203, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(223, 238, 203, 0.22)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '14px',
                backgroundColor: '#dfeecb',
                color: '#060709',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.94rem',
                fontWeight: '900',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 25px rgba(223, 238, 203, 0.45)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#edf7e2';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(223, 238, 203, 0.7)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dfeecb';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(223, 238, 203, 0.45)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span>{loading ? 'SENDING CODE...' : 'SEND VERIFICATION CODE'}</span>
              <Mail size={16} color="#060709" />
            </button>

            <button
              type="button"
              onClick={() => {
                setError(null);
                setMode('login');
              }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <ArrowLeft size={14} />
              <span>Back to Login</span>
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: FORGOT PASSWORD - STEP 2 (ENTER 6-DIGIT CODE) */}
        {/* ========================================================================= */}
        {mode === 'forgot_code' && (
          <form onSubmit={handleVerifyOtp}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: '1.5', marginBottom: '16px' }}>
              We dispatched a 6-digit code to <strong style={{ color: '#dfeecb' }}>{forgotEmail}</strong>. Please enter the code below to verify your account.
            </p>

            {devOtpHint && (
              <div
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(223, 238, 203, 0.08)',
                  border: '1px dashed rgba(223, 238, 203, 0.4)',
                  color: '#dfeecb',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>Preview Code: <strong>{devOtpHint}</strong></span>
                <button
                  type="button"
                  onClick={() => setOtpCode(devOtpHint)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dfeecb',
                    fontSize: '0.74rem',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Auto-Fill
                </button>
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                6-DIGIT VERIFICATION CODE *
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="• • • • • •"
                autoFocus
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(223, 238, 203, 0.04)',
                  border: '1.5px solid rgba(223, 238, 203, 0.4)',
                  color: '#dfeecb',
                  fontSize: '1.4rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.35em',
                  textAlign: 'center',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#dfeecb';
                  e.target.style.boxShadow = '0 0 20px rgba(223, 238, 203, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(223, 238, 203, 0.4)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                NEW PASSWORD (OPTIONAL)
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Set new password (optional)"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#dfeecb';
                  e.target.style.boxShadow = '0 0 15px rgba(223, 238, 203, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '14px',
                backgroundColor: '#dfeecb',
                color: '#060709',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.94rem',
                fontWeight: '900',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 25px rgba(223, 238, 203, 0.45)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#edf7e2';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(223, 238, 203, 0.7)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dfeecb';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(223, 238, 203, 0.45)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span>{loading ? 'VERIFYING...' : 'VERIFY & ACCESS DASHBOARD'}</span>
              <ArrowRight size={16} color="#060709" />
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setMode('forgot_email')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <ArrowLeft size={13} />
                <span>Change Email</span>
              </button>

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dfeecb',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'underline',
                }}
              >
                <RefreshCw size={12} color="#dfeecb" />
                <span>Resend Code</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
