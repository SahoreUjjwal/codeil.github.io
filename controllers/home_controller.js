const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req, res){
    
    try{
        const posts =await Post.find({})
        .sort("-createdAt")
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            },
        })
        .exec();
       // console.log("home posts",posts[0].comments);
       if(req.user)
       {
            const users = await User.findById(req.user._id)
            .populate('friends');
            return res.render('home', {
                title: "Home",
                posts:posts,
                all_friends:users.friends
            });
       }
        
        return res.render('home', {
            title: "Home",
            posts:posts,
            all_friends:[]
        });
    }
    catch(err){
        console.log("Error fetching entries form Post collection: ",err);
        return res.redirect('back');
    }
    
    
}

module.exports.getUsers = function(req,res){
    const users = await 
};

// module.exports.actionName = function(req, res){}