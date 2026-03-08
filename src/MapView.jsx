import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const C = {
  gold: "#F5C518",
  goldDark: "#B7860B",
  lsuGold: "#FDD023",
  lsuPurple: "#461D7C",
};

// ── Map View (Leaflet — Google-style street map with event pins) ───────────────
export function FitBounds({ events, CATEGORIES }) {
  const map = useMap();
  useEffect(() => {
    if (!events.length) return;
    const bounds = L.latLngBounds(events.map((e) => [e.lat, e.lng]));
    map.fitBounds(bounds, { padding: [36, 36], maxZoom: 14 });
  }, [map, events]);
  return null;
}

export function createEventIcon(ev, CATEGORIES) {
  const pinColor = ev.lsu ? C.lsuGold : ev.color;
  const iconChar = CATEGORIES.find((c) => c.id === ev.category)?.icon || "•";
  return L.divIcon({
    className: "geaux-leaflet-marker",
    html: `<div style="width:36px;height:36px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${pinColor};border:2px solid rgba(255,255,255,.9);box-shadow:0 2px 8px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;font-size:16px"><span style="transform:rotate(45deg);display:block">${iconChar}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });
}

export default function MapView({ events, onPick, CATEGORIES }) {
  const mapRef = useRef(null);
  const center = [30.432, -91.14];
  return (
    <div style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: 320 }}>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%", borderRadius: 0 }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds events={events} CATEGORIES={CATEGORIES} />
        {events.map((ev) => (
          <Marker
            key={ev.id}
            position={[ev.lat, ev.lng]}
            icon={createEventIcon(ev, CATEGORIES)}
            eventHandlers={{ click: () => onPick(ev) }}
          >
            <Popup>
              <div style={{ minWidth: 180, padding: 4 }}>
                <div style={{ fontWeight: 700, marginBottom: 4, fontFamily: "'Playfair Display',serif" }}>{ev.title}</div>
                <div style={{ fontSize: 13, color: "#555", marginBottom: 8 }}>📍 {ev.location}</div>
                <div style={{ fontSize: 12, color: ev.lsu ? C.lsuPurple : C.gold }}>{ev.date} · {ev.time}{ev.lsu ? " · 🐯 LSU" : ""}</div>
                <button
                  type="button"
                  onClick={() => onPick(ev)}
                  style={{ marginTop: 10, width: "100%", padding: "8px 12px", background: `linear-gradient(135deg,${C.goldDark},${C.gold})`, border: "none", borderRadius: 10, color: "#0D0120", fontWeight: 700, cursor: "pointer", fontSize: 13 }}
                >
                  View details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, background: "rgba(10,1,25,.93)", borderRadius: 14, border: "1px solid rgba(245,197,24,.18)", padding: "10px 14px", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", zIndex: 1000 }}>
        <span style={{ fontSize: 11, color: C.gold, fontFamily: "monospace", letterSpacing: 1 }}>{events.length} EVENTS</span>
        {CATEGORIES.map((c) => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.id === "tailgate" ? C.lsuGold : c.color }} />
            <span style={{ fontSize: 9, color: "rgba(255,255,255,.45)", fontFamily: "monospace" }}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
