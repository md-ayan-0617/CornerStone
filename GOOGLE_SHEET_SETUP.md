# Google Sheets Integration Guide

Contact form ka data direct aapki Google Sheet me save karne ke liye ye 2 minute ka setup complete karein:

---

## Step 1: Nayi Google Sheet Banayein
1. [Google Sheets](https://sheets.new) par jayein aur ek blank sheet banayein.
2. Pehli row (Row 1) me ye column headers daalein:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| **Timestamp** | **Name** | **Company** | **Email** | **Phone** | **Website** | **Budget** | **Timeline** | **Services** | **Details** |

---

## Step 2: Apps Script Add Karein
1. Google Sheet ke top menu me jayein: **Extensions** > **Apps Script**.
2. Jo default code dikhe use delete karke niche diya gaya code paste karein:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    // Parse incoming payload
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Append new row
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.name || '',
      data.company || '',
      data.email || '',
      data.phone || '',
      data.website || '',
      data.budget || '',
      data.timeline || '',
      data.services || '',
      data.details || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Top bar me **Save (disk icon)** dabayein.

---

## Step 3: Web App Deploy Karein
1. Top right corner me **Deploy** button par click karein > **New deployment**.
2. Gear icon (⚙️ Select type) par click karein aur **Web app** select karein.
3. Settings me:
   - **Description**: `Cornerstone Contact Form`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Ye bohot zaroori hai taaki website se bina login form submit ho sake)*
4. **Deploy** par click karein.
5. Agar permission maange toh:
   - **Authorize access** > Apna Google account select karein > **Advanced** > **Go to Untitled project (unsafe)** > **Allow**.
6. Deployment ke baad aapko ek **Web app URL** milegi (jo aisi dikhegi: `https://script.google.com/macros/s/AKfycb.../exec`).
7. Us URL ko copy kar lijiye.

---

## Step 4: Website me URL Add Karein
Aap do tareeqon me se kisi ek me URL daal sakte hain:

### Option A: `.env` file me
Project root me `.env` file banayein aur usme likhein:
```env
VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/Aapki-Copied-URL-Yahan/exec
```

### Option B: Direct Config File me
[src/config/sheetConfig.js](file:///c:/Users/Ayan/OneDrive/Desktop/Taksh/src/config/sheetConfig.js) me ja kar URL paste kar dein:
```javascript
export const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/Aapki-Copied-URL-Yahan/exec";
```

Bas! Ab jab bhi koi form bharega, har inquiry real-time me aapki Google Sheet me new row ban kar automatically record ho jayegi!
