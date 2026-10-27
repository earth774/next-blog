import Link from "next/link";

export const FOOTER_LINKS = [
  { href: "/feed.xml", label: "RSS" },
  { href: "https://x.com/SutthiponGEarth", label: "Twitter" },
  { href: "https://github.com/earth774", label: "GitHub" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--am-border)]">
      <div className="hidden h-16 w-full items-center justify-between px-12 md:flex">
        <p className="text-[13px] text-[var(--am-text-muted)]">
          © 2026 Earth. Made with care in Chiang Rai.
        </p>
        <div className="flex items-center gap-6 text-[13px] text-[var(--am-text-muted)]">
          {FOOTER_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-[var(--am-text-secondary)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3 px-6 py-4 text-center md:hidden">
        <p className="text-[13px] text-[var(--am-text-muted)]">
          © 2026 Earth. Made with care in Chiang Rai.
        </p>
        <div className="flex items-center gap-5 text-[13px] text-[var(--am-text-muted)]">
          {FOOTER_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-[var(--am-text-secondary)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
