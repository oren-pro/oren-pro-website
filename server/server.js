const path = require('path');
const compression = require('compression');
const express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');
var cloudinary = require('cloudinary');
const fs = require('fs');






//*** server side rendering ***//


// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import aboutpageReducer from '../src/reducers/aboutpage';
// import authReducer from '../src/reducers/auth';
// import costumersReducer from '../src/reducers/costumers';
// import eventspageReducer from '../src/reducers/eventspage';
// import homepageReducer from '../src/reducers/homepage';
// import navigationReducer from '../src/reducers/navigation';
// import newsletterReducer from '../src/reducers/newsletter';
// import messagesReducer from '../src/reducers/messages';
// import desktopGalleryReducer from '../src/reducers/desktopGallery';
// import mobileGalleryReducer from '../src/reducers/mobileGallery';
// import App from '../src/App';

// import { renderToString } from 'react-dom/server';


// function handleRender(req, res) {
//     // Create a new Redux store instance
//     const store = createStore(
//         combineReducers({
//             aboutpage: aboutpageReducer,
//             auth: authReducer,
//             costumers: costumersReducer,
//             eventspage: eventspageReducer,
//             homepage: homepageReducer,
//             messages: messagesReducer,
//             navigation: navigationReducer,
//             newsletter: newsletterReducer,
//             desktopGallery: desktopGalleryReducer,
//             mobileGallery: mobileGalleryReducer
//         }),
//         composeEnhancers(applyMiddleware(thunk))
//         //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     );
// ​
//     // Render the component to a string
//     const html = renderToString(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     )
//   ​
//     // Grab the initial state from our Redux store
//     const preloadedState = store.getState()
//   ​
//     // Send the rendered page back to the client
//     res.send(renderFullPage(html, preloadedState))
// }


//******    end ssr      ******//





var admin = require("firebase-admin");



//var gmail = require('../config/gmail');
//var cloudinaryVars = require('../config/cloudinary');

const app = express();

//app.use(require('prerender-node'));




//*** server side rendering ***//

//app.use(handleRender);

//******    end ssr      ******//





app.use(function forceLiveDomain(req, res, next) {
  // Don't allow user to hit Heroku now that we have a domain
  var host = req.get('Host');
  if (host === 'oren-pro-website.herokuapp.com') {
    return res.redirect(301, 'http://www.oren-pro.com/' + req.originalUrl);
  }
  return next();
});






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








//*** server side rendering -- SEO ***//



// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
//   }),
//   databaseURL: process.env.FIREBASE_DATABASE_URL
// });

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "oren-pro",
    clientEmail: "firebase-adminsdk-7eqf7@oren-pro.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwzjU7rxbfmTsh\nUKizADcpuqCP10bmJzeHEcxoUCU+KdYKCds3jFMmrraCkFcEcB9YhcuZAE9YkOCF\nO7in9gjnUlE1LQ0D1DgnbgqkRV9yg6YZYYitP8cSZ+VuM9U+cAmRqBQkR0BeaWEm\nUBU/aNQgvmoMOo8qrMCWysudNNFI8C1xPXQSZpH/jM0ogtsCWO6ypWssdJYnk81A\nCyIvbes3f0JgjfIhaAYFckIOJpCx2ze6cGsAvqVDmvAhzJ3rOSDbLWPQ9F+98x9S\nYVsMt5E4L64ki1PcUqHz7w3DirTFlpjLwqDATWximlOCJdk/arCZVHWi78sV1by3\n3/w3uiRHAgMBAAECggEACOPr9CFWVbRfYpbeTla11ci6Z1RpQaXTk/YgJvEIvmFD\nwv0PfQtdG8/WaFnlSXLXdw/bPS+xZ0zgDUydRczVHvsAdfUOKq6FvrqfMsPOP3R0\nakhOPOMjgAuhxlkGFJd1Oh7Cf7ezE+XZ0OxfKFew4VvRx0wJt0w44hw2Z6RCD2T2\n7bak5JyKzbK+1+D0xPDKlZUKnNMh2PWLSBqL3oZyFO3i6DbhAI7dIj5TKiDryvnn\nALP47tP7x4LJbCWB4/wTu5709JYkIJB/KxZV8EaH2R8QpJ80Sjvzhg51CM5owNBu\npMJ22e5OTyqlv0Jzx8Tx33Op6izbSbL2a4QalAxckQKBgQDY1jFmxGJwA8TXhzuK\n/aimipfU3d6RyE462NO5277Xru/eE4GhYh6y2YRGd8jFdr/X6Knawz9ngo9VgI2j\nD0Sup1PX0BYMxx1fkBQcBSLGvDwBc9YnP7QuYhqn0mqd4rYn/LhRkRoEhrqUgAkF\nLtNpaRi6t4k2G91CVXrPKQoeeQKBgQDQvRsbTJGINmvEw80okBaBHc/z+SdD3S7G\ntkAAYUz97HbbOjf0/94pDvrgsGJGSldVHTlsnUHC8Z2zqjNe/J2iAG54EvYaI0yo\nULBCoh7XaCI1x8K6rWk5wa8+HbpndVPr2GqHJfmq9Ow2nioUAzwut9vq0QV8zftj\nxa5sux6ovwKBgEJ+RH3wIQOalEVHigHQUWRowbCcLQFlfF/dV+f5s+cuFQ5zyt+z\nWBieTUrStrWe+at7BIM6NnpGdi/RER38s6IfW72laO2YLbC9XP1OseBhnsEPRY+Z\noGZM3UGza9Bo0lUm0Vrp9SGIMzUQojN9rYT4noW7fI8kMlCCJ/vY6Op5AoGAIxO0\nK2k5h39FquIQZsGX1oiw+lmjHIddpezYYnf3XTBQZNSqtJQOvC2VQQ7C5Pb3KAlq\nLfNbKqw5iQiP62VeA+w4pBrjmk7WQe6VQA1IS4BnR0xTT9V2Oktu7GxId7xCpv5O\nIHnkM7NGwoLfpU9J3Lvuy83mMyvWE9UTU5g6NbcCgYEAxv/AinqZJsl15AhszNX5\nflh5qHTVdUbUAidmDF4mqQY9fNLr9Ae6N0n9buzLI7RVo34w/hVZQEaNRKUQaxvY\nq4xUkaFa3hdT7lfm1R+Zm1q8CCorqfYnQ3uu8so0EPrZTcqK+gMYHXi6/FBKTyVN\nGoNlbEPE1sdRAInBdLc0FjE=\n-----END PRIVATE KEY-----\n"
  }),
  databaseURL: "https://oren-pro.firebaseio.com"
});

app.get('/:category?/:subCategory?/:event?', function(request, response, next) {
    const filePath = path.resolve(__dirname, '../public', 'index.html');
    if ((!request.params.subCategory && !request.params.event && !request.params.category) || (!request.params.subCategory && !request.params.event && request.params.category && request.params.category.indexOf('.ico') === -1) || (request.params.subCategory && !request.params.event && request.params.subCategory.indexOf('.js') === -1 && request.params.subCategory.indexOf('.css') === -1 && request.params.subCategory.indexOf('.png') === -1) || (request.params.event && request.params.event.indexOf('.svg') === -1 && request.params.event.indexOf('.png') === -1 && request.params.event.indexOf('.gif') === -1)) {
        let dbString = 'serverSeo/';
        if(!request.params.category && !request.params.subCategory && !request.params.event) {
            dbString = dbString;
        } else if (request.params.category && !request.params.subCategory && !request.params.event) {
            dbString = dbString + String(request.params.category);
        } else if (request.params.category && request.params.subCategory && !request.params.event) {
            dbString = dbString + 'subcategories/' + String(request.params.category);
        } else {
            dbString = dbString + 'events/' + String(request.params.category);
        }
        var db = admin.database();
        var ref = db.ref(dbString);
        ref.once("value", function(snapshot) {
          //console.log(snapshot.val());
            let seo = {
              title: 'אורן ורינת הפקות',
              description: 'אורן ורינת הפקות',
              keyWords: 'אורן ורינת הפקות'
            };
            if(snapshot.val() !== null) {
              seo = snapshot.val().seo;
            }

            fs.readFile(filePath, 'utf8', function (err,data) {
              if (err) {
                return console.log(err);
              }

              // replace the special strings with server generated strings
              data = data.replace(/\$OG_TITLE/g, seo.title);
              data = data.replace(/\$OG_DESCRIPTION/g, seo.description);
              data = data.replace(/\$OG_IMAGE/g, '/images/favicon.png');
              response.send(data);

            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });
        
        });
    } else {
        next();
    }
});




//******    end ssr --- SEO     ******//








app.get('*.js', function (request, response, next) {
  if(request.headers['user-agent'].toLowerCase().indexOf('firefox') === -1) {
    request.url = request.url + '.gz';
    response.set('Content-Encoding', 'gzip');
  }
    next();
});

app.get('*.css', function (request, response, next) {
  if(request.headers['user-agent'].toLowerCase().indexOf('firefox') === -1) {
    request.url = request.url + '.gz';
    response.set('Content-Encoding', 'gzip');
    response.set('Content-Type', 'text/css');
  }
    next();
});

app.use(compression());

app.use(express.static(publicPath));





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