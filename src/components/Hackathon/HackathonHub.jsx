import React, { useState, useEffect } from 'react';
import { Users, Copy, Check, LogOut, PlusCircle, UserCheck, AlertTriangle, ShieldCheck, Terminal, Clock, RefreshCw, Pencil } from 'lucide-react';
import { TeamService } from '../../services/registrationService';
import { HACKATHON_DATA } from '../../data/hackathon';
import {
  getActiveParticipant,
  setActiveParticipant,
  clearActiveParticipant,
} from '../../services/sessionService';

export const HackathonHub = ({ isOpen, onClose, onRegisterClick }) => {
  const [activeTab, setActiveTab] = useState('create'); // 'create', 'join', 'roster'
  const [regIdInput, setRegIdInput] = useState('');
  const [teamNameInput, setTeamNameInput] = useState('');
  const [teamCodeInput, setTeamCodeInput] = useState('');
  
  const [currentProfile, setCurrentProfile] = useState(() => getActiveParticipant());
  const [namePromptProfile, setNamePromptProfile] = useState(null);
  const [namePromptInput, setNamePromptInput] = useState('');
  const [editingMember, setEditingMember] = useState(null); // { regId, name }
  const [editNameInput, setEditNameInput] = useState('');
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);

  const [activeTeam, setActiveTeam] = useState(null);
  const [availableTeams, setAvailableTeams] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  // Sync teams & auto-recognize participant profile from 3-week session
  useEffect(() => {
    if (isOpen) {
      TeamService.syncTeamsFromCloud().then((teams) => {
        const teamList = teams || TeamService.getTeams();
        setAvailableTeams(teamList);

        // Auto-load profile from 3-week browser session if not currently in state
        let profile = currentProfile;
        if (!profile) {
          profile = getActiveParticipant();
          if (profile) setCurrentProfile(profile);
        }

        // Auto-locate user's team and switch to team roster
        if (profile && (profile.regId || profile.phone)) {
          const userTeam = teamList.find((t) =>
            t.members && t.members.some((m) =>
              (profile.regId && m.regId && m.regId.toUpperCase() === profile.regId.toUpperCase()) ||
              (profile.phone && m.phone && m.phone === profile.phone)
            )
          );
          if (userTeam) {
            setActiveTeam(userTeam);
            setActiveTab('roster');
          }
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Profile Recognition (Async with Google Sheets remote lookup)
  const handleVerifyRegId = async (e) => {
    e.preventDefault();
    if (!regIdInput.trim()) {
      setMessage({ type: 'error', text: 'Please enter your Registration ID (e.g. FDX-101) or registered phone.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    try {
      const profile = await TeamService.findProfile(regIdInput);
      if (!profile) {
        setMessage({
          type: 'error',
          text: 'Registration ID not found! Please register for the ₹799 pass first to unlock the Hackathon Team Hub.',
        });
        return;
      }

      // If profile does not have a confirmed real name yet, prompt user for it
      if (profile.needsName || !profile.name || profile.name === 'Registered Participant') {
        setNamePromptProfile(profile);
        setNamePromptInput('');
      } else {
        setCurrentProfile(profile);
        setActiveParticipant(profile); // Remember for 3 weeks across browser reopens!
        setMessage({
          type: 'success',
          text: `Welcome, ${profile.name}! Your registration has been recognized.`,
        });
      }

      // Check if already in a team
      const teams = TeamService.getTeams();
      const existingTeam = teams.find((t) =>
        t.members.some((m) =>
          (profile.regId && m.regId && m.regId.toUpperCase() === profile.regId.toUpperCase()) ||
          (profile.phone && m.phone && m.phone === profile.phone)
        )
      );
      if (existingTeam) {
        setActiveTeam(existingTeam);
        setActiveTab('roster');
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Verification error: ' + err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle confirming real name on new / unconfirmed profiles
  const handleConfirmProfileName = (e) => {
    e.preventDefault();
    const clean = namePromptInput.trim();
    if (!clean) {
      setMessage({ type: 'error', text: 'Please enter your Full Name.' });
      return;
    }

    const updatedProfile = {
      ...namePromptProfile,
      name: clean,
      needsName: false,
    };

    const registrations = JSON.parse(localStorage.getItem('foundrix_local_registrations') || '[]');
    const regIdx = registrations.findIndex(r => r.regId === updatedProfile.regId);
    if (regIdx >= 0) {
      registrations[regIdx] = updatedProfile;
    } else {
      registrations.push(updatedProfile);
    }
    localStorage.setItem('foundrix_local_registrations', JSON.stringify(registrations));

    setCurrentProfile(updatedProfile);
    setActiveParticipant(updatedProfile); // Remember for 3 weeks
    setNamePromptProfile(null);
    setMessage({
      type: 'success',
      text: `Profile set! Welcome, ${clean}. You can now create or join a team.`,
    });
  };

  // Handle updating any member's real name and syncing immediately to Google Sheets
  const handleSaveMemberName = async (e) => {
    e.preventDefault();
    if (!editingMember || !editNameInput.trim()) {
      setMessage({ type: 'error', text: 'Please enter a valid Name.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    try {
      const res = await TeamService.updateMemberName(activeTeam.teamCode, editingMember.regId, editNameInput.trim());
      if (res.success) {
        setActiveTeam(res.team);
        // If current profile was the one edited, update currentProfile as well
        if (currentProfile && (currentProfile.regId === editingMember.regId || editingMember.regId === currentProfile.regId)) {
          const updated = { ...currentProfile, name: editNameInput.trim() };
          setCurrentProfile(updated);
          setActiveParticipant(updated); // Remember for 3 weeks
        }
        setEditingMember(null);
        setEditNameInput('');
        setMessage({
          type: 'success',
          text: `✅ Member name updated to "${editNameInput.trim()}" and synced to Google Sheets!`,
        });
      } else {
        setMessage({ type: 'error', text: res.error || 'Failed to update member name.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Error updating member name.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manual one-click Google Sheets synchronization
  const handleManualCloudSync = async () => {
    if (!activeTeam) return;
    setIsSyncingCloud(true);
    setMessage(null);
    try {
      const res = await TeamService.syncTeamToCloud(activeTeam);
      if (res.success) {
        setMessage({
          type: 'success',
          text: `✅ Team "${activeTeam.teamName}" (${activeTeam.teamCode}) and all members successfully updated in Google Sheet!`,
        });
      } else {
        setMessage({
          type: 'error',
          text: 'Notice: Could not contact Google Sheet endpoint. Local roster is saved.',
        });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Sync error: ' + err.message });
    } finally {
      setIsSyncingCloud(false);
    }
  };

  // Handle Team Creation
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamNameInput.trim()) {
      setMessage({ type: 'error', text: 'Please enter a creative Team Name.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    try {
      const newTeam = await TeamService.createTeam(teamNameInput.trim(), currentProfile);
      setActiveTeam(newTeam);
      setAvailableTeams(TeamService.getTeams());
      setActiveTab('roster');
      setMessage({
        type: 'success',
        text: `Team "${newTeam.teamName}" created! You are the Team Lead. Share your 6-digit Team Code: ${newTeam.teamCode} with teammates.`,
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to create team.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Join Team
  const handleJoinTeam = async (e) => {
    e.preventDefault();
    if (!teamCodeInput.trim()) {
      setMessage({ type: 'error', text: 'Please enter the 6-digit Team Code.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    try {
      const res = await TeamService.joinTeam(teamCodeInput.trim(), currentProfile);
      if (!res.success) {
        setMessage({ type: 'error', text: res.error });
        return;
      }

      setActiveTeam(res.team);
      setAvailableTeams(TeamService.getTeams());
      setActiveTab('roster');
      setMessage({
        type: 'success',
        text: `Successfully joined ${res.team.teamName}!`,
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'An error occurred while joining the team.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Leave Team
  const handleLeaveTeam = () => {
    if (!activeTeam || !currentProfile) return;
    if (window.confirm('Are you sure you want to leave this team? You can create or join another team before Oct 4.')) {
      TeamService.leaveTeam(activeTeam.teamCode, currentProfile.regId);
      setActiveTeam(null);
      setActiveTab('create');
      setMessage({
        type: 'success',
        text: 'You have left the team. You can now create a new team or join another team using their 6-digit code.',
      });
    }
  };

  const copyTeamCode = () => {
    if (!activeTeam) return;
    navigator.clipboard.writeText(activeTeam.teamCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '680px', padding: 'clamp(18px, 4vw, 32px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(0, 240, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-cyan)',
              }}
            >
              <Terminal size={22} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#ffffff', margin: 0 }}>
                HACKATHON TEAM HUB
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>
                ONLINE BUILD SPRINT • 3 TO 4 MEMBERS STRICTLY
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
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

        {/* Lock Deadline Warning Notice */}
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(255, 107, 0, 0.1)',
            border: '1px solid rgba(255, 107, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.82rem',
            color: '#ffa366',
            marginBottom: '24px',
          }}
        >
          <AlertTriangle size={18} style={{ flexShrink: 0 }} />
          <span>
            <strong>Locking Rule:</strong> Teams lock permanently on <strong>4 October 2026, 11:59 PM</strong>.
            All teams must have <strong>3 to 4 members</strong>. Teams with &lt;3 members on 3 October will receive an automated email alert!
          </span>
        </div>

        {/* Status / Alert Message */}
        {message && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '20px',
              fontSize: '0.86rem',
              backgroundColor: message.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              border: message.type === 'error' ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(16, 185, 129, 0.4)',
              color: message.type === 'error' ? '#fca5a5' : '#6ee7b7',
            }}
          >
            {message.text}
          </div>
        )}

        {/* Step 1: Registration ID Recognition */}
        {namePromptProfile ? (
          /* Prompt for Real Name if Profile doesn't have one */
          <div
            style={{
              padding: '22px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(20, 110, 245, 0.1)',
              border: '1px solid var(--accent-cyan)',
              marginBottom: '20px',
            }}
          >
            <div style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px' }}>
              RECOGNIZED PARTICIPANT: {namePromptProfile.regId}
            </div>
            <h4 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
              Enter Your Real Full Name
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '16px', lineHeight: '1.5' }}>
              Please enter your actual name so your team roster and official Google Sheet records show your identity accurately to organizers and judges.
            </p>

            <form onSubmit={handleConfirmProfileName} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="text"
                value={namePromptInput}
                onChange={(e) => setNamePromptInput(e.target.value)}
                placeholder="Enter Full Name (e.g. Wasim Khan / Tarun)"
                autoFocus
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--accent-cyan)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setNamePromptProfile(null)}
                  className="btn-ghost-cyan"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-border-beam"
                  style={{ flex: 2, padding: '12px' }}
                >
                  <span>CONFIRM & CONTINUE</span>
                </button>
              </div>
            </form>
          </div>
        ) : !currentProfile ? (
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Enter your <strong>Registration ID</strong> (e.g. <code>FDX-101</code>) from your payment receipt or your 10-digit registered phone number.
            </p>

            <form onSubmit={handleVerifyRegId} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input
                type="text"
                value={regIdInput}
                onChange={(e) => setRegIdInput(e.target.value)}
                placeholder="Enter Reg ID (e.g. FDX-101) or Phone"
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-glow)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-border-beam"
                style={{ padding: '14px 24px', flexShrink: 0 }}
              >
                <span>{isSubmitting ? 'LOOKING UP...' : 'VERIFY'}</span>
              </button>
            </form>

            <div
              style={{
                textAlign: 'center',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Haven't registered yet? You need an all-inclusive ₹799 pass to access Hackathon teams.
              </span>
              <br />
              <button
                onClick={() => {
                  onClose();
                  onRegisterClick();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-cyan)',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  marginTop: '8px',
                  textDecoration: 'underline',
                }}
              >
                Register for Pass (₹799) →
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Recognized Profile & Team Actions */
          <div>
            {/* User Identity Chip */}
            <div
              style={{
                padding: '14px 18px',
                background: 'rgba(20, 110, 245, 0.1)',
                border: '1px solid rgba(20, 110, 245, 0.3)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span>{currentProfile.name || 'Participant'}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMember({ regId: currentProfile.regId, name: currentProfile.name });
                        setEditNameInput(currentProfile.name === 'Registered Participant' ? '' : currentProfile.name);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'rgba(0, 240, 255, 0.12)',
                        border: '1px solid var(--accent-cyan)',
                        color: 'var(--accent-cyan)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.74rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                      }}
                      title="Edit Real Name"
                    >
                      <Pencil size={11} />
                      <span>{currentProfile.name === 'Registered Participant' ? 'Set Real Name' : 'Edit Name'}</span>
                    </button>
                  </div>
                  <div style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', marginTop: '2px' }}>
                    {currentProfile.regId} • {currentProfile.college || 'Raghu Engineering College'}
                  </div>
                </div>

                <button
                  onClick={() => {
                    clearActiveParticipant();
                    setCurrentProfile(null);
                    setActiveTeam(null);
                    setMessage(null);
                    setRegIdInput('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Switch Account
                </button>
              </div>

              {/* Warning if Name is still the generic placeholder */}
              {currentProfile.name === 'Registered Participant' && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(251, 191, 36, 0.12)',
                    border: '1px solid rgba(251, 191, 36, 0.35)',
                    color: '#fbbf24',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span>⚠️ Please set your Real Full Name so judges and Google Sheets record you properly.</span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingMember({ regId: currentProfile.regId, name: '' });
                      setEditNameInput('');
                    }}
                    style={{
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: '#fbbf24',
                      color: '#07090f',
                      fontWeight: 'bold',
                      fontSize: '0.76rem',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Set Name Now
                  </button>
                </div>
              )}
            </div>

            {/* Sub-Tabs: Create, Join, Roster */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '12px',
                marginBottom: '24px',
              }}
            >
              <button
                onClick={() => setActiveTab('create')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: activeTab === 'create' ? 'var(--accent-blue)' : 'transparent',
                  color: activeTab === 'create' ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Create Team
              </button>

              <button
                onClick={() => setActiveTab('join')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: activeTab === 'join' ? 'var(--accent-blue)' : 'transparent',
                  color: activeTab === 'join' ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Join Team with Code
              </button>

              {activeTeam && (
                <button
                  onClick={() => setActiveTab('roster')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    backgroundColor: activeTab === 'roster' ? 'var(--accent-blue)' : 'transparent',
                    color: activeTab === 'roster' ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  My Team Roster ({activeTeam.members.length}/4)
                </button>
              )}
            </div>

            {/* TAB: CREATE TEAM */}
            {activeTab === 'create' && (
              <form onSubmit={handleCreateTeam}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamNameInput}
                  onChange={(e) => setTeamNameInput(e.target.value)}
                  placeholder="e.g. Cyber Titans"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-glow)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    marginBottom: '16px',
                  }}
                />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '20px' }}>
                  By creating a team, you will automatically become the <strong>Team Lead</strong> and receive a unique 6-digit Team Code to share with your teammates.
                </p>
                <button type="submit" className="btn-border-beam" style={{ width: '100%', padding: '16px' }}>
                  <span>CREATE TEAM & GET 6-DIGIT CODE</span>
                </button>
              </form>
            )}

            {/* TAB: JOIN TEAM */}
            {activeTab === 'join' && (
              <form onSubmit={handleJoinTeam}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    6-Digit Team Code or Team Name *
                  </label>
                  <button
                    type="button"
                    onClick={async () => {
                      const t = await TeamService.syncTeamsFromCloud();
                      if (t) setAvailableTeams(t);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-cyan)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'underline',
                    }}
                  >
                    <RefreshCw size={12} />
                    <span>Sync from Cloud</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={teamCodeInput}
                  onChange={(e) => setTeamCodeInput(e.target.value.toUpperCase())}
                  placeholder="e.g. CYB-789 or CYB789"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-glow)',
                    color: 'var(--accent-cyan)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                />

                {/* Available Teams Quick Selection */}
                {availableTeams && availableTeams.length > 0 && (
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(20, 110, 245, 0.08)',
                      border: '1px solid rgba(20, 110, 245, 0.25)',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: 'var(--accent-cyan)',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Active Teams with Open Spots (Click to auto-fill code):
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {availableTeams
                        .filter((t) => t.members && t.members.length < 4)
                        .map((t) => (
                          <button
                            key={t.teamCode || t.teamId}
                            type="button"
                            onClick={() => setTeamCodeInput(t.teamCode || t.teamId)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor:
                                teamCodeInput === t.teamCode ? 'rgba(0, 240, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                              border:
                                teamCodeInput === t.teamCode
                                  ? '1px solid var(--accent-cyan)'
                                  : '1px solid rgba(255, 255, 255, 0.1)',
                              color: '#ffffff',
                              fontSize: '0.78rem',
                              fontFamily: 'var(--font-mono)',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <span style={{ color: 'var(--accent-cyan)', fontWeight: '700' }}>{t.teamCode}</span>
                            <span style={{ color: 'var(--text-secondary)' }}>• {t.teamName}</span>
                            <span style={{ color: '#10b981', fontSize: '0.72rem' }}>
                              ({t.members.length}/4)
                            </span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '20px' }}>
                  Tip: You can enter the exact code (e.g. <code>CYB-789</code>), without hyphen (<code>CYB789</code>), or the Team Name. Maximum 4 members strictly.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-border-beam"
                  style={{ width: '100%', padding: '16px' }}
                >
                  <span>{isSubmitting ? 'VERIFYING & JOINING TEAM...' : 'JOIN TEAM'}</span>
                </button>
              </form>
            )}

            {/* TAB: MY TEAM ROSTER */}
            {activeTab === 'roster' && activeTeam && (
              <div>
                {/* Team Info Card */}
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: 'rgba(14, 18, 30, 0.9)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-glow)',
                    marginBottom: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                        {activeTeam.teamId}
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#ffffff', margin: 0 }}>
                        {activeTeam.teamName}
                      </h4>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                        SHAREABLE 6-DIGIT CODE:
                      </span>
                      <div
                        onClick={copyTeamCode}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'rgba(0, 240, 255, 0.1)',
                          border: '1px solid rgba(0, 240, 255, 0.4)',
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          color: '#ffffff',
                          fontWeight: '700',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '1rem',
                        }}
                      >
                        <span>{activeTeam.teamCode}</span>
                        {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                      </div>
                    </div>
                  </div>

                  {/* Members List Header & Live Cloud Sync Status */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Team Roster ({activeTeam.members.length} / 4 Members):
                    </span>

                    <button
                      type="button"
                      onClick={handleManualCloudSync}
                      disabled={isSyncingCloud}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 12px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(16, 185, 129, 0.12)',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                        color: '#10b981',
                        fontSize: '0.76rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      title="Sync current team & member names to Google Sheets"
                    >
                      <RefreshCw size={12} className={isSyncingCloud ? 'spin' : ''} />
                      <span>{isSyncingCloud ? 'Syncing Sheet...' : 'Sync to Google Sheet Now'}</span>
                    </button>
                  </div>

                  {/* Inline Edit Member Name Form */}
                  {editingMember && (
                    <div
                      style={{
                        padding: '16px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(20, 110, 245, 0.18)',
                        border: '1.5px solid var(--accent-cyan)',
                        marginBottom: '14px',
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>
                        Set Real Name for member ({editingMember.regId}):
                      </div>
                      <form onSubmit={handleSaveMemberName} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <input
                          type="text"
                          value={editNameInput}
                          onChange={(e) => setEditNameInput(e.target.value)}
                          placeholder="Enter Real Full Name (e.g. Wasim / Tarun)"
                          autoFocus
                          style={{
                            flex: '1 1 200px',
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(6, 10, 20, 0.9)',
                            border: '1px solid var(--accent-cyan)',
                            color: '#ffffff',
                            fontSize: '0.9rem',
                          }}
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-border-beam"
                          style={{ padding: '10px 18px', flexShrink: 0 }}
                        >
                          <span>{isSubmitting ? 'SAVING...' : 'SAVE & SYNC'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingMember(null)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                          }}
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Members List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeTeam.members.map((member, idx) => {
                      const isGeneric =
                        member.name === 'Team Lead' ||
                        member.name === 'Registered Participant' ||
                        member.name.startsWith('Member ');

                      return (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: 'var(--radius-sm)',
                            border: isGeneric ? '1px dashed rgba(251, 191, 36, 0.5)' : '1px solid rgba(255, 255, 255, 0.06)',
                            fontSize: '0.88rem',
                            flexWrap: 'wrap',
                            gap: '8px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <strong style={{ color: isGeneric ? '#fbbf24' : '#ffffff', fontSize: '0.92rem' }}>
                              {member.name}
                            </strong>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                              ({member.regId})
                            </span>

                            {/* Rename / Set Real Name Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setEditingMember(member);
                                setEditNameInput(isGeneric ? '' : member.name);
                              }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                backgroundColor: isGeneric ? 'rgba(251, 191, 36, 0.2)' : 'rgba(0, 240, 255, 0.1)',
                                border: isGeneric ? '1px solid #fbbf24' : '1px solid rgba(0, 240, 255, 0.3)',
                                color: isGeneric ? '#fbbf24' : 'var(--accent-cyan)',
                                fontSize: '0.74rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                marginLeft: '4px',
                              }}
                              title="Set or change real name"
                            >
                              <Pencil size={11} />
                              <span>{isGeneric ? 'Set Real Name' : 'Edit'}</span>
                            </button>
                          </div>

                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              padding: '3px 10px',
                              borderRadius: '4px',
                              backgroundColor: member.role === 'Team Lead' ? 'rgba(20, 110, 245, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                              color: member.role === 'Team Lead' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                              fontWeight: '600',
                            }}
                          >
                            {member.role}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Under Capacity Alert if < 3 members */}
                  {activeTeam.members.length < 3 && (
                    <div
                      style={{
                        marginTop: '16px',
                        padding: '10px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        color: '#fbbf24',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <AlertTriangle size={16} />
                      <span>Need at least {3 - activeTeam.members.length} more member(s) to qualify for Hackathon pitch on Day 1!</span>
                    </div>
                  )}
                </div>

                {/* Leave Team Button */}
                <button
                  onClick={handleLeaveTeam}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'transparent',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#f87171',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  <LogOut size={16} />
                  <span>Leave Team (Switch / Create Another)</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonHub;
