const UserModel = require("./user_model");
const AppError = require("../../function/apperr");
const { catchAsyncError  } =require("../../function/catsherr");

// add new User

//admin control
exports.createUser = catchAsyncError(async(req, res,next)=>{
    let isUser=await UserModel.findOne({email:req.body.email});
    if(isUser) return next(new AppError("user already exist",401));
let User = new UserModel(req.body);
User.save();
res.status(200).json(User); 
});



//to get all Users
exports.getUsers=catchAsyncError(async(req, res)=>{
let Users =await UserModel.find({});
res.status(200).json(Users);

});

//to get specific Users
exports.getUser=catchAsyncError(async(req,res,next)=>{
const {id}=req.params;
let User =await UserModel.findById(id);

!User && next(new AppError("not found",400));
User && res.status(200).json(User);

});
// update User
exports.updateUser=catchAsyncError(async(req, res, next)=>{
const{ id }=req.params;
let User =await UserModel.findByIdAndUpdate(id, req.body, {new:true});

!User && next(new AppError("not found",400));
User && res.status(200).json(User);

});

//delete

exports.deleteUser=catchAsyncError(async (req, res, next) => {
    const{ id }=req.params;
    let User =await UserModel.findByIdAndDelete(id);
    !User && next(new AppError("not found", 400));
    User && res.status(200).json(User);
    });
    


    // change pass for admin 
    // exports.changePassword = catchAsyncError(async (req, res, next) => {
    //     const { id } = req.params;
    //     req.body.changedPasswordAt = Date.now()
    //     let User = await UserModel.findByIdAndUpdate(
    //         id,
    //         req.body,
    //         { new: true }
    //     );
    
    //     !User && next(new AppError("User not found", 400));
    //     User && res.status(200).json(User);
    // });
    
// exports.deleteUser=factory.deleteOne(UserModel)