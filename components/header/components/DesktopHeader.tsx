import Image from "next/image";
import Link from "next/link";

export default function DesktopHeader() {
  return (
    <header className="hidden md:flex w-full justify-center relative" style={{ height: "160px" }}>
      <div className="w-[1440px] h-full relative">

        {/* LOGO (fixed refresh home) */}
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
          className="absolute"
          style={{
            left: "103.29px",
            top: "20px",
            width: "150px",
            height: "151.7px",
          }}
        >
          <Image
            src="/header/Logo.png"
            alt="Kala Kaya Logo"
            width={150}
            height={150}
            priority
            className="object-contain"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        {/* TAGLINE */}
        <div
          className="absolute flex gap-6"
          style={{
            right: "100px",
            top: "30px",
            fontFamily: "Mustica Pro",
            fontWeight: 600,
            fontSize: "16px",
            color: "#B8252B",
          }}
        >
          <span>Kalā (कला) - Art</span>
          <span>Kāya (काय) - Form</span>
        </div>

        {/* DESCRIPTION */}
        <p
          className="absolute text-black"
          style={{
            width: "821px",
            top: "70px",
            left: "334px",
            fontFamily: "Avenir",
            fontWeight: 390,
            fontSize: "14px",
            lineHeight: "1.8",
          }}
        >
          A term derived from the Sanskrit and Buddhist philosophy of Kāya, Vāka, Citta― representing the unity of body, speech, and mind. Kalā Kāya translates to The Form of Art.
        </p>

      </div>
    </header>
  );
}