const mongoose = require('mongoose');

const resetSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    token:{
        type:String,
        require:true
    },
    isValid:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
}
)

const ResetPassword =  mongoose.model('ResetPassword', resetSchema);

module.exports = ResetPassword;