const User=require("../modules/user");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");

exports.resetPasswordToken=async (req,res)=>{
    try {
        //phle email lo
        const {email}=req.body;
        ///ail validation
        if(!email){
            return res.status(400)
            .send({
                success:false,
                message:"Email is required to reset password"
            })
        }
        //check user with that email
        const user=await User.findOne({email});
        if(!user){
            return res.status(401)
            .send({
                success:false,
                message:"User is not registered with us"
            })
        }
        //token generate karenge
        const token=crypto.randomUUID();
        //update user by adding token and expiry time
        const updateUser=await User.findOneAndUpdate({email},{token:token,resetPasswordExpires:Date.now()+5*60*1000},{new:true});
        //create url
        const url=`http//localhost:3000/update-password/${token}`;
        //send email containg url
        await mailSender(email,`Reset password link ${url}`,"Reset password link");
        //return response
        return res.status(200)
        .send({
            success:true,
            message:"Email sent successFully",
            token:token
        })
    } catch (error) {
        console.log("Error while sending reset password mail",error);
        return res.status(500)
        .send(
            {
                success:false,
                message:"Error while sending reset password mail"
            }
        )
    }
}

exports.resetPassword=async(req,res)=>{
    try {
        //data fetch
        //How token present in req.body-> frontend provide that 
        const{password,confirmPassword,token}=req.body;
        //validate data
        if(!password || !confirmPassword || !token){
            return res.status(400)
            .send({
                success:false,
                message:"All fields are required"
            })
        }
        //check both password match or not
        if(password!=confirmPassword){
            return res.status(401).
            send({
                success:false,
                message:"password and confirmPassword are not same"
            })
        }
        //find user through token
        const user=await User.findOne({token});
        if(!user){
            return res.status(402)
            .send({
                success:false,
                message:"Invalid token, user not found"
            })
        }
        //check token valid time
        if(user.resetPasswordExpires<Date.now()){
            return res.status(403)
            .send({
                success:false,
                message:"Reset link expired, try sending other"
            })
        }
        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //insert into Db 
        await User.findOneAndUpdate({token},{password:hashedPassword},{new:true});
        //return response

        return res.status(200)
        .send({
            success:true,
            message:"Reset password successful"
        })
    } catch (error) {
        console.log("Error while reset password",error);
        return res.status(500)
        .send({
            success:false,
            message:"Error while reset password"
        })
        
    }

}