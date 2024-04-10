const mongoose = require("mongoose");

const editorSchema = new mongoose.Schema({
  type: Object,
  name: String,
});

const videoSchema = new mongoose.Schema(
  {
    owner_Id: {
      type: Object,
      require: true,
    },
    videoEditor_Id: {
      type: editorSchema,
      require: true,
      default: null,
    },
    title: {
      type: String,
      required: true,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    cloudStorageKey: {
      type: String,
      default: null,
    },
    status: {
      type: Number,
      require: true,
      default: -1,
    },
    public_id: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      required: true,
      default: null,
    },
    createdBy: {
      type: Object,
      required: true,
      default: null,
    },
    updatedBy: {
      type: Object,
      required: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Video", videoSchema);
