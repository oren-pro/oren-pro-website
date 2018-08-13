const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'mosh',
            msg: 'This is my resolved data'
        });
        //reject('Something went wrong!');
    }, 3000);
});

console.log('before');

promise.then((data) => {
    console.log('1', data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('this is a new promise');
        }, 3000);
    });
}).then((str) => {
    console.log('dose this run?', str);
}).catch((error) => {
    console.log('error: ', error);
});



// 'catch' may come as the second argument of 'then' 
// but expilicity writing '.catch()' alows better readability.

/*

promise.then((data) => {
    console.log('1', data);
}, (error) => {
    console.log('error: ', error);
});

*/


console.log('after');