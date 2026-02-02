import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Share2, Bed, Bath, Car, MapPin, Calendar, Phone, Mail, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const propertyData = {
  id: 1,
  images: [property1, property2, property3, property4],
  price: "£1,250,000",
  address: "La Haule Manor",
  parish: "St Brelade",
  beds: 5,
  baths: 3,
  parking: 2,
  sqft: 3200,
  qualification: "Qualified",
  description: `A stunning period manor house set in beautiful mature gardens with panoramic views across St Brelade's Bay. This exceptional property has been meticulously restored while retaining many original features including ornate cornicing, sash windows, and marble fireplaces.

The accommodation is arranged over three floors and includes a grand entrance hall, formal drawing room, dining room, modern fitted kitchen with adjoining family room, five double bedrooms (master with en-suite), three bathrooms, and a self-contained annexe perfect for guests or staff.

Outside, the property benefits from sweeping lawns, established planting, a heated swimming pool, and a detached double garage. The location offers easy access to the beach, local restaurants, and excellent schools.`,
  features: [
    "Sea Views", "Swimming Pool", "Mature Gardens", "Period Features",
    "Double Garage", "Self-contained Annexe", "Recently Renovated", "South Facing"
  ],
  agency: {
    name: "Savills Jersey",
    logo: "S",
    phone: "+44 1534 877777",
    email: "jersey@savills.com",
    agent: "James Mitchell",
  },
  listedDate: "15 Dec 2025",
  viewings: "By appointment only",
};

const similarProperties = [
  { id: 2, image: property2, price: "£1,150,000", address: "Waterside Villa", parish: "St Brelade", beds: 4, baths: 3, parking: 2, qualification: "Qualified" as const, agency: "Broadlands" },
  { id: 3, image: property3, price: "£985,000", address: "Coastal House", parish: "St Brelade", beds: 4, baths: 2, parking: 2, qualification: "Qualified" as const, agency: "Locate" },
  { id: 4, image: property4, price: "£1,450,000", address: "Beach House", parish: "St Brelade", beds: 5, baths: 4, parking: 3, isNew: true, qualification: "Qualified" as const, agency: "Savills" },
];

export default function PropertyDetail() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: `I'm interested in ${propertyData.address}, ${propertyData.parish}. Please contact me with more details.` });

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % propertyData.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + propertyData.images.length) % propertyData.images.length);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Fullscreen Gallery */}
      {showGallery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <button onClick={() => setShowGallery(false)} className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full">
            <X className="w-6 h-6" />
          </button>
          <button onClick={prevImage} className="absolute left-4 text-white p-3 hover:bg-white/10 rounded-full">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img src={propertyData.images[currentImage]} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
          <button onClick={nextImage} className="absolute right-4 text-white p-3 hover:bg-white/10 rounded-full">
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-4 flex gap-2">
            {propertyData.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2 h-2 rounded-full ${i === currentImage ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </motion.div>
      )}

      <main className="pb-16">
        {/* Image Gallery */}
        <div className="relative">
          <div className="grid grid-cols-4 gap-1 h-[400px] lg:h-[500px]">
            <div className="col-span-4 lg:col-span-2 lg:row-span-2 relative">
              <img src={propertyData.images[0]} alt="" className="w-full h-full object-cover" />
            </div>
            {propertyData.images.slice(1, 5).map((img, i) => (
              <div key={i} className="hidden lg:block relative">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowGallery(true)}
            className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-card transition-colors"
          >
            <Expand className="w-4 h-4" />
            View All Photos
          </button>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      propertyData.qualification === "Qualified" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                    }`}>
                      {propertyData.qualification}
                    </span>
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{propertyData.price}</h1>
                    <p className="text-lg text-foreground">{propertyData.address}</p>
                    <p className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {propertyData.parish}, Jersey
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => setIsSaved(!isSaved)}>
                      <Heart className={`w-5 h-5 ${isSaved ? "fill-destructive text-destructive" : ""}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Key Features */}
                <div className="flex flex-wrap gap-6 py-4 border-y border-border">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{propertyData.beds} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{propertyData.baths} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{propertyData.parking} Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{propertyData.sqft.toLocaleString()} sq ft</span>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-xl font-semibold text-foreground mb-4">About this property</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                  {propertyData.description}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-xl font-semibold text-foreground mb-4">Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {propertyData.features.map((feature) => (
                    <div key={feature} className="px-4 py-3 bg-secondary rounded-xl text-sm text-foreground">
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Listing Info */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Listed {propertyData.listedDate}
                </span>
                <span>Viewings: {propertyData.viewings}</span>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 bg-card rounded-2xl shadow-card p-6 border border-border"
              >
                {/* Agency */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">{propertyData.agency.logo}</span>
                  </div>
                  <div>
                    <Link to="/agency/1" className="font-semibold text-foreground hover:text-accent transition-colors">
                      {propertyData.agency.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{propertyData.agency.agent}</p>
                  </div>
                </div>

                {/* Contact Form */}
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    type="tel"
                    placeholder="Your phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <Button className="w-full">Send Enquiry</Button>
                </form>

                {/* Quick Actions */}
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Similar Properties */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((property) => (
                <Link key={property.id} to={`/property/${property.id}`}>
                  <PropertyCard {...property} />
                </Link>
              ))}
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
