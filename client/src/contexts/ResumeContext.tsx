import React, { createContext, useContext, useState, useEffect } from "react";

export type SectionSuggestion = {
  original_heading: string;
  suggested_heading: string;
  ats_score: number;
  recommendations: string[];
  section_preview: string;
};

export type ResumeData = {
  filename: string;
  suggestions: {
    [section: string]: SectionSuggestion;
  };
};

type ResumeContextType = {
  resumeData: ResumeData | null;
  setResumeData: (data: ResumeData) => void;
  clearResumeData: () => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const STORAGE_KEY = 'resume_analysis_data';

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [resumeData, setResumeDataState] = useState<ResumeData | null>(() => {
    // Initialize from localStorage if available
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : null;
  });

  // Update localStorage when resumeData changes
  useEffect(() => {
    if (resumeData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    }
  }, [resumeData]);

  const setResumeData = (data: ResumeData) => {
    setResumeDataState(data);
  };

  const clearResumeData = () => {
    setResumeDataState(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, clearResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);

  if (context === undefined) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }

  return context;
};
