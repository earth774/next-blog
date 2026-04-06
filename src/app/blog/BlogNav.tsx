"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

interface NavLinkItem {
  href: string;
  label: string;
}

interface BlogNavProps {
  navLinks: NavLinkItem[];
}

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export default function BlogNav({ navLinks }: BlogNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        <div className="hidden items-center gap-9 text-[15px] text-[var(--am-text-secondary)] md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--am-text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="text-[15px] text-[var(--am-text-secondary)] md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="blog-mobile-menu"
          onClick={() => setIsMobileMenuOpen((previousValue) => !previousValue)}
        >
          Menu
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id="blog-mobile-menu"
          className="absolute left-0 top-16 z-20 w-full border-b border-[var(--am-border)] bg-[var(--am-bg)] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
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
