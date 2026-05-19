
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { History, RotateCcw, BookOpen, MessageCircle, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DiagnosisActionsProps {
  diagnosis: string | null;
  image: string | null;
  handleReset: () => void;
}

const DiagnosisActions: React.FC<DiagnosisActionsProps> = ({
  diagnosis,
  image,
  handleReset
}) => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  const handleTrackTimeline = () => {
    navigate("/plant-timeline", {
      state: {
        diagnosis,
        image
      }
    });
  };

  const handleViewPlantLibrary = () => {
    navigate("/plant-library");
  };

  const handleExpertConsultation = () => {
    navigate("/specialist-chat");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <Button
        variant="outline"
        onClick={handleReset}
        className="flex-1 flex items-center justify-center gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
      >
        <RotateCcw className="h-4 w-4" />
        {t('scan.newScan')}
      </Button>
      
      {diagnosis && (
        <>
          <Button
            onClick={handleTrackTimeline}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1 flex items-center justify-center gap-2"
          >
            <Leaf className="h-4 w-4" />
            {isSwahili ? "Fuatilia Ukuaji" : "Track Growth"}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleViewPlantLibrary}
            className="flex-1 flex items-center justify-center gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <BookOpen className="h-4 w-4" />
            {isSwahili ? "Maktaba ya Mimea" : "Plant Library"}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleExpertConsultation}
            className="flex-1 flex items-center justify-center gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <MessageCircle className="h-4 w-4" />
            {isSwahili ? "Msaada wa Kitaalamu" : "Expert Help"}
          </Button>
        </>
      )}
    </div>
  );
};

export default DiagnosisActions;
