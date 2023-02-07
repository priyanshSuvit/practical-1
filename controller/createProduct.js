const { product } = require('../models/users');
const {user} = require('../models/users')
const multer = require('multer');
const path  = require('path');
const generateUniqueId = require('generate-unique-id');



let storage = multer.diskStorage({
    destination : function(req,file ,cb){
        cb(null,'./uploads');
    },
    filename : function(req ,file,cb) {
        filename = Date.now() + path.extname(file.originalname);
        cb(null , filename);
    }
});
const upload = multer({ storage : storage}).any('files');

exports.creatProduct = async (req,res) => {
    upload(req,res, async(err) => {
        let name =  req.body.userName;
        let result = await user.find( { userName : name}).exec();
        if(!(result[0].role === "admin" || result[0].role === 'vendor')){
         res.send("you are not authorized");
         return;
        }else{
            const id = generateUniqueId();
            let parentId = req.body.parentId;
            if(parentId === undefined) {
                parentId = "null";
            }
            let files = [];
            req.files.forEach(element => {
                files.push('http://localhost:3000/uploads/' + element.filename);
            });
            let request = {...req.body,id : id,parentId : parentId,userName : undefined ,images : files};
            const newProduct = new product(request);
            try {
                const response = await newProduct.save();
                 res.send(response);
            } catch(err) {
               res.send(err)
            }
            // res.send(req.files);
            return;  
        }
   
       })
 
}