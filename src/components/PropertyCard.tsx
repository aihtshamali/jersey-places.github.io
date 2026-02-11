import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Bed, Bath, Car, MapPin, Check } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  id?: number;
  image: string;
  price: string;
  address: string;
  parish: string;
  beds: number;
  baths: number;
  parking: number;
  isNew?: boolean;
  isReduced?: boolean;
  hasOpenViewing?: boolean;
  qualification?: "Qualified" | "Unqualified";
  agency?: string;
  isSaved?: boolean;
  onToggleSave?: (id: number) => void;
}

export function PropertyCard({
  id,
  image,
  price,
  address,
  parish,
  beds,
  baths,
  parking,
  isNew,
  isReduced,
  hasOpenViewing,
  qualification,
  agency,
  isSaved = false,
  onToggleSave,
}: PropertyCardProps) {
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleSave && id !== undefined) {
      onToggleSave(id);
      if (!isSaved) {
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 1200);
      }
    }
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={address}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {isNew && (
            <span className="px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
              New
            </span>
          )}
          {isReduced && (
            <span className="px-2.5 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-semibold">
              Reduced
            </span>
          )}
          {hasOpenViewing && (
            <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              Open Viewing
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleSave}
            className="w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors relative overflow-hidden"
            aria-label="Save property"
          >
            <AnimatePresence mode="wait">
              {justSaved ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Check className="w-4 h-4 text-accent" />
                </motion.div>
              ) : (
                <motion.div key="heart" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isSaved ? "fill-destructive text-destructive" : "text-muted-foreground"
                    }`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Ripple effect on save */}
            <AnimatePresence>
              {justSaved && (
                <motion.span
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{}}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-full bg-accent"
                />
              )}
            </AnimatePresence>
          </button>
          <button
            className="w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
            aria-label="Share property"
          >
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Qualification Badge */}
        {qualification && (
          <div className="absolute bottom-3 left-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                qualification === "Qualified"
                  ? "bg-teal/20 text-teal backdrop-blur-sm"
                  : "bg-sand-dark/80 text-slate backdrop-blur-sm"
              }`}
            >
              {qualification}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xl font-bold text-foreground">{price}</span>
          {agency && (
            <span className="text-xs text-muted-foreground">{agency}</span>
          )}
        </div>
        <h3 className="font-medium text-foreground mb-1 line-clamp-1">{address}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3.5 h-3.5" />
          {parish}
        </div>
        <div className="flex items-center gap-4 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bed className="w-4 h-4" />
            <span className="text-sm">{beds}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{baths}</span>
          </div>
          {parking > 0 && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Car className="w-4 h-4" />
              <span className="text-sm">{parking}</span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
