import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Share2, Trash2, Copy, Check, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

// Same property data used across the app — in production this would come from an API
const allProperties = [
  { id: 1, image: property1, price: "£1,250,000", address: "La Haule Manor, St Brelade", parish: "St Brelade", beds: 5, baths: 3, parking: 2, isNew: true, qualification: "Qualified" as const, agency: "Savills" },
  { id: 2, image: property2, price: "£485,000", address: "Rose Cottage, Trinity", parish: "Trinity", beds: 3, baths: 2, parking: 1, qualification: "Qualified" as const, agency: "Locate" },
  { id: 3, image: property3, price: "£725,000", address: "Harbour View Apartments, St Helier", parish: "St Helier", beds: 2, baths: 2, parking: 1, qualification: "Unqualified" as const, agency: "Broadlands" },
  { id: 4, image: property4, price: "£895,000", address: "Victoria House, St Helier", parish: "St Helier", beds: 4, baths: 2, parking: 0, isReduced: true, qualification: "Qualified" as const, agency: "Fine & Country" },
  { id: 5, image: property1, price: "£395,000", address: "2 Bed Apartment, Havre des Pas", parish: "St Helier", beds: 2, baths: 1, parking: 1, isNew: true, qualification: "Unqualified" as const, agency: "Martel Maides" },
  { id: 6, image: property2, price: "£675,000", address: "Modern Family Home, St Peter", parish: "St Peter", beds: 4, baths: 2, parking: 2, qualification: "Qualified" as const, agency: "Broadlands" },
  { id: 7, image: property3, price: "£1,450,000", address: "Period Townhouse, Royal Square", parish: "St Helier", beds: 5, baths: 3, parking: 0, qualification: "Qualified" as const, agency: "Savills" },
  { id: 8, image: property4, price: "£525,000", address: "Character Cottage, St Martin", parish: "St Martin", beds: 3, baths: 2, parking: 1, isReduced: true, qualification: "Qualified" as const, agency: "Locate" },
  { id: 9, image: property1, price: "£299,000", address: "Studio Flat, Georgetown", parish: "St Helier", beds: 1, baths: 1, parking: 0, isNew: true, qualification: "Unqualified" as const, agency: "CI Letting" },
  { id: 10, image: property2, price: "£850,000", address: "Sea View Villa, Grouville", parish: "Grouville", beds: 4, baths: 3, parking: 2, qualification: "Qualified" as const, agency: "Fine & Country" },
  { id: 11, image: property3, price: "£620,000", address: "Granite Cottage, St Ouen", parish: "St Ouen", beds: 3, baths: 2, parking: 1, qualification: "Qualified" as const, agency: "Savills" },
  { id: 12, image: property4, price: "£450,000", address: "Modern Apartment, St Clement", parish: "St Clement", beds: 2, baths: 1, parking: 1, isNew: true, qualification: "Unqualified" as const, agency: "Locate" },
];

export default function Wishlist() {
  const [searchParams] = useSearchParams();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [copied, setCopied] = useState(false);

  // Check if viewing a shared wishlist (via ?ids=1,2,3)
  const sharedIds = searchParams.get("ids");
  const isSharedView = !!sharedIds;
  const displayIds = isSharedView
    ? sharedIds.split(",").map(Number).filter(Boolean)
    : favorites;

  const wishlistProperties = allProperties.filter((p) => displayIds.includes(p.id));

  const shareUrl = `${window.location.origin}/wishlist?ids=${favorites.join(",")}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Places.je Wishlist",
          text: `Check out ${favorites.length} properties I've saved on Places.je`,
          url: shareUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Wishlist link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <Heart className="w-8 h-8 text-destructive fill-destructive" />
                  {isSharedView ? "Shared Wishlist" : "My Wishlist"}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {wishlistProperties.length} {wishlistProperties.length === 1 ? "property" : "properties"} saved
                </p>
              </div>

              {!isSharedView && favorites.length > 0 && (
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2" onClick={handleCopyLink}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                  <Button className="gap-2" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                    Share Wishlist
                  </Button>
                </div>
              )}

              {isSharedView && (
                <Button variant="outline" className="gap-2" asChild>
                  <Link to="/wishlist">
                    <Heart className="w-4 h-4" />
                    View My Wishlist
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>

          {wishlistProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {isSharedView ? "This wishlist is empty" : "No saved properties yet"}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {isSharedView
                  ? "The properties in this shared list may no longer be available."
                  : "Tap the heart icon on any property to save it here. You can then share your wishlist with friends and family."}
              </p>
              <Button asChild className="rounded-full px-8">
                <Link to="/search?type=for-sale">Browse Properties</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
