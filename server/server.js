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



admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
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

        console.log(request.url);
        //Get a database reference to our posts
        var db = admin.database();
        var ref = db.ref(dbString);
        console.log('db test -');
        console.log('db test - headers');
        console.log(dbString);
        //Attach an asynchronous callback to read the data at our posts reference
        ref.once("value", function(snapshot) {
          console.log(snapshot.val());
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
            result = data.replace(/\$OG_IMAGE/g, '/images/favicon.png');
            response.send(result);

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

app.get('*.png', function (request, response, next) {
  if(request.headers['user-agent'].toLowerCase().indexOf('firefox') === -1) {
    response.set('Cache-Control', 'max-age=86400');
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