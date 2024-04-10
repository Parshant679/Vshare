import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
const cloudinaryMethods = {
  uploadVideos: async (LocalFilePath) => {
    try {
      const response = await cloudinary.v2.uploader.upload(LocalFilePath, {
        resource_type: "video",
      });

      return response;
    } catch (error) {
      console.log(err);
    }
  },
  deleteVideo: async (public_id) => {
    try {
      const options = {
        invalidate: true,
      };
      const response = await cloudinary.v2.uploader.destroy(public_id, options);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = cloudinaryMethods;
