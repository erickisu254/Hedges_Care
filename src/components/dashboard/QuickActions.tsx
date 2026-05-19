import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  BookOpen, 
  MessageSquare, 
  History, 
  Users, 
  Plane,
  ArrowRight,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const QuickActions = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  const quickActions = [
    {
      title: isSwahili ? "Scan ya Haraka" : "Quick Scan",
      description: isSwahili ? "Pakia na uchambue picha za mimea papo hapo" : "Upload and analyze plant images instantly",
      icon: <Camera className="h-5 w-5" />,
      color: "bg-green-500",
      action: () => navigate("/scan"),
      shortcut: "S"
    },
    {
      title: isSwahili ? "Maktaba ya Mimea" : "Plants Library",
      description: isSwahili ? "Vinjari database ya kina ya magonjwa" : "Browse comprehensive disease database",
      icon: <BookOpen className="h-5 w-5" />,
      color: "bg-blue-500",
      action: () => navigate("/plant-library"),
      shortcut: "D"
    },
    {
      title: isSwahili ? "Ongea na Mtaalamu" : "Expert Chat",
      description: isSwahili ? "Pata msaada kutoka kwa wataalamu wa kilimo" : "Get help from agricultural specialists",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "bg-purple-500",
      action: () => navigate("/specialist-chat"),
      shortcut: "E"
    },
    {
      title: isSwahili ? "Miradi ya Harambee" : "Harambee Projects",
      description: isSwahili ? "Jiunge na juhudi za urejeshaji wa jamii" : "Join local community restoration efforts",
      icon: <Users className="h-5 w-5" />,
      color: "bg-emerald-500",
      action: () => navigate("/community-forum"),
      shortcut: "H"
    },
    {
      title: isSwahili ? "Shamba Langu" : "My Shamba",
      description: isSwahili ? "Kagua utambuzi wa afya ya mimea yako" : "Review your plant health diagnoses",
      icon: <History className="h-5 w-5" />,
      color: "bg-orange-500",
      action: () => navigate("/history"),
      shortcut: "M"
    },
    {
      title: isSwahili ? "Uchambuzi wa Drone" : "Drone Analysis",
      description: isSwahili ? "Chambua picha za shamba kwa AI" : "Analyze field imagery with AI",
      icon: <Plane className="h-5 w-5" />,
      color: "bg-indigo-500",
      action: () => navigate("/drone-analysis"),
      shortcut: "A"
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          {t('dashboard.quickActions')}
        </CardTitle>
        <CardDescription>
          {t('dashboard.quickActionsDesc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:shadow-md transition-all"
              onClick={action.action}
            >
              <div className="flex items-center justify-between w-full">
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  {action.icon}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">
                    Ctrl+{action.shortcut}
                  </kbd>
                </div>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 self-end" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;