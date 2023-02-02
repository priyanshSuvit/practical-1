const { catagory } = require('../models/users');
const generateUniqueId = require('generate-unique-id');

exports.creatCat = async (req,res) => {
//    let id = req.body.id;
//    catagory
// .findOne({ id : id })
// .populate('parentId')
// .exec(function(err, person) {
//     if (err) {
//         res.send(err)
//     };
//     console.log(person);
//     res.send(person);
// });
 

    const id = generateUniqueId();
    let parentId = req.body.parentId;
    if(parentId === undefined) {
        parentId = "null";
    }
    let request = {...req.body,id : id,parentId : parentId,userName : undefined};

    const newCat = new catagory(request);
    try {
        const response = await newCat.save();
         res.send(response);
    } catch(err) {
       res.send(err)
    }
}
