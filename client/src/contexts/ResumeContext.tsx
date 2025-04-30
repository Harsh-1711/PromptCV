import React, { createContext, useContext, useState } from "react";

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
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
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
