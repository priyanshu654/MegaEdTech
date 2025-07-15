const express=require("express")
require("dotenv").config();

const app=express();

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payment");
const courseRoutes=require("./routes/Course");
const cookieParser=require('cookie-parser');
const cors=require("cors");
const fileUpload=require("express-fileupload");
const dbConnect=require("./config/database");
const cloudinaryConnect=require("./config/cloudinary");

const PORT=process.env.PORT ||4000
dbConnect();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//cloudinary connection
cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"your server is up and running"
    });
});

app.listen(PORT,()=>{
    console.log(`your app is running at port ${PORT}`);
    
})