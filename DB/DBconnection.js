
const mongoose= require('mongoose')

exports.DBconnection=()=>{

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{

    console.log("connected");

    
}).catch((err)=>{
    console.log("Failed to connected", err);
})
}



