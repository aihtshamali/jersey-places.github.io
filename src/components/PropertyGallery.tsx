import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  address: string;
}

export function PropertyGallery({ images, address }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const navigate = (dir: 1 | -1) => {
    setSelectedIndex((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <>
      {/* Main Gallery Grid */}
      <div className="relative grid grid-cols-4 gap-1.5 h-[400px] lg:h-[520px]">
        {/* Main Image */}
        <div
          className="col-span-4 lg:col-span-2 lg:row-span-2 relative cursor-pointer group"
          onClick={() => { setSelectedIndex(0); setLightboxOpen(true); }}
        >
          <img
            src={images[0]}
            alt={`${address} - Main`}
            className="w-full h-full object-cover rounded-l-2xl transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors rounded-l-2xl flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-card opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
          </div>
        </div>

        {/* Thumbnails */}
        {images.slice(1, 5).map((img, i) => (
          <div
            key={i}
            className={`hidden lg:block relative cursor-pointer group overflow-hidden ${
              i === 1 ? "rounded-tr-2xl" : i === 3 ? "rounded-br-2xl" : ""
            }`}
            onClick={() => { setSelectedIndex(i + 1); setLightboxOpen(true); }}
          >
            <img
              src={img}
              alt={`${address} - ${i + 2}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
            {/* Show count on last thumbnail if more images */}
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                <span className="text-card font-bold text-lg">+{images.length - 5} more</span>
              </div>
            )}
          </div>
        ))}

        {/* Mobile swipe hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 lg:hidden flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setSelectedIndex(i); setLightboxOpen(true); }}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === 0 ? "bg-card" : "bg-card/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-card/80 text-sm">
                {selectedIndex + 1} / {images.length}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="text-card/80 hover:text-card p-2 rounded-full hover:bg-card/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center relative px-16">
              <button
                onClick={() => navigate(-1)}
                className="absolute left-2 lg:left-6 text-card/60 hover:text-card p-3 rounded-full hover:bg-card/10 transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={images[selectedIndex]}
                  alt={`${address} - ${selectedIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[80vh] max-w-full object-contain rounded-lg"
                />
              </AnimatePresence>

              <button
                onClick={() => navigate(1)}
                className="absolute right-2 lg:right-6 text-card/60 hover:text-card p-3 rounded-full hover:bg-card/10 transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 justify-center py-4 px-4 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all ${
                    i === selectedIndex
                      ? "ring-2 ring-accent opacity-100 scale-105"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
