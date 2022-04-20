// Navigation Reducer

const navigationReducerDefaultState = {};

 export default (state = navigationReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_HOMEPAGE_CAROUSEL_DONE':
            return action.homepageCarouselDone;
        default:
            return state;
    }
};