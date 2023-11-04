const User = require('../models/user');


module.exports.profile = function(req,res)
        {
            return res.render('user_profile',{
                title:"profile"
            });
        };



module.exports.name = function(req,res){
    return res.end('<h1>Name</h1>');
}



module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title:'Codeil | signup'
    })
}

module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title:'Codeil | signin'
    })
}

module.exports.create =async function(req,res){
    //TODO create user
    
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }
    try{
        const user = await User.findOne({email:req.body.email});
        
        if(!user)
        {
            User.create(req.body);
            return res.redirect('/user/sign-in');
            
        }
        else{
            return re.redirect('back');
        }

    }
    catch(error){
        console.log("Error completing request ");
        return res.redirect('back');
    }
    
}
module.exports.createSession =function(req,res){
    //TODO create user loginn session
}