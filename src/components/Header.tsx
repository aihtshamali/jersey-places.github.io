import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ChevronDown, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "For Sale", href: "/search?type=for-sale" },
  { label: "To Rent", href: "/search?type=to-rent" },
  { label: "Commercial", href: "/search?type=commercial" },
  { label: "Open Viewings", href: "/search?filter=Open%20Viewings" },
  { label: "Sold", href: "/search?type=sold" },
  {
    label: "More",
    children: [
      { label: "Agencies", href: "/agencies" },
      { label: "Agent Directory", href: "/agencies" },
      { label: "Mortgages", href: "/articles" },
      { label: "Articles", href: "/articles" },
      { label: "Guides", href: "/articles" },
    ],
  },
];

export function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/places.logo.png" width={"30%"} alt="Jersey Places" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href || "#"}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>

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
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => navigate("/wishlist")} aria-label="Wishlist">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="w-5 h-5" />
            </Button>
            <Button onClick={handleSearchClick} className="hidden sm:flex gap-2">
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
                    <Link
                      to={item.href || "#"}
                      className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
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
                  <Button onClick={handleSearchClick} className="flex-1">
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
