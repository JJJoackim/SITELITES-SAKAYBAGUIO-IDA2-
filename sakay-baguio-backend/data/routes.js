// routes/routes.js
const express = require("express");
const router = express.Router();
const routesData = require("../data/routes");

/**
 * GET /api/routes
 * Returns all jeepney routes (summary list).
 */
router.get("/", (req, res) => {
  const summary = Object.values(routesData).map(({ id, name, route, emoji, fare, firstTrip, lastTrip }) => ({
    id,
    name,
    route,
    emoji,
    fare,
    firstTrip,
    lastTrip,
  }));

  res.json({ success: true, data: summary });
});

/**
 * GET /api/routes/:id
 * Returns a single jeepney route by ID (includes mapSrc, imgUrl, capacity).
 */
router.get("/:id", (req, res) => {
  const route = routesData[req.params.id.toLowerCase()];

  if (!route) {
    return res.status(404).json({
      success: false,
      error: `Route '${req.params.id}' not found.`,
    });
  }

  res.json({ success: true, data: route });
});

module.exports = router;
