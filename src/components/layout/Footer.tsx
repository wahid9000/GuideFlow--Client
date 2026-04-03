import Logo from "@/assets/icons/Logo";
import { Facebook, Twitter, Instagram, Linkedin, Send, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About Us", href: "/" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Press Kit", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Safety Info", href: "#" },
      { name: "Refund Policy", href: "#" },
      { name: "Contact Us", href: "/" },
    ],
    legal: [
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Cookie Settings", href: "#" },
    ]
  };

  return (
    <footer className="border-t bg-slate-50/50 dark:bg-slate-950/50">
      <div className="mx-auto container px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
              <Logo />
              <span className="font-bold text-2xl tracking-tight">
                Guide<span className="text-blue-600">Flow</span>
              </span>
            </Link>
            <p className="max-w-xs text-muted-foreground leading-relaxed">
              Redefining the way you explore the world. Curated experiences, expert guides, and memories that last a lifetime.
            </p>
            
            <div className="mt-4 flex flex-col gap-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider">Join our newsletter</h4>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="rounded-full bg-white dark:bg-slate-900 border-blue-100 focus-visible:ring-blue-500" 
                />
                <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-foreground mb-6">Explore</h3>
              <ul className="space-y-4 text-sm">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-muted-foreground hover:text-blue-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-6">Support</h3>
              <ul className="space-y-4 text-sm">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-muted-foreground hover:text-blue-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-bold text-foreground mb-6">Contact</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-blue-600 shrink-0" />
                  <span>123 Travel Lane, Adventure City, World 2026</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-blue-600 shrink-0" />
                  <span>hello@guideflow.com</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5 text-blue-600 shrink-0" />
                  <span>+1 (555) 000-TRAVEL</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground order-2 md:order-1">
            &copy; 2026 GuideFlow. Built for world explorers.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-8 order-1 md:order-2">
            {/* Legal Links */}
            <ul className="flex gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Icons with Hover Effects */}
            <div className="flex items-center gap-4">
              {[
                { Icon: Facebook, href: "https://facebook.com" },
                { Icon: Twitter, href: "https://twitter.com" },
                { Icon: Instagram, href: "https://instagram.com" },
                { Icon: Linkedin, href: "https://linkedin.com" }
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-muted-foreground hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;