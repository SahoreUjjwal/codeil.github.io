const nodeMailer = require('../config/nodemailer');

exports.passwordLink = (user,link) =>{
    console.log('inside template');
    let htmlString = nodeMailer.renderTemplate({link :link,user:user},'resetPassword/reset_password.ejs');
    nodeMailer.transporter.sendMail({
        from:'ujjwalsahore22@gmail.com',
        to:user.email,
        subject:"Reset password link",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('Error sending mail : ',err);
            return;
        }
        console.log('Message Sent',info);
        return;
    });
}