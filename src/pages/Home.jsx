import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomCursor from "../components/home/CustomCursor.jsx";
import Navbar from "../components/home/Navbar.jsx";
import Hero from "../components/home/Hero.jsx";
import Statement from "../components/home/Statement.jsx";
import Showcase from "../components/home/Showcase.jsx";
import Features from "../components/home/Features.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";
import FreeForever from "../components/home/FreeForever.jsx";
import FinalCTA from "../components/home/FinalCTA.jsx";
import Footer from "../components/home/Footer.jsx";
import "../styles/home.css";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    document.body.classList.add("home-cursor-none");
    ScrollTrigger.refresh();
    return () => {
      document.body.classList.remove("home-cursor-none");
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="home-page">
      <div className="noise" />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Statement />
      <Showcase />
      <Features />
      <HowItWorks />
      <FreeForever />
      <FinalCTA />
      <Footer />
    </div>
  );
}
