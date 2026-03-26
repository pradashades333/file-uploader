const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const upload = require("../db/multer");

router.get("/sign-up", controller.signUpGet);
router.post("/sign-up", controller.signUpPost);
router.get("/log-in", controller.logInGet);
router.post("/log-in", controller.logInPost);
router.get("/log-out", controller.logOut);
router.post("/files", upload.single("file"), controller.uploadFile);


router.get("/", controller.index);
router.get("/folders/new", controller.newFolderGet);
router.post("/folders", controller.newFolderPost);
router.get("/folders/:id", controller.showFolder);
router.get("/folders/:id/edit", controller.editFolderGet);
router.post("/folders/:id/edit", controller.editFolderPost);
router.post("/folders/:id/delete", controller.deleteFolder);

router.get("/files/:id", controller.showFile);
router.post("/files", controller.uploadFile);
router.post("/files/:id/delete", controller.deleteFile);

module.exports = router;