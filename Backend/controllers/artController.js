const pool = require("../db");
const fs = require("fs");
const path = require("path");

// ─── Helper: build image URL ───────────────────────────────────────────────────

const getImageUrl = (req) => {
  // New file uploaded by multer
  if (req.file) {
    return `/uploads/art/${req.file.filename}`;
  }
  // Frontend sent back existing URL — strip domain, store only path
  const existing = req.body.image_url;
  if (!existing) return null;
  if (existing.startsWith("http")) {
    try { return new URL(existing).pathname; } catch { return null; }
  }
  return existing;
};

// ─── Helper: build full URL for response ──────────────────────────────────────

const buildUrl = (req, filePath) => {
  if (!filePath) return null;
  if (filePath.startsWith("http")) return filePath;
  return `${req.protocol}://${req.get("host")}${filePath}`;
};

// ─── Helper: delete file from disk ────────────────────────────────────────────

const deleteFile = (filePath) => {
  if (!filePath) return;
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

// ─── Helper: format art row for response ──────────────────────────────────────

const formatArt = (req, row) => ({
  ...row,
  image_url: buildUrl(req, row.image_url),
  // BUG 1 FIX: artist_photo also needs full URL — was returned as raw path
  artist_photo: buildUrl(req, row.artist_photo),
  price: row.price !== null ? Number(row.price) : null,
});

// ─── GET ALL ───────────────────────────────────────────────────────────────────

const getArts = async (req, res) => {
  try {
    const { artist_id } = req.query;

    let query = `
      SELECT 
        a.*,
        ar.full_name   AS artist_name,
        ar.photo_url   AS artist_photo,
        ar.nationality AS artist_nationality
      FROM arts a
      LEFT JOIN artists ar ON a.artist_id = ar.id
    `;

    const params = [];
    if (artist_id) {
      query += " WHERE a.artist_id = ?";
      params.push(artist_id);
    }

    query += " ORDER BY a.id DESC";

    const [rows] = await pool.query(query, params);
    res.json(rows.map((row) => formatArt(req, row)));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
};

// ─── GET BY ID ─────────────────────────────────────────────────────────────────

const getArtById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.*, ar.full_name AS artist_name, ar.photo_url AS artist_photo
       FROM arts a
       LEFT JOIN artists ar ON a.artist_id = ar.id
       WHERE a.id = ?`,
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    res.json(formatArt(req, rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch artwork" });
  }
};

// ─── CREATE ────────────────────────────────────────────────────────────────────

const createArt = async (req, res) => {
  try {
    const {
      artist_id, title, year, medium, dimensions,
      description, enquire, exhibited, publication, provenance,
      status,
    } = req.body;

    // BUG 2 FIX: price must be parsed as float — raw string "85000" or ""
    const price = req.body.price !== "" && req.body.price != null
      ? parseFloat(req.body.price)
      : null;

    if (!artist_id || !title?.trim()) {
      return res.status(400).json({ error: "artist_id and title are required" });
    }

    const [artistCheck] = await pool.query(
      "SELECT id FROM artists WHERE id = ?", [artist_id]
    );
    if (!artistCheck.length) {
      return res.status(404).json({ error: "Artist not found" });
    }

    const image_url = getImageUrl(req);

    const [result] = await pool.query(
      `INSERT INTO arts (
        artist_id, title, year, medium, dimensions, image_url,
        description, enquire, exhibited, publication, provenance,
        price, status
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        artist_id, title.trim(), year || null, medium || null,
        dimensions || null, image_url, description || null,
        enquire || null, exhibited || null, publication || null,
        provenance || null, price, status || "available",
      ]
    );

    const [rows] = await pool.query(
      `SELECT a.*, ar.full_name AS artist_name, ar.photo_url AS artist_photo
       FROM arts a
       LEFT JOIN artists ar ON a.artist_id = ar.id
       WHERE a.id = ?`,
      [result.insertId]
    );

    res.status(201).json(formatArt(req, rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create artwork" });
  }
};

// ─── UPDATE ────────────────────────────────────────────────────────────────────

const updateArt = async (req, res) => {
  try {
    const { id } = req.params;

    // BUG 3 FIX: check artwork exists before updating
    const [existing] = await pool.query(
      "SELECT * FROM arts WHERE id = ?", [id]
    );
    if (!existing.length) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    const current = existing[0];

    const {
      artist_id, title, year, medium, dimensions,
      description, enquire, exhibited, publication, provenance, status,
    } = req.body;

    // BUG 2 FIX: parse price consistently
    const price = req.body.price !== "" && req.body.price != null
      ? parseFloat(req.body.price)
      : null;

    // BUG 4 FIX: delete old image from disk when a new one is uploaded
    let image_url;
    if (req.file) {
      deleteFile(current.image_url);
      image_url = `/uploads/art/${req.file.filename}`;
    } else {
      const existing_url = req.body.image_url;
      if (!existing_url) {
        // Frontend explicitly cleared the image
        deleteFile(current.image_url);
        image_url = null;
      } else {
        // Keep existing — strip domain if full URL
        image_url = existing_url.startsWith("http")
          ? new URL(existing_url).pathname
          : existing_url;
      }
    }

    await pool.query(
      `UPDATE arts SET
        artist_id=?, title=?, year=?, medium=?, dimensions=?, image_url=?,
        description=?, enquire=?, exhibited=?, publication=?, provenance=?,
        price=?, status=?
       WHERE id=?`,
      [
        artist_id       ?? current.artist_id,
        title?.trim()   ?? current.title,
        year            ?? current.year,
        medium          ?? current.medium,
        dimensions      ?? current.dimensions,
        image_url,
        description     ?? current.description,
        enquire         ?? current.enquire,
        exhibited       ?? current.exhibited,
        publication     ?? current.publication,
        provenance      ?? current.provenance,
        price,
        status          ?? current.status,
        id,
      ]
    );

    const [rows] = await pool.query(
      `SELECT a.*, ar.full_name AS artist_name, ar.photo_url AS artist_photo
       FROM arts a
       LEFT JOIN artists ar ON a.artist_id = ar.id
       WHERE a.id = ?`,
      [id]
    );

    res.json(formatArt(req, rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update artwork" });
  }
};

// ─── DELETE ────────────────────────────────────────────────────────────────────

const deleteArt = async (req, res) => {
  try {
    // BUG 5 FIX: delete image file from disk before removing DB row
    const [rows] = await pool.query(
      "SELECT image_url FROM arts WHERE id = ?", [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    deleteFile(rows[0].image_url);

    await pool.query("DELETE FROM arts WHERE id = ?", [req.params.id]);

    res.json({ message: "Artwork deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete artwork" });
  }
};

module.exports = { getArts, getArtById, createArt, updateArt, deleteArt };