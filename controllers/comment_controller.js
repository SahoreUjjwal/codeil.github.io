const Comment =  require('../models/comments');
const Post =  require('../models/post');
const commentsMailer = require('../mailer/comments_mailer')
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_workers');


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
                console.log('here comment created');
                //commentsMailer.newComment(comment);
              //  let job = queue.create('emails',comment).save(function(err){
                 //   if(err){
                 //       console.log("Error in sending to email queue", err);
                  //  }
                  //  console.log('Job enqueued' , job.id);
               // });
                if(req.xhr)
                {
                  return res.status(200).json({
                      data:{
                          comment:comment,
                          message:"comment created"
                      }})
                }
              

               
                
               // console.log('post updates');
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
                await Post.findByIdAndUpdate(comment.post,{$pull:{comments:req.params.commentId}});
                if(req.xhr)
                {
                  return res.status(200).json({
                      data:{
                          comment:req.params.id,
                          message:"comment deleted"
                      }})
                }
            }
            return res.redirect('back');
        } 
    }
    catch(err){
        console.log('Error deleting a comment : ', err);
        return res.redirect('back');
    }
   
}