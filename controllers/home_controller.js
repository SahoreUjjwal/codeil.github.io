module.exports.home = function(req,res){ 
    return res.render('home',{
        title:'hello app'
    });
}

module.exports.login =function(req,res){
    return res.end('<h1>Hello this </h1>');
}