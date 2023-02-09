const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique : true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'vendor'],
    required: true
  }
});

const catagorySchema = new Schema({
  id: {
    type: String,
    required: true
  },
  parentId: {
    type: String,
    required: true,
  },
  catagoryName: {
    type: String,
    required: true
  }
});
const productSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  catagoryId: {
    type: String,
    required: true
  },
  parentId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  images : {
    type : [ {type : String}]
  },
  price : {
    type :String,
    required : true
  }
});
const cartSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
  },
  cartList : {
    type :  [{  id : {type : String}, quentity : { type : Number} }]
  }
});
module.exports.user = mongoose.model("user", UserSchema);
module.exports.catagory = mongoose.model("catagory", catagorySchema);
module.exports.product = mongoose.model("product", productSchema);
module.exports.cart = mongoose.model("cart",cartSchema)