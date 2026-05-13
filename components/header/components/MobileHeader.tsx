import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type MobileHeaderProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileHeader({
  mobileMenuOpen,
  setMobileMenuOpen,
}: MobileHeaderProps) {
  return (
    <div className="flex md:hidden justify-between items-center p-4 border-b bg-white relative z-50">

      <Link href="/">
        <Image
          src="/header/Logo.png"
          width={120}
          height={40}
          alt="Logo"
          className="h-auto"
          priority
        />
      </Link>
      <button
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
        className="p-2 relative z-50 text-black"
      >
        {mobileMenuOpen ? (
          <X size={26} className="text-black" />
        ) : (
          <Menu size={26} className="text-black" />
        )}
      </button>

    </div>
  );
}