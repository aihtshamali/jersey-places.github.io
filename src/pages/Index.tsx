import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedListings } from "@/components/FeaturedListings";
import { LatestListings } from "@/components/LatestListings";
import { SoldSection } from "@/components/SoldSection";
import { AgencySpotlight } from "@/components/AgencySpotlight";
import { ArticlesSection } from "@/components/ArticlesSection";
import { TrustSection } from "@/components/TrustSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedListings />
        <LatestListings />
        <SoldSection />
        <AgencySpotlight />
        <ArticlesSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
