const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { upload } = require("../middleware/multer.middleware");
const videoCtrl = require("../controllers/video.controller");

router
  .route("/uploadVideo")
  .post(auth, upload.single("video"), videoCtrl.uploadVideo);

router.route("/getVideos").get(auth, videoCtrl.getVideos);

router.route("/deleteVideo").delete(auth, videoCtrl.deleteVideo);

router.route("/assignEditor").put(auth, videoCtrl.assignEditor);

module.exports = router;
