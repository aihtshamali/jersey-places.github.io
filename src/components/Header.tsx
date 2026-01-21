import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ChevronDown, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "For Sale", href: "/for-sale" },
  { label: "To Rent", href: "/to-rent" },
  { label: "Commercial", href: "/commercial" },
  { label: "Open Viewings", href: "/open-viewings" },
  { label: "Sold", href: "/sold" },
  {
    label: "More",
    children: [
      { label: "Agencies", href: "/agencies" },
      { label: "Agent Directory", href: "/agents" },
      { label: "Mortgages", href: "/mortgages" },
      { label: "Articles", href: "/articles" },
      { label: "Guides", href: "/guides" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-xl text-foreground">places.je</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href || "#"}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </a>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-card rounded-xl shadow-lg border border-border overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="w-5 h-5" />
            </Button>
            <Button className="hidden sm:flex gap-2">
              <Search className="w-4 h-4" />
              Search
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="py-4 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <a
                      href={item.href || "#"}
                      className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg"
                    >
                      {item.label}
                    </a>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 px-4 flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button className="flex-1">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
