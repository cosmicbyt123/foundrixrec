import React, { useState, useEffect } from 'react';
import { Copy, Check, Upload, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, FileText, Phone, Sparkles, PartyPopper, MessageCircle, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONFIG } from '../../config/environment';
import { validateRegistrationForm, validatePaymentProof, submitRegistration } from '../../services/registrationService';
import {
  getPurchasedPass,
  setPurchasedPass,
  clearPurchasedPass,
  setActiveParticipant,
} from '../../services/sessionService';

/**
 * Grand Celebration Birthday Cracker / Fireworks Cannon Engine
 * Multi-stage synchronized party crackers, starburst explosions, and cascading confetti rain
 */
export const triggerCelebrationCrackers = () => {
  try {
    // Stage 1: Dual corner birthday party poppers firing simultaneously
    confetti({
      particleCount: 95,
      angle: 60,
      spread: 70,
      origin: { x: 0.1, y: 0.85 },
      colors: ['#00f0ff', '#146ef5', '#fbbf24', '#f43f5e', '#a855f7', '#10b981'],
      startVelocity: 55,
      ticks: 250,
    });
    confetti({
      particleCount: 95,
      angle: 120,
      spread: 70,
      origin: { x: 0.9, y: 0.85 },
      colors: ['#00f0ff', '#146ef5', '#fbbf24', '#f43f5e', '#a855f7', '#10b981'],
      startVelocity: 55,
      ticks: 250,
    });

    // Stage 2: Central starburst cracker fireworks explosion
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 110,
        origin: { x: 0.5, y: 0.4 },
        shapes: ['star', 'circle'],
        colors: ['#fbbf24', '#f59e0b', '#00f0ff', '#10b981', '#ffffff'],
        scalar: 1.25,
        startVelocity: 48,
        ticks: 280,
      });
    }, 280);

    // Stage 3: Second volley of angled corner cannons
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 50,
        spread: 80,
        origin: { x: 0.15, y: 0.8 },
        colors: ['#00f0ff', '#10b981', '#fbbf24', '#ec4899', '#ffffff'],
        startVelocity: 60,
        ticks: 250,
      });
      confetti({
        particleCount: 80,
        angle: 130,
        spread: 80,
        origin: { x: 0.85, y: 0.8 },
        colors: ['#00f0ff', '#10b981', '#fbbf24', '#ec4899', '#ffffff'],
        startVelocity: 60,
        ticks: 250,
      });
    }, 650);

    // Stage 4: Cascading festive golden stars falling from top
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 140,
        origin: { x: 0.5, y: 0.12 },
        shapes: ['star'],
        colors: ['#fbbf24', '#ffffff', '#00f0ff'],
        scalar: 1.15,
        ticks: 360,
        gravity: 0.75,
      });
    }, 1200);
  } catch (err) {
    console.error('Celebration cracker error:', err);
  }
};

export const RegistrationModal = ({ isOpen, onClose, onOpenHackathonHub }) => {
  const [step, setStep] = useState(1); // 1: Student Details, 2: UPI Payment, 3: Proof & Submit, 4: Confirmation
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);
  const [existingPass, setExistingPass] = useState(() => getPurchasedPass());

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    college: 'Raghu Engineering College',
    branch: '',
    year: '3rd Year',
    location: 'Visakhapatnam',
    phone: '',
    email: '',
  });

  // Payment Proof State
  const [proofData, setProofData] = useState({
    utr: '',
    screenshot: null,
    previewUrl: '',
  });

  // Check persistent 3-week session when modal opens
  useEffect(() => {
    if (isOpen) {
      const pass = getPurchasedPass();
      setExistingPass(pass);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Step 1 -> Step 2
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    const validation = validateRegistrationForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  // Step 2 -> Step 3
  const handleProceedToProof = () => {
    setStep(3);
  };

  // File Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, screenshot: 'File size exceeds 5 MB limit.' });
        return;
      }
      setErrors({ ...errors, screenshot: null });
      const previewUrl = URL.createObjectURL(file);
      setProofData({ ...proofData, screenshot: file, previewUrl });
    }
  };

  // Step 3 -> Submit
  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    const validation = validatePaymentProof(proofData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const fullData = {
        ...formData,
        utr: proofData.utr,
        screenshot: proofData.screenshot,
      };

      const result = await submitRegistration(fullData);
      setSubmitting(false);

      if (result.success) {
        const fullPassData = {
          ...result.data,
          name: formData.name,
          phone: formData.phone,
          college: formData.college,
          branch: formData.branch,
          year: formData.year,
          location: formData.location,
          roll: formData.roll,
          utr: proofData.utr,
          purchasedAt: new Date().toISOString(),
        };

        // Persist in 3-week browser session & cookies
        setPurchasedPass(fullPassData);
        setActiveParticipant(fullPassData);
        setExistingPass(fullPassData);
        setSubmissionResult(fullPassData);
        setStep(4);
        triggerCelebrationCrackers();
      } else {
        setErrors({ submit: result.error || 'Failed to submit registration. Please try again.' });
      }
    } catch (err) {
      setSubmitting(false);
      setErrors({ submit: err.message || 'An unexpected error occurred.' });
    }
  };

  // Auto-fire celebration cracker burst when Step 4 mounts
  useEffect(() => {
    if (step === 4) {
      triggerCelebrationCrackers();
    }
  }, [step]);

  const copyUpiId = () => {
    navigator.clipboard.writeText(CONFIG.UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const copyWhatsappLink = () => {
    navigator.clipboard.writeText(CONFIG.WHATSAPP_GROUP_URL);
    setCopiedWhatsapp(true);
    setTimeout(() => setCopiedWhatsapp(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ padding: 'clamp(18px, 4vw, 32px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#ffffff', margin: 0 }}>
              {existingPass && step !== 4
                ? 'PASS ALREADY SECURED'
                : step === 4
                ? 'REGISTRATION CONFIRMED'
                : 'ALL-IN-ONE REGISTRATION'}
            </h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
              FOUNDRIX 2026 • ₹799 ALL-INCLUSIVE PASS
            </span>
          </div>

          <button
            onClick={() => {
              if (step === 4) setStep(1);
              onClose();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* 1 ACCOUNT PER PHONE POLICY SCREEN */}
        {existingPass && step !== 4 && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            {/* Policy Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                fontSize: '0.82rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              <ShieldCheck size={16} color="#f87171" />
              <span>1 ACCOUNT PER PHONE POLICY</span>
            </div>

            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#ffffff', marginBottom: '10px' }}>
              PASS ALREADY SECURED FOR THIS DEVICE
            </h4>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 22px auto' }}>
              You already have an active <strong>Foundrix 2026 Pass</strong> registered on this device.
              To prevent accidental duplicate ₹799 payments and ensure fair hackathon allocations, each phone is limited to 1 pass.
            </p>

            {/* Existing Pass Details Card */}
            <div
              style={{
                background: 'rgba(20, 110, 245, 0.08)',
                border: '1px solid var(--accent-cyan)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                maxWidth: '460px',
                margin: '0 auto 22px auto',
                textAlign: 'left',
                boxShadow: '0 0 30px rgba(0, 240, 255, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>
                    REGISTRATION ID
                  </span>
                  <div style={{ fontSize: '1.3rem', fontFamily: 'var(--font-mono)', color: '#ffffff', fontWeight: '800' }}>
                    {existingPass.regId}
                  </div>
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid #10b981',
                    color: '#10b981',
                    fontSize: '0.74rem',
                    fontWeight: '700',
                  }}
                >
                  <CheckCircle2 size={13} />
                  <span>PAYMENT SUBMITTED</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '0.84rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>DELEGATE NAME</span>
                  <strong style={{ color: '#ffffff' }}>{existingPass.name || 'Participant'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>PHONE NUMBER</span>
                  <strong style={{ color: '#ffffff' }}>{existingPass.phone || '—'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>INSTITUTION</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{existingPass.college || 'Raghu Engg College'}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>UTR / REF ID</span>
                  <code style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem' }}>{existingPass.utr || 'Verified'}</code>
                </div>
              </div>

              {existingPass.iitDelhiEligible && (
                <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '0.8rem' }}>
                  <Sparkles size={14} />
                  <span>Early Bird: Qualified for <strong>E-Cell IIT Delhi Certificate</strong></span>
                </div>
              )}
            </div>

            {/* Primary Next Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '460px', margin: '0 auto 20px auto' }}>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenHackathonHub();
                }}
                className="btn-border-beam"
                style={{ width: '100%', padding: '14px' }}
              >
                <span>OPEN HACKATHON TEAM HUB</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={CONFIG.WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '13px 18px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#25d366',
                  color: '#07090f',
                  fontWeight: '800',
                  fontSize: '0.88rem',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 4px 18px rgba(37, 211, 102, 0.35)',
                }}
              >
                <MessageCircle size={18} fill="#07090f" />
                <span>JOIN DELEGATES WHATSAPP GROUP</span>
                <ExternalLink size={16} />
              </a>

              <button
                type="button"
                onClick={() => {
                  setSubmissionResult(existingPass);
                  setStep(4);
                }}
                className="btn-ghost-cyan"
                style={{ width: '100%', padding: '12px' }}
              >
                <FileText size={16} />
                <span>View Full Receipt & Fireworks Celebration</span>
              </button>
            </div>

            {/* Reset / Register Another Delegate option */}
            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Need to register another person or friend from this phone?
              </span>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Do you want to register another pass for a different person? Your previous pass record remains safely saved in Google Sheets.')) {
                    clearPurchasedPass();
                    setExistingPass(null);
                    setSubmissionResult(null);
                    setFormData({
                      name: '',
                      roll: '',
                      college: 'Raghu Engineering College',
                      branch: '',
                      year: '3rd Year',
                      location: 'Visakhapatnam',
                      phone: '',
                      email: '',
                    });
                    setProofData({ utr: '', screenshot: null, previewUrl: '' });
                    setStep(1);
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-cyan)',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginLeft: '8px',
                  textDecoration: 'underline',
                }}
              >
                Register Another Delegate Pass →
              </button>
            </div>
          </div>
        )}

        {/* Step Indicator (Steps 1 to 3) */}
        {!existingPass && step < 4 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '28px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {[
              { num: 1, label: 'Student Details' },
              { num: 2, label: 'Scan & Pay' },
              { num: 3, label: 'Proof & UTR' },
            ].map((s) => (
              <div
                key={s.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: step >= s.num ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: step === s.num ? '700' : '500',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: step >= s.num ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                  }}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* STEP 1: STUDENT DETAILS */}
        {!existingPass && step === 1 && (
          <form onSubmit={handleProceedToPayment}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Varma"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: errors.name ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                  }}
                />
                {errors.name && <span style={{ color: '#ef4444', fontSize: '0.72rem' }}>{errors.name}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Roll Number *
                </label>
                <input
                  type="text"
                  value={formData.roll}
                  onChange={(e) => setFormData({ ...formData, roll: e.target.value.toUpperCase() })}
                  placeholder="e.g. 23B91A0501"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: errors.roll ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                  }}
                />
                {errors.roll && <span style={{ color: '#ef4444', fontSize: '0.72rem' }}>{errors.roll}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  College Name *
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. Raghu Engineering College"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: errors.college ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                  }}
                />
                {errors.college && <span style={{ color: '#ef4444', fontSize: '0.72rem' }}>{errors.college}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Branch / Department *
                </label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="e.g. CSE, AI&DS, ECE, MECH"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: errors.branch ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                  }}
                />
                {errors.branch && <span style={{ color: '#ef4444', fontSize: '0.72rem' }}>{errors.branch}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Year of Study *
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#111420',
                    border: errors.year ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                  }}
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Location / City *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Visakhapatnam, Vizianagaram"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: errors.location ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                  }}
                />
                {errors.location && <span style={{ color: '#ef4444', fontSize: '0.72rem' }}>{errors.location}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Mobile / WhatsApp (10 Digits) *
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  placeholder="e.g. 9876543210"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: errors.phone ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                  }}
                />
                {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.72rem' }}>{errors.phone}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. student@gmail.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: errors.email ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                  }}
                />
                {errors.email && <span style={{ color: '#ef4444', fontSize: '0.72rem' }}>{errors.email}</span>}
              </div>
            </div>

            <button type="submit" className="btn-border-beam" style={{ width: '100%', padding: '16px' }}>
              <span>PROCEED TO UPI PAYMENT (₹799)</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* STEP 2: UPI PAYMENT QR */}
        {!existingPass && step === 2 && (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                background: 'rgba(20, 110, 245, 0.08)',
                border: '1px solid var(--border-glow)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                maxWidth: '380px',
                margin: '0 auto 24px auto',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                SCAN TO PAY VIA ANY UPI APP
              </div>

              {/* QR Image */}
              <div
                style={{
                  width: 'min(240px, 70vw)',
                  height: 'min(240px, 70vw)',
                  margin: '0 auto 16px auto',
                  padding: '12px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 0 35px rgba(0, 240, 255, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={CONFIG.UPI_QR_IMAGE}
                  alt="Foundrix UPI QR Code"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Fee Amount */}
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#ffffff', lineHeight: '1' }}>
                ₹799.00
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>
                Payee: {CONFIG.UPI_PAYEE_NAME}
              </span>

              {/* Copyable UPI ID */}
              <div
                onClick={copyUpiId}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  cursor: 'pointer',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                }}
              >
                <span>{CONFIG.UPI_ID}</span>
                {copiedUpi ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
              After completing the payment on Google Pay, PhonePe, or Paytm, note down your <strong>12-digit UPI Ref ID / UTR</strong> and take a screenshot of the successful transaction.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-ghost-cyan"
                style={{ flex: 1, padding: '14px' }}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleProceedToProof}
                className="btn-border-beam"
                style={{ flex: 2, padding: '14px' }}
              >
                <span>I HAVE PAID • ENTER UTR</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PROOF & UTR SUBMISSION */}
        {!existingPass && step === 3 && (
          <form onSubmit={handleSubmitPayment}>
            {/* UTR Input */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                12-Digit Transaction UTR / UPI Ref ID *
              </label>
              <input
                type="text"
                value={proofData.utr}
                onChange={(e) => setProofData({ ...proofData, utr: e.target.value.trim() })}
                placeholder="e.g. 426819203847"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: errors.utr ? '1px solid #ef4444' : '1px solid var(--border-glow)',
                  color: 'var(--accent-cyan)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.05em',
                }}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                Enter the 12-digit numeric reference number shown on your payment receipt.
              </span>
              {errors.utr && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.utr}</span>}
            </div>

            {/* Screenshot Upload */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Payment Screenshot Proof * (Max 5 MB)
              </label>
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  border: errors.screenshot ? '2px dashed #ef4444' : '2px dashed rgba(20, 110, 245, 0.4)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <Upload size={24} color="var(--accent-cyan)" style={{ marginBottom: '8px' }} />
                <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: '600' }}>
                  {proofData.screenshot ? proofData.screenshot.name : 'Click or Drag to Upload Payment Screenshot'}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  PNG, JPG, JPEG up to 5 MB
                </span>
              </label>
              {errors.screenshot && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.screenshot}</span>}

              {/* Preview Thumbnail */}
              {proofData.previewUrl && (
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={proofData.previewUrl}
                    alt="Proof Preview"
                    style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--accent-cyan)' }}
                  />
                  <span style={{ fontSize: '0.78rem', color: '#10b981' }}>✓ Screenshot attached and ready to submit</span>
                </div>
              )}
            </div>

            {errors.submit && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '16px',
                  fontSize: '0.82rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#fca5a5',
                }}
              >
                {errors.submit}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-ghost-cyan"
                style={{ flex: 1, padding: '14px' }}
                disabled={submitting}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="btn-border-beam"
                style={{ flex: 2, padding: '14px' }}
                disabled={submitting}
              >
                <span>{submitting ? 'TRANSMITTING PROOF...' : 'SUBMIT REGISTRATION (₹799)'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: VERIFICATION CONFIRMATION */}
        {step === 4 && (() => {
          const activeSubmission = submissionResult || existingPass;
          if (!activeSubmission) {
            return (
              <div style={{ textAlign: 'center', padding: '36px 16px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(239, 68, 68, 0.12)',
                    color: '#f87171',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                  }}
                >
                  <AlertCircle size={28} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#ffffff', marginBottom: '8px' }}>
                  No Active Registration Found
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>
                  Please complete the ₹799 pass registration form to receive your Registration ID and team access.
                </p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-border-beam"
                  style={{ padding: '12px 28px' }}
                >
                  <span>Register for Pass (₹799)</span>
                </button>
              </div>
            );
          }

          return (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              {/* Celebration Badge & Cracker Replay */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(251, 191, 36, 0.15)',
                    border: '1px solid #fbbf24',
                    color: '#fbbf24',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    letterSpacing: '0.04em',
                  }}
                >
                  <PartyPopper size={16} />
                  <span>CONGRATULATIONS & WELCOME ABOARD!</span>
                </div>

                <button
                  type="button"
                  onClick={triggerCelebrationCrackers}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(0, 240, 255, 0.12)',
                    border: '1px solid var(--accent-cyan)',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  title="Pop birthday celebration crackers again!"
                >
                  <Sparkles size={14} />
                  <span>Replay Crackers 🎉</span>
                </button>
              </div>

              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  border: '2px solid #10b981',
                  boxShadow: '0 0 25px rgba(16, 185, 129, 0.3)',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <div
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid var(--accent-cyan)',
                  color: 'var(--accent-cyan)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  marginBottom: '16px',
                }}
              >
                YOUR REGISTRATION ID: {activeSubmission.regId}
              </div>

              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#ffffff', marginBottom: '10px' }}>
                PAYMENT UNDER VERIFICATION
              </h4>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', maxWidth: '480px', margin: '0 auto 20px auto' }}>
                Thank you, <strong>{activeSubmission.name}</strong>! Your UTR (<code>{activeSubmission.utr}</code>) and payment screenshot have been recorded.
                Our desk will verify the payment and email your official pass & credentials within <strong>12 hours</strong>.
              </p>

              {activeSubmission.iitDelhiEligible && (
                <div
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fbbf24',
                    fontSize: '0.85rem',
                    marginBottom: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Sparkles size={16} />
                  <span>You have qualified for the <strong>E-Cell, IIT Delhi Certificate</strong> perk!</span>
                </div>
              )}

              {/* MANDATORY ACTION: OFFICIAL WHATSAPP DELEGATES GROUP */}
              <div
                style={{
                  backgroundColor: 'rgba(37, 211, 102, 0.08)',
                  border: '1.5px solid rgba(37, 211, 102, 0.45)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  marginBottom: '20px',
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 0 30px rgba(37, 211, 102, 0.14)',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #25d366, transparent)' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#25d366',
                      color: '#07090f',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 15px rgba(37, 211, 102, 0.45)',
                      flexShrink: 0,
                    }}
                  >
                    <MessageCircle size={22} fill="#07090f" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#25d366', fontWeight: '800', textTransform: 'uppercase' }}>
                      OFFICIAL DELEGATES COMMUNITY
                    </span>
                    <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>
                      JOIN THE FOUNDRIX 2026 WHATSAPP GROUP
                    </h5>
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: '1.55', margin: '0 0 16px 0' }}>
                  Stay connected with 200+ fellow innovators, get real-time schedule drops, participate in team matchmaking, and receive live verification alerts on WhatsApp!
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a
                    href={CONFIG.WHATSAPP_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: '1 1 210px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 18px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: '#25d366',
                      color: '#07090f',
                      fontWeight: '800',
                      fontSize: '0.88rem',
                      letterSpacing: '0.04em',
                      textDecoration: 'none',
                      boxShadow: '0 4px 18px rgba(37, 211, 102, 0.4)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <MessageCircle size={18} fill="#07090f" />
                    <span>JOIN WHATSAPP GROUP</span>
                    <ExternalLink size={16} />
                  </a>

                  <button
                    type="button"
                    onClick={copyWhatsappLink}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(37, 211, 102, 0.35)',
                      color: '#25d366',
                      fontSize: '0.84rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {copiedWhatsapp ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copiedWhatsapp ? 'LINK COPIED!' : 'COPY LINK'}</span>
                  </button>
                </div>
              </div>

              {/* Next Steps: Hackathon Team Hub */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-glow)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  marginBottom: '24px',
                  textAlign: 'left',
                }}
              >
                <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#ffffff', marginBottom: '6px' }}>
                  NEXT STEP: HACKATHON TEAM FORMATION
                </h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use your Registration ID <strong>{activeSubmission.regId}</strong> in the Hackathon Team Hub to create a team (become Team Lead) or enter a 6-digit code to join your friends.
                  All teams must have 3–4 members and lock on <strong>4 October 2026</strong>.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => {
                    setStep(1);
                    onClose();
                  }}
                  className="btn-ghost-cyan"
                  style={{ flex: 1, padding: '14px' }}
                >
                  <span>Done</span>
                </button>

                <button
                  onClick={() => {
                    setStep(1);
                    onClose();
                    onOpenHackathonHub();
                  }}
                  className="btn-border-beam"
                  style={{ flex: 2, padding: '14px' }}
                >
                  <span>OPEN HACKATHON TEAM HUB</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default RegistrationModal;
