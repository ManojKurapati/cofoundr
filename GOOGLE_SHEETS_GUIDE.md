# Google Sheets Email Collection Setup Guide

To collect waitlist emails securely and for free without needing a backend server, we're using **Google Apps Script**.

Follow these exact steps to connect your form:

### 1. Create your Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it **"CoFoundr Waitlist"**.
3. In cell **A1**, type `Email`.
4. In cell **B1**, type `Timestamp`.

### 2. Add the Apps Script
1. In your Google Sheet, click on **Extensions** > **Apps Script** in the top menu.
2. Delete any code in the editor and paste the following exactly:

```javascript
const sheetName = 'Sheet1'; // Ensure this matches your tab name at the bottom of the Google Sheet

function doPost(e) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(sheetName);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;
    
    const newRow = headers.map(function(header) {
      return header === 'Timestamp' ? new Date() : e.parameter[header];
    });
    
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```
3. Click the **Save** icon (floppy disk).

### 3. Deploy the Web App
1. At the top right, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill out the fields:
   * **Description**: Waitlist API
   * **Execute as**: Me (Your Email)
   * **Who has access**: Anyone
4. Click **Deploy**. (You will likely be prompted to Authorize access. Click Authorize, log into your Google Account, click Advanced, and allow the script.)
5. Copy the **Web app URL** that ends with `/exec`.

### 4. Connect to Your Application
**For local testing:**
Create a file named `.env` in the root of your `cofoundr.world` project and add the URL:
```
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_URL_HERE/exec
```

**For your live GitHub Pages site:**
If you want emails from your live public site to work immediately since it builds automatically through GitHub Actions, you should add this to your repository settings:
1. Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Click **New repository variable**. (Use "Variables", NOT "Secrets", because Vite needs it at build time).
3. Name: `VITE_GOOGLE_SHEETS_URL`
4. Value: *Paste your copied App Script URL here*
5. Click **Add variable**.

Once you add the variable, trigger a new deployment or push code, and the button on your live site will instantly start beaming emails to your Google Sheet!
