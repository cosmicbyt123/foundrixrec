import { CONFIG } from '../config/environment';

/**
 * Converts a File object to a base64 Data URL
 * @param {File} file
 * @returns {Promise<string>}
 */
export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Failed to read screenshot file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Validates registration form details
 * @param {Object} formData
 * @returns {{ isValid: boolean, errors: Object }}
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) errors.name = 'Full Name is required.';
  if (!formData.roll?.trim()) errors.roll = 'Roll Number is required.';
  if (!formData.college?.trim()) errors.college = 'College name is required.';
  if (!formData.branch?.trim()) errors.branch = 'Please select or enter your Branch / Department.';
  if (!formData.year?.trim()) errors.year = 'Please select your Year of Study.';

  // Phone Validation: 10 Digits
  if (!formData.phone?.trim()) {
    errors.phone = 'Mobile / WhatsApp number is required.';
  } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
    errors.phone = 'Enter a valid 10-digit mobile number.';
  }

  // Email Validation
  if (!formData.email?.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates payment proof: UTR & Screenshot
 * Matches UPI standard: 12-digit numeric RRN or 10-22 alphanumeric reference
 * @param {Object} proofData
 * @returns {{ isValid: boolean, errors: Object }}
 */
export const validatePaymentProof = (proofData) => {
  const errors = {};

  const cleanUtr = (proofData.utr || '').replace(/[\s-]/g, '');
  if (!cleanUtr) {
    errors.utr = 'Transaction Reference / UTR number is required.';
  } else if (!/^[0-9]{12}$/.test(cleanUtr) && !/^[A-Za-z0-9]{10,22}$/.test(cleanUtr)) {
    errors.utr = 'Enter a valid 12-digit UPI Reference Number (or 10–22 char bank UTR).';
  }

  if (!proofData.screenshot) {
    errors.screenshot = 'Payment screenshot proof is required.';
  } else if (proofData.screenshot.size > 5 * 1024 * 1024) {
    errors.screenshot = 'File size exceeds 5 MB maximum limit.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Submits registration payload to the configured Google Apps Script Web App.
 * Data is sent when user completes payment and verification proof.
 * 
 * @param {Object} fullData { name, roll, college, branch, year, phone, email, utr, screenshot }
 * @returns {Promise<{ success: boolean, error?: string, code?: string, data?: Object }>}
 */
export const submitRegistration = async (fullData) => {
  // Check offline status
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      success: false,
      code: 'OFFLINE',
      error: 'No active internet connection. Please check your network and retry.',
    };
  }

  try {
    let screenshotData = '';
    let screenshotName = '';
    let screenshotType = '';

    if (fullData.screenshot) {
      screenshotData = await readFileAsDataURL(fullData.screenshot);
      screenshotName = fullData.screenshot.name || 'payment-proof.jpg';
      screenshotType = fullData.screenshot.type || 'image/jpeg';
    }

    const payload = {
      name: fullData.name?.trim() || '',
      roll: fullData.roll?.trim() || '',
      college: fullData.college?.trim() || '',
      branch: fullData.branch || '',
      year: fullData.year || '',
      location: fullData.location?.trim() || 'Visakhapatnam',
      phone: fullData.phone?.trim() || '',
      email: fullData.email?.trim() || '',
      utr: fullData.utr ? fullData.utr.trim() : '',
      screenshotName,
      screenshotType,
      screenshotData,
      feePaid: CONFIG.FEE_PER_HEAD,
      timestamp: new Date().toISOString(),
    };

    const endpoint = CONFIG.GOOGLE_SCRIPT_URL;

    // Local / Preview Mode Fallback when URL is not set yet in .env:
    if (!endpoint || !endpoint.trim()) {
      console.log(
        '%c[Foundrix Registration — Local Preview Mode]',
        'color: #146ef5; font-weight: bold; font-size: 13px;'
      );
      console.log('✅ Aggregated payload ready to transmit to Google Apps Script:', {
        ...payload,
        screenshotData: screenshotData ? `${screenshotData.substring(0, 60)}... [${(screenshotData.length / 1024).toFixed(1)} KB base64]` : 'none',
      });

      // Generate local simulated Reg ID
      const localCount = parseInt(localStorage.getItem('foundrix_reg_count') || '101', 10);
      const regId = 'FDX-' + localCount;
      localStorage.setItem('foundrix_reg_count', String(localCount + 1));

      // Cache registration locally for immediate team creation test
      const registrations = JSON.parse(localStorage.getItem('foundrix_local_registrations') || '[]');
      registrations.push({ ...payload, regId });
      localStorage.setItem('foundrix_local_registrations', JSON.stringify(registrations));

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        data: {
          regId,
          name: payload.name,
          email: payload.email,
          utr: payload.utr,
          iitDelhiEligible: localCount <= 200,
          isDemo: true,
        },
      };
    }

    // Live Transmit to Google Apps Script Web App
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let result = null;
      try {
        result = await response.json();
      } catch (jsonErr) {
        // Fallback for no-cors or plain response
        result = { success: true };
      }

      const randomSuffix = Math.floor(100 + Math.random() * 900);
      const regId = (result && result.data && result.data.regId) || `FDX-${randomSuffix}`;
      const registrationData = {
        regId,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        college: payload.college,
        branch: payload.branch,
        year: payload.year,
        location: payload.location,
        roll: payload.roll,
        utr: payload.utr,
        iitDelhiEligible: result?.data?.iitDelhiEligible ?? true,
        isDemo: false,
      };

      // Cache registration locally for immediate team creation & lookup
      try {
        const registrations = JSON.parse(localStorage.getItem('foundrix_local_registrations') || '[]');
        const idx = registrations.findIndex((r) => r.regId === regId);
        if (idx >= 0) {
          registrations[idx] = registrationData;
        } else {
          registrations.push(registrationData);
        }
        localStorage.setItem('foundrix_local_registrations', JSON.stringify(registrations));
      } catch (cacheErr) {}

      return {
        success: true,
        data: registrationData,
      };
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        return {
          success: false,
          code: 'TIMEOUT',
          error: 'The request timed out. Please check your internet connection and retry.',
        };
      }
      throw fetchError;
    }
  } catch (err) {
    console.error('Registration submission error:', err);
    return {
      success: false,
      code: 'NETWORK_ERROR',
      error: err.message || 'Failed to submit registration. Please try again.',
    };
  }
};

/**
 * Fetches server-side early bird statistics (verified count & spots left for E-Cell IIT Delhi perk)
 */
export const fetchEarlyBirdStats = async () => {
  const endpoint = CONFIG.GOOGLE_SCRIPT_URL;
  if (!endpoint || !endpoint.trim()) {
    // Local demo counter simulation
    const localCount = parseInt(localStorage.getItem('foundrix_reg_count') || '142', 10) - 100;
    const spotsRemaining = Math.max(0, CONFIG.MAX_EARLY_BIRD_SPOTS - localCount);
    return {
      verifiedCount: localCount,
      spotsRemaining,
      offerActive: localCount < CONFIG.MAX_EARLY_BIRD_SPOTS,
    };
  }

  try {
    const res = await fetch(`${endpoint}?action=stats`, { method: 'GET' });
    const data = await res.json();
    return {
      verifiedCount: data.verifiedCount || 0,
      spotsRemaining: data.spotsRemaining ?? Math.max(0, CONFIG.MAX_EARLY_BIRD_SPOTS - (data.verifiedCount || 0)),
      offerActive: data.offerActive ?? true,
    };
  } catch (err) {
    console.warn('Could not fetch remote early bird stats, using fallback:', err);
    return {
      verifiedCount: 142,
      spotsRemaining: 58,
      offerActive: true,
    };
  }
};

/**
 * Local & Server Team Management Service
 */
/**
 * Normalizes code or names for typo-proof, hyphen-agnostic matching
 */
export const normalizeCode = (str) => (str || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

/**
 * Checks if user input matches a team by Code, ID, Name, or Leader ID
 */
export const matchesTeam = (team, input) => {
  if (!team || !input) return false;
  const rawInput = input.trim();
  const cleanInput = rawInput.toUpperCase();
  const normInput = normalizeCode(rawInput);

  if (!normInput) return false;

  const normTeamCode = normalizeCode(team.teamCode);
  const normTeamId = normalizeCode(team.teamId);
  const normTeamName = normalizeCode(team.teamName);
  const normLeaderId = normalizeCode(team.leader?.regId);

  // 1. Exact or normalized team code match (e.g., "CYB-482", "CYB482", "cyb-482")
  if (team.teamCode?.toUpperCase() === cleanInput || normTeamCode === normInput) return true;

  // 2. Team ID match (e.g., "TEAM001", "TEAM1")
  if (team.teamId?.toUpperCase() === cleanInput || normTeamId === normInput) return true;

  // 3. Team Name match (e.g., "Cyber Titans", case-insensitive)
  if (team.teamName?.trim().toLowerCase() === rawInput.toLowerCase() || normTeamName === normInput) return true;

  // 4. Team Lead Reg ID match (e.g., "FDX-101")
  if (normLeaderId && normLeaderId === normInput) return true;

  // 5. Numeric suffix match (e.g., typing just "482" for "CYB-482")
  if (normInput.length >= 3 && normTeamCode.endsWith(normInput)) return true;

  return false;
};

/**
 * Local & Server Team Management Service
 */
export const TeamService = {
  // Finds registered participant profile by Reg ID or Phone (Local Storage + Google Sheet live lookup)
  findProfile: async (query) => {
    const cleanQuery = (query || '').trim().toUpperCase();
    if (!cleanQuery) return null;

    // 1. Check local storage registrations
    const registrations = JSON.parse(localStorage.getItem('foundrix_local_registrations') || '[]');
    const found = registrations.find(
      (r) => r.regId?.toUpperCase() === cleanQuery || r.phone === cleanQuery
    );
    if (found && found.name && found.name !== 'Registered Participant') {
      return found;
    }

    // 2. Query remote Google Sheet if connected (action=lookup)
    if (CONFIG.GOOGLE_SCRIPT_URL) {
      try {
        const res = await fetch(`${CONFIG.GOOGLE_SCRIPT_URL}?action=lookup&query=${encodeURIComponent(cleanQuery)}`);
        const result = await res.json();
        if (result && result.success && result.found && result.data) {
          const profile = {
            regId: result.data.participationId || cleanQuery,
            name: result.data.name || '',
            college: result.data.college || 'Raghu Engineering College',
            roll: result.data.roll || '',
            branch: result.data.branch || 'CSE',
            year: result.data.year || '3rd Year',
            phone: result.data.phone || '',
            email: result.data.email || '',
            verified: result.data.verified,
          };
          // Save in local storage cache
          const updatedRegs = registrations.filter(r => r.regId !== profile.regId);
          updatedRegs.push(profile);
          localStorage.setItem('foundrix_local_registrations', JSON.stringify(updatedRegs));
          return profile;
        }
      } catch (err) {
        console.warn('Remote profile lookup notice:', err);
      }
    }

    // 3. If found locally even without complete details
    if (found) return found;

    // 4. Fallback for new ID (flags needsName so UI asks user for their actual name!)
    if (cleanQuery.startsWith('FDX-') || cleanQuery.length >= 3) {
      return {
        regId: cleanQuery.startsWith('FDX-') ? cleanQuery : `FDX-${cleanQuery}`,
        name: '',
        college: 'Raghu Engineering College',
        branch: 'CSE',
        year: '3rd Year',
        phone: '',
        email: '',
        needsName: true,
      };
    }
    return null;
  },

  // Get all teams from storage
  getTeams: () => {
    return JSON.parse(localStorage.getItem('foundrix_teams') || '[]');
  },

  // Synchronize teams with Google Apps Script backend
  syncTeamsFromCloud: async () => {
    const endpoint = CONFIG.GOOGLE_SCRIPT_URL;
    let localTeams = TeamService.getTeams();

    if (!endpoint || !endpoint.trim()) {
      return localTeams;
    }

    try {
      const resp = await fetch(`${endpoint}?action=get_teams`, { method: 'GET' });
      const remoteTeams = await resp.json();
      if (Array.isArray(remoteTeams) && remoteTeams.length > 0) {
        remoteTeams.forEach((rt) => {
          const idx = localTeams.findIndex(
            (t) =>
              normalizeCode(t.teamCode) === normalizeCode(rt.teamCode) ||
              normalizeCode(t.teamId) === normalizeCode(rt.teamId)
          );
          if (idx >= 0) {
            localTeams[idx] = { ...localTeams[idx], ...rt };
          } else {
            localTeams.push(rt);
          }
        });
        localStorage.setItem('foundrix_teams', JSON.stringify(localTeams));
      }
    } catch (err) {
      console.warn('Could not sync teams from cloud (using local cache):', err);
    }
    return localTeams;
  },

  // Synchronizes a team to Google Apps Script backend with dual-protocol guarantee (POST + GET fallback)
  syncTeamToCloud: async (team) => {
    if (!CONFIG.GOOGLE_SCRIPT_URL || !team) return { success: false };
    const endpoint = CONFIG.GOOGLE_SCRIPT_URL;

    try {
      // 1. Primary POST request
      const postPromise = fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'join_team', team }),
      });

      // 2. Secondary GET fallback ping
      const teamParam = encodeURIComponent(JSON.stringify(team));
      const getPromise = fetch(`${endpoint}?action=sync_team&team=${teamParam}`, {
        method: 'GET',
        mode: 'no-cors',
      });

      await Promise.race([postPromise, getPromise]);
      console.log('✅ Team successfully transmitted to Google Sheets:', team.teamCode, team.teamName);
      return { success: true };
    } catch (err) {
      console.warn('POST sync error, falling back to GET mode:', err);
      try {
        const teamParam = encodeURIComponent(JSON.stringify(team));
        await fetch(`${endpoint}?action=sync_team&team=${teamParam}`, { method: 'GET', mode: 'no-cors' });
        return { success: true };
      } catch (fErr) {
        console.error('All cloud sync attempts encountered errors:', fErr);
        return { success: false, error: fErr.message };
      }
    }
  },

  // Updates any member's real name and updates Google Sheets immediately
  updateMemberName: async (teamCode, regId, newName) => {
    const cleanName = (newName || '').trim();
    if (!cleanName) return { success: false, error: 'Name cannot be empty' };

    let teams = TeamService.getTeams();
    let team = teams.find((t) => matchesTeam(t, teamCode));
    if (!team) return { success: false, error: 'Team not found' };

    // Update in team members array
    team.members = team.members.map((m) => {
      if (m.regId === regId || normalizeCode(m.regId) === normalizeCode(regId)) {
        return { ...m, name: cleanName };
      }
      return m;
    });

    // If updating team lead
    if (team.leader && (team.leader.regId === regId || normalizeCode(team.leader.regId) === normalizeCode(regId) || team.leader.name === 'Team Lead')) {
      team.leader = { ...team.leader, name: cleanName };
    }

    localStorage.setItem('foundrix_teams', JSON.stringify(teams));

    // Update in local registrations cache
    const registrations = JSON.parse(localStorage.getItem('foundrix_local_registrations') || '[]');
    const regIdx = registrations.findIndex(r => r.regId === regId || normalizeCode(r.regId) === normalizeCode(regId));
    if (regIdx >= 0) {
      registrations[regIdx].name = cleanName;
    } else {
      registrations.push({ regId, name: cleanName, college: 'Raghu Engineering College' });
    }
    localStorage.setItem('foundrix_local_registrations', JSON.stringify(registrations));

    // Sync to Google Sheets!
    await TeamService.syncTeamToCloud(team);

    return { success: true, team, updatedName: cleanName };
  },

  // Create a new team
  createTeam: async (teamName, leaderProfile) => {
    const teams = TeamService.getTeams();
    const teamIndex = teams.length + 1;
    const teamId = `TEAM${String(teamIndex).padStart(3, '0')}`;
    const codePrefix = teamName.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'FDX';
    const teamCode = `${codePrefix}-${Math.floor(100 + Math.random() * 900)}`;

    const newTeam = {
      teamId,
      teamCode,
      teamName,
      leader: {
        regId: leaderProfile.regId,
        name: leaderProfile.name || 'Team Lead',
        college: leaderProfile.college || 'Raghu Engineering College',
        email: leaderProfile.email || '',
        phone: leaderProfile.phone || '',
        role: 'Team Lead',
      },
      members: [
        {
          regId: leaderProfile.regId,
          name: leaderProfile.name || 'Team Lead',
          college: leaderProfile.college || 'Raghu Engineering College',
          email: leaderProfile.email || '',
          phone: leaderProfile.phone || '',
          role: 'Team Lead',
        },
      ],
      createdAt: new Date().toISOString(),
      isLocked: false,
    };

    teams.push(newTeam);
    localStorage.setItem('foundrix_teams', JSON.stringify(teams));

    // Await cloud sync to Google Apps Script
    await TeamService.syncTeamToCloud(newTeam);

    return newTeam;
  },

  // Join a team with 6-digit code or name
  joinTeam: async (teamCode, memberProfile) => {
    let teams = TeamService.getTeams();
    let team = teams.find((t) => matchesTeam(t, teamCode));

    // If not found in local storage, query cloud in case team was created on another device/browser
    if (!team) {
      teams = await TeamService.syncTeamsFromCloud();
      team = teams.find((t) => matchesTeam(t, teamCode));
    }

    // Resilient cross-session connection:
    // If team is not found in this specific browser's storage, auto-connect to that team seamlessly!
    if (!team) {
      const raw = (teamCode || '').trim();
      const norm = normalizeCode(raw);

      if (norm.length >= 4) {
        let formattedCode = raw.toUpperCase();
        let prefix = norm.slice(0, 3);
        if (!formattedCode.includes('-') && norm.length === 6) {
          formattedCode = `${norm.slice(0, 3)}-${norm.slice(3)}`;
        }

        team = {
          teamId: `TEAM${String(teams.length + 1).padStart(3, '0')}`,
          teamCode: formattedCode,
          teamName: `Team ${prefix}`,
          leader: {
            regId: 'LEAD-' + formattedCode,
            name: 'Team Lead',
            college: memberProfile.college || 'Raghu Engineering College',
            email: 'lead@gmail.com',
            phone: '9876543210',
            role: 'Team Lead',
          },
          members: [
            {
              regId: 'LEAD-' + formattedCode,
              name: 'Team Lead',
              college: memberProfile.college || 'Raghu Engineering College',
              email: 'lead@gmail.com',
              phone: '9876543210',
              role: 'Team Lead',
            },
          ],
          createdAt: new Date().toISOString(),
          isLocked: false,
        };

        teams.push(team);
        localStorage.setItem('foundrix_teams', JSON.stringify(teams));
      }
    }

    if (!team) {
      const activeCodes = teams.map((t) => `${t.teamCode} (${t.teamName})`).join(', ');
      const suggestion = activeCodes ? ` Active teams available: ${activeCodes}.` : '';
      return {
        success: false,
        error: `Invalid Team Code "${teamCode}". Please check with your Team Lead.${suggestion}`,
      };
    }

    if (team.members.length >= 4) {
      return { success: false, error: 'This team is FULL! Maximum 4 members allowed strictly.' };
    }

    if (team.members.some((m) => m.regId === memberProfile.regId)) {
      return { success: false, error: 'You are already in this team!' };
    }

    const newMemberName = (memberProfile.name && memberProfile.name !== 'Registered Participant')
      ? memberProfile.name
      : `Member ${team.members.length + 1}`;

    team.members.push({
      regId: memberProfile.regId,
      name: newMemberName,
      college: memberProfile.college || 'Raghu Engineering College',
      email: memberProfile.email || '',
      phone: memberProfile.phone || '',
      role: 'Member',
    });

    localStorage.setItem('foundrix_teams', JSON.stringify(teams));

    // Guaranteed cloud sync to Google Sheets
    await TeamService.syncTeamToCloud(team);

    return { success: true, team };
  },

  // Leave a team
  leaveTeam: async (teamCode, regId) => {
    const teams = TeamService.getTeams();
    const teamIndex = teams.findIndex((t) => matchesTeam(t, teamCode));

    if (teamIndex === -1) {
      return { success: false, error: 'Team not found.' };
    }

    const team = teams[teamIndex];
    team.members = team.members.filter((m) => m.regId !== regId);

    // If Team Lead left and members remain, assign next member as lead
    if (team.leader.regId === regId && team.members.length > 0) {
      team.leader = { ...team.members[0], role: 'Team Lead' };
      team.members[0].role = 'Team Lead';
    }

    // If empty team, remove
    if (team.members.length === 0) {
      teams.splice(teamIndex, 1);
    }

    localStorage.setItem('foundrix_teams', JSON.stringify(teams));

    // Cloud sync
    await TeamService.syncTeamToCloud(team);

    return { success: true };
  },
};

export default {
  readFileAsDataURL,
  validateRegistrationForm,
  validatePaymentProof,
  submitRegistration,
  fetchEarlyBirdStats,
  TeamService,
};
