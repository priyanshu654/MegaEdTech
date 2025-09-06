const User=require("../modules/user");
const OTP=require("../modules/OTP");
const Profile=require("../modules/profile");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();


exports.sendOTP=async(req,res)=>{
    try {
        //email lo req.body se 
        const{email}=req.body;
        //check karo email exist karta hai ki nhi
        const existingUser=await User.findOne({email:email});

        if(existingUser){
            return res.status(401)
            .send({
                success:false,
                message:"Email is already resistered with us"
            })
        }
        //otp generate karo new har baar
        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            specialChars: false,
            lowerCaseAlphabets:false
        })

        console.log("otp generated",otp);

        //ab verify karo ki otp new hai ki nhi

        let response=await OTP.findOne({otp:otp});
        while(response){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                specialChars: false,
                lowerCaseAlphabets:false
            })
            response=await OTP.findOne({otp:otp});
        }
        //send kar do
        //khud se send ho jaaega document ban ne se phle q ki hmne rakha hua hai pre middleware save poar OTP module me
        const payload={email:email,otp:otp};
        const responseOTP =await OTP.create(payload);

        //return the response
        return res.status(200)
        .send({
            success:true,
            message:"OTP sent successfully"
        })
    } catch (error) {
        console.log("error occured while sending OTP",error);
        return res.status(500)
        .send({
            success:false,
            message:"Error occured while sending OTP"
        })
    }
}

//signup

exports.signUp=async(req,res)=>{
    try {
        const {fName,lName,email,password,confirmPassword,accountType,otp}=req.body;
        if(!fName || !lName || !email || !password || !confirmPassword || !otp){
            return res.status(401)
            .send({
                success:false,
                message:"Every fields are required"
            })
        }
        //check both password match or not
        if(password!=confirmPassword){
            return res.status(403)
            .send({
                success:false,
                message:"password and confirmPassword should be same"
            })
        }

        //check existing user
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(402)
            .send({
                success:false,
                message:"User already registered"
            })
        }

        //most recent otp nikalo
        const recentOTP=await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log("recent otp",recentOTP);

        //match both otp
        if(recentOTP.otp!=otp){
            return res.status(404)
            .send({
                success:false,
                message:"OTP didnt match retry"
            })
        }
        else if(!recentOTP){
            return res.status(405)
            .send({
                success:false,
                message:"OTP not found"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const profileDetails=await Profile.create({
            gender:null,
            bio:null,
            contactNumber:null,
            dob:null
        })

        const userPayload={
            fName,
            lName,
            email,
            password:hashedPassword,
            accountType,
            additionalInfo:profileDetails._id,
            profilePic: `https://api.dicebear.com/5.x/initials/svg?seed=${fName} ${lName}`
        }
        //if passing as objet UserPayload we need to unwrap userPayload other wise do it like otp payload User.create(userPayload);
        const registerResponse=await User.create({...userPayload});
        return res.status(200)
        .send({
            success:true,
            data:registerResponse,
            message:"Register successful"
        })
    } catch (error) {
        console.log("Error while registration",error);
        return res.status(500)
        .send({
            success:false,
            message:"error occured while registration"
        })
    }
}

exports.login=async(req,res)=>{
    try {
        //phle data lo
        const {email,password,accountType}=req.body;
        //validation lgao
        if(!email ||!password){
            return res.status(400)
            .send({
                success:false,
                message:"Every field is required,Fill all fields"
            })
        }
        //check karo ki exist krta hai ki nhi
        const userExistence=await User.findOne({email});
        if(!userExistence){
            return res.status(401)
            .send({
                success:false,
                message:"User doesnt exist"
            })
        }
        //password match krao
        const isMatched=await bcrypt.compare(password,userExistence.password);
        if(!isMatched){
            return res.status(403)
            .send({
                success:false,
                message:"Password didn't match"
            })
        }
        else{
            const payload={email:userExistence.email,
                accountType:userExistence.accountType,
                id:userExistence._id
            }
            //token bnao
            const token=await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});
            userExistence.token=token;
            userExistence.password=undefined;

            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            //cookies send karo
            res.cookie("loginCookie",token,options)
            .status(200)
            .send({
                success:true,
                message:"Login Successful",
                token:token,
                user:userExistence
            })
            
        }
        
        

        //logeed in 
        
    } catch (error) {
        console.log("error occured while login",error);
        return res.status(500)
        .send({
            success:false,
            message:"Error occured while login"
        })
    }
}

exports.changePassword=async(req,res)=>{
    try {
        //phle email or password new password laao
        console.log(req.body);
        
        const{email,password,newPassword}=req.body;
        //all field validation lgao
        if(!email || !password ||!newPassword){
            return res.status(400)
            .send({
                success:false,
                message:"All fields are required"
            })
        }
        //email check karo
        const user=await User.findOne({email});
        if(!user){
            return res.status(401)
            .send({
                success:false,
                message:"User doest exist",
            })
        }
        //old password match karo
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(402)
            .send({
                success:false,
                message:"Incorrect old password"
            })
        }
        else{
            const newHashedPassword=await bcrypt.hash(newPassword,10);
            const updateResponse=await User.findOneAndUpdate(user._id,{password:newHashedPassword},{new:true});

            res.status(200)
            .send({
                success:true,
                message:"Password changed successfully"
            })
        }
        //match ho jaae to new opassword ko hash karke change kar do.
    } catch (error) {
        console.log("Error while changing password",error);
        return res.status(500)
        .send({
            success:false,
            message:"Error while changing password"
        })
    }
}