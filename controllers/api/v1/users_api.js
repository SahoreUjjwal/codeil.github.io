const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
module.exports.createSession =async function(req, res){
    try{
        let user = await User.findOne({email:req.body.email})
        if(!user || user.password != req.body.password)
        {
            return res.json(422,{
                message:"Invalid username or password"
            });
        }
        return res.status(200).json(
            {
                message:"Sign in successful, her is your token",
                data:{
                    token:jwt.sign(user.toJSON(),'çodeial',{expiresIn:'1000000'})
                }
            }
        )
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}