import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/pictures/navbar-logo.webp";

const Navbar = () => {
  return (
    <nav className="flex w-full shadow-lg fixed space-x-1">
      <Link href="/">
        <Image
          src={Logo}
          alt="acapair-logo"
          width={0}
          height={0}
          sizes="180px"
          decoding="async"
          data-nimg="1"
          style={{ color: "transparent" }}
          className="w-full h-auto"
          priority
        />
      </Link>
    </nav>
  );
};

export default Navbar;
