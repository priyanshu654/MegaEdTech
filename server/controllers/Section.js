const Course = require("../modules/course");
const Section = require("../modules/section");

exports.createSection = async (req, res) => {
  try {
    //fetch data
    const { name, courseId } = req.body;
    //validate
    if (!name || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All properties are required",
      });
    }
    //create db entry
    const newSection = await Section.create({ name ,courseId});
    //course me v section ka entry daalna hoga
    const updatedCourse=await Course.findByIdAndUpdate(
      courseId ,
      {
        $push: {
          content: newSection._id,
        },
      },
      { new: true }
    ).populate({
      path:"content",
      populate:{
        path:"subSection"
      }
    }).exec();
    //response return
    return res.status(200).json({
      success: true,
      message: "Section created SuccessFully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating section",
      error: error.message,
    });
  }
};


exports.updateSection = async (req, res) => {
  try {
    const { name, sectionId, courseId } = req.body;

    // ✅ Validate required fields
    if (!name || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, sectionId, courseId) are required",
      });
    }

    // ✅ Update the section name
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { name },
      { new: true }
    );

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // ✅ Fetch the updated course with populated sections and sub-sections
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "content",
        populate: {
          path: "subSection",
        },
      });

    // ✅ Return updated course
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error while updating section:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating section",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {

    //const{sectionId}=req.query;
    const{sectionId}=req.body;
    console.log("section id ",sectionId);
    
    if(!sectionId){
        return res.status(400).json({
        success: false,
        message: "All properties are required",
      });
    }

    const section=await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    await Section.findByIdAndDelete(sectionId);

    const newCourse=await Course.findByIdAndUpdate(
        section.courseId,
        {
            $pull:{
                content:sectionId
            }
        }
    ).populate({
      path:"content",
      populate:{
        path:"subSection"
      }
    }).exec()

    return res.status(200)
    .json({
        success:true,
        message:"particular section deleted successFully",
        data:newCourse
    })



  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting section",
      error: error.message,
    });
  }
};

