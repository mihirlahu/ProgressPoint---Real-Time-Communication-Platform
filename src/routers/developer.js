const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth').developerAuth
const developerControllers = require("../controllers/developer.controller");

router.post("/register/developer", developerControllers.Register);
router.post("/login/developer", developerControllers.Login);
router.get("/developer/home", auth, developerControllers.showHomePage);
router.get("/developer/loadHome", auth, developerControllers.loadHome);
router.post(
  "/developer/teamRoom/uploadDocument",
  auth,
  developerControllers.Upload.single("fileUpload"),
  developerControllers.UploadDocument
);
router.get(
  "/developer/classRoom/getDocument",
  auth,
  developerControllers.getDocument
);
router.get("/loadSearch", auth, developerControllers.loadSearch);
router.get("/developer/loadSearch", auth, developerControllers.loadTeamDetails);
router.post("/developer/loadSearch", auth, developerControllers.loadTeamRoom);
router.post("/search", auth, developerControllers.searchClassRoom);
router.get("/developer/profile", auth, developerControllers.Profile);
router.get("/developer/logout", auth, developerControllers.Logout);
router.patch('/developer/profile/update', auth, developerControllers.UpdateProfile);

module.exports = router;
