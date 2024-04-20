const mongoose = require("mongoose");
const Video = require("../models/video.model");
const cloudinaryMethods = require("../utils/cloudinary");
const { apiResponse } = require("../utils/ApiResponse");
const { apiError } = require("../utils/ApiError");
const videoModel = require("../models/video.model");

const videoCtrl = {
  uploadVideo: async (req, res) => {
    const fileMetadata = req.file;
    const videoData = { ...fileMetadata, ...req.body };

    console.log(fileMetadata);
    // const { public_id, signature ,url ,secure_url} = cloudinaryMethods.uploadVideo();
    const video = await Video.insertOne(videoData);
    if (!video) {
      // delete the file from cloudinary
      throw new apiError(500, "some error occure while adding video data");
    }

    return res
      .status(201)
      .json(new apiResponse(200, "Video uploaded Successfully", video));
  },

  getVideos: async (req, res) => {
    // write monmgo db aggregation query for fetching viodes metadata;
    // use pagination or rate limiting to retrive api response ,  set pagination to 10 but can also be custom
  },
  updateVideoData: async (req, res) => {
    // for updating video data like description , status ,
  },
  updateVideoContent: async (req, res) => {
    // we retrive public_id and signature from mongo db

    const video_id = req.params.id;
    const video = await Video.findById({ _id: video_id });
    if (!video) {
      throw new apiError(409, "Invalid video id");
    }

    // delete file on cloudinary
    // upload file on cloudinary
    // update the public_id and imageUrl
  },
  deleteVideo: async (req, res) => {
    constvideoIds = req.body;
    const filters = {
      _id: {
        $in: videoIds.map((item) => {
          return item.id === _id;
        }),
      },
    };

    const res = await Video.deleteMany(filters);
    const result = cloudinaryMethods.deleteVideo(videoIds.public_id);
    // delete file from database and cloudinary

    // editor does not have permission to delete the vidoe , only owner can do it.
  },
  assignEditor: async (req, res) => {
    // assign editor to video;
    const editorData = req.body;
    const videoData = await Video.findById({ _id: req.params.id });
    if (!videoData) {
      throw new apiError(401, "Invalid video Id");
    }
    const updateOperation = {
      $set: {
        videoEditor: editorData,
      },
    };

    const options = {
      new: true,
    };
    const updatedVideo = await Video.findOneandUpdate(
      { _id: req.params.id },
      updateOperation,
      options
    );

    if (!updatedVideo) {
      throw new apiError("500", "Some Error Occure while assigning the editor");
    }

    return res.statue(201).json(
      new apiResponse(200, "video updated successfully", {
        id: updatedVideo._id,
      })
    );
  },
};

module.exports = videoCtrl;
