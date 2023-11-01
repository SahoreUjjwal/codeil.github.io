module.exports.profile = function(req,res)
        {
            return res.end('<h1>Profiles</h1>');
        };



module.exports.name = function(req,res){
    return res.end('<h1>Name</h1>');
}