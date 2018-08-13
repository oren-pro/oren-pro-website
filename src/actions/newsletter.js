import database from '../firebase/firebase';


export const subscribeToNewsletter = (newsletterData = {}) => {
    return () => {
        const {
            name = '',
            email = ''
        } = newsletterData;
        const subscriber = {name, email};
        return database.ref(`newsletter`).push(subscriber);
    };
};