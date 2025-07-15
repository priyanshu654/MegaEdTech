const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  reviews: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
},{timestamps:true});

const RatingAndReviews = mongoose.model("RatingAndReviews", ratingSchema);
module.exports = RatingAndReviews;
