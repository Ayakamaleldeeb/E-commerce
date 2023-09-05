// const slugify =require("slugify");
// const AppError = require("../../function/apperr");
// const { catchAsyncError  } =require("../../function/catsherr");




// const  {Model}  = require("mongoose");
// // 







// exports.deleteone=(Model)=>{
//  return catchAsyncError(async (req, res, next) => {
//     const{ id }=req.params;
//     let document =await documentModel.findByIdAndDelete(id);
//     if(!document){

//      next(new AppError("not found", 400));}

//     res.status(200).json({result:document});
//     });
// } 