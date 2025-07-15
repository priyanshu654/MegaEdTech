const mongoose=require("mongoose");

const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection"
    }
  ],
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  }
});

const Section=mongoose.model("Section",sectionSchema);

module.exports=Section;