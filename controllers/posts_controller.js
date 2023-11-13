const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.createPost =async function(req,res){
    try{
        await Post.create({
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


module.exports.destroy =async function(req,res){
    try{
        const post = await Post.findById(req.params.id);
        //console.log(post);
        //mongoose gives us automatic conversion of underscoreid to a string if we use .id directly as done below
        if(post.user == req.user.id)
        {
            
          const deleted = await Post.deleteOne({_id:req.params.id});
          //console.log('deleted',deleted);
          if(deleted)
          {
            const comment = await Comment.deleteMany({post : req.params.id});
          }
           
        }
        return res.redirect('back');
    }
    catch(err){
        console.log('Error deleting a post : ', err);
        return res.redirect('back');
    }
    
}
