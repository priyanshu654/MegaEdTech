const cloudinary=require("cloudinary").v2;
require("dotenv").config();

const cloudinaryConnect=async()=>{
    try {

         cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })

        console.log("Cloudinary connected successfull");
        
        
    } catch (error) {
        console.error(error);
        console.log("Error while cloudinary connection");
    }
}

module.exports=cloudinaryConnect;