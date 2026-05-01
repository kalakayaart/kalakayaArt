const pool = require("../db");
const fs = require("fs");
const path = require("path");

// ─── Helper: build full URL ────────────────────────────────────────────────────

const buildFileUrl = (req, filePath) => {
  if (!filePath) return null;
  // If already a full URL (http/https), return as-is
  if (filePath.startsWith("http")) return filePath;
  return `${req.protocol}://${req.get("host")}${filePath}`;
};

// ─── Helper: delete old file from disk ────────────────────────────────────────

const deleteFile = (filePath) => {
  if (!filePath) return;
  // Strip domain if full URL was stored — get just the path part
  const relativePath = filePath.startsWith("http")
    ? new URL(filePath).pathname
    : filePath;
  const fullPath = path.join(__dirname, "..", relativePath);
  fs.unlink(fullPath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error("Failed to delete file:", fullPath, err.message);
    }
  });
};

// ─── Helper: parse nullable integers ──────────────────────────────────────────

const toIntOrNull = (val) => {
  if (val === null || val === undefined || val === "") return null;
  const n = parseInt(val, 10);
  return isNaN(n) ? null : n;
};

// ─── GET ALL ───────────────────────────────────────────────────────────────────

const getArtists = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM artists ORDER BY id DESC");

    const formatted = rows.map((a) => ({
      ...a,
      photo_url: buildFileUrl(req, a.photo_url),
      cv: buildFileUrl(req, a.cv),
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch artists" });
  }
};

// ─── GET ONE ───────────────────────────────────────────────────────────────────

const getArtistById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM artists WHERE id = ?",
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Artist not found" });
    }

    const artist = rows[0];

    res.json({
      ...artist,
      photo_url: buildFileUrl(req, artist.photo_url),
      cv: buildFileUrl(req, artist.cv),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch artist" });
  }
};

// ─── CREATE ────────────────────────────────────────────────────────────────────

const createArtist = async (req, res) => {
  try {
    const {
      full_name, bio, exhibitions,
      nationality, email, website,
    } = req.body;

    // BUG 1 FIX: parse birth_year / death_year as integers, not raw strings
    const birth_year = toIntOrNull(req.body.birth_year);
    const death_year = toIntOrNull(req.body.death_year);

    if (!full_name || !full_name.trim()) {
      return res.status(400).json({ error: "full_name is required" });
    }

    // BUG 2 FIX: correct subfolder paths matching multer config
    const photo_url = req.files?.photo?.[0]
      ? `/uploads/artists/photos/${req.files.photo[0].filename}`
      : null;

    const cv = req.files?.cv_file?.[0]
      ? `/uploads/artists/cvs/${req.files.cv_file[0].filename}`
      : null;

    const [result] = await pool.query(
      `INSERT INTO artists
        (full_name, photo_url, bio, cv, exhibitions, nationality, birth_year, death_year, email, website)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        full_name.trim(), photo_url, bio || null, cv,
        exhibitions || null, nationality || null,
        birth_year, death_year,
        email || null, website || null,
      ]
    );

    const [rows] = await pool.query(
      "SELECT * FROM artists WHERE id = ?",
      [result.insertId]
    );

    const artist = rows[0];
    res.status(201).json({
      ...artist,
      photo_url: buildFileUrl(req, artist.photo_url),
      cv: buildFileUrl(req, artist.cv),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create artist" });
  }
};

// ─── UPDATE ────────────────────────────────────────────────────────────────────

const updateArtist = async (req, res) => {
  try {
    const { id } = req.params;

    // Check artist exists first
    const [existing] = await pool.query(
      "SELECT * FROM artists WHERE id = ?", [id]
    );
    if (!existing.length) {
      return res.status(404).json({ error: "Artist not found" });
    }

    const current = existing[0];

    const {
      full_name, bio, exhibitions,
      nationality, email, website,
      photo_url: existingPhoto,
      cv: existingCv,
    } = req.body;

    // BUG 1 FIX: parse birth_year / death_year as integers
    const birth_year = toIntOrNull(req.body.birth_year);
    const death_year = toIntOrNull(req.body.death_year);

    // BUG 2 FIX: correct subfolder paths matching multer config
    let photo_url;
    if (req.files?.photo?.[0]) {
      // New file uploaded — delete the old one from disk
      deleteFile(current.photo_url);
      photo_url = `/uploads/artists/photos/${req.files.photo[0].filename}`;
    } else {
      // No new file — keep existing (frontend sends back the full URL or empty)
      // BUG 3 FIX: strip domain from URL before storing — store only the path
      photo_url = existingPhoto
        ? (existingPhoto.startsWith("http")
            ? new URL(existingPhoto).pathname
            : existingPhoto)
        : null;
    }

    let cv;
    if (req.files?.cv_file?.[0]) {
      // New PDF uploaded — delete the old one from disk
      deleteFile(current.cv);
      cv = `/uploads/artists/cvs/${req.files.cv_file[0].filename}`;
    } else {
      cv = existingCv
        ? (existingCv.startsWith("http")
            ? new URL(existingCv).pathname
            : existingCv)
        : null;
    }

    await pool.query(
      `UPDATE artists SET
        full_name=?, photo_url=?, bio=?, cv=?, exhibitions=?,
        nationality=?, birth_year=?, death_year=?, email=?, website=?
       WHERE id=?`,
      [
        full_name?.trim() || current.full_name,
        photo_url,
        bio ?? current.bio,
        cv,
        exhibitions ?? current.exhibitions,
        nationality ?? current.nationality,
        birth_year,
        death_year,
        email ?? current.email,
        website ?? current.website,
        id,
      ]
    );

    const [rows] = await pool.query(
      "SELECT * FROM artists WHERE id = ?", [id]
    );

    const artist = rows[0];
    res.json({
      ...artist,
      photo_url: buildFileUrl(req, artist.photo_url),
      cv: buildFileUrl(req, artist.cv),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update artist" });
  }
};

// ─── DELETE ────────────────────────────────────────────────────────────────────

const deleteArtist = async (req, res) => {
  try {
    // BUG 4 FIX: delete files from disk before removing the DB row
    const [rows] = await pool.query(
      "SELECT photo_url, cv FROM artists WHERE id = ?",
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Artist not found" });
    }

    deleteFile(rows[0].photo_url);
    deleteFile(rows[0].cv);

    await pool.query("DELETE FROM artists WHERE id = ?", [req.params.id]);

    res.json({ message: "Artist deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete artist" });
  }
};

module.exports = {
  getArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
};