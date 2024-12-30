import Link from "next/link";

interface NavLinkBlogProps {
    href: string;
    text: string;
    className?: string;
}

const NavLinkBlog = (props: NavLinkBlogProps) => {
    return (
        <Link href={props.href} className={`text-black underline decoration-wavy decoration-[#51a800] decoration-[10%] underline-offset-[25%] hover:bg-[#FFD700] ${props.className}`}>{props.text}</Link>
    )
}

export default NavLinkBlog