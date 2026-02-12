import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Bath, MapPin, Heart, ExternalLink } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./leaflet-markers.css";
import { Link } from "react-router-dom";

interface MapProperty {
  id: number;
  lat: number;
  lng: number;
  price: string;
  address: string;
  parish: string;
  beds: number;
  baths: number;
  image: string;
}

interface JerseyMapProps {
  properties: MapProperty[];
  onPropertyClick?: (id: number) => void;
}

// Realistic Jersey parish coordinates
const parishCoords: Record<string, { lat: number; lng: number }> = {
  "St Helier": { lat: 49.1858, lng: -2.1057 },
  "St Brelade": { lat: 49.1843, lng: -2.1928 },
  "St Peter": { lat: 49.2050, lng: -2.1678 },
  "St Ouen": { lat: 49.2264, lng: -2.2350 },
  "St Mary": { lat: 49.2280, lng: -2.1780 },
  "St John": { lat: 49.2310, lng: -2.1290 },
  "Trinity": { lat: 49.2270, lng: -2.0800 },
  "St Martin": { lat: 49.2060, lng: -2.0320 },
  "Grouville": { lat: 49.1900, lng: -2.0340 },
  "St Clement": { lat: 49.1780, lng: -2.0680 },
  "St Saviour": { lat: 49.2000, lng: -2.0920 },
  "St Lawrence": { lat: 49.2100, lng: -2.1500 },
};

function getPropertyCoords(prop: MapProperty): { lat: number; lng: number } {
  const base = parishCoords[prop.parish] || { lat: 49.2100, lng: -2.1300 };
  // Deterministic jitter based on id
  const jitterLat = ((prop.id * 17) % 11 - 5) * 0.002;
  const jitterLng = ((prop.id * 13) % 11 - 5) * 0.003;
  return { lat: base.lat + jitterLat, lng: base.lng + jitterLng };
}

export function JerseyMap({ properties, onPropertyClick }: JerseyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<number, L.Marker>>({});
  const lineRef = useRef<L.Polyline | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const suggestedRef = useRef<HTMLDivElement>(null);

  // Init map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [49.2100, -2.1300],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    // Satellite-style tiles (Esri World Imagery)
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19 }
    ).addTo(map);

    // Road labels overlay
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, opacity: 0.7 }
    ).addTo(map);

    // Place name labels
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, opacity: 0.8 }
    ).addTo(map);

    // Zoom control bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Attribution small
    L.control.attribution({ position: "bottomleft", prefix: false }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Add markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    properties.forEach((prop) => {
      const coords = getPropertyCoords(prop);

      const priceIcon = L.divIcon({
        className: "jersey-price-marker",
        html: `<div class="price-pill" data-id="${prop.id}"><span>${prop.price}</span></div>`,
        iconSize: [0, 0],
        iconAnchor: [50, 40],
      });

      const marker = L.marker([coords.lat, coords.lng], { icon: priceIcon }).addTo(map);

      marker.on("click", () => {
        setSelectedId((prev) => (prev === prop.id ? null : prop.id));
        onPropertyClick?.(prop.id);
      });

      markersRef.current[prop.id] = marker;
    });
  }, [properties, onPropertyClick]);

  // Highlight hovered marker + draw line
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old line
    if (lineRef.current) {
      lineRef.current.remove();
      lineRef.current = null;
    }

    // Reset all markers
    document.querySelectorAll(".price-pill").forEach((el) => {
      el.classList.remove("hovered");
    });

    if (hoveredId !== null) {
      // Highlight marker
      const pill = document.querySelector(`.price-pill[data-id="${hoveredId}"]`);
      if (pill) pill.classList.add("hovered");

      // Draw line from bottom of map to marker
      const prop = properties.find((p) => p.id === hoveredId);
      if (prop) {
        const coords = getPropertyCoords(prop);
        const mapBounds = map.getBounds();
        const bottomCenter = L.latLng(mapBounds.getSouth(), coords.lng);

        lineRef.current = L.polyline(
          [bottomCenter, [coords.lat, coords.lng]],
          {
            color: "hsl(175, 35%, 45%)",
            weight: 2,
            opacity: 0.8,
            dashArray: "6, 6",
            className: "hover-line-animation",
          }
        ).addTo(map);
      }
    }
  }, [hoveredId, properties]);

  // Highlight selected marker
  useEffect(() => {
    document.querySelectorAll(".price-pill").forEach((el) => {
      el.classList.toggle("selected", el.getAttribute("data-id") === String(selectedId));
    });
  }, [selectedId]);

  const selectedProp = properties.find((p) => p.id === selectedId);

  return (
    <div className="flex flex-col gap-0 rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
      {/* Map */}
      <div className="relative w-full h-[500px] lg:h-[600px]">
        <div ref={mapContainerRef} className="absolute inset-0 z-0" />

        {/* Selected property popup */}
        <AnimatePresence>
          {selectedProp && (
            <motion.div
              key={selectedProp.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-[1000]"
            >
              <Link
                to={`/property/${selectedProp.id}`}
                className="block bg-card rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative">
                  <img
                    src={selectedProp.image}
                    alt={selectedProp.address}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm rounded-full p-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-foreground" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-bold text-lg text-foreground">{selectedProp.price}</p>
                  <p className="text-sm text-muted-foreground truncate">{selectedProp.address}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{selectedProp.beds} beds</span>
                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{selectedProp.baths} baths</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{selectedProp.parish}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map legend */}
        <div className="absolute top-3 left-3 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-border text-xs text-muted-foreground z-[1000] shadow-md">
          <span className="font-semibold text-foreground">Jersey</span>
          <span className="ml-2">{properties.length} properties</span>
        </div>
      </div>

      {/* Suggested Properties Strip */}
      <div className="border-t border-border bg-card">
        <div className="px-4 py-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Nearby Properties</h3>
          <span className="text-xs text-muted-foreground">Hover to locate on map</span>
        </div>
        <div
          ref={suggestedRef}
          className="flex gap-3 px-4 pb-4 overflow-x-auto scrollbar-thin"
        >
          {properties.slice(0, 8).map((prop) => (
            <motion.div
              key={prop.id}
              onMouseEnter={() => setHoveredId(prop.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                setSelectedId(prop.id);
                // Pan map to property
                const coords = getPropertyCoords(prop);
                mapRef.current?.panTo([coords.lat, coords.lng], { animate: true });
              }}
              whileHover={{ y: -4 }}
              className={`flex-shrink-0 w-56 rounded-lg border overflow-hidden cursor-pointer transition-all duration-200 ${
                hoveredId === prop.id || selectedId === prop.id
                  ? "border-accent shadow-md ring-1 ring-accent/30"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <div className="relative h-28">
                <img
                  src={prop.image}
                  alt={prop.address}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1.5 left-1.5 bg-card/90 backdrop-blur-sm rounded-md px-2 py-0.5 text-xs font-bold text-foreground">
                  {prop.price}
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-xs text-foreground font-medium truncate">{prop.address}</p>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-1">
                  <span>{prop.beds} bed</span>
                  <span>·</span>
                  <span>{prop.baths} bath</span>
                  <span>·</span>
                  <span>{prop.parish}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
