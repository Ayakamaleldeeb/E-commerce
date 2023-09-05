
const { signup,signin ,protectedRoutes, allowedTo} = require("./user_auth");
const{ createUser, deleteUser, getUser, updateUser, getUsers } = require("./user_service");
const  router =require("express").Router();

router.route("/").post(protectedRoutes,allowedTo("admin"),createUser).get(protectedRoutes,allowedTo("admin"),getUsers);
router
.route("/:id")
.get(protectedRoutes,allowedTo("admin"),getUser)
.put(protectedRoutes,allowedTo("admin"),updateUser)
.delete(protectedRoutes,allowedTo("admin"),deleteUser);
router.post('/signup',signup)
router.post('/signin',signin)
// router.patch('/changePassword/:id',changePassword);




module.exports=router;

