const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.isAuth=async(req,res,next)=>{
    try {
        //extract token
        const token=req.cookies.loginCookie || req.body.token || req.header("Authorization").replace("Bearer ","");
        //validate token
        if(!token){
            return res.status(400)
            .send({
                success:false,
                message:"Token is required"
            })
        }
        //decode token
        try {
            const decodedToken=await jwt.verify(token,process.env.JWT_SECRET);
            console.log("decoded  token",decodedToken);
            //here we are asigning req.user with decoded token not like we are inserting another object of decodedtoken in req.user 
            //so we dont need to do req.user.decodedToken.accountType while accessing....
            req.user=decodedToken;
        } catch (error) {
            return res.status(401)
            .send({
                success:false,
                message:"token is invalid"
            })
        }
        next();
        
    } catch (error) {
        console.log("Authorization Error",error);
        return res.status(500)
        .send({
            success:false,
            message:"Authorization Error"
        })
        
    }
}

exports.isStudent=async(req,res,next)=>{
    try {
        //account type lo
        if(req.user.accountType!="Student"){
            return res.status(400)
            .send({
                success:false,
                message:"This path is reserved for students"
            })
        }
        next();
    } catch (error) {
        console.log("Error while validating student path",error);
        return res.status(500)
        .send({
            success:false,
            message:"Error while validating student path"
        })
    }
}

exports.isAdmin=async(req,res,next)=>{
    try {
        //account type lo
        if(req.user.accountType!="Admin"){
            return res.status(400)
            .send({
                success:false,
                message:"This path is reserved for Admin"
            })
        }
        next();
    } catch (error) {
        console.log("Error while validating Admin path",error);
        return res.status(500)
        .send({
            success:false,
            message:"Error while validating Admin path"
        })
    }
}

exports.isInstructor=async(req,res,next)=>{
    try {
        //account type lo
        if(req.user.accountType!="Instructor"){
            return res.status(400)
            .send({
                success:false,
                message:"This path is reserved for Instructor"
            })
        }
        next();
    } catch (error) {
        console.log("Error while validating Instructor path",error);
        return res.status(500)
        .send({
            success:false,
            message:"Error while validating Instructor path"
        })
    }
}