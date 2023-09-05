const ProductModel = require("./cart_model");
const AppError = require("../../function/apperr");
const { catchAsyncError  } =require("../../function/catsherr");
const cart_model = require("./cart_model");


exports.addproducttocart = catchAsyncError(async(req, res)=>{

let cart =await CartModel.findOne({user:req.user._id})


if(!cart){
    let newCart=new CartModel({
        cartItems:[req.body],
        user:req.user._id
    })
    await newCart.save()
    res.status(200).json( {mesg :" cart created",newCart});

}else{
 let findproduct= cart.cartItems.find(elm).elm.product==req.body.product
if(findproduct){
    findproduct.quantity +=1
}else{
    cart.cartItems.push(req.body)
}
await cart.save()
res.status(200).json(cart)

}


    });



    exports.removefromcart=catchAsyncError(async(req,res,next)=>{
        let {cartItems}=await CartModel.findOneAndUpdate({user:req.user._id},{
            $pull:{cartItems:{_id:req.body.cartId}}
        },{new:true});
        !cartItems && next(new AppError("item not found",404));
        cartItems && res.status(200).json(cartItems);
        });

exports.updatequantity=catchAsyncError(async(req,res,next)=>{
    let cart =await CartModel.findOne({user:req.user._id})
    let findproduct=cart.cartItems.find((elm)=>elm.product==req.body.product)
    if(!findproduct) return next(new AppError("product not found",404))
    if(findproduct){
        findproduct.quantity=req.body.quantity
    }
    await cart.save()
    res.status(200).json(cart);

});


