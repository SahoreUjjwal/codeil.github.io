const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose.js');
//extract styles & scripts used to extract custom scripts/styles from partial views into layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//require routes using middleware
app.use(expressLayouts);

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(express.urlencoded());

app.use('/',require('./routes'));

app.use('/user',require('./routes/user'));

app.use('/wall',require('./routes/posts'));

app.set('view engine','ejs');

app.set('views','./views');

app.listen(port,function(error){
    if(error){
        console.log('Error starting the express application');
    }
    console.log(`Express app started at port: ${port}`);
})

