import database from '../firebase/firebase';

// edit homepage

export const editHomePage = ( homepage ) => ({
    type: 'EDIT_HOMEPAGE',
    homepage
});

export const startEditHomePage = ( homepage ) => {
    console.log('err');
    return (dispatch) => {
        
        return database.ref(`website/`).update(homepage).then(() => {
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
        return database.ref(`website/homepage/seo`).update(seo).then(() => {
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
    return (dispatch) => {
        return database.ref(`website/homepage/`).once('value').then((snapshot) => {
            //console.log('in set homepage ============');
            const homepage = snapshot.val();
            dispatch(setHomePage(homepage));
            dispatch(check());
        });
    };
};

// ADD_HOMEPAGE_TELL

export const check = () => {
    //console.log('in check ============');
    return (dispatch) => {
        return database.ref("website/homepage/events").once('value').then((snapshot) => {
            snapshot.forEach(function (childSnap) {
                // console.log('event', childSnap.val().eventHeader);
                // console.log('event', childSnap.val());
            });
            // console.log('check');
            // console.log(snapshot.val());
        });
    };
};



export const startAddHomePageTell = (homepage, tellData = {}) => {
    return (dispatch, getState) => {
        const {
            name = '',
            position = '',
            company = 0,
            createdAt = 0,
            text = ''
        } = tellData;
        const tell = {company, createdAt, name, position, text};
        return database.ref(`website/homepage/tell`).push(tell).then((ref) => {
            const id = ref.key;
            homepage.tell[ref.key] = tell;
            dispatch(editHomePage(homepage));
        });
    };
};