
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AIExplanation = () => {
  const { currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  return (
    <Card className="mt-8 bg-white/70 backdrop-blur-sm border-emerald-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-emerald-700">
          {isSwahili ? "Jinsi AI Yetu Inavyofanya Kazi" : "How Our AI Works"}
        </CardTitle>
        <CardDescription>
          {isSwahili 
            ? "Teknolojia ya kisasa ya mashine inayotumia maelfu ya picha za Mimea" 
            : "Advanced machine learning technology trained on thousands of plant images"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-100 rounded-full p-2">
                <Check className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-medium">{isSwahili ? "Modeli ya Deep Learning" : "Deep Learning Model"}</h3>
            </div>
            <p className="text-sm text-gray-600">
              {isSwahili 
                ? "AI yetu inatumia convolutional neural network iliyofunzwa kwa picha 50,000+ za magonjwa ya mimea." 
                : "Our AI uses a convolutional neural network trained on 50,000+ labeled images of plant diseases."}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-100 rounded-full p-2">
                <Check className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-medium">{isSwahili ? "Utambuzi wa Magonjwa" : "Disease Recognition"}</h3>
            </div>
            <p className="text-sm text-gray-600">
              {isSwahili 
                ? "AI inaweza kutambua 40+ ya mimea ya kawaida katika 20+ ya aina za mazao kwa usahihi wa juu." 
                : "The AI can identify 40+ common plants across 20+ crop types with high accuracy."}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-100 rounded-full p-2">
                <Check className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-medium">{isSwahili ? "Imethibitishwa na Wataalamu" : "Expert-Verified"}</h3>
            </div>
            <p className="text-sm text-gray-600">
              {isSwahili 
                ? "Mapendekezo ya matibabu yametengenezwa na wanasayansi wa kilimo na wataalamu wa magonjwa ya mimea." 
                : "Treatment recommendations developed with agricultural scientists and plant pathologists."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIExplanation;
