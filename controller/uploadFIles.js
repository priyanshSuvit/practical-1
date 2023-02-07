const multer = require('multer');
const path  = require('path');


let storage = multer.diskStorage({
    destination : function(req,file ,cb){
        cb(null,'./uploads');
    },
    filename : function(req ,file,cb) {
        filename = Date.now() + path.extname(file.originalname);
        cb(null , filename);
    }
});
const upload = multer({ storage : storage}).array('files');

exports.uploadFIles = async (req,res) => {
     upload(req,res, async(err) => {
      res.send(req.files);
     })
    }