import React from "react";
import { useResumeContext } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";

const ResultsPage: React.FC = () => {
  const { resumeData } = useResumeContext();
  const navigate = useNavigate();

  if (!resumeData) {
    // Redirect if no resume data is available
    React.useEffect(() => {
      navigate("/");
    }, [navigate]);

    return null;
  }

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const progressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  const generatePDFReport = () => {
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text("Resume Analysis Report", 20, 20);
      
      // Add file information
      doc.setFontSize(12);
      doc.text(`File Name: ${resumeData.fileName}`, 20, 30);
      doc.text(`Analysis Date: ${new Date().toLocaleDateString()}`, 20, 40);
      
      // Add ATS Score
      doc.setFontSize(16);
      doc.text("ATS Compatibility Score", 20, 60);
      doc.setFontSize(12);
      doc.text(`Overall Score: ${resumeData.atsScore}%`, 20, 70);
      
      // Add section scores table
      const sectionScores = [
        ["Section", "Score"],
        ["Skills", `${resumeData.sections.skills}%`],
        ["Experience", `${resumeData.sections.experience}%`],
        ["Education", `${resumeData.sections.education}%`],
        ["Overall", `${resumeData.sections.overall}%`]
      ];
      
      autoTable(doc, {
        startY: 80,
        head: [sectionScores[0]],
        body: sectionScores.slice(1),
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] },
        styles: { fontSize: 10 }
      });
      
      // Add suggestions
      doc.setFontSize(16);
      doc.text("AI Suggestions for Improvement", 20, (doc as any).lastAutoTable.finalY + 20);
      doc.setFontSize(12);
      
      resumeData.suggestions.forEach((suggestion, index) => {
        const y = (doc as any).lastAutoTable.finalY + 30 + (index * 10);
        doc.text(`${index + 1}. ${suggestion}`, 20, y);
      });
      
      // Save the PDF
      doc.save(`${resumeData.fileName.replace(/\.[^/.]+$/, "")} Analysis Report by PromptCV.pdf`);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate report. Please try again.");
    }
  };

  return (
    <div className="container max-w-7xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Resume Analysis</h1>
        <p className="text-muted-foreground">
          Here's detailed analysis and suggestions to improve your resume.
        </p>
      </div>

      {/* ATS Score Card */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle>ATS Compatibility Score</CardTitle>
          <CardDescription>
            How well your resume performs with Applicant Tracking Systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted opacity-20"
                />

                {/* Progress circle - stroke-dasharray is the circumference of the circle (2*PI*r) */}
                {/* stroke-dashoffset is calculated based on the percentage: circumference - (percentage * circumference / 100) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (resumeData.atsScore * 251.2) / 100}
                  transform="rotate(-90 50 50)"
                  className={progressColor(resumeData.atsScore)}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span
                    className={`text-4xl font-bold ${scoreColor(
                      resumeData.atsScore
                    )}`}
                  >
                    {resumeData.atsScore}
                  </span>
                  <span className="text-xs block text-muted-foreground">
                    Out of 100
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Skills</span>
                  <span className={scoreColor(resumeData.sections.skills)}>
                    {resumeData.sections.skills}%
                  </span>
                </div>
                <Progress
                  value={resumeData.sections.skills}
                  className={`h-2 ${progressColor(resumeData.sections.skills)}`}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Experience</span>
                  <span className={scoreColor(resumeData.sections.experience)}>
                    {resumeData.sections.experience}%
                  </span>
                </div>
                <Progress
                  value={resumeData.sections.experience}
                  className={`h-2 ${progressColor(
                    resumeData.sections.experience
                  )}`}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Education</span>
                  <span className={scoreColor(resumeData.sections.education)}>
                    {resumeData.sections.education}%
                  </span>
                </div>
                <Progress
                  value={resumeData.sections.education}
                  className={`h-2 ${progressColor(
                    resumeData.sections.education
                  )}`}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Overall</span>
                  <span className={scoreColor(resumeData.sections.overall)}>
                    {resumeData.sections.overall}%
                  </span>
                </div>
                <Progress
                  value={resumeData.sections.overall}
                  className={`h-2 ${progressColor(
                    resumeData.sections.overall
                  )}`}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle>AI Suggestions</CardTitle>
          <CardDescription>
            Personalized recommendations to improve your resume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {resumeData.suggestions.map((suggestion, index) => (
              <li key={index} className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <p>{suggestion}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => navigate("/")}>Upload New Resume</Button>
        <Button 
          variant="outline" 
          onClick={generatePDFReport}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Detailed Report
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
