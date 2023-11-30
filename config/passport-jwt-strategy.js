const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require("../models/user");

let opts= {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'çodeial'
}


passport.use(new JWTStrategy(opts,async function(jwtPayLoad,done)
{   

    console.log("loaded");
    try{
        console.log("id",jwtPayLoad._id);
        const user  = await User.findById(jwtPayLoad._id);
        if(user){
            console.log("user found");
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    }
    catch(err){
        console.log("Error occured",);
        return;
    }
}));



module.exports = passport;