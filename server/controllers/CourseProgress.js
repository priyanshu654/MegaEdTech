const mongoose = require("mongoose")
const Section = require("../modules/section")
const SubSection = require("../modules/subSection")
const CourseProgress = require("../modules/courseProgress")
const Course = require("../modules/course")

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body
  const userId = req.user.id

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subsectionId)
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" })
    }

    // Find or create the course progress document
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    })

    if (!courseProgress) {
      // Create a new course progress
      courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [subsectionId],
      })

      return res.status(200).json({
        success: true,
        message: "Course progress created and updated",
      })
    }

    // If course progress exists, check if the subsection is already completed
    if (courseProgress.completedVideos.includes(subsectionId)) {
      return res.status(400).json({ error: "Subsection already completed" })
    }

    // Add the subsection to completedVideos
    courseProgress.completedVideos.push(subsectionId)
    await courseProgress.save()

    return res.status(200).json({ message: "Course progress updated" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
