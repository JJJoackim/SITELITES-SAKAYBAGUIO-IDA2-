// routes/settings.js
const express = require("express");
const router = express.Router();
const { validateSettings } = require("../middleware/validate");

// Default settings (in-memory; swap for a DB or user sessions in production)
let currentSettings = {
  theme: "default",
  language: "en",
  updatedAt: new Date().toISOString(),
};

/**
 * GET /api/settings
 * Returns the current app settings.
 */
router.get("/", (req, res) => {
  res.json({ success: true, data: currentSettings });
});

/**
 * PUT /api/settings
 * Update one or both settings (theme and/or language).
 *
 * Body (all fields optional):
 *   theme    {string} – "default" | "dark" | "light"
 *   language {string} – "en" | "tl"
 */
router.put("/", validateSettings, (req, res) => {
  const { theme, language } = req.body;

  if (theme !== undefined) currentSettings.theme = theme;
  if (language !== undefined) currentSettings.language = language;
  currentSettings.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: "Settings updated.",
    data: currentSettings,
  });
});

module.exports = router;
