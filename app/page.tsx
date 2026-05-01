import Header from "@/components/header/Header";
import Hero from "@/components/landingpage/hero";
import About from "@/components/landingpage/About";
// import AboutExtra from "@/components/landingpage/aboutt";
import Services from "@/components/landingpage/services";
import Footer from "@/components/footer/footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* About Sections */}
      <About />
      {/* <AboutExtra /> */}

      {/* Services Section */}
      <Services />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
