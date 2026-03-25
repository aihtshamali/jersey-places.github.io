import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import PropertyDetail from "./pages/PropertyDetail";
import Agency from "./pages/Agency";
import Agencies from "./pages/Agencies";
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/for-sale" element={<Search />} />
          <Route path="/to-rent" element={<Search />} />
          <Route path="/commercial" element={<Search />} />
          <Route path="/open-viewings" element={<Search />} />
          <Route path="/sold" element={<Search />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/agency/:id" element={<Agency />} />
          <Route path="/agencies" element={<Agencies />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/guides" element={<Articles />} />
          <Route path="/wishlist" element={<Wishlist />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
