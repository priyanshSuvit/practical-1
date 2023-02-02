const { user } = require('../models/users');

module.exports.verifyRole = async (req,res,next) => {
    try{
        let name =  req.body.userName;
        let result = await user.find( { userName : name}).exec();
        if(!(result[0].role === "admin" || result[0].role === 'vendor')){
            return res.send("you are not authorized");
        }else{
            return next();
        }
    }catch(err){
        return res.send(err);
    }
    
    
};