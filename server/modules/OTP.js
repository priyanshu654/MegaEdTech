const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    ctreatedAt:{
        type:Date,
        default:Date.now,
        expires:300
    }
})

const sendMail=async(email,otp)=>{
    try {
        const mailResponse=await mailSender(email,otp,"Email verification Code");
        console.log("Otp verification Code sent Successfullt",mailResponse);
        
    } catch (error) {
        console.log(error);
    }
}

OTPSchema.pre("save",async function(next){
    await sendMail(this.email,this.otp);
    next();
})


const OTP=mongoose.model("OTP",OTPSchema);

module.exports=OTP;