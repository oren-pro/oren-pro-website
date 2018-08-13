import database from '../firebase/firebase';

// edit about

export const editAboutPage = ( aboutpage ) => ({
    type: 'EDIT_ABOUTPAGE',
    aboutpage
});

export const startEditAboutPage = ( fbAboutpage, aboutpage ) => {
    return (dispatch) => {
        return database.ref(`website/aboutpage`).update({...fbAboutpage}).then(() => {
            dispatch(editAboutPage( aboutpage ));
        })
    };
};


// edit about seo

export const editAboutPageSeo = ( seo ) => ({
    type: 'EDIT_ABOUTPAGE_SEO',
    seo
});

export const startEditAboutPageSeo = ( seo ) => {
    return (dispatch) => {
        return database.ref(`website/aboutpage/seo`).update(seo).then(() => {
            dispatch(editAboutPageSeo( seo ));
        })
    };
};


// set homepage

export const setAboutPage = (aboutpage) => ({
    type: "SET_ABOUTPAGE",
    aboutpage
});

export const startSetAboutPage = () => {
    return (dispatch) => {
        return database.ref(`website/aboutpage/`).once('value').then((snapshot) => {
            //console.log('in set homepage ============');
            const aboutpage = snapshot.val();
            dispatch(setAboutPage(aboutpage));
            //dispatch(check());
        });
    };
};