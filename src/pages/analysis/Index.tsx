import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { ScanHistory } from "@/types/database";
import { Camera, CheckCircle, BookOpen, MessageSquare, Wallet } from "lucide-react";
import { mockDataService } from "@/services/mockDataService";
import { EnhancedAIService, AIAnalysisResult } from "@/services/enhancedAIService";
import { NFTMintingModal } from "@/components/nft/NFTMintingModal";

// Components
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScanHeader from "@/components/scan/ScanHeader";
import ImageUpload from "@/components/scan/ImageUpload";
import DiagnosisResult from "@/components/scan/DiagnosisResult";
import ScanHistoryList from "@/components/history/ScanHistoryList";
import AboutContent from "@/components/about/AboutContent";
import TimelineIntegration from "@/components/scan/TimelineIntegration";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AdvancedAnalytics from "@/components/analytics/AdvancedAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";

type ScanResult = {
  id: string;
  image: string;
  diagnosis: string;
  advice: string;
  date: Date;
  confidence: number;
};

// Sample plant data from our global dataset (Notebooks/Data/global_hybrid_plants_emissions_2000_2024.csv)
const samplePlants = [
  {
    species_name: "Mangifera indica",
    common_name: "Mango Tree",
    plant_type: "tree",
    description: "Tropical fruit tree known for its delicious fruits and excellent carbon sequestration capabilities. Native to South Asia, widely cultivated in tropical regions.",
    environmental_benefits: "High CO2 absorption rate of 52.5 kg CO2 annually per healthy tree. Provides shade and improves air quality while supporting biodiversity.",
    landscaping_tips: "Plant in full sun, well-draining soil. Space 15-20 feet apart. Regular watering during fruit development. Prune to maintain shape and size.",
    co2_absorption: {
      daily: 0.144,
      annual: 52.5,
      impact: "Equivalent to offsetting 1,825 km of car driving annually"
    },
    growth_conditions: {
      height_m: 14.98,
      canopy_m2: 61.162,
      optimal_temp: 20.71,
      rainfall_mm: 530.4,
      soil_type: "Loam"
    },
    confidence: 0.95
  },
  {
    species_name: "Jacaranda mimosifolia",
    common_name: "Jacaranda Tree",
    plant_type: "tree",
    description: "Beautiful ornamental tree with purple flowers. Excellent for urban landscaping and provides significant environmental benefits.",
    environmental_benefits: "Absorbs 28.9 kg CO2 annually. Creates beautiful canopy cover and improves urban air quality while providing aesthetic value.",
    landscaping_tips: "Prefers full sun and well-drained soil. Drought-tolerant once established. Perfect for streetscapes and large gardens.",
    co2_absorption: {
      daily: 0.079,
      annual: 28.9,
      impact: "Equivalent to offsetting 1,000 km of car driving annually"
    },
    growth_conditions: {
      height_m: 17.685,
      canopy_m2: 7.692,
      optimal_temp: 10.16,
      rainfall_mm: 335.9,
      soil_type: "Sandy"
    },
    confidence: 0.92
  },
  {
    species_name: "Delonix regia",
    common_name: "Flame Tree",
    plant_type: "tree",
    description: "Striking ornamental tree with brilliant red-orange flowers. Fast-growing and excellent for carbon sequestration.",
    environmental_benefits: "High absorption rate of 51.0 kg CO2 annually. Provides excellent shade and habitat for birds while sequestering carbon.",
    landscaping_tips: "Plant in full sun, tolerates various soil types. Fast-growing, so provide adequate space. Beautiful flowering display in summer.",
    co2_absorption: {
      daily: 0.140,
      annual: 51.0,
      impact: "Equivalent to offsetting 1,860 km of car driving annually"
    },
    growth_conditions: {
      height_m: 6.965,
      canopy_m2: 42.891,
      optimal_temp: 26.17,
      rainfall_mm: 1377.9,
      soil_type: "Peaty"
    },
    confidence: 0.94
  },
  {
    species_name: "Salix babylonica",
    common_name: "Weeping Willow",
    plant_type: "tree",
    description: "Graceful tree with weeping branches. Excellent for water-logged areas and provides substantial environmental benefits.",
    environmental_benefits: "Very high absorption rate of 29.0 kg CO2 annually. Excellent for soil stabilization and water filtration while sequestering carbon.",
    landscaping_tips: "Thrives near water sources, tolerates wet soil. Plant away from foundations due to extensive root systems. Beautiful ornamental value.",
    co2_absorption: {
      daily: 0.079,
      annual: 29.0,
      impact: "Equivalent to offsetting 1,060 km of car driving annually"
    },
    growth_conditions: {
      height_m: 35.116,
      canopy_m2: 57.047,
      optimal_temp: 19.58,
      rainfall_mm: 884.1,
      soil_type: "Silty"
    },
    confidence: 0.91
  },
  {
    species_name: "Cedrus deodara",
    common_name: "Deodar Cedar",
    plant_type: "tree",
    description: "Evergreen conifer with graceful branches. Excellent for landscaping and provides year-round carbon sequestration.",
    environmental_benefits: "Absorbs 25.0 kg CO2 annually. Provides year-round green cover and improves air quality while supporting local ecosystems.",
    landscaping_tips: "Prefers well-drained soil and full sun. Excellent for windbreaks and privacy screens. Low maintenance once established.",
    co2_absorption: {
      daily: 0.069,
      annual: 25.0,
      impact: "Equivalent to offsetting 915 km of car driving annually"
    },
    growth_conditions: {
      height_m: 12.055,
      canopy_m2: 13.223,
      optimal_temp: 26.25,
      rainfall_mm: 407.7,
      soil_type: "Peaty"
    },
    confidence: 0.93
  }
];

const Index = () => {
  const location = useLocation();
  const { user, isUsingMockData } = useAuth();
  const { t } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string[] | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path === "/scan") return "scan";
    if (path === "/history") return "history";
    if (path === "/about") return "about";
    return "scan"; // Default
  });
  const [processingStage, setProcessingStage] = useState(0);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [processingMessage, setProcessingMessage] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [showNFTModal, setShowNFTModal] = useState(false);
  const { toast } = useToast();

  const fetchScanHistory = useCallback(async () => {
    try {
      if (isUsingMockData) {
        // Use mock data service
        const { data, error } = await mockDataService.getScanHistory(user?.id);
        
        if (error) {
          throw new Error(error);
        }

        if (data) {
          setScanHistory(data.map((item) => ({
            id: item.id,
            image: item.image_url,
            diagnosis: item.diagnosis || '',
            advice: item.treatment || '',
            date: new Date(item.created_at),
            confidence: item.confidence || 0
          })));
        }
      } else {
        // Use real Supabase
        const { data, error } = await supabase
          .from('scan_history')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setScanHistory(data.map((item: ScanHistory) => ({
            id: item.id,
            image: item.image_url,
            diagnosis: item.diagnosis || '',
            advice: item.treatment || '',
            date: new Date(item.created_at),
            confidence: item.confidence || 0
          })));
        }
      }
    } catch (error: unknown) {
      console.error('Error fetching scan history:', error);
      toast({
        title: 'Error',
        description: 'Failed to load scan history',
        variant: 'destructive'
      });
    }
  }, [toast, isUsingMockData, user]);

  useEffect(() => {
    if (user && activeTab === "history") {
      fetchScanHistory();
    }
  }, [user, activeTab, fetchScanHistory]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      toast({
        title: "Image Required",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setProcessingStage(0);
    setProcessingMessage('');
    setAnalysisResult(null);
    
    try {
      // Use enhanced AI service
      const result = await EnhancedAIService.analyzeImage(
        image, 
        (stage: number, message: string) => {
          setProcessingStage(stage);
          setProcessingMessage(message);
        }
      );
      
      // Update UI with enhanced results
      setAnalysisResult(result);
      setDiagnosis(result.plant.species_name);
      setDescription(result.plant.description);
      setSymptoms([result.plant.environmental_benefits, result.plant.landscaping_tips]);
      setAdvice(result.plant.landscaping_tips);
      setConfidence(result.confidence);
      
      // Save to history if user is logged in
      if (user) {
        try {
          if (isUsingMockData) {
            // Use mock data service
            const { error } = await mockDataService.addScanHistory(user.id, {
              image_url: image,
              diagnosis: result.plant.species_name,
              treatment: result.plant.landscaping_tips,
              confidence: result.confidence,
            });
            
            if (error) throw new Error(error);
          } else {
            // Use real Supabase
            const { error } = await supabase
              .from('scan_history')
              .insert({
                user_id: user.id,
                image_url: image,
                diagnosis: result.plant.species_name,
                treatment: result.plant.landscaping_tips,
                confidence: result.confidence,
              });
            
            if (error) throw error;
          }
          
          fetchScanHistory();
        } catch (error: unknown) {
          console.error('Error saving scan:', error);
          toast({
            title: 'Error',
            description: 'Failed to save scan to history',
            variant: 'destructive'
          });
        }
      }
      
      // Show success message with enhanced details
      toast({
        title: "Analysis Complete",
        description: `${result.plant.common_name} identified with ${(result.confidence * 100).toFixed(0)}% confidence`,
      });
      
    } catch (error: unknown) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setProcessingStage(0);
      setProcessingMessage('');
    }
  };

  const handleViewHistoryScan = (scan: ScanResult) => {
    setImage(scan.image);
    setDiagnosis(scan.diagnosis);
    setAdvice(scan.advice);
    setConfidence(scan.confidence);
    setActiveTab("scan");
  };

  const handleClearHistory = async () => {
    if (!user) return;
    
    try {
      if (isUsingMockData) {
        // Use mock data service
        const { error } = await mockDataService.clearScanHistory(user.id);
        if (error) throw new Error(error);
      } else {
        // Use real Supabase
        const { error } = await supabase
          .from('scan_history')
          .delete()
          .eq('user_id', user.id);
        
        if (error) throw error;
      }
      
      setScanHistory([]);
      toast({
        title: "History Cleared",
        description: "Your scan history has been cleared"
      });
    } catch (error: unknown) {
      console.error('Error clearing history:', error);
      toast({
        title: 'Error',
        description: 'Failed to clear scan history',
        variant: 'destructive'
      });
    }
  };

  const handleReset = () => {
    setDiagnosis(null);
    setAdvice(null);
    setImage(null);
    setSymptoms(null);
    setDescription(null);
    setConfidence(null);
    setAnalysisResult(null);
    setProcessingMessage('');
    toast({
      title: "New Scan",
      description: "Ready for a new plant scan"
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500";
    if (confidence >= 0.8) return "bg-green-400";
    if (confidence >= 0.7) return "bg-yellow-400";
    if (confidence >= 0.6) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navigation activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab)} />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="scan" className="text-lg" onClick={() => window.history.pushState(null, "", "/scan")}>
              🔍 Scan Plant
            </TabsTrigger>
            <TabsTrigger value="history" className="text-lg" onClick={() => window.history.pushState(null, "", "/history")}>
              📊 Dashboard
            </TabsTrigger>
            <TabsTrigger value="about" className="text-lg" onClick={() => window.history.pushState(null, "", "/about")}>
              ℹ️ About AI
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scan" className="space-y-6">
            <ScanHeader
              title="Hedges Care AI"
              description="Our advanced AI model analyzes plant images to identify species, measure environmental impact, and provide expert landscaping recommendations for optimal plant health and carbon sequestration."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Quick Stats Cards */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Scans Today</p>
                    <p className="text-2xl font-bold text-green-800">127</p>
                  </div>
                  <div className="bg-green-200 p-3 rounded-full">
                    <Camera className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Accuracy Rate</p>
                    <p className="text-2xl font-bold text-blue-800">96.2%</p>
                  </div>
                  <div className="bg-blue-200 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-600 text-sm font-medium">Plants Identified</p>
                    <p className="text-2xl font-bold text-amber-800">1000+</p>
                  </div>
                  <div className="bg-amber-200 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUpload 
                image={image}
                isLoading={isLoading}
                handleImageUpload={handleImageUpload}
                handleAnalyze={handleAnalyze}
                setImage={setImage}
              />
              
              <DiagnosisResult
                isLoading={isLoading}
                processingStage={processingStage}
                processingMessage={processingMessage}
                diagnosis={diagnosis}
                description={description}
                symptoms={symptoms}
                advice={advice}
                confidence={confidence}
                analysisResult={analysisResult}
                handleReset={handleReset}
                onMintNFT={() => {
                  if (analysisResult) {
                    setShowNFTModal(true);
                  }
                }}
              />
            </div>

            <TimelineIntegration 
              diagnosis={diagnosis}
              image={image}
            />

            {/* Enhanced Feature Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Camera className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Quick Scan</h3>
                    <p className="text-sm text-gray-500">Get results in seconds</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Plant Library</h3>
                    <p className="text-sm text-gray-500">1000+ species from global dataset</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">AI Accuracy</h3>
                    <p className="text-sm text-gray-500">96.2% success rate</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Expert Help</h3>
                    <p className="text-sm text-gray-500">Chat with specialists</p>
                  </div>
                </div>
              </div>
            </div>

            {/* NFT Minting Modal */}
            {analysisResult && showNFTModal && (
              <NFTMintingModal
                isOpen={showNFTModal}
                onClose={() => setShowNFTModal(false)}
                plantData={analysisResult.plant}
              />
            )}
          </TabsContent>
          
          <TabsContent value="history">
            <ScanHeader
              title="Environmental Impact Dashboard"
              description="Track your plants' carbon sequestration and environmental contributions"
            />

            {/* Quick Stats Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <QuickActions />
              <RecentActivity />
            </div>
            
            {/* Scan History */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Recent Scan History</h3>
              <ScanHistoryList 
                scanHistory={scanHistory}
                handleViewHistoryScan={handleViewHistoryScan}
                handleClearHistory={handleClearHistory}
                setActiveTab={setActiveTab}
                getConfidenceColor={getConfidenceColor}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <AboutContent />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
