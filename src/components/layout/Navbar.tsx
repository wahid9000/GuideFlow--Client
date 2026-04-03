import { Link, useLocation } from "react-router";
import { toast } from "sonner";
import { LogOut, Menu, User, LayoutDashboard, Settings } from "lucide-react";

import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggler";
import SearchSection from "../modules/Navbar/SearchSection";

import { useAppDispatch } from "@/redux/hook";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { role as roleConstants } from "@/constants/role";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/tours", label: "Tours", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: roleConstants.admin },
  { href: "/admin", label: "Dashboard", role: roleConstants.superAdmin },
  { href: "/user", label: "Dashboard", role: roleConstants.user },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const user = data?.data;
  const userRole = user?.role;
  const location = useLocation();

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    toast.success("Logout successful");
  };

  const filteredLinks = navigationLinks.filter(
    (link) => link.role === "PUBLIC" || link.role === userRole
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        
        {/* Left Side: Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <Logo />
            <span className="hidden font-bold text-xl tracking-tight sm:inline-block">
              Tour<span className="text-blue-600">Ease</span>
            </span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {filteredLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent font-medium transition-colors hover:bg-blue-50 hover:text-blue-600",
                      location.pathname === link.href && "text-blue-600 bg-blue-50/50"
                    )}
                  >
                    <Link to={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <SearchSection />
          </div>
          
          <ModeToggle />

          {user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 ring-offset-2 transition-all hover:ring-2 hover:ring-blue-500">
                  <Avatar className="h-10 w-10 border border-blue-100">
                    <AvatarImage src={user.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} />
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {user.name?.substring(0, 2).toUpperCase() || "US"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/${userRole?.toLowerCase() || 'user'}`} className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="hidden sm:inline-flex rounded-full">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild className="rounded-full bg-blue-600 px-6 hover:bg-blue-700 shadow-md shadow-blue-200">
                <Link to="/register">Join Free</Link>
              </Button>
            </div>
          )}

          {/* Mobile Nav Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2">
                  <Logo /> <span className="font-bold">GuideFlow</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {filteredLinks.map((link, i) => (
                  <Link 
                    key={i} 
                    to={link.href}
                    className="text-lg font-semibold py-2 border-b border-slate-50 hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 sm:hidden">
                    <SearchSection />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}