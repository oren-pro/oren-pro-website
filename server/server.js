const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');

var cloudinary = require('cloudinary');

//var gmail = require('../config/gmail');
//var cloudinaryVars = require('../config/cloudinary');


var SparkPost = require('sparkpost');

var sparky = new SparkPost(); // uses process.env.SPARKPOST_API_KEY

sparky.transmissions.send({
    options: {
    sandbox: true
    },
    content: {
    from: 'testing@zzz.com',// + process.env.SPARKPOST_SANDBOX_DOMAIN, // 'testing@sparkpostbox.com'
    subject: 'Oh hey!',
    html:'<html><body><p>Testing SparkPost - the world\'s most awesomest email service!</p></body></html>'
    },
    recipients: [
    {address: 'mosh.kainer@gmail.com'}
    ]
})
.then(data => {
    console.log('Woohoo! You just sent your first mailing!');
    console.log(data);
})
.catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
});






const app = express();

//app.use(cors());

var allowedOrigins = ['http://localhost:8080',
                      'http://oren-pro-website.herokuapp.com',
                      'https://oren-pro-website.herokuapp.com'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));




const publicPath = path.join(__dirname, '../', 'public');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));



app.post("/deleteImage", bodyParser.urlencoded(), function(request, response) {
    console.log('in server deleteImage');
    console.log(request.body.publicid);
    if(request.body.publicid){

        // cloudinary.config({ 
        //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME || cloudinaryVars.cloud_name, 
        //   api_key: process.env.CLOUDINARY_API_KEY || cloudinaryVars.api_key, 
        //   api_secret: process.env.CLOUDINARY_API_SECRET || cloudinaryVars.api_secret
        // });

        cloudinary.config({ 
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
          api_key: process.env.CLOUDINARY_API_KEY, 
          api_secret: process.env.CLOUDINARY_API_SECRET
        });


        cloudinary.v2.uploader.destroy(request.body.publicid, function(error, result){console.log(result, error)});
    }
    return 'hia';
});



// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER || gmail.user,
//     pass: process.env.GMAIL_PASSWORD || gmail.password
//   }
// });

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});


app.post("/sendEmail", bodyParser.urlencoded(), function(request, response) {
    //console.log('GMAIL_USER', process.env.GMAIL_USER);
    //console.log('GMAIL_PASSWORD', process.env.GMAIL_PASSWORD);
    console.log('in server');
    console.log(request.body.name);
    console.log(request.body.email);
    console.log(request.body.message);
    if(request.body.name){
        mailOptions = {
          from: 'oren.pro.test@gmail.com',
          to: 'mosh.kainer@gmail.com',
          subject: request.body.email,
          text: request.body.message
        };
        transporter.sendMail (mailOptions, function(error, info){
          if(error){
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    }
    return 'hia';
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up!');
})