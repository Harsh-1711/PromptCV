import React, { useState } from "react";
import ResumeUpload from "./ResumeUpload";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const LandingPage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const handleCardHover = (cardId: string) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const pricingCards = [
    {
      id: "basic",
      title: "Basic",
      description: "Perfect for students and entry-level job seekers",
      price: "₹299",
      features: [
        "5 Resume Analyses",
        "Basic ATS Score",
        "General Suggestions",
        "PDF Report Download",
      ],
      buttonText: "Get Started",
    },
    {
      id: "professional",
      title: "Professional",
      description: "Ideal for experienced professionals",
      price: "₹599",
      features: [
        "Unlimited Resume Analyses",
        "Detailed ATS Score",
        "Industry-Specific Suggestions",
        "Detailed PDF Report",
        "Priority Support",
      ],
      buttonText: "Get Started",
      popular: true,
    },
    {
      id: "enterprise",
      title: "Enterprise",
      description: "For organizations and career centers",
      price: "₹1,999",
      features: [
        "Unlimited Analyses",
        "Advanced ATS Analytics",
        "Custom Industry Templates",
        "Bulk Analysis",
        "Dedicated Support",
        "API Access",
      ],
      buttonText: "Contact Sales",
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section id="hero" className="py-20 md:py-32 relative overflow-hidden">
        <div className="container max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Make Your Resume{" "}
                <span className="gradient-text">Stand Out</span> With AI
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                Upload your resume and get instant AI-powered feedback and ATS
                optimization score to land more interviews.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="text-lg px-8">
                  Try it Free
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="bg-gradient-to-b from-background to-background/0 dark:from-background dark:to-background/0 p-1 rounded-xl animate-slide-up">
                <div className="bg-card rounded-lg p-6 shadow-xl border border-border">
                  <h2 className="text-2xl font-semibold mb-6 text-center">
                    Analyze Your Resume
                  </h2>
                  <ResumeUpload />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-brand-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-brand-500/10 blur-3xl rounded-full" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How PromptCV Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform analyzes your resume and provides
              actionable insights to improve your job application success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Upload Resume",
                description: "Simply upload your resume in PDF or Word format.",
                icon: "📄",
              },
              {
                title: "AI Analysis",
                description:
                  "Our AI analyzes content, format, and ATS compatibility.",
                icon: "🤖",
              },
              {
                title: "Get Feedback",
                description:
                  "Receive personalized suggestions and an ATS score.",
                icon: "✨",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border shadow-sm"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thousands of job seekers have improved their resumes with
              PromptCV.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "After using PromptCV, I got calls from 3 companies within a week. The AI suggestions really improved my resume!",
                name: "Sarah K.",
                role: "Software Engineer",
              },
              {
                quote:
                  "I was struggling with my resume format. PromptCV not only fixed the format but also suggested better ways to phrase my achievements.",
                name: "Michael T.",
                role: "Marketing Specialist",
              },
              {
                quote:
                  "The ATS score feature helped me understand why my resume wasn't getting through. After implementing the suggestions, my score went from 62 to 94!",
                name: "Jessica M.",
                role: "Data Analyst",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border shadow-sm"
              >
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/50">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that best fits your needs. All plans include our
              core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingCards.map((card) => (
              <div
                key={card.id}
                className={`relative bg-card p-8 rounded-lg border transition-all duration-300 ease-in-out ${
                  hoveredCard === card.id
                    ? "scale-105 shadow-xl border-primary"
                    : hoveredCard
                    ? "scale-95 opacity-80"
                    : "border-border shadow-sm"
                } ${card.popular ? "border-2 border-primary" : ""}`}
                onMouseEnter={() => handleCardHover(card.id)}
                onMouseLeave={handleCardLeave}
              >
                {card.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm z-10">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {card.description}
                  </p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{card.price}</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {card.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    hoveredCard === card.id ? "bg-primary/90" : ""
                  }`}
                >
                  {card.buttonText}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              All plans include a 7-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/80 text-white">
        <div className="container max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of job seekers who have improved their chances of
            landing their dream job.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            Analyze Your Resume Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
