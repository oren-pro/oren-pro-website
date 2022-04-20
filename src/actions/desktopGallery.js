//import database from '../firebase/firebase';
var firebase = require("firebase/app");
require("firebase/database");

// add desktopGalley image


export const startAddDesktopGallery = ( desktopImage ) => {
    return (dispatch) => {
        return firebase.database().ref(`website/desktopGallery`).push(desktopImage).then(() => {
            //dispatch(addCostumers( costumers ));
        })
    };
};




// edit desktopGalley images

export const editDesktopGallery = ( desktopImages ) => ({
    type: 'SET_DESKTOP_GALLERY',
    desktopImages
});

export const startEditDesktopGallery = ( desktopImages, fbDesktopImages ) => {
    return (dispatch) => {
        return firebase.database().ref(`website/desktopGallery`).update({...fbDesktopImages}).then(() => {
            dispatch(editDesktopGallery( desktopImages ));
        })
    };
};




// set desktopGalley images

export const setDesktopGallery = (desktopImages) => ({
    type: "SET_DESKTOP_GALLERY",
    desktopImages
});

export const startSetDesktopGallery = () => {
    return (dispatch) => {
        return firebase.database().ref(`website/desktopGallery/`).once('value').then((snapshot) => {
            const desktopImages = [];
            snapshot.forEach((childSnapshot) => {
                desktopImages.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            desktopImages.sort((a, b) => {
                return a.order > b.order ? 1 : -1;
            });
            dispatch(setDesktopGallery(desktopImages));
            return (desktopImages);
        });
    };
};



// delete desktopGalley images

export const startDeleteDesktopGallery = ( fbDesktopImages, desktopImages, publicid ) => {
    return (dispatch) => {
        var method = 'POST';
        var action = '/deleteImage';
        var xhr = new XMLHttpRequest();
        var data = '';
        data += 'publicid=' + publicid;
        xhr.open(method, action);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(data);
        xhr.addEventListener('load', function (e) {
            var data = e.target.responseText;
        });
        return firebase.database().ref('website/desktopGallery').update(fbDesktopImages).then(() => {
            dispatch(setDesktopGallery(desktopImages));
        })
    };
};