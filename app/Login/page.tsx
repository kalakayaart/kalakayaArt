"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ FIXED CREDENTIALS
    if (email === "admin@kalakaya.art" && password === "Kalakaya@2026") {
      localStorage.setItem("token", "admin-auth"); // session create
      setError("");
      router.push("/Dashboard/Admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white text-black">

      <form
        onSubmit={handleLogin}
        className="w-[400px] p-8 border border-black flex flex-col gap-4"
      >
        <h1 className="text-xl font-semibold text-center text-black">
          ADMIN LOGIN
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-black p-3 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-black p-3 outline-none"
        />

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="bg-black text-white py-3 hover:bg-red-600 transition"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}