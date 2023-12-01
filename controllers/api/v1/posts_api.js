const Post = require('../../../models/post');
const Comment = require('../../../models/comments');

module.exports.index = async  function(req,res)
{
    try{
        const posts =await Post.find({})
        .sort("-createdAt")
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        return res.json(200,{
            message:'List of posts',
            posts:posts
        })
    }
    catch(err){
        return res.message(err);
    }
    
}


module.exports.destroy =async function(req,res){
    try{
        const post = await Post.findById(req.params.id);
        
        //mongoose gives us automatic conversion of underscoreid to a string if we use .id directly as done below
        if(post && post.user == req.user.id)
        {
          const deleted = await Post.deleteOne({_id:req.params.id});
          console.log('deleted',deleted);
          if(deleted)
          {
            const comment = await Comment.deleteMany({post : req.params.id});
          }
          
        return res.status(200).json({
                message:"Post deleted"
            })
        } 
        else{
            return res.status(401).json({
                message:"Unauthorized, only the author can delete the post"
            })
        }
        
    }
    catch(err){
        console.log('error',err);
        return res.json(500,{
            message:"Internal server error check logs"
        });
    }
    
}
