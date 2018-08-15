import database from '../firebase/firebase';
const axios = require('axios');

export const subscribeToNewsletter = (newsletterData = {}) => {
    return () => {
        const {
            name = '',
            email = ''
        } = newsletterData;
        const subscriber = {name, email};
console.log(name);
console.log(email);

        let config = {
            
        }
        const payload = {
            "headers":{
                "Access-Control-Allow-Origin": '*',
                "Accept": 'application/json'
            }
        }

        axios.post('http://api.viplus.com/gates/wsgate.asmx/RMembers_Import', {
            "Access-Control-Allow-Origin": '*',
            "firstname": name,
            "email": email,
            "apikey": "f6c20ab2-9ce5-403b-aeb3-b05c1f6b0af2",
            "successredirect": "http://oren-pro-website.herokuapp.com",
            "failedredirect": "http://oren-pro-website.herokuapp.com",
            "viplists": "0",
            "exists": "merge",
            "restore": "restoreondeleted"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(function (response) {
            console.log("response");
            console.log(response);
        })
        .catch(function (error) {
            console.log('error');
            console.log(error);
        });


//         function post(method) {
//             method = method || "post"; // Set method to post by default if not specified.
// console.log('in post');

//             const params = {
//                 "firstname": name,
//                 "email": email,
//                 "apikey": "f6c20ab2-9ce5-403b-aeb3-b05c1f6b0af2",
//                 "successredirect": "http://oren-pro-website.herokuapp.com",
//                 "failedredirect": "http://oren-pro-website.herokuapp.com",
//                 "viplists": "0",
//                 "exists": "merge",
//                 "restore": "restoreondeleted"
//             }

//             // The rest of this code assumes you are not using a library.
//             // It can be made less wordy if you use one.
//             var form = document.createElement("form");
//             form.setAttribute("method", method);
//             form.setAttribute("action", "http://api.viplus.com/gates/wsgate.asmx/RMembers_Import");

//             for(var key in params) {
//                 if(params.hasOwnProperty(key)) {
//                     var hiddenField = document.createElement("input");
//                     hiddenField.setAttribute("type", "hidden");
//                     hiddenField.setAttribute("name", key);
//                     hiddenField.setAttribute("value", params[key]);

//                     form.appendChild(hiddenField);
//                 }
//             }

//             document.body.appendChild(form);
//             form.submit();
//         }


//         post();



        return database.ref(`newsletter`).push(subscriber);
    };
};