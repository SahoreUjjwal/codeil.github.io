const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=> {
    
    let htmlString = nodeMailer.renderTemplate({comment :comment},'/comments/new_comments.ejs');
    nodeMailer.transporter.sendMail({
        from:'ujjwalsahore22@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published!",
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