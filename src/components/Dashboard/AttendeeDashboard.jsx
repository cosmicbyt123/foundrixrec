import React, { useState, useEffect } from 'react';
import {
  Ticket,
  Users,
  CheckCircle2,
  Clock,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  LogOut,
  Pencil,
  AlertTriangle,
  Printer,
  Building2,
  Phone,
  Mail,
  User,
  MapPin,
  Share2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Info,
  Lock,
  Unlock,
} from 'lucide-react';
import { CONFIG } from '../../config/environment';
import { TeamService } from '../../services/registrationService';
import {
  getActiveParticipant,
  setActiveParticipant,
  clearActiveParticipant,
  updateParticipantPass,
  getPurchasedPass,
  clearPurchasedPass,
} from '../../services/sessionService';
import RaghuLogo from '../Common/RaghuLogo';

/**
 * Returns initials from a student's full name (e.g. "Rahul Varma" -> "RV")
 */
const getInitials = (name) => {
  if (!name || typeof name !== 'string') return 'FD';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Generates a consistent, friendly avatar background color based on name
 */
const getAvatarColor = (name) => {
  const colors = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#db2777', '#0891b2', '#4f46e5'];
  if (!name) return colors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return colors[hash % colors.length];
};

export const AttendeeDashboard = ({ isOpen, onClose, onRegisterAnother }) => {
  const [participant, setParticipant] = useState(() => getActiveParticipant() || getPurchasedPass());
  const [activeTab, setActiveTab] = useState('pass'); // 'pass' | 'team' | 'guide'
  const [isRefreshingStatus, setIsRefreshingStatus] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUtr, setCopiedUtr] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);

  // Hackathon State
  const [activeTeam, setActiveTeam] = useState(null);
  const [availableTeams, setAvailableTeams] = useState([]);
  const [teamTab, setTeamTab] = useState('create'); // 'create' | 'join' | 'roster'
  const [teamNameInput, setTeamNameInput] = useState('');
  const [teamCodeInput, setTeamCodeInput] = useState('');
  const [isTeamSubmitting, setIsTeamSubmitting] = useState(false);
  const [teamMessage, setTeamMessage] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [editNameInput, setEditNameInput] = useState('');

  // Synchronize participant & team data on mount or open
  useEffect(() => {
    if (isOpen) {
      const active = getActiveParticipant() || getPurchasedPass();
      if (active) {
        setParticipant(active);
        // Load teams and check if user belongs to a team
        TeamService.syncTeamsFromCloud().then((teams) => {
          const list = teams || TeamService.getTeams();
          setAvailableTeams(list);

          const myTeam = list.find((t) =>
            t.members && t.members.some((m) =>
              (active.regId && m.regId && m.regId.toUpperCase() === active.regId.toUpperCase()) ||
              (active.phone && m.phone && m.phone === active.phone)
            )
          );
          if (myTeam) {
            setActiveTeam(myTeam);
            setTeamTab('roster');
          }
        });
      }
    }
  }, [isOpen]);

  if (!isOpen || !participant) return null;

  const isVerified = participant.verified === true;
  const regId = participant.regId || participant.participationId || 'FDX-2026-001';
  const utr = participant.utr || 'Pending';

  // Manual check against Google Sheets RAW DATA (action=lookup)
  const handleRefreshVerification = async () => {
    setIsRefreshingStatus(true);
    setRefreshMessage(null);

    try {
      const query = regId || participant.phone;
      const res = await TeamService.findProfile(query);

      if (res) {
        const isNowVerified = res.verified === true;
        const updated = updateParticipantPass({
          ...participant,
          ...res,
          verified: isNowVerified,
        });
        setParticipant(updated);

        if (isNowVerified) {
          setRefreshMessage({
            type: 'success',
            text: 'Payment verified! Your official Summit Pass is now confirmed.',
          });
        } else {
          setRefreshMessage({
            type: 'info',
            text: 'Your payment is recorded and currently under review by our student organizers. Average review turnaround is 2 to 12 hours.',
          });
        }
      } else {
        setRefreshMessage({
          type: 'info',
          text: 'Payment status: Verification in progress. Student desk reviews UTRs periodically.',
        });
      }
    } catch (err) {
      setRefreshMessage({
        type: 'error',
        text: 'Could not contact verification server: ' + (err.message || 'Network error'),
      });
    } finally {
      setIsRefreshingStatus(false);
    }
  };

  // Team Creation
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamNameInput.trim()) {
      setTeamMessage({ type: 'error', text: 'Please enter a Team Name.' });
      return;
    }

    setIsTeamSubmitting(true);
    setTeamMessage(null);
    try {
      const newTeam = await TeamService.createTeam(teamNameInput.trim(), participant);
      setActiveTeam(newTeam);
      setAvailableTeams(TeamService.getTeams());
      setTeamTab('roster');
      setTeamMessage({
        type: 'success',
        text: `Team "${newTeam.teamName}" created! Share team code ${newTeam.teamCode} with your teammates.`,
      });
    } catch (err) {
      setTeamMessage({ type: 'error', text: err.message || 'Failed to create team.' });
    } finally {
      setIsTeamSubmitting(false);
    }
  };

  // Join Team
  const handleJoinTeam = async (e) => {
    e.preventDefault();
    if (!teamCodeInput.trim()) {
      setTeamMessage({ type: 'error', text: 'Please enter a valid Team Code.' });
      return;
    }

    setIsTeamSubmitting(true);
    setTeamMessage(null);
    try {
      const res = await TeamService.joinTeam(teamCodeInput.trim(), participant);
      if (!res.success) {
        setTeamMessage({ type: 'error', text: res.error });
        return;
      }
      setActiveTeam(res.team);
      setAvailableTeams(TeamService.getTeams());
      setTeamTab('roster');
      setTeamMessage({
        type: 'success',
        text: `Successfully joined team "${res.team.teamName}"!`,
      });
    } catch (err) {
      setTeamMessage({ type: 'error', text: err.message || 'Failed to join team.' });
    } finally {
      setIsTeamSubmitting(false);
    }
  };

  // Leave Team
  const handleLeaveTeam = async () => {
    if (!activeTeam) return;
    if (window.confirm(`Are you sure you want to leave team "${activeTeam.teamName}"? You can create or join another team anytime before Oct 4.`)) {
      await TeamService.leaveTeam(activeTeam.teamCode, regId);
      setActiveTeam(null);
      setTeamTab('create');
      setAvailableTeams(TeamService.getTeams());
      setTeamMessage({
        type: 'info',
        text: 'You have left the team. You can now create a new team or join another one.',
      });
    }
  };

  // Save Member Real Name
  const handleSaveMemberName = async (e) => {
    e.preventDefault();
    if (!editingMember || !editNameInput.trim()) return;

    try {
      const res = await TeamService.updateMemberName(activeTeam.teamCode, editingMember.regId, editNameInput.trim());
      if (res.success) {
        setActiveTeam(res.team);
        if (participant.regId === editingMember.regId) {
          const updated = updateParticipantPass({ ...participant, name: editNameInput.trim() });
          setParticipant(updated);
        }
        setEditingMember(null);
        setEditNameInput('');
        setTeamMessage({ type: 'success', text: 'Name updated successfully!' });
      }
    } catch (err) {
      setTeamMessage({ type: 'error', text: 'Error updating name: ' + err.message });
    }
  };

  // 1-Click WhatsApp Invite Share
  const handleShareTeamOnWhatsApp = () => {
    if (!activeTeam) return;
    const inviteText = `Hey! Join my hackathon team "${activeTeam.teamName}" for FOUNDRIX 2026 at Raghu Engineering College!\n\n👉 Team Code: ${activeTeam.teamCode}\n\nBook your ₹799 summit pass & join team here: ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(inviteText)}`, '_blank');
  };

  // Logout / Switch Account
  const handleLogout = () => {
    if (window.confirm('Sign out from this device? Your pass and registration remain securely stored.')) {
      clearActiveParticipant();
      clearPurchasedPass();
      onClose();
    }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyUtrText = () => {
    navigator.clipboard.writeText(utr);
    setCopiedUtr(true);
    setTimeout(() => setCopiedUtr(false), 2000);
  };

  const handlePrint = () => {
    document.body.classList.add('is-printing-ticket');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('is-printing-ticket');
    }, 1500);
  };

  return (
    <div
      className="modal-overlay attendee-dashboard-overlay"
      onClick={onClose}
      style={{
        zIndex: 1000,
        padding: 'clamp(8px, 2vw, 20px)',
        backgroundColor: 'rgba(5, 8, 15, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div
        className="modal-content attendee-dashboard-content"
        style={{
          maxWidth: '860px',
          width: '100%',
          maxHeight: '94vh',
          overflowY: 'auto',
          padding: 'clamp(16px, 3vw, 28px)',
          backgroundColor: '#0c1017',
          border: '1px solid #1f2937',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
          color: '#e2e8f0',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Delegate Identity Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #1f2937',
            paddingBottom: '16px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: getAvatarColor(participant.name),
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                flexShrink: 0,
              }}
            >
              {getInitials(participant.name)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: '1.1',
                  }}
                >
                  {participant.name || 'Delegate'}
                </h3>
                {isVerified ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 8px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid #10b981',
                      color: '#10b981',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                    }}
                  >
                    <CheckCircle2 size={12} />
                    <span>Verified</span>
                  </span>
                ) : (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 8px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(245, 158, 11, 0.12)',
                      border: '1px solid #f59e0b',
                      color: '#f59e0b',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                    }}
                  >
                    <Clock size={12} />
                    <span>Payment Under Review</span>
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '3px' }}>
                {participant.college || 'Raghu Engineering College'} • {participant.roll || 'ID: ' + regId}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrint}
              type="button"
              className="dashboard-print-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid #334155',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
              title="Print Ticket"
            >
              <Printer size={14} />
              <span>Print Ticket</span>
            </button>

            <button
              onClick={onClose}
              type="button"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '1.4rem',
                cursor: 'pointer',
                padding: '4px 8px',
                lineHeight: '1',
              }}
              aria-label="Close Dashboard"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Global Alert Notification */}
        {refreshMessage && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              marginBottom: '18px',
              fontSize: '0.84rem',
              lineHeight: '1.45',
              backgroundColor:
                refreshMessage.type === 'success'
                  ? 'rgba(16, 185, 129, 0.12)'
                  : refreshMessage.type === 'error'
                  ? 'rgba(239, 68, 68, 0.12)'
                  : 'rgba(20, 110, 245, 0.12)',
              border:
                refreshMessage.type === 'success'
                  ? '1px solid #10b981'
                  : refreshMessage.type === 'error'
                  ? '1px solid #ef4444'
                  : '1px solid #38bdf8',
              color:
                refreshMessage.type === 'success'
                  ? '#34d399'
                  : refreshMessage.type === 'error'
                  ? '#f87171'
                  : '#38bdf8',
            }}
          >
            {refreshMessage.text}
          </div>
        )}

        {/* Clean Segmented Tab Switcher (Devfolio / Linear style) */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#111827',
            padding: '4px',
            borderRadius: '10px',
            marginBottom: '22px',
            gap: '4px',
            border: '1px solid #1f2937',
            overflowX: 'auto',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('pass')}
            style={{
              flex: '1 0 auto',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '9px 14px',
              borderRadius: '7px',
              border: 'none',
              backgroundColor: activeTab === 'pass' ? '#1f2937' : 'transparent',
              color: activeTab === 'pass' ? '#ffffff' : '#94a3b8',
              fontSize: '0.84rem',
              fontWeight: activeTab === 'pass' ? '700' : '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            <Ticket size={15} color={activeTab === 'pass' ? '#38bdf8' : 'currentColor'} />
            <span>Summit Pass</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('team')}
            style={{
              flex: '1 0 auto',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '9px 14px',
              borderRadius: '7px',
              border: 'none',
              backgroundColor: activeTab === 'team' ? '#1f2937' : 'transparent',
              color: activeTab === 'team' ? '#ffffff' : '#94a3b8',
              fontSize: '0.84rem',
              fontWeight: activeTab === 'team' ? '700' : '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            <Users size={15} color={activeTab === 'team' ? '#38bdf8' : 'currentColor'} />
            <span>Hackathon Team</span>
            {activeTeam && (
              <span
                style={{
                  fontSize: '0.68rem',
                  backgroundColor: '#146ef5',
                  color: '#ffffff',
                  padding: '1px 6px',
                  borderRadius: '999px',
                  fontWeight: '700',
                }}
              >
                {activeTeam.members.length}/4
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            style={{
              flex: '1 0 auto',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '9px 14px',
              borderRadius: '7px',
              border: 'none',
              backgroundColor: activeTab === 'guide' ? '#1f2937' : 'transparent',
              color: activeTab === 'guide' ? '#ffffff' : '#94a3b8',
              fontSize: '0.84rem',
              fontWeight: activeTab === 'guide' ? '700' : '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            <Info size={15} color={activeTab === 'guide' ? '#38bdf8' : 'currentColor'} />
            <span>Event Guide & Help</span>
          </button>
        </div>

        {/* ===================================================================== */}
        {/* TAB 1: THE REAL CONFERENCE PASS BADGE */}
        {/* ===================================================================== */}
        {activeTab === 'pass' && (
          <div>
            {/* Verification Advisory Banner */}
            {!isVerified && (
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <Clock size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.9rem' }}>
                      Payment Review in Progress
                    </div>
                    <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: '4px 0 0 0', lineHeight: '1.4' }}>
                      Your payment (UTR: <code>{utr}</code>) has been submitted to the organizing desk. Student organizers verify bank credits periodically (2–12 hours). You can still form your hackathon team in the meantime!
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRefreshVerification}
                  disabled={isRefreshingStatus}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                  }}
                >
                  <RefreshCw size={12} className={isRefreshingStatus ? 'spin' : ''} />
                  <span>{isRefreshingStatus ? 'Checking...' : 'Check Status'}</span>
                </button>
              </div>
            )}

            {/* CONFERENCE LANYARD BADGE TICKET */}
            <div
              className="printable-summit-pass"
              style={{
                backgroundColor: '#111827',
                border: isVerified ? '2px solid #10b981' : '1px solid #374151',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                marginBottom: '20px',
              }}
            >
              {/* Badge Top Header */}
              <div
                style={{
                  backgroundColor: '#146ef5',
                  padding: '12px 20px',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <RaghuLogo size="small" showWordmark={false} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', lineHeight: '1' }}>
                      FOUNDRIX 2026
                    </div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.9 }}>
                      Raghu Engineering College • Visakhapatnam
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                  }}
                >
                  ALL-INCLUSIVE PASS • ₹799
                </div>
              </div>

              {/* Badge Inner Layout */}
              <div
                style={{
                  padding: 'clamp(16px, 3vw, 24px)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                  gap: '20px',
                  alignItems: 'center',
                }}
              >
                {/* Left Side: Delegate Information */}
                <div>
                  <div style={{ marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      DELEGATE PASS ID
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: '#ffffff', fontWeight: '800' }}>
                        {regId}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyCode(regId)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94a3b8',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.74rem',
                        }}
                        title="Copy Pass ID"
                      >
                        {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Clean 2-column info grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px', fontSize: '0.84rem' }}>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>FULL NAME</div>
                      <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.95rem' }}>
                        {participant.name || 'Delegate'}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>ROLL NUMBER</div>
                      <div style={{ color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                        {participant.roll || '—'}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>COLLEGE / CAMPUS</div>
                      <div style={{ color: '#e2e8f0', lineHeight: '1.25' }}>
                        {participant.college || 'Raghu Engineering College'}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>BRANCH & YEAR</div>
                      <div style={{ color: '#e2e8f0' }}>
                        {participant.branch || 'CSE'} • {participant.year || '3rd Year'}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>NEAREST BUS STOP</div>
                      <div style={{ color: '#e2e8f0' }}>
                        {participant.location || 'Raghu Engg College Arena'}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>PAYMENT REFERENCE</div>
                      <div style={{ color: '#e2e8f0', fontFamily: 'var(--font-mono)' }}>
                        {utr}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '16px',
                      paddingTop: '12px',
                      borderTop: '1px solid #1f2937',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.76rem',
                      color: '#94a3b8',
                    }}
                  >
                    <Calendar size={13} color="#38bdf8" />
                    <span>9 & 10 October 2026 • Reporting Time: 8:30 AM</span>
                  </div>
                </div>

                {/* Right Side: Clean On-Campus Check-In QR Box */}
                <div
                  style={{
                    backgroundColor: '#0a0d14',
                    border: '1px solid #1f2937',
                    borderRadius: '12px',
                    padding: '18px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isVerified ? (
                    /* UNLOCKED: Live Check-in QR Code */
                    <>
                      <div
                        style={{
                          width: '160px',
                          height: '160px',
                          backgroundColor: '#ffffff',
                          borderRadius: '10px',
                          padding: '8px',
                          margin: '0 auto 12px auto',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                        }}
                      >
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                            `FOUNDRIX-PASS:${regId}|${participant.name}|${participant.roll}|REC`
                          )}`}
                          alt="Check-in QR"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>

                      <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: '700' }}>
                        ✓ Official Entry QR Code
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px', maxWidth: '200px' }}>
                        Present this QR code at the REC campus registration desk on 9 Oct to receive your delegate kit & lanyard.
                      </div>
                    </>
                  ) : (
                    /* BLOCKED & BLURRED: Locked until payment verified */
                    <>
                      <div
                        style={{
                          position: 'relative',
                          width: '160px',
                          height: '160px',
                          margin: '0 auto 12px auto',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1.5px dashed rgba(245, 158, 11, 0.5)',
                        }}
                      >
                        {/* Blurred Dummy Matrix (No Real QR Code Exists) */}
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: '3px',
                            padding: '12px',
                            filter: 'blur(7px)',
                            opacity: 0.25,
                            userSelect: 'none',
                            pointerEvents: 'none',
                          }}
                        >
                          {Array.from({ length: 49 }).map((_, i) => (
                            <div
                              key={i}
                              style={{
                                backgroundColor: (i * 7 + 13) % 3 === 0 ? '#ffffff' : '#000000',
                                borderRadius: '2px',
                              }}
                            />
                          ))}
                        </div>

                        {/* Centered Lock Overlay */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(10, 13, 20, 0.82)',
                            backdropFilter: 'blur(6px)',
                            WebkitBackdropFilter: 'blur(6px)',
                            padding: '10px',
                            textAlign: 'center',
                          }}
                        >
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(245, 158, 11, 0.15)',
                              border: '1px solid #f59e0b',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fbbf24',
                              marginBottom: '6px',
                            }}
                          >
                            <Lock size={18} />
                          </div>
                          <span style={{ fontSize: '0.74rem', fontWeight: '800', color: '#fbbf24', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                            QR Blocked
                          </span>
                          <span style={{ fontSize: '0.62rem', color: '#cbd5e1', marginTop: '2px' }}>
                            Payment Review
                          </span>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: '700' }}>
                        QR Unlocks Upon Verification
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px', maxWidth: '210px', lineHeight: '1.35' }}>
                        Your official check-in QR code will appear here once student organizers verify your ₹799 payment.
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setActiveTab('team')}
                style={{
                  flex: '1 1 200px',
                  backgroundColor: '#146ef5',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 18px',
                  fontSize: '0.86rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Users size={16} />
                <span>Go to Hackathon Team Hub</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={handlePrint}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid #334155',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '12px 18px',
                  fontSize: '0.86rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Printer size={16} />
                <span>Print Ticket (PDF)</span>
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 2: HACKATHON TEAM HUB (DEVFOLIO / UNSTOP STYLE) */}
        {/* ===================================================================== */}
        {activeTab === 'team' && (
          <div>
            {/* Friendly Human Reminder */}
            <div
              style={{
                backgroundColor: 'rgba(20, 110, 245, 0.08)',
                border: '1px solid rgba(20, 110, 245, 0.25)',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.84rem',
                color: '#93c5fd',
              }}
            >
              <Info size={18} style={{ flexShrink: 0 }} />
              <div>
                <strong>Hackathon Guidelines:</strong> Every team must have <strong>3 to 4 members</strong>. Teammates can be from any branch or college. Final teams lock on <strong>4 October 2026</strong>.
              </div>
            </div>

            {teamMessage && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '0.84rem',
                  backgroundColor: teamMessage.type === 'error' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                  border: teamMessage.type === 'error' ? '1px solid #ef4444' : '1px solid #10b981',
                  color: teamMessage.type === 'error' ? '#f87171' : '#34d399',
                }}
              >
                {teamMessage.text}
              </div>
            )}

            {/* If Student Already Has a Team -> Show Devfolio-style Team Card */}
            {activeTeam ? (
              <div
                style={{
                  backgroundColor: '#111827',
                  border: '1px solid #1f2937',
                  borderRadius: '14px',
                  padding: 'clamp(16px, 3vw, 24px)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    borderBottom: '1px solid #1f2937',
                    paddingBottom: '16px',
                    marginBottom: '18px',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase' }}>
                      YOUR HACKATHON TEAM
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                        color: '#ffffff',
                        margin: '2px 0 6px 0',
                      }}
                    >
                      {activeTeam.teamName}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Capacity: <strong>{activeTeam.members.length} of 4</strong> members joined
                    </div>
                  </div>

                  {/* Team Invite Code Chip & Share Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#0a0d14',
                        border: '1px solid #38bdf8',
                      }}
                    >
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>TEAM CODE:</span>
                      <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: '#38bdf8' }}>
                        {activeTeam.teamCode}
                      </strong>
                      <button
                        type="button"
                        onClick={() => copyCode(activeTeam.teamCode)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ffffff',
                          cursor: 'pointer',
                          padding: '2px',
                        }}
                        title="Copy Team Code"
                      >
                        {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleShareTeamOnWhatsApp}
                      style={{
                        backgroundColor: '#25d366',
                        color: '#07090f',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '0.76rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Share2 size={12} />
                      <span>Share on WhatsApp</span>
                    </button>
                  </div>
                </div>

                {/* Team Roster Members List */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '10px', fontWeight: '600' }}>
                    TEAM MEMBERS:
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeTeam.members.map((m, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#0c1017',
                          border: '1px solid #1f2937',
                          flexWrap: 'wrap',
                          gap: '8px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: getAvatarColor(m.name || `Member ${idx + 1}`),
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              flexShrink: 0,
                            }}
                          >
                            {getInitials(m.name)}
                          </div>
                          <div>
                            <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>{m.name || `Member ${idx + 1}`}</span>
                              {idx === 0 && (
                                <span style={{ fontSize: '0.66rem', backgroundColor: 'rgba(20, 110, 245, 0.2)', color: '#38bdf8', padding: '1px 6px', borderRadius: '4px' }}>
                                  Team Lead
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                              {m.college || participant.college || 'Raghu Engg College'} • {m.roll || m.regId || 'ID Pending'}
                            </div>
                          </div>
                        </div>

                        {/* Edit Name Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingMember(m);
                            setEditNameInput(m.name || '');
                          }}
                          style={{
                            background: 'transparent',
                            border: '1px solid #334155',
                            borderRadius: '5px',
                            padding: '4px 8px',
                            color: '#cbd5e1',
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Pencil size={11} />
                          <span>Edit</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inline Member Name Edit Form */}
                {editingMember && (
                  <form
                    onSubmit={handleSaveMemberName}
                    style={{
                      padding: '12px',
                      backgroundColor: '#080c14',
                      borderRadius: '8px',
                      border: '1px solid #38bdf8',
                      marginBottom: '16px',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <input
                      type="text"
                      value={editNameInput}
                      onChange={(e) => setEditNameInput(e.target.value)}
                      placeholder="Enter Member Real Name"
                      autoFocus
                      style={{
                        flex: '1 1 200px',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        backgroundColor: '#111827',
                        border: '1px solid #374151',
                        color: '#ffffff',
                        fontSize: '0.86rem',
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundColor: '#146ef5',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 14px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingMember(null)}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#94a3b8',
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </form>
                )}

                {/* Team Controls Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #1f2937',
                    paddingTop: '14px',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      TeamService.syncTeamToCloud(activeTeam).then(() =>
                        setTeamMessage({ type: 'success', text: 'Team data synced to database successfully!' })
                      )
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#38bdf8',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <RefreshCw size={12} />
                    <span>Sync Team Data</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLeaveTeam}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#f87171',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Leave Team
                  </button>
                </div>
              </div>
            ) : (
              /* If Student Does Not Have a Team Yet -> Show Clean Create / Join Cards */
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
                  <button
                    type="button"
                    onClick={() => setTeamTab('create')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: teamTab === 'create' ? '#146ef5' : '#1f2937',
                      color: '#ffffff',
                      fontWeight: '700',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                    }}
                  >
                    Create a Team
                  </button>

                  <button
                    type="button"
                    onClick={() => setTeamTab('join')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: teamTab === 'join' ? '#146ef5' : '#1f2937',
                      color: '#ffffff',
                      fontWeight: '700',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                    }}
                  >
                    Join with Code
                  </button>
                </div>

                {teamTab === 'create' && (
                  <form
                    onSubmit={handleCreateTeam}
                    style={{
                      backgroundColor: '#111827',
                      border: '1px solid #1f2937',
                      borderRadius: '12px',
                      padding: '20px',
                      maxWidth: '520px',
                    }}
                  >
                    <h5 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#ffffff' }}>
                      Start a New Hackathon Team
                    </h5>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 16px 0' }}>
                      You will become the <strong>Team Lead</strong> and receive a shareable 6-digit code for your teammates.
                    </p>

                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px' }}>
                        TEAM NAME *
                      </label>
                      <input
                        type="text"
                        value={teamNameInput}
                        onChange={(e) => setTeamNameInput(e.target.value)}
                        placeholder="e.g. Pixel Pioneers"
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#0c1017',
                          border: '1px solid #374151',
                          color: '#ffffff',
                          fontSize: '0.92rem',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isTeamSubmitting}
                      style={{
                        width: '100%',
                        backgroundColor: '#146ef5',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      {isTeamSubmitting ? 'Creating Team...' : 'Create Team & Get Invite Code'}
                    </button>
                  </form>
                )}

                {teamTab === 'join' && (
                  <form
                    onSubmit={handleJoinTeam}
                    style={{
                      backgroundColor: '#111827',
                      border: '1px solid #1f2937',
                      borderRadius: '12px',
                      padding: '20px',
                      maxWidth: '520px',
                    }}
                  >
                    <h5 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#ffffff' }}>
                      Join an Existing Team
                    </h5>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 16px 0' }}>
                      Enter the 6-digit code shared by your Team Lead to join their roster.
                    </p>

                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px' }}>
                        TEAM CODE *
                      </label>
                      <input
                        type="text"
                        value={teamCodeInput}
                        onChange={(e) => setTeamCodeInput(e.target.value.toUpperCase())}
                        placeholder="e.g. FDX-849"
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#0c1017',
                          border: '1px solid #374151',
                          color: '#38bdf8',
                          fontSize: '1rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: '700',
                          letterSpacing: '0.05em',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isTeamSubmitting}
                      style={{
                        width: '100%',
                        backgroundColor: '#146ef5',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px',
                        color: '#ffffff',
                        fontSize: '0.88rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      {isTeamSubmitting ? 'Joining Team...' : 'Join Team'}
                    </button>

                    {/* Quick-Join open teams */}
                    {availableTeams && availableTeams.filter((t) => t.members && t.members.length < 4).length > 0 && (
                      <div style={{ marginTop: '18px' }}>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
                          OR CLICK A TEAM WITH OPEN SLOTS:
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {availableTeams
                            .filter((t) => t.members && t.members.length < 4)
                            .map((t) => (
                              <button
                                key={t.teamCode || t.teamId}
                                type="button"
                                onClick={() => setTeamCodeInput(t.teamCode)}
                                style={{
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  backgroundColor: '#1f2937',
                                  border: '1px solid #374151',
                                  color: '#38bdf8',
                                  fontSize: '0.74rem',
                                  cursor: 'pointer',
                                }}
                              >
                                {t.teamName} ({t.members.length}/4)
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 3: EVENT GUIDE & STUDENT COORDINATOR DESK */}
        {/* ===================================================================== */}
        {activeTab === 'guide' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* WhatsApp Community Card */}
            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1f2937',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: '#25d366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MessageCircle size={22} color="#07090f" fill="#07090f" />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '1.1rem', color: '#ffffff' }}>
                    Official Delegate WhatsApp Group
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Connect with fellow REC and external student innovators
                  </div>
                </div>
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '0.84rem', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                Receive live workshop updates, hackathon problem statements, bus timings, and pitch slot notifications directly in the official group.
              </p>

              <a
                href={CONFIG.WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  backgroundColor: '#25d366',
                  color: '#07090f',
                  fontWeight: '700',
                  fontSize: '0.84rem',
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={16} fill="#07090f" />
                <span>Join Official WhatsApp Group</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Practical Student Guidelines */}
            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1f2937',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <h5 style={{ margin: '0 0 12px 0', fontSize: '0.96rem', color: '#ffffff' }}>
                What to Bring on 9 October 2026:
              </h5>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.84rem', lineHeight: '1.7' }}>
                <li><strong>College ID Card</strong> (mandatory for campus entry).</li>
                <li><strong>Laptop & Charger</strong> for the workshop sessions and online hackathon.</li>
                <li><strong>Digital or Printed Pass</strong> (show the QR code on your phone).</li>
                <li><strong>Reporting Time</strong>: 8:30 AM at Raghu Engineering College Main Auditorium.</li>
              </ul>
            </div>

            {/* Student Organizing Desk Leads */}
            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1f2937',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <h5 style={{ margin: '0 0 6px 0', fontSize: '0.96rem', color: '#ffffff' }}>
                Need Help? Contact Student Coordinators
              </h5>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 14px 0' }}>
                Have questions about transport, registration desk, or teams? Call or message the leads directly:
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="tel:+917989313442"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <Phone size={13} color="#38bdf8" />
                  <span>Tarun: <strong>+91 79893 13442</strong></span>
                </a>

                <a
                  href="tel:+919346565707"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <Phone size={13} color="#38bdf8" />
                  <span>Thanu: <strong>+91 93465 65707</strong></span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Modal Bottom: Sign Out & Close */}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '14px',
            borderTop: '1px solid #1f2937',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <button
            type="button"
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <LogOut size={13} />
            <span>Sign Out / Switch Device</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid #334155',
              color: '#ffffff',
              borderRadius: '6px',
              padding: '7px 16px',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDashboard;
