const express = require("express");
const router = express.Router();
const controller = require("../controllers/artistController");

// BUG FIX: import artistUpload, not the art uploader
const { artistUpload } = require("../middleware/upload");

// Upload config — two optional fields
const uploadFields = artistUpload.fields([
  { name: "photo",   maxCount: 1 },
  { name: "cv_file", maxCount: 1 },
]);

router.get("/",     controller.getArtists);
router.get("/:id",  controller.getArtistById);
router.post("/",    uploadFields, controller.createArtist);
router.put("/:id",  uploadFields, controller.updateArtist);
router.delete("/:id", controller.deleteArtist);

module.exports = router;