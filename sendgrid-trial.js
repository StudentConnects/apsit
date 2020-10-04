const dotenv = require("dotenv").config()
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: ['trial1@gmail.com', "trial2@gmail.com", "trial3@gmail.com", ],
  from: 'noreply-apsit@apsit.com',
  subject: 'Trial emails',
  // text: '',
  html: '<strong>Strong test. These are just for testing purposes, will be used further. Stay Tuned 😜</strong>',
};
sgMail.sendMultiple(msg).then((response) => {
    console.log(response);
}).catch(err => console.log(err));