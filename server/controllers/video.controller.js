const mongoose = require("mongoose");
const Video = require("../models/video.model");
const cloudinaryMethods = require("../utils/cloudinary");

const videoCtrl = {
  uploadVideo: async (req, res) => {
    const fileMetadata = req.file;
    console.log(fileMetadata);
    // const { public_id, signature ,url ,secure_url} = cloudinaryMethods.uploadVideo();

    // update data in mongo db data base with file meta data ans result;
    res.status(200).send("reached upload video");
  },

  getVideos: async (req, res) => {
    // write monmgo db aggregation query for fetching viodes metadata;
    // use pagination or rate limiting to retrive api response ,  set pagination to 10 but can also be custom
  },
  updateVideo: async (req, res) => {
    // we retrive public_id and signature from mongo db
    // delete file on cloudinary
    // upload file on cloudinary
    // update the public_id and imageUrl
  },
  deleteVideo: async (req, res) => {
    const fileData = req.body;
    const result = cloudinaryMethods.deleteVideo(fileData.public_id);
    // delete file from database and cloudinary
  },
  assignEditor: async (req, res) => {
    // assign editor to video;
  },
};

module.exports = videoCtrl;
