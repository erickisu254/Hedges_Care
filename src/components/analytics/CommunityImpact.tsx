import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, TreePine, CloudRain } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const CommunityImpact = () => {
  const { currentRegion } = useRegion();
  const { currentLanguage } = useLanguage();
  
  const isSwahili = currentLanguage.code === 'sw';

  const metrics = [
    {
      label: isSwahili ? "CO2 Iliyofyonzwa" : "CO2 Absorbed",
      value: currentRegion.co2Metrics.absorbed,
      description: isSwahili ? "Jumla ya sekuestra ya jamii" : "Total community sequestration",
      icon: <CloudRain className="h-5 w-5 text-blue-500" />,
      color: "text-blue-600"
    },
    {
      label: isSwahili ? "Miti Inayotunzwa" : "Trees Nurtured",
      value: currentRegion.co2Metrics.trees,
      description: isSwahili ? "Kuelekea lengo la kitaifa la 15B" : "Towards national 15B goal",
      icon: <TreePine className="h-5 w-5 text-emerald-500" />,
      color: "text-emerald-600"
    },
    {
      label: isSwahili ? "Shamba za Mitaa" : "Local Shambas",
      value: currentRegion.co2Metrics.shambas,
      description: isSwahili ? "Bustani za familia zinazofanya kazi" : "Active family gardens",
      icon: <Users className="h-5 w-5 text-amber-500" />,
      color: "text-amber-600"
    },
    {
      label: isSwahili ? "Uvumilivu wa Tabianchi" : "Climate Resilience",
      value: currentRegion.co2Metrics.resilience,
      description: isSwahili ? "Alama ya afya ya jamii" : "Community health score",
      icon: <Globe className="h-5 w-5 text-purple-500" />,
      color: "text-purple-600"
    }
  ];

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-emerald-100 shadow-xl overflow-hidden">
      <CardHeader className="bg-emerald-600 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">
              {isSwahili ? `Matokeo ya Harambee: ${currentRegion.name}` : `Harambee Impact: ${currentRegion.name}`}
            </CardTitle>
            <CardDescription className="text-emerald-100">
              {isSwahili ? `Takwimu za muda halisi kwa ajili ya jamii katika Wilaya ya ${currentRegion.county}` : `Real-time data for social good in ${currentRegion.county}`}
            </CardDescription>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <Globe className="h-8 w-8 animate-pulse" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col space-y-2 p-4 rounded-xl bg-white border border-emerald-50 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2">
                {metric.icon}
                <span className="text-sm font-medium text-gray-500">{metric.label}</span>
              </div>
              <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
              <p className="text-xs text-gray-400">{metric.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
              <TreePine className="h-5 w-5" />
              {isSwahili ? "Mkakati wa Upandaji Unaozingatia Tabianchi" : "Climate-Smart Planting Strategy"}
            </h4>
            <p className="text-sm text-emerald-800 mb-4">
              {isSwahili ? `Aina bora za miti kwa ${currentRegion.county} ili kuongeza ufyonzwaji wa CO2:` : `Best species for ${currentRegion.county} to maximize CO2 absorption:`}
            </p>
            <div className="space-y-2">
              {currentRegion.climateSmartPlants.map((plant, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm p-2 bg-white rounded border border-emerald-100">
                  <span className="font-medium text-emerald-700">{plant.name}</span>
                  <Badge className={idx === 0 ? "bg-emerald-500" : "bg-blue-500"}>
                    {isSwahili ? (idx === 0 ? "Matokeo ya Juu" : "Ustahimilivu wa Ukame") : plant.benefit}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {currentRegion.pestAlert && (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <span className="text-xl">📢</span>
                {isSwahili ? `Ilani ya AI ya Shamba: ${currentRegion.name}` : `AI Shamba Alert: ${currentRegion.name}`}
              </h4>
              <p className="text-sm text-amber-800 mb-2">
                {isSwahili ? `${currentRegion.pestAlert.pest} imegunduliwa katika ${currentRegion.pestAlert.risk} ya shambas jirani.` : `${currentRegion.pestAlert.pest} detected in ${currentRegion.pestAlert.risk} of neighboring shambas.`}
              </p>
              <div className="mt-2 p-2 bg-white rounded border border-amber-100 text-xs text-amber-700">
                <strong>{isSwahili ? "Mtazamo wa Data:" : "Data Insight:"}</strong> {currentRegion.pestAlert.insight}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
