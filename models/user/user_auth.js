const UserModel = require("./user_model");
const AppError = require("../../function/apperr");
const { catchAsyncError  } =require("../../function/catsherr");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');
// const { includes } = require("lodash");
///npm i sonwebtoken

//for user
exports.signup = catchAsyncError(async(req, res,next)=>{
    let isUser=await UserModel.findOne({email:req.body.email});
    if(isUser) return next(new AppError("user already exist",401));
let User = new UserModel(req.body);
await User.save();
res.status(200).json(User); 
});



exports.signin = catchAsyncError(async(req, res,next)=>{
    let user=await UserModel.findOne({email: req.body.email});
    if(!user || (await bcrypt.compare(req.body.password, user.password)))
     return next(new AppError("incorrect email or password", 401));

     let token=jwt.sign(
    {name: user.name, userId: user._id},
    process.env.JWT_KEY
    );
    
//token
res.status(200).json({ token }); 
});
 

exports.protectedRoutes=catchAsyncError(async(req,res, next)=>{

let token =req.headers.token
if(!token) return next(new AppError("token not provided",401));

let decoded=await jwt.verify(token,process.env.JWT_KEY)
// console.log(decoded);
let user =await UserModel.findById(decoded.userId)
if(!user) return next(new AppError("user not found",401))
 
// let changePassword=parseInt(user.passwordChangeAt.getTime()/1000);
// if(changePassword>decoded.iat)
// return next(new AppError("pass changed"),401);
// req.user=user;
// next()

});


exports.allowedTo=(...roles)=> {
    return catchAsyncError(async (req,res,next)=>{
        if(!roles.includes(req.user.role))
        return next(new AppError("YOU are not authorized to acces this route",401));
   next()
    }
        ) 
};  