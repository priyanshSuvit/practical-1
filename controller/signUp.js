// const { user } = require('../models/users');
const   service  = require('../service/register');
const mailer = require('../service/mailer');
exports.signUp = async (req,res) => {
     let request = req.body;
    let response = await  service.register(request,"one");
     if(response._isError || res.writeErrors){
        res.send(response.error);
     }else{
      let temp = response;
        try {
         // await mailer.mailerFunc(temp.email,temp.userName,temp.password);
         res.send(temp);
        }catch(err) {
            res.send(err);
        }
        
     }
}
