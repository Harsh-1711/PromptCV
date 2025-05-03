import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const LearnMore: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-pattern">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                How <span className="gradient-text">PromptCV</span> Works
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Understand how our AI-powered platform can transform your job
                search and increase your chances of landing interviews.
              </p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-muted/50">
          <div className="container max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Our Process
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
              <Card className="border-t-4 border-t-brand-500 shadow-md hover:shadow-lg transition-all">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-2xl font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Upload Your Resume
                  </h3>
                  <p className="text-muted-foreground">
                    Simply upload your current resume in PDF or Word format and
                    provide the job description for the position you're
                    targeting.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-brand-500 shadow-md hover:shadow-lg transition-all">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-2xl font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Our advanced AI algorithms analyze your resume against the
                    job description, checking for keyword matches, formatting,
                    and content quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-brand-500 shadow-md hover:shadow-lg transition-all">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-2xl font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Get Actionable Feedback
                  </h3>
                  <p className="text-muted-foreground">
                    Receive a detailed analysis with an ATS score and specific
                    recommendations to improve your resume for the target
                    position.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Key Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "ATS Optimization",
                  description:
                    "Our AI analyzes your resume to ensure it passes through Applicant Tracking Systems by identifying missing keywords and suggesting improvements.",
                },
                {
                  title: "Keyword Analysis",
                  description:
                    "We match your resume against job descriptions to identify which important keywords are present or missing from your application.",
                },
                {
                  title: "Section Quality Analysis",
                  description:
                    "Get feedback on each section of your resume including work experience, skills, education, and more.",
                },
                {
                  title: "AI-Powered Suggestions",
                  description:
                    "Receive tailored recommendations to improve your resume's content, formatting, and overall effectiveness.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/80 text-white">
          <div className="container max-w-7xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Improve Your Resume?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Don't miss out on your dream job because of an overlooked detail
              in your resume.
            </p>
            <div className=" flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analyze">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Analyze Your Resume
                </Button>
              </Link>
              <Link to="/help">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-transparent border-white text-white hover:bg-white/10"
                >
                  Visit Help Center
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LearnMore;
