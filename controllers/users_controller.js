const User = require('../models/user');
const fs = require('fs');
const path = require('path');

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