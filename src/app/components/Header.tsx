import Image from 'next/image'
import NavMenu from "@/app/components/NavMenu"
import WavyUnderline from "@/app/components/icons/WavyUnderline"

interface HeaderProps {
    className?: string;
}

const Header = (props: HeaderProps) => {
    return (
        <header className={`flex flex-col gap-4 px-8 animate-fade-in relative ${props.className}`}>
            {/* Profile Section */}
            <div className="flex flex-row gap-2">
                <Image
                    src="/profile.jpg"
                    alt="Profile picture"
                    width={96}
                    height={96}
                    className="rounded-full"
                />
                <div className="flex flex-col justify-center gap-2">
                    <h1 className="text-md sm:text-xl font-semibold">Sutthiphong Nuanma</h1>
                    <p className="text-sm sm:text-lg text-gray-400">Software Developer</p>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="">
                <NavMenu />
            </div>

            {/* Introduction */}
            <p className="text-sm sm:text-lg">
                Hi 👋 My name is earth 🌎 I&apos;m Developer live in Chiang Rai, Thailand 🇹🇭
            </p>

            <WavyUnderline />
        </header>
    )
}

export default Header