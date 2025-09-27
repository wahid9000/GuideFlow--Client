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
import { Link } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SearchSection from "../modules/Navbar/SearchSection";
import { setLoggedOut } from "@/lib/authState";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/admin", label: "Dashboard", role: role.superAdmin },
  { href: "/user", label: "Dashboard", role: role.user },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/tours", label: "Tours", role: "PUBLIC" },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);

  const userExists = data?.data?.email;
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());

    setLoggedOut(true);

    toast.success("Logout successful");
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              ></Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild className="py-1.5">
                        <Link to={link.href}>{link.label}</Link>
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
              <Logo></Logo>
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <>
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}

                    {link.role === data?.data?.role && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <SearchSection />
          <ModeToggle></ModeToggle>

          {userExists ? (
            <div className="flex items-center gap-2 cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" />
                    <AvatarFallback>image</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>Profile</DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={handleLogout}
                variant={"outline"}
                className="text-sm text-foreground cursor-pointer"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button asChild className="text-sm text-white cursor-pointer">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
