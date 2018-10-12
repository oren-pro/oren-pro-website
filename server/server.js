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
    return res.redirect(301, '/אירועי_קונספט/אירועי_חברה');
  }
  //http://www.oren-pro.com/1346/1306/פורים-בסגנון-שנות-ה60
  //http://www.oren-pro.com/1312/1306/הפנינג-פורים-למשפחות-
  //http://www.oren-pro.com/1308/1306/ערב-קזינו
  //http://www.oren-pro.com/1334/1069/סגווי-בתל-אביב-יפו-
  //http://www.oren-pro.com/1309/1306/So-80
  //http://www.oren-pro.com/1307/1306/המערב-הפרוע
  //http://www.oren-pro.com/1310/1306/פורים-קרנבל-ברזילאי
  //http://www.oren-pro.com/1339/1069/סיור-חנוכיות-בירושלים
  //http://www.oren-pro.com/1198/993/סיור-סליחות-בצפת
  //http://www.oren-pro.com/1311/1306/אירוע-פורים-למשפחות-עם-הפרופסור-המשוגע
  //http://www.oren-pro.com/1347/1306/הפנינג-משפחות-פורים-בסגנון-הוואי
  //http://www.oren-pro.com/1218/993/ירושלים-בזוית-נוספת
  //http://www.oren-pro.com/1213/993/סיור-חנוכיות-בצפת
  //http://www.oren-pro.com/1324/1320/סיור-ליקוט-בגלבוע--
  //http://www.oren-pro.com/1313/1306/מסיבת-פורים
  //http://www.oren-pro.com/event/572/132/הפקת_אירוע_בכותל
  //http://www.oren-pro.com/1341/1069/מרוץ-ירושלים
  //http://www.oren-pro.com/1321/1320/הכרמל-במיטבוטיול-פריחות-בכרמל
  //http://www.oren-pro.com/1328/1008/ספארי-לילה
  //





  //http://www.oren-pro.com/1085/1069/יום-גיבוש-תחת-אש
  if (String(req.originalUrl) === '/1085/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%AA%D7%97%D7%AA-%D7%90%D7%A9') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1203/993/יום-כיף-מדברי
  if (String(req.originalUrl) === '/1203/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%9E%D7%93%D7%91%D7%A8%D7%99') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1343/1069/יום-גיבוש-בצפון-מתגלגלים-בגולן
  if (String(req.originalUrl) === '/1343/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%A6%D7%A4%D7%95%D7%9F-%D7%9E%D7%AA%D7%92%D7%9C%D7%92%D7%9C%D7%99%D7%9D-%D7%91%D7%92%D7%95%D7%9C%D7%9F') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1199/1008/יום-גיבוש-בים
  if (String(req.originalUrl) === '/1199/1008/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1295/1205/יום-כיף-למשפחות-בחוף-דור
  if (String(req.originalUrl) === '/1295/1205/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%9C%D7%9E%D7%A9%D7%A4%D7%97%D7%95%D7%AA-%D7%91%D7%97%D7%95%D7%A3-%D7%93%D7%95%D7%A8') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1330/1069/יום-כיף-בטוסקנה-הישראלית
  if (String(req.originalUrl) === '/1330/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%98%D7%95%D7%A1%D7%A7%D7%A0%D7%94-%D7%94%D7%99%D7%A9%D7%A8%D7%90%D7%9C%D7%99%D7%AA') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1051/993/יום-כיף-בבריכה
  if (String(req.originalUrl) === '/1051/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%91%D7%A8%D7%99%D7%9B%D7%94') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1020/1008/יום-גיבוש-בכרמל--איזור-חוף-הכרמל
  if (String(req.originalUrl) === '/1020/1008/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%9B%D7%A8%D7%9E%D7%9C--%D7%90%D7%99%D7%96%D7%95%D7%A8-%D7%97%D7%95%D7%A3-%D7%94%D7%9B%D7%A8%D7%9E%D7%9C') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1208/993/יום-כיף-יום-האישה
  if (String(req.originalUrl) === '/1208/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%99%D7%95%D7%9D-%D7%94%D7%90%D7%99%D7%A9%D7%94') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1217/993/יום-חוויתי-בכרמל
  if (String(req.originalUrl) === '/1217/993/%D7%99%D7%95%D7%9D-%D7%97%D7%95%D7%95%D7%99%D7%AA%D7%99-%D7%91%D7%9B%D7%A8%D7%9E%D7%9C') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1074/1069/יום-גיבוש-בצפון
  if (String(req.originalUrl) === '/1074/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%A6%D7%A4%D7%95%D7%9F') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1332/1069/יום-כיף-קולינרי
  if (String(req.originalUrl) === '/1332/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%A7%D7%95%D7%9C%D7%99%D7%A0%D7%A8%D7%99') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1088/1069/יום-גיבוש-חברה-יום-ספורט
  if (String(req.originalUrl) === '/1088/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%97%D7%91%D7%A8%D7%94-%D7%99%D7%95%D7%9D-%D7%A1%D7%A4%D7%95%D7%A8%D7%98') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1337/1069/יום-גיבוש-קרב-סכינים
  if (String(req.originalUrl) === '/1337/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%A7%D7%A8%D7%91-%D7%A1%D7%9B%D7%99%D7%A0%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1072/1069/יום-כיף-בים-בסגנון-הוואי
  if (String(req.originalUrl) === '/1072/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%99%D7%9D-%D7%91%D7%A1%D7%92%D7%A0%D7%95%D7%9F-%D7%94%D7%95%D7%95%D7%90%D7%99') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1224/993/יום-כיף-בתל-אביב-חוויה-לכל-החושים
  if (String(req.originalUrl) === '/1224/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%AA%D7%9C-%D7%90%D7%91%D7%99%D7%91-%D7%97%D7%95%D7%95%D7%99%D7%94-%D7%9C%D7%9B%D7%9C-%D7%94%D7%97%D7%95%D7%A9%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1089/1069/יום-כיף-חוויות-בכרמל
  if (String(req.originalUrl) === '/1089/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%97%D7%95%D7%95%D7%99%D7%95%D7%AA-%D7%91%D7%9B%D7%A8%D7%9E%D7%9C') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1009/993/יום-כיף-בספא
  if (String(req.originalUrl) === '/1009/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%A1%D7%A4%D7%90') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1016/1008/ערב-גיבוש
  if (String(req.originalUrl) === '/1016/1008/%D7%A2%D7%A8%D7%91-%D7%92%D7%99%D7%91%D7%95%D7%A9') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1216/993/יום-כיף-בדרום-ארץ-מדבר
  if (String(req.originalUrl) === '/1216/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%93%D7%A8%D7%95%D7%9D-%D7%90%D7%A8%D7%A5-%D7%9E%D7%93%D7%91%D7%A8') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1333/1069/יום-כיף-במרכז
  if (String(req.originalUrl) === '/1333/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%9E%D7%A8%D7%9B%D7%96') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1225/1008/יום-גיבוש-בירושלים-קרב-סכינים
  if (String(req.originalUrl) === '/1225/1008/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-%D7%A7%D7%A8%D7%91-%D7%A1%D7%9B%D7%99%D7%A0%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/993/993/יום-כיף
  if (String(req.originalUrl) === '/993/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1002/993/יום-כיף-סובב-בכנרת
  if (String(req.originalUrl) === '/1002/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%A1%D7%95%D7%91%D7%91-%D7%91%D7%9B%D7%A0%D7%A8%D7%AA') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1070/1069/יום-כיף-בצפון---בוקרים
  if (String(req.originalUrl) === '/1070/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%A6%D7%A4%D7%95%D7%9F---%D7%91%D7%95%D7%A7%D7%A8%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1331/1069/יום-כיף-בכרמל
  if (String(req.originalUrl) === '/1331/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%9B%D7%A8%D7%9E%D7%9C') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1344/1069/יום-כיף-בדרום-קסם-המדבר
  if (String(req.originalUrl) === '/1344/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%93%D7%A8%D7%95%D7%9D-%D7%A7%D7%A1%D7%9D-%D7%94%D7%9E%D7%93%D7%91%D7%A8') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1090/1069/יום-גיבוש-טיול-מיוחד-למצדה
  if (String(req.originalUrl) === '/1090/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%98%D7%99%D7%95%D7%9C-%D7%9E%D7%99%D7%95%D7%97%D7%93-%D7%9C%D7%9E%D7%A6%D7%93%D7%94') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1003/993/יום-כיף-בים-המלח
  if (String(req.originalUrl) === '/1003/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%99%D7%9D-%D7%94%D7%9E%D7%9C%D7%97') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1014/993/יום-כיף-בחורף
  if (String(req.originalUrl) === '/1014/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%97%D7%95%D7%A8%D7%A3') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1049/993/יום-כיף-בקיסריה-
  if (String(req.originalUrl) === '/1049/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%A7%D7%99%D7%A1%D7%A8%D7%99%D7%94-') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1087/1069/יום-כיף-משפחות-בים
  if (String(req.originalUrl) === '/1087/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%9E%D7%A9%D7%A4%D7%97%D7%95%D7%AA-%D7%91%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1278/993/יום-כייף-בחרמון
  if (String(req.originalUrl) === '/1278/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%99%D7%A3-%D7%91%D7%97%D7%A8%D7%9E%D7%95%D7%9F') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1326/1069/יום-גיבוש-בים
  if (String(req.originalUrl) === '/1326/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1188/1069/יום-כיף-בחוף-דור
  if (String(req.originalUrl) === '/1188/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%97%D7%95%D7%A3-%D7%93%D7%95%D7%A8') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  // http://www.oren-pro.com/1077/1069/יום-כיף-לעובדים
  if (String(req.originalUrl) === '/1077/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%9C%D7%A2%D7%95%D7%91%D7%93%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1078/1069/יום-כיף-טיול-בירושלים
  //http://www.oren-pro.com/1356/1356/יום-כיף-בים-ב-210-ש
  //http://www.oren-pro.com/1296/1296/יום-משפחות-בים






  //http://www.oren-pro.com/1204/1204/אירוע חברה
  if (String(req.originalUrl) === '/1204/1204/%D7%90%D7%99%D7%A8%D7%95%D7%A2%20%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/אירועי_חברה');
  }
  //http://www.oren-pro.com/event/210/130/אירוע_ערב_חברה
  if (String(req.originalUrl) === '/event/210/130/%D7%90%D7%99%D7%A8%D7%95%D7%A2_%D7%A2%D7%A8%D7%91_%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/אירועי_חברה');
  }
  //http://www.oren-pro.com/gallery.asp?id=210&type=130&title=ערבי חברה






  //http://www.oren-pro.com/1006/986/הפקות-פסטיבלים-הפקות-אירועי-חוצות
  if (String(req.originalUrl) === '/1006/986/%D7%94%D7%A4%D7%A7%D7%95%D7%AA-%D7%A4%D7%A1%D7%98%D7%99%D7%91%D7%9C%D7%99%D7%9D-%D7%94%D7%A4%D7%A7%D7%95%D7%AA-%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99-%D7%97%D7%95%D7%A6%D7%95%D7%AA') {
    return res.redirect(301, '/פסטיבלים_ואירועי_חוצות');
  }




  //http://www.oren-pro.com/1349/1348/נופש-חברה---זמן-המדבר
  if (String(req.originalUrl) === '/1349/1348/%D7%A0%D7%95%D7%A4%D7%A9-%D7%97%D7%91%D7%A8%D7%94---%D7%96%D7%9E%D7%9F-%D7%94%D7%9E%D7%93%D7%91%D7%A8') {
    return res.redirect(301, '/נופש_מנהלים_במדבר/נופש_חברה/אירועי_חברה');
  }


  // http://www.oren-pro.com/1348/1348/נופש-חברה
  if (String(req.originalUrl) === '/1348/1348/%D7%A0%D7%95%D7%A4%D7%A9-%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/נופש_חברה/אירועי_חברה');
  }
  //http://www.oren-pro.com/1350/1348/נופש-חברה-מתחממים-בצפון
  if (String(req.originalUrl) === '/1350/1348/%D7%A0%D7%95%D7%A4%D7%A9-%D7%97%D7%91%D7%A8%D7%94-%D7%9E%D7%AA%D7%97%D7%9E%D7%9E%D7%99%D7%9D-%D7%91%D7%A6%D7%A4%D7%95%D7%9F') {
    return res.redirect(301, '/נופש_חברה/אירועי_חברה');
  }




  //http://www.oren-pro.com/1005/993/יום-כיף--טיול-בירושלים
  if (String(req.originalUrl) === 'http://www.oren-pro.com/1005/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3--%D7%98%D7%99%D7%95%D7%9C-%D7%91%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D') {
    return res.redirect(301, 'יום_כיף_בירושלים/ימי_גיבוש_וכיף/אירועי_חברה');
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


// prerender.io

var prerender = require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN);
prerender.crawlerUserAgents = [];
prerender.crawlerUserAgents.push('googlebot');
prerender.crawlerUserAgents.push('bingbot');
prerender.crawlerUserAgents.push('yandex');
app.use(prerender);




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

app.get('/sitemap.xml', function(req, res) {
    let urls = [];
    const root_path = 'https://oren-pro-website.herokuapp.com/';
    const db = admin.database();
    const refCategories = db.ref('eventsCategories/');
    const refSubcategories = db.ref('eventsSubcategories/');
    const refEvents = db.ref('eventsItems/');

    refCategories.once("value", function(snapshotCategories) {

        if (snapshotCategories.val() === null) return;
          
        const categories = snapshotCategories.val();

        refSubcategories.once("value", function(snapshotSubcategories) {

            if (snapshotSubcategories.val() === null) return;
            
            const subcategories = snapshotSubcategories.val();

            refEvents.once("value", function(snapshotEvents) {

                if(snapshotEvents.val() === null) return;

                const events = snapshotEvents.val();

                for (var i in categories) {
                    let categoryId = categories[i].id;
                    let strCategory = categories[i].name;
                    while (strCategory.indexOf(' ') > -1) {
                        strCategory = strCategory.replace(' ' ,'_');
                    }
                    urls.push(strCategory);
                    for (var j in subcategories) {
                        if(subcategories[j].categories && subcategories[j].categories[categoryId]){
                            let subcategoryId = subcategories[j].id;
                            let strSubcategory = subcategories[j].name;

                            while (strSubcategory.indexOf(' ') > -1) {
                                strSubcategory = strSubcategory.replace(' ' ,'_');
                            }

                            urls.push(strCategory + '/' + strSubcategory);

                            for (var k in events) {
                                if(events[k].categories && events[k].categories[categoryId] && events[k].subcategories && events[k].subcategories[subcategoryId]){
                                    let event = events[k].name;
                                    while (event.indexOf(' ') > -1) {
                                        event = event.replace(' ' ,'_');
                                    }
                                    urls.push(strCategory + '/' + strSubcategory + '/' + event);
                                }
                                k++;
                            }
                        }
                        j++;
                    }
                    i++;
                }
                const priority = 0.5;
                const freq = 'monthly';
                let xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
                
                for (var i in urls) {
                    xml += '<url>';
                    xml += '<loc>'+ root_path + urls[i] + '</loc>';
                    xml += '<changefreq>'+ freq +'</changefreq>';
                    xml += '<priority>'+ priority +'</priority>';
                    xml += '</url>';
                    i++;
                }

                xml += '</urlset>';
                res.header('Content-Type', 'text/xml');
                res.send(xml);
            });
        });
    });   
})



//*** server side rendering -- SEO ***//

app.get('/:category?/:subCategory?/:event?/:toomuch?', function(request, response, next) {
    if (request.params.toomuch) {
      next();
    } else {
      const filePath = path.resolve(__dirname, '../public', 'index.html');
      let categoryOk = false;
      if(request.params.category && request.params.category.indexOf('.') === -1 && request.params.category.indexOf('#') === -1 && request.params.category.indexOf('$') === -1 && request.params.category.indexOf('[') === -1 && request.params.category.indexOf(']') === -1){
        categoryOk = true;
      }
      let subCategoryOk = false;
      if(request.params.subCategory && request.params.subCategory.indexOf('.') === -1 && request.params.subCategory.indexOf('#') === -1 && request.params.subCategory.indexOf('$') === -1 && request.params.subCategory.indexOf('[') === -1 && request.params.subCategory.indexOf(']') === -1){
        subCategoryOk = true;
      }
      let eventOk = false;
      if(request.params.event && request.params.event.indexOf('.') === -1 && request.params.event.indexOf('#') === -1 && request.params.event.indexOf('$') === -1 && request.params.event.indexOf('[') === -1 && request.params.event.indexOf(']') === -1){
        eventOk = true;
      }
      

      // console.log("cat check");
      // console.log(categoryOk);
      // console.log(subCategoryOk);
      // console.log(eventOk);

      //if (categoryOk && subCategoryOk && eventOk) {
          let dbString = 'serverSeo/';
          if(!request.params.category && !request.params.subCategory && !request.params.event) {
              dbString = dbString;
              var db = admin.database();
                var ref = db.ref(dbString);
                ref.once("value", function(snapshot) {
                    let seo = {
                      title: 'אורן ורינת הפקות',
                      description: 'אורן ורינת הפקות',
                      keyWords: 'אורן ורינת הפקות'
                    };
                    if(snapshot.val() !== null) {
                      seo = snapshot.val().seo;
                    }

                    //console.log(seo);

                    fs.readFile(filePath, 'utf8', function (err,data) {
                      if (err) {
                        return console.log(err);
                      }
                      data = data.replace(/\$OG_TITLE/g, seo.title);
                      data = data.replace(/\$OG_DESCRIPTION/g, seo.description);
                      data = data.replace(/\$OG_KEYWORDS/g, seo.keyWords);
                      data = data.replace(/\$OG_IMAGE/g, 'https://oren-pro-website.herokuapp.com/images/og_image.jpg');
                      response.send(data);
                    }, function (errorObject) {
                      console.log("The read failed: " + errorObject.code);
                    });
                });
          } else if (request.params.category && !request.params.subCategory && !request.params.event) {
              if (categoryOk && !subCategoryOk && !eventOk) {
                dbString = dbString + String(request.params.category);
                var db = admin.database();
                var ref = db.ref(dbString);
                ref.once("value", function(snapshot) {
                    let seo = {
                      title: 'אורן ורינת הפקות',
                      description: 'אורן ורינת הפקות',
                      keyWords: 'אורן ורינת הפקות'
                    };
                    if(snapshot.val() !== null) {
                      seo = snapshot.val().seo;
                    }

                    //console.log(seo);

                    fs.readFile(filePath, 'utf8', function (err,data) {
                      if (err) {
                        return console.log(err);
                      }
                      data = data.replace(/\$OG_TITLE/g, seo.title);
                      data = data.replace(/\$OG_DESCRIPTION/g, seo.description);
                      data = data.replace(/\$OG_KEYWORDS/g, seo.keyWords);
                      data = data.replace(/\$OG_IMAGE/g, '/images/og_image.jpg');
                      response.send(data);
                    }, function (errorObject) {
                      console.log("The read failed: " + errorObject.code);
                    });
                });
              } else {
                next();
              }
          } else if (request.params.category && request.params.subCategory && !request.params.event) {
              if (categoryOk && subCategoryOk && !eventOk) {
                dbString = dbString + 'subcategories/' + String(request.params.category);
                var db = admin.database();
                var ref = db.ref(dbString);
                ref.once("value", function(snapshot) {
                    let seo = {
                      title: 'אורן ורינת הפקות',
                      description: 'אורן ורינת הפקות',
                      keyWords: 'אורן ורינת הפקות'
                    };
                    if(snapshot.val() !== null) {
                      seo = snapshot.val().seo;
                    }

                    //console.log(seo);

                    fs.readFile(filePath, 'utf8', function (err,data) {
                      if (err) {
                        return console.log(err);
                      }
                      data = data.replace(/\$OG_TITLE/g, seo.title);
                      data = data.replace(/\$OG_DESCRIPTION/g, seo.description);
                      data = data.replace(/\$OG_KEYWORDS/g, seo.keyWords);
                      data = data.replace(/\$OG_IMAGE/g, '/images/og_image.jpg');
                      response.send(data);
                    }, function (errorObject) {
                      console.log("The read failed: " + errorObject.code);
                    });
                });
              } else {
                next();
              }
          } else {
              if (categoryOk && subCategoryOk && eventOk) {
                dbString = dbString + 'events/' + String(request.params.category);
                var db = admin.database();
                var ref = db.ref(dbString);
                ref.once("value", function(snapshot) {
                    let seo = {
                      title: 'אורן ורינת הפקות',
                      description: 'אורן ורינת הפקות',
                      keyWords: 'אורן ורינת הפקות'
                    };
                    if(snapshot.val() !== null) {
                      seo = snapshot.val().seo;
                    }

                    //console.log(seo);

                    fs.readFile(filePath, 'utf8', function (err,data) {
                      if (err) {
                        return console.log(err);
                      }
                      data = data.replace(/\$OG_TITLE/g, seo.title);
                      data = data.replace(/\$OG_DESCRIPTION/g, seo.description);
                      data = data.replace(/\$OG_KEYWORDS/g, seo.keyWords);
                      data = data.replace(/\$OG_IMAGE/g, '/images/og_image.jpg');
                      response.send(data);
                    }, function (errorObject) {
                      console.log("The read failed: " + errorObject.code);
                    });
                });
              } else {
                next();
              }
          }
          
      //} else {
      //    next();
      //}
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