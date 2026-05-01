// components/Amenities.tsx
// Usage: import Amenities from "@/components/Amenities";

import React from "react";

interface Amenity {
  label: string;
  icon: React.ReactNode;
}

const amenities: Amenity[] = [
  {
    label: "Private Entrance",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="20" height="24" rx="1" />
        <path d="M6 8h3M23 8h3M6 24h3M23 24h3" />
        <line x1="16" y1="4" x2="16" y2="28" />
      </svg>
    ),
  },
  {
    label: "Free Parking",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="5" width="22" height="22" rx="2" />
        <path d="M12 22V10h5a4 4 0 010 8h-5" />
      </svg>
    ),
  },
  {
    label: "Free Wi-Fi",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 12Q16 4 26 12" />
        <path d="M9 16Q16 10 23 16" />
        <path d="M12 20Q16 16 20 20" />
        <circle cx="16" cy="24" r="1.5" fill="#333333" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Linens and Towels",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="4" width="8" height="20" rx="1" />
        <path d="M12 8H8a1 1 0 00-1 1v10a1 1 0 001 1h4" />
        <path d="M20 8h4a1 1 0 011 1v10a1 1 0 01-1 1h-4" />
        <line x1="10" y1="24" x2="22" y2="24" />
      </svg>
    ),
  },
  {
    label: "Personal Living Room",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20v-6a3 3 0 013-3h18a3 3 0 013 3v6" />
        <rect x="2" y="20" width="28" height="5" rx="1" />
        <line x1="8" y1="25" x2="8" y2="28" />
        <line x1="24" y1="25" x2="24" y2="28" />
      </svg>
    ),
  },
  {
    label: "Dedicated Working Space",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="18" width="24" height="4" rx="1" />
        <rect x="9" y="10" width="14" height="8" rx="1" />
        <line x1="16" y1="22" x2="16" y2="27" />
        <line x1="11" y1="27" x2="21" y2="27" />
      </svg>
    ),
  },
  {
    label: "Personal Lavatory",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 24h20M6 24V12a4 4 0 014-4h4" />
        <path d="M14 8a3 3 0 013 3v13" />
        <path d="M6 18h8" />
      </svg>
    ),
  },
  {
    label: "Hot Shower",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 8Q10 4 16 4Q22 4 22 8" />
        <rect x="9" y="8" width="14" height="14" rx="1" />
        <line x1="12" y1="22" x2="12" y2="27" />
        <line x1="20" y1="22" x2="20" y2="27" />
        <line x1="9" y1="27" x2="23" y2="27" />
        <path d="M12 12l1 1M16 12l1 1M20 12l1 1M12 16l1 1M16 16l1 1M20 16l1 1" />
      </svg>
    ),
  },
  {
    label: "2 Person Dining",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="22" x2="28" y2="22" />
        <line x1="7" y1="22" x2="7" y2="28" />
        <line x1="25" y1="22" x2="25" y2="28" />
        <line x1="10" y1="14" x2="10" y2="22" />
        <line x1="22" y1="14" x2="22" y2="22" />
        <line x1="13" y1="14" x2="13" y2="22" />
        <line x1="19" y1="14" x2="19" y2="22" />
        <line x1="10" y1="14" x2="22" y2="14" />
      </svg>
    ),
  },
  {
    label: "Tableware",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="11" y1="8" x2="11" y2="24" />
        <line x1="16" y1="8" x2="16" y2="24" />
        <line x1="21" y1="8" x2="21" y2="24" />
        <path d="M9 8Q11 6 13 8" />
        <path d="M14 8Q16 6 18 8" />
        <path d="M19 8Q21 6 23 8" />
        <line x1="9" y1="15" x2="13" y2="15" />
      </svg>
    ),
  },
  {
    label: "Refrigerator",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="5" width="14" height="22" rx="2" />
        <line x1="9" y1="14" x2="23" y2="14" />
        <line x1="13" y1="10" x2="13" y2="12" />
        <line x1="13" y1="17" x2="13" y2="21" />
      </svg>
    ),
  },
  {
    label: "Stove",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="12" width="22" height="13" rx="1" />
        <line x1="5" y1="18" x2="27" y2="18" />
        <circle cx="9" cy="15" r="1" fill="#333333" stroke="none" />
        <circle cx="13" cy="15" r="1" fill="#333333" stroke="none" />
        <rect x="8" y="20" width="5" height="3" rx="0.5" />
        <rect x="15" y="20" width="7" height="3" rx="0.5" />
      </svg>
    ),
  },
  {
    label: "Microwave",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="9" width="20" height="15" rx="2" />
        <rect x="9" y="12" width="8" height="6" rx="1" />
        <circle cx="21" cy="15" r="2" />
        <line x1="20" y1="24" x2="20" y2="27" />
        <line x1="12" y1="24" x2="12" y2="27" />
      </svg>
    ),
  },
  {
    label: "Hot Water Kettle",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="16" cy="10" rx="5" ry="3" />
        <path d="M11 10L11 26Q16 28 21 26L21 10" />
        <line x1="16" y1="7" x2="16" y2="4" />
        <path d="M13 4Q16 2 19 4" />
      </svg>
    ),
  },
  {
    label: "Rice Cooker",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="16" cy="22" rx="9" ry="3" />
        <path d="M7 22L8 14Q16 10 24 14L25 22" />
        <ellipse cx="16" cy="14" rx="8" ry="3" />
        <line x1="16" y1="14" x2="16" y2="8" />
        <circle cx="16" cy="8" r="2" />
      </svg>
    ),
  },
  {
    label: "Toaster",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="14" width="18" height="11" rx="2" />
        <line x1="11" y1="14" x2="11" y2="10" />
        <line x1="16" y1="14" x2="16" y2="9" />
        <line x1="21" y1="14" x2="21" y2="10" />
        <line x1="7" y1="20" x2="25" y2="20" />
      </svg>
    ),
  },
  {
    label: "Portable Heater",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="6" width="14" height="20" rx="1" />
        <rect x="11" y="9" width="10" height="7" rx="0.5" />
        <line x1="11" y1="19" x2="21" y2="19" />
        <line x1="11" y1="22" x2="21" y2="22" />
        <path d="M9 26Q16 28 23 26" />
      </svg>
    ),
  },
  {
    label: "Portable Fan",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="14" r="6" />
        <line x1="16" y1="8" x2="16" y2="4" />
        <line x1="16" y1="20" x2="16" y2="26" />
        <line x1="10" y1="14" x2="4" y2="14" />
        <line x1="22" y1="14" x2="28" y2="14" />
        <line x1="11.5" y1="9.5" x2="8" y2="6" />
        <line x1="20.5" y1="9.5" x2="24" y2="6" />
        <line x1="16" y1="26" x2="14" y2="28" />
        <line x1="16" y1="26" x2="18" y2="28" />
      </svg>
    ),
  },
  {
    label: "Paid Laundry Available",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="9" />
        <circle cx="16" cy="16" r="5" />
        <circle cx="16" cy="16" r="1.5" fill="#333333" stroke="none" />
      </svg>
    ),
  },
  {
    label: "First-Aid",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="8" width="18" height="18" rx="2" />
        <line x1="16" y1="12" x2="16" y2="20" />
        <line x1="12" y1="16" x2="20" y2="16" />
      </svg>
    ),
  },
];

export default function Amenities() {
  return (
    <div className="w-full bg-white py-10">

      <h2
        className="mb-6 px-4 md:px-[60px] text-[20px] md:text-[24px]"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          lineHeight: 1.3,
          color: "#000000",
        }}
      >
        Amenities
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {amenities.map((amenity) => (
          <div
            key={amenity.label}
            className="flex items-center gap-3 py-5 md:py-8 px-4 md:px-[60px] border-b border-gray-100"
          >
            {/* icon wrapper — explicit white bg + fixed color prevents mobile dark-mode bleed */}
            <span
              className="flex-shrink-0"
              style={{ color: "#333333", backgroundColor: "transparent" }}
            >
              {amenity.icon}
            </span>

            <span
              className="text-[11px] md:text-[13px] leading-snug"
              style={{
                fontFamily: "EB Garamond, serif",
                color: "#555555",
              }}
            >
              {amenity.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}