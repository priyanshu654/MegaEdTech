const cloudinary = require("cloudinary").v2;

exports.uploadImage = async (file, folder, height, width) => {
  try {
    const options = { folder };

    if (height) {
      options.height = height;
    }
    if (width) {
      options.width = width;
    }
    options.resource_type = "auto";

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};
