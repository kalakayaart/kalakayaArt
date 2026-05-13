"use client";

import Image from "next/image";

export default function Residency() {
  return (
    <div className="w-full bg-white overflow-x-hidden">

      {/* ================= OVERVIEW ================= */}
      <section className="w-full mt-10 px-4 md:px-[60px] py-6">
        <div className="w-full">
          <h2
            className="text-[24px] md:text-[32px] mb-4"
            style={{
              fontFamily: "Mustica Pro, sans-serif",
              fontWeight: 600,
              color: "#000000",
              lineHeight: "1.1",
              letterSpacing: "0%",
            }}
          >
            Overview
          </h2>
          <p
            className="text-[15px] md:text-[16px]"
            style={{
              fontFamily: "EB Garamond, serif",
              fontWeight: 400,
              lineHeight: "1.1",
              letterSpacing: "0",
              textAlign: "left",
              color: "#000000",
            }}
          >
            The Kalā Kāya Researcher in Residence is Nepal's first dedicated residency program for researchers working in cultural, architectural, and archaeological heritage. Based in Maharajgunj, Kathmandu, the program brings scholars into direct, sustained engagement with Nepal's heritage landscape, its expert communities, and its primary source holdings. It proceeds from a simple conviction: that the most consequential questions in this field are best pursued in proximity to the material and the people who know it.
          </p>
        </div>
      </section>

      {/* ================= WHY APPLY ================= */}
      <section className="w-full mt-10 px-4 md:px-[60px] py-6">
        <div className="w-full">
          <h2
            className="text-[24px] md:text-[32px] mb-4"
            style={{
              fontFamily: "Mustica Pro, sans-serif",
              fontWeight: 600,
              color: "#000000",
              lineHeight: "1.1",
              letterSpacing: "0%",
            }}
          >
            Why Apply?
          </h2>
          <div
            className="text-[15px] md:text-[16px] space-y-4"
            style={{
              fontFamily: "EB Garamond, serif",
              fontWeight: 400,
              lineHeight: "1.6",
              letterSpacing: "0",
              textAlign: "left",
              color: "#000000",
            }}
          >
            <p>
              Nepal presents an unusual scholarly situation. The archaeological record, the architectural landscape, and living practice remain in proximity to one another in ways that are increasingly rare. Licchavi-period inscriptions survive in courtyards where puja is still performed daily. Artistic lineages documented in medieval colophons continue in the workshops of Bhaktapur and Patan. Communities carry technical and ritual knowledge that has never been fully committed to writing. At the same time, the historiography of the region remains uneven. Access to primary sources is difficult. Sustained fieldwork is logistically demanding. Many of the most important scholarly conversations happen in Kathmandu, in Nepali, in rooms that visiting researchers rarely enter.
            </p>
            <p>
              The residency is an attempt to address some of that unevenness. It does not promise to resolve the structural difficulties of working in Nepal, but it offers something practically useful: a structured entry point into the field, a network of scholars and practitioners willing to engage seriously with your work, and protected time in which to develop it.
            </p>
          </div>
        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <div className="mt-12 px-4 md:px-[60px]">
        <h2
          className="text-[24px] md:text-[32px] mb-4"
          style={{
            fontFamily: "Mustica Pro, sans-serif",
            fontWeight: 600,
            color: "#000000",
            lineHeight: "1.1",
            letterSpacing: "0%",
          }}
        >
          Location
        </h2>
      </div>

      <section className="w-full mt-4 px-4 md:px-[60px]">
        <p
          className="text-[15px] md:text-[16px]"
          style={{
            fontFamily: "EB Garamond, serif",
            fontWeight: 400,
            lineHeight: "1.6",
            letterSpacing: "0",
            textAlign: "left",
            color: "#000000",
          }}
        >
          The residency is based in Maharajgunj, a historic neighborhood in Kathmandu and home to the majority of the city's diplomatic missions and international institutions. The neighborhood sits within easy reach of the Valley's major heritage sites, research libraries, and archival institutions. Pashupatinath, Boudhanath, and Swayambhunath, all UNESCO World Heritage Sites, are within fifteen minutes. The National Archives of Nepal and the Kaiser Library are accessible within half an hour. Patan, with its museum and surviving workshop traditions, is a short drive away.
        </p>
      </section>

      {/* ================= GOOGLE MAP ================= */}
      <section className="w-full max-w-[1200px] h-[280px] md:h-[400px] mt-6 mx-auto px-4 md:px-0">
        <iframe
          src="https://www.google.com/maps?q=Maharajgunj,Kathmandu&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "12px" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* ================= WHAT THE RESIDENCY OFFERS ================= */}
      <section className="w-full max-w-[1240px] mt-10 mx-auto px-4 md:px-6">
        <h2
          className="text-[24px] md:text-[32px]"
          style={{
            fontFamily: "Mustica Pro, sans-serif",
            fontWeight: 600,
            lineHeight: "1.1",
            letterSpacing: "0%",
            color: "#000000",
          }}
        >
          What the Residency Offers
        </h2>
      </section>

      {/* SITE VISITS */}
      <section className="w-full max-w-[1240px] mt-10 mx-auto px-4 md:px-6 flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="w-full md:w-[55%] space-y-4">
          <h3
            className="text-[20px] md:text-[24px] md:mt-[250px]"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              lineHeight: "1.3",
              letterSpacing: "0.01em",
              color: "#000000",
            }}
          >
            Site Visits and Field Engagements
          </h3>
          <p
            className="text-[15px] md:text-[16px]"
            style={{
              fontFamily: "EB Garamond, serif",
              fontWeight: 400,
              lineHeight: "1.6",
              letterSpacing: "0",
              textAlign: "left",
              color: "#000000",
            }}
          >
            Guided visits to heritage sites across the Kathmandu Valley, led by specialists in conservation, epigraphy, architectural history, and archaeology. Visits are structured around the resident's research interests rather than a fixed itinerary, and are intended to generate questions as much as to answer them. For researchers whose work extends beyond the Valley, optional extended field visits to highland districts including Mustang and Dolpo are available.
          </p>
        </div>
        <div className="w-full md:w-[40%] flex justify-center md:justify-end">
          <Image
            src="/residency/image.png"
            alt="Site Visit"
            width={508}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* FACULTY MEETINGS */}
      <section className="w-full max-w-[1240px] mt-12 mx-auto px-4 md:px-6 flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="w-full md:w-[40%] flex justify-center">
          <Image
            src="/residency/fac.png"
            alt="Faculty"
            width={500}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-full md:w-[55%] space-y-4">
          <h3
            className="text-[20px] md:text-[24px] md:mt-[200px]"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              lineHeight: "1.3",
              letterSpacing: "0",
              color: "#000000",
            }}
          >
            Faculty and Expert Meetings
          </h3>
          <p
            className="text-[15px] md:text-[16px]"
            style={{
              fontFamily: "EB Garamond, serif",
              fontWeight: 400,
              lineHeight: "1.6",
              letterSpacing: "0",
              textAlign: "left",
              color: "#000000",
            }}
          >
            Structured meetings with academics, historians, and conservation professionals working across Nepal's universities, museums, and heritage institutions. These are not ceremonial introductions.
            They
            are working sessions, organized around the resident's project, with scholars who have agreed to engage substantively with the research.
          </p>
        </div>
      </section>

      {/* ARCHIVAL ACCESS */}
      <section className="w-full max-w-[1240px] mt-12 mx-auto px-4 md:px-6 flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="w-full md:w-[55%] space-y-4">
          <h3
            className="text-[20px] md:text-[24px] md:mt-[40px]"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              lineHeight: "1.3",
              letterSpacing: "0.01em",
              color: "#000000",
            }}
          >
            Archival and Library Access
          </h3>
          <p
            className="text-[15px] md:text-[16px]"
            style={{
              fontFamily: "EB Garamond, serif",
              fontWeight: 400,
              lineHeight: "1.6",
              letterSpacing: "0",
              textAlign: "left",
              color: "#000000",
            }}
          >
            Supported access to archival holdings, photographic records, and documentary collections held by Kalā Kāya and its partner institutions, including materials in Nepali, Sanskrit, and Tibetan. The Kalā Kāya research team assists residents in identifying relevant holdings and navigating collections that are not always straightforward to access independently.
          </p>
        </div>
        <div className="w-full md:w-[40%] flex justify-center md:justify-end">
          <Image
            src="/residency/library.png"
            alt="Library"
            width={500}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* PEER EXCHANGE */}
      <section className="w-full max-w-[1240px] mt-12 mx-auto px-4 md:px-6 flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="w-full md:w-[40%] flex justify-center">
          <Image
            src="/residency/exchange.png"
            alt="Peer Exchange"
            width={400}
            height={300}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-full md:w-[55%] space-y-4">
          <h3
            className="text-[20px] md:text-[24px] md:mt-[100px]"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              lineHeight: "1.3",
              letterSpacing: "0.01em",
            }}
          >
            Peer Exchange
          </h3>
          <p
            className="text-[15px] md:text-[16px]"
            style={{
              fontFamily: "EB Garamond, serif",
              fontWeight: 400,
              lineHeight: "1.6",
              letterSpacing: "0",
              textAlign: "left",
            }}
          >
            Where multiple researchers are in residence simultaneously, the program facilitates structured peer seminars and critical discussion. Residents are also drawn into Kalā Kāya's broader programming where relevant, bringing them into contact with artists, curators, and cultural practitioners whose work intersects with their own.
          </p>
        </div>
      </section>

      {/* RESEARCH DEVELOPMENT SUPPORT */}
      <section className="w-full max-w-[1240px] mt-12 mx-auto px-4 md:px-6 flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="w-full md:w-[55%] space-y-4">
          <h3
            className="text-[20px] md:text-[24px] md:mt-[260px]"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              lineHeight: "1.3",
              letterSpacing: "0",
              color: "#000000",
            }}
          >
            Research Development Support
          </h3>
          <p
            className="text-[15px] md:text-[16px]"
            style={{
              fontFamily: "EB Garamond, serif",
              fontWeight: 400,
              lineHeight: "1.6",
              letterSpacing: "0",
              textAlign: "left",
              color: "#000000",
            }}
          >
            The Kalā Kāya curatorial and research team is available throughout the residency for consultation on research-in-progress, logistical support for field visits, and introductions to contacts within the scholarly and practitioner community.
          </p>
        </div>
        <div className="w-full md:w-[40%] flex justify-center md:justify-end">
          <Image
            src="/residency/research.png"
            alt="Research Support"
            width={500}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* PUBLIC LECTURE */}
      <section className="w-full max-w-[1240px] mt-12 mx-auto px-4 md:px-6 flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="w-full md:w-[40%] flex justify-center">
          <Image
            src="/residency/lecture.png"
            alt="Public Lecture"
            width={500}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-full md:w-[55%] space-y-4">
          <h3
            className="text-[20px] md:text-[24px] md:mt-[260px]"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              lineHeight: "1.3",
              letterSpacing: "0",
              color: "#000000",
            }}
          >
            Public Lecture and Publication
          </h3>
          <p
            className="text-[15px] md:text-[16px]"
            style={{
              fontFamily: "EB Garamond, serif",
              fontWeight: 400,
              lineHeight: "1.6",
              letterSpacing: "0",
              textAlign: "left",
              color: "#000000",
            }}
          >
            The residency culminates in a public lecture hosted by Kalā Kāya, open to scholars, students, practitioners, and the general public. Research developed during the residency is considered for publication through the Kalā Kāya digital archive and Publications imprint.
          </p>
        </div>
      </section>

      {/* ================= PROGRAM STRUCTURE ================= */}
      <section className="w-full max-w-[1240px] mt-16 mx-auto px-4 md:px-6">
        <h3
          className="text-[20px] md:text-[24px] mb-6"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            lineHeight: "1.3",
            letterSpacing: "0",
            color: "#000000",
          }}
        >
          Program Structure
        </h3>
        <div
          className="text-[15px] md:text-[16px] space-y-4"
          style={{
            fontFamily: "EB Garamond, serif",
            fontWeight: 400,
            lineHeight: "1.6",
            letterSpacing: "0",
            textAlign: "left",
            color: "#000000",
          }}
        >
          <p>
            The Kalā Kāya Researcher in Residence runs in three formats, designed to accommodate different research timelines and institutional schedules.
          </p>
          <p>
            The one-month residency follows a structured three-week program of site visits, faculty meetings, archival engagement, and peer exchange, with a final week of independent research time. It is suited to researchers at an early stage of fieldwork, those scoping a new project, or scholars who wish to establish a working foundation in Nepal before returning for longer-term engagement.
          </p>
          <p>
            The two-month residency extends the core program with a second month of deepened archival work, additional faculty meetings, and a more developed public lecture. It is particularly suited to doctoral candidates at the fieldwork or writing stage, or researchers developing a substantial publication.
          </p>
          <p>
            The six-month residency is the program's full offering, designed for researchers undertaking sustained fieldwork in Nepal. Alongside the structured programming of the first month, residents have extended access to Kalā Kāya's scholarly network, archival holdings, and research development support across the full duration. A public lecture is delivered at the close of the residency, with research outputs considered for publication through the Kalā Kāya digital archive and Publications imprint.
          </p>
        </div>
      </section>

      {/* ================= FEES ================= */}
      <section className="w-full max-w-[1240px] mt-16 mx-auto px-4 md:px-6">

        <h3
          className="text-[20px] md:text-[24px] mb-6"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            lineHeight: "1.3",
            letterSpacing: "0",
            color: "#000000",
          }}
        >
          Fees
        </h3>

        {/* TABLE STYLE GRID */}
        <div
          className="grid grid-cols-2 gap-y-3 text-[15px] md:text-[16px] mb-8 max-w-[400px]"
          style={{
            fontFamily: "EB Garamond, serif",
            fontWeight: 400,
            lineHeight: "1.75",
            color: "#000000",
          }}
        >
          <div>One Month</div>
          <div>USD 800</div>

          <div>Two Months</div>
          <div>USD 1,500</div>

          <div>Six Months</div>
          <div>USD 4,000</div>
        </div>

        {/* DESCRIPTION TEXT */}
        <div
          className="text-[15px] md:text-[16px] space-y-4"
          style={{
            fontFamily: "EB Garamond, serif",
            fontWeight: 400,
            lineHeight: "1.6",
            letterSpacing: "0",
            textAlign: "left",
            color: "#000000",
          }}
        >
          <p>
            The fee covers accommodation in Maharajgunj, all programmed site visits and guided field engagements within the Kathmandu Valley, facilitation of faculty and expert meetings, access to Kalā Kāya's archival holdings and partner institution networks, research development support, and hosting of the public lecture. Kalā Kāya will host a welcome and farewell dinner.
          </p>

          <p>
            Residents are responsible for international and domestic travel, daily meals, personal health insurance, research materials, and optional highland field trip costs.
          </p>

          <p>
            Researchers are encouraged to write to us directly to discuss their circumstances or inquire about fee adjustments.
          </p>
        </div>

      </section>

      {/* ================= HOW TO APPLY ================= */}
      <section className="w-full max-w-[1240px] mt-16 mx-auto px-4 md:px-6">
        <h3
          className="text-[20px] md:text-[24px] mb-6"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            lineHeight: "1.3",
            letterSpacing: "0",
            color: "#000000",
          }}
        >
          How to Apply?
        </h3>
        <div
          className="text-[15px] md:text-[16px] space-y-4"
          style={{
            fontFamily: "EB Garamond, serif",
            fontWeight: 400,
            lineHeight: "1.6",
            letterSpacing: "0",
            textAlign: "left",
            color: "#000000",
          }}
        >
          <p>
            Applications are accepted on a rolling basis. We recommend applying at least two months before your intended start date. Kalā Kāya can provide invitation letters and institutional confirmation to support visa applications and funding requests.
          </p>
          <p>
            Application requirements: current curriculum vitae or academic resume, research statement of no more than 1,000 words, one writing sample (published article, term paper, or equivalent; optional), brief description of academic background and research interests, copy of a valid passport, and completed application form.
          </p>
        </div>
      </section>

      {/* ================= THE RESIDENCE ================= */}
      <section className="w-full mt-16">
        <div className="max-w-[1240px] mx-auto px-4 md:px-6 mb-6">
          <h3
            className="text-[20px] md:text-[24px]"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              lineHeight: "1.3",
              letterSpacing: "0",
              color: "#000000",
            }}
          >
            The Residence
          </h3>
        </div>
        <div className="relative w-full h-[300px] md:h-[500px]">
          <Image
            src="/residency/residance.jpg"
            alt="Residence"
            fill
            className="object-cover"
            priority
          />
          <h3
            className="absolute top-6 right-6 text-white text-[20px] md:text-[24px]"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              lineHeight: "1.3",
              letterSpacing: "0",
              color: "#000000",
            }}
          >
            The Residence
          </h3>
        </div>
      </section>

      {/* ================= IMAGE GALLERY ================= */}
      <section className="w-full mt-16 flex flex-col md:flex-row gap-4 md:gap-10">
        {/* LEFT COLUMN */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-8">
          <div className="relative w-full h-[220px] md:h-[800px]">
            <Image src="/residency/rec0.jpg" alt="rec0" fill className="object-cover" />
          </div>
          <div className="relative w-full h-[220px] md:h-[800px]">
            <Image src="/residency/rec4.jpg" alt="rec4" fill className="object-cover" />
          </div>
          <div className="relative w-full h-[220px] md:h-[800px]">
            <Image src="/residency/rec9.jpg" alt="rec9" fill className="object-cover" />
          </div>
        </div>
        {/* RIGHT COLUMN */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-11">
          <Image src="/residency/rec01.jpg" alt="rec01" width={500} height={450} className="w-full object-cover" />
          <Image src="/residency/rec1.jpg" alt="rec1" width={500} height={450} className="w-full object-cover" />
          <Image src="/residency/rec5.jpg" alt="rec5" width={500} height={450} className="w-full object-cover" />
          <Image src="/residency/rec7.jpg" alt="rec7" width={500} height={450} className="w-full object-cover" />
          <Image src="/residency/rec8.jpg" alt="rec8" width={500} height={450} className="w-full object-cover" />
        </div>
      </section>

    </div>
  );
}