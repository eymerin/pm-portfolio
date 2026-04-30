"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/about",    label: "About"   },
  { href: "/projects", label: "Projects"},
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-site-header border-b border-site-border/20 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-site-ink tracking-tight hover:text-white transition-colors">
          Garrett Young
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-7">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href
                  ? "text-site-ink font-medium"
                  : "text-site-secondary hover:text-site-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/Garrett_Young_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-site-secondary hover:text-site-ink transition-colors"
          >
            Resume ↗
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2 text-site-secondary hover:text-site-ink transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-site-border/20 bg-site-header">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-sm transition-colors ${
                  pathname === item.href
                    ? "text-site-ink font-medium"
                    : "text-site-secondary hover:text-site-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/Garrett_Young_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-site-secondary hover:text-site-ink transition-colors"
            >
              Resume ↗
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
