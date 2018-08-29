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

        // const payload = {
        //     "headers":{
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         "Access-Control-Allow-Origin": '*',
        //         "Accept": 'application/json'
        //     }
        // }



        //  var postData = {
        //     firstname: name,
        //     email: email,
        //     apikey: "f6c20ab2-9ce5-403b-aeb3-b05c1f6b0af2",
        //     successredirect: "https://oren-pro-website.herokuapp.com/newsletter_success",
        //     failedredirect: "https://oren-pro-website.herokuapp.com/newsletter_failed",
        //     viplists: "0",
        //     exists: "merge",
        //     restore: "restoreondeleted"
        // };

        // let axiosConfig = {
        //     headers: {
        //         'Content-Type': 'application/json;charset=UTF-8',
        //         "Access-Control-Allow-Origin": "http://localhost:8080",
        //     }
        // };

        // axios.post('http://api.viplus.com/gates/wsgate.asmx/RMembers_Import', postData, axiosConfig)
        // .then((res) => {
        //     console.log("RESPONSE RECEIVED: ", res);
        // })
        // .catch((err) => {
        //     console.log("AXIOS ERROR: ", err);
        // })









        // axios.post('http://api.viplus.com/gates/wsgate.asmx/RMembers_Import', {
        //     "firstname": name,
        //     "email": email,
        //     "apikey": "f6c20ab2-9ce5-403b-aeb3-b05c1f6b0af2",
        //     "successredirect": "http://oren-pro-website.herokuapp.com",
        //     "failedredirect": "http://oren-pro-website.herokuapp.com",
        //     "viplists": "0",
        //     "exists": "merge",
        //     "restore": "restoreondeleted"
        // }, {
        //     headers: {
        //         "apikey": "f6c20ab2-9ce5-403b-aeb3-b05c1f6b0af2",
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Access-Control-Allow-Origin': '*',
        //         'Accept': 'application/json'
        //     }
        // })
        // .then(function (response) {
        //     console.log("response");
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log('error');
        //     console.log(error);
        // });





//  post method


        function post(method) {
            method = method || "post"; // Set method to post by default if not specified.
            console.log('in post');

            const params = {
                "firstName": name,
                "email": email,
                "apikey": "3f2f5b05-96cd-4f48-858c-67b302f2915a",
                "successredirect": "https://oren-pro-website.herokuapp.com/newsletter_success",
                "failedredirect": "https://oren-pro-website.herokuapp.com/newsletter_failed",
                "lists_ToSubscribe": "0"
            }

            // The rest of this code assumes you are not using a library.
            // It can be made less wordy if you use one.
            var form = document.createElement("form");
            form.setAttribute("method", method);
            //form.setAttribute("action", "http://api.viplus.com/gates/wsgate.asmx/RMembers_Import");
            form.setAttribute("action", "https://ssl-vp.com/rest/v1/Contacts?updateIfExists=true&restoreIfDeleted=true&restoreIfUnsubscribed=true&api_key=3f2f5b05-96cd-4f48-858c-67b302f2915a");


            for(var key in params) {
                if(params.hasOwnProperty(key)) {
                    console.log(key);
                    console.log(params[key]);
                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", key);
                    hiddenField.setAttribute("value", params[key]);

                    form.appendChild(hiddenField);
                }
            }
            console.log(form);
            document.body.appendChild(form);
            //form.submit();
        }


        post();



        return database.ref(`newsletter`).push(subscriber);
    };
};