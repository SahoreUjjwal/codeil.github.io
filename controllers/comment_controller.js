const Comment =  require('../models/comments');
const Post =  require('../models/post');
const commentsMailer = require('../mailer/comments_mailer')
module.exports.createComment =async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        //console.log('hi',req.body.post);
        if(post)
        {   
            post = await post.populate('user');
            let comment = await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.postId
            })
         
            
            if(comment)
            {
                comment = await comment.populate('user',  'name email');
                //console.log(post);
                post.comments.push(comment);
                post.save();
                commentsMailer.newComment(comment);
                
                
               // console.log('post updates');
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