import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, FileText, LifeBuoy, BookOpen } from "lucide-react";

const HelpCenter: React.FC = () => {
  const gettingStartedRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const resumeAnalysisRef = useRef<HTMLElement>(null);
  const supportRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    
    if (!whatsappNumber) {
      console.error('WhatsApp number not configured');
      alert('Sorry, our WhatsApp service is not properly configured. Please use email instead.');
      return;
    }

    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    
    const text = `Hello!%0AName: ${encodeURIComponent(
      name
    )}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(
      message
    )}`;

    const whatsappURL = `https://wa.me/${cleanNumber}?text=${text}`;

    window.open(whatsappURL, "_blank");
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-pattern">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                How Can We <span className="gradient-text">Help You?</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find answers to common questions or reach out for personalized support.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search for help topics..."
                  className="pl-4 pr-10 py-6 text-lg shadow-md"
                />
                <Button className="absolute right-1 top-1 bottom-1" variant="ghost">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-12 bg-muted/50">
          <div className="container max-w-7xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Help Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Getting Started",
                  description: "Learn the basics of using PromptCV",
                  icon: <BookOpen className="h-10 w-10 text-brand-500" />,
                  onClick: () => scrollToSection(gettingStartedRef),
                },
                {
                  title: "Resume Analysis",
                  description: "How our AI analyzes your resume",
                  icon: <FileText className="h-10 w-10 text-brand-500" />,
                  onClick: () => scrollToSection(resumeAnalysisRef),
                },
                {
                  title: "Support",
                  description: "Get help with any issues",
                  icon: <LifeBuoy className="h-10 w-10 text-brand-500" />,
                  onClick: () => scrollToSection(supportRef),
                },
                {
                  title: "Contact Us",
                  description: "Reach out to our team",
                  icon: <MessageCircle className="h-10 w-10 text-brand-500" />,
                  onClick: () => scrollToSection(contactRef),
                },
              ].map((category, index) => (
                <button
                  key={index}
                  onClick={category.onClick}
                  className="block hover:no-underline text-left w-full"
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardHeader className="pb-2 flex flex-col items-center text-center">
                      {category.icon}
                      <CardTitle className="mt-4">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription>{category.description}</CardDescription>
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section ref={gettingStartedRef} className="py-16">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">
                  How does PromptCV analyze my resume?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  PromptCV uses advanced AI algorithms to analyze your resume against job descriptions.
                  It checks for keyword matches, evaluates the formatting, and assesses the content
                  quality of each section. The AI then provides an ATS score and specific
                  recommendations to improve your resume.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">
                  What file formats can I upload?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We currently support PDF and Word (.doc, .docx) file formats for resume uploads.
                  We recommend using PDF for the most accurate analysis as it preserves formatting.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">
                  What is an ATS score?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  An ATS (Applicant Tracking System) score indicates how well your resume will
                  perform when processed by automated resume screening software that many employers use.
                  A higher score means better chances of your resume making it to human recruiters.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium">
                  How long does the analysis take?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Most resume analyses are completed within 30-60 seconds, depending on the length
                  and complexity of your resume and the job description provided.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium">
                  Is my resume data secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, your privacy is important to us. We use encryption to protect your data,
                  and we don't share your resume information with third parties. You can review
                  our Privacy Policy for more details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="py-16 bg-muted/30">
          <div className="container max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our support team is ready to assist you with any questions or issues.
                  We typically respond within 24 hours.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="text-brand-500" />
                    <span>support@promptcv.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <LifeBuoy className="text-brand-500" />
                    <span>+1 (800) 123-4567</span>
                  </div>
                </div>
              </div>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSendMessage}>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="font-medium">Name</label>
                        <Input 
                          id="name" 
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-medium">Email</label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Your email address"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="font-medium">Message</label>
                        <textarea 
                          id="message" 
                          rows={4} 
                          className="w-full min-h-[120px] px-3 py-2 text-sm rounded-md border border-input bg-transparent"
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                    <Button className="w-full" type="submit">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
