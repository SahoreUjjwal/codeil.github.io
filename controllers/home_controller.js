const Post = require('../models/post');
const User = require('../models/user');
module.exports.home =async function(req, res){
    
    try{
        
        const posts =await Post.find({}).populate('user').exec();
        
        return res.render('home', {
            title: "Home",
            posts:posts
        });
       
    }
    catch(err){
        console.log("Error fetching entries form Post collection: ",err);
        return res.redirect('back');
    }
    
    
}

// module.exports.actionName = function(req, res){}