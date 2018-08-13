// Expenses Reducer

const expensesReducerDefaultState = [];

 export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
        // push changes the array, concat returns a new array
            return [
                ...state,
                action.expense
            ];
        case 'SET_EXPENSES':
            return action.expenses;
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};