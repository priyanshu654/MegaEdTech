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
    await Course.findByIdAndUpdate(
      courseId ,
      {
        $push: {
          content: newSection._id,
        },
      },
      { new: true }
    );
    //response return
    return res.status(200).json({
      success: true,
      message: "Section created SuccessFully",
      data: newSection,
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
    //fetch detail
    const { name, sectionId } = req.body;
    //validate
    if (!name || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All properties are required",
      });
    }
    //update
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId ,
      { name },
      { new: true }
    );
    //course me section update nhi karna padega q ki wha to id store hai or update karne k baad v id same hoga
    //return response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
    });
  } catch (error) {
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
    const{sectionId}=req.params;
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

    await Course.findByIdAndUpdate(
        section.courseId,
        {
            $pull:{
                content:sectionId
            }
        }
    )

    return res.status(200)
    .json({
        success:true,
        message:"particular section deleted successFully"
    })



  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting section",
      error: error.message,
    });
  }
};
