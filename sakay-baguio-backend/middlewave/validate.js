// middleware/validate.js

/**
 * Validates the support report request body.
 * Returns 400 with a descriptive error if any field is invalid.
 */
function validateReport(req, res, next) {
  const { errorType, name, description } = req.body;

  const allowedErrorTypes = [
    "Wrong Route Information",
    "App Bug / Glitch",
    "Incorrect Schedule",
    "Wrong Fare Information",
    "Other",
  ];

  if (!errorType || !allowedErrorTypes.includes(errorType)) {
    return res.status(400).json({
      success: false,
      error: `errorType must be one of: ${allowedErrorTypes.join(", ")}`,
    });
  }

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: "name is required and must be at least 2 characters.",
    });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length < 10
  ) {
    return res.status(400).json({
      success: false,
      error: "description is required and must be at least 10 characters.",
    });
  }

  // Sanitize strings before passing on
  req.body.name = name.trim();
  req.body.description = description.trim();

  next();
}

/**
 * Validates settings update body.
 */
function validateSettings(req, res, next) {
  const { theme, language } = req.body;

  const allowedThemes = ["default", "dark", "light"];
  const allowedLanguages = ["en", "tl"];

  if (theme !== undefined && !allowedThemes.includes(theme)) {
    return res.status(400).json({
      success: false,
      error: `theme must be one of: ${allowedThemes.join(", ")}`,
    });
  }

  if (language !== undefined && !allowedLanguages.includes(language)) {
    return res.status(400).json({
      success: false,
      error: `language must be one of: ${allowedLanguages.join(", ")}`,
    });
  }

  next();
}

module.exports = { validateReport, validateSettings };
