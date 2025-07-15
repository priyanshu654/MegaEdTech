require("dotenv").config();
const Section = require("../modules/section");
const SubSection = require("../modules/subSection");
const { uploadImage } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
  try {
    //fetch data
    //section id le lenge frontend se jb button par click hoga
    //timeDuration changed by myself....   usko hta deaa tha khud se agr glti hui to change kar dunga
    const { title, description, sectionId } = req.body;
    //extract video file
    const video = req.files.video;

    //validation
    if (!title  || !description || !sectionId || !video) {
      return res.status(400).json({
        success: false,
        message: "All properties are required",
      });
    }

    const videoUrl = await uploadImage(video, process.env.FOLDER_NAME);
    console.log("video url hai",videoUrl);
    

    const payload = {
      title,
      description,
      timeDuration:videoUrl.duration,
      videoUrl: videoUrl.secure_url,
      sectionId,
    };

    const newSubSection = await SubSection.create(payload);


    const updatedSubSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: newSubSection._id,
        },
      },
      { new: true }
    );

    //hw log populated query

    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      data: newSubSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while creating subSection",
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description, timeDuration } = req.body;
    const video = req.files.videoFile;

    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(400).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title) subSection.title = title;
    if (description) subSection.description = description;
    if (timeDuration) subSection.timeDuration = timeDuration;

    if (video) {
      const videoUrl = await uploadImage(video, process.env.FOLDER_NAME);
      subSection.videoUrl = videoUrl.secure_url;
    }

    await subSection.save();

    return res.status(200).json({
      success: true,
      message: "SubSection updated seccessfully",
      data: subSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating subSection",
      error: error.message,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.body;

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection id not found",
      });
    }

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(401).json({
        success: false,
        message: "SubSection not found to delete",
      });
    }

    await SubSection.findByIdAndDelete(subSectionId);

    const updatedSubSection = await Section.findByIdAndUpdate(
      subSection.sectionId,
      {
        $pull: {
          subSection: subSection._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "subSection deleted successfully",
      data:updatedSubSection
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting SubSection",
      error: error.message,
    });
  }
};
