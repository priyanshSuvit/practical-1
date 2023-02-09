const express = require('express');
const app  = express();
const mongoose = require('mongoose');
const model = require('./models/users');

//pasing-body
const bodyparser = require('body-parser');

//parsing-config
app.use(bodyparser.json({limit : "50mb"}));

app.use(bodyparser.urlencoded({ limit : "50mb" , extended : false , parameterLimit : 50000}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//to supress warning
mongoose.set('strictQuery', true);

//imprting path
const path = require('path');

//mongoDb
let mongoDb = "mongodb+srv://priyanshgodhani:Priyansh%40suvit@cluster0.syvlswq.mongodb.net/?retryWrites=true&w=majority";

//routes 
const signUp = require('./routes/signUp');
const loginReq  = require('./routes/login');
const upload = require('./routes/upload');
const creatCat = require('./routes/creatCatagory');
const createProduct = require('./routes/createProduct');
const uploadFIles = require('./routes/uploadFiles');
const getProductList = require('./routes/getProductList');
const addToCart = require('./routes/addToCart');
const getCartList = require('./routes/getCartList');
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
app.use('/catagory',creatCat);
app.use('/product',createProduct);
app.use('/test',uploadFIles);
app.use('/getProduct',getProductList);
app.use('/addToCart',addToCart);
app.use('/getCartList',getCartList);
//port number
app.listen('3000');