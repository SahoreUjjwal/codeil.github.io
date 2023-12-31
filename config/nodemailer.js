const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service:"gmail",
    host:'smtp.gmail.com',
    port:587,//for TLS
    secure:false,
    auth:{
        user:'ujj',
        pass:'uvzf khkn ycvz hqyr'
    }
});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    console.log(path.join(__dirname,'../views/mailer',relativePath));
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template');
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate: renderTemplate
}