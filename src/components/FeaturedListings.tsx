import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { PropertyCard } from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const featuredListings = [
  {
    id: 1,
    image: property1,
    price: "£1,250,000",
    address: "La Haule Manor, St Brelade",
    parish: "St Brelade",
    beds: 5,
    baths: 3,
    parking: 2,
    isNew: true,
    qualification: "Qualified" as const,
    agency: "Savills",
  },
  {
    id: 2,
    image: property2,
    price: "£485,000",
    address: "Rose Cottage, Trinity",
    parish: "Trinity",
    beds: 3,
    baths: 2,
    parking: 1,
    hasOpenViewing: true,
    qualification: "Qualified" as const,
    agency: "Locate",
  },
  {
    id: 3,
    image: property3,
    price: "£725,000",
    address: "Harbour View Apartments, St Helier",
    parish: "St Helier",
    beds: 2,
    baths: 2,
    parking: 1,
    qualification: "Unqualified" as const,
    agency: "Broadlands",
  },
  {
    id: 4,
    image: property4,
    price: "£895,000",
    address: "Victoria House, St Helier",
    parish: "St Helier",
    beds: 4,
    baths: 2,
    parking: 0,
    isReduced: true,
    qualification: "Qualified" as const,
    agency: "Fine & Country",
  },
];

export function FeaturedListings() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background jersey-topo-pattern">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Featured
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-1">
              Premium Listings
            </h2>
          </motion.div>

          {/* Navigation Arrows */}
          <div className="hidden sm:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-[300px] sm:w-[320px] snap-start"
            >
              <Link to={`/property/${listing.id}`}>
                <PropertyCard {...listing} isSaved={isFavorite(listing.id)} onToggleSave={toggleFavorite} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-8">
          <Link to="/search?type=for-sale">
            <Button variant="outline" className="rounded-full px-8">
              View All Featured Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
