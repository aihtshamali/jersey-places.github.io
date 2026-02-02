import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";

const articles = [
  {
    id: 1,
    image: article1,
    category: "Market Update",
    title: "Jersey Property Market Q4 2025: What Buyers Need to Know",
    excerpt: "The latest figures show continued demand in the qualified sector, with prices stabilizing across most parishes.",
    readTime: "5 min read",
    date: "Jan 15, 2026",
  },
  {
    id: 2,
    image: article2,
    category: "Buying Guide",
    title: "First-Time Buyers: Navigating Jersey's Housing Qualifications",
    excerpt: "Understanding the qualification system is essential. Here's our complete guide to housing categories.",
    readTime: "8 min read",
    date: "Jan 12, 2026",
  },
  {
    id: 3,
    image: article3,
    category: "Parish Spotlight",
    title: "Living in St Brelade: The Complete Guide",
    excerpt: "From stunning beaches to village charm, discover why St Brelade remains one of Jersey's most desirable parishes.",
    readTime: "6 min read",
    date: "Jan 10, 2026",
  },
];

export function ArticlesSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Insights
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-1">
              Articles & Guides
            </h2>
          </motion.div>

          <Link to="/articles">
            <Button variant="ghost" className="gap-2 hidden sm:flex">
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/article/${article.id}`}>
                {/* Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="text-center mt-8 sm:hidden">
          <Link to="/articles">
            <Button variant="outline" className="gap-2">
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
