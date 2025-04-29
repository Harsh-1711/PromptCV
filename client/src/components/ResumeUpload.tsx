import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useResumeContext } from "@/context/ResumeContext";
import { Progress } from "@/components/ui/progress";

const ResumeUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { setResumeData } = useResumeContext();

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
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files && files[0]) {
      const file = files[0];
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid resume file (PDF or Word)");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB max
        toast.error("File size should not exceed 5MB");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsLoading(true);
    setProgress(0);
    
    try {
      // Simulate file upload progress
      const uploadInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 30) {
            clearInterval(uploadInterval);
            return 30;
          }
          return prev + 5;
        });
      }, 400);

      // Simulate processing progress
      const processInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 80) {
            clearInterval(processInterval);
            return 80;
          }
          return prev + 10;
        });
      }, 500);

      // In a real app, this would be where you'd upload the file to a server
      // For now, we'll simulate processing with a timeout
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Mock resume data that would normally come from your API
      const mockResumeData = {
        fileName: selectedFile.name,
        atsScore: 78,
        suggestions: [
          "Add more quantifiable achievements to your work experience",
          "Include relevant keywords for the job you're applying for",
          "Improve your skills section with more technical specifics",
          "Make your resume more concise by removing unnecessary details"
        ],
        sections: {
          skills: 85,
          experience: 70,
          education: 90,
          overall: 78
        }
      };
      
      setProgress(100);
      setResumeData(mockResumeData);
      toast.success("Resume analyzed successfully!");
      
      // Wait a moment to show the 100% progress before navigating
      await new Promise(resolve => setTimeout(resolve, 500));
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
            <Button variant="outline" className="mb-2" onClick={() => document.getElementById('file-upload')?.click()}>
              Browse Files
            </Button>
          </label>
          
          <p className="text-xs text-muted-foreground">
            Supports PDF, Word (.doc, .docx) up to 5MB
          </p>
          
          {selectedFile && (
            <div className="mt-4 p-2 bg-secondary rounded text-sm text-left">
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          {isLoading && (
            <div className="mb-4">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {progress}%
              </p>
            </div>
          )}
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedFile || isLoading} 
            className="w-full"
            size="lg"
          >
            {isLoading ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;
