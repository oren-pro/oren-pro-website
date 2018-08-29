module.exports = { 
    user: "oren.pro.test@gmail.com",
    password: "oren$pro0test",
    accessToken: "AIzaSyBHL0WGpBhTSLT-W3hFVxSz71hefNBKhPo"
 };



// let transporter = nodemailer.createTransport({
//     host: 'webmail.frixell.net',
//     port: 25,
//     secure: false,
//     auth: {
//       user: "message@frixell.net",
//       pass: "kS58x!l6"
//     }
// });



// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASSWORD
//   }
// });

// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         type: 'OAuth2',
//         user: process.env.GMAIL_USER || gmail.user,
//         accessToken: "ya29.GlsHBuUNynabTM0laitnAZ7OsuVmxd_eCGsR5BYrG0SrSbVHLcg45jsG5xQcYyiYjsu7aMYF-t_5ehgu6ACrDoCGKnIy0mulHDPZ5bXeSBdVSx0hg88Rajru15K-"
//     }
// });



// transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
//     let accessToken = userTokens[user];
//     if(!accessToken){
//         return callback(new Error('Unknown user'));
//     }else{
//         return callback(null, accessToken);
//     }
// });



// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         type: 'OAuth2',
//         user: 'oren.pro.test@gmail.com',
//         clientId: '799765725529-44tsd847rmkchbb0fhp8hh5bkij7q6i8.apps.googleusercontent.com',
//         clientSecret: 'VGttwHiVHiWZdIHUOLIXEbfS',
//         refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
//         accessToken: 'ya29.GlsHBuUNynabTM0laitnAZ7OsuVmxd_eCGsR5BYrG0SrSbVHLcg45jsG5xQcYyiYjsu7aMYF-t_5ehgu6ACrDoCGKnIy0mulHDPZ5bXeSBdVSx0hg88Rajru15K-',
//         expires: 1484314697598
//     }
// });








// app.post("/sendEmail", bodyParser.urlencoded(), function(request, response) {
//     console.log("in sparky");
//     console.log(request.body.name);
//     console.log(request.body.email);
//     console.log(request.body.message);
//     sparky.transmissions.send({
//         options: {
//         sandbox: true
//         },
//         content: {
//         from: 'message@' + process.env.SPARKPOST_SANDBOX_DOMAIN, // 'testing@sparkpostbox.com'
//         subject: 'Oh hey!',
//         html:'<html><body><p>Testing SparkPost - the world\'s most awesomest email service!</p></body></html>'
//         },
//         recipients: [
//             {address: 'halivao@gmail.com'}
//         ]
//     })
//     .then(data => {
//         console.log('Woohoo! You just sent your first mailing!');
//         console.log(data);
//         return 'hia';
//     })
//     .catch(err => {
//         console.log('Whoops! Something went wrong');
//         console.log(err);
//         return 'hia';
//     });
    
// });
