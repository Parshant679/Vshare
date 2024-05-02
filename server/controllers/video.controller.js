// const mongoose = require("mongoose");
const Video = require("../models/video.model");
const cloudinaryMethods = require("../utils/cloudinary");
const { apiResponse } = require("../utils/ApiResponse");
const { apiError } = require("../utils/ApiError");

const videoCtrl = {
  uploadVideo: async (req, res) => {
    const { path, size } = req.file;
    const { title, description, cloud_id, owner_Id, updatedby_id, video_id } =
      req.body;
    const filters = { title: title };
    const options = { new: true, upsert: true };

    const update = {
      owner_Id: owner_Id,
      public_id: cloud_id,
      title: title,
      description: description,
      updated_by: updatedby_id,
      size: size,
    };

    // first time Upload
    if (cloud_id === "-1") {
      const { public_id, signature, url, secure_url } =
        await cloudinaryMethods.uploadVideos(path);

      update.public_id = public_id;
      update.imageUrl = secure_url;
    } else {
      // re - upload
      // const { public_id, signature, url, secure_url } =
      //   cloudinaryMethods.uploadVideo(videoData.path);
      // videoData.public_id = public_id;
      // videoData.signature = signature;
      // videoData.url = url;
      // videoData.secure_url = secure_url;
    }

    // Try to use Upsert Query || findOneAndUpdate option upsert: true

    const newVideo = await Video.findOneAndUpdate(filters, update, options);

    if (!newVideo) {
      throw new apiError(500, "some error occure while adding video data");
    }

    return res
      .status(201)
      .json(new apiResponse(200, "Video uploaded Successfully", newVideo));
  },
  getSignleVideoData: async (req, res) => {
    // get data for single video

    const { videoId } = req.query;

    const data = await Video.findById({ _id: videoId });

    if (!data) {
      throw new apiError(404, "video not found");
    }

    return res
      .status(201)
      .json(new apiResponse(200, "data retrived successfully", data));
  },
  getVideos: async (req, res) => {
    // get user videos

    const { userId, pageNo } = req.query;
    const skipCount = (pageNo - 1) * 10;
    const videos = await Video.aggregate([
      {
        $match: {
          $or: [{ owner_Id: userId }, { "videoEditor.editor_id": userId }],
        },
      },
      {
        $project: {
          owner_Id: 1,
          title: 1,
          status: 1,
          videoEditor: 1,
          public_id: 1,
          updatedAt: 1,
          imageUrl: 1,
        },
      },
      { $sort: { updatedAt: -1 } },
      { $skip: skipCount },
      { $limit: 10 },
    ]);

    return res
      .status(201)
      .json(new apiResponse(200, "Video retrived Successfully", videos));
  },
  updateVideoData: async (req, res) => {
    // for updating video data like description , status etc;

    const data = req.body;
    const updateOperation = {
      $set: {
        title: data.title,
        description: data.description,
        status: data.status,
        updatedAt: new Date(),
        updatedBy: data._id,
      },
    };

    const options = {
      new: true,
    };

    const updatedVideoData = await Video.updateOne(
      { _id: data._id },
      updateOperation,
      options
    );

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          "Video Data updated Successfully",
          updatedVideoData
        )
      );
  },
  deleteVideo: async (req, res) => {
    // delete video

    const { videoId, public_id } = req.query;
    console.log(req.query);
    const filters = {
      _id: videoId,
    };

    const cloudDelete = await cloudinaryMethods.deleteVideo(public_id);
    console.log("cloud delete", cloudDelete);
    const dbDelete = await Video.deleteOne(filters);

    console.log("db delete", dbDelete);

    if (!dbDelete || !cloudDelete) {
      throw new apiError(500, "Some Error Occure while deleting the video");
    }

    return res
      .status(204)
      .json(new apiError(200, "Video deleted Successfully", {}));
  },
  assignEditor: async (req, res) => {
    // assign editor to video

    const editorData = req.body;
    const videoData = await Video.findById({ _id: req.query.videoId });
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
    const updatedVideo = await Video.findOneAndUpdate(
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
