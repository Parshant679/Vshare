const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const userCtrl = require("../controllers/user.controller");

router.route("/login").post(userCtrl.login);
router.route("/logout").post(userCtrl.logout);
router.route("/register").post(userCtrl.register);
router.route("/getUser").get(auth, userCtrl.getUserdata);
router.route("/getConnections").get(auth, userCtrl.getConnectios);
router.route("/search").get(auth, userCtrl.searchUsers);
router.route("/sendRequest").post(auth, userCtrl.sendConnectionRequest);
router.route("/acceptRequest").put(auth, userCtrl.acceptConnectionRequest);
router.route("/cancelRequest").put(auth, userCtrl.cancelConnectionRequest);

module.exports = router;
