"use client";

import { UserButton } from "@clerk/react-router";
import { Menu } from "lucide-react";
import { Link } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  loaderData?: { 
    isSignedIn: boolean; 
    hasActiveSubscription: boolean 
  };
  variant?: "default" | "transparent";
}

const menuItems: MenuItem[] = [
  { title: "Services", url: "/services" },
  { title: "Out of Bounds", url: "/cafe" },
  { title: "About", url: "/about" },
  { title: "Membership", url: "/membership" },
];

const mobileExtraLinks = [
  { name: "Contact", url: "/contact" },
  { name: "FAQ", url: "/faq" },
];

export const Navbar = ({ loaderData, variant = "default" }: NavbarProps) => {
  const isTransparent = variant === "transparent";
  const dashboardLink = !loaderData?.isSignedIn
    ? "/sign-up"
    : loaderData.hasActiveSubscription
    ? "/dashboard"
    : "/membership";

  const dashboardText = !loaderData?.isSignedIn
    ? "Join"
    : loaderData.hasActiveSubscription
    ? "Dashboard"
    : "Subscribe";

  return (
    <header className={cn(
      "py-4",
      isTransparent && "absolute top-0 left-0 right-0 z-50"
    )}>
      <div className="container mx-auto max-w-6xl px-6">
        {/* Desktop Navigation */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/images/zero-zero-one.png" 
                className="w-8" 
                alt="Timeout At Shannon's Logo" 
              />
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menuItems.map((item) => renderMenuItem(item, isTransparent))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {loaderData?.isSignedIn ? (
              <>
                <Button asChild size="sm">
                  <Link to={dashboardLink}>{dashboardText}</Link>
                </Button>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 ring-2 ring-border hover:ring-primary transition-all duration-200",
                      userButtonPopoverCard: "bg-background border border-border shadow-lg",
                      userButtonPopoverActions: "bg-background",
                      userButtonPopoverActionButton: "hover:bg-secondary transition-colors duration-200",
                      userButtonPopoverFooter: "bg-background",
                    },
                  }}
                />
              </>
            ) : (
              <>
                <Button 
                  asChild 
                  variant={isTransparent ? "ghost" : "outline"} 
                  size="sm"
                  className={isTransparent ? "text-white hover:bg-white/10 hover:text-white" : ""}
                >
                  <Link to="/sign-in">Log in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/sign-up">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/images/zero-zero-one.png" 
                className="w-8" 
                alt="Timeout At Shannon's Logo" 
              />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant={isTransparent ? "ghost" : "outline"} 
                  size="icon"
                  className={isTransparent ? "text-white hover:bg-white/10 border-white/20" : ""}
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to="/" className="flex items-center gap-2">
                      <img 
                        src="/images/zero-zero-one.png" 
                        className="w-8" 
                        alt="Timeout At Shannon's Logo" 
                      />
                      <span className="text-lg font-semibold">
                        Timeout At Shannon's
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menuItems.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {mobileExtraLinks.length > 0 && (
                    <div className="border-t py-4">
                      <div className="grid grid-cols-2 justify-start">
                        {mobileExtraLinks.map((link, idx) => (
                          <Link
                            key={idx}
                            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                            to={link.url}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-3">
                    {loaderData?.isSignedIn ? (
                      <>
                        <Button asChild>
                          <Link to={dashboardLink}>{dashboardText}</Link>
                        </Button>
                        <div className="flex justify-center">
                          <UserButton
                            appearance={{
                              elements: {
                                avatarBox: "w-10 h-10 ring-2 ring-border",
                              },
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline">
                          <Link to="/sign-in">Log in</Link>
                        </Button>
                        <Button asChild>
                          <Link to="/sign-up">Sign up</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

const renderMenuItem = (item: MenuItem, isTransparent: boolean = false) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className={isTransparent ? "text-white/80" : "text-muted-foreground"}>
        <NavigationMenuTrigger className={isTransparent ? "bg-transparent text-white/80 hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10" : ""}>
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            <NavigationMenuLink>
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <Link
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                    to={subItem.url}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <Link
      key={item.title}
      className={cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
        isTransparent 
          ? "bg-transparent text-white/80 hover:bg-white/10 hover:text-white" 
          : "bg-background text-muted-foreground hover:bg-muted hover:text-accent-foreground"
      )}
      to={item.url}
    >
      {item.title}
    </Link>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
              to={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-muted-foreground">
                    {subItem.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} to={item.url} className="font-semibold">
      {item.title}
    </Link>
  );
};

export default Navbar;
