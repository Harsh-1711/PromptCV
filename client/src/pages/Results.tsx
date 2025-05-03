import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultsPage from "@/pages/ResultsPage";

const Results = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <ResultsPage />
      </main>
      <Footer />
    </div>
  );
};

export default Results;
