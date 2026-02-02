import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";

const articleData = {
  id: 1,
  image: article1,
  category: "Market Update",
  title: "Jersey Property Market Q4 2025: What Buyers Need to Know",
  author: "Sarah Mitchell",
  authorRole: "Property Editor",
  date: "January 15, 2026",
  readTime: "5 min read",
  content: `
The Jersey property market ended 2025 on a strong note, with transaction volumes up 12% compared to the previous quarter. Here's everything you need to know about current market conditions and what to expect in 2026.

## Market Overview

The final quarter of 2025 saw continued demand across all property categories, though patterns varied significantly by parish and property type. St Brelade and St Peter remained the most sought-after locations for family homes, while St Helier continued to dominate the first-time buyer market.

Average prices across the island rose by 3.2% quarter-on-quarter, bringing the annual increase to 7.8%. However, this headline figure masks considerable variation:

- **Qualified properties:** Up 8.4% year-on-year
- **Unqualified properties:** Up 5.2% year-on-year
- **Commercial:** Relatively flat at 1.1% increase

## Parish Spotlight

### St Brelade
The parish saw particularly strong demand for properties with sea views, with premium homes selling within an average of 28 days. The £1m+ bracket was especially competitive, with multiple properties achieving above asking price.

### St Helier
The capital remains the most active market by volume, accounting for 34% of all transactions. New apartment developments attracted strong interest from both local buyers and relocators.

### Rural Parishes
St Mary, St John, and Trinity saw increased interest from families seeking more space, a trend that accelerated following the pandemic and shows no signs of slowing.

## What This Means for Buyers

If you're looking to buy in 2026, here are our key recommendations:

1. **Get pre-approved:** In competitive situations, having finance pre-arranged can make the difference
2. **Act quickly:** Desirable properties are selling fast, often within weeks of listing
3. **Consider off-market:** Work with agents who have access to properties before they're publicly listed
4. **Be realistic:** Offers significantly below asking price are rarely successful in the current market

## Looking Ahead to 2026

Our forecast for the coming year is cautiously optimistic. While interest rates may create some headwinds, the fundamentals of the Jersey market remain strong:

- Limited supply of development land
- Strong demand from both local and relocating buyers
- Stable economy with robust employment
- Continued appeal as a relocation destination

We expect price growth to moderate to 4-5% across 2026, with the qualified sector continuing to outperform.

## Conclusion

The Jersey property market continues to offer opportunities for well-prepared buyers. Whether you're looking for your first home, upgrading, or investing, understanding current conditions is key to making informed decisions.

For personalized advice on navigating the market, speak to one of our expert agents who can provide insights specific to your requirements and target parishes.
`,
};

const relatedArticles = [
  { id: 2, image: article2, category: "Buying Guide", title: "First-Time Buyers: Navigating Jersey's Housing Qualifications", readTime: "8 min read" },
  { id: 3, image: article3, category: "Parish Spotlight", title: "Living in St Brelade: The Complete Guide", readTime: "6 min read" },
];

export default function Article() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16">
        {/* Hero Image */}
        <div className="relative h-[300px] lg:h-[450px]">
          <img src={articleData.image} alt={articleData.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 -mt-24 relative z-10">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            {/* Back Link */}
            <Link to="/articles" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>

            {/* Header */}
            <div className="bg-card rounded-2xl shadow-card p-6 lg:p-10 border border-border mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                {articleData.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                {articleData.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <span>By {articleData.author}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {articleData.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {articleData.readTime}
                </span>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <span className="text-sm text-muted-foreground">Share:</span>
                <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="bg-card rounded-2xl shadow-card p-6 lg:p-10 border border-border prose prose-lg max-w-none">
              {articleData.content.split('\n').map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-bold text-foreground mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={i} className="text-lg font-semibold text-foreground mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- **')) {
                  const match = paragraph.match(/- \*\*(.*?)\*\*:? (.*)/);
                  if (match) {
                    return (
                      <div key={i} className="flex gap-2 ml-4 mb-2">
                        <span className="text-accent">•</span>
                        <span><strong className="text-foreground">{match[1]}:</strong> {match[2]}</span>
                      </div>
                    );
                  }
                }
                if (paragraph.match(/^\d\./)) {
                  return <p key={i} className="ml-4 mb-2 text-muted-foreground">{paragraph}</p>;
                }
                if (paragraph.trim()) {
                  return <p key={i} className="text-muted-foreground mb-4 leading-relaxed">{paragraph}</p>;
                }
                return null;
              })}
            </div>
          </motion.article>

          {/* Related Articles */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedArticles.map((article) => (
                <Link key={article.id} to={`/article/${article.id}`} className="group">
                  <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-card-hover transition-shadow">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-accent font-medium">{article.category}</span>
                      <h3 className="font-semibold text-foreground mt-1 group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <span className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
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
