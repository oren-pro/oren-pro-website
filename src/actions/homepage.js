//import database from '../firebase/firebase';
//import * as firebase from 'firebase/app';
//import 'firebase/database';
var firebase = require("firebase/app");
require("firebase/database");

// edit homepage

export const editHomePage = ( homepage ) => ({
    type: 'EDIT_HOMEPAGE',
    homepage
});

export const startEditHomePage = ( homepage ) => {
    return (dispatch) => {
        
        return firebase.database().ref(`website/`).update(homepage).then(() => {
            dispatch(editHomePage( homepage ));
        })
    };
};


// edit homepage seo

export const editHomePageSeo = ( seo ) => ({
    type: 'EDIT_HOMEPAGE_SEO',
    seo
});

export const startEditHomePageSeo = ( seo ) => {
    return (dispatch) => {
        return firebase.database().ref(`website/homepage/seo`).update(seo).then(() => {
            dispatch(editHomePage( seo ));
        })
    };
};


// set homepage

export const setHomePage = (homepage) => ({
    type: "SET_HOMEPAGE",
    homepage
});

export const startSetHomePage = () => {

    // return (dispatch) => {
    //     //https://[PROJECT_ID].firebaseio.com/users/jack/name.json
    //     var method = 'GET';
    //     //var action = 'http://localhost:3000/deleteImage';
    //     var action = 'https://oren-pro.firebaseio.com/website/homepage.json';
    //     var xhr = new XMLHttpRequest();
    //     var data = '';
    //     //console.log(publicid);
    //     //data += 'publicid=' + publicid;
    //     xhr.open(method, action);
    //     xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    //     xhr.send(data);
    //     xhr.addEventListener('load', function (e) {
    //         var homepage = JSON.parse(e.target.responseText);
    //         console.log(homepage);
    //         dispatch(setHomePage(homepage));
    //     });
    //     return 'done';
    // };

    return (dispatch) => {
        return firebase.database().ref(`website/homepage/`).once('value').then((snapshot) => {
            const homepage = snapshot.val();
            console.log(homepage);
            dispatch(setHomePage(homepage));
        });
    };
};


// ADD_HOMEPAGE_TELL

export const startAddHomePageTell = (homepage, tellData) => {
    return (dispatch, getState) => {
        const {
            name = '',
            position = '',
            company = 0,
            createdAt = 0,
            text = '',
            order = 0
        } = tellData;
        const tell = {company, createdAt, name, position, text, order};
        return firebase.database().ref(`website/homepage/tell`).push(tell).then((ref) => {
            const id = ref.key;
            homepage.tell[ref.key] = tell;
            dispatch(editHomePage(homepage));
            return(homepage);
        });
    };
};


// delete homepage image

export const startDeleteHomePageImage = ( homepage, publicid ) => {
    return (dispatch) => {
        var method = 'POST';
        //var action = 'http://localhost:3000/deleteImage';
        var action = '/deleteImage';
        var xhr = new XMLHttpRequest();
        var data = '';
        console.log(publicid);
        data += 'publicid=' + publicid;
        xhr.open(method, action);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(data);
        xhr.addEventListener('load', function (e) {
            var data = e.target.responseText;
            console.log(data);
        });
        return firebase.database().ref(`website/`).update(homepage).then(() => {
            dispatch(editHomePage( homepage ));
        })
    };
};