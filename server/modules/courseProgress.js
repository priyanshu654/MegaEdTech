const mongoose=require("mongoose");

const progressSchema=new mongoose.Schema({
    courseId:{
        type:String,
        required:true
    },
    completedVideos:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
    }
})

const CourseProgress=mongoose.model("CourseProgress",progressSchema);

module.exports=CourseProgress;