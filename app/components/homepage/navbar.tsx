"use client";

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
  external?: boolean;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  variant?: "default" | "transparent";
}

const menuItems: MenuItem[] = [
  { title: "Services", url: "/services" },
  { title: "Out of Bounds", url: "/cafe" },
  { title: "About", url: "/about" },
  {
    title: "Video",
    url: "https://www.youtube.com/playlist?list=PLquGDM9ySymXFrrMztGGnYsRoMZdpazUo",
    external: true,
  },
];

export const Navbar = ({ variant = "default" }: NavbarProps) => {
  const isTransparent = variant === "transparent";

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

  const className = cn(
    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-lg font-medium transition-colors",
    isTransparent
      ? "bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
      : "text-muted-foreground hover:bg-muted hover:text-foreground"
  );

  if (item.external) {
    return (
      <a
        key={item.title}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {item.title}
      </a>
    );
  }

  return (
    <Link key={item.title} className={className} to={item.url}>
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

  if (item.external) {
    return (
      <a
        key={item.title}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold"
      >
        {item.title}
      </a>
    );
  }

  return (
    <Link key={item.title} to={item.url} className="font-semibold">
      {item.title}
    </Link>
  );
};

export default Navbar;
