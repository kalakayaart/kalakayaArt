import localFont from "next/font/local";

export const mustica = localFont({
  src: [
    {
      path: "../public/fonts/MusticaPro-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-mustica",
  display: "swap",
});