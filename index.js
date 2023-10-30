const express = require('express');

const app = express();
const port = 8000;

app.listen(port,function(error){
    if(error){
        console.log('Error starting the express application');
    }
    console.log(`Express app started at port: ${port}`);
})

