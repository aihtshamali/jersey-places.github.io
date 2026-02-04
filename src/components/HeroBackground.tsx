import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import all hero images
import heroStBrelade from "@/assets/hero-st-brelade.jpg";
import heroCorbiere from "@/assets/hero-corbiere.jpg";
import heroStHelier from "@/assets/hero-st-helier.jpg";
import heroGorey from "@/assets/hero-gorey.jpg";

interface HeroScene {
  image: string;
  location: string;
  description: string;
}

const heroScenes: HeroScene[] = [
  {
    image: heroStBrelade,
    location: "St Brelade's Bay",
    description: "Golden sands & crystal waters",
  },
  {
    image: heroCorbiere,
    location: "Corbière Lighthouse",
    description: "Dramatic sunset coastline",
  },
  {
    image: heroStHelier,
    location: "St Helier Harbour",
    description: "Historic waterfront living",
  },
  {
    image: heroGorey,
    location: "Gorey & Mont Orgueil",
    description: "Castle views & village charm",
  },
];

const SLIDE_DURATION = 8000; // 8 seconds per slide for calm pacing

export function HeroBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroScenes.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const currentScene = heroScenes[currentIndex];

  return (
    <>
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 2, ease: "easeInOut" },
              scale: { duration: SLIDE_DURATION / 1000, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <img
              src={currentScene.image}
              alt={currentScene.location}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay - consistent across all scenes */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/80 via-ocean/60 to-ocean-light/50" />
        
        {/* Wave pattern overlay */}
        <div className="absolute inset-0 jersey-wave-pattern opacity-30" />
      </div>

      {/* Location Indicator */}
      <motion.div
        key={`location-${currentIndex}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-6 left-6 z-20 hidden sm:block"
      >
        <div className="flex items-center gap-3 bg-card/20 backdrop-blur-md rounded-full px-4 py-2 border border-primary-foreground/10">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <div className="text-primary-foreground">
            <span className="text-sm font-medium">{currentScene.location}</span>
            <span className="text-primary-foreground/60 text-xs ml-2">
              {currentScene.description}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        {heroScenes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "w-8 bg-primary-foreground"
                : "w-1.5 bg-primary-foreground/40 hover:bg-primary-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}
