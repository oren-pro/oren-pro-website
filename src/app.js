import React from 'react';
import { render } from 'react-dom';
import ReactLoading from "react-loading";
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import {
    startSetCategories,
    startSetAllSubcategories,
    startSetAllEvents
} from './actions/eventspage';
import {
    startSetCostumers
} from './actions/costumers';
import {
    startSetDesktopGallery
} from './actions/desktopGallery';
import {
    startSetMobileGallery
} from './actions/mobileGallery';
import { login, logout } from './actions/auth';
if (typeof(window) !== "undefined") {
    //import 'normalize.css/normalize.css';
    require("normalize.css/normalize.css");
}

//import { firebase } from './firebase/firebase';
var firebase = require("firebase/app");
require("firebase/auth");

import $ from 'jquery';

import WebfontLoader from '@dr-kobros/react-webfont-loader';
const config = {
  google: {
    families: ['Heebo:400,500,700&amp;subset=hebrew'],
  }
};
const callback = status => {
  // I could hook the webfont status to for example Redux here.
};
// var WebFont = require('webfontloader');
 
// WebFont.load({
// google: {
//     families: ['Heebo:400,500,700&amp;subset=hebrew']
// }
// });

import './styles/styles.scss';

const store = configureStore();



let hasRendered = false;
let windowWidth = undefined;
const renderApp = () => {
    console.log('in startSetCostumers');
    if (!hasRendered) {
        if (typeof(window) !== "undefined") {
            windowWidth = $( window ).width();
            if(windowWidth !== undefined) {
                const jsx = (
                    <WebfontLoader config={config} onStatus={callback}>
                        <Provider store={store}>
                            <AppRouter windowWidth={windowWidth} />
                        </Provider>
                    </WebfontLoader>
                );
                render(jsx, document.getElementById('app'));
                hasRendered = true;
            }
        }
    }
};

//console.log(navigator.userAgent);
if (typeof(window) !== "undefined") {
    if (navigator.userAgent.toLowerCase().indexOf('msie') > -1 || navigator.userAgent.toLowerCase().indexOf('trident') > -1 || navigator.userAgent.toLowerCase().indexOf('edge') > -1 ){
        console.log("found");
        render(<div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><img src="/images/ie-preloader.gif" alt="אורן ורינת הפקות אירועים"/></div>, document.getElementById('app'));
    } else {
        render(<div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><ReactLoading type="spinningBubbles" color="#666665" /></div>, document.getElementById('app'));
    }
}


store.dispatch(startSetCategories()).then(() => {
    console.log('in startSetCategories');
    store.dispatch(startSetDesktopGallery()).then(() => {
        console.log('in startSetDesktopGallery');
        store.dispatch(startSetMobileGallery()).then(() => {
            console.log('in startSetMobileGallery');
            store.dispatch(startSetCostumers()).then(() => {
                console.log('in startSetCostumers');
                renderApp();
            });
        });
    });
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetAllSubcategories()).then(() => {
            store.dispatch(startSetAllEvents());
        });
    } else {
        store.dispatch(logout());
    }
});