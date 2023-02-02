const { product } = require('../models/users');
const generateUniqueId = require('generate-unique-id');

exports.creatProduct = async (req,res) => {
    const id = generateUniqueId();
    let parentId = req.body.parentId;
    if(parentId === undefined) {
        parentId = "null";
    }
    let request = {...req.body,id : id,parentId : parentId,userName : undefined};
    const newProduct = new product(request);
    try {
        const response = await newProduct.save();
         res.send(response);
    } catch(err) {
       res.send(err)
    }
}