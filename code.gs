function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('School Management Portal')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  try {
    const action = e.parameter.action;
    
    switch(action) {
      case 'log_access':
        return logToolAccess(e.parameter);
      case 'get_stats':
        return getPortalStats();
      default:
        return ContentService
          .createTextOutput(JSON.stringify({error: 'Invalid action'}))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function logToolAccess(params) {
  try {
    const sheet = getOrCreateSheet('Access_Log');
    const timestamp = new Date();
    const toolName = params.tool_name || 'Unknown';
    const userAgent = params.user_agent || 'Unknown';
    
    sheet.appendRow([
      timestamp,
      toolName,
      userAgent,
      Session.getActiveUser().getEmail()
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getPortalStats() {
  try {
    const sheet = getOrCreateSheet('Access_Log');
    const data = sheet.getDataRange().getValues();
    
    const stats = {
      total_visits: data.length - 1, // Exclude header
      tools: [
        'UBI Portal Search',
        'UDISE Student Details', 
        'Fee Collection Report',
        'Markslip Entry',
        'Photo & Video Gallery'
      ]
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(stats))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create('School Portal Data');
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (sheetName === 'Access_Log') {
      sheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Tool Name', 'User Agent', 'User Email']]);
    }
  }
  
  return sheet;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
