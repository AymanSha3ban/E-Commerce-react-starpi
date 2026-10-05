import { useState } from "react";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useTheme } from "next-themes";
import {
  LuSearch,
  LuSun,
  LuMoon,
  LuMenu,
  LuShoppingCart,
  LuUser,
  LuLogOut,
  LuLogIn,
} from "react-icons/lu";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useCartState } from "@/Store/CartStore";
import { useAuthStore } from "@/Store/authStore";

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role?.name === "Admin";
  const logout = useAuthStore((state) => state.logout);

  const orders = useCartState((state) => state.orders);
  const totalItems = orders.reduce((acc, item) => acc + item.quantity, 0);

  const category = searchParams.get("category");
  const search = searchParams.get("search") || "";

  const links = [
  ...(isAdmin ? [{ path: "/dashboard", name: "Dashboard" }] : []),
  { path: "/products", name: "Products" },
  { path: "/about", name: "About Us" },
];

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    if (category) {
      params.set("category", category);
    }

    navigate(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleAuthClick() {
    if (isAuthenticated) {
      logout?.();
      navigate("/");
    } else {
      navigate("/login");
    }
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
    <nav className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md md:px-6">
      <RouterLink
        to="/"
        className="text-lg md:text-xl font-bold tracking-tight text-teal-500 transition-transform duration-200 hover:scale-105 hover:text-teal-400"
      >
        My Logo
      </RouterLink>

      <div className="relative flex-1 max-w-[180px] sm:max-w-[260px] md:max-w-[320px]">
        <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={search}
          placeholder="Search products..."
          className="h-9 rounded-full bg-muted/50 pl-9 text-xs sm:text-sm focus-visible:ring-teal-500 border-border/60"
          onChange={handleSearch}
        />
      </div>

      <div className="hidden md:flex items-center gap-6">
        {links.map((link) => {
          const active = isActive(link.path);
          return (
            <RouterLink
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium transition-all duration-200 hover:text-teal-500 hover:-translate-y-0.5 group ${
                active ? "text-teal-500 font-semibold" : "text-muted-foreground"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1.5 h-0.5 rounded-full bg-teal-500 transition-all duration-300 ease-in-out ${
                  active ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </RouterLink>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {isAuthenticated && user && (
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
            <LuUser className="h-3.5 w-3.5" />
            <span className="truncate max-w-[100px]">{user.username}</span>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          asChild
          className="relative rounded-full hover:bg-teal-500/10 hover:text-teal-500 transition-all"
        >
          <RouterLink to="/cart">
            <LuShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-teal-500 text-[10px] sm:text-[11px] font-bold text-slate-950 shadow-sm ring-2 ring-background">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
            <span className="sr-only">Shopping Cart</span>
          </RouterLink>
        </Button>

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
          size="sm"
          onClick={handleAuthClick}
          className="hidden sm:inline-flex rounded-full bg-teal-500 px-4 text-xs font-semibold text-slate-950 hover:bg-teal-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/20 transition-all gap-1.5"
        >
          {isAuthenticated ? (
            < >
              <LuLogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </>
          ) : (
            <>
              <LuLogIn className="h-3.5 w-3.5" />
              <span>Login</span>
            </>
          )}
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
          <SheetContent side="right" className="w-[280px] sm:w-[350px]">
            <SheetHeader className="border-b border-border pb-4">
              <SheetTitle className="text-teal-500 font-bold text-left">
                Navigation Menu
              </SheetTitle>
            </SheetHeader>

            <div className="mt-4 flex flex-col gap-2">
              {isAuthenticated && user && (
                <div className="flex items-center gap-2 px-3 py-2.5 mb-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium">
                  <LuUser className="h-4 w-4" />
                  <span>{user.username}</span>
                </div>
              )}

              {links.map((link) => {
                const active = isActive(link.path);
                return (
                  <RouterLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-teal-500/10 hover:text-teal-500 hover:translate-x-1 ${
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
                onClick={() => {
                  setOpen(false);
                  handleAuthClick();
                }}
                className="mt-4 w-full rounded-lg bg-teal-500 text-slate-950 font-semibold hover:bg-teal-600 gap-2 text-xs"
              >
                {isAuthenticated ? (
                  <>
                    <LuLogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </>
                ) : (
                  <>
                    <LuLogIn className="h-4 w-4" />
                    <span>Login</span>
                  </>
                )}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}