const { DBconnection } =require("./DB/DBconnection");
const express = require('express');
const app = express();
require('dotenv').config({path:"./config/.env"});
const port = process.env.PORT ||4000;
var morgan=require('morgan');
 const AppError = require("./function/apperr");
const globalMidlewareERR = require("./function/globalMiddlewareErr");
//middleware
app.use(express.json());
 if(process.env.MODE_ENV==="development"){
    app.use(morgan('dev'))
 }
 
app.use("/product", require("./models/product/product_api.js"));
app.use("/user", require("./models/user/user_api"));
app.use("/cart", require("./models/cart/cart_api"));


///handle request
app.all("*",(req,res,next)=>{
next(
    new AppError(`can not find this: ${req.originalUrl} on server`,404)
);
});


//global error handling midlware//

app.use(globalMidlewareERR);


DBconnection();

app.listen(port, () => console.log(`Server is running.. on port ${port}!`))








