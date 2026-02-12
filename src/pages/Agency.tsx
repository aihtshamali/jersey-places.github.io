import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Clock, Building2, Users, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { GlassyLogo } from "@/components/GlassyLogo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavorites } from "@/hooks/useFavorites";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const agencyData = {
  id: 1,
  name: "Broadlands Estate Agents",
  logo: "B",
  tagline: "Jersey's Premier Property Specialists Since 1976",
  description: `Established in 1976, Broadlands is one of Jersey's most trusted and respected estate agencies. We specialize in premium residential and commercial properties across all twelve parishes of the island.

Our experienced team of local experts provides a comprehensive service covering sales, lettings, property management, and valuations. With nearly five decades of experience in the Jersey property market, we have an unrivaled understanding of local trends, pricing, and regulations.

We pride ourselves on our personal approach, treating every client as an individual and every property as unique. Our extensive network and marketing reach ensure maximum exposure for your property.`,
  stats: {
    properties: 127,
    soldThisYear: 89,
    avgDaysToSell: 34,
    rating: 4.8,
  },
  contact: {
    address: "23 Broad Street, St Helier, JE2 3RR",
    phone: "+44 1534 880100",
    email: "info@broadlands.je",
    website: "www.broadlands.je",
    hours: "Mon-Fri 9am-5:30pm, Sat 10am-2pm",
  },
  team: [
    { name: "Sarah Mitchell", role: "Director", image: property1 },
    { name: "James Thompson", role: "Sales Manager", image: property2 },
    { name: "Emma Williams", role: "Lettings Manager", image: property3 },
    { name: "Mark Roberts", role: "Senior Negotiator", image: property4 },
  ],
};

const agencyProperties = [
  { id: 1, image: property1, price: "£1,150,000", address: "Waterside Villa, St Brelade", parish: "St Brelade", beds: 4, baths: 3, parking: 2, qualification: "Qualified" as const },
  { id: 2, image: property2, price: "£595,000", address: "Granite Farmhouse, St Mary", parish: "St Mary", beds: 3, baths: 2, parking: 2, isNew: true, qualification: "Qualified" as const },
  { id: 3, image: property3, price: "£485,000", address: "Modern Apartment, St Helier", parish: "St Helier", beds: 2, baths: 2, parking: 1, qualification: "Unqualified" as const },
  { id: 4, image: property4, price: "£875,000", address: "Family Home, St Peter", parish: "St Peter", beds: 4, baths: 2, parking: 2, hasOpenViewing: true, qualification: "Qualified" as const },
  { id: 5, image: property1, price: "£325,000", address: "Studio Flat, Georgetown", parish: "St Helier", beds: 1, baths: 1, parking: 0, isNew: true, qualification: "Unqualified" as const },
  { id: 6, image: property2, price: "£1,850,000", address: "Coastal Estate, Grouville", parish: "Grouville", beds: 6, baths: 4, parking: 3, qualification: "Qualified" as const },
];

const testimonials = [
  { name: "John & Sarah T.", text: "Broadlands made selling our home a breeze. Professional, knowledgeable, and always available.", rating: 5 },
  { name: "Michael P.", text: "Found our dream home through Broadlands. The team went above and beyond.", rating: 5 },
  { name: "Claire M.", text: "Excellent service from start to finish. Highly recommend for anyone looking in Jersey.", rating: 5 },
];

export default function Agency() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("properties");
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16">
        {/* Hero */}
        <div className="bg-primary text-primary-foreground py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row items-start gap-8"
            >
              <GlassyLogo letter={agencyData.logo} size="xl" />
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{agencyData.name}</h1>
                <p className="text-primary-foreground/80 text-lg mb-6">{agencyData.tagline}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">{agencyData.stats.properties}</div>
                    <div className="text-sm text-primary-foreground/70">Active Listings</div>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">{agencyData.stats.soldThisYear}</div>
                    <div className="text-sm text-primary-foreground/70">Sold This Year</div>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">{agencyData.stats.avgDaysToSell}</div>
                    <div className="text-sm text-primary-foreground/70">Avg Days to Sell</div>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold flex items-center justify-center gap-1">
                      {agencyData.stats.rating}
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div className="text-sm text-primary-foreground/70">Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="properties">Properties ({agencyData.stats.properties})</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="properties">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {agencyProperties.map((property, index) => (
                      <motion.div
                        key={property.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link to={`/property/${property.id}`}>
                          <PropertyCard {...property} agency={agencyData.name} isSaved={isFavorite(property.id)} onToggleSave={toggleFavorite} />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <Button variant="outline" className="rounded-full px-8">Load More Properties</Button>
                  </div>
                </TabsContent>

                <TabsContent value="about">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose max-w-none">
                    <div className="bg-card rounded-2xl p-6 border border-border whitespace-pre-line text-muted-foreground">
                      {agencyData.description}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="team">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {agencyData.team.map((member, index) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="aspect-square rounded-2xl overflow-hidden mb-3">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-semibold text-foreground">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="space-y-4">
                    {testimonials.map((review, index) => (
                      <motion.div
                        key={review.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card rounded-2xl p-6 border border-border"
                      >
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                          ))}
                        </div>
                        <p className="text-foreground mb-3">"{review.text}"</p>
                        <p className="text-sm text-muted-foreground">{review.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 bg-card rounded-2xl shadow-card p-6 border border-border space-y-5"
              >
                <h3 className="font-semibold text-foreground text-lg">Contact Us</h3>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{agencyData.contact.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <a href={`tel:${agencyData.contact.phone}`} className="text-foreground hover:text-accent transition-colors">
                      {agencyData.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <a href={`mailto:${agencyData.contact.email}`} className="text-foreground hover:text-accent transition-colors">
                      {agencyData.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <a href={`https://${agencyData.contact.website}`} target="_blank" rel="noopener" className="text-foreground hover:text-accent transition-colors">
                      {agencyData.contact.website}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{agencyData.contact.hours}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <Button className="w-full gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
