import { useState, useMemo } from "react";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Grid, Map, SlidersHorizontal, X, ChevronDown, ArrowUpDown } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { JerseyMap } from "@/components/JerseyMap";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useFavorites } from "@/hooks/useFavorites";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const allProperties = [
  { id: 1, image: property1, price: "£1,250,000", numPrice: 1250000, address: "La Haule Manor, St Brelade", parish: "St Brelade", beds: 5, baths: 3, parking: 2, isNew: true, qualification: "Qualified" as const, agency: "Savills", type: "House" },
  { id: 2, image: property2, price: "£485,000", numPrice: 485000, address: "Rose Cottage, Trinity", parish: "Trinity", beds: 3, baths: 2, parking: 1, hasOpenViewing: true, qualification: "Qualified" as const, agency: "Locate", type: "House" },
  { id: 3, image: property3, price: "£725,000", numPrice: 725000, address: "Harbour View Apartments, St Helier", parish: "St Helier", beds: 2, baths: 2, parking: 1, qualification: "Unqualified" as const, agency: "Broadlands", type: "Flat" },
  { id: 4, image: property4, price: "£895,000", numPrice: 895000, address: "Victoria House, St Helier", parish: "St Helier", beds: 4, baths: 2, parking: 0, isReduced: true, qualification: "Qualified" as const, agency: "Fine & Country", type: "House" },
  { id: 5, image: property1, price: "£395,000", numPrice: 395000, address: "2 Bed Apartment, Havre des Pas", parish: "St Helier", beds: 2, baths: 1, parking: 1, isNew: true, qualification: "Unqualified" as const, agency: "Martel Maides", type: "Flat" },
  { id: 6, image: property2, price: "£675,000", numPrice: 675000, address: "Modern Family Home, St Peter", parish: "St Peter", beds: 4, baths: 2, parking: 2, qualification: "Qualified" as const, agency: "Broadlands", type: "House" },
  { id: 7, image: property3, price: "£1,450,000", numPrice: 1450000, address: "Period Townhouse, Royal Square", parish: "St Helier", beds: 5, baths: 3, parking: 0, hasOpenViewing: true, qualification: "Qualified" as const, agency: "Savills", type: "House" },
  { id: 8, image: property4, price: "£525,000", numPrice: 525000, address: "Character Cottage, St Martin", parish: "St Martin", beds: 3, baths: 2, parking: 1, isReduced: true, qualification: "Qualified" as const, agency: "Locate", type: "House" },
  { id: 9, image: property1, price: "£299,000", numPrice: 299000, address: "Studio Flat, Georgetown", parish: "St Helier", beds: 1, baths: 1, parking: 0, isNew: true, qualification: "Unqualified" as const, agency: "CI Letting", type: "Flat" },
  { id: 10, image: property2, price: "£850,000", numPrice: 850000, address: "Sea View Villa, Grouville", parish: "Grouville", beds: 4, baths: 3, parking: 2, qualification: "Qualified" as const, agency: "Fine & Country", type: "House" },
  { id: 11, image: property3, price: "£620,000", numPrice: 620000, address: "Granite Cottage, St Ouen", parish: "St Ouen", beds: 3, baths: 2, parking: 1, qualification: "Qualified" as const, agency: "Savills", type: "House" },
  { id: 12, image: property4, price: "£450,000", numPrice: 450000, address: "Modern Apartment, St Clement", parish: "St Clement", beds: 2, baths: 1, parking: 1, isNew: true, qualification: "Unqualified" as const, agency: "Locate", type: "Flat" },
];

const parishes = ["All Parishes", "St Helier", "St Brelade", "St Peter", "Grouville", "St Clement", "Trinity", "St John", "St Lawrence", "St Martin", "St Mary", "St Ouen", "St Saviour"];
const propertyTypes = ["All Types", "House", "Flat", "Bungalow", "Land", "Commercial"];
const priceRanges = [
  { label: "Any Price", max: Infinity },
  { label: "Up to £200,000", max: 200000 },
  { label: "Up to £300,000", max: 300000 },
  { label: "Up to £500,000", max: 500000 },
  { label: "Up to £750,000", max: 750000 },
  { label: "Up to £1,000,000", max: 1000000 },
  { label: "£1,000,000+", max: Infinity, min: 1000000 },
];
const sortOptions = ["Newest First", "Price: Low to High", "Price: High to Low", "Beds: Most First"];

// Category theme accents
const categoryThemes: Record<string, { accent: string; label: string; bg: string }> = {
  "for-sale": { accent: "border-t-accent", label: "Properties for Sale", bg: "" },
  "to-rent": { accent: "border-t-teal", label: "Properties to Rent", bg: "bg-teal/[0.02]" },
  "commercial": { accent: "border-t-ocean", label: "Commercial Properties", bg: "bg-ocean/[0.02]" },
  "sold": { accent: "border-t-sand-dark", label: "Sold Properties", bg: "bg-sand-dark/[0.03]" },
  "open-viewings": { accent: "border-t-primary", label: "Open Viewings", bg: "" },
};

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedParish, setSelectedParish] = useState(searchParams.get("parish") || "All Parishes");
  const [selectedBeds, setSelectedBeds] = useState(searchParams.get("beds") || "Any Beds");
  const [selectedPrice, setSelectedPrice] = useState("Any Price");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedSort, setSelectedSort] = useState("Newest First");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Determine category from path or param
  const pathType = location.pathname.replace("/", "") || "";
  const searchType = pathType && pathType !== "search"
    ? pathType
    : searchParams.get("type") || "for-sale";
  const filterChip = searchParams.get("filter");
  const theme = categoryThemes[searchType] || categoryThemes["for-sale"];

  // Active filter count
  const activeFilters = [
    selectedParish !== "All Parishes",
    selectedBeds !== "Any Beds",
    selectedPrice !== "Any Price",
    selectedType !== "All Types",
    !!filterChip,
  ].filter(Boolean).length;

  // Filter + sort
  const filteredProperties = useMemo(() => {
    let result = allProperties.filter((prop) => {
      if (selectedParish !== "All Parishes" && prop.parish !== selectedParish) return false;
      if (selectedBeds !== "Any Beds") {
        const minBeds = parseInt(selectedBeds);
        if (prop.beds < minBeds) return false;
      }
      if (selectedPrice !== "Any Price") {
        const range = priceRanges.find((r) => r.label === selectedPrice);
        if (range) {
          if (range.min && prop.numPrice < range.min) return false;
          if (range.max !== Infinity && prop.numPrice > range.max) return false;
        }
      }
      if (selectedType !== "All Types" && prop.type !== selectedType) return false;
      if (filterChip === "Open Viewings" && !prop.hasOpenViewing) return false;
      if (filterChip === "New Listings" && !prop.isNew) return false;
      return true;
    });

    // Sort
    switch (selectedSort) {
      case "Price: Low to High":
        result = [...result].sort((a, b) => a.numPrice - b.numPrice);
        break;
      case "Price: High to Low":
        result = [...result].sort((a, b) => b.numPrice - a.numPrice);
        break;
      case "Beds: Most First":
        result = [...result].sort((a, b) => b.beds - a.beds);
        break;
    }

    return result;
  }, [selectedParish, selectedBeds, selectedPrice, selectedType, selectedSort, filterChip]);

  const resetFilters = () => {
    setSelectedParish("All Parishes");
    setSelectedBeds("Any Beds");
    setSelectedPrice("Any Price");
    setSelectedType("All Types");
    const params = new URLSearchParams();
    if (searchType !== "for-sale") params.set("type", searchType);
    setSearchParams(params);
  };

  return (
    <div className={`min-h-screen bg-background ${theme.bg}`}>
      <Header />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Search Summary Bar with category accent */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`sticky top-16 z-40 bg-card rounded-xl shadow-card p-4 mb-6 border border-border border-t-4 ${theme.accent}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-semibold text-foreground">{theme.label}</h1>
                <span className="text-sm text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
                  {filteredProperties.length} found
                </span>
                {activeFilters > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-accent hover:underline flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear {activeFilters} filter{activeFilters > 1 ? "s" : ""}
                  </button>
                )}
                {filterChip && (
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium flex items-center gap-1">
                    {filterChip}
                    <button onClick={() => { searchParams.delete("filter"); setSearchParams(searchParams); }}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative hidden sm:block">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="h-10 pl-3 pr-8 rounded-lg border border-border bg-background text-sm appearance-none"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                <div className="flex bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-card shadow-sm" : ""}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("map")}
                    className={`p-2 rounded-md transition-colors ${viewMode === "map" ? "bg-card shadow-sm" : ""}`}
                  >
                    <Map className="w-4 h-4" />
                  </button>
                </div>

                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden gap-2">
                      <SlidersHorizontal className="w-4 h-4" />
                      Filters
                      {activeFilters > 0 && (
                        <span className="bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {activeFilters}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <FilterGroup label="Parish" value={selectedParish} options={parishes} onChange={setSelectedParish} />
                      <FilterGroup label="Bedrooms" value={selectedBeds} options={["Any Beds", "1+ Beds", "2+ Beds", "3+ Beds", "4+ Beds", "5+ Beds"]} onChange={setSelectedBeds} />
                      <FilterGroup label="Price Range" value={selectedPrice} options={priceRanges.map((r) => r.label)} onChange={setSelectedPrice} />
                      <FilterGroup label="Property Type" value={selectedType} options={propertyTypes} onChange={setSelectedType} />
                      <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex-1" onClick={resetFilters}>Reset</Button>
                        <Button className="flex-1" onClick={() => setFiltersOpen(false)}>Apply</Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            {viewMode === "grid" && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-36 bg-card rounded-xl shadow-card p-5 border border-border space-y-6">
                  <h3 className="font-semibold text-foreground">Filters</h3>
                  <FilterGroup label="Parish" value={selectedParish} options={parishes} onChange={setSelectedParish} />
                  <FilterGroup label="Bedrooms" value={selectedBeds} options={["Any Beds", "1+ Beds", "2+ Beds", "3+ Beds", "4+ Beds", "5+ Beds"]} onChange={setSelectedBeds} />
                  <FilterGroup label="Price Range" value={selectedPrice} options={priceRanges.map((r) => r.label)} onChange={setSelectedPrice} />
                  <FilterGroup label="Property Type" value={selectedType} options={propertyTypes} onChange={setSelectedType} />
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={resetFilters}>Reset</Button>
                  </div>
                </div>
              </aside>
            )}

            {/* Results */}
            <div className="flex-1">
              {viewMode === "grid" ? (
                <>
                  {filteredProperties.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-lg text-muted-foreground mb-4">No properties match your filters</p>
                      <Button variant="outline" onClick={resetFilters}>Clear Filters</Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredProperties.map((property, index) => (
                        <motion.div
                          key={property.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <Link to={`/property/${property.id}`}>
                            <PropertyCard
                              {...property}
                              isSaved={isFavorite(property.id)}
                              onToggleSave={toggleFavorite}
                            />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <JerseyMap
                  properties={filteredProperties.map((p) => ({
                    id: p.id,
                    lat: 0,
                    lng: 0,
                    price: p.price,
                    address: p.address,
                    parish: p.parish,
                    beds: p.beds,
                    baths: p.baths,
                    image: p.image,
                  }))}
                  onPropertyClick={(id) => {}}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FilterGroup({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 pl-3 pr-8 rounded-lg border border-border bg-background text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}
