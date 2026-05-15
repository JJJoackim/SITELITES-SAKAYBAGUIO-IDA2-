const navItems = [
  {
    id: "home",
    labelEn: "Home",
    labelTl: "Tahanan",
    svg: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 6.5L8 2l6 4.5V14H10v-4H6v4H2V6.5z" />
      </svg>
    ),
  },
  {
    id: "trips",
    labelEn: "Trips",
    labelTl: "Biyahe",
    svg: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="8" cy="7" r="3" />
        <path d="M8 1C5.24 1 3 3.24 3 6c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5z" />
      </svg>
    ),
  },
  {
    id: "settings",
    labelEn: "Settings",
    labelTl: "Mga Setting",
    svg: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="8" cy="8" r="2.5" />
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
      </svg>
    ),
  },
  {
    id: "support",
    labelEn: "Support",
    labelTl: "Tulong",
    svg: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 10c0 .55-.45 1-1 1H4l-2 3V3c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v7z" />
      </svg>
    ),
  },
]

export default function Nav({ page, setPage, lang }) {
  const label = (item) => (lang === "tl" ? item.labelTl : item.labelEn)

  return (
    <>
      {/* Desktop top nav */}
      <nav>
        <div className="nav-brand">
          <div className="brand-top">
            <span className="brand-baguio">Baguio</span>
          </div>
          <span className="brand-main">Sakay</span>
        </div>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                onClick={() => setPage(item.id)}
                className={page === item.id ? "active" : ""}
              >
                {item.svg}
                {label(item)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="mobile-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                onClick={() => setPage(item.id)}
                className={page === item.id ? "active" : ""}
              >
                {item.svg}
                {label(item)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

