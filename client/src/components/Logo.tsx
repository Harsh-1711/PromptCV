
import React from "react";
import { FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-600 to-brand-400 rounded-full blur opacity-70"></div>
        <div className="relative bg-background dark:bg-card rounded-full p-2">
          <FileSearch className="h-6 w-6 text-brand-600 dark:text-brand-400" />
        </div>
      </div>
      <span className="text-xl font-bold">
        Prompt<span className="text-brand-500">CV</span>
      </span>
    </div>
  );
};

export default Logo;
