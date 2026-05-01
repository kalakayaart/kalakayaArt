"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] md:h-[800px]">
      
      {/* BACKGROUND */}
      <Image
        src="/residency/residency.jpg"
        alt="Residency"
        fill
        className="object-cover"
        priority
      />

      {/* HERO TEXT */}
      <div className="absolute top-6 left-6 md:top-10 md:left-20 w-[240px] md:w-[592px] h-[140px] md:h-[352px]">
        <Image
          src="/residency/herofont.png"
          alt="Hero Text"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* ================= APPLY BUTTON (STICKY) ================= */}
<div className="absolute bottom-6 left-6 md:left-10 w-[120px]">
  <div className="sticky top-[70px]">
    <button
      onClick={() =>
        window.open(
          "https://docs.google.com/forms/d/1SVaRszhDpYgaU_-wY07FcJZXfPdTSNWXNOCFFC2wZs8/edit?pli=1",
          "_blank"
        )
      }
      className="w-full h-[50px] rounded-[25px] bg-[#CA2128] text-white hover:opacity-90 transition"
      style={{
        fontFamily: "Mustica Pro, sans-serif",
        fontWeight: 600,
        fontSize: "20px",
      }}
    >
      Apply
    </button>
  </div>
</div>
      {/* ================= DOWNLOAD PDF ================= */}
      <a
        href="/residency/file.pdf"
        download="residency-details.pdf"
        className="absolute bottom-6 right-6 md:right-20 text-white hover:underline"
        style={{
          fontFamily: "Avenir, sans-serif",
          fontWeight: 400,
          fontSize: "24px",
        }}
      >
        Download PDF
      </a>

    </section>
  );
}