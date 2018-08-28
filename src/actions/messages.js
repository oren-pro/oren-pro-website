import database from '../firebase/firebase';
import bodyParser from 'body-parser';
//const {google} = require('googleapis');
//var nodemailer = require('nodemailer');
//var SparkPost = require('sparkpost');

export const startSendMessage = (messageData = {}) => {
    return (dispatch) => {
        const {
            name = '',
            phone = '',
            email = '',
            message = '',
            createdAt = 0
        } = messageData;
        const userMessage = {name, phone, email, message, createdAt};
        return database.ref(`messages`).push(userMessage).then((ref) => {
            dispatch(sendMessage({
                id: ref.key,
                ...userMessage
            }));
        });
    };
};

export const sendMessage = ({ name, email, message }) => {
    return (dispatch) => {
        // var method = 'POST';
        // //var action = 'http://localhost:3000/sendEmail';
        // var action = '/sendEmail';
        // var xhr = new XMLHttpRequest();
        // var data = '';
        // data += 'name=' + name;
        // data += '&email=' + email;
        // data += '&message=' + message;
        // xhr.open(method, action);
        // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        // xhr.send(data);
        // xhr.addEventListener('load', function (e) {
        //     var data = e.target.responseText;
        //     console.log('in send mail');
        //     console.log(data);
        // });


        
        // var sparky = new SparkPost(); // uses process.env.SPARKPOST_API_KEY

        // sparky.transmissions.send({
        //     options: {
        //     sandbox: true
        //     },
        //     content: {
        //     from: 'testing@zzz.com',// + process.env.SPARKPOST_SANDBOX_DOMAIN, // 'testing@sparkpostbox.com'
        //     subject: 'Oh hey!',
        //     html:'<html><body><p>Testing SparkPost - the world\'s most awesomest email service!</p></body></html>'
        //     },
        //     recipients: [
        //     {address: 'mosh.kainer@gmail.com'}
        //     ]
        // })
        // .then(data => {
        //     console.log('Woohoo! You just sent your first mailing!');
        //     console.log(data);
        // })
        // .catch(err => {
        //     console.log('Whoops! Something went wrong');
        //     console.log(err);
        // });


        return ("done");
        // const res = fetch('http://localhost:3000/sendEmail', {
        //     method : 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name,
        //         email,
        //         message
        //     })
        // }).then(() => console.log('server response'));

        // const json = res;
        // console.log(res);
        // return json;

    };
};