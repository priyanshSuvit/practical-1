const { user } = require('../models/users');
const   service  = require('../service/register');
const mailer = require('../service/mailer');
exports.signUp = async (req,res) => {
     let request = req.body;
    let response = await  service.register(request,res);
    //  res.send(response);
     if(response._isError){
        res.send(response.error);
     }else{
      let temp = response.response;
        try {
         await mailer.mailerFunc(temp.email,temp.userName,temp.password);
         res.send(response.response);
        }catch(err) {
            res.send(err);
        }
        
     }
}
