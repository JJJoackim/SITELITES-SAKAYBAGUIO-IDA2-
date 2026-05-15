import { useState, useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix Leaflet default icon paths broken by Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow })

const labels = {
  en: {
    heading: "Jeepney Routes",
    sub: "Select a destination",
    route: "Route",
    fare: "Fare",
    capacity: "Seating Capacity",
    schedule: "Schedule",
    regular: "Regular",
    student: "Student",
    senior: "Senior",
    close: "Close Route",
    loadingRoute: "⏳ Loading route...",
  },
  tl: {
    heading: "Mga Ruta ng Dyipni",
    sub: "Pumili ng destinasyon",
    route: "Ruta",
    fare: "Pamasahe",
    capacity: "Kapasidad ng Upuan",
    schedule: "Iskedyul",
    regular: "Regular",
    student: "Estudyante",
    senior: "Nakatatanda",
    close: "Isara ang Ruta",
    loadingRoute: "⏳ Nilo-load ang ruta...",
  },
}

const ROUTES = [
  {
    id: "mines",
    shortName: "Mines View",
    name: "Mines View Jeepney Station",
    route: "Melvin Jones Grandstand — Mines View Park",
    fare: { regular: 13, student: 10, senior: 10 },
    firstTrip: "6:00 AM", lastTrip: "7:30 PM",
    img: "/2cee2896-c20f-4011-bed2-4f9a3850ee1f.jpg",
    emoji: "⛏️",
    waypoints: [
      [16.412018942118678, 120.59718842119833], [16.41214418561007, 120.59689715369798],
      [16.412018121479782, 120.5967255045806],  [16.411760847490992, 120.59646534888704],
      [16.410871744814706, 120.59732293090202], [16.409508083416267, 120.59712176390204],
      [16.407355911671466, 120.59814440499161], [16.406247570584288, 120.5972408660077],
      [16.405227098803618, 120.59703820956071], [16.40522051177111,  120.5992109548222],
      [16.406238962012242, 120.6003338027863],  [16.407216698819738, 120.6005912948216],
      [16.40916186585852,  120.60206114518972], [16.40896632084492,  120.6028765366348],
      [16.41105555490104,  120.60433565893283], [16.414256258921583, 120.60799419160095],
      [16.41379313780465,  120.6083911584887],  [16.41424596735319,  120.60847698916712],
      [16.414204801074163, 120.60848771800194], [16.416160189747508, 120.61517178305665],
      [16.418269929168297, 120.62290727374635], [16.42081824480714,  120.62556176284424],
    ],
  },
  {
    id: "trancoville",
    shortName: "Trancoville",
    name: "Trancoville Jeepney Station",
    route: "Melvin Jones Grandstand — Trancoville",
    fare: { regular: 20, student: 15, senior: 15 },
    firstTrip: "6:00 AM", lastTrip: "9:00 PM",
    img: "/Baguio_City_Hall_1.jpg",
    emoji: "🏙️",
    waypoints: [
      [16.414033762256953, 120.59549924452442], [16.414340339929268, 120.59554637928993],
      [16.416712703954087, 120.59619501919751], [16.42456357378991,  120.59245548367312],
      [16.425094783247847, 120.59291066958376], [16.42564418328323,  120.59384759391648],
      [16.425062037511196, 120.59739045786955], [16.425575053572707, 120.59770529479108],
      [16.42529853444947,  120.59911637148788],
    ],
  },
  {
    id: "aurora",
    shortName: "Aurora Hill",
    name: "Aurora Hill Jeepney Station",
    route: "Melvin Jones Grandstand — Aurora Hill",
    fare: { regular: 13, student: 10, senior: 10 },
    firstTrip: "5:30 AM", lastTrip: "8:30 PM",
    img: "/Baguio_Aurora_Hill_(baguio_City;_12-03-2022).jpg",
    emoji: "🌄",
    waypoints: [
      [16.412644125143345, 120.5959924428724],  [16.41344687245397,  120.59486591521801],
      [16.41362182976144,  120.59509122074888], [16.414331948981946, 120.59559547598465],
      [16.416729868638782, 120.59620701956848], [16.41988931430154,  120.59758031057531],
      [16.419395545648133, 120.5980862417434],  [16.424141954477637, 120.60457794105983],
    ],
  },
  {
    id: "camp7",
    shortName: "Camp 7",
    name: "Camp 7 Jeepney Station",
    route: "Melvin Jones Grandstand — Camp 7",
    fare: { regular: 20, student: 15, senior: 15 },
    firstTrip: "6:00 AM", lastTrip: "9:00 PM",
    img: "/Kennon_Road_overlooking,_Camp_7_(Baguio_City;_12-04-2022).jpg",
    emoji: "⛺",
    waypoints: [
      [16.41216442936663,  120.59688136915064], [16.411809476259105, 120.59649857950842],
      [16.410946570313833, 120.59722268991496], [16.409432044532984, 120.59713017499348],
      [16.407354444562227, 120.59814768990647], [16.405819260392818, 120.59711946907126],
      [16.404538027834118, 120.59653302127171], [16.4035551314726,   120.59591611316566],
      [16.402579949288405, 120.59590538433334], [16.40168452706842,  120.5977346506674],
      [16.40088173120896,  120.59873779697143], [16.39931987209488,  120.60002525727914],
      [16.39738489911903,  120.59910525974807], [16.39591758550925,  120.59828347534827],
      [16.39412152932339,  120.6001583393941],  [16.39267798217055,  120.59974796146095],
      [16.38739522136264,  120.60080537505223], [16.38209658403452,  120.60542740228162],
    ],
  },
  {
    id: "irisan",
    shortName: "Irisan",
    name: "Irisan Jeepney Station",
    route: "Melvin Jones Grandstand — Irisan",
    fare: { regular: 20, student: 15, senior: 15 },
    firstTrip: "5:30 AM", lastTrip: "8:00 PM",
    img: "/1000096674-scaled.jpg",
    emoji: "🌿",
    waypoints: [
      [16.41386974023585,  120.59448758848757], [16.413838865467675, 120.59243838104001],
      [16.41558842793416,  120.58941284962536], [16.412511245796537, 120.57938138742745],
      [16.409928021825174, 120.56575576615417], [16.411060116255218, 120.56283752252999],
      [16.41348895107797,  120.56072394207365], [16.417934875282423, 120.55625001759],
      [16.420147507985146, 120.55720488388754], [16.42395523563615,  120.54999510622254],
      [16.429697559469602, 120.54910461256966],
    ],
  },
]

function makeIcon(color) {
  return L.divIcon({
    className: "",
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.4);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })
}

export default function Trips({ showToast, lang }) {
  const tx = labels[lang] || labels.en
  const mapDivRef  = useRef(null)
  const mapRef     = useRef(null)
  const glowRef    = useRef(null)
  const lineRef    = useRef(null)
  const markersRef = useRef([])

  const [selected,      setSelected]      = useState(null)
  const [routeLoading,  setRouteLoading]  = useState(false)
  const [imgError,      setImgError]      = useState(false)
  const [sidebarOpen,   setSidebarOpen]   = useState(false)

  // Init Leaflet map once
  useEffect(() => {
    if (mapRef.current) return
    const map = L.map(mapDivRef.current, { zoomControl: true })
      .setView([16.4123, 120.596], 14)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map)
    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Invalidate map size when page becomes visible
  useEffect(() => {
    const timer = setTimeout(() => mapRef.current?.invalidateSize(), 150)
    return () => clearTimeout(timer)
  }, [])

  // Draw OSRM route when selected changes
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Clear previous layers
    if (glowRef.current) { map.removeLayer(glowRef.current); glowRef.current = null }
    if (lineRef.current) { map.removeLayer(lineRef.current); lineRef.current = null }
    markersRef.current.forEach(m => map.removeLayer(m))
    markersRef.current = []

    if (!selected) return

    setRouteLoading(true)
    setImgError(false)

    const coords = selected.waypoints.map(([lat, lng]) => `${lng},${lat}`).join(";")
    fetch(
      `https://router.project-osrm.org/route/v1/driving/${coords}?geometries=geojson&overview=full&steps=false`
    )
      .then(r => r.json())
      .then(data => {
        if (data.code !== "Ok") throw new Error("OSRM error")
        const latlngs = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng])
        glowRef.current = L.polyline(latlngs, { color: "#7FB3FF", weight: 14, opacity: 0.3 }).addTo(map)
        lineRef.current = L.polyline(latlngs, { color: "#2F80ED", weight: 6, opacity: 0.95, lineJoin: "round" }).addTo(map)
        const s = L.marker(latlngs[0], { icon: makeIcon("#27AE60") })
          .addTo(map).bindPopup("🚌 Terminal — Melvin Jones")
        const e = L.marker(latlngs[latlngs.length - 1], { icon: makeIcon("#E74C3C") })
          .addTo(map).bindPopup("📍 " + selected.name)
        markersRef.current = [s, e]
        map.fitBounds(lineRef.current.getBounds(), { padding: [60, 60] })
      })
      .catch(() => showToast("⚠ Could not load road route. Check your connection."))
      .finally(() => setRouteLoading(false))
  }, [selected])

  const handleSelect = (r) => {
    setSelected(r)
    // Collapse sidebar on mobile
    if (window.innerWidth <= 640) setSidebarOpen(false)
  }

  const handleClose = () => {
    setSelected(null)
    mapRef.current?.setView([16.4123, 120.596], 14)
  }

  return (
    <div id="trips-page" className="page active">
      {/* Map container */}
      <div ref={mapDivRef} id="trips-map" />

      {/* Sidebar */}
      <div className={`trips-sidebar${sidebarOpen ? " expanded" : ""}`}>
        <div
          className="trips-sidebar-header"
          onClick={() => { if (window.innerWidth <= 640) setSidebarOpen(o => !o) }}
        >
          <h2>{tx.heading}</h2>
          <p>{tx.sub}</p>
          <span className="trips-sidebar-toggle">▾</span>
        </div>

        {ROUTES.map(r => (
          <div
            key={r.id}
            className={`trips-route-btn${selected?.id === r.id ? " active" : ""}`}
            onClick={() => handleSelect(r)}
          >
            <span className="trips-route-name">{r.shortName}</span>
            <span className="trips-route-arrow">›</span>
          </div>
        ))}

        {routeLoading && (
          <div className="trips-loading-bar">{tx.loadingRoute}</div>
        )}
      </div>

      {/* Info card — right panel desktop / bottom sheet mobile */}
      {selected && (
        <div className="trips-info-card visible">
          {!imgError ? (
            <img
              className="trips-info-image"
              src={selected.img}
              alt={selected.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="trips-info-image trips-info-image-placeholder">
              {selected.emoji}
            </div>
          )}
          <div className="trips-info-content">
            <div className="trips-info-title">{selected.name}</div>

            <div className="trips-info-row">
              <div className="trips-info-label">{tx.route}</div>
              <div className="trips-info-value">{selected.route}</div>
            </div>

            <div className="trips-info-row">
              <div className="trips-info-label">{tx.fare}</div>
              <div className="trips-fares">
                <div className="trips-fare-chip">{tx.regular} ₱{selected.fare.regular}</div>
                <div className="trips-fare-chip">{tx.student} ₱{selected.fare.student}</div>
                <div className="trips-fare-chip">{tx.senior} ₱{selected.fare.senior}</div>
              </div>
            </div>

            <div className="trips-info-row">
              <div className="trips-info-label">{tx.capacity}</div>
              <div className="trips-info-value">24 seats</div>
            </div>

            <div className="trips-info-row">
              <div className="trips-info-label">{tx.schedule}</div>
              <div className="trips-info-value">{selected.firstTrip} – {selected.lastTrip}</div>
            </div>

            <button className="trips-close-btn" onClick={handleClose}>
              {tx.close}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
