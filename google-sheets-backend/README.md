# FOUNDRIX 2026 — Master Google Sheets Backend & Team Automation Guide

This backend manages the complete 4-sheet ecosystem for the event:
1. **`RAW DATA`**: Master 15-column intake with payment UTRs, Drive screenshots, verification, and email status.
2. **`PARTICIPANT LIST`**: Clean delegate check-in roster automatically synced with verification.
3. **`HACKATHON TEAMS`**: Visual team directory grouping all 3–4 member teams, team leads, emails, and roles.
4. **`HACKATHON TEAMS PRESENT`**: Oct 9 pitch day check-in, project demos & jury scoring sheet.

---

## 📊 1. Master "RAW DATA" 15-Column Structure

| Col # | Header Name | Description / Default Value |
|:---:|:---|:---|
| **1** | `date time` | Submission timestamp (IST) |
| **2** | `Participation ID` | Unique ID generated sequentially (`FDX-101`, `FDX-102`, etc.) |
| **3** | `name` | Delegate's full name |
| **4** | `college` | College name (e.g. Raghu Engineering College) |
| **5** | `Roll number` | Student Roll / ID number |
| **6** | `branch` | Academic branch (CSE, ECE, AI&DS, etc.) |
| **7** | `year` | Year of study (1st, 2nd, 3rd, 4th Year) |
| **8** | `location` | Location / City (e.g. Visakhapatnam) |
| **9** | `phone number` | WhatsApp / Mobile |
| **10** | `gmail` | Email address where the pass is dispatched |
| **11** | `utr` | 12-digit UPI reference number |
| **12** | `image name` | Formatted file name (`FDX-101_Name_UTR.jpg`) |
| **13** | `Drive link` | **Direct Google Drive view link with public view access** |
| **14** | `Verified` | Default: **`No`** (Dropdown: `No` / `Yes`) |
| **15** | `Email Sent` | Default: **`No`** (Auto-updated to **`Yes`** when email is sent) |

---

## 👥 2. Tracking Hackathon Teams (`HACKATHON TEAMS` & `HACKATHON TEAMS PRESENT`)

### `HACKATHON TEAMS`
Groups all 3–4 member teams into clean formatted visual cards:
- **Team Header**: `TEAM TEAM001: TEAM NAME (College)`
- **Member Table**: `S.No` | `Participation ID` | `Member Name` | `Gmail` | `Phone` | `Role (Lead/Member)`

### `HACKATHON TEAMS PRESENT`
For Day 1 (Oct 9) Pitching & Evaluation:
- `S.No` | `Team ID` | `Team Name` | `College` | `Team Lead Name` | `Lead Phone` | `Lead Email` | `Present on Oct 9 (Yes/No)` | `Project Title / Demo Link` | `Jury Score (100)` | `Remarks`

---

## 🔒 3. Solving the Google Drive Team Permission Problem

### Why this happens:
By default, files uploaded by scripts are set to **Private**. When you share the spreadsheet with team members, clicking the link gives a "You need access - Request access" error.

### How it is solved:
1. Every uploaded screenshot is automatically shared with **"Anyone with the link can view"**:
   ```javascript
   file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
   folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
   ```
2. Any team member can click the **Drive link** column and view the payment screenshot immediately without asking for permission!
3. If you have any older files that need unlocking, click:  
   **`⚡ Foundrix Admin > 4. Fix Google Drive Team Permissions`**

---

## ⚡ 4. Automated Verification & Duplicate Email Prevention

1. Change `Verified` from `No` to **`Yes`** in `RAW DATA`.
2. The script checks: **Is `Email Sent` already `Yes`?**
3. If `Email Sent` is `No`:
   - Sends the official HTML pass confirmation email to the student's Gmail.
   - Sets `Email Sent` to **`Yes`** and colors the row soft green (`#f8fcf9`).
   - Syncs `Verified` to `Yes` in `PARTICIPANT LIST`.
   - **No duplicate emails**: If anyone edits the row or toggles `Verified` again, the script sees `Email Sent === "Yes"` and strictly blocks re-sending.

---

## 🚀 5. Quick 3-Minute Setup

1. Open your Google Spreadsheet &rarr; Click **Extensions > Apps Script**.
2. Replace everything with [`code.gs`](file:///d:/Nec_Projects/new%20website/foundrixrec/foundrixrec/google-sheets-backend/code.gs) &rarr; Press **Ctrl + S**.
3. In the toolbar, select **`setupAllSheets`** &rarr; Click **Run** (authorizes the script and creates all 4 sheets).
4. Refresh your Google Sheet &rarr; Click **`⚡ Foundrix Admin > 2. Install Auto-Email Edit Trigger`** (enables automatic emails when `Verified` is toggled).
5. Click **Deploy > New deployment > Web app** (Execute as: *Me*, Who has access: *Anyone*) &rarr; Copy the URL to `.env` (`VITE_GOOGLE_SCRIPT_URL`).
