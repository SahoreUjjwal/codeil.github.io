const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const sassmiddleware = require('node-sass-middleware');
app.use(sassmiddleware(
    {
        src:'./assets/scss',//path to pick scss file
        dest:'./assets/css',//path to write the css file
        debug:true,
        outputStyle:'extended',//expanded vss or compact css(compact will create cssin one line, not much readable)
        prefix:'/css'//where should my server look out for css file
    }
))
// used for session cookie
const session = require('express-session');

const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({  
       mongoUrl:'mongodb://127.0.0.1:27017/codeil_development' 
    },
    function(err){
        console.log(err || 'Connected to mongo-store');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticated);
// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
