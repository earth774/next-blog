import Link from "next/link";

const NavLinkBlog = (props: any) => {
    return (
        <Link href={props.href} className={`text-black underline decoration-wavy decoration-[#51a800] decoration-[10%] underline-offset-[25%] hover:bg-[#FFD700] ${props.className}`}>{props.text}</Link>
    )
}

export default NavLinkBlog