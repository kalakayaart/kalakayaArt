"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";
import Image from "next/image";

export default function WorkPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {/* HEADER */}
      <Header />

      {/* MAIN */}
      <main className="flex-1 flex flex-col md:flex-row items-start gap-8 px-4 md:px-[100px] py-[60px] md:py-[100px]">

        {/* LEFT — "working" text image */}
        <div className="w-full md:w-[462px] flex-shrink-0">
          <Image
            src="/working/work.png"
            alt="Working Text"
            width={462}
            height={115}
            className="w-full h-auto object-contain"
            style={{ opacity: 1 }}
          />
        </div>

        {/* RIGHT — work image */}
        <div className="w-full md:w-[468px] flex-shrink-0">
          <Image
            src="/working/working.png"
            alt="Work Image"
            width={468}
            height={282}
            className="w-full h-auto object-cover"
            style={{ opacity: 1 }}
          />
        </div>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}