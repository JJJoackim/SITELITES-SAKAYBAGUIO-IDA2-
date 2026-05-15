const labels = {
  en: { theme: "Theme", language: "Language" },
  tl: { theme: "Tema",  language: "Wika" },
}

const themeOptions = [
  { value: "default", labelEn: "Default",   labelTl: "Default" },
  { value: "dark",    labelEn: "Dark",       labelTl: "Madilim" },
  { value: "light",   labelEn: "Light",      labelTl: "Maliwanag" },
]

const langOptions = [
  { value: "en", label: "English" },
  { value: "tl", label: "Tagalog" },
]

export default function Settings({ applyTheme, applyLanguage, theme, lang }) {
  const tx = labels[lang] || labels.en

  return (
    <div id="settings-page" className="page active">
      <div className="settings-bg"></div>
      <div className="settings-content">
        <div className="settings-card">

          {/* Theme row */}
          <div className="settings-row">
            <span className="settings-row-label">{tx.theme}</span>
            <div className="settings-select-wrap">
              <select
                className="settings-select"
                value={theme}
                onChange={(e) => applyTheme(e.target.value)}
              >
                {themeOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {lang === "tl" ? o.labelTl : o.labelEn}
                  </option>
                ))}
              </select>
              <span className="settings-select-arrow">▾</span>
            </div>
          </div>

          {/* Language row */}
          <div className="settings-row">
            <span className="settings-row-label">{tx.language}</span>
            <div className="settings-select-wrap">
              <select
                className="settings-select"
                value={lang}
                onChange={(e) => applyLanguage(e.target.value)}
              >
                {langOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <span className="settings-select-arrow">▾</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
