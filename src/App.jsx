import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const jeepneys = [
    {
      route: "Session Rd — Burnham",
      id: "BGL-1042",
      cap: 88,
      eta: "4 min",
    },
    {
      route: "Marcos Hwy — SM City",
      id: "BGL-2211",
      cap: 63,
      eta: "8 min",
    },
    {
      route: "Magsaysay — Mines View",
      id: "BGL-3018",
      cap: 35,
      eta: "14 min",
    },
    {
      route: "Kennon Rd — Camp 7",
      id: "BGL-4407",
      cap: 92,
      eta: "2 min",
    },
  ];

  const news = [
    {
      title: "Diesel Prices Increase in Baguio",
      desc: "LTFRB-CAR reviews fare petitions after diesel hike.",
      emoji: "⛽",
    },
    {
      title: "Panagbenga Traffic Advisory",
      desc: "Temporary reroutes announced during festival season.",
      emoji: "🚦",
    },
    {
      title: "New Jeepney Route Approved",
      desc: "La Trinidad to Public Market loop now operational.",
      emoji: "🚌",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Live updates...");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <span className="dot"></span>
          SakayBaguio
        </div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("map")}>Live Map</button>
          <button onClick={() => setPage("status")}>Status</button>
          <button onClick={() => setPage("news")}>News</button>
          <button onClick={() => setPage("support")}>Support</button>
        </div>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <section className="hero">
          <p className="eyebrow">
            Real-Time Jeepney Monitoring · Baguio City
          </p>

          <h1>
            Ride Smarter Through the <span>City of Pines</span>
          </h1>

          <p className="hero-desc">
            Track Baguio jeepney routes live and know before you go.
          </p>

          <div className="hero-buttons">
            <button onClick={() => setPage("map")} className="primary-btn">
              View Live Map
            </button>

            <button onClick={() => setPage("status")} className="outline-btn">
              Check Status
            </button>
          </div>

          <div className="stats">
            <div className="stat-card">
              <h2>86</h2>
              <p>Active Units</p>
            </div>

            <div className="stat-card">
              <h2>18</h2>
              <p>Routes</p>
            </div>

            <div className="stat-card">
              <h2>97%</h2>
              <p>Uptime</p>
            </div>
          </div>
        </section>
      )}

      {/* MAP */}
      {page === "map" && (
        <section className="page-section">
          <h2>Live Map</h2>

          <div className="map-box">
            <iframe
              title="Baguio Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=120.5600,16.3800,120.6200,16.4300&layer=mapnik&marker=16.4023,120.5960"
            ></iframe>
          </div>
        </section>
      )}

      {/* STATUS */}
      {page === "status" && (
        <section className="page-section">
          <h2>Jeepney Status</h2>

          <div className="jeep-grid">
            {jeepneys.map((j, index) => (
              <div className="jeep-card" key={index}>
                <div className="card-top">
                  <div>
                    <h3>{j.route}</h3>
                    <p>{j.id}</p>
                  </div>

                  <span
                    className={
                      j.cap >= 85
                        ? "badge red"
                        : j.cap >= 60
                        ? "badge amber"
                        : "badge green"
                    }
                  >
                    {j.cap >= 85
                      ? "Full"
                      : j.cap >= 60
                      ? "Filling"
                      : "Available"}
                  </span>
                </div>

                <div className="progress-bar">
                  <div
                    className="fill"
                    style={{ width: `${j.cap}%` }}
                  ></div>
                </div>

                <div className="meta">
                  <p>Capacity: {j.cap}%</p>
                  <p>ETA: {j.eta}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* NEWS */}
      {page === "news" && (
        <section className="page-section">
          <h2>Transportation News</h2>

          <div className="news-grid">
            {news.map((n, index) => (
              <div
                className="news-card"
                key={index}
                onClick={() => showToast("Opening article...")}
              >
                <div className="emoji">{n.emoji}</div>

                <div>
                  <h3>{n.title}</h3>
                  <p>{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SUPPORT */}
      {page === "support" && (
        <section className="page-section">
          <h2>Support & Feedback</h2>

          <div className="support-box">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Describe your issue"></textarea>

            <button
              className="primary-btn"
              onClick={() => showToast("Report submitted!")}
            >
              Submit Report
            </button>
          </div>
        </section>
      )}

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}