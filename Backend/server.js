const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const artistRoutes = require("./routes/artistRoutes");
const artRoutes = require("./routes/artroute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Static
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/artists", artistRoutes);
app.use("/api/arts", artRoutes);

app.get("/", (req, res) => res.send("Kalakaya Artist API is running ✅"));

// Global error handler — catches multer errors and anything else
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // e.g. file too large, too many files
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  if (err) {
    // e.g. wrong file type from fileFilter
    return res.status(400).json({ error: err.message });
  }
  next();
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://0.0.0.0:${PORT}`)
);