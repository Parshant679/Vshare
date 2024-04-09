const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const userCtrl = require("../controllers/user.controller");

router.route("/login").post(userCtrl.login);
router.route("/register").post(userCtrl.register);
router.route("/getUser").get(auth, userCtrl.getUserdata);
router.route("/sendRequest").post(userCtrl.sendRequest);
router.route("/acceptRequest").put(userCtrl.acceptRequest);
router.route("/cancelRequest").put(userCtrl.cancelRequest);

module.exports = router;
