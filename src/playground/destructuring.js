//
// Object destructuring
//


// const person = {
//     name: 'mosh',
//     age: 51,
//     location: {
//         city: 'ein hod',
//         temp: 22
//     }
// };

// const { name:firstName = 'Anonymus', age } = person;

// console.log(`${firstName} is ${age}.`);

// const { city, temp: temperature = 25 } = person.location;

// if(city && temperature) {
//     console.log(`it's ${temperature} degrees in ${city}`);
// }


// const book = {
//     name: 'Catch 22',
//     author: 'Josef Heller',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName);



//
// Array destructuring
//

// const address = ['p.o.box 237', 'Ein Hod', 'Isreal', '3089000'];

// //const [street, city, state, zip] = address;

// const [, city, state = 'Jordan'] = address;

// console.log(`i live in ${city} ${state}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [itemName, , mediumPrice] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}`);