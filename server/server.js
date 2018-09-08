const path = require('path');
const compression = require('compression');
const express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');
var cloudinary = require('cloudinary');

//var gmail = require('../config/gmail');
//var cloudinaryVars = require('../config/cloudinary');

const app = express();

var allowedOrigins = ['http://localhost:8080',
                      'http://oren-pro-website.herokuapp.com',
                      'https://oren-pro-website.herokuapp.com'];
app.use(cors({
  origin: function(origin, callback){
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

let oneYear = 1 * 365 * 24 * 60 * 60 * 1000;

app.get('*.js', function (request, response, next) {
    request.url = request.url + '.gz';
    response.set('Content-Encoding', 'gzip');
    next();
});

app.get('*.css', function (request, response, next) {
    request.url = request.url + '.gz';
    response.set('Content-Encoding', 'gzip');
    response.set('Content-Type', 'text/css');
    next();
});




// // const checkForHTML = req => {
// //     const url = req.url.split('.');
// //     const extension = url[url.length -1];

// //     if (['/'].indexOf(extension) > -1) {
// //         return true; //compress only .html files sent from server
// //     }

// //     return false;
// // };


app.use(express.static(publicPath));

// // var compress = require('compression');
// // app.use(compress({filter: checkForHTML}));

// // const encodeResToGzip = contentType => (req, res, next) => {
// //     req.url = req.url + '.gz';
// //     res.set('Content-Encoding', 'gzip');
// //     res.set('Content-Type', contentType);

// //     next();
// // };

// // app.get("*.js", encodeResToGzip('text/javascript'));
// // app.get("*.css", encodeResToGzip('text/css'));

app.use(compression());

app.post("/deleteImage", bodyParser.urlencoded({ extended: true }), function(request, response) {
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

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
});

app.post("/sendEmail", bodyParser.urlencoded({ extended: true }), function(request, response) {
    if(request.body.name){
        mailOptions = {
          from: 'message@frixell.net',
          to: 'halivao@gmail.com',
          subject: request.body.email,
          text: request.body.name + '\r\n' + request.body.email + '\r\n' + request.body.message
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