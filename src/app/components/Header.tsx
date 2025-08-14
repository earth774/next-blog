import Image from "next/image";
import dynamic from "next/dynamic";

const NavMenu = dynamic(() => import("@/app/components/NavMenu"), {
  ssr: true,
});
const WavyUnderline = dynamic(
  () => import("@/app/components/icons/WavyUnderline"),
  { ssr: true }
);

interface HeaderProps {
  className?: string;
}

const Header = (props: HeaderProps) => {
  return (
    <header
      className={`flex flex-col gap-6 px-8 animate-fade-in relative contain-layout ${props.className}`}
    >
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <Image
          src="/profile.jpg"
          alt="Profile picture"
          width={120}
          height={120}
          className="rounded-full shadow-lg w-24 h-24 sm:w-32 sm:h-32"
          priority
          sizes="(max-width: 640px) 96px, 120px"
        />
        <div className="flex flex-col justify-center gap-2 text-center sm:text-left">
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900">
            Sutthiphong Nuanma
          </h1>
          <p className="text-base xs:text-lg sm:text-xl text-gray-700 font-medium">
            Software Developer
          </p>
          <p className="text-xs xs:text-sm text-gray-600">
            📍 Chiang Rai, Thailand 🇹🇭
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {[
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "Laravel",
          "MySQL",
          "PostgreSQL",
          "Docker",
        ].map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Introduction */}
      <div className="max-w-2xl">
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          Hi 👋 I&apos;m <strong>Earth</strong> 🌎 A passionate Software
          Developer with expertise in modern web technologies. I love building
          scalable applications and sharing knowledge through writing.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="">
        <NavMenu />
      </div>

      <WavyUnderline />
    </header>
  );
};

export default Header;
