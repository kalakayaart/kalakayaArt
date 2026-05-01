"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAV_LINKS } from "./navLinks";

export default function MobileMenu({
  mobileMenuOpen,
  mobileDropdown,
  setMobileDropdown,
  setMobileMenuOpen,
}: any) {
  if (!mobileMenuOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">

      {NAV_LINKS.map((link) =>
        link.dropdown ? (
          <div key={link.label}>
            <button
              onClick={() =>
                setMobileDropdown(mobileDropdown === link.label ? null : link.label)
              }
              className="w-full flex justify-between p-4 font-bold"
            >
              {link.label}
              <ChevronDown />
            </button>

            {mobileDropdown === link.label &&
              link.dropdown.map((item: any) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block pl-8 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
          </div>
        ) : (
          <Link
            key={link.label}
            href={link.href}
            className="block p-4 font-bold"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        )
      )}
    </div>
  );
}