module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
  
    if(process.env.MODE_ENV==='development'){
      devMode(err,res)
    }else{
      prodMode(err,res)
    }
  };
  
  
  let devMode=(err,res)=>{
      res
      .status(err.statusCode)
      .json({ status: err.statusCode, msg: err.message, err, stack: err.stack });
  }
  
  
  
  let prodMode=(err,res)=>{
      res
      .status(err.statusCode)
      .json({ status: err.statusCode, msg: err.message, });
  }