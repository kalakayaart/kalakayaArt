"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full max-w-[1240px] mx-auto mt-8 md:mt-16 px-4 md:px-6 flex flex-col md:flex-row gap-8 md:gap-12">

      {/* LEFT IMAGE */}
      <div className="w-full md:w-1/2">
        <Image
          src="/about/new.png"
          alt="About"
          width={400}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full md:w-1/2 flex flex-col space-y-6 md:space-y-12">

        {/* MAIN HEADING */}
        <h2 className="text-[24px] md:text-[32px] font-semibold leading-relaxed font-[Mustica_Pro,sans-serif]">
          Explore and celebrate the art and heritage that defines Nepal.
        </h2>

        {/* BODY TEXT */}
        <p className="text-[15px] md:text-[16px] text-left md:text-justify leading-relaxed font-[EB_Garamond,serif] tracking-wide">
          Kalā Kāya was founded out of a strong desire to keep and honor Nepal's artistic heritage.
          It is rooted in our country's rich cultural fabric and aims to be more than just a digital platform.
          It is meant to be a living archive of Nepali art, based on timeless stories, lived experiences,
          historical monuments, and artistic representations that define our heritage.
        </p>

        {/* PURPOSE SECTION */}
        <div className="space-y-4 md:space-y-12 mt-4 md:mt-12">

          {/* PURPOSE HEADING */}
          <h3 className="text-[24px] md:text-[32px] font-semibold leading-relaxed font-[Mustica_Pro,sans-serif]">
            Purpose
          </h3>

          {/* PURPOSE BODY */}
          <p className="text-[15px] md:text-[16px] text-left md:text-justify leading-relaxed font-[EB_Garamond,serif] tracking-wide">
            To create a lasting digital sanctuary for Nepali art that preserves its heritage, celebrates its creators,
            and inspires future generations through education, critical discourse, and creative representation.
            <br /><br />
            Kalā Kāya documents and showcases the diverse expressions of Nepali art through well-researched content on its
            origins, histories, and styles. It highlights the journeys of artists from across Nepal while maintaining an
            accessible archive of traditions, exhibitions, and narratives. Through educative resources and merchandise,
            Kalā Kāya promotes cultural awareness and appreciation — all while directly supporting the artists behind the work.
          </p>

        </div>
      </div>
    </section>
  );
}
