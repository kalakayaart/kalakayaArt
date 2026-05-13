"use client";

import React from "react";

// ─── Icons ─────────────────────────────────────────────────────────────

const FacebookIcon = () => (
  <svg className="w-8 h-8 md:w-[50px] md:h-[50px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-8 h-8 md:w-[50px] md:h-[50px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-8 h-8 md:w-[50px] md:h-[50px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.88-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 1 0 6.34 6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-8 h-8 md:w-[50px] md:h-[50px]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.26 5.632z" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" stroke="#CA2128" fill="none" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" stroke="#CA2128" fill="none" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
);

// ─── Social Links ──────────────────────────────────────────────────────

const socialLinks = [
  {
    icon: FacebookIcon,
    url: "https://www.facebook.com/share/18imQGnRLo/",
  },
  {
    icon: InstagramIcon,
    url: "https://www.instagram.com/kalakaya.art?igsh=aGZremp4YTIzYjRt",
  },
  {
    icon: TikTokIcon,
    url: "https://www.tiktok.com/@kalakaya.art?_r=1&_t=ZS-95uJu5Myfjc",
  },
  {
    icon: XIcon,
    url: "#", // add later
  },
];

// ─── Footer ─────────────────────────────────────────────────────────────

const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-[1240px] mx-auto bg-white px-4 md:px-8 py-10 flex flex-col justify-between">

      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-8">

        {/* Left */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 gap-x-8 md:gap-x-[80px] lg:gap-x-[120px] w-full">

          {/* Contact */}
          <div>
            <p className="text-[#CA2128] text-[20px] md:text-[24px] font-semibold">
              Contact
            </p>

            <div className="mt-3 flex flex-col gap-3 text-[16px]" style={{ fontFamily: "EB Garamond, serif" }}>
              <div className="flex items-center gap-2 text-[#000000] ">
                <PhoneIcon /> +977-9843562694
              </div>
              <div className="flex items-center gap-2 text-[#000000]">
                <MailIcon /> info@kalakaya.art
              </div>
            </div>
          </div>

          {/* Policies */}
          <div>
            <p className="text-[#CA2128] text-[20px] md:text-[24px] font-semibold">
              Policies
            </p>

            <div className="mt-3 flex flex-col gap-3 text-[16px] text-[#000000]" style={{ fontFamily: "EB Garamond, serif" }}>
              {["Tax Policy", "Privacy Policy", "Cookie Policy", "Terms of Use"].map((item) => (
                <a key={item} href="#" className="hover:underline">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <p className="text-[#CA2128] text-[20px] md:text-[24px] font-semibold">
              Help and Assistance
            </p>

            <div className="mt-3 flex flex-col gap-3 text-[16px] text-[#000000]" style={{ fontFamily: "EB Garamond, serif" }}>
              {["Placing Order", "Shipping and Delivery", "Return", "FAQ"].map((item) => (
                <a key={item} href="#" className="hover:underline">
                  {item}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Right */}
        <div className="flex flex-row sm:flex-col items-center gap-4">
          <p className="text-[#CA2128] text-[20px] md:text-[24px] font-semibold">
            Archives
          </p>

          <button className="bg-[#CA2128] text-white text-[18px] md:text-[24px] font-semibold px-6 h-[44px] rounded-full hover:bg-[#a81b22] active:scale-95 transition">
            Login
          </button>
        </div>

      </div>

      {/* Bottom */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-6">

        {/* Copyright */}
        <div className="text-[14px] sm:text-[18px] text-[#CA2128] opacity-60 text-center sm:text-left">
          <p>COPYRIGHT © 2026 kalakaya.art</p>
          <p>ALL RIGHTS RESERVED</p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3 md:gap-4 text-[#CA2128] justify-center">
          {socialLinks.map(({ icon: Icon, url }, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 hover:scale-110 transition"
            >
              <Icon />
            </a>
          ))}
        </div>

      </div>

    </footer>
  );
};

export default Footer;