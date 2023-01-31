//importing nodemailer
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function mailerFunc(emailId,userName,pass) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
      auth: {
        user: "priyansh007.suvit@gmail.com", 
        pass: "mumsiegxdyplfpou",
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Priyansh" <priyansh007.suvit@gmail.com>', // sender address
      to: emailId, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "userName : " +  userName + " " + "password : " + pass, // plain text body
    });

    console.log(info)
  }

  module.exports = { mailerFunc }