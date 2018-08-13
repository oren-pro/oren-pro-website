const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'credentials.json';



// Load client secrets from a local file.
fs.readFile('src/actions/client_secret.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listLabels);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const client_id = '229755883287-tn20e415p04d4547ts5ivhkcpjjj235p.apps.googleusercontent.com';
  const client_secret = 'vNoo3EakhNjxhg1TnkexLyed';
  const redirect_uri = 'https://oren-pro.herokuapp.com';
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uri);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
    const userId = '229755883287-tn20e415p04d4547ts5ivhkcpjjj235p.apps.googleusercontent.com';
const email = {
  "options": {
    "open_tracking": true,
    "click_tracking": true
  },
  "campaign_id": "christmas_campaign",
  "return_path": "bounces-christmas-campaign@domain.com",
  "metadata": {
    "user_type": "students"
  },
  "substitution_data": {
    "sender": "Big Store Team"
  },
  "recipients": [
    {
      "return_path": "mosh.kainer@gmail.com",
      "address": {
        "email": "mosh.kainer@gmail.com",
        "name": "mosh"
      },
      "tags": [
        "greeting",
        "prehistoric",
        "fred",
        "flintstone"
      ],
      "metadata": {
        "place": "Bedrock"
      },
      "substitution_data": {
        "customer_type": "Platinum"
      }
    }
  ],
  "content": {
    "from": {
      "name": "mo",
      "email": "mosh@frixell.com"
    },
    "subject": "Big Christmas savings!",
    "reply_to": "Christmas Sales <sales@domain.com>",
    "headers": {
      "X-Customer-Campaign-ID": "christmas_campaign"
    },
    "text": "Hi mosh \nSave big this Christmas in your area {{place}}! \nClick http://www.mysite.com and get huge discount\n Hurry, this offer is only to ",
    "html": "<p>Hi here \nSave big this Christmas in your area haifa! \nClick http://www.mysite.com and get huge discount\n</p><p>Hurry, this offer is only to \n</p><p>mosh</p>"
  }
};
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.labels.list({
    userId: 'me',
  }, (err, {data}) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = data.labels;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name}`);
      });
      sendMessage(userId, email)
    } else {
      console.log('No labels found.');
    }
  });
}


/**
 * Send Message.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} email RFC 5322 formatted String.
 * @param  {Function} callback Function to call when the request is complete.
 */
function sendMessage(userId, email) {
    console.log('sendMessage');
  // Using the js-base64 library for encoding:
  // https://www.npmjs.com/package/js-base64
  var base64EncodedEmail = Base64.encodeURI(email);
  var request = gapi.client.gmail.users.messages.send({
    'userId': userId,
    'resource': {
      'raw': base64EncodedEmail
    }
  });
  //request.execute(callback);
}

function done() {
    console.log('done');
    
}