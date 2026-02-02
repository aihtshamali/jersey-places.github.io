import { motion } from "framer-motion";
import { Grid, Map } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PropertyCard } from "./PropertyCard";
import { Button } from "@/components/ui/button";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const latestListings = [
  {
    id: 1,
    image: property3,
    price: "£395,000",
    address: "2 Bed Apartment, Havre des Pas",
    parish: "St Helier",
    beds: 2,
    baths: 1,
    parking: 1,
    isNew: true,
    qualification: "Unqualified" as const,
    agency: "Martel Maides",
  },
  {
    id: 2,
    image: property1,
    price: "£675,000",
    address: "Modern Family Home, St Peter",
    parish: "St Peter",
    beds: 4,
    baths: 2,
    parking: 2,
    qualification: "Qualified" as const,
    agency: "Broadlands",
  },
  {
    id: 3,
    image: property4,
    price: "£1,450,000",
    address: "Period Townhouse, Royal Square",
    parish: "St Helier",
    beds: 5,
    baths: 3,
    parking: 0,
    hasOpenViewing: true,
    qualification: "Qualified" as const,
    agency: "Savills",
  },
  {
    id: 4,
    image: property2,
    price: "£525,000",
    address: "Character Cottage, St Martin",
    parish: "St Martin",
    beds: 3,
    baths: 2,
    parking: 1,
    isReduced: true,
    qualification: "Qualified" as const,
    agency: "Locate",
  },
  {
    id: 5,
    image: property1,
    price: "£299,000",
    address: "Studio Flat, Georgetown",
    parish: "St Helier",
    beds: 1,
    baths: 1,
    parking: 0,
    isNew: true,
    qualification: "Unqualified" as const,
    agency: "CI Letting",
  },
  {
    id: 6,
    image: property3,
    price: "£850,000",
    address: "Sea View Villa, Grouville",
    parish: "Grouville",
    beds: 4,
    baths: 3,
    parking: 2,
    qualification: "Qualified" as const,
    agency: "Fine & Country",
  },
];

export function LatestListings() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Just Added
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-1">
              Latest Properties
            </h2>
            <p className="text-muted-foreground mt-2">
              Fresh listings from across the island
            </p>
          </motion.div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="gap-2"
            >
              <Grid className="w-4 h-4" />
              Grid
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="gap-2"
            >
              <Map className="w-4 h-4" />
              Map
            </Button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/property/${listing.id}`}>
                  <PropertyCard {...listing} />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Map View Placeholder */}
        {viewMode === "map" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[500px] rounded-2xl bg-muted flex items-center justify-center"
          >
            <div className="text-center text-muted-foreground">
              <Map className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">Map View</p>
              <p className="text-sm">Interactive map coming soon</p>
            </div>
          </motion.div>
        )}

        {/* Load More */}
        <div className="text-center mt-10">
          <Link to="/search">
            <Button className="rounded-full px-8">
              Load More Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
