const Category = require("../modules/category");
const Course = require("../modules/course");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(CategorysDetails);
    return res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

//show category
exports.showAllCategories = async (req, res) => {
  try {
    const allCategorys = await Category.find(
      {},
      { name: true, description: true }
    );
    res.status(200).json({
      success: true,
      data: allCategorys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//category detail page
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryName } = req.query;

    // Convert slug-like name to actual name if needed
    const formattedName = categoryName.split("-").join(" ").toLowerCase();

    // Find the category by name (case-insensitive)
    const selectedCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${formattedName}$`, "i") },
    })
      .populate({
        path: "courses",
        populate: {
          path: "ratingAndReviews",
        },
        populate: {
          path: "instructor",
        },
      })
      .exec();

    // Validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const categoryId = selectedCategory._id;

    // Get courses for different categories (excluding current)
    const differentCategories = await Course.find({
      category: { $ne: categoryId },
    })
      .populate("category")
      .populate("ratingAndReviews")
      .populate("instructor", "fName lName")
      .exec();

    //top selling courses of category

    const trending = await Course.find({ category: categoryId })
      .sort({ studentsEnrolled: -1 })
      .populate("instructor", "fName lName")
      .populate("ratingAndReviews")
      .exec();
    //console.log("trending coure", trending);

    // Get top 10 selling courses
    const topSellingCourse = await Course.find({})
      .sort({ studentsEnrolled: -1 })
      .limit(10)
      .populate("instructor", "fName lName")
      .populate("ratingAndReviews")
      .exec();

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
        topSellingCourse,
        trending
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
