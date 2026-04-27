"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/about",    label: "About"   },
  { href: "/projects", label: "Projects"},
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-site-header border-b border-site-border/20 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-site-ink tracking-tight hover:text-white transition-colors">
          Garrett Young
        </Link>
        <nav className="flex items-center gap-7">
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
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-1.5 bg-site-warm text-white rounded-full hover:bg-site-warm/80 transition-colors font-semibold"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
