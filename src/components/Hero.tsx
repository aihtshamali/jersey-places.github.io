import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/jersey-hero.jpg";

const searchTabs = ["For Sale", "To Rent", "Commercial"];
const quickChips = [
  "Open Viewings",
  "New Listings",
  "Under £300k",
  "Family Homes",
  "Sea Views",
  "Pet Friendly",
];

const parishes = [
  "All Parishes",
  "St Helier",
  "St Brelade",
  "St Peter",
  "Grouville",
  "St Clement",
  "Trinity",
  "St John",
  "St Lawrence",
  "St Martin",
  "St Mary",
  "St Ouen",
  "St Saviour",
];

export function Hero() {
  const [activeTab, setActiveTab] = useState("For Sale");
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Jersey coastline"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/80 via-ocean/60 to-ocean-light/50" />
        {/* Wave pattern overlay */}
        <div className="absolute inset-0 jersey-wave-pattern opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 tracking-tight">
            Find your place in Jersey
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Discover properties across the island with verified listings from Jersey's trusted agents
          </p>
        </motion.div>

        {/* Search Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-border">
              {searchTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-4 text-sm font-medium transition-colors relative ${
                    activeTab === tab
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                {/* Location */}
                <div className="relative">
                  <select className="w-full h-12 pl-4 pr-10 rounded-xl border border-border bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-ring">
                    {parishes.map((parish) => (
                      <option key={parish} value={parish}>
                        {parish}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Bedrooms */}
                <div className="relative">
                  <select className="w-full h-12 pl-4 pr-10 rounded-xl border border-border bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Any Beds</option>
                    <option>1+ Beds</option>
                    <option>2+ Beds</option>
                    <option>3+ Beds</option>
                    <option>4+ Beds</option>
                    <option>5+ Beds</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Price Range */}
                <div className="relative">
                  <select className="w-full h-12 pl-4 pr-10 rounded-xl border border-border bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Any Price</option>
                    <option>Up to £200,000</option>
                    <option>Up to £300,000</option>
                    <option>Up to £500,000</option>
                    <option>Up to £750,000</option>
                    <option>Up to £1,000,000</option>
                    <option>£1,000,000+</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Search Button */}
                <Button className="h-12 text-base gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>

              {/* Advanced Toggle */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Advanced Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showAdvanced ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Advanced Filters */}
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                  <div className="relative">
                    <select className="w-full h-10 pl-3 pr-8 rounded-lg border border-border bg-background text-sm appearance-none">
                      <option>Property Type</option>
                      <option>House</option>
                      <option>Flat</option>
                      <option>Bungalow</option>
                      <option>Land</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select className="w-full h-10 pl-3 pr-8 rounded-lg border border-border bg-background text-sm appearance-none">
                      <option>Qualification</option>
                      <option>Qualified</option>
                      <option>Unqualified</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <Input placeholder="Min sqft" className="h-10" />
                  <Input placeholder="Max sqft" className="h-10" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Quick Chips */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {quickChips.map((chip) => (
              <button
                key={chip}
                className="px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground text-sm font-medium hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20"
              >
                {chip}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-12 text-primary-foreground"
        >
          <div className="text-center">
            <div className="text-3xl font-bold">1,247</div>
            <div className="text-sm text-primary-foreground/70">Properties for Sale</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">328</div>
            <div className="text-sm text-primary-foreground/70">Properties to Rent</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">52</div>
            <div className="text-sm text-primary-foreground/70">Trusted Agencies</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
