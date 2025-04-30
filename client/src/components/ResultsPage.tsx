import React, { useRef } from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Download, Upload, ChevronRight, Sparkles, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const ResultsPage: React.FC = () => {
  const { resumeData } = useResumeContext();
  const navigate = useNavigate();
  const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("overview");

  // Create a ref for the upload button
  const uploadButtonRef = useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (!resumeData) {
      navigate("/");
    }
  }, [resumeData, navigate]);

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

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  const generatePDFReport = async () => {
    try {
      setIsGeneratingPDF(true);
      const doc = new jsPDF();

      // Add header
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 0);
      doc.text("Resume Analysis Report", 20, 20);

      // Add file info
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`File Name: ${resumeData?.filename ?? "Unknown"}`, 20, 30);
      doc.text(`Analysis Date: ${new Date().toLocaleDateString()}`, 20, 40);

      // Add overall score
      const overallScore = calculateOverallATSScore();
        doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
        doc.text("ATS Compatibility Score", 20, 60);
        doc.setFontSize(12);
        doc.text(`Overall Score: ${overallScore}%`, 20, 70);

      // Add score visualization
      doc.setFillColor(200, 200, 200);
      doc.rect(20, 80, 170, 10, "F");
      const scoreColor = Number(overallScore) >= 80 ? [46, 204, 113] : Number(overallScore) >= 60 ? [241, 196, 15] : [231, 76, 60];
      doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
      doc.rect(20, 80, (170 * Number(overallScore)) / 100, 10, "F");

      // Add sections
      const suggestions = resumeData?.suggestions ?? {};
      let yPosition = 110;

      Object.entries(suggestions).forEach(([sectionName, suggestion]) => {
          if (sectionName === "ats_score") return;

        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

          doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(`Section: ${sectionName}`, 20, yPosition);

          doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text(`Original Heading: ${suggestion.original_heading}`, 20, yPosition + 10);
        doc.text(`Suggested Heading: ${suggestion.suggested_heading}`, 20, yPosition + 20);
        doc.text(`ATS Score: ${suggestion.ats_score}%`, 20, yPosition + 30);
        doc.text("Section Preview:", 20, yPosition + 40);
        doc.text(suggestion.section_preview.slice(0, 100) + "...", 20, yPosition + 50);

          autoTable(doc, {
          startY: yPosition + 60,
            head: [["Suggestions"]],
          body: suggestion.recommendations.map((s) => [s]),
            theme: "striped",
            styles: { fontSize: 10 },
          headStyles: { fillColor: [41, 128, 185] },
        });

        yPosition = (doc as any).lastAutoTable.finalY + 20;
          });

      const filename = resumeData?.filename?.replace(/\.[^/.]+$/, "") || "Resume";
      doc.save(`${filename} Analysis Report by PromptCV.pdf`);
      toast.success("Report downloaded successfully!", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate report. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const calculateOverallATSScore = () => {
    const suggestions = resumeData?.suggestions ?? {};
    let totalScore = 0;
    let count = 0;

    Object.entries(suggestions).forEach(([key, suggestion]) => {
      if (key !== "ats_score" && suggestion.ats_score) {
        totalScore += suggestion.ats_score;
        count++;
      }
    });

    const averageScore = count > 0 ? totalScore / count : 0;
    return averageScore.toFixed(1);
  };

  const overallScore: any = calculateOverallATSScore();

  const scrollToUploadButton = () => {
    if (uploadButtonRef.current) {
      uploadButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="container max-w-7xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Resume Analysis</h1>
        <p className="text-muted-foreground">
          Here's a detailed analysis and suggestions to improve your resume.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
          <CardTitle className="text-xl font-semibold">
            ATS Compatibility Score
          </CardTitle>
          <CardDescription className="text-sm">
            How well your resume performs with Applicant Tracking Systems
          </CardDescription>
                </div>
                <Badge variant={overallScore >= 80 ? "default" : overallScore >= 60 ? "secondary" : "destructive"}>
                  {getScoreBadge(overallScore)}
                </Badge>
              </div>
        </CardHeader>
        <CardContent className="p-4">
              <div className="space-y-4">
                <Progress value={overallScore} className="h-3" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className={`text-3xl font-bold ${scoreColor(overallScore)}`}>
                {overallScore}%
              </span>
              <span className="text-sm text-muted-foreground">Out of 100</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-5 w-5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This score indicates how well your resume matches ATS requirements.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => navigate("/")}
                  className="w-full justify-between"
                  variant="outline"
                >
                  <span className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload New Resume
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={generatePDFReport}
                  className="w-full justify-between"
                  disabled={isGeneratingPDF}
                >
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    {isGeneratingPDF ? "Generating Report..." : "Download Report"}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData?.suggestions &&
                  Object.entries(resumeData.suggestions)
                    .filter(([key]) => key !== "ats_score")
                    .slice(0, 3)
                    .map(([sectionName, suggestion]) => (
                      <div key={sectionName} className="flex items-start gap-3">
                        {suggestion.ats_score >= 80 ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-amber-500 mt-1" />
                        )}
                        <div>
                          <p className="font-medium">{sectionName}</p>
                          <p className="text-sm text-muted-foreground">
                            Score: {suggestion.ats_score}%
                          </p>
                        </div>
                      </div>
                    ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suggestions">
          <Accordion type="single" collapsible className="space-y-4">
      {resumeData?.suggestions &&
        Object.entries(resumeData.suggestions)
          .filter(([key]) => key !== "ats_score")
          .map(([sectionName, suggestion]) => (
                  <AccordionItem
                    key={sectionName}
                    value={sectionName}
                    className="border rounded-lg"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <h3 className="font-semibold">{sectionName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Score: {suggestion.ats_score}%
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Original Heading</h4>
                            <p className="text-muted-foreground">
                              {suggestion.original_heading}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Suggested Heading</h4>
                            <p className="text-primary">
                              {suggestion.suggested_heading}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Section Preview</h4>
                          <p className="text-muted-foreground">
                            {suggestion.section_preview}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Suggestions</h4>
                          <ul className="space-y-2">
                            {suggestion.recommendations.map((s, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Sparkles className="h-4 w-4 text-primary mt-1" />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="details">
          <Card>
              <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
                <CardDescription>
                Comprehensive breakdown of your resume's performance
                </CardDescription>
              </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {resumeData?.suggestions &&
                  Object.entries(resumeData.suggestions)
                    .filter(([key]) => key !== "ats_score")
                    .map(([sectionName, suggestion]) => (
                      <div key={sectionName} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{sectionName}</h3>
                          <Badge variant={suggestion.ats_score >= 80 ? "default" : suggestion.ats_score >= 60 ? "secondary" : "destructive"}>
                            {suggestion.ats_score}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Original Heading</h4>
                            <p className="text-muted-foreground">
                  {suggestion.original_heading}
                </p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Suggested Heading</h4>
                            <p className="text-primary">
                  {suggestion.suggested_heading}
                </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Section Preview</h4>
                          <p className="text-muted-foreground">
                            {suggestion.section_preview}
                          </p>
                        </div>
                <div>
                          <h4 className="font-medium mb-2">Suggestions</h4>
                          <ul className="space-y-2">
                            {suggestion.recommendations.map((s, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Sparkles className="h-4 w-4 text-primary mt-1" />
                                <span>{s}</span>
                              </li>
                    ))}
                  </ul>
                        </div>
                        <div className="border-t pt-4">
                          <Progress value={suggestion.ats_score} className="h-2" />
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsPage;
