const ProductModel = require("./product_model");
const slugify =require("slugify");
const AppError = require("../../function/apperr");
const { catchAsyncError  } =require("../../function/catsherr");

// add new product
exports.createProduct = catchAsyncError(async(req, res)=>{
req.body.slug= slugify(req.body.name)
let Product = new ProductModel(req.body);
await Product.save();
res.status(200).json(Product);

});



//to get all products
exports.getProducts=catchAsyncError(async(req, res)=>{
let Products =await ProductModel.find({});
res.status(200).json(Products);

});

//to get specific products
exports.getProduct=catchAsyncError(async(req,res,next)=>{
    
const {id}=req.params;
let Product =await ProductModel.findById(id);
!Product && next(new AppError("not found",400));
Product && res.status(200).json(Product);
});
// update product
exports.updateProduct=catchAsyncError(async(req, res, next)=>{
const{ id }=req.params;
if(req.body.name){
    req.body.slug= slugify(req.body.name);    
}
let Product =await ProductModel.findByIdAndUpdate(id, req.body, {
    new:true,
});
!Product && next(new AppError("not found",400));
Product && res.status(200).json(Product);

});

//delete

exports.deleteProduct=catchAsyncError(async (req, res, next) => {
    const{ id }=req.params;
    let Product =await ProductModel.findByIdAndDelete(id);
    !Product && next(new AppError("not found", 400));
    Product && res.status(200).json(Product);
    });
    



// exports.deleteProduct=factory.deleteOne(ProductModel)