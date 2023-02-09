const { user } = require('../models/users');
const multer = require('multer');
const path  = require('path');

//importing register service
const service = require('../service/register');
//importing mailer service
const mailer = require('../service/mailer');

//for xlsx to json
const xlsx = require('xlsx');
// const fs = require('fs');

//generate-password
const generator = require('generate-password');

//to contain filename
let filename;

//convert xlsx to json
function convertExcelFileToJsonUsingXlsx(path) {

    // Read the file using pathname
    const file = xlsx.readFile(path);
  
    // Grab the sheet info from the file
    const sheetNames = file.SheetNames;
    const totalSheets = sheetNames.length;
  
    // Variable to store our data
    let parsedData = [];
  
    // Loop through sheets
    for (let i = 0; i < totalSheets; i++) {
  
        // Convert to json using xlsx
        const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]],{defval : ""});

        // Add the sheet's json to our data array
        parsedData.push(...tempData);
    }

    return parsedData;
}

let storage = multer.diskStorage({
    destination : function(req,file ,cb){
        cb(null,'./uploads');
    },
    filename : function(req ,file,cb) {
        filename = Date.now() + path.extname(file.originalname);
        cb(null , filename);
    }
});

const upload = multer({ storage : storage}).single('file');

exports.uploadFIle = async (req,res) => {
     upload(req,res, async(err) => {
        let name = req.body.userName;
        let result = await user.find( { userName : name}).exec();
        if(!(result[0].role === "admin")){
            res.send("you are not authorized");
        }else{
            if(err) {
                res.status(400).send("something went wrong!");
            }else {
                let data = {
                    _isSuccessful : true,
                    filename : filename,
                    url : 'http://localhost:3000/uploads/' + filename
                }
    
              let tempData = convertExcelFileToJsonUsingXlsx('./uploads/'+data.filename);
              let userData = [];
              tempData.forEach( element => {
                let password = generator.generate({
                    length: 8,
                    numbers: true
                });
                let cur = {...element,password:password};
                userData.push(cur);
              });  
              let responseData = [];
              let errorData = [];

            try {
                let response  = await service.register(userData, "many");
             if(response._isError){
             let err = response.error;
             err.writeErrors.forEach( el => {
                let cur = { ...el.err.op , err :el.err.errmsg };
                errorData.push(cur)
            })
        for (let x of err.insertedDocs){
          let cur = {...x,err: ""};
                  try{
                      await mailer.mailerFunc(cur.email,cur.userName,cur.password);
                  }catch(err){
                      console.log(err);
                  }
                  responseData.push(cur);
        }
             }else{
                for (let x of response){
                    let cur = {...x,err: ""};
                            try{
                                await mailer.mailerFunc(cur.email,cur.userName,cur.password);
                            }catch(err){
                                console.log(err);
                            }
                            responseData.push(cur);
                  }
             }
            }catch (err) {
            res.send(err);
            return;
                }
              //convert json to xlsx
              if(errorData.length > 0){
                var newWB =  xlsx.utils.book_new();
              var newWS = xlsx.utils.json_to_sheet(errorData)
              xlsx.utils.book_append_sheet(newWB,newWS,"name")//workbook name as param
              xlsx.writeFile(newWB,"./Excel/" + Date.now() + ".xlsx")//file name as param
              }
              res.send(responseData);
            
        }
    }
     })
    }