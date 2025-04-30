import React, { useRef } from "react";
import { useResumeContext } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ResultsPage: React.FC = () => {
  const { resumeData } = useResumeContext();
  const navigate = useNavigate();

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

  const generatePDFReport = () => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text("Resume Analysis Report", 20, 20);

      doc.setFontSize(12);
      doc.text(`File Name: ${resumeData?.filename ?? "Unknown"}`, 20, 30);
      doc.text(`Analysis Date: ${new Date().toLocaleDateString()}`, 20, 40);

      const overallScore = calculateOverallATSScore();
      if (typeof overallScore === "number") {
        doc.setFontSize(16);
        doc.text("ATS Compatibility Score", 20, 60);
        doc.setFontSize(12);
        doc.text(`Overall Score: ${overallScore}%`, 20, 70);
      }

      const suggestions = resumeData?.suggestions ?? {};
      Object.entries(suggestions).forEach(
        ([sectionName, suggestion], index) => {
          if (sectionName === "ats_score") return;

          const yStart = (doc as any).lastAutoTable?.finalY
            ? (doc as any).lastAutoTable.finalY + 20
            : 90 + index * 60;

          doc.setFontSize(14);
          doc.text(`Section: ${sectionName}`, 20, yStart);

          doc.setFontSize(11);
          doc.text(
            `Original Heading: ${suggestion.original_heading}`,
            20,
            yStart + 10
          );
          doc.text(
            `Suggested Heading: ${suggestion.suggested_heading}`,
            20,
            yStart + 20
          );
          doc.text(`ATS Score: ${suggestion.ats_score}`, 20, yStart + 30);
          doc.text("Section Preview:", 20, yStart + 40);
          doc.text(
            suggestion.section_preview.slice(0, 100) + "...",
            20,
            yStart + 50
          );

          autoTable(doc, {
            startY: yStart + 60,
            head: [["Suggestions"]],
            body: suggestion.suggestions.map((s) => [s]),
            theme: "striped",
            styles: { fontSize: 10 },
          });
        }
      );

      const filename =
        resumeData?.filename?.replace(/\.[^/.]+$/, "") || "Resume";
      doc.save(`${filename} Analysis Report by PromptCV.pdf`);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate report. Please try again.");
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
    return averageScore.toFixed(1); // Format to one decimal place
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
        <h1 className="text-3xl font-bold mb-4">Your Resume Analysis</h1>
        <p className="text-muted-foreground">
          Here's a detailed analysis and suggestions to improve your resume.
        </p>
      </div>

      <Card className="mb-8 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">
            ATS Compatibility Score
          </CardTitle>
          <CardDescription className="text-sm">
            How well your resume performs with Applicant Tracking Systems
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="w-full">
            <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${progressColor(
                  overallScore
                )}`}
                style={{ width: `${overallScore}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-4">
              <span
                className={`text-3xl font-bold ${scoreColor(overallScore)}`}
              >
                {overallScore}%
              </span>
              <span className="text-sm text-muted-foreground">Out of 100</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {resumeData?.suggestions &&
        Object.entries(resumeData.suggestions)
          .filter(([key]) => key !== "ats_score")
          .map(([sectionName, suggestion]) => (
            <Card className="mb-6" key={sectionName}>
              <CardHeader>
                <CardTitle>Section: {sectionName}</CardTitle>
                <CardDescription>
                  AI feedback for improving the <strong>{sectionName}</strong>{" "}
                  section.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Original Heading:</strong>{" "}
                  {suggestion.original_heading}
                </p>
                <p>
                  <strong>Suggested Heading:</strong>{" "}
                  {suggestion.suggested_heading}
                </p>
                <p>
                  <strong>ATS Score:</strong>{" "}
                  <span className={scoreColor(suggestion.ats_score)}>
                    {suggestion.ats_score}%
                  </span>
                </p>
                <p>
                  <strong>Preview:</strong> {suggestion.section_preview}
                </p>
                <div>
                  <strong>Suggestions:</strong>
                  <ul className="list-disc ml-6 mt-1">
                    {suggestion.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => navigate("/")}>Upload New Resume</Button>
        <Button
          ref={uploadButtonRef} // Add ref to the button
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
