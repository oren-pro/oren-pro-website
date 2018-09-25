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
// import React from 'react';

// function handleRender(req, res) {
//     // Create a new Redux store instance
//     // const store = createStore(
//     //     combineReducers({
//     //         aboutpage: aboutpageReducer,
//     //         auth: authReducer,
//     //         costumers: costumersReducer,
//     //         eventspage: eventspageReducer,
//     //         homepage: homepageReducer,
//     //         messages: messagesReducer,
//     //         navigation: navigationReducer,
//     //         newsletter: newsletterReducer,
//     //         desktopGallery: desktopGalleryReducer,
//     //         mobileGallery: mobileGalleryReducer
//     //     }),
//     //     composeEnhancers(applyMiddleware(thunk))
//     // );
//     // Render the component to a string
//     const html = renderToString(
//       //<Provider store={store}>
//         <App />
//       //</Provider>
//     )
//     // Grab the initial state from our Redux store
//     //const preloadedState = store.getState()
//     // Send the rendered page back to the client
//     res.send(renderFullPage(html))//, preloadedState))
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
  // http://www.oren-pro.com/1014/993/יום-כיף-בחורף
  if (String(req.originalUrl) === '/1014/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%97%D7%95%D7%A8%D7%A3') {
    return res.redirect(301, '/אירועי_קונספט/אירועי_חברה');
  }
  // http://www.oren-pro.com/999/986/הפקות-אירועים-לחברות-
  if (String(req.originalUrl) === '/999/986/%D7%94%D7%A4%D7%A7%D7%95%D7%AA-%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%9C%D7%97%D7%91%D7%A8%D7%95%D7%AA-') {
    return res.redirect(301, '/אירועי_חברה');
  }
  // http://www.oren-pro.com/13/הפקות_אירועים
  if (String(req.originalUrl) === '/13/%D7%94%D7%A4%D7%A7%D7%95%D7%AA_%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D') {
    return res.redirect(301, '/אירועי_חברה');
  }
  // http://www.oren-pro.com/1345/1306/אירוע-פורים-במשרדי-החברה
  if (String(req.originalUrl) === '/1345/1306/%D7%90%D7%99%D7%A8%D7%95%D7%A2-%D7%A4%D7%95%D7%A8%D7%99%D7%9D-%D7%91%D7%9E%D7%A9%D7%A8%D7%93%D7%99-%D7%94%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/PURIM_CIRCUS/אירועי_קונספט/אירועי_חברה');
  }
  // http://www.oren-pro.com/993/993/יום-כיף
  if (String(req.originalUrl) === '/993/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  // http://www.oren-pro.com/1077/1069/יום-כיף-לעובדים
  if (String(req.originalUrl) === '/1077/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%9C%D7%A2%D7%95%D7%91%D7%93%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  // http://www.oren-pro.com/1348/1348/נופש-חברה
  if (String(req.originalUrl) === '/1348/1348/%D7%A0%D7%95%D7%A4%D7%A9-%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/נופש_חברה/אירועי_חברה');
  }
  // http://www.oren-pro.com/1204/1204/אירוע חברה
  if (String(req.originalUrl) === '/1204/1204/%D7%90%D7%99%D7%A8%D7%95%D7%A2%20%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/אירועי_חברה');
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


// robots.txt

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /login\nAllow: /");
});



// init bd connection

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});





// sitemap.xml

function generate_xml_sitemap() {
    // this is the source of the URLs on your site, in this case we use a simple array, actually it could come from the database
    let urls = [];
    // the root of your website - the protocol and the domain name with a trailing slash
    var root_path = 'https://oren-pro-website.herokuapp.com/';

    var db = admin.database();
    var ref = db.ref('eventsCategories/');
    ref.once("value", function(snapshot) {
        console.log(snapshot.val());
        if(snapshot.val() !== null) {
          const categories = snapshot.val();
          // categories.map((category, index) => {
          //   let str = category.name;
          //   console.log(str);
          //   while (str.indexOf(' ') > -1) {
          //       str = str.replace(' ' ,'_');
          //   }
          //   urls.push(str);
          // });

          var priority = 0.5;
          var freq = 'monthly';
          var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
          for (var i in urls) {
              xml += '<url>';
              xml += '<loc>'+ root_path + urls[i] + '</loc>';
              xml += '<changefreq>'+ freq +'</changefreq>';
              xml += '<priority>'+ priority +'</priority>';
              xml += '</url>';
              i++;
          }
          xml += '</urlset>';
          return xml;
        }
    });
}

app.get('/sitemap.xml', function(req, res) {
    var sitemap = generate_xml_sitemap(); // get the dynamically generated XML sitemap
    //var sitemap = '';
    res.header('Content-Type', 'text/xml');
    res.send(sitemap);     
})






//*** server side rendering -- SEO ***//



app.get('/:category?/:subCategory?/:event?', function(request, response, next) {
    const filePath = path.resolve(__dirname, '../public', 'index.html');
    let categoryOk = false;
if (request.params.category && request.params.category.indexOf('.') === -1 && request.params.category.indexOf('#') === -1 && request.params.category.indexOf('$') === -1 && request.params.category.indexOf('[') === -1 && request.params.category.indexOf(']') === -1) {
  categoryOk = true;
}
let subCategoryOk = false;
if (request.params.subCategory && request.params.subCategory.indexOf('.') === -1 && request.params.subCategory.indexOf('#') === -1 && request.params.subCategory.indexOf('$') === -1 && request.params.subCategory.indexOf('[') === -1 && request.params.subCategory.indexOf(']') === -1) {
  subCategoryOk = true;
}
let eventOk = false;
if (request.params.event && request.params.event.indexOf('.') === -1 && request.params.event.indexOf('#') === -1 && request.params.event.indexOf('$') === -1 && request.params.event.indexOf('[') === -1 && request.params.event.indexOf(']') === -1) {
  eventOk = true;
}
//  ".", "#", "$", "[", or "]"
if (categoryOk && subCategoryOk && eventOk) {
    //if ((!request.params.subCategory && !request.params.event && !request.params.category) || (!request.params.subCategory && !request.params.event && request.params.category) || (request.params.subCategory && !request.params.event) || (request.params.event)) {
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
              data = data.replace(/\$OG_KEYWORDS/g, seo.keyWords);
              data = data.replace(/\$OG_IMAGE/g, '/images/favicon.png');
              response.send(data);

            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });
        
        });
    //} else {
       // next();
    //}
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



// var minify = require('html-minifier').minify;
// var result = minify(path.join(publicPath, 'index.html'), {
//   removeAttributeQuotes: true,
//   collapseWhitespace: true,
//   conservativeCollapse: true,
//   minifyCSS: true,
//   minifyJS: true,
//   removeScriptTypeAttributes: true,
//   removeStyleLinkTypeAttributes: true,
//   removeOptionalTags: true,
//   removeRedundantAttributes: true,
//   caseSensitive: true,
//   collapseBooleanAttributes: true,
//   collapseInlineTagWhitespace: true,
//   decodeEntities: true,
//   minifyURLs: true
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up!');
})