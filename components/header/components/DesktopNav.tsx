"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, ExternalLink } from "lucide-react";
import { NAV_LINKS } from "./navLinks";

interface Props {
  openDropdown: string | null;
  setOpenDropdown: (val: string | null) => void;
  searchOpen: boolean;
  setSearchOpen: (val: boolean) => void;
  scrolled: boolean;
  setScrolled: (val: boolean) => void;
}

export default function DesktopNav({
  openDropdown,
  setOpenDropdown,
  searchOpen,
  setSearchOpen,
  scrolled,
  setScrolled,
}: Props) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [overlayTop, setOverlayTop] = useState(213); // default

  const isDropdownOpen = !!openDropdown;

  // ================= SCROLL EFFECT =================
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 20);

      // header height = 160
      // navbar height = 53
      const headerHeight = 160;
      const navbarHeight = 53;

      // When scrolling, header goes up, so adjust overlay
      const newTop = Math.max(navbarHeight, headerHeight + navbarHeight - scrollY);

      setOverlayTop(newTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrolled]);

  // ================= AUTO FOCUS SEARCH =================
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <>
      {/* ================= BLUR OVERLAY ================= */}
      {isDropdownOpen && (
        <div
          className="fixed left-0 right-0 bottom-0 bg-black/20 backdrop-blur-md transition-all duration-200"
          style={{
            top: `${overlayTop}px`,
            zIndex: 30,
          }}
          onClick={() => setOpenDropdown(null)}
        />
      )}

      {/* ================= NAVBAR ================= */}
      <nav
        className={`hidden md:flex sticky top-0 w-full transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
        style={{
          zIndex: 40,
          height: "53px",
          paddingRight: "100px",
          paddingBottom: "20px",
          background: scrolled ? "#FFFDFDB2" : "transparent",
          backdropFilter: scrolled ? "blur(4px)" : "none",
        }}
      >
        <div className="flex w-full justify-end items-center gap-[78px]">
          {!searchOpen && (
            <>
              {NAV_LINKS.map((link) =>
                link.dropdown ? (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label
                        )
                      }
                      className="text-black hover:underline"
                      style={{
                        fontFamily: "Mustica Pro",
                        fontWeight: 600,
                        fontSize: "24px",
                      }}
                    >
                      {link.label}
                    </button>

                    {openDropdown === link.label && (
                      <div
                        className="absolute top-full mt-3 w-56 bg-white shadow-lg"
                        style={{ zIndex: 50 }}
                      >
                        {link.dropdown.map((item: any) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2 hover:bg-gray-100"
                            style={{
                              fontFamily: "Mustica Pro",
                              fontWeight: 600,
                              fontSize: "20px",
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    className="flex items-center gap-2 text-black hover:underline"
                    style={{
                      fontFamily: "Mustica Pro",
                      fontWeight: 600,
                      fontSize: "24px",
                    }}
                  >
                    {link.label}
                    {link.external && <ExternalLink size={20} />}
                  </Link>
                )
              )}

              <button onClick={() => setSearchOpen(true)}>
                <Search size={22} />
              </button>
            </>
          )}

          {searchOpen && (
            <div className="flex items-center gap-5">
              <input
                ref={searchRef}
                placeholder="Search..."
                onBlur={() => setSearchOpen(false)}
                className="border-b border-black outline-none bg-transparent w-[300px]"
              />
              <button onClick={() => setSearchOpen(false)}>Close</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}