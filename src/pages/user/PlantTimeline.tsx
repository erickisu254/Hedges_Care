
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useTimeline } from "@/hooks/use-timeline";
import { useToast } from "@/hooks/use-toast";

// Components
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PlantTimeline from "@/components/timeline/PlantTimeline";
import AddTimelineEntryModal from "@/components/timeline/AddTimelineEntryModal";
import WeatherWidget from "@/components/weather/WeatherWidget";

// Types
import { TimelineEntryProps } from "@/components/timeline/TimelineEntry";

const TimelinePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToTimeline, timelineItems, getPlantStats } = useTimeline();
  const { toast } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diagnosisFromScan, setDiagnosisFromScan] = useState<string | null>(null);
  const [imageFromScan, setImageFromScan] = useState<string | null>(null);
  const [scanData, setScanData] = useState<any>(null);
  
  // Get plant statistics
  const stats = getPlantStats();
  
  // Check if we have diagnosis data from scan
  useEffect(() => {
    if (location.state?.diagnosis && location.state?.image) {
      setDiagnosisFromScan(location.state.diagnosis);
      setImageFromScan(location.state.image);
      // Open modal automatically if coming from scan
      setIsModalOpen(true);
      
      // Set scan data if available
      if (location.state?.plantData && location.state?.confidence) {
        setScanData({
          diagnosis: location.state.diagnosis,
          plantData: location.state.plantData,
          confidence: location.state.confidence,
          image: location.state.image,
        });
      }
    }
  }, [location.state]);
  
  const handleAddEntry = (entry: TimelineEntryProps) => {
    // Convert TimelineEntryProps to TimelineItem format
    const timelineItem = {
      id: Date.now().toString(),
      date: entry.date.toISOString(),
      dateFormatted: entry.dateFormatted,
      diagnosis: entry.diagnosis || 'Unknown',
      commonName: entry.commonName || 'Unknown Plant',
      plantType: entry.plantType || 'unknown',
      image: entry.image,
      notes: entry.notes,
      status: entry.status,
      treatmentApplied: entry.treatmentApplied,
      confidence: entry.confidence,
      co2Absorption: entry.co2Absorption,
      growthConditions: entry.growthConditions,
    };
    
    addToTimeline(timelineItem);
    setIsModalOpen(false);
    
    toast({
      title: "Timeline Updated",
      description: "New entry has been added to the timeline",
    });
    
    // Clear navigation state after adding
    if (location.state) {
      window.history.replaceState({}, document.title);
      setDiagnosisFromScan(null);
      setImageFromScan(null);
      setScanData(null);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navigation activeTab="" setActiveTab={() => {}} />
      
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Plant Timeline</h1>
            <p className="text-gray-600">Track your plants' health journey and environmental impact over time</p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => navigate("/scan")}
          >
            New Scan
          </Button>
        </div>
        
        {/* Environmental Impact Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/90 rounded-lg border border-green-200 p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{stats.totalScans}</p>
            <p className="text-sm text-gray-600">Total Scans</p>
          </div>
          <div className="bg-white/90 rounded-lg border border-blue-200 p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{stats.co2Absorbed} kg</p>
            <p className="text-sm text-gray-600">CO₂ Absorbed</p>
          </div>
          <div className="bg-white/90 rounded-lg border border-purple-200 p-4 text-center">
            <p className="text-2xl font-bold text-purple-700">{stats.plantsIdentified}</p>
            <p className="text-sm text-gray-600">Plants Identified</p>
          </div>
          <div className="bg-white/90 rounded-lg border border-orange-200 p-4 text-center">
            <p className="text-2xl font-bold text-orange-700">
              {stats.statusDistribution.improved || 0}
            </p>
            <p className="text-sm text-gray-600">Improved</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <PlantTimeline
              entries={timelineItems}
              onAddEntry={() => setIsModalOpen(true)}
            />
          </div>
          <div className="space-y-6">
            <WeatherWidget />
            
            <div className="bg-white/90 rounded-lg border border-green-100 p-4">
              <h2 className="text-lg font-medium text-green-800 mb-3 flex items-center gap-2">
                🌱 Plant Health Tips
              </h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">1</span>
                  <p>Monitor soil moisture levels regularly, especially during hot weather</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">2</span>
                  <p>Look for early signs of diseases like discoloration or spots on leaves</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">3</span>
                  <p>Adjust watering based on current weather conditions</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">4</span>
                  <p>Apply treatments early in the morning or late evening for best results</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/90 rounded-lg border border-blue-100 p-4">
              <h2 className="text-lg font-medium text-blue-800 mb-3 flex items-center gap-2">
                🌍 Environmental Impact
              </h2>
              <div className="text-sm space-y-2">
                <p>Your plants are helping to offset carbon emissions and improve air quality.</p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-medium text-green-700">Equivalent to:</p>
                  <p className="text-green-600">Driving {Math.round(stats.co2Absorbed * 50)} km less by car</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AddTimelineEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddEntry}
        currentImage={imageFromScan}
        scanData={scanData || undefined}
      />
      
      <Footer />
    </div>
  );
};

export default TimelinePage;
