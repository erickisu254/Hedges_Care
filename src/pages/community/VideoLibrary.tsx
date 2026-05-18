import React, { useState, useEffect } from "react";
import { Search, Play, Clock, Users, Eye, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import VideoTutorialCard from "@/components/video/VideoTutorialCard";
import VideoModal from "@/components/video/VideoModal";
import { videoTutorials } from "@/data/videoTutorials";
import { VideoTutorial } from "@/types/video";
import Navigation from "@/components/layout/Navigation";
import FooterSection from "@/components/landing/FooterSection";

const VideoLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState("video-library");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Filter videos based on search term and category
  const filteredVideos = videoTutorials.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.instructor.name.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory =
      selectedCategory === "all" || video.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle video selection
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
    if (isMobile) {
      // For mobile, switch to the details tab when a video is selected
      document.getElementById("details-tab")?.click();
    }
  };
  
  // Get unique categories for filter dropdown
  const categories = Array.from(
    new Set(videoTutorials.map((video) => video.category))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab)} />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Sustainable Learning Center</h1>
          <p className="text-green-700 max-w-2xl mx-auto">
            Explore comprehensive tutorials on sustainable gardening, landscaping, and NFT-powered environmental initiatives supporting UNSDG 15 (Life on Land).
          </p>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by video title, description, or instructor..."
            className="pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end mb-4">
          <div className="flex items-center">
            <Search className="mr-2 text-green-700" size={16} />
            <span className="text-green-700 mr-2">Filter by:</span>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          {isMobile ? (
            <Tabs defaultValue="list">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="list">Video List</TabsTrigger>
                <TabsTrigger value="details" id="details-tab">Video Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="mt-0">
                <ScrollArea className="h-[60vh]">
                  <div className="grid grid-cols-1 gap-4">
                    {filteredVideos.length > 0 ? (
                      filteredVideos.map((video) => (
                        <VideoTutorialCard
                          key={video.id}
                          video={video}
                          onSelect={handleVideoSelect}
                          isSelected={video.id === selectedVideo}
                        />
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <Info className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No videos found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter terms.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="details" className="mt-0">
                {selectedVideo ? (
                  <VideoModal
                    video={videoTutorials.find(v => v.id === selectedVideo)!}
                    onClose={() => setSelectedVideo(null)}
                  />
                ) : (
                  <div className="text-center py-20">
                    <Info className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No Video selected</h3>
                    <p className="mt-1 text-sm text-gray-500">Select a video from the list to view details.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex">
              <div className="w-1/3 pr-4 border-r border-gray-200">
                <h2 className="text-lg font-semibold text-green-800 mb-4">Video List</h2>
                <ScrollArea className="h-[70vh]">
                  <div className="grid grid-cols-1 gap-4 pr-2">
                    {filteredVideos.length > 0 ? (
                      filteredVideos.map((video) => (
                        <VideoTutorialCard
                          key={video.id}
                          video={video}
                          onSelect={handleVideoSelect}
                          isSelected={video.id === selectedVideo}
                        />
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <Info className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No videos found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter terms.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="w-2/3 pl-6">
                <h2 className="text-lg font-semibold text-green-800 mb-4">Video Details</h2>
                {selectedVideo ? (
                  <VideoModal
                    video={videoTutorials.find(v => v.id === selectedVideo)!}
                    onClose={() => setSelectedVideo(null)}
                  />
                ) : (
                  <div className="text-center py-20">
                    <Info className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No Video selected</h3>
                    <p className="mt-1 text-sm text-gray-500">Select a video from the list to view details.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default VideoLibrary;
