const Comment =  require('../models/comments');
const Post =  require('../models/post');

module.exports.createComment =async function(req,res){
    try{
        
        const post = await Post.findById(req.body.postId);
        
        if(post)
        {   
            const comment = await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.postId
    
            })
            if(comment)
            {
                console.log('comment added');
                post.comments.push(comment);
                post.save();
                console.log('post updates');
                res.redirect('/');
            }
        }
        
        
    }
    catch(err){
        console.log("Error creating comment : ",err);
    }
}