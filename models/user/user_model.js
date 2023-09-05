const{Schema, model, types}=require("mongoose");
const bcrypt=require("bcrypt");
const schema = Schema({
name:{
    type:String,
    required:[true,"user name required"],
    trim:true,
    // unique:[true,"user name unique"],
    minlength:[3, "to short user name"],
},
email:{
    type: String,
    required:[true, "email required"],
    unique:[true,"email already exists.please try choose another email"],
    trim:true,

},
phone:{
    type:String,
    required:[true, "phone number required"],
},
password:{
    type:String,
    required:[true, "password"],
    minlength:[10,"minlength is 10 characters"],
}, 
role:{
type:String,
enum:["admin", "user"], 
default:"user",
},
address:{
    type:String,
    required:[true,"address user required"],
    trim:true,
    minlength:[10, "short "],


},




},{timestamps:true});



//hash
schema.pre('save',async function(){
this.password= await bcrypt.hash(this.password,Number(process.env.ROUND))


})
schema.pre('findOneAndUpdate',async function(){
    
    
 // console.log(this);//this 
    this._password= await bcrypt.hash(
        this._update.password,Number(process.env.ROUND));
    
    
    })

module.exports=model("user", schema);







