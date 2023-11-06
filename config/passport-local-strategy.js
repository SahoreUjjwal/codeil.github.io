const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({usernameField:'email'},async function(email,password,done){
        try{
            console.log('hi');
            const user = await User.findOne({email:email});
            if(!user || user.password!= password){
                console.log('Invalid username password');
                return done(null,false);
            }
            if(user)
            {
                console.log(user);
                return done(null,user);
            }
        }
        catch(error){
            console.log('Error in finding user ---> Passport');
           return done(error);
        }
        
    }
));


// //serealizing to decide which key is to kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// //deserealizing th euser from the cookies

 passport.deserializeUser(function(id,done){
   try{
        const user = User.findById({_id:id});
        if(!user){
            console.log('user not found');
            return done(null,false);
        }
        if(user)
        {
            done(null,user);
        }
   }
   catch(error){
    console.log('Error finding user');
    return done(error);
   }
});


module.exports = passport;