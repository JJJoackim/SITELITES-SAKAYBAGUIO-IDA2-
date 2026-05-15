const t = {
  en: {
    eyebrow: "Jeepney Route Guide",
    ride: "Ride Smarter",
    through: "Through",
    btn: "View Jeepney Trips",
  },
  tl: {
    eyebrow: "Gabay sa Ruta ng Dyipni",
    ride: "Sumakay nang Matalino",
    through: "sa",
    btn: "Tingnan ang mga Biyahe",
  },
}

export default function Home({ setPage, lang }) {
  const tx = t[lang] || t.en
  return (
    <div id="home" className="page active">
      <div className="home-bg"></div>
      <div className="home-content">
        <p className="hero-eyebrow">{tx.eyebrow}</p>
        <p className="hero-ride">{tx.ride}</p>
        <p className="hero-through">{tx.through}</p>
        <h1 className="hero-city">Baguio</h1>
        <button className="btn-view-trips" onClick={() => setPage("trips")}>
          {tx.btn}
        </button>
      </div>
    </div>
  )
}
