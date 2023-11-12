const Post = require('../models/post');

module.exports.createPost =function(req,res){
    try{
        Post.create({
              content:req.body.content,
              user:req.user._id  
            }
        );
        return res.redirect('back');
    }
    catch(err){
        console.log("Error creating a post : ",err);
        return;
    }
}