import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggler";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "#", label: "Home", active: true },
  { href: "#", label: "Features" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "About" },
];

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container  mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <Logo />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        href={link.href}
                        className="py-1.5"
                        active={link.active}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary hover:text-primary/90">
              <svg
                width="30"
                height="40"
                viewBox="0 0 30 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 0L20.4545 5.33333L0 25.3333V14.6667L15 0Z"
                  fill="#06D1D4"
                ></path>
                <path
                  d="M2.90827 28.177L15 40L30 25.3334V14.6667L20.4545 5.33337L0 25.3334L0.0041688 25.3375L20.4545 5.33337V20.6667L11.25 29.6667V20.1324L2.90827 28.177Z"
                  fill="#3628A0"
                ></path>
              </svg>
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      active={link.active}
                      href={link.href}
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle></ModeToggle>
          <Button asChild variant="ghost" size="sm" className="text-sm">
            <a href="#">Sign In</a>
          </Button>
          <Button asChild size="sm" className="text-sm">
            <a href="#">Get Started</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
