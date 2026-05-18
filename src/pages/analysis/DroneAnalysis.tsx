import React, { useState, useRef } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Satellite, Plane, MapPin, TrendingUp, AlertTriangle, Search, Map } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface DroneData {
  id: string;
  area: string;
  coordinates: { lat: number; lng: number };
  captureDate: Date;
  images: string[];
  analysis: {
    healthIndex: number;
    environmentalIssues: string[];
    affectedArea: number;
    severity: 'low' | 'medium' | 'high';
    carbonImpact: {
      sequestration: number;
      potential: number;
    };
  };
}

const DroneAnalysis = () => {
  const [droneFiles, setDroneFiles] = useState<File[]>([]);
  const [locationInput, setLocationInput] = useState('');
  const [analysisResults, setAnalysisResults] = useState<DroneData[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [mapCoords, setMapCoords] = useState<{ lat: number; lng: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleDroneUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setDroneFiles(prev => [...prev, ...files]);
    }
  };

  const analyzeDroneImages = async () => {
    if (droneFiles.length === 0) {
      toast({
        title: 'No Images',
        description: 'Please upload drone images first.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const mockResults: DroneData[] = droneFiles.map((file, index) => ({
        id: `drone-${index}`,
        area: `Field Sector ${index + 1}`,
        coordinates: { lat: -1.286389 + (index * 0.01), lng: 36.817223 + (index * 0.01) },
        captureDate: new Date(),
        images: [URL.createObjectURL(file)],
        analysis: {
          healthIndex: Math.random() * 100,
          environmentalIssues: [
            'Nutrient Deficiency',
            'Water Stress',
            'Pest Infestation',
            'Soil Degradation'
          ].filter(() => Math.random() > 0.5),
          affectedArea: Math.random() * 50,
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
          carbonImpact: {
            sequestration: Math.random() * 1000,
            potential: Math.random() * 500
          }
        }
      }));
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      toast({
        title: 'Analysis Complete',
        description: `Analyzed ${droneFiles.length} drone images successfully.`,
      });
    }, 3000);
  };

  const geocodeLocation = async () => {
    if (!locationInput.trim()) {
      toast({
        title: 'Location Required',
        description: 'Please enter a location to search.',
        variant: 'destructive',
      });
      return;
    }

    setIsGeocoding(true);
    
    try {
      // Simulate geocoding service
      toast({
        title: 'Searching Location',
        description: `Finding coordinates for: ${locationInput}`,
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock geocoding results - in real app, this would be a geocoding API call
      const mockResults = {
        'nairobi': { lat: -1.286389, lng: 36.817223 },
        'mombasa': { lat: -4.043479, lng: 39.668206 },
        'kisumu': { lat: -0.091700, lng: 34.767907 },
        'nakuru': { lat: -0.303099, lng: 36.080230 },
        'eldoret': { lat: 0.514743, lng: 35.269986 },
        'default': { lat: -1.286389, lng: 36.817223 } // Default to Nairobi
      };

      const locationKey = locationInput.toLowerCase().replace(/\s+/g, '');
      const coordinates = mockResults[locationKey as keyof typeof mockResults] || mockResults.default;

      setMapCoords(coordinates);
      
      toast({
        title: 'Location Found',
        description: `Coordinates: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`,
      });

    } catch (error) {
      toast({
        title: 'Location Not Found',
        description: 'Could not find the specified location. Please try a different search term.',
        variant: 'destructive',
      });
    } finally {
      setIsGeocoding(false);
    }
  };

  const fetchSatelliteData = async () => {
    if (!mapCoords) {
      toast({
        title: 'Location Required',
        description: 'Please search for a location first to get coordinates.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Fetching Satellite Data',
      description: `Getting data for location: ${mapCoords.lat.toFixed(4)}, ${mapCoords.lng.toFixed(4)}`,
    });

    // Simulate satellite data fetch
    setTimeout(() => {
      toast({
        title: 'Satellite Data Retrieved',
        description: 'Latest vegetation indices, weather patterns, and environmental data downloaded.',
      });
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🛰️ Drone & Satellite Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Large-scale crop monitoring using drone imagery and satellite data for precision agriculture
          </p>
        </div>

        <Tabs defaultValue="drone" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="drone" className="gap-2">
              <Plane className="h-4 w-4" />
              Drone Analysis
            </TabsTrigger>
            <TabsTrigger value="satellite" className="gap-2">
              <Satellite className="h-4 w-4" />
              Satellite Data
            </TabsTrigger>
            <TabsTrigger value="results" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Analysis Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drone" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Drone Images
                </CardTitle>
                <CardDescription>
                  Upload high-resolution drone images for AI-powered crop analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleDroneUpload}
                  className="hidden"
                />
                
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                  variant="outline"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Select Drone Images
                </Button>

                {droneFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {droneFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Drone image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Badge className="absolute top-1 right-1 text-xs">
                          {index + 1}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                <Button 
                  onClick={analyzeDroneImages}
                  disabled={isAnalyzing || droneFiles.length === 0}
                  className="w-full"
                >
                  {isAnalyzing ? 'Analyzing Images...' : 'Analyze Drone Images'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Drone Analysis Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">🎯</div>
                    <h3 className="font-semibold">De-forrestation Detection</h3>
                    <p className="text-sm text-gray-600">Identify diseases across large areas</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">📊</div>
                    <h3 className="font-semibold">Health Mapping</h3>
                    <p className="text-sm text-gray-600">Generate Global maps</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">📈</div>
                    <h3 className="font-semibold">Carbon-Emission Prediction</h3>
                    <p className="text-sm text-gray-600">Predict Carbon emission rates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satellite" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Location-based Satellite Analysis
                </CardTitle>
                <CardDescription>
                  Search for a location to access satellite imagery and environmental data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter location (e.g., Nairobi, Mombasa, Kisumu)"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={geocodeLocation}
                    disabled={isGeocoding}
                    className="flex items-center gap-2"
                  >
                    {isGeocoding ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        Search
                      </>
                    )}
                  </Button>
                </div>

                {mapCoords && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Location Found</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Latitude:</span>
                        <span className="ml-2 font-medium">{mapCoords.lat.toFixed(6)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Longitude:</span>
                        <span className="ml-2 font-medium">{mapCoords.lng.toFixed(6)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <Badge className="ml-2 bg-green-500 text-white">Ready for Analysis</Badge>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button onClick={fetchSatelliteData} className="w-full" disabled={!mapCoords}>
                  <Satellite className="h-4 w-4 mr-2" />
                  Fetch Satellite Data
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Mapping Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-green-600 mb-2">🌍 Vegetation Analysis</h3>
                    <p className="text-sm text-gray-600">
                      NDVI mapping and vegetation health monitoring using satellite imagery
                    </p>
                    <Badge variant="secondary" className="mt-2">Environmental Impact</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-blue-600 mb-2">🌡️ Climate Data</h3>
                    <p className="text-sm text-gray-600">
                      Temperature, rainfall, and humidity patterns for environmental assessment
                    </p>
                    <Badge variant="secondary" className="mt-2">Weather Integration</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-purple-600 mb-2">🌿 Carbon Sequestration</h3>
                    <p className="text-sm text-gray-600">
                      CO2 absorption analysis and carbon footprint mapping for environmental planning
                    </p>
                    <Badge variant="secondary" className="mt-2">SDG 15 Focus</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-orange-600 mb-2">🗺️ Land Use Mapping</h3>
                    <p className="text-sm text-gray-600">
                      Land cover analysis and sustainable land use planning recommendations
                    </p>
                    <Badge variant="secondary" className="mt-2">Sustainability</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {analysisResults.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Analysis Results</h3>
                  <p className="text-gray-500">Upload and analyze drone images to see results here.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analysisResults.map((result) => (
                  <Card key={result.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{result.area}</span>
                        <Badge className={getSeverityColor(result.analysis.severity)}>
                          {result.analysis.severity}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {result.coordinates.lat.toFixed(4)}, {result.coordinates.lng.toFixed(4)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <img
                        src={result.images[0]}
                        alt={result.area}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Health Index:</span>
                          <span className="text-sm">{result.analysis.healthIndex.toFixed(1)}%</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Affected Area:</span>
                          <span className="text-sm">{result.analysis.affectedArea.toFixed(1)}%</span>
                        </div>
                        
                        {result.analysis.environmentalIssues.length > 0 && (
                          <div>
                            <span className="text-sm font-medium flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3 text-orange-500" />
                              Environmental Issues:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {result.analysis.environmentalIssues.map((issue, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {issue}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="border-t pt-2 mt-2">
                          <span className="text-sm font-medium">Carbon Impact:</span>
                          <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                            <div className="bg-green-50 p-2 rounded">
                              <span className="text-green-700">Sequestration:</span>
                              <span className="ml-1 font-medium">{result.analysis.carbonImpact.sequestration.toFixed(1)} kg CO₂</span>
                            </div>
                            <div className="bg-blue-50 p-2 rounded">
                              <span className="text-blue-700">Potential:</span>
                              <span className="ml-1 font-medium">{result.analysis.carbonImpact.potential.toFixed(1)} kg CO₂</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default DroneAnalysis;