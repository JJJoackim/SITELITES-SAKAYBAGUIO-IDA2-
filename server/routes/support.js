import { Router } from "express"

export const reportsRouter = Router()

// In-memory store (replace with a real DB later) 
const reports = []

// Valid error type options — kept in sync with Support.jsx
const VALID_ERROR_TYPES = [
  "Wrong Route Information",
  "App Bug / Glitch",
  "Incorrect Schedule",
  "Wrong Fare Information",
  "Other",
]

// Validators 
function validate(body) {
  const errors = []
  const { errorType, gmail, description } = body

  if (!errorType) {
    errors.push({ field: "errorType", message: "Please select a type of error." })
  } else if (!VALID_ERROR_TYPES.includes(errorType)) {
    errors.push({ field: "errorType", message: "Invalid error type selected." })
  }

  if (!gmail) {
    errors.push({ field: "gmail", message: "Gmail address is required." })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail)) {
    errors.push({ field: "gmail", message: "Please enter a valid email address." })
  }

  if (!description) {
    errors.push({ field: "description", message: "Please describe the issue." })
  } else if (description.trim().length < 10) {
    errors.push({ field: "description", message: "Description must be at least 10 characters." })
  } else if (description.trim().length > 1000) {
    errors.push({ field: "description", message: "Description must not exceed 1000 characters." })
  }

  return errors
}

// POST /api/support/report 
reportsRouter.post("/report", (req, res) => {
  const errors = validate(req.body)
  if (errors.length) {
    return res.status(422).json({ success: false, errors })
  }

  const report = {
    id:          Date.now(),
    errorType:   req.body.errorType.trim(),
    gmail:       req.body.gmail.trim().toLowerCase(),
    description: req.body.description.trim(),
    submittedAt: new Date().toISOString(),
  }

  reports.push(report)
  console.log("📋  New support report:", report)

  return res.status(201).json({ success: true, message: "Report submitted successfully.", id: report.id })
})

// GET /api/support/reports  (admin / dev convenience) 
reportsRouter.get("/reports", (_req, res) => {
  res.json({ success: true, total: reports.length, data: reports })
})
