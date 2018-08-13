import uuid from'uuid';
import database from '../firebase/firebase';


// this is an action generator - without database
// a component calls this action generator
// the action generator returns an object to the component
// the com ponent dispaches the object to redux
// redux store changes

// this is an action generator - with database
// a component calls this action generator
// the action generator returns a function to the component
// the com ponent dispaches the function to redux
// the function runs (has the ability to dispatch other actions to redux or do whatever it wants)
// redux store changes



// ADD_EXPENSE

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            notes = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = {description, notes, amount, createdAt};
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE

export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }));
        })
    };
};

// // database.ref('isSingle').remove().then(() => {
// //     console.log('Removed isSingle');
// // }).catch((e) => {
// //     console.log('Remove failed: ', e);
// // });

// EDIT_EXPENSE

export const editExpense = ( id, updates ) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = ( id, updates ) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense( id, updates ));
        })
    };
};

//SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: "SET_EXPENSES",
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
    };
};