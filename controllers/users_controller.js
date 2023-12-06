const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const ResetPassword = require('../models/resetPassword');
const crypto = require('crypto');
const resetMailer = require('../mailer/resetPassword_mailer');


module.exports.profile = async  function(req, res){
    const user = await User.findById({_id : req.params.id}); 
    return res.render('user_profile', {
        title: 'User Profile',
        profile_user:user
    })
}



// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}
////render forgot password page
module.exports.forgotPassword = async  function(req, res){
    return res.render('forgot_password', {
        title: 'Forgot password'
    })
}

//send mail to reset password

module.exports.resetEmail = async function(req, res){
        console.log('inreset',req.body.email);
        const user = await User.findOne({email : req.body.email}); 
    
    if(user)
    {
        const tempToken = crypto.randomBytes(20).toString('hex')
        const contains = await ResetPassword.findOne({user:user._id});
       // console.log(contains);
        let tempPassword;
        if(contains)
        {
            //console.log('here1');
             tempPassword = await ResetPassword.findOneAndUpdate({user:contains.user},{token:tempToken,isValid:true})
        }
        else{
           // console.log('here2');
             tempPassword = await ResetPassword.create({
                user:user._id,
                token:tempToken,
                //isValid:true
            });
        }
        if(tempPassword)
        {
            const link = `http://localhost:8000/users/reset-password/${tempToken}`
            resetMailer.passwordLink(user,link);
            return res.redirect('back');
        }
    }   
}
// reset password on link click
module.exports.linkResetPassword = async function(req,res){
    try{
        let resetPasswordDocument = await ResetPassword.findOne({token:req.params.token});
    if(resetPasswordDocument.isValid)
        {
            resetPasswordDocument.populate('user');
            return res.render('reset_page', {
                title: 'Reset password',
                user:resetPasswordDocument.user
            })
        }
        else{
            return res.send('token_invalid')
        }

    }
    catch(err){
        console.log('Error generating reset Lin:', err);
    }
    
    
}

//submit new password
module.exports.newPassword = async function(req,res){

    try{
        if(req.body.password == req.body.confirm_password) 
  {
           // console.log("hit");
            const user = await User.findByIdAndUpdate({_id:req.body.user_id},{password:req.body.password});
            if(user)
            {
               // console.log("hit 2");
                const updatedIsValid =  await ResetPassword.findOneAndUpdate({user:user._id},{isValid:false});
                return res.redirect('/users/sign-in');
             
            }
        }
    }
    catch(error){
        console.log('Error while reset of new Password : ' ,error);
    }

   
}


// get the sign up data
module.exports.create =async function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    try{
        if (req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        const user =  await User.findOne({email: req.body.email});
  	    if (!user){
            await User.create(req.body);
		    return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }   
    }
    catch(err){
	    return res.redirect('back');
    }
}

module.exports.update= async function(req,res){
    try{
        if(req.user.id == req.params.id)
        {
            // const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body)
            // return res.redirect('back');

            let user = await User.findById(req.params.id);
            User.uploadedavatar(req,res,function(err){
                if(err){
                    console.log('****multer Error:', err);
                    
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));//handles file deletion of previous profile pic
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }   
                user.save();
                return res.redirect('back');
            })


        }
        else{
            return res.status(401).send('Unauthorized');//added status code for user not matching
        }
        
    }
    catch(err){
        console.log("Error updating profile : ", err);
        return res.redirect('back');
    }
}

//to signout 
module.exports.signOut=async function(req,res){

    req.logout(function(err) {
        if (err) { req.flash('error','Error logging out');
            return res.redirect('back');
        }
        req.flash('success','Logged out successfully');
        return res.redirect('/users/sign-in');
      });
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}