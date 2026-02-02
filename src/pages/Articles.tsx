import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";

const categories = ["All", "Market Update", "Buying Guide", "Parish Spotlight", "Investment", "Lifestyle"];

const allArticles = [
  { id: 1, image: article1, category: "Market Update", title: "Jersey Property Market Q4 2025: What Buyers Need to Know", excerpt: "The latest figures show continued demand in the qualified sector, with prices stabilizing across most parishes.", readTime: "5 min read", date: "Jan 15, 2026" },
  { id: 2, image: article2, category: "Buying Guide", title: "First-Time Buyers: Navigating Jersey's Housing Qualifications", excerpt: "Understanding the qualification system is essential. Here's our complete guide to housing categories.", readTime: "8 min read", date: "Jan 12, 2026" },
  { id: 3, image: article3, category: "Parish Spotlight", title: "Living in St Brelade: The Complete Guide", excerpt: "From stunning beaches to village charm, discover why St Brelade remains one of Jersey's most desirable parishes.", readTime: "6 min read", date: "Jan 10, 2026" },
  { id: 4, image: article1, category: "Investment", title: "Buy-to-Let in Jersey: 2026 Investor Guide", excerpt: "Everything landlords need to know about rental yields, regulations, and market conditions.", readTime: "7 min read", date: "Jan 8, 2026" },
  { id: 5, image: article2, category: "Lifestyle", title: "Best Schools in Jersey: A Parent's Guide", excerpt: "Comprehensive overview of education options when choosing where to live in Jersey.", readTime: "10 min read", date: "Jan 5, 2026" },
  { id: 6, image: article3, category: "Market Update", title: "Commercial Property Trends: Office Space Demand Rising", excerpt: "Post-pandemic trends are reshaping Jersey's commercial property landscape.", readTime: "4 min read", date: "Jan 3, 2026" },
];

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mb-10"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Articles & Guides</h1>
            <p className="text-lg text-muted-foreground">
              Expert insights, market updates, and practical guides for navigating Jersey's property market.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Featured Article */}
          {filteredArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <Link to={`/article/${filteredArticles[0].id}`} className="group block">
                <div className="grid lg:grid-cols-2 gap-6 bg-card rounded-2xl overflow-hidden border border-border hover:shadow-card-hover transition-shadow">
                  <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <img
                      src={filteredArticles[0].image}
                      alt={filteredArticles[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    <span className="inline-block w-fit px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                      {filteredArticles[0].category}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {filteredArticles[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-4">{filteredArticles[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{filteredArticles[0].date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {filteredArticles[0].readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Articles Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(1).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <Link to={`/article/${article.id}`} className="group block">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xs text-accent font-medium">{article.category}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1 mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
