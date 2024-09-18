import Hero from "@/Components/Hero";
import About from "@/Components/About";
import Features from "@/Components/Features";
import Team from "@/Components/Team";
import Doctors from "@/Components/Doctors";
import Faqs from "@/Components/Faqs";
import Footer from "@/Components/Footer"
import "./globals.css"

export default function Home() {
  return (
    <>
    <Hero />
    <About />
    <Features />
    <Team />
    <Doctors />
    <Faqs />
    <Footer />
    </>
  );
}
