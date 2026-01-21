import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Calendar, MapPin } from "lucide-react";

import property1 from "@/assets/property-1.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const soldProperties = [
  {
    id: 1,
    image: property4,
    soldPrice: "£875,000",
    askingPrice: "£895,000",
    address: "Georgian Terrace, St Helier",
    parish: "St Helier",
    beds: 4,
    soldDate: "Jan 8, 2026",
    daysOnMarket: 42,
  },
  {
    id: 2,
    image: property1,
    soldPrice: "£1,350,000",
    askingPrice: "£1,295,000",
    address: "Oceanfront Villa, St Brelade",
    parish: "St Brelade",
    beds: 5,
    soldDate: "Jan 5, 2026",
    daysOnMarket: 28,
  },
  {
    id: 3,
    image: property3,
    soldPrice: "£425,000",
    askingPrice: "£450,000",
    address: "Marina Apartment, St Helier",
    parish: "St Helier",
    beds: 2,
    soldDate: "Jan 2, 2026",
    daysOnMarket: 63,
  },
];

export function SoldSection() {
  return (
    <section className="py-16 lg:py-24 bg-background jersey-topo-pattern">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Market Activity
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-1">
            Recently Sold
          </h2>
          <p className="text-muted-foreground mt-2">
            Track the latest sales across Jersey's property market
          </p>
        </motion.div>

        {/* Timeline Cards */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-8">
            {soldProperties.map((property, index) => {
              const priceChange = parseInt(property.soldPrice.replace(/[£,]/g, '')) - parseInt(property.askingPrice.replace(/[£,]/g, ''));
              const isOverAsking = priceChange > 0;

              return (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative md:flex md:items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 lg:left-1/2 w-3 h-3 rounded-full bg-accent -translate-x-1/2 hidden md:block" />

                  {/* Card */}
                  <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <div className="bg-card rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow">
                      <div className="flex flex-col sm:flex-row">
                        {/* Image */}
                        <div className="sm:w-40 h-32 sm:h-auto flex-shrink-0">
                          <img
                            src={property.image}
                            alt={property.address}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <span className="text-lg font-bold text-foreground">
                                {property.soldPrice}
                              </span>
                              <span className="text-sm text-muted-foreground ml-2 line-through">
                                {property.askingPrice}
                              </span>
                            </div>
                            <div
                              className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                                isOverAsking
                                  ? "bg-accent/10 text-accent"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {isOverAsking ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {isOverAsking ? "+" : ""}
                              £{Math.abs(priceChange).toLocaleString()}
                            </div>
                          </div>

                          <h3 className="font-medium text-foreground text-sm mb-2">
                            {property.address}
                          </h3>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {property.parish}
                            </span>
                            <span>{property.beds} beds</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {property.soldDate}
                            </span>
                            <span>{property.daysOnMarket} days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
