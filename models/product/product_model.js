const{Schema, model, Types}=require("mongoose");

const schema = Schema({
name:{
    type:String,
    required:[true,"product name required"],
    trim:true,
    // unique:[true,"product name unique"],
    minlength:[3, "to short product name"],
},
slug:{
    type:String,
    lowercase:true,
},
description:{
    type:String,
    required:[true,"product description required"],
    trim:true,
    minlength:[10, "to short product description"],
},
quantity:{
    type:Number,
    required:[true,"product quantity required"],
    default:0,
},

colors:{
    type:String,
},

price:{
    type:Number,
    required:[true,"product price required"],
    default:0,
},


countproduct:{
    type:Number,
    default:0,
},

},{timestamps:true});





module.exports=model("product", schema);







