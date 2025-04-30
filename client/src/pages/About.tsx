import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shield, Zap, Users, BookOpen, Code2 } from "lucide-react";

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Analysis",
      description: "Leveraging advanced AI to provide comprehensive resume analysis and improvement suggestions."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "ATS Optimization",
      description: "Ensure your resume passes through Applicant Tracking Systems with flying colors."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Quick Results",
      description: "Get detailed analysis and suggestions in seconds, not hours."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "User-Friendly",
      description: "Simple, intuitive interface designed for everyone, from students to professionals."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Learning Resources",
      description: "Access valuable insights and tips to improve your resume writing skills."
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Modern Tech Stack",
      description: "Built with cutting-edge technologies for the best user experience."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container max-w-7xl py-10 mt-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">About PromptCV</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your AI-powered resume analysis platform, helping you create the perfect resume that stands out to employers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Our Mission</h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto">
              At PromptCV, we're dedicated to helping job seekers create resumes that not only look great but also perform well with modern hiring systems. Our AI-powered platform analyzes your resume and provides actionable suggestions to improve your chances of landing your dream job.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Technology Stack</h2>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">FastAPI</Badge>
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">Firebase</Badge>
              <Badge variant="secondary">Google Gemini AI</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">shadcn/ui</Badge>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About; 