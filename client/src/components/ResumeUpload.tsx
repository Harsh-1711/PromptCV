import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";

const ResumeUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { setResumeData } = useResumeContext();
  const { currentUser } = useAuth();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (!currentUser) {
      toast.error("Please sign in to upload your resume");
      navigate("/login");
      return;
    }

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please sign in to upload your resume");
      navigate("/login");
      return;
    }

    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files && files[0]) {
      const file = files[0];
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid resume file (PDF or Word)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB max
        toast.error("File size should not exceed 5MB");
        return;
      }

      setSelectedFile(file);
    }
  };

  const getBackendUrl = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      console.error('API URL not configured');
      return '';
    }
    return `${apiUrl}/api/resume/analyze`;
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      toast.error("Please sign in to upload your resume");
      navigate("/login");
      return;
    }

    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    const backendUrl = getBackendUrl();
    if (!backendUrl) {
      toast.error("API configuration error. Please contact support.");
      return;
    }

    setIsLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Simulate file upload progress
      const uploadInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 30) {
            clearInterval(uploadInterval);
            return 30;
          }
          return prev + 5;
        });
      }, 400);

      // Simulate processing progress
      const processInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 80) {
            clearInterval(processInterval);
            return 80;
          }
          return prev + 10;
        });
      }, 500);

      // Actual request to the backend
      const response = await fetch(backendUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload resume");
      }

      const data = await response.json();

      setProgress(100);
      setResumeData(data);
      toast.success("Resume analyzed successfully!");
      console.log(data);

      // Wait a moment to show the 100% progress before navigating
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/results");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to analyze resume. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        {!currentUser ? (
          <div className="text-center p-10">
            <LogIn className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Sign in to upload your resume</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Please sign in to access the resume analysis feature
            </p>
            <Button onClick={() => navigate("/login")}>Sign In</Button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-10 text-center ${
              dragActive ? "border-primary bg-primary/5" : "border-border"
            } transition-colors`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Upload your resume</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Drop your resume file here or click to browse
            </p>

            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="hidden"
            />

            <label htmlFor="file-upload">
              <Button
                variant="outline"
                className="mb-2"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Browse Files
              </Button>
            </label>

            {selectedFile && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Selected file: {selectedFile.name}
                </p>
                <Button
                  className="mt-4"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Analyzing..." : "Analyze Resume"}
                </Button>
                {isLoading && (
                  <Progress value={progress} className="mt-4" />
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;
