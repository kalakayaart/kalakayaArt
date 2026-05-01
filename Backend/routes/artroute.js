const express = require("express");
const router = express.Router();

// BUG FIX: import artUpload specifically, not the default export
const { artUpload } = require("../middleware/upload");

const {
  getArts,
  getArtById,
  createArt,
  updateArt,
  deleteArt,
} = require("../controllers/artController");

router.get("/",      getArts);
router.get("/:id",   getArtById);
router.post("/",     artUpload.single("image"), createArt);
router.put("/:id",   artUpload.single("image"), updateArt);
router.delete("/:id", deleteArt);

module.exports = router;