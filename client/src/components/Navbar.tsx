import {
  LuSearch,
  LuSun,
  LuMoon,
  LuMenu,
  LuShoppingCart,
} from "react-icons/lu";
import { useState } from "react";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useCartState } from "@/Store/CartStore";

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const orders = useCartState((state) => state.orders);
  const totalItems = orders.reduce((acc, item) => acc + item.quantity, 0);

  const category = searchParams.get("category");
  const search = searchParams.get("search") || "";

  const links = [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/products", name: "Products" },
    { path: "/team", name: "Team" },
  ];

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    }
    if (value) {
      params.set("search", value);
    }

    navigate(
      `/products${params.toString() ? `?${params.toString()}` : ""}`
    );
  }

  function isActive(path: string) {
    if (path === "/products") {
      return location.pathname.startsWith("/products");
    }
    return location.pathname === path;
  }

  const toggleTheme = () => {
    const current = resolvedTheme || theme;
    setTheme(current === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md md:px-6">
      <RouterLink
        to="/"
        className="text-lg md:text-xl font-bold text-teal-500 transition-all duration-200 hover:scale-105 hover:text-teal-400"
      >
        My Logo
      </RouterLink>

      <div className="relative flex-1 max-w-[220px] sm:max-w-[220px] md:max-w-[320px] mx-0 md:mx-4">
        <LuSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={search}
          placeholder="Search products..."
          className="rounded-full bg-muted/50 pl-9 focus-visible:ring-teal-500"
          onChange={handleSearch}
        />
      </div>

      <Button
        variant="ghost"
        size="icon"
        asChild
        className="relative rounded-full hover:bg-teal-500/10 hover:text-teal-500 transition-all"
      >
        <RouterLink to="/cart">
          <LuShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[11px] font-bold text-white shadow-sm ring-2 ring-background">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
          <span className="sr-only">Shopping Cart</span>
        </RouterLink>
      </Button>

      <div className="hidden md:flex items-center gap-6">
        {links.map((link) => {
          const active = isActive(link.path);
          return (
            <RouterLink
              key={link.path}
              to={link.path}
              className={`relative font-medium transition-all duration-250 ease-in-out hover:text-teal-500 hover:-translate-y-0.5 group ${
                active ? "text-teal-500 font-semibold" : "text-muted-foreground"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1.5 h-0.5 rounded-full bg-teal-500 transition-all duration-250 ease-in-out ${
                  active ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </RouterLink>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-teal-500/10 hover:text-teal-500 transition-all hover:rotate-12"
          onClick={toggleTheme}
        >
          <LuSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LuMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button
          asChild
          size="sm"
          className="hidden sm:inline-flex rounded-full bg-teal-600 px-5 text-white hover:bg-teal-700 hover:-translate-y-0.5 hover:shadow-lg transition-all"
        >
          <RouterLink to="/login">Login</RouterLink>
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-teal-500/10 hover:text-teal-500"
            >
              <LuMenu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader className="border-b pb-4">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col gap-3">
              {links.map((link) => {
                const active = isActive(link.path);
                return (
                  <RouterLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-teal-500/10 hover:text-teal-500 hover:translate-x-1 ${
                      active
                        ? "bg-teal-500/10 text-teal-500 font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </RouterLink>
                );
              })}

              <Button
                asChild
                className="mt-4 w-full rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => setOpen(false)}
              >
                <RouterLink to="/login">Login</RouterLink>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}