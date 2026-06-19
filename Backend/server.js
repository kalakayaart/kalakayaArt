const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Sentry = require("@sentry/node");
require("dotenv").config();

const artistRoutes = require("./routes/artistRoutes");
const artRoutes = require("./routes/artroute");

const app = express();
const PORT = process.env.PORT || 5000;
const sentryDsn = process.env.SENTRY_DSN;

Sentry.init({
  dsn: sentryDsn,
  enabled: Boolean(sentryDsn),
  environment: process.env.NODE_ENV,
  debug: false,
  tracesSampleRate: 0,
  integrations: [Sentry.expressIntegration()],
});

/**
 * Middleware
 */
app.use(cors());

// Increase payload limits for images / base64 uploads
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/**
 * Static files (uploads)
 */
app.use("/uploads", express.static("uploads"));

/**
 * Routes
 */
app.use("/api/artists", artistRoutes);
app.use("/api/arts", artRoutes);

/**
 * Health check route
 */
app.get("/", (req, res) => {
  res.status(200).send("Kalakaya Artist API is running ✅");
});

Sentry.setupExpressErrorHandler(app);

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Multer errors (file uploads)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: `Upload error: ${err.message}`,
    });
  }

  // Custom / general errors
  if (err) {
    return res.status(400).json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }

  next();
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
