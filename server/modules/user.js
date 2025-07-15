const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    fName:{
        type:String,
        required:true,
        trim:true
    },
    lName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true
    },
    additionalInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    courseProgress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    },
    profilePic:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    }
})

const User=mongoose.model("User",userSchema);

module.exports=User;