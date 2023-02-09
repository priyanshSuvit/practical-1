const { cart } = require('../models/users');
const generateUniqueId = require('generate-unique-id');
// const   service  = require('../service/register');
// const mailer = require('../service/mailer');
exports.addToCart = async (req,res) => {
     let request = req.body;
     let userId = req.body.userId;
     let cartList = req.body.cartList;
     let  result = await cart.find( { userId : userId}).exec();

     if(result.length != 0){
      let request = result[0];
      let cur = request.cartList;
      cur = cartList.concat(cur);
      const filter = { userId : userId };
      const updateDoc = {
        $set: {
          cartList : cur
        },
      };
      let x = await cart.updateOne(filter,updateDoc);
      res.send(x);
     }else {
        const id = generateUniqueId();
        request =  {...request,id : id};
        let newCart = new  cart(request);
        let x = await newCart.save();
        res.send(x);
     }
    //  const pipeline = [
    //     { $match: { userId : request.id } },
    //     {
    //         $lookup:
    //         {
    //           from: 'products',
    //           localField: 'cartList.id',
    //           foreignField: 'id',
    //           as: 'details'
    //         }
    //     }
       
    // ];
    // const aggCursor =  await cart.aggregate(pipeline);
    // let response = {
    //     data : aggCursor,
    //     count  : aggCursor.length
    // }
    // res.send(response);
        
    //  }
}
