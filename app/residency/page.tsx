import Hero from "./components/hero";
import Residency from "./components/Residency";
import Amenities from "./components/amentise";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen w-full">

      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= MAIN CONTENT ================= */}
      <main id="residency-page" className="flex-grow w-full">

         <Hero />
        <div id="download-content">
          <Residency />
          <Amenities />

        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  );
}