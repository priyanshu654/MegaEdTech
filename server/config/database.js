const mongoose=require("mongoose");
require("dotenv").config();

const dbConnect=async()=>{
    try {
        const response=await mongoose.connect(process.env.DB_URL);
        console.log("Database connection successful")
    } catch (error) {
        console.log("error while database connection",error);
    }
}

module.exports=dbConnect;