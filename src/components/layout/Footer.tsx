import Logo from "@/assets/icons/Logo";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto container px-4 py-16">
        <div className="lg:flex lg:items-start lg:gap-8">
          {/* Newsletter / Branding */}
          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-foreground flex gap-2 items-center">
                <Logo></Logo> TourUs
              </h2>
              <p className="mt-4 text-muted-foreground">
                Discover the world like never before with TourUs – your ultimate
                travel companion.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <p className="text-xs text-foreground">
              &copy; 2025. TourUs. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              {/* Footer Links */}
              <ul className="flex flex-wrap justify-start gap-4 text-xs lg:justify-end">
                {["Terms & Conditions", "Privacy Policy", "Cookies"].map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-foreground hover:text-muted-foreground transition"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-muted-foreground transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-muted-foreground transition"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-muted-foreground transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-muted-foreground transition"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
