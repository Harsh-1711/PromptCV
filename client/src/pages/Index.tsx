import React, { useEffect } from "react";
import LandingPage from "@/pages/LandingPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";

const Index: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Small delay to ensure the page has loaded
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
