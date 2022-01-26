const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;

const mailgun = require('mailgun-js')
       ({apiKey: API_KEY, domain: DOMAIN});


function getMessage() {
    const body = 'This is a test email using Mailgun from Node.js';
    return {
      to: 'abc@gmail.com',
      from: 'mailgun@sandbox01e46ee67ff14ffdb12ac35159a48927.mailgun.org',
      subject: 'Test email with Node.js and Mailgun',
      text: body,
      html: `<strong>${body}</strong>`,
    };
}

async function sendEmail() {
    try {
      await mailgun.messages().send(getMessage(), function (error, body) {
        if(error) console.log(error)
        else console.log(body);
      });
    } catch (error) {
      console.error('Error sending test email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
}

sendEmail();
