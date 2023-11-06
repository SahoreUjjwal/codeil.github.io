const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose.js');
//to add session
const session = require('express-session');

const passport= require('passport');
const passportLocal = require('./config/passport-local-strategy');




//require routes using middleware
app.use(expressLayouts);

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(express.urlencoded());

//extract styles & scripts used to extract custom scripts/styles from partial views into layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//app.use('/user',require('./routes/user'));

app.use('/wall',require('./routes/posts'));

app.set('view engine','ejs');

app.set('views','./views');

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));
//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes'));

app.listen(port,function(error){
    if(error){
        console.log('Error starting the express application');
    }
    console.log(`Express app started at port: ${port}`);
})

