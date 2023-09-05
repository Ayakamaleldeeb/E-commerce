
const { protectedRoutes,allowedTo } = require("../user/user_auth");
const{ createProduct, deleteProduct, getProduct, updateProduct, getProducts } = require("./product_service");
const  router =require("express").Router();

router.route("/").post(allowedTo("user"),createProduct).get(getProducts);
router
.route("/:id")
.get(getProduct)
.put(protectedRoutes,allowedTo("admin"),
    updateProduct)
.delete(protectedRoutes,allowedTo("admin"),
    deleteProduct);


module.exports=router;