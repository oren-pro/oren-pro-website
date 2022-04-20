//import database from '../firebase/firebase';
var firebase = require("firebase/app");
require("firebase/database");



// add mobileGalley image


export const startAddMobileGallery = ( mobileImage ) => {
    return (dispatch) => {
        return firebase.database().ref(`website/mobileGallery`).push(mobileImage).then(() => {
            //dispatch(addCostumers( costumers ));
        })
    };
};




// edit mobileGalley images

export const editMobileGallery = ( mobileImages ) => ({
    type: 'SET_MOBILE_GALLERY',
    mobileImages
});

export const startEditMobileGallery = ( mobileImages, fbMobileImages ) => {
    return (dispatch) => {
        return firebase.database().ref(`website/mobileGallery`).update({...fbMobileImages}).then(() => {
            dispatch(editMobileGallery( mobileImages ));
        })
    };
};




// set mobileGalley images

export const setMobileGallery = (mobileImages) => ({
    type: "SET_MOBILE_GALLERY",
    mobileImages
});

export const startSetMobileGallery = () => {
    return (dispatch) => {
        return firebase.database().ref(`website/mobileGallery/`).once('value').then((snapshot) => {
            const mobileImages = [];
            snapshot.forEach((childSnapshot) => {
                mobileImages.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            mobileImages.sort((a, b) => {
                return a.order > b.order ? 1 : -1;
            });
            dispatch(setMobileGallery(mobileImages));
            return (mobileImages);
        });
    };
};



// delete mobileGalley images

export const startDeleteMobileGallery = ( fbMobileImages, mobileImages, publicid ) => {
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
        return firebase.database().ref('website/mobileGallery').update(fbMobileImages).then(() => {
            dispatch(setMobileGallery(mobileImages));
        })
    };
};