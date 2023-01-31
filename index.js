const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const model = require('./models/users');

//imprting path
const path = require('path');

//pasing-body
const bodyparser = require('body-parser');

//mongoDb
let mongoDb = "mongodb+srv://priyanshgodhani:Priyansh%40suvit@cluster0.syvlswq.mongodb.net/?retryWrites=true&w=majority";

//routes 
const signUp = require('./routes/signUp');
const loginReq  = require('./routes/login');
const upload = require('./routes/upload');

//parsing-config
app.use(bodyparser.json({limit : "50mb"}));
// app.use(bodyparser.urlencoded({ limit : "50mb" , extended : false , parameterLimit : 50000}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
//connection  
let dbo;
mongoose.connect(mongoDb , async function(error,db){
    dbo = db;
    console.log("connection sucessFUlly")
    if(error){
        console.log("error:",error);
    }
});

//static-paths
app.use('/uploads', express.static('uploads'));

//landing API
app.get('/',async (req,res)=> {
    console.log("hello");
    res.send();
})

//routes
app.use('/signUp',signUp);
app.use('/login',loginReq);
app.use('/upload',upload);

//port number
app.listen('3000');