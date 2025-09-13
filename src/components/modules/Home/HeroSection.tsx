import { ArrowRight, ArrowUpRight } from "lucide-react";

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
    image: {
      src: "https://res.cloudinary.com/dungmnjyx/image/upload/v1757770574/ro81t3cfoqh-1757770570295-pexels-pixabay-161849-jpg.jpg.jpg",
      alt: "Hero section image",
    },
  };

  const { badge, heading, description, buttons, image } = heroInfo;

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
                <Button asChild className="w-full text-white sm:w-auto">
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
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
