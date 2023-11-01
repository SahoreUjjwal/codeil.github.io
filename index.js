const express = require('express');


const app = express();
const port = 8000;

//require routes using middleware
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

