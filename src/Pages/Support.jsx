import { useState } from "react"

const labels = {
  en: {
    errorType:           "Type of Error?",
    placeholder:         "What are you reporting?",
    gmail:               "Gmail",
    gmailPlaceholder:    "Enter your Gmail",
    describe:            "Describe the issue",
    describePlaceholder: "Describe what happened...",
    submit:              "Submit Report",
    sending:             "Sending...",
    errFill:             "Please fill in all fields.",
    success:             "✓ Report submitted! Thank you.",
  },
  tl: {
    errorType:           "Uri ng Error?",
    placeholder:         "Ano ang iyong iniuulat?",
    gmail:               "Gmail",
    gmailPlaceholder:    "Ilagay ang iyong Gmail",
    describe:            "Ilarawan ang problema",
    describePlaceholder: "Ilarawan kung ano ang nangyari...",
    submit:              "Isumite ang Ulat",
    sending:             "Isinusumite...",
    errFill:             "Pakipunan ang lahat ng fields.",
    success:             "✓ Naisumite na ang ulat! Salamat.",
  },
}

const ERROR_TYPES = [
  "Wrong Route Information",
  "App Bug / Glitch",
  "Incorrect Schedule",
  "Wrong Fare Information",
  "Other",
]

const EMPTY = { errorType: "", gmail: "", description: "" }

export default function Support({ showToast, lang }) {
  const tx = labels[lang] || labels.en
  const [form,    setForm]    = useState(EMPTY)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = () => {
    if (!form.errorType || !form.gmail || !form.description) {
      showToast(tx.errFill)
      return
    }
    setLoading(true)
    // Simulate submission (swap with real fetch if you have a backend)
    setTimeout(() => {
      showToast(tx.success)
      setForm(EMPTY)
      setLoading(false)
    }, 900)
  }

  return (
    <div id="support-page" className="page active">
      <div className="support-bg" />
      <div className="support-content">
        <div className="support-card">

          <label className="support-field-label">{tx.errorType}</label>
          <div className="support-select-wrap">
            <select
              className="support-select"
              value={form.errorType}
              onChange={set("errorType")}
            >
              <option value="" disabled>{tx.placeholder}</option>
              {ERROR_TYPES.map(et => (
                <option key={et} value={et}>{et}</option>
              ))}
            </select>
            <span className="support-select-arrow">▾</span>
          </div>

          <label className="support-field-label">{tx.gmail}</label>
          <input
            className="support-input"
            type="email"
            placeholder={tx.gmailPlaceholder}
            value={form.gmail}
            onChange={set("gmail")}
          />

          <label className="support-field-label">{tx.describe}</label>
          <textarea
            className="support-textarea"
            placeholder={tx.describePlaceholder}
            value={form.description}
            onChange={set("description")}
          />

          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? tx.sending : tx.submit}
          </button>

        </div>
      </div>
    </div>
  )
}


