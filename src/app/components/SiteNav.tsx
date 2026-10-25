"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { playfairDisplay } from "@/lib/fonts";

export const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/project", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function SiteNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="relative h-16 border-b border-[var(--am-border)]">
      <div className="flex h-full w-full items-center justify-between px-4 md:px-12">
        <div className="flex items-center gap-2 text-[22px] leading-none text-[var(--am-text-primary)]">
          <Link href="/" className={`${playfairDisplay.className} italic`}>
            Earth
          </Link>
          <Link
            href="https://webring.wonderful.software#amiearth.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="วงแหวนเว็บ"
          >
            <Image
              alt="วงแหวนเว็บ"
              width={32}
              height={32}
              src="https://webring.wonderful.software/webring.black.svg"
              sizes="32px"
              loading="lazy"
            />
          </Link>
        </div>

        <div className="hidden items-center gap-9 text-[15px] md:flex">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors hover:text-[var(--am-text-primary)] ${
                  isActive
                    ? "font-semibold text-[var(--am-text-primary)] underline decoration-[var(--am-accent)] underline-offset-8"
                    : "text-[var(--am-text-secondary)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="text-[15px] text-[var(--am-text-secondary)] md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-mobile-menu"
          onClick={() => setIsMobileMenuOpen((previousValue) => !previousValue)}
        >
          Menu
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id="site-mobile-menu"
          className="absolute left-0 top-16 z-20 w-full border-b border-[var(--am-border)] bg-[var(--am-bg)] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-[15px] text-[var(--am-text-secondary)] transition-colors hover:text-[var(--am-text-primary)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
