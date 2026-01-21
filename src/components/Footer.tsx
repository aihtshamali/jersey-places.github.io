import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  Properties: [
    { label: "For Sale", href: "/for-sale" },
    { label: "To Rent", href: "/to-rent" },
    { label: "Commercial", href: "/commercial" },
    { label: "Open Viewings", href: "/open-viewings" },
    { label: "Sold Properties", href: "/sold" },
  ],
  Resources: [
    { label: "Articles", href: "/articles" },
    { label: "Guides", href: "/guides" },
    { label: "Mortgage Rates", href: "/mortgages" },
    { label: "Market Reports", href: "/reports" },
  ],
  Agencies: [
    { label: "All Agencies", href: "/agencies" },
    { label: "Agent Directory", href: "/agents" },
    { label: "List Your Property", href: "/list" },
    { label: "Agent Login", href: "/agent-login" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl">places.je</span>
            </a>
            <p className="text-background/60 text-sm mb-4">
              Jersey's trusted property portal. Find your perfect place on the island.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} places.je. All rights reserved.
          </p>
          <p className="text-sm text-background/50">
            Made with ♥ in Jersey, Channel Islands
          </p>
        </div>
      </div>
    </footer>
  );
}
