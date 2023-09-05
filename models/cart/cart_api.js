const { protectedRoutes, allowedTo } = require("../user/user_auth");
const { addproducttocart, updatequantity,removefromcart } = require("./cart_service");
const { updateProduct } = require("../product/product_service");
const  router =require("express").Router();


router.use(protectedRoutes, allowedTo("user"));




router.route('/').post(addproducttocart).delete(removefromcart).put(updatequantity)



module.exports=router;