// server.js – Sakay Baguio Backend
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const routesRouter = require("./routes/routes");
const supportRouter = require("./routes/support");
const settingsRouter = require("./routes/settings");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────

// CORS – allow the frontend origin (update to your deployed URL in production)
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "*",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
);

// Parse JSON bodies
app.use(express.json());

// Global rate limiter – 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests. Please try again later." },
});
app.use(limiter);

// Stricter limiter for support form submissions (10 per 15 min)
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, error: "Too many reports submitted. Please wait before trying again." },
});

// ─── Routes ──────────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.json({
    app: "Sakay Baguio API",
    version: "1.0.0",
    endpoints: {
      routes: {
        "GET /api/routes":       "List all jeepney routes",
        "GET /api/routes/:id":   "Get a single route by ID (trancoville | aurora | ambiong | irisan | mines)",
      },
      support: {
        "POST /api/support/reports": "Submit a support report",
        "GET  /api/support/reports": "List all reports (admin)",
        "GET  /api/support/reports/:id": "Get a single report",
      },
      settings: {
        "GET /api/settings": "Get current app settings",
        "PUT /api/settings": "Update theme and/or language",
      },
    },
  });
});

app.use("/api/routes",   routesRouter);
app.use("/api/support",  submitLimiter, supportRouter);
app.use("/api/settings", settingsRouter);

// ─── 404 Handler ─────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({ success: false, error: `Cannot ${req.method} ${req.path}` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────

app.use((err, req, res, _next) => {
  console.error("[Error]", err.message);
  res.status(500).json({ success: false, error: "Internal server error." });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✅  Sakay Baguio API running at http://localhost:${PORT}`);
  console.log(`📋  Health check: http://localhost:${PORT}/`);
});
