const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ─── Ensure upload folders exist ───────────────────────────────────────────────

const UPLOAD_DIRS = {
  art:   "uploads/art",
  photo: "uploads/artists/photos",
  cv:    "uploads/artists/cvs",
};

Object.values(UPLOAD_DIRS).forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ─── Shared filename generator ─────────────────────────────────────────────────

const uniqueFilename = (file) => {
  const ext = path.extname(file.originalname).toLowerCase();
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
};

// ─── Art upload (single image) ─────────────────────────────────────────────────

const artUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIRS.art),
    filename:    (req, file, cb) => cb(null, uniqueFilename(file)),
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"), false);
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// ─── Artist upload (photo + CV PDF) ───────────────────────────────────────────
// Field names must match what the frontend sends:
//   "photo"   → image file  (PhotoUpload component)
//   "cv_file" → PDF file    (CVUpload component)

const artistUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "photo")   cb(null, UPLOAD_DIRS.photo);
      else if (file.fieldname === "cv_file") cb(null, UPLOAD_DIRS.cv);
      else cb(new Error("Unknown field"), false);
    },
    filename: (req, file, cb) => cb(null, uniqueFilename(file)),
  }),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "photo" && file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else if (file.fieldname === "cv_file" && file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for field "${file.fieldname}"`), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

module.exports = { artUpload, artistUpload };