//import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

//console.log(process.env.FIREBASE_DATABASE_URL);

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };











// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });


// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });




// // database.ref('expenses')
// //     .once('value')
// //     .then((snapshot) => {
// //         console.log(snapshot.val());
// //         const expenses = [];
// //         snapshot.forEach((childSnapshot) => {
// //             expenses.push({
// //                 id: childSnapshot.key,
// //                 ...childSnapshot.val()
// //             });
// //         });
// //         console.log(expenses);
// //     });


// // database.ref('expenses').on('value', (snapshot) => {
// //     const expenses = [];
// //     snapshot.forEach((childSnapshot) => {
// //         expenses.push({
// //             id: childSnapshot.key,
// //             ...childSnapshot.val()
// //         });
// //     });
// //     console.log(expenses);
    
// // }, (e) => {
// //     console.log('Error fetching data', e);
// // });





// // database.ref('expenses').push({
// //     description: 'Coffee',
// //     note: 'my first note',
// //     amount: 1.95,
// //     createdAt: 11587
// // });







// // const firebaseNotes = {
// //     notes: {
// //         aasduhe: {
// //             title: 'first note',
// //             body: 'this is my note'
// //         },
// //         nhe1376: {
// //             title: 'second note',
// //             body: 'this is my note'
// //         }
// //     }
// // }


// // const notes = [{
// //     id: 12,
// //     title: 'first note',
// //     body: 'this is my note'
// // }, {
// //     id: 764,
// //     title: 'second note',
// //     body: 'this is my note'
// // }];



// // database.ref().set({
// //     name: 'mosh',
// //     job: {
// //         title: 'Software Developer',
// //         company: 'Amazon'
// //     }
// // });


// // database.ref().on('value', (snapshot) => {
// //     const val = snapshot.val();
// //     console.log(`${val.name} is a  ${val.job.title} at ${val.job.company}`);
// // }, (e) => {
// //     console.log('Error fetching data', e);
// // });

// // setTimeout(() => {
// //     database.ref().update({
// //         name: 'mosh',
// //         'job/title': 'Software developer',
// //         'job/company': 'Self employed'
// //     }).then(() => {
// //         console.log('updated');
// //     }).catch((e) => {
// //         console.log('error - ', e);
// //     });
// // }, 3000);





// // Reading from database

// // database.ref()
// //     .once('value')
// //     .then((snapshot) => {
// //         const val = snapshot.val();
// //         console.log(val)
// //     }).catch((e) => {
// //         console.log('Error reading data', e);
// //     });

// // const onValueChange = database.ref().on('value', (snapshot) => {
// //     console.log(snapshot.val());
// // }, (e) => {
// //     console.log('Error fetching data', e);
// // });

// // setTimeout(() => {
// //     database.ref('age').set(53);
// // }, 3000);

// // setTimeout(() => {
// //     database.ref().off('value', onValueChange);
// // }, 6000);

// // setTimeout(() => {
// //     database.ref('age').set(59);
// // }, 9000);

// // Writing into the database using 'set' (change the object if updates)

// // database.ref().set({
// //     name: "mosh",
// //     age: 51,
// //     stresslevel: 6,
// //     job: {
// //         title: 'musician',
// //         company: 'selfEmployed'
// //     },
// //     location: {
// //         city: "ein hod",
// //         country: "israel"
// //     }
// // }).then(() => {
// //     console.log('Data is saved')
// // }).catch((e) => {
// //     console.log('This failed, ', e)
// // });


// // Setting values to specific vars

// // database.ref('age').set(52);
// // database.ref('location/city').set('haifa');

// // database.ref('attributes').set({
// //     height: 178,
// //     weight: 70
// // }).then(() => {
// //     console.log('Data 2 is saved')
// // }).catch((e) => {
// //     console.log('This 2 failed, ', e)
// // });


// // Deleting from database using 'remove'

// // database.ref('isSingle').remove().then(() => {
// //     console.log('Removed isSingle');
// // }).catch((e) => {
// //     console.log('Remove failed: ', e);
// // });


// // Updating mulitiple vars using 'update'

// // database.ref().update({
// //     stresslevel: 9,
// //     'job/company': 'funk.co.il',
// //     'location/city': 'tel-aviv'
// // });                             