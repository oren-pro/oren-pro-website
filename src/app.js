import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import {
    startSetCategories,
    startSetAllSubcategories,
    startSetAllEvents
} from './actions/eventspage';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';

const store = configureStore();

console.log('port: '+process.env.PORT);

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

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetCategories()).then(() => {
    renderApp();
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