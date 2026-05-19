
import React from "react";
import { RegionSelector } from "@/components/layout/RegionSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScanHeaderProps {
  title: string;
  description: string;
}

const ScanHeader = ({ title, description }: ScanHeaderProps) => {
  const { currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  return (
    <div className="text-center mb-6 bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg border border-green-200 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 p-4">
        <RegionSelector />
      </div>
      
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
        <span className="text-2xl">🌍</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">{title}</h1>
      <p className="text-lg text-green-700 max-w-2xl mx-auto">{description}</p>
      <div className="mt-4 inline-flex items-center space-x-4 text-sm text-green-600">
        <span className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          {isSwahili ? "Uchambuzi wa AI" : "AI-Powered Analysis"}
        </span>
        <span className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          {isSwahili ? "Vipimo vya CO₂" : "CO₂ Measurement"}
        </span>
        <span className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          {isSwahili ? "Ushauri wa Kitaalamu" : "Expert Landscaping"}
        </span>
      </div>
    </div>
  );
};

export default ScanHeader;
