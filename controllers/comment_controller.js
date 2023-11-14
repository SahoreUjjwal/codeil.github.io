const Comment =  require('../models/comments');
const Post =  require('../models/post');

module.exports.createComment =async function(req,res){
    try{
        const post = await Post.findById(req.body.postId);
        console.log('hi',req.body.postId);
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

module.exports.destroy = async function(req,res){
    try{
        const comment = await Comment.findById(req.params.commentId);
        if(comment && req.user.id == comment.user)
        {
            const deletedComment = await Comment.deleteOne({_id:req.params.commentId});
            if(deletedComment)
            {
            const modifiedPost  = await Post.findByIdAndUpdate(comment.post,{$pull:{comments:req.params.commentId}});
            }
            return res.redirect('back');
        } 
    }
    catch(err){
        console.log('Error deleting a comment : ', err);
        return res.redirect('back');
    }
   
}