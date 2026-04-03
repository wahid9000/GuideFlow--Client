import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  MapPin,
  Star,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const HeroSection = () => {
  const heroInfo = {
    badge: "🌍 Explore the World",
    heading: "Make Your World Tour Truly Memorable",
    description:
      "Discover beautiful destinations, enjoy guided tours, and create unforgettable memories. Book your next adventure with us today!",
    buttons: {
      primary: {
        text: "View All Tours",
        url: "/tours",
      },
      secondary: {
        text: "Contact Us",
        url: "/contact",
      },
    },
  };

  const { badge, heading, description, buttons } = heroInfo;

  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons?.primary && (
                <Button
                  asChild
                  className="w-full bg-blue-950 text-white sm:w-auto"
                >
                  <Link to={buttons.primary.url}>{buttons.primary.text}</Link>
                </Button>
              )}
              {buttons?.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link to={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <div className="relative flex items-center justify-center max-h-96 w-full rounded-md bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
            <div className="relative z-10 flex flex-col items-center space-y-4">
              <Globe className="h-16 w-16 text-blue-600 animate-bounce" />
              <MapPin
                className="h-12 w-12 text-green-600 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <Star className="h-10 w-10 text-yellow-500 animate-ping" />
              <Users className="h-14 w-14 text-purple-600 animate-pulse" />
            </div>
            <div
              className="absolute top-10 left-10 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              <Globe className="h-8 w-8 text-blue-400" />
            </div>
            <div
              className="absolute bottom-10 right-10 animate-spin"
              style={{ animationDelay: "1s", animationDuration: "4s" }}
            >
              <MapPin className="h-6 w-6 text-green-400" />
            </div>
            <div
              className="absolute top-1/2 left-5 animate-ping"
              style={{ animationDelay: "1.5s" }}
            >
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div
              className="absolute bottom-5 left-1/2 animate-pulse"
              style={{ animationDelay: "2s" }}
            >
              <Users className="h-7 w-7 text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
