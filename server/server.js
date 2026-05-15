import express from "express"
import cors from "cors"
import { reportsRouter } from "./routes/support.js"
import { routesRouter } from "./routes/jeepney.js"

const app = express()
const PORT = process.env.PORT || 5000

// Middleware 
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }))
app.use(express.json())

// Request logger (dev) 
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}]  ${req.method}  ${req.url}`)
  next()
})

// Routes 
app.use("/api/support",  reportsRouter)
app.use("/api/jeepney",  routesRouter)

// Health check 
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// 404 fallback 
app.use((_req, res) => {
  res.status(404).json({ success: false, errors: [{ message: "Route not found." }] })
})

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ success: false, errors: [{ message: "Internal server error." }] })
})

app.listen(PORT, () => {
  console.log(`\n🚌  SakayBaguio API running on http://localhost:${PORT}\n`)
})
