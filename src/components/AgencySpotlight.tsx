import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "./PropertyCard";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";

const spotlightAgency = {
  name: "Broadlands Estate Agents",
  logo: "B",
  description: "Established in 1976, Broadlands is one of Jersey's most trusted estate agencies, specializing in premium residential and commercial properties across all parishes.",
  location: "St Helier",
  phone: "+44 1534 880100",
  propertyCount: 127,
  featuredListings: [
    {
      id: 1,
      image: property1,
      price: "£1,150,000",
      address: "Waterside Villa, St Brelade",
      parish: "St Brelade",
      beds: 4,
      baths: 3,
      parking: 2,
      qualification: "Qualified" as const,
    },
    {
      id: 2,
      image: property2,
      price: "£595,000",
      address: "Granite Farmhouse, St Mary",
      parish: "St Mary",
      beds: 3,
      baths: 2,
      parking: 2,
      isNew: true,
      qualification: "Qualified" as const,
    },
  ],
};

export function AgencySpotlight() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Agency Spotlight
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-1">
            Featured Agency
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Agency Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-2xl p-6 shadow-card h-full">
              {/* Logo and Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-2xl">
                    {spotlightAgency.logo}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    {spotlightAgency.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Building2 className="w-3.5 h-3.5" />
                    {spotlightAgency.propertyCount} properties
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {spotlightAgency.description}
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  {spotlightAgency.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  {spotlightAgency.phone}
                </div>
              </div>

              {/* CTA */}
              <Link to="/agency/1">
                <Button className="w-full gap-2">
                  View All Properties
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Featured Properties */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {spotlightAgency.featuredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/property/${listing.id}`}>
                  <PropertyCard {...listing} agency={spotlightAgency.name} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Agencies */}
        <div className="text-center mt-10">
          <Link to="/agencies">
            <Button variant="outline" className="rounded-full px-8 gap-2">
              Browse All Agencies
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
