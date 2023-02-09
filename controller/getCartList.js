const { cart } = require('../models/users');
exports.getCartList = async (req,res) => {
     let userId = req.body.userId;
     const pipeline = [
        { $match: { userId : userId } },
        {
            $lookup:
            {
              from: 'products',
              localField: 'cartList.id',
              foreignField: 'id',
              as: 'details'
            }
        }
       
    ];
    const aggCursor =  await cart.aggregate(pipeline);
    let response = {
        data : aggCursor,
        count  : aggCursor.length
    }
    res.send(response);
        
}
