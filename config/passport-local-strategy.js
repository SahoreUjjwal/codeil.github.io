const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// // passport.use(new LocalStrategy({usernameField:'email'},async function(email,password,done){
// //         try{
// //             const user = await User.findOne({email:email});
// //             if(!user || user.password!= password){
// //                 console.log('Invalid username password');
// //                 return done(null,false);
// //             }
// //             if(user)
// //             {
// //                 return done(null,user);
// //             }
// //         }
// //         catch(error){
// //             console.log('Error in finding user ---> Passport');
// //            return done(error);
// //         }
        
// //     }
// // ));


// //serealizing to decide which key is to kept in the cookie
// passport.serializeUser(function(user,done){
//     done(null,user.id);
// });

// //deserealizing th euser from the cookies

// passport.deserializeUser(function(id,done){
//    try{
//         const user = User.findById({_id:id});
//         if(!user){
//             console.log('user not found');
//             return done(null,false);
//         }
//         if(user)
//         {
//             done(null,user);
//         }
//    }
//    catch(error){
//     console.log('Error finding user');
//     return done(error);
//    }
// });
    
// module.exports = passport;

// const passport = require('passport');

// const LocalStrategy = require('passport-local').Strategy;

// const User = require('../models/user');


// authentication using passport
// passport.use(new LocalStrategy({
//         usernameField: 'email'
//     },
//     function(email, password, done){
//         // find a user and establish the identity
//         User.findOne({email: email}, function(err, user)  {
//             if (err){
//                 console.log('Error in finding user --> Passport');
//                 return done(err);
//             }

//             if (!user || user.password != password){
//                 console.log('Invalid Username/Password');
//                 return done(null, false);
//             }

//             return done(null, user);
//         });
//     }


// ));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true
},
async function(req,email, password, done){
    try {
        console.log('Hi');
        // find a user and establish the identity
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password){
            console.log('Invalid Username/Password');
            //req.flash('error','Invalid Username/Password.!!!');
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        // console.log('Error in finding user --> Passport');
       // req.flash('error',err);
        return done(err);
    }
}));



//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         if(err){
//             console.log('Error in finding user --> Passport');
//             return done(err);
//         }

//         return done(null, user);
//     });
// });
passport.deserializeUser(async function(id, done){
    try {
        const user = await User.findById(id);

        if (!user) {
            console.log('User not found');
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> Passport');
        return done(err);
    }
});

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not authenticated/sign-in
    return res.redirect('/user/sign-in');

}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}




module.exports = passport;