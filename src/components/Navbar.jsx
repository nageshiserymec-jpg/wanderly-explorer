import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Explore", to: "/", hash: "explore" },
  { label: "Destinations", to: "/", hash: "destinations" },
  { label: "Plan Trip", to: "/", hash: "plan" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="container-page flex h-16 items-center justify-between md:h-20"
      >
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className={`text-eyebrow text-[0.95rem] tracking-[0.3em] transition-colors ${
            scrolled || open ? "text-foreground" : "text-on-dark"
          }`}
        >
          Wanderly
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                hash={link.hash}
                className={`relative text-sm font-semibold transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? "text-foreground hover:text-accent" : "text-on-dark hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:hidden ${
            scrolled || open
              ? "border-border text-foreground hover:bg-secondary"
              : "border-on-dark/30 text-on-dark hover:bg-on-dark/10"
          }`}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="animate-fade border-t border-border bg-background md:hidden">
          <ul className="container-page flex flex-col py-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  hash={link.hash}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-4 text-base font-semibold text-foreground last:border-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
