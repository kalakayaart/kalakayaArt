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
    <div className="md:hidden bg-white shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto font-mustica">
      {NAV_LINKS.map((link) =>
        link.dropdown ? (
          <div key={link.label} className="border-b border-gray-100">
            <button
              onClick={() =>
                setMobileDropdown(mobileDropdown === link.label ? null : link.label)
              }
              className="w-full flex justify-between p-5 font-semibold text-gray-900 text-[18px]"
            >
              {link.label}
              <ChevronDown className={`transition-transform ${mobileDropdown === link.label ? "rotate-180" : ""}`} />
            </button>

            {mobileDropdown === link.label && (
              <div className="bg-gray-50 py-2">
                {link.dropdown.map((item: any) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block pl-10 py-3 text-[16px] text-gray-700 hover:text-red-600"
                    onClick={() => setMobileMenuOpen(false)}
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
            className="block p-5 font-semibold text-gray-900 text-[18px] border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        )
      )}
    </div>
  );
}