import { Router } from "express"

export const routesRouter = Router()

// ── Jeepney route data ───────────────────────────────────────────────────────
// Moved here from Trips.jsx so the frontend fetches it instead of hardcoding it.
// Update fares, schedules, or capacity here without touching the React code.
const JEEPNEY_ROUTES = [
  {
    id:        "trancoville",
    name:      "Trancoville Jeepney Station",
    shortName: "Trancoville",
    route:     "Melvin Jones Grandstand — Trancoville",
    fare:      { regular: 20, student: 15, senior: 15 },
    capacity:  24,
    firstTrip: "6:00am",
    lastTrip:  "9:00pm",
    mapSrc:    "https://www.openstreetmap.org/export/embed.html?bbox=120.5700,16.4050,120.6100,16.4350&layer=mapnik",
    emoji:     "🏘️",
    imgUrl:    "Baguio_City_Hall_1.jpg",
  },
  {
    id:        "aurora",
    name:      "Aurora Hill Jeepney Station",
    shortName: "Aurora Hill",
    route:     "Melvin Jones Grandstand — Aurora Hill",
    fare:      { regular: 13, student: 10, senior: 10 },
    capacity:  22,
    firstTrip: "5:30am",
    lastTrip:  "8:30pm",
    mapSrc:    "https://www.openstreetmap.org/export/embed.html?bbox=120.5700,16.3900,120.6100,16.4200&layer=mapnik",
    emoji:     "🌿",
    imgUrl:    "Baguio_Aurora_Hill_(baguio_City;_12-03-2022).jpg",
  },
  {
    id:        "camp7",
    name:      "Camp 7 Jeepney Station",
    shortName: "Camp 7",
    route:     "Melvin Jones Grandstand — 12 Lower Brookside",
    fare:      { regular: 20, student: 15, senior: 15 },
    capacity:  24,
    firstTrip: "6:00am",
    lastTrip:  "9:00pm",
    mapSrc:    "https://www.openstreetmap.org/export/embed.html?bbox=120.5800,16.3800,120.6400,16.4300&layer=mapnik",
    emoji:     "⛰️",
    imgUrl:    "Kennon_Road_overlooking,_Camp_7_(Baguio_City;_12-04-2022).jpg",
  },
  {
    id:        "irisan",
    name:      "Irisan Jeepney Station",
    shortName: "Irisan",
    route:     "Melvin Jones Grandstand — Irisan",
    fare:      { regular: 20, student: 15, senior: 15 },
    capacity:  24,
    firstTrip: "5:30am",
    lastTrip:  "8:00pm",
    mapSrc:    "https://www.openstreetmap.org/export/embed.html?bbox=120.5200,16.3800,120.5900,16.4100&layer=mapnik",
    emoji:     "🌲",
    imgUrl:    "1000096674-scaled.jpg",
  },
  {
    id:        "mines",
    name:      "Mines View Jeepney Station",
    shortName: "Mines View",
    route:     "Melvin Jones Grandstand — Mines View Park",
    fare:      { regular: 13, student: 10, senior: 10 },
    capacity:  22,
    firstTrip: "6:00am",
    lastTrip:  "7:30pm",
    mapSrc:    "https://www.openstreetmap.org/export/embed.html?bbox=120.5800,16.3900,120.6400,16.4300&layer=mapnik",
    emoji:     "🌄",
    imgUrl:    "2cee2896-c20f-4011-bed2-4f9a3850ee1f.jpg",
  },
]

// ── GET /api/jeepney/routes ────────────────────────────────────────────────────
routesRouter.get("/routes", (_req, res) => {
  res.json({ success: true, data: JEEPNEY_ROUTES })
})

// ── GET /api/jeepney/routes/:id ───────────────────────────────────────────────
routesRouter.get("/routes/:id", (req, res) => {
  const found = JEEPNEY_ROUTES.find((r) => r.id === req.params.id)
  if (!found) {
    return res.status(404).json({ success: false, errors: [{ message: "Route not found." }] })
  }
  res.json({ success: true, data: found })
})