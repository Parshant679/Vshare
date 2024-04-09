const mongoose = require("mongoose");
const Video = require("../models/video.model");

const videoCtrl = {
  uploadVideo: async (req, res) => {
    console.log(req);
    console.log(res);
    // use file upload function with insert data in key
    // take user id is required field and edito name also;
  },

  getVideos: async (req, res) => {
    // write monmgo db aggregation query for fetching viodes metadata;
    // use pagination or rate limiting to retrive api response ,  set pagination to 10 but can also be custom
  },
  updateVideo: async (req, res) => {
    // re write the file data  in mongodb and cloudinary
  },
  deleteVideo: async (req, res) => {
    // delete file from database and cloudinary
  },
  assignEditor: async (req, res) => {
    // assign editor to viode;
  },
};

module.exports = videoCtrl;
