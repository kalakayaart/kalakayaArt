"use client";

import { Section } from "./types";

export default function Sidebar({
  active,
  setActive,
}: {
  active: Section;
  setActive: (s: Section) => void;
}) {
  const menu = [
    { key: "dashboard", label: "Dashboard" },
    { key: "artists", label: "Artists" },
    { key: "art", label: "Art" },
    { key: "articles", label: "Articles" },
    { key: "orders", label: "Orders" },
    { key: "customers", label: "Customers" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <aside className="w-[240px] h-screen bg-white border-r border-black flex flex-col p-6">

      {/* Logo / Brand */}
      <div className="mb-10">
        <h2
          style={{
            fontFamily: "Mustica Pro",
            fontSize: "22px",
            fontWeight: 600,
            color: "#000",
          }}
        >
          ArtAdmin
        </h2>
        <div className="w-10 h-[2px] bg-red-600 mt-2"></div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const isActive = active === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setActive(item.key as Section)}
              className={`text-left px-3 py-2 transition-all duration-200 border-l-2 ${
                isActive
                  ? "border-red-600 text-red-600 bg-black/5"
                  : "border-transparent text-black hover:border-black hover:bg-black/5"
              }`}
              style={{
                fontFamily: "Mustica Pro",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-black">
        <p
          style={{
            fontFamily: "Mustica Pro",
            fontSize: "12px",
            color: "#000",
          }}
        >
          Admin Panel v1.0
        </p>
      </div>
    </aside>
  );
}