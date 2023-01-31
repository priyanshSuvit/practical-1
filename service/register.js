const { user } = require('../models/users');

 async function register(req,res)  {
     try {
     let result = await user.find( { userName : req.userName}).exec();
                if(result.length != 0){
                    let temp = {
                        userName : result[0].userName,
                        email : result[0].email,
                        password : result[0].password,
                        role : result[0].role
                    }
                    return {
                        _isError : true,
                        error : "user already exist",
                        result : {...temp}
                    }
                }
                const newUser = new user(req);
                try {
                    const response = await newUser.save();
                    console.log("hello1");
                     return {
                        _isError : false,
                        response : response
                    };
                } catch(err) {
                    return {
                        _isError : true,
                        error : err
                    }
                }
            
    
     }catch(err){
        return {
            _isError : true,
            err : err
        }
     }
}
module.exports = { register };