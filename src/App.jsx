import { useState } from "react"
import Nav from "./Nav"
import Home from "./pages/Home"
import Trips from "./pages/Trips"
import Settings from "./pages/Settings"
import Support from "./pages/Support"
import "./App.css"

export default function App() {
  const [page, setPage] = useState("home")
  const [toast, setToast] = useState("")
  const [theme, setTheme] = useState("default")
  const [lang, setLang] = useState("en")

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const applyTheme = (val) => {
    setTheme(val)
    const labels = { default: "Default theme applied", dark: "Dark theme applied", light: "Light theme applied" }
    showToast(labels[val] || "Theme updated")
  }

  const applyLanguage = (val) => {
    setLang(val)
    showToast(val === "tl" ? "Wikang Tagalog na" : "Language set to English")
  }

  return (
    <div className={`app-root${theme !== "default" ? ` theme-${theme}` : ""}`}>
      <Nav page={page} setPage={setPage} lang={lang} />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        {page === "home"     && <Home setPage={setPage} lang={lang} />}
        {page === "trips"    && <Trips showToast={showToast} lang={lang} />}
        {page === "settings" && <Settings applyTheme={applyTheme} applyLanguage={applyLanguage} theme={theme} lang={lang} />}
        {page === "support"  && <Support showToast={showToast} lang={lang} />}
      </main>
      {toast && <div className="toast show">{toast}</div>}
    </div>
  )
}
