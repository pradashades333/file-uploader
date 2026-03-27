const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const upload = require("../db/multer");

function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/log-in");
}

router.get("/sign-up", controller.signUpGet);
router.post("/sign-up", controller.signUpPost);
router.get("/log-in", controller.logInGet);
router.post("/log-in", controller.logInPost);
router.get("/log-out", controller.logOut);
router.post("/files", ensureAuth, upload.single("file"), controller.uploadFile);


router.get("/", ensureAuth, controller.index);
router.get("/folders/new", ensureAuth, controller.newFolderGet);
router.post("/folders", ensureAuth, controller.newFolderPost);
router.get("/folders/:id", ensureAuth, controller.showFolder);
router.get("/folders/:id/edit", ensureAuth, controller.editFolderGet);
router.post("/folders/:id/edit", ensureAuth, controller.editFolderPost);
router.post("/folders/:id/delete", ensureAuth, controller.deleteFolder);

router.get("/files/:id", ensureAuth, controller.showFile);
router.post("/files/:id/delete", ensureAuth, controller.deleteFile);

module.exports = router;

