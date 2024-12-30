'use client'
import Link from 'next/link'
import { Github } from 'lucide-react'
import NavLinkBlog from "@/app/components/NavLinkBlog";
import { usePathname } from "next/navigation";

const NavMenu = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start gap-4">
      <ul className="flex gap-6">
        <li>
          <NavLinkBlog href="/" text="Home" className={`${pathname === '/' ? 'bg-[#FFD700]' : ''}`} />
        </li>
        <li><NavLinkBlog href="/blog" text="Blog" className={`${pathname === '/blog' ? 'bg-[#FFD700]' : ''}`} /></li>
        <li><NavLinkBlog href="/project" text="Project" className={`${pathname === '/project' ? 'bg-[#FFD700]' : ''}`} /></li>
        <li><NavLinkBlog href="/about" text="About" className={`${pathname === '/about' ? 'bg-[#FFD700]' : ''}`} /></li>
      </ul>

      <div className="flex gap-4 ">
        <Link href="https://github.com/earth774" target="_blank" aria-label="GitHub">
          <Github className="text-gray-700" size={20} />
        </Link>
        <Link href="https://x.com/SutthiponGEarth" target="_blank" aria-label="Twitter">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-700">
            <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Link>
        <Link href="https://www.linkedin.com/in/sutthipong-nuanma-899389133/" target="_blank" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-700">
            <path fill="currentColor" d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
          </svg>
        </Link>
      </div>
    </nav>

  )
}

export default NavMenu