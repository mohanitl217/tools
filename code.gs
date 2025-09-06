/**
 * Google Apps Script Code for School Management Portal
 * This serves the HTML file and handles any backend operations
 */

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('School Management Portal')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

/**
 * Include CSS and JS files in the HTML
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Log user interactions for analytics
 */
function logAccess(toolName, userEmail) {
  try {
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getSheetByName('Access_Log');
    if (!sheet) {
      // Create the sheet if it doesn't exist
      const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
      const newSheet = spreadsheet.insertSheet('Access_Log');
      newSheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Tool Name', 'User Email', 'IP Address']]);
    }
    
    const timestamp = new Date();
    const userEmail = Session.getActiveUser().getEmail();
    
    sheet.appendRow([
      timestamp,
      toolName,
      userEmail,
      'N/A' // IP address is not easily accessible in GAS
    ]);
    
    return { success: true, message: 'Access logged successfully' };
  } catch (error) {
    console.error('Error logging access:', error);
    return { success: false, message: error.toString() };
  }
}

/**
 * Get system statistics (optional)
 */
function getSystemStats() {
  try {
    // You can implement this to return statistics about tool usage
    return {
      totalUsers: 150,
      activeTools: 5,
      lastUpdated: new Date(),
      systemStatus: 'operational'
    };
  } catch (error) {
    console.error('Error getting system stats:', error);
    return { error: error.toString() };
  }
}

/**
 * Send notification emails (optional)
 */
function sendNotification(recipient, subject, message) {
  try {
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: message
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Get user preferences (optional)
 */
function getUserPreferences() {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    const properties = PropertiesService.getUserProperties();
    
    return {
      email: userEmail,
      theme: properties.getProperty('theme') || 'light',
      language: properties.getProperty('language') || 'en',
      notifications: properties.getProperty('notifications') || 'enabled'
    };
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return { error: error.toString() };
  }
}

/**
 * Save user preferences (optional)
 */
function saveUserPreferences(preferences) {
  try {
    const properties = PropertiesService.getUserProperties();
    
    if (preferences.theme) properties.setProperty('theme', preferences.theme);
    if (preferences.language) properties.setProperty('language', preferences.language);
    if (preferences.notifications) properties.setProperty('notifications', preferences.notifications);
    
    return { success: true, message: 'Preferences saved successfully' };
  } catch (error) {
    console.error('Error saving user preferences:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Check if user has access to specific tools (optional security layer)
 */
function checkUserAccess(toolName) {
  try {
    const userEmail = Session.getActiveUser().getEmail();
    
    // Implement your access control logic here
    // For example, check against a list of authorized users
    const authorizedDomains = ['yourdomain.edu', 'school.edu'];
    const userDomain = userEmail.split('@')[1];
    
    if (authorizedDomains.includes(userDomain)) {
      return { hasAccess: true, message: 'Access granted' };
    } else {
      return { hasAccess: false, message: 'Access denied - unauthorized domain' };
    }
  } catch (error) {
    console.error('Error checking user access:', error);
    return { hasAccess: false, error: error.toString() };
  }
}

/**
 * Get tool status (check if external tools are accessible)
 */
function getToolStatus() {
  const tools = [
    {
      name: 'UBI Portal Search',
      url: 'https://script.google.com/macros/s/AKfycbxHHRmYZA7GPMYfOrgMD6CN6E-iu-AOOEBN93MScwm7UXI20Rw-lHOCCw_l1Jeo7Ub3Gg/exec',
      status: 'active'
    },
    {
      name: 'UDISE Student Details',
      url: 'https://script.google.com/macros/s/AKfycbz09R4Ejtac9vrg83_ZWXOgwjihGVurytLR-BFHP7Xd3iMEdRhwCCjTXDym4lVjeWIm/exec',
      status: 'active'
    },
    {
      name: 'Fee Collection Report',
      url: 'https://script.google.com/macros/s/AKfycbyLdCOhaxJMV3l2bAyquci7SDho-a8bYBDqskZQ_6z2BSeQA0hMupLSsjNCOra9H1wWrA/exec',
      status: 'active'
    },
    {
      name: 'Markslip Entry System',
      url: 'https://script.google.com/macros/s/AKfycbzAKlr9EfsG7EpyRaX7Ak54NIvo7TYll2N3UcXyv9Rtx5VKhIRNnJuLESZEv_5a5Cp1rg/exec',
      status: 'active'
    },
    {
      name: 'Photo & Video Gallery',
      url: 'https://script.google.com/macros/s/AKfycbxNU9jWb4DiIB0IxmBhh8ESYAbTxOL5jphq8thKy4rs9WIhxUZtSzPw1D238kBpyaYIog/exec',
      status: 'active'
    }
  ];
  
  return tools;
}
