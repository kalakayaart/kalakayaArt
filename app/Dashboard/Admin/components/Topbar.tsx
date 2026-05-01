"use client";

import { useRouter } from "next/navigation";
import { Section } from "./types";

export default function Topbar({ active }: { active: Section }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // end session
    router.push("/Login"); // redirect
  };

  return (
    <header className="w-full h-[70px] bg-white border-b border-black flex items-center justify-between px-6">

      <h1 className="capitalize font-semibold">{active}</h1>

      <button
        onClick={handleLogout}
        className="border border-red-600 text-red-600 px-4 py-2 hover:bg-red-600 hover:text-white transition"
      >
        Logout
      </button>

    </header>
  );
}