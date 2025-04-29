import React from "react";
import LandingPage from "@/components/LandingPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
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
