"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import DashboardPanel from "./components/DashboardPanel";
import ArtistsPanel from "./components/ArtistsPanel";
import ArtPanel from "./components/ArtPanel";
import ArticlesPanel from "./components/ArticlesPanel";
import CustomersPanel from "./components/CustomersPanel";
import SettingsPanel from "./components/SettingsPanel";

import { Section } from "./components/types";

export default function AdminPage() {
  const [active, setActive] = useState<Section>("dashboard");
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  // 🔐 AUTH + SESSION GUARD
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/Login");
      return;
    }

    setIsChecking(false);
  }, [router]);

  // 🔥 AUTO LOGOUT ON TAB CLOSE
  useEffect(() => {
    const handleTabClose = () => {
      localStorage.removeItem("token");
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  const renderPanel = () => {
    switch (active) {
      case "dashboard":
        return <DashboardPanel />;
      case "artists":
        return <ArtistsPanel />;
      case "art":
        return <ArtPanel />;
      case "articles":
        return <ArticlesPanel />;
      case "customers":
        return <CustomersPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  // ⛔ prevent flash before redirect
  if (isChecking) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-white text-black">
      <Sidebar active={active} setActive={setActive} />

      <div className="flex-1 flex flex-col">
        <Topbar active={active} />

        <div className="p-6">{renderPanel()}</div>
      </div>
    </div>
  );
}