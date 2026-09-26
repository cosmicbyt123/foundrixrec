/**
 * ============================================================================
 * FOUNDRIX 2026 — Google Apps Script Master Backend & Team Automation (code.gs)
 * Event: Flagship Startup & Tech Summit | Raghu Engineering College
 * ============================================================================
 * 
 * 4 CORE SHEETS MAINTAINED:
 * 1. "RAW DATA"                — The master 15-column registration intake & verification sheet.
 * 2. "PARTICIPANT LIST"        — Clean delegate check-in roster with verification sync.
 * 3. "HACKATHON TEAMS"         — Grouped visual directory of all 3–4 member hackathon teams & leads.
 * 4. "HACKATHON TEAMS PRESENT" — Oct 9 pitch day check-in, project demos & jury scoring sheet.
 * 
 * EXACT 15-COLUMN STRUCTURE FOR "RAW DATA" (Row 1 Headers):
 * Col 1:  date time
 * Col 2:  Participation ID
 * Col 3:  name
 * Col 4:  college
 * Col 5:  Roll number
 * Col 6:  branch
 * Col 7:  year
 * Col 8:  location
 * Col 9:  phone number
 * Col 10: gmail
 * Col 11: utr
 * Col 12: image name
 * Col 13: Drive link
 * Col 14: Verified      (Default: "No")
 * Col 15: Email Sent    (Default: "No", auto-marked "Yes" upon email dispatch)
 * 
 * AUTOMATIONS INCLUDED:
 * 1. Team Permissions Solution: Every uploaded payment screenshot and the Drive folder
 *    are set to "Anyone with the link can view", eliminating access request friction.
 * 2. Auto-Email Dispatch on Verification: When "Verified" is marked "Yes", the script checks
 *    if "Email Sent" is "No". If so, it dispatches the official confirmation email to the student's
 *    gmail and sets "Email Sent" to "Yes", preventing duplicate emails.
 * 3. Hackathon Team Synchronization: Tracks teams across "HACKATHON TEAMS" and "HACKATHON TEAMS PRESENT".
 * 4. Custom Menu "⚡ Foundrix Admin": 1-click trigger installer, manual batch email sender,
 *    and Drive permission solver.
 */

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================
const SHEET_RAW = 'RAW DATA';
const SHEET_PARTICIPANTS = 'PARTICIPANT LIST';
const SHEET_HACKATHON = 'HACKATHON TEAMS';
const SHEET_HACKATHON_PRESENT = 'HACKATHON TEAMS PRESENT';

const DRIVE_FOLDER_NAME = 'FOUNDRIX_2026_Payment_Screenshots';
const SPECIFIC_FOLDER_ID = ''; // Optional: Paste a shared Google Drive Folder ID if desired
const SPREADSHEET_ID = ''; // Optional fallback: Paste your Google Sheet ID here if running as Standalone Script (script.google.com)

/**
 * Resolves the Google Spreadsheet (bound or standalone fallback)
 */
function getSpreadsheet() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss && SPREADSHEET_ID) {
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e) {
      Logger.log('Could not open spreadsheet by ID: ' + e.toString());
    }
  }
  return ss;
}

// Web App Deployment Endpoint URL
const DEPLOYED_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwpaJnFfKXEfAKVrciD4L8EVypwFS881vECSjUKB3lj2kaf7No66dEgQ-bSqoy8Ovbs/exec';

// Email Configuration
const SENDER_NAME = 'FOUNDRIX 2026 Organizing Team';
const SUMMIT_DATES = 'October 9 & 10, 2026';
const SUMMIT_VENUE = 'Campus Arena, Raghu Engineering College, Visakhapatnam';
const COORDINATOR_1 = 'Tarun (Lead Coordinator): +91 79893 13442';
const COORDINATOR_2 = 'Thanu (Student Organizing Lead): +91 93465 65707';
const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/LtSa3ftDjZT7jmwGwK4nUM';

// Expected 16 Headers for RAW DATA (Includes Delegate Login Password)
const RAW_HEADERS = [
  'date time',
  'Participation ID',
  'name',
  'college',
  'Roll number',
  'branch',
  'year',
  'location',
  'phone number',
  'gmail',
  'password',
  'utr',
  'image name',
  'Drive link',
  'Verified',
  'Email Sent'
];

// Column Indexes for RAW DATA (1-based)
const COL_DATE_TIME = 1;
const COL_PARTICIPATION_ID = 2;
const COL_NAME = 3;
const COL_COLLEGE = 4;
const COL_ROLL = 5;
const COL_BRANCH = 6;
const COL_YEAR = 7;
const COL_LOCATION = 8;
const COL_PHONE = 9;
const COL_GMAIL = 10;
const COL_PASSWORD = 11;
const COL_UTR = 12;
const COL_IMAGE_NAME = 13;
const COL_DRIVE_LINK = 14;
const COL_VERIFIED = 15;
const COL_EMAIL_SENT = 16;

// ============================================================================
// 1. SETUP & UI INITIALIZATION
// ============================================================================

/**
 * Creates custom spreadsheet menu on open
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('⚡ Foundrix Admin')
    .addItem('1. Initialize / Setup All 4 Sheets', 'setupAllSheets')
    .addItem('2. Install Auto-Email Edit Trigger', 'installOnEditTrigger')
    .addSeparator()
    .addItem('3. Process Verified Rows & Send Emails Now', 'processVerifiedRows')
    .addItem('4. Send / Resend QR Ticket to Selected Row', 'sendTicketToActiveRow')
    .addItem('5. Fix Google Drive Team Permissions', 'fixDrivePermissions')
    .addItem('6. Refresh & Rebuild Hackathon Teams Sheet', 'rebuildHackathonTeamsMenu')
    .addToUi();
}

/**
 * Initializes all 4 sheets with formatted headers, dropdowns, and column widths
 */
function setupAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. RAW DATA (The Master 16-Column Sheet with Password)
  let rawSheet = ss.getSheetByName(SHEET_RAW);
  if (!rawSheet) rawSheet = ss.insertSheet(SHEET_RAW, 0);

  // Auto-migration: If existing sheet has 15 columns with 'utr' at column 11, insert password column
  if (rawSheet.getLastColumn() >= 11) {
    const col11Val = String(rawSheet.getRange(1, 11).getValue()).trim().toLowerCase();
    if (col11Val === 'utr') {
      rawSheet.insertColumnBefore(11);
      rawSheet.getRange(1, 11).setValue('password');
    }
  }

  rawSheet.getRange(1, 1, 1, RAW_HEADERS.length).setValues([RAW_HEADERS]);
  rawSheet.getRange(1, 1, 1, RAW_HEADERS.length)
    .setBackground('#0a0e1a')
    .setFontColor('#00f0ff')
    .setFontWeight('bold')
    .setFontFamily('Arial')
    .setFontSize(10)
    .setHorizontalAlignment('center');
  rawSheet.setFrozenRows(1);

  // Dropdown Validation for Verified (Col 15) & Email Sent (Col 16)
  const yesNoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['No', 'Yes', 'Verified'], true)
    .setAllowInvalid(false)
    .build();
  rawSheet.getRange('O2:O5000').setDataValidation(yesNoRule);
  rawSheet.getRange('P2:P5000').setDataValidation(yesNoRule);

  rawSheet.setColumnWidth(1, 160); // date time
  rawSheet.setColumnWidth(2, 130); // Participation ID
  rawSheet.setColumnWidth(3, 160); // name
  rawSheet.setColumnWidth(4, 200); // college
  rawSheet.setColumnWidth(5, 130); // Roll number
  rawSheet.setColumnWidth(6, 100); // branch
  rawSheet.setColumnWidth(7, 90);  // year
  rawSheet.setColumnWidth(8, 140); // location
  rawSheet.setColumnWidth(9, 120); // phone number
  rawSheet.setColumnWidth(10, 200); // gmail
  rawSheet.setColumnWidth(11, 140); // password
  rawSheet.setColumnWidth(12, 150); // utr
  rawSheet.setColumnWidth(13, 220); // image name
  rawSheet.setColumnWidth(14, 180); // Drive link
  rawSheet.setColumnWidth(15, 90);  // Verified
  rawSheet.setColumnWidth(16, 100); // Email Sent

  // 2. PARTICIPANT LIST
  let partSheet = ss.getSheetByName(SHEET_PARTICIPANTS);
  if (!partSheet) partSheet = ss.insertSheet(SHEET_PARTICIPANTS, 1);
  const partHeaders = ['S.No', 'Participation ID', 'Student Name', 'College Name', 'Roll No', 'Phone', 'Location', 'Verified'];
  partSheet.getRange(1, 1, 1, partHeaders.length).setValues([partHeaders]);
  partSheet.getRange(1, 1, 1, partHeaders.length)
    .setBackground('#1b263b')
    .setFontColor('#00f0ff')
    .setFontWeight('bold');
  partSheet.setFrozenRows(1);
  partSheet.setColumnWidth(1, 60);
  partSheet.setColumnWidth(2, 130);
  partSheet.setColumnWidth(3, 180);
  partSheet.setColumnWidth(4, 200);
  partSheet.setColumnWidth(5, 130);
  partSheet.setColumnWidth(6, 130);
  partSheet.setColumnWidth(7, 140);
  partSheet.setColumnWidth(8, 90);

  // 3. HACKATHON TEAMS
  let hackSheet = ss.getSheetByName(SHEET_HACKATHON);
  if (!hackSheet) hackSheet = ss.insertSheet(SHEET_HACKATHON, 2);
  if (hackSheet.getLastRow() === 0) {
    hackSheet.appendRow(['FOUNDRIX 2026 — OFFICIAL HACKATHON TEAMS DIRECTORY']);
    hackSheet.getRange('A1:F1').merge()
      .setBackground('#002855')
      .setFontColor('#ffffff')
      .setFontWeight('bold')
      .setFontSize(13);
  }

  // 4. HACKATHON TEAMS PRESENT
  let presentSheet = ss.getSheetByName(SHEET_HACKATHON_PRESENT);
  if (!presentSheet) presentSheet = ss.insertSheet(SHEET_HACKATHON_PRESENT, 3);
  const presentHeaders = [
    'S.No', 'Team ID', 'Team Name', 'College', 'Team Lead Name',
    'Lead Phone', 'Lead Email', 'Present on Oct 9 (Yes/No)',
    'Project Title / Demo Link', 'Jury Score (100)', 'Remarks'
  ];
  presentSheet.getRange(1, 1, 1, presentHeaders.length).setValues([presentHeaders]);
  presentSheet.getRange(1, 1, 1, presentHeaders.length)
    .setBackground('#003566')
    .setFontColor('#ffd60a')
    .setFontWeight('bold');
  presentSheet.setFrozenRows(1);

  SpreadsheetApp.getUi().alert('✅ Successfully setup all 4 FOUNDRIX 2026 sheets with full team tracking & 15-column RAW DATA!');
}

// ============================================================================
// 2. GOOGLE DRIVE TEAM PERMISSIONS SOLVER
// ============================================================================

/**
 * Gets or creates the Google Drive folder and ensures ANYONE WITH THE LINK CAN VIEW.
 * Solves the team permission request issue once and for all.
 */
function getPaymentScreenshotsFolder() {
  let folder;

  if (SPECIFIC_FOLDER_ID && SPECIFIC_FOLDER_ID.trim() !== '') {
    folder = DriveApp.getFolderById(SPECIFIC_FOLDER_ID.trim());
  } else {
    const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(DRIVE_FOLDER_NAME);
    }
  }

  // Grant public view permission to the folder so team members don't need manual requests
  try {
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (err) {
    Logger.log('Folder sharing note: ' + err.message);
  }

  return folder;
}

/**
 * Menu action to update all existing files in the screenshots folder to "Anyone with Link Can View"
 */
function fixDrivePermissions() {
  const folder = getPaymentScreenshotsFolder();
  const files = folder.getFiles();
  let count = 0;

  while (files.hasNext()) {
    const file = files.next();
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      count++;
    } catch (e) {
      Logger.log('Could not update sharing for: ' + file.getName());
    }
  }

  SpreadsheetApp.getUi().alert(
    '✅ Drive Permissions Fixed!\n\nFolder: ' + folder.getName() +
    '\nUpdated ' + count + ' payment screenshot files to "Anyone with Link Can View".\nYour team can now view all images without permission requests!'
  );
}

/**
 * Decodes base64 image data and saves it to Google Drive with public link sharing
 */
function saveScreenshotFile(base64Data, participationId, studentName, utr) {
  if (!base64Data || base64Data.indexOf('data:') !== 0) {
    return { imageName: 'No Image', driveLink: 'None' };
  }

  const parts = base64Data.split(',');
  const contentType = parts[0].split(':')[1].split(';')[0];
  const decodedBytes = Utilities.base64Decode(parts[1]);

  const cleanName = (studentName || 'Participant').replace(/[^a-zA-Z0-9]/g, '_');
  const cleanUtr = (utr || 'UTR').replace(/[^a-zA-Z0-9]/g, '');
  const extension = contentType.includes('png') ? '.png' : '.jpg';
  const fileName = participationId + '_' + cleanName + '_' + cleanUtr + extension;

  const blob = Utilities.newBlob(decodedBytes, contentType, fileName);
  const folder = getPaymentScreenshotsFolder();
  const file = folder.createFile(blob);

  // CRITICAL FIX: Make the image directly viewable by anyone with the link
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (err) {
    Logger.log('File sharing notice: ' + err.message);
  }

  return {
    imageName: fileName,
    driveLink: file.getUrl()
  };
}

// ============================================================================
// 3. HTTP API HANDLERS (doGet & doPost)
// ============================================================================

/**
 * Handles Web App POST requests from the website
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ 
        success: false, 
        error: 'No POST data received. Note: doPost(e) cannot be executed by clicking "Run" inside Google Apps Script editor because event parameter "e" is undefined. Please deploy as Web App or execute testDoPost() to test.' 
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const rawData = e.postData.contents;
    const payload = JSON.parse(rawData);
    const ss = getSpreadsheet();
    if (!ss) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Spreadsheet not found. Please ensure this script is opened via Extensions > Apps Script inside your Google Sheet, or set SPREADSHEET_ID at line 51 in code.gs.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // CASE A: Team Creation / Team Sync from Hackathon Hub
    if (payload.action === 'create_team' || payload.action === 'join_team' || payload.action === 'team_sync' || (payload.teamId && payload.teamName && !payload.utr)) {
      const teamObj = payload.team || payload;

      const props = PropertiesService.getScriptProperties();
      let teams = [];
      try {
        teams = JSON.parse(props.getProperty('FOUNDRIX_TEAMS') || '[]');
      } catch (err) {
        teams = [];
      }

      const cleanCode = (teamObj.teamCode || '').toUpperCase();
      const cleanId = (teamObj.teamId || '').toUpperCase();
      const cleanName = (teamObj.teamName || '').toUpperCase();

      const idx = teams.findIndex(t => 
        (cleanCode && t.teamCode && t.teamCode.toUpperCase() === cleanCode) || 
        (cleanId && t.teamId && t.teamId.toUpperCase() === cleanId) ||
        (cleanName && t.teamName && t.teamName.toUpperCase() === cleanName)
      );

      if (idx >= 0) {
        teams[idx] = teamObj;
      } else {
        teams.push(teamObj);
      }
      props.setProperty('FOUNDRIX_TEAMS', JSON.stringify(teams));

      updateHackathonTeamSheet(ss, teamObj);
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Team synchronized successfully',
        team: teamObj
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // CASE A.2: Attendance Check-In from Scanner App
    if (payload.action === 'mark_attendance' || payload.action === 'batch_attendance') {
      const idsToMark = payload.ids || (payload.id ? [payload.id] : []);
      const timeStr = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');

      let rawSheet = ss.getSheetByName(SHEET_RAW);
      let partSheet = ss.getSheetByName(SHEET_PARTICIPANTS);
      let markedCount = 0;
      let results = [];

      if (rawSheet && idsToMark.length > 0) {
        // Ensure column 17 exists for Attendance (16 base columns + 1)
        if (rawSheet.getLastColumn() < 17) {
          rawSheet.getRange(1, 17).setValue('Attendance')
            .setBackground('#003566').setFontColor('#ffd60a').setFontWeight('bold');
        }

        const data = rawSheet.getDataRange().getValues();
        const cleanIds = idsToMark.map(id => String(id).trim().toUpperCase());

        for (let i = 1; i < data.length; i++) {
          const rowPartId = String(data[i][COL_PARTICIPATION_ID - 1]).trim().toUpperCase();
          const rowRoll = String(data[i][COL_ROLL - 1]).trim().toUpperCase();
          const rowPhone = String(data[i][COL_PHONE - 1]).replace(/\D/g, '');

          const matched = cleanIds.some(target => 
            target === rowPartId || target === rowRoll || (target.length >= 10 && rowPhone.endsWith(target))
          );

          if (matched) {
            rawSheet.getRange(i + 1, 17).setValue('Present (' + timeStr + ')')
              .setBackground('#d4edda').setFontColor('#155724').setFontWeight('bold');
            markedCount++;
            results.push({ id: rowPartId, name: data[i][COL_NAME - 1], roll: rowRoll, status: 'Marked Present' });
          }
        }
      }

      // Also update PARTICIPANT LIST column 9 if present
      if (partSheet && idsToMark.length > 0) {
        if (partSheet.getLastColumn() < 9) {
          partSheet.getRange(1, 9).setValue('Attendance')
            .setBackground('#1b263b').setFontColor('#00f0ff').setFontWeight('bold');
        }
        const pData = partSheet.getDataRange().getValues();
        const cleanIds = idsToMark.map(id => String(id).trim().toUpperCase());
        for (let i = 1; i < pData.length; i++) {
          const pId = String(pData[i][1]).trim().toUpperCase();
          const pRoll = String(pData[i][4]).trim().toUpperCase();
          if (cleanIds.includes(pId) || cleanIds.includes(pRoll)) {
            partSheet.getRange(i + 1, 9).setValue('Present (' + timeStr + ')')
              .setBackground('#d4edda').setFontColor('#155724').setFontWeight('bold');
          }
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Successfully marked attendance for ' + markedCount + ' attendees.',
        markedCount: markedCount,
        markedAt: timeStr,
        results: results
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // CASE B: Student Registration Intake
    let rawSheet = ss.getSheetByName(SHEET_RAW);
    let partSheet = ss.getSheetByName(SHEET_PARTICIPANTS);

    if (!rawSheet) {
      rawSheet = ss.insertSheet(SHEET_RAW, 0);
      rawSheet.getRange(1, 1, 1, RAW_HEADERS.length).setValues([RAW_HEADERS]);
    }

    // Generate Sequential Participation ID: FDX-101, FDX-102, ...
    const lastRow = rawSheet.getLastRow();
    const count = Math.max(1, lastRow); // row count including header
    const participationId = 'FDX-' + (100 + count);

    // Save screenshot to Drive with team-accessible permissions
    let fileInfo = { imageName: 'None', driveLink: 'None' };
    if (payload.screenshotData) {
      try {
        fileInfo = saveScreenshotFile(payload.screenshotData, participationId, payload.name, payload.utr);
      } catch (dErr) {
        Logger.log('Drive upload error: ' + dErr.toString());
        fileInfo = { imageName: 'Upload Error', driveLink: dErr.message };
      }
    }

    const nowFormatted = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd/MM/yyyy, hh:mm:ss a');

    // 1. Append to RAW DATA (Exact 16 Columns including Password)
    const rawRow = [
      nowFormatted,                                        // Col 1:  date time
      participationId,                                     // Col 2:  Participation ID
      payload.name || '',                                  // Col 3:  name
      payload.college || '',                               // Col 4:  college
      (payload.roll || '').toUpperCase(),                  // Col 5:  Roll number
      payload.branch || '',                                // Col 6:  branch
      payload.year || '',                                  // Col 7:  year
      payload.location || 'Visakhapatnam',                 // Col 8:  location
      payload.phone || '',                                 // Col 9:  phone number
      payload.email || '',                                 // Col 10: gmail
      payload.password || '',                              // Col 11: password (Delegate Dashboard Login)
      payload.utr || '',                                   // Col 12: utr
      fileInfo.imageName,                                  // Col 13: image name
      fileInfo.driveLink,                                  // Col 14: Drive link
      'No',                                                // Col 15: Verified (default No)
      'No'                                                 // Col 16: Email Sent (default No)
    ];
    rawSheet.appendRow(rawRow);

    const newRowIndex = rawSheet.getLastRow();
    rawSheet.getRange(newRowIndex, COL_VERIFIED).setHorizontalAlignment('center');
    rawSheet.getRange(newRowIndex, COL_EMAIL_SENT).setHorizontalAlignment('center');

    // 2. Append to PARTICIPANT LIST
    if (partSheet) {
      const partRow = [
        count,
        participationId,
        payload.name || '',
        payload.college || '',
        (payload.roll || '').toUpperCase(),
        payload.phone || '',
        payload.location || 'Visakhapatnam',
        'No'
      ];
      partSheet.appendRow(partRow);
      partSheet.getRange(partSheet.getLastRow(), 8).setHorizontalAlignment('center');
    }

    // 3. If payload contains Team info, update HACKATHON TEAMS
    if (payload.teamId && payload.teamName) {
      updateHackathonTeamSheet(ss, payload);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: {
        participationId: participationId,
        teamId: payload.teamId || '',
        name: payload.name,
        email: payload.email,
        college: payload.college,
        imageName: fileInfo.imageName,
        driveLink: fileInfo.driveLink,
        verified: 'No',
        emailSent: 'No'
      }
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('doPost error: ' + err.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles Web App GET requests for stats and lookups
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || 'stats';
    const ss = getSpreadsheet();
    if (!ss) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Spreadsheet not found. Please ensure this script is opened via Extensions > Apps Script inside your Google Sheet, or set SPREADSHEET_ID at line 51 in code.gs.'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    const sheet = ss.getSheetByName(SHEET_RAW);

    if (action === 'stats') {
      const lastRow = sheet ? sheet.getLastRow() : 1;
      const totalRegistrations = Math.max(0, lastRow - 1);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        totalRegistrations: totalRegistrations,
        maxSpots: 200,
        spotsRemaining: Math.max(0, 200 - totalRegistrations),
        timestamp: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'lookup') {
      const query = (e && e.parameter && e.parameter.query ? e.parameter.query : '').trim().toLowerCase();
      if (!query || !sheet) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, found: false }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        const partId = String(data[i][COL_PARTICIPATION_ID - 1]).toLowerCase().trim();
        const roll = String(data[i][COL_ROLL - 1]).toLowerCase().trim();
        const phone = String(data[i][COL_PHONE - 1]).replace(/\D/g, '');
        const email = String(data[i][COL_GMAIL - 1]).toLowerCase().trim();
        const cleanQuery = query.replace(/\D/g, '');

        if (
          partId === query || 
          roll === query || 
          email === query || 
          (cleanQuery && phone.length >= 10 && phone.endsWith(cleanQuery))
        ) {
          const rawVerified = data[i][COL_VERIFIED - 1];
          const rawEmailSent = data[i][COL_EMAIL_SENT - 1];
          const isVerified = isVerifiedStatus(rawVerified);
          const isEmailSent = String(rawEmailSent).trim().toLowerCase() === 'yes';

          const resolvedPartId = data[i][COL_PARTICIPATION_ID - 1];
          const resolvedName = data[i][COL_NAME - 1] || 'Delegate';
          const resolvedRoll = data[i][COL_ROLL - 1] || '';

          return ContentService.createTextOutput(JSON.stringify({
            success: true,
            found: true,
            data: {
              participationId: resolvedPartId,
              name: resolvedName,
              college: data[i][COL_COLLEGE - 1],
              roll: resolvedRoll,
              branch: data[i][COL_BRANCH - 1] || 'CSE',
              year: data[i][COL_YEAR - 1] || '3rd Year',
              location: data[i][COL_LOCATION - 1],
              phone: data[i][COL_PHONE - 1],
              email: data[i][COL_GMAIL - 1],
              password: data[i][COL_PASSWORD - 1] || '',
              utr: data[i][COL_UTR - 1],
              verified: isVerified,
              emailSent: isEmailSent,
              qrPassUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent('FOUNDRIX-PASS:' + resolvedPartId + '|' + resolvedName + '|' + resolvedRoll + '|REC')
            }
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }

      return ContentService.createTextOutput(JSON.stringify({ success: true, found: false }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'login') {
      const identifier = (e && e.parameter && e.parameter.identifier ? e.parameter.identifier : '').trim().toLowerCase();
      const pass = (e && e.parameter && e.parameter.password ? e.parameter.password : '').trim();
      if (!identifier || !sheet) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Identifier required' })).setMimeType(ContentService.MimeType.JSON);
      }
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        const partId = String(data[i][COL_PARTICIPATION_ID - 1]).toLowerCase().trim();
        const phone = String(data[i][COL_PHONE - 1]).replace(/\D/g, '');
        const email = String(data[i][COL_GMAIL - 1]).toLowerCase().trim();
        const storedPass = String(data[i][COL_PASSWORD - 1] || '').trim();
        const cleanIdent = identifier.replace(/\D/g, '');

        if (partId === identifier || email === identifier || (cleanIdent && phone.endsWith(cleanIdent))) {
          if (storedPass && pass && storedPass !== pass) {
            return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Incorrect password. Please try again.' })).setMimeType(ContentService.MimeType.JSON);
          }
          return ContentService.createTextOutput(JSON.stringify({
            success: true,
            user: {
              regId: data[i][COL_PARTICIPATION_ID - 1],
              name: data[i][COL_NAME - 1],
              college: data[i][COL_COLLEGE - 1],
              roll: data[i][COL_ROLL - 1],
              branch: data[i][COL_BRANCH - 1],
              year: data[i][COL_YEAR - 1],
              phone: data[i][COL_PHONE - 1],
              email: data[i][COL_GMAIL - 1],
              password: storedPass,
              verified: isVerifiedStatus(data[i][COL_VERIFIED - 1]),
              emailSent: String(data[i][COL_EMAIL_SENT - 1]).trim().toLowerCase() === 'yes',
            }
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'No delegate account found with this email, phone, or ID.' })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'get_teams') {
      const props = PropertiesService.getScriptProperties();
      const teams = props.getProperty('FOUNDRIX_TEAMS') || '[]';
      return ContentService.createTextOutput(teams)
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'sync_team') {
      const teamRaw = e && e.parameter && e.parameter.team;
      if (teamRaw) {
        let teamObj = null;
        try {
          teamObj = JSON.parse(decodeURIComponent(teamRaw));
        } catch(pErr) {
          teamObj = null;
        }
        if (teamObj) {
          updateHackathonTeamSheet(ss, teamObj);
          return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Team synced to Google Sheet successfully', team: teamObj }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Invalid team payload' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'send_otp') {
      const email = (e && e.parameter && e.parameter.email ? e.parameter.email : '').trim().toLowerCase();
      if (!email) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Email is required' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      const props = PropertiesService.getScriptProperties();
      props.setProperty('OTP_' + email, JSON.stringify({ otp: otp, expiresAt: Date.now() + 15 * 60 * 1000 }));

      try {
        MailApp.sendEmail({
          to: email,
          subject: 'FOUNDRIX 2026 — Password Reset Verification Code: ' + otp,
          htmlBody: `
            <div style="font-family: Arial, sans-serif; background-color: #060a14; color: #ffffff; padding: 30px; border-radius: 12px;">
              <h2 style="color: #00f0ff; margin-bottom: 8px;">FOUNDRIX 2026 • Password Reset Code</h2>
              <p style="color: #cbd5e1; font-size: 15px;">You requested a verification code to access your FOUNDRIX Attendee Dashboard.</p>
              <div style="background: rgba(0, 240, 255, 0.1); border: 2px dashed #00f0ff; border-radius: 8px; padding: 18px; text-align: center; margin: 24px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #ffffff; font-family: monospace;">${otp}</span>
              </div>
              <p style="color: #94a3b8; font-size: 13px;">This code expires in 15 minutes. If you did not request this, please ignore this email.</p>
              <p style="color: #64748b; font-size: 12px; margin-top: 20px;">Raghu Engineering College • Visakhapatnam</p>
            </div>
          `
        });
      } catch (mailErr) {
        Logger.log('MailApp error: ' + mailErr.toString());
      }

      return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Verification code sent to email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'verify_otp') {
      const email = (e && e.parameter && e.parameter.email ? e.parameter.email : '').trim().toLowerCase();
      const code = (e && e.parameter && e.parameter.code ? e.parameter.code : '').trim();
      const props = PropertiesService.getScriptProperties();
      const raw = props.getProperty('OTP_' + email);
      if (!raw) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'No verification code was requested for this email' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      const data = JSON.parse(raw);
      if (Date.now() > data.expiresAt) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Verification code has expired. Please request a new one.' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      if (data.otp !== code) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Invalid verification code' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      return ContentService.createTextOutput(JSON.stringify({ success: true, verified: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, status: 'Foundrix Backend Active' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('doGet error: ' + err.toString());
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================================
// 4. HACKATHON TEAM DIRECTORY & JURY SCORING SHEETS
// ============================================================================

/**
 * Updates or appends formatted team block in HACKATHON TEAMS & HACKATHON TEAMS PRESENT sheets
 * Auto-creates sheets if missing and keeps a master roster of all 1 to 4 member names!
 */
function updateHackathonTeamSheet(ss, payload) {
  let hackSheet = ss.getSheetByName(SHEET_HACKATHON);
  if (!hackSheet) {
    hackSheet = ss.insertSheet(SHEET_HACKATHON, 2);
  }

  let presentSheet = ss.getSheetByName(SHEET_HACKATHON_PRESENT);
  if (!presentSheet) {
    presentSheet = ss.insertSheet(SHEET_HACKATHON_PRESENT, 3);
  }

  // Update teams in ScriptProperties
  const props = PropertiesService.getScriptProperties();
  let teams = [];
  try {
    teams = JSON.parse(props.getProperty('FOUNDRIX_TEAMS') || '[]');
  } catch (err) {
    teams = [];
  }

  const cleanCode = (payload.teamCode || '').toUpperCase();
  const cleanId = (payload.teamId || '').toUpperCase();
  const cleanName = (payload.teamName || '').toUpperCase();

  const idx = teams.findIndex(t => 
    (cleanCode && t.teamCode && t.teamCode.toUpperCase() === cleanCode) || 
    (cleanId && t.teamId && t.teamId.toUpperCase() === cleanId) ||
    (cleanName && t.teamName && t.teamName.toUpperCase() === cleanName)
  );

  if (idx >= 0) {
    teams[idx] = payload;
  } else {
    teams.push(payload);
  }
  props.setProperty('FOUNDRIX_TEAMS', JSON.stringify(teams));

  // Render clean, master HACKATHON TEAMS directory
  hackSheet.clear();
  hackSheet.appendRow(['FOUNDRIX 2026 — OFFICIAL HACKATHON TEAMS & MEMBERS DIRECTORY']);
  hackSheet.getRange('A1:G1').merge()
    .setBackground('#002855')
    .setFontColor('#00f0ff')
    .setFontWeight('bold')
    .setFontSize(13)
    .setHorizontalAlignment('center');

  teams.forEach((team, tIdx) => {
    hackSheet.appendRow(['']); // Visual spacer
    const members = (team.members && Array.isArray(team.members)) ? team.members : [team.leader || team];
    
    // Normalize team ID display: always clean "TEAM-001", "TEAM-002" without duplicate "TEAM TEAM"
    let cleanId = String(team.teamId || '').trim().toUpperCase();
    if (!cleanId) {
      cleanId = 'TEAM-' + String(tIdx + 1).padStart(3, '0');
    } else {
      cleanId = cleanId.replace(/^TEAM\s*TEAM/i, 'TEAM').replace(/^TEAM\s*-?\s*/i, 'TEAM-');
    }

    const teamTitle = cleanId + ': ' + 
                      (team.teamName || 'UNTITLED').toUpperCase() + 
                      '  [SHAREABLE CODE: ' + (team.teamCode || 'N/A') + ']  (' + members.length + '/4 Members)';
    
    hackSheet.appendRow([teamTitle]);
    const headerRow = hackSheet.getLastRow();
    hackSheet.getRange(headerRow, 1, 1, 7).merge()
      .setBackground('#0f172a')
      .setFontColor('#38bdf8')
      .setFontWeight('bold')
      .setFontSize(11);

    hackSheet.appendRow(['Member #', 'Student / Member Name', 'Participation ID', 'College / Campus', 'Gmail', 'Phone', 'Role']);
    const colHeaderRow = hackSheet.getLastRow();
    hackSheet.getRange(colHeaderRow, 1, 1, 7)
      .setBackground('#1e293b')
      .setFontColor('#94a3b8')
      .setFontWeight('bold')
      .setFontSize(10);

    members.forEach((m, mIdx) => {
      hackSheet.appendRow([
        mIdx + 1,
        m.name || ('Member ' + (mIdx + 1)),
        m.regId || m.participationId || '',
        m.college || team.college || 'Raghu Engineering College',
        m.email || '',
        m.phone || '',
        m.role || (mIdx === 0 ? 'Team Lead' : 'Member')
      ]);
      const memberRow = hackSheet.getLastRow();
      if (m.role === 'Team Lead' || mIdx === 0) {
        hackSheet.getRange(memberRow, 7).setFontWeight('bold').setFontColor('#0284c7');
        hackSheet.getRange(memberRow, 2).setFontWeight('bold');
      }
    });
  });

  hackSheet.setColumnWidth(1, 80);
  hackSheet.setColumnWidth(2, 200);
  hackSheet.setColumnWidth(3, 140);
  hackSheet.setColumnWidth(4, 220);
  hackSheet.setColumnWidth(5, 200);
  hackSheet.setColumnWidth(6, 130);
  hackSheet.setColumnWidth(7, 120);

  // Render HACKATHON TEAMS PRESENT (Pitch Day Sheet)
  presentSheet.clear();
  const presentHeaders = [
    'S.No', 'Team ID', 'Team Code', 'Team Name', 'College', 'Team Lead Name',
    'Lead Phone', 'Lead Email', 'Member Count', 'All Team Members (Names & IDs)',
    'Present on Oct 9 (Yes/No)', 'Project Title / Demo Link', 'Jury Score (100)', 'Remarks'
  ];
  presentSheet.getRange(1, 1, 1, presentHeaders.length).setValues([presentHeaders]);
  presentSheet.getRange(1, 1, 1, presentHeaders.length)
    .setBackground('#003566')
    .setFontColor('#ffd60a')
    .setFontWeight('bold');
  presentSheet.setFrozenRows(1);

  teams.forEach((t, i) => {
    const lead = t.leader || (t.members && t.members[0]) || {};
    const memberSummary = (t.members || []).map(m => `${m.name || 'Member'} (${m.regId || 'ID'})`).join(', ');
    presentSheet.appendRow([
      i + 1,
      (t.teamId || ('TEAM-' + String(i + 1).padStart(3, '0'))).replace(/^TEAM\s*TEAM/i, 'TEAM').replace(/^TEAM-?/i, 'TEAM-'),
      t.teamCode || '',
      (t.teamName || '').toUpperCase(),
      t.college || 'Raghu Engineering College',
      lead.name || '',
      lead.phone || '',
      lead.email || '',
      (t.members && t.members.length) || 1,
      memberSummary,
      'Pending',
      '',
      '',
      ''
    ]);
  });
}

/**
 * Menu Item helper: Rebuilds HACKATHON TEAMS from stored ScriptProperties
 */
function rebuildHackathonTeamsMenu() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const props = PropertiesService.getScriptProperties();
  const teams = JSON.parse(props.getProperty('FOUNDRIX_TEAMS') || '[]');

  if (teams.length === 0) {
    SpreadsheetApp.getUi().alert('No teams recorded in system yet.');
    return;
  }

  teams.forEach(t => updateHackathonTeamSheet(ss, t));
  SpreadsheetApp.getUi().alert('✅ Successfully regenerated HACKATHON TEAMS sheet with ' + teams.length + ' active teams!');
}

// ============================================================================
// 5. AUTOMATED EMAIL DISPATCH ENGINE & QR CODE TICKET DELIVERY
// ============================================================================

/**
 * Helper to check if a cell value represents "Verified"
 * Tolerant of "Yes", "yes", "Verified", "verified", "True", "true", "Y", "Approved", "OK", etc.
 */
function isVerifiedStatus(val) {
  if (val === undefined || val === null) return false;
  const s = String(val).trim().toLowerCase();
  return s === 'yes' || s === 'verified' || s === 'true' || s === 'y' || s === 'approved' || s === 'ok' || s === '1';
}

/**
 * Triggered automatically by the Installable onEdit trigger when any cell is edited.
 * Supports edits in BOTH "RAW DATA" (Column 14) and "PARTICIPANT LIST" (Column 8).
 * Accepts "Yes", "Verified", "True", "Approved", etc.
 */
function handleSheetEdit(e) {
  if (!e || !e.range) return;

  const range = e.range;
  const sheet = range.getSheet();
  const sheetName = sheet.getName();
  const editedCol = range.getColumn();
  const editedRow = range.getRow();

  if (editedRow <= 1) return; // Ignore header row

  const ss = getSpreadsheet() || sheet.getParent();
  let rawSheet = ss.getSheetByName(SHEET_RAW);
  if (!rawSheet) return;

  // SCENARIO 1: Edited "RAW DATA" sheet at Column 14 (Verified)
  if (sheetName === SHEET_RAW && editedCol === COL_VERIFIED) {
    const verifiedValue = range.getValue();

    if (isVerifiedStatus(verifiedValue)) {
      const emailSentValue = String(rawSheet.getRange(editedRow, COL_EMAIL_SENT).getValue()).trim().toLowerCase();

      // Normalize the cell display to standard "Yes"
      range.setValue('Yes').setBackground('#e6f4ea').setFontColor('#137333').setFontWeight('bold');

      // Dispatch confirmation email with QR Ticket if not sent yet
      if (emailSentValue !== 'yes') {
        const success = sendParticipantConfirmationEmail(rawSheet, editedRow);
        if (success) {
          rawSheet.getRange(editedRow, COL_EMAIL_SENT)
            .setValue('Yes')
            .setBackground('#e6f4ea')
            .setFontColor('#137333')
            .setFontWeight('bold');

          rawSheet.getRange(editedRow, 1, 1, RAW_HEADERS.length).setBackground('#f8fcf9');
        }
      }

      // Synchronize to PARTICIPANT LIST
      syncParticipantListVerification(rawSheet, editedRow);
    }
  }

  // SCENARIO 2: Edited "PARTICIPANT LIST" sheet at Column 8 (Verified)
  else if (sheetName === SHEET_PARTICIPANTS && editedCol === 8) {
    const verifiedValue = range.getValue();

    if (isVerifiedStatus(verifiedValue)) {
      range.setValue('Yes').setBackground('#e6f4ea').setFontColor('#137333').setFontWeight('bold');

      // Get Participation ID from Column 2 of PARTICIPANT LIST
      const partId = String(sheet.getRange(editedRow, 2).getValue()).trim();
      if (!partId) return;

      // Find matching row in RAW DATA
      const rawData = rawSheet.getDataRange().getValues();
      for (let r = 1; r < rawData.length; r++) {
        const rowPartId = String(rawData[r][COL_PARTICIPATION_ID - 1]).trim();
        if (rowPartId.toUpperCase() === partId.toUpperCase()) {
          const rawRowIndex = r + 1;
          const emailSent = String(rawData[r][COL_EMAIL_SENT - 1]).trim().toLowerCase();

          // Mark Verified = Yes in RAW DATA
          rawSheet.getRange(rawRowIndex, COL_VERIFIED)
            .setValue('Yes')
            .setBackground('#e6f4ea')
            .setFontColor('#137333')
            .setFontWeight('bold');

          // Dispatch confirmation email with QR Ticket if not sent yet
          if (emailSent !== 'yes') {
            const success = sendParticipantConfirmationEmail(rawSheet, rawRowIndex);
            if (success) {
              rawSheet.getRange(rawRowIndex, COL_EMAIL_SENT)
                .setValue('Yes')
                .setBackground('#e6f4ea')
                .setFontColor('#137333')
                .setFontWeight('bold');

              rawSheet.getRange(rawRowIndex, 1, 1, RAW_HEADERS.length).setBackground('#f8fcf9');
            }
          }
          break;
        }
      }
    }
  }
}

/**
 * Synchronizes Verified status to PARTICIPANT LIST sheet
 */
function syncParticipantListVerification(rawSheet, rawRowIndex) {
  const ss = getSpreadsheet() || SpreadsheetApp.getActiveSpreadsheet();
  const partSheet = ss.getSheetByName(SHEET_PARTICIPANTS);
  if (!partSheet) return;

  const partId = rawSheet.getRange(rawRowIndex, COL_PARTICIPATION_ID).getValue();
  const data = partSheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][1]).trim().toUpperCase() === String(partId).trim().toUpperCase()) {
      partSheet.getRange(i + 1, 8)
        .setValue('Yes')
        .setBackground('#e6f4ea')
        .setFontColor('#137333')
        .setFontWeight('bold');
      break;
    }
  }
}

/**
 * Menu item action: Loops through all rows and processes any rows where
 * Verified is set to "Yes", "Verified", "True", etc., and Email Sent != "Yes".
 * Cross-checks BOTH "RAW DATA" and "PARTICIPANT LIST".
 */
function processVerifiedRows() {
  const ss = getSpreadsheet() || SpreadsheetApp.getActiveSpreadsheet();
  const rawSheet = ss.getSheetByName(SHEET_RAW);
  const partSheet = ss.getSheetByName(SHEET_PARTICIPANTS);

  if (!rawSheet) {
    SpreadsheetApp.getUi().alert('Could not find sheet: ' + SHEET_RAW);
    return;
  }

  const lastRow = rawSheet.getLastRow();
  if (lastRow <= 1) {
    SpreadsheetApp.getUi().alert('No student registrations found yet.');
    return;
  }

  // 1. Cross-sync any verified entries from PARTICIPANT LIST to RAW DATA
  if (partSheet && partSheet.getLastRow() > 1) {
    const pData = partSheet.getDataRange().getValues();
    const rData = rawSheet.getDataRange().getValues();
    for (let p = 1; p < pData.length; p++) {
      const pPartId = String(pData[p][1]).trim().toUpperCase();
      const pVerified = pData[p][7]; // Col 8 is index 7
      if (isVerifiedStatus(pVerified)) {
        for (let r = 1; r < rData.length; r++) {
          if (String(rData[r][COL_PARTICIPATION_ID - 1]).trim().toUpperCase() === pPartId) {
            rawSheet.getRange(r + 1, COL_VERIFIED).setValue('Yes').setBackground('#e6f4ea').setFontColor('#137333').setFontWeight('bold');
            partSheet.getRange(p + 1, 8).setValue('Yes').setBackground('#e6f4ea').setFontColor('#137333').setFontWeight('bold');
            break;
          }
        }
      }
    }
  }

  // 2. Process all rows in RAW DATA
  const data = rawSheet.getRange(2, 1, rawSheet.getLastRow() - 1, RAW_HEADERS.length).getValues();
  let sentCount = 0;

  for (let i = 0; i < data.length; i++) {
    const rowIndex = i + 2;
    const verified = data[i][COL_VERIFIED - 1];
    const emailSent = String(data[i][COL_EMAIL_SENT - 1]).trim().toLowerCase();

    if (isVerifiedStatus(verified)) {
      rawSheet.getRange(rowIndex, COL_VERIFIED).setValue('Yes').setBackground('#e6f4ea').setFontColor('#137333').setFontWeight('bold');
      syncParticipantListVerification(rawSheet, rowIndex);

      if (emailSent !== 'yes') {
        const success = sendParticipantConfirmationEmail(rawSheet, rowIndex);
        if (success) {
          rawSheet.getRange(rowIndex, COL_EMAIL_SENT)
            .setValue('Yes')
            .setBackground('#e6f4ea')
            .setFontColor('#137333')
            .setFontWeight('bold');

          rawSheet.getRange(rowIndex, 1, 1, RAW_HEADERS.length).setBackground('#f8fcf9');
          sentCount++;
        }
      }
    }
  }

  SpreadsheetApp.getUi().alert(
    '✅ Processing Complete!\n\n' +
    '• Successfully dispatched ' + sentCount + ' new confirmation emails with scannable QR Entry Passes.\n' +
    '• Synchronized Verified status between RAW DATA and PARTICIPANT LIST.'
  );
}

/**
 * Menu action to send/resend the QR confirmation email to the currently selected row in the active sheet
 */
function sendTicketToActiveRow() {
  const ss = getSpreadsheet() || SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const activeRow = sheet.getActiveCell().getRow();

  if (activeRow <= 1) {
    SpreadsheetApp.getUi().alert('Please click on a participant row first.');
    return;
  }

  let rawSheet = ss.getSheetByName(SHEET_RAW);
  let targetRawRow = activeRow;

  if (sheet.getName() === SHEET_PARTICIPANTS) {
    const partId = String(sheet.getRange(activeRow, 2).getValue()).trim();
    if (!partId) {
      SpreadsheetApp.getUi().alert('No Participation ID found in row ' + activeRow);
      return;
    }
    const rawData = rawSheet.getDataRange().getValues();
    let found = false;
    for (let r = 1; r < rawData.length; r++) {
      if (String(rawData[r][COL_PARTICIPATION_ID - 1]).trim().toUpperCase() === partId.toUpperCase()) {
        targetRawRow = r + 1;
        found = true;
        break;
      }
    }
    if (!found) {
      SpreadsheetApp.getUi().alert('Could not find ' + partId + ' in RAW DATA sheet.');
      return;
    }
  }

  const success = sendParticipantConfirmationEmail(rawSheet, targetRawRow);
  if (success) {
    rawSheet.getRange(targetRawRow, COL_VERIFIED).setValue('Yes').setBackground('#e6f4ea').setFontColor('#137333').setFontWeight('bold');
    rawSheet.getRange(targetRawRow, COL_EMAIL_SENT).setValue('Yes').setBackground('#e6f4ea').setFontColor('#137333').setFontWeight('bold');
    rawSheet.getRange(targetRawRow, 1, 1, RAW_HEADERS.length).setBackground('#f8fcf9');
    syncParticipantListVerification(rawSheet, targetRawRow);

    SpreadsheetApp.getUi().alert('✅ Confirmation email with QR Ticket sent successfully for row ' + targetRawRow + '!');
  } else {
    SpreadsheetApp.getUi().alert('❌ Failed to send email. Please check if the row has a valid email address.');
  }
}

/**
 * Builds and sends the official HTML confirmation email with scannable QR ticket to the student's gmail
 */
function sendParticipantConfirmationEmail(sheet, rowIndex) {
  const rowData = sheet.getRange(rowIndex, 1, 1, RAW_HEADERS.length).getValues()[0];

  const partId = rowData[COL_PARTICIPATION_ID - 1];
  const name = rowData[COL_NAME - 1] || 'Delegate';
  const college = rowData[COL_COLLEGE - 1] || 'Raghu Engineering College';
  const roll = rowData[COL_ROLL - 1] || '';
  const branch = rowData[COL_BRANCH - 1] || 'Technical';
  const year = rowData[COL_YEAR - 1] || '2026';
  const location = rowData[COL_LOCATION - 1] || 'Visakhapatnam';
  const email = String(rowData[COL_GMAIL - 1]).trim();
  const utr = rowData[COL_UTR - 1] || 'Verified';

  if (!email || !email.includes('@')) {
    Logger.log('Invalid email at row ' + rowIndex + ': ' + email);
    return false;
  }

  // Generate Official Scannable QR Ticket URL
  const qrData = 'FOUNDRIX-PASS:' + partId + '|' + name + '|' + roll + '|REC';
  const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=' + encodeURIComponent(qrData);

  const subject = '🎟️ Pass Confirmed: ' + partId + ' — FOUNDRIX 2026 Tech Summit';

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; background-color: #07090f; color: #ffffff; padding: 32px 16px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #0c101c; border: 1px solid #146ef5; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.8);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0e1a38 0%, #060b18 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #00f0ff;">
          <h2 style="color: #00f0ff; letter-spacing: 0.15em; font-size: 13px; text-transform: uppercase; margin: 0 0 8px 0;">RAGHU ENGINEERING COLLEGE • REC CAMPUS</h2>
          <h1 style="color: #ffffff; font-size: 32px; font-weight: 900; letter-spacing: 0.05em; margin: 0; text-transform: uppercase;">FOUNDRIX 2026</h1>
          <p style="color: #94a3b8; font-size: 13px; margin: 8px 0 0 0; letter-spacing: 0.08em; text-transform: uppercase;">OFFICIAL SUMMIT ENTRY PASS</p>
        </div>

        <!-- Pass Card Details -->
        <div style="padding: 28px 24px;">
          <p style="font-size: 16px; color: #e2e8f0; margin: 0 0 20px 0;">
            Dear <strong>${name}</strong>,
          </p>
          <p style="font-size: 14px; color: #94a3b8; line-height: 1.6; margin: 0 0 24px 0;">
            Your payment (UTR: <code style="color: #00f0ff; background: rgba(0,240,255,0.1); padding: 2px 6px; border-radius: 4px;">${utr}</code>) has been successfully verified by our student finance desk! Your official delegate pass for <strong>FOUNDRIX 2026</strong> is confirmed.
          </p>

          <!-- OFFICIAL SCANNABLE QR TICKET BOX -->
          <div style="background: #090e1a; border: 2px solid #00f0ff; border-radius: 14px; padding: 26px 20px; text-align: center; margin: 24px 0; box-shadow: 0 0 30px rgba(0, 240, 255, 0.15);">
            <div style="color: #00f0ff; font-size: 13px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 14px;">
              🎟️ OFFICIAL GATE CHECK-IN QR TICKET
            </div>
            <div style="display: inline-block; background: #ffffff; padding: 14px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.6);">
              <img src="${qrCodeUrl}" alt="Foundrix 2026 QR Entry Pass" width="200" height="200" style="display: block; width: 200px; height: 200px; border: 0;" />
            </div>
            <div style="margin-top: 14px; font-family: 'Courier New', monospace; font-size: 22px; font-weight: bold; color: #00f0ff; letter-spacing: 0.12em;">
              ${partId}
            </div>
            <div style="font-size: 12px; color: #10b981; font-weight: bold; margin-top: 4px; letter-spacing: 0.05em;">
              ✓ OFFICIAL DELEGATE PASS CONFIRMED
            </div>
            <div style="font-size: 12px; color: #94a3b8; line-height: 1.5; margin-top: 10px; max-width: 440px; margin-left: auto; margin-right: auto;">
              Present this QR code on your phone screen at the REC campus entrance registration desk on <strong>October 9, 2026</strong> for instant barcode scanning, lanyard badge issuance & delegate kit handover.
            </div>
          </div>

          <!-- Ticket Summary Table -->
          <div style="background: #111728; border: 1px dashed #00f0ff; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="color: #94a3b8; padding: 6px 0;">Participation ID:</td>
                <td style="color: #00f0ff; font-weight: bold; font-size: 16px; text-align: right; padding: 6px 0;">${partId}</td>
              </tr>
              <tr>
                <td style="color: #94a3b8; padding: 6px 0;">Delegate Name:</td>
                <td style="color: #ffffff; font-weight: bold; text-align: right; padding: 6px 0;">${name}</td>
              </tr>
              <tr>
                <td style="color: #94a3b8; padding: 6px 0;">Roll Number:</td>
                <td style="color: #ffffff; text-align: right; padding: 6px 0;">${roll}</td>
              </tr>
              <tr>
                <td style="color: #94a3b8; padding: 6px 0;">College / Campus:</td>
                <td style="color: #ffffff; text-align: right; padding: 6px 0;">${college}</td>
              </tr>
              <tr>
                <td style="color: #94a3b8; padding: 6px 0;">Branch & Year:</td>
                <td style="color: #ffffff; text-align: right; padding: 6px 0;">${branch} • ${year}</td>
              </tr>
              <tr>
                <td style="color: #94a3b8; padding: 6px 0;">Location:</td>
                <td style="color: #ffffff; text-align: right; padding: 6px 0;">${location}</td>
              </tr>
              <tr>
                <td style="color: #94a3b8; padding: 6px 0;">Pass Type:</td>
                <td style="color: #fbbf24; font-weight: bold; text-align: right; padding: 6px 0;">₹799 All-Inclusive Pass</td>
              </tr>
            </table>
          </div>

          <!-- Included Access -->
          <h3 style="color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px 0;">What Your Pass Unlocks:</h3>
          <ul style="color: #94a3b8; font-size: 13px; line-height: 1.7; padding-left: 20px; margin: 0 0 24px 0;">
            <li><strong style="color: #ffffff;">Online Hackathon:</strong> Build sprint + live jury pitch on Day 1 (Oct 9).</li>
            <li><strong style="color: #ffffff;">2-Day In-Person Workshop:</strong> Tech, startup & venture masterclasses inside REC campus.</li>
            <li><strong style="color: #ffffff;">Official Delegate Kit:</strong> Summit ID badge, stickers, notebook & welcome swags.</li>
            <li><strong style="color: #ffffff;">Verified Academic Certificates:</strong> E-Cell, IIT Mumbai certificate (first 200) + official participation credentials.</li>
          </ul>

          <!-- Check-in Guide -->
          <div style="background: rgba(20, 110, 245, 0.12); border-left: 4px solid #146ef5; padding: 14px 16px; border-radius: 4px; margin-bottom: 20px;">
            <p style="color: #ffffff; font-size: 13px; font-weight: bold; margin: 0 0 4px 0;">Check-In Instructions:</p>
            <p style="color: #cbd5e1; font-size: 12px; line-height: 1.5; margin: 0;">
              Please present your <strong>Gate Check-In QR Ticket</strong> above or your <strong>Participation ID (${partId})</strong> at the Registration Desk upon arriving at REC Campus on <strong>October 9, 2026</strong>.
            </p>
          </div>

          <!-- Official WhatsApp Delegates Community -->
          <div style="background: rgba(37, 211, 102, 0.1); border: 1.5px solid #25d366; border-radius: 8px; padding: 18px 20px; text-align: center; margin-bottom: 24px;">
            <p style="color: #25d366; font-size: 14px; font-weight: bold; letter-spacing: 0.05em; margin: 0 0 6px 0; text-transform: uppercase;">
              📱 Official WhatsApp Delegates Group
            </p>
            <p style="color: #cbd5e1; font-size: 13px; line-height: 1.5; margin: 0 0 14px 0;">
              Join 200+ registered delegates for live summit announcements, schedule drops, and hackathon team matchmaking:
            </p>
            <a href="${WHATSAPP_GROUP_URL}" target="_blank" style="display: inline-block; background-color: #25d366; color: #07090f; font-weight: 800; font-size: 14px; text-decoration: none; padding: 11px 24px; border-radius: 6px; letter-spacing: 0.03em;">
              JOIN WHATSAPP GROUP →
            </a>
          </div>

          <!-- Event Coordinates -->
          <div style="font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
            <p style="margin: 0 0 6px 0;"><strong style="color: #94a3b8;">Summit Venue:</strong> ${SUMMIT_VENUE}</p>
            <p style="margin: 0 0 6px 0;"><strong style="color: #94a3b8;">Summit Dates:</strong> ${SUMMIT_DATES}</p>
            <p style="margin: 0 0 4px 0;"><strong style="color: #94a3b8;">Student Helplines:</strong></p>
            <p style="margin: 0 0 2px 0;">• ${COORDINATOR_1}</p>
            <p style="margin: 0 0 0 0;">• ${COORDINATOR_2}</p>
          </div>

        </div>

        <!-- Footer -->
        <div style="background: #060912; padding: 16px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #475569;">
          Initiated and Hosted by Students of Raghu Engineering College • NEC E-Cell IIT Bombay
        </div>

      </div>
    </div>
  `;

  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody,
      name: SENDER_NAME
    });
    Logger.log('Confirmation email with QR Pass successfully dispatched to: ' + email);
    return true;
  } catch (mailErr) {
    Logger.log('Failed to send email to ' + email + ': ' + mailErr.toString());
    return false;
  }
}

// ============================================================================
// 6. TRIGGER INSTALLATION
// ============================================================================

/**
 * Installs an authorized onEdit trigger for the active spreadsheet.
 * Google Apps Script requires an installable trigger to send emails on edit.
 */
function installOnEditTrigger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const triggers = ScriptApp.getUserTriggers(ss);

  // Remove duplicate triggers if already installed
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'handleSheetEdit') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Create new installable trigger
  ScriptApp.newTrigger('handleSheetEdit')
    .forSpreadsheet(ss)
    .onEdit()
    .create();

  SpreadsheetApp.getUi().alert(
    '⚡ Auto-Email Edit Trigger Installed Successfully!\n\nWhenever any team member changes "Verified" to "Yes", the script will:\n1. Check if "Email Sent" is "No".\n2. Send the confirmation email.\n3. Mark "Email Sent" as "Yes" (preventing duplicate sends).'
  );
}

// ============================================================================
// 7. DEVELOPER TEST HELPERS (Run these in Apps Script Editor safely!)
// ============================================================================

/**
 * Run this function from the Apps Script editor to safely test doGet!
 */
function testDoGet() {
  const mockEvent = {
    parameter: {
      action: 'stats'
    }
  };
  const result = doGet(mockEvent);
  Logger.log('doGet test result: ' + result.getContent());
}

/**
 * Run this function from the Apps Script editor to safely test doPost!
 */
function testDoPost() {
  const mockPayload = {
    action: 'stats_check',
    timestamp: new Date().toISOString()
  };
  const mockEvent = {
    postData: {
      contents: JSON.stringify(mockPayload)
    }
  };
  const result = doPost(mockEvent);
  Logger.log('doPost test result: ' + result.getContent());
}
