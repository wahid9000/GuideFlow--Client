import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Star,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const HeroSection = () => {
  const heroInfo = {
    badge: "New: Summer 2026 Destinations Out Now",
    heading: "Make Your World Tour Truly Memorable",
    description:
      "Discover hand-picked beautiful destinations, enjoy expert-guided tours, and create unforgettable memories. Your next adventure is just a click away.",
    buttons: {
      primary: {
        text: "Explore All Tours",
        url: "/tours",
      },
      secondary: {
        text: "Watch Highlights",
        url: "/contact",
      },
    },
  };

  const { badge, heading, description, buttons } = heroInfo;

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl">
          <div className="aspect-[1100/500] w-[70rem] bg-gradient-to-tr from-[#90f1ff] to-[#7786fe] opacity-20" />
        </div>
      </div>

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          {/* Modern Animated Badge */}
          {badge && (
            <Badge 
              variant="secondary" 
              className="px-4 py-1.5 text-sm font-medium transition-all hover:bg-secondary/80 cursor-default border-blue-100 bg-blue-50/50 text-blue-700"
            >
              {badge}
              <ArrowUpRight className="ml-2 size-3.5" />
            </Badge>
          )}

          {/* Hero Heading */}
          <h1 className="text-balance text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:leading-[1.1]">
            {heading.split('Truly').map((part, i) => i === 0 ? part : (
              <span key={part} className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Truly {part}
              </span>
            ))}
          </h1>

          {/* Hero Description */}
          <p className="mt-4 max-w-[700px] text-balance text-lg text-muted-foreground sm:text-xl">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            {buttons?.primary && (
              <Button
                asChild
                size="lg"
                className="h-12 w-full rounded-full bg-blue-600 px-8 text-base shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl sm:w-auto"
              >
                <Link to={buttons.primary.url}>
                  {buttons.primary.text}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            )}
            {buttons?.secondary && (
              <Button 
                asChild 
                variant="ghost" 
                size="lg" 
                className="h-12 w-full rounded-full px-8 text-base sm:w-auto"
              >
                <Link to={buttons.secondary.url} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Play className="ml-0.5 size-3 fill-current" />
                  </span>
                  {buttons.secondary.text}
                </Link>
              </Button>
            )}
          </div>

          {/* Social Proof / Trust Pilot Style */}
          <div className="mt-12 flex flex-col items-center gap-4 border-t pt-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="inline-block h-10 w-10 rounded-full border-2 border-background bg-slate-200">
                   <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} 
                    alt="User"
                    className="rounded-full"
                  />
                </div>
              ))}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-blue-600 text-[10px] font-bold text-white">
                +2k
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm font-medium">
                4.9/5 <span className="text-muted-foreground font-normal">from over 5,000+ happy travelers</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;