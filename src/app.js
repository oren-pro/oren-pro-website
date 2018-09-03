import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
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
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><ReactLoading type="spinningBubbles" color="#666665" /></div>, document.getElementById('app'));

store.dispatch(startSetCategories()).then(() => {
    store.dispatch(startSetDesktopGallery()).then(() => {
        store.dispatch(startSetMobileGallery()).then(() => {
            store.dispatch(startSetCostumers()).then(() => {
                renderApp();
            });
        });
    });
});
//renderApp();
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('login from onAuthStateChange');
        store.dispatch(login(user.uid));
        store.dispatch(startSetAllSubcategories()).then(() => {
            store.dispatch(startSetAllEvents());
        });
        //renderApp();
    } else {
        //console.log('logout from onAuthStateChange');
        store.dispatch(logout());
        //renderApp();
        
    }
});