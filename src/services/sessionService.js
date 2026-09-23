/**
 * 3-Week Persistent Session & Pass Storage Service
 * Retains delegate session, active pass, and team state for 21 days (3 weeks)
 * across browser restarts and device reboots.
 */

export const THREE_WEEKS_MS = 21 * 24 * 60 * 60 * 1000; // 21 days = 1,814,400,000 ms

/**
 * Saves item in localStorage with 3-week expiration and cookie backup
 */
export const setSessionItem = (key, value, durationMs = THREE_WEEKS_MS) => {
  if (typeof window === 'undefined') return;
  try {
    const payload = {
      value,
      expiresAt: Date.now() + durationMs,
      savedAt: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(payload));

    // Also set resilient cookie backup (21 days)
    const maxAgeSeconds = Math.floor(durationMs / 1000);
    const cookieVal = typeof value === 'string' ? value : encodeURIComponent(JSON.stringify(value));
    document.cookie = `${key}=${cookieVal}; max-age=${maxAgeSeconds}; path=/; SameSite=Lax`;
  } catch (err) {
    console.warn(`[SessionService] Error setting ${key}:`, err);
  }
};

/**
 * Retrieves item from localStorage, checking 3-week expiration
 */
export const getSessionItem = (key) => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        if (data && typeof data === 'object' && data.expiresAt) {
          if (Date.now() > data.expiresAt) {
            // Expired after 3 weeks
            localStorage.removeItem(key);
            return null;
          }
          return data.value;
        }
        return data;
      } catch (parseErr) {
        return raw;
      }
    }
  } catch (err) {
    console.warn(`[SessionService] Error reading localStorage ${key}:`, err);
  }

  // Resilient Backup: Read from 3-week HTTP-level cookie if localStorage was cleared
  try {
    if (typeof document !== 'undefined' && document.cookie) {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [k, v] = cookie.split('=');
        if (k === key && v) {
          try {
            return JSON.parse(decodeURIComponent(v));
          } catch (e) {
            return decodeURIComponent(v);
          }
        }
      }
    }
  } catch (cookieErr) {
    console.warn(`[SessionService] Error reading cookie ${key}:`, cookieErr);
  }

  return null;
};

/**
 * Removes an item from storage and clears cookie
 */
export const removeSessionItem = (key) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
    document.cookie = `${key}=; max-age=0; path=/; SameSite=Lax`;
  } catch (err) {}
};

/**
 * Gets currently active logged-in participant
 */
export const getActiveParticipant = () => {
  return getSessionItem('foundrix_active_participant');
};

/**
 * Sets active participant profile for 3 weeks
 */
export const setActiveParticipant = (profile) => {
  if (!profile) return;
  setSessionItem('foundrix_active_participant', profile, THREE_WEEKS_MS);
};

/**
 * Clears active participant profile
 */
export const clearActiveParticipant = () => {
  removeSessionItem('foundrix_active_participant');
};

/**
 * Checks if a ticket/pass has already been purchased on this device
 */
export const hasPurchasedPass = () => {
  const pass = getSessionItem('foundrix_purchased_pass');
  return !!pass;
};

/**
 * Gets details of the purchased pass
 */
export const getPurchasedPass = () => {
  return getSessionItem('foundrix_purchased_pass');
};

/**
 * Stores purchased ticket details for 3 weeks
 */
export const setPurchasedPass = (passData) => {
  if (!passData) return;
  setSessionItem('foundrix_purchased_pass', passData, THREE_WEEKS_MS);
  // Also synchronize as active participant
  setActiveParticipant(passData);
};

/**
 * Updates existing pass and active participant details in session
 */
export const updateParticipantPass = (updates) => {
  if (!updates) return;
  const current = getPurchasedPass() || getActiveParticipant() || {};
  const merged = { ...current, ...updates };
  setPurchasedPass(merged);
  return merged;
};

/**
 * Resets purchased pass (e.g. if registering for a different person)
 */
export const clearPurchasedPass = () => {
  removeSessionItem('foundrix_purchased_pass');
};

export default {
  THREE_WEEKS_MS,
  setSessionItem,
  getSessionItem,
  removeSessionItem,
  getActiveParticipant,
  setActiveParticipant,
  clearActiveParticipant,
  hasPurchasedPass,
  getPurchasedPass,
  setPurchasedPass,
  updateParticipantPass,
  clearPurchasedPass,
};
