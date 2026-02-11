import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Building2, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlassyLogo } from "@/components/GlassyLogo";
import { Input } from "@/components/ui/input";

const agencies = [
  { id: 1, name: "Broadlands Estate Agents", logo: "B", location: "St Helier", properties: 127, rating: 4.8, description: "One of Jersey's most trusted estate agencies since 1976." },
  { id: 2, name: "Savills Jersey", logo: "S", location: "St Helier", properties: 89, rating: 4.9, description: "Global expertise with local knowledge in the Channel Islands." },
  { id: 3, name: "Locate Estate Agents", logo: "L", location: "St Helier", properties: 156, rating: 4.7, description: "Modern approach to property sales and lettings in Jersey." },
  { id: 4, name: "Fine & Country", logo: "F", location: "St Brelade", properties: 64, rating: 4.8, description: "Specialists in premium and luxury properties." },
  { id: 5, name: "Martel Maides", logo: "M", location: "St Helier", properties: 98, rating: 4.6, description: "Channel Islands property experts for over 25 years." },
  { id: 6, name: "CI Letting", logo: "C", location: "St Helier", properties: 203, rating: 4.5, description: "Jersey's largest rental property portfolio." },
  { id: 7, name: "Home Property", logo: "H", location: "St Peter", properties: 45, rating: 4.7, description: "Family-run agency specializing in residential sales." },
  { id: 8, name: "Zephyr Estates", logo: "Z", location: "St Brelade", properties: 32, rating: 4.9, description: "Boutique agency for exclusive coastal properties." },
];

export default function Agencies() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgencies = agencies.filter((agency) =>
    agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agency.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Estate Agencies</h1>
            <p className="text-lg text-muted-foreground">Browse Jersey's verified estate agents.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-md mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search agencies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgencies.map((agency, index) => (
              <motion.div key={agency.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Link to={`/agency/${agency.id}`} className="group block">
                  <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-card-hover transition-all h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <GlassyLogo letter={agency.logo} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">{agency.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {agency.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{agency.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Building2 className="w-4 h-4" />
                        {agency.properties} properties
                      </span>
                      <span className="flex items-center gap-1 text-accent font-medium">
                        <Star className="w-4 h-4 fill-current" />
                        {agency.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredAgencies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No agencies found matching your search.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
