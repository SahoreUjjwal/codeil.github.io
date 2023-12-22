const Post = require('../models/post');
const Comment =  require('../models/comments');
const Like = require('../models/like');

module.exports.toggleLikes =async function(req,res){
    try{
        let likeable;
        let deleted =false;

        if(req.query.type == 'Post')
        {
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user.id
        })
        console.log(existingLike);
        if(existingLike)
        {
            likeable.likes.pull(existingLike._id);
            likeable.save();

          const deletedLike =  await Like.deleteOne({
                likeable:req.query.id,
                onModel:req.query.type,
                user:req.user.id
            });
            //console.log(deleted);
            if(deletedLike){
                deleted = true;
            }
        }
        else{
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.status(200).json({
            message: "Request successful!",
            data:{
                deleted:deleted
            }
        })
        
    }
    catch(err){
        console.log(err);
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}