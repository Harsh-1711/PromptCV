import React, { createContext, useContext, useState } from "react";

export type ResumeData = {
  fileName: string;
  atsScore: number;
  suggestions: string[];
  sections: {
    skills: number;
    experience: number;
    education: number;
    overall: number;
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
