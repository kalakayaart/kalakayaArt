"use client";

import { useState } from "react";
import DesktopHeader from "./components/DesktopHeader";
import DesktopNav from "./components/DesktopNav";
import MobileHeader from "./components/MobileHeader";
import MobileMenu from "./components/MobileMenu";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  return (
    <>
      <div className="h-[20px]" />

      <DesktopHeader />

      <DesktopNav
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        scrolled={scrolled}
        setScrolled={setScrolled}
      />

      <MobileHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        mobileDropdown={mobileDropdown}
        setMobileDropdown={setMobileDropdown}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </>
  );
}
