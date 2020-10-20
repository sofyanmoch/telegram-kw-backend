const nodemailer = require('nodemailer')
const env = require('./env')
const jwt = require('jsonwebtoken')
const {EMAIL, PASSWORD} = require('../helpers/env')

const sendMail =  {
        emailSend: (email) =>{
        const token = jwt.sign({email: email}, env.secretKey)
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
              user: 'mochsofyannn@gmail.com',
              pass: '@Daop7900'
            }
          });
          
          var mailOptions = {
            from: 'POS APP',
            to: email,
            subject: 'Sending Email using Node.js',
            html: `Please activation of email ! <br>
            <a href="${env.HOSTURL}${token}"> Activation</a>
            `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}
    

  
  module.exports = sendMail