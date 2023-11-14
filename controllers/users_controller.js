const User = require('../models/user');


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
        const profile = '/users/profile/'+req.user.id;
        return res.redirect(profile);
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.update= async function(req,res){
    try{
        if(req.user.id == req.params.id)
        {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body)
           
        }
        return res.redirect('back');
    }
    catch(err){
        console.log("Error updating profile : ", err);
        return res.redirect('back');
    }
}

//to signout 
module.exports.signOut=function(req,res){
    req.logout(function(err) {
        if (err) { console.log(err); }
      });
    return res.redirect('/users/sign-in');
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    const profile = '/users/profile/'+req.user.id;
    return res.redirect(profile);
}