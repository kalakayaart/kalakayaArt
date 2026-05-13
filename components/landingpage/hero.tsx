"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const slides = [
    {
      image: "/landingpage/image 1.png",
      heroText: `Ordinary people are attracted by colors,
Women are charmed by ornamentation,
Connoisseurs prefer the brushwork,
But the masters admire the line.
  -Vishnudharmottarapurana`,
      artworkDetails: [
        "Artist Name",
        "Name of Artwork",
        "2023",
        "Medium of Artwork",
        "07 x 23 x 95",
      ],
    },
    {
      image: "/landingpage/hero.png",
      heroText: `Power is not an institution,and not a structure;
       neither is it a certain strength we are endowed with; 
      it is the name that one attributes to a complex 
      strategical situation in a particular society.
      -Michel Foucault`,
      artworkDetails: [
        "Second Artist",
        "Second Artwork",
        "2022",
        "Oil on Canvas",
        "10 x 30 x 80",
      ],
    },
  ];

  const [index, setIndex] = useState(0);

  // AUTO CHANGE EVERY 5 SECONDS
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section className="w-full bg-white py-10 md:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10">

        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-10 md:min-h-[500px] items-stretch">

          {/* LEFT SIDE - TEXT */}
          <div className="flex flex-col justify-between h-full pl-0 md:pl-20 transition-all duration-700">

            {/* HERO TEXT */}
           <h1
   className="text-gray-900 whitespace-pre-line mb-6 font-garamond italic"
   style={{
     fontSize: "clamp(16px, 4vw, 20px)",
     lineHeight: "1.6",
     letterSpacing: "0.01em",
     verticalAlign: "middle",
   }}
 >
   {current.heroText}
 </h1>

            {/* ARTWORK DETAILS */}
            <div
              className="space-y-1 text-gray-800 font-garamond font-extrabold"
              style={{
  fontSize: "clamp(14px, 3.5vw, 16px)",
  lineHeight: "1.5",
  letterSpacing: "0.01em",
  textAlign: "left",
  verticalAlign: "middle",
}}
            >
              {current.artworkDetails.map((item, i) => (
                <p
                  key={i}
                  className="cursor-pointer hover:text-[#DC2626]"
                >
                  {item}
                </p>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE - IMAGE */}
<div className="w-full h-[280px] sm:h-[380px] md:h-[500px] relative flex justify-end overflow-hidden cursor-pointer transition-all duration-700">

  <div className="relative w-full md:w-[95%] h-full">
    <Image
      src={current.image}
      alt="Hero Image"
      fill
      className="object-contain transition-all duration-700"
      priority
    />
  </div>

</div>

        </div>
      </div>
    </section>
  );
}