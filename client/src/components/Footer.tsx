import { Link } from "react-router-dom";
import { LuGithub, LuTwitter, LuLinkedin, LuInstagram } from "react-icons/lu";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-foreground">
              My Logo
            </h2>
            <p className="text-sm">
              Providing modern e-commerce solutions with the best quality.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/" className="text-sm transition-colors hover:text-teal-500">
              Home
            </Link>
            <Link to="/products" className="text-sm transition-colors hover:text-teal-500">
              Products
            </Link>
            <Link to="/about" className="text-sm transition-colors hover:text-teal-500">
              About Us
            </Link>
            <Link to="/contact" className="text-sm transition-colors hover:text-teal-500">
              Contact
            </Link>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:text-teal-500 hover:bg-teal-500/10">
              <LuGithub className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:text-teal-500 hover:bg-teal-500/10">
              <LuTwitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:text-teal-500 hover:bg-teal-500/10">
              <LuLinkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:text-teal-500 hover:bg-teal-500/10">
              <LuInstagram className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="my-6 h-px w-full bg-border" />

        <p className="text-center text-xs text-muted-foreground/60">
          &copy; {new Date().getFullYear()} My Logo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}