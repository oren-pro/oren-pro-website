import {createStore} from 'redux';

// Action generators

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});


// Reducers
// 1. Reducers are pure functions
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
}


// Store

const store = createStore(countReducer);


// log changes

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});



// action calls

store.dispatch(incrementCount({ incrementBy: 5, multiplyBy: 2 }));

store.dispatch(incrementCount({ }));

store.dispatch(resetCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(decrementCount({ }));

store.dispatch(setCount({ count: 101 }));

store.dispatch(setCount({ count: 109 }));



//unsubscribe();