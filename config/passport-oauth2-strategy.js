const passport  = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID:"15094916142-tmoedj7jvvs9ukh5qdvrb36sa7ttjeq8.apps.googleusercontent.com",
        clientSecret :"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    async function(accessToken,refreshToken,profile,done)
    {
        try{
            const user =  await User.findOne({
                email:profile.emails[0].value
            }) 
            console.log(profile);
            if(user)
            {
                return done(null,user);
            }
            else{
                const newUser = await User.create(
                    {
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        password:crypto.randomBytes(20).toString('hex')
                    }
                )
                if(newUser)
                {
                    return done(null,newUser);
                }
                else{
                    return done(null,false);
                }
            }

        }
        catch(error){
            console.log("error in google oauth strategy :",error);
            return;
        }
      
    }

))