import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Home, Bed, Bath } from "lucide-react";

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

// Jersey parish approximate centers
const parishCoords: Record<string, { x: number; y: number }> = {
  "St Helier": { x: 52, y: 72 },
  "St Brelade": { x: 25, y: 70 },
  "St Peter": { x: 30, y: 50 },
  "St Ouen": { x: 15, y: 35 },
  "St Mary": { x: 30, y: 25 },
  "St John": { x: 45, y: 20 },
  "Trinity": { x: 60, y: 22 },
  "St Martin": { x: 75, y: 35 },
  "Grouville": { x: 78, y: 55 },
  "St Clement": { x: 65, y: 75 },
  "St Saviour": { x: 55, y: 50 },
  "St Lawrence": { x: 38, y: 45 },
};

export function JerseyMap({ properties, onPropertyClick }: JerseyMapProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Group properties by parish and assign positions
  const pins = properties.map((prop) => {
    const coords = parishCoords[prop.parish] || { x: 50, y: 50 };
    // Add slight jitter so pins don't overlap
    const jitter = (prop.id * 7) % 5;
    return {
      ...prop,
      x: coords.x + jitter - 2.5,
      y: coords.y + jitter - 2.5,
    };
  });

  const selectedProp = pins.find((p) => p.id === selectedId);

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-ocean/5 via-teal/5 to-accent/10 border border-border">
      {/* Ocean background */}
      <div className="absolute inset-0 bg-[hsl(var(--ocean)/0.03)]" />
      
      {/* SVG Jersey Island Shape */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Simplified Jersey island outline */}
        <defs>
          <linearGradient id="islandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--sand))" />
            <stop offset="100%" stopColor="hsl(var(--sand-dark))" />
          </linearGradient>
          <filter id="islandShadow">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.15" />
          </filter>
        </defs>
        
        {/* Jersey Island Shape (simplified polygon) */}
        <path
          d="M10,45 Q12,30 20,22 Q28,15 38,13 Q48,10 58,12 Q68,14 78,20 Q88,28 90,40 Q91,50 88,58 Q84,66 76,72 Q68,78 58,80 Q48,82 38,78 Q28,74 20,68 Q14,60 10,50 Z"
          fill="url(#islandGrad)"
          filter="url(#islandShadow)"
          stroke="hsl(var(--border))"
          strokeWidth="0.5"
        />

        {/* Parish boundary lines (subtle) */}
        <line x1="35" y1="13" x2="38" y2="80" stroke="hsl(var(--border))" strokeWidth="0.2" opacity="0.4" />
        <line x1="50" y1="12" x2="52" y2="80" stroke="hsl(var(--border))" strokeWidth="0.2" opacity="0.4" />
        <line x1="65" y1="15" x2="66" y2="78" stroke="hsl(var(--border))" strokeWidth="0.2" opacity="0.4" />
        <line x1="12" y1="45" x2="90" y2="45" stroke="hsl(var(--border))" strokeWidth="0.2" opacity="0.4" />
        <line x1="15" y1="60" x2="85" y2="62" stroke="hsl(var(--border))" strokeWidth="0.2" opacity="0.4" />

        {/* Parish labels */}
        {Object.entries(parishCoords).map(([parish, coords]) => (
          <text
            key={parish}
            x={coords.x}
            y={coords.y - 4}
            textAnchor="middle"
            className="fill-muted-foreground text-[2px] font-medium select-none pointer-events-none"
          >
            {parish}
          </text>
        ))}
      </svg>

      {/* Property Pins */}
      {pins.map((pin) => (
        <motion.button
          key={pin.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: pin.id * 0.05, type: "spring", stiffness: 300 }}
          className={`absolute z-10 transform -translate-x-1/2 -translate-y-full transition-all ${
            hoveredId === pin.id || selectedId === pin.id ? "z-20" : ""
          }`}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          onMouseEnter={() => setHoveredId(pin.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => {
            setSelectedId(selectedId === pin.id ? null : pin.id);
            onPropertyClick?.(pin.id);
          }}
        >
          {/* Pin */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            className={`relative flex items-center gap-1 px-2 py-1 rounded-full shadow-md text-xs font-bold whitespace-nowrap transition-colors ${
              selectedId === pin.id
                ? "bg-accent text-accent-foreground"
                : "bg-card text-foreground border border-border"
            }`}
          >
            <Home className="w-3 h-3" />
            {pin.price}
          </motion.div>
          {/* Pin tail */}
          <div
            className={`w-2 h-2 mx-auto -mt-0.5 rotate-45 ${
              selectedId === pin.id ? "bg-accent" : "bg-card border-r border-b border-border"
            }`}
          />
        </motion.button>
      ))}

      {/* Selected Property Card */}
      {selectedProp && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-card rounded-xl shadow-lg border border-border overflow-hidden z-30"
        >
          <div className="flex">
            <img
              src={selectedProp.image}
              alt={selectedProp.address}
              className="w-24 h-24 object-cover flex-shrink-0"
            />
            <div className="p-3 flex-1 min-w-0">
              <p className="font-bold text-foreground">{selectedProp.price}</p>
              <p className="text-sm text-foreground truncate">{selectedProp.address}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{selectedProp.beds}</span>
                <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{selectedProp.baths}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{selectedProp.parish}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Jersey Island</span>
        <span className="ml-2">{properties.length} properties</span>
      </div>
    </div>
  );
}
