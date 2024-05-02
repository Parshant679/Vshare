const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dgypv5flo",
  api_key: "917975424867997",
  api_secret: "RgAxMkPh4gfmL2Vo1jm-k1CKGzs",
});

const cloudinaryMethods = {
  uploadVideos: async (LocalFilePath) => {
    try {
      console.log(LocalFilePath);
      const response = await cloudinary.uploader.upload(LocalFilePath, {
        resource_type: "video",
      });
      console.log("cloudinry responxe", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  deleteVideo: async (public_id) => {
    try {
      const options = {
        resource_type: "video",
        invalidate: true,
        type: "authenticated",
      };
      const response = await cloudinary.uploader.api.delete_resources(
        [public_id],
        { type: "upload", resource_type: "video" }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = cloudinaryMethods;
