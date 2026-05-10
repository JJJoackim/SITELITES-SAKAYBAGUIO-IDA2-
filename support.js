// routes/support.js
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { validateReport } = require("../middleware/validate");

// In-memory store (replace with a real DB like MongoDB/PostgreSQL in production)
const reports = [];

/**
 * POST /api/support/reports
 * Submit a new support/error report from the frontend form.
 *
 * Body:
 *   errorType  {string} – one of the allowed error categories
 *   name       {string} – reporter's name
 *   description {string} – detailed description of the issue
 */
router.post("/reports", validateReport, (req, res) => {
  const { errorType, name, description } = req.body;

  const report = {
    id: uuidv4(),
    errorType,
    name,
    description,
    status: "open",
    createdAt: new Date().toISOString(),
  };

  reports.push(report);

  console.log(`[Support] New report received: [${report.id}] ${errorType} from ${name}`);

  res.status(201).json({
    success: true,
    message: "Report submitted successfully. Thank you!",
    data: { id: report.id, createdAt: report.createdAt },
  });
});

/**
 * GET /api/support/reports
 * Returns all submitted reports (admin use).
 */
router.get("/reports", (req, res) => {
  res.json({
    success: true,
    total: reports.length,
    data: reports,
  });
});

/**
 * GET /api/support/reports/:id
 * Returns a single report by ID.
 */
router.get("/reports/:id", (req, res) => {
  const report = reports.find((r) => r.id === req.params.id);

  if (!report) {
    return res.status(404).json({ success: false, error: "Report not found." });
  }

  res.json({ success: true, data: report });
});

module.exports = router;
