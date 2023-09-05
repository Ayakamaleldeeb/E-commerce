const{Schema, model, types, Types}=require("mongoose");
;
const schema = Schema({
cartItems:[
{
product:{
    type:Types.ObjectId,
    ref:"product"
},
quantity:{
    type:Number,
    default:1
},
price:Number
}


],

usercart:{
    type:Types.ObjectId,
    ref:"user"
},

totalprice:Number


},{timestamps:true});



module.exports=model("cart", schema);







