import { useState, useEffect } from "react";
import { Search, Filter, Info, TreePine, Leaf, Droplets } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PlantDetail from "@/components/plant/PlantDetail";
import { useIsMobile } from "@/hooks/use-mobile";

// Import plant data from global dataset
const samplePlants = [
  {
    id: "R000001",
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
    id: "R000002",
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
    id: "R000003",
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
    id: "R000009",
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
    id: "R000006",
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
  },
  {
    id: "R000004",
    species_name: "Lantana camara",
    common_name: "Lantana",
    plant_type: "flower",
    description: "Colorful flowering shrub with clusters of vibrant flowers. Attracts pollinators and provides ground cover.",
    environmental_benefits: "While smaller in size, provides excellent habitat for pollinators and contributes to biodiversity in garden settings.",
    landscaping_tips: "Prefers full sun and well-drained soil. Drought-tolerant once established. Attract butterflies and hummingbirds.",
    co2_absorption: {
      daily: 0.0002,
      annual: 0.07,
      impact: "Small but valuable for biodiversity"
    },
    growth_conditions: {
      height_m: 0.897,
      canopy_m2: 0.866,
      optimal_temp: 11.78,
      rainfall_mm: 1384.3,
      soil_type: "Peaty"
    },
    confidence: 0.90
  }
];

const PlantLibrary = () => {
  const [activeTab, setActiveTab] = useState("plant-library");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Filter plants based on search term and type
  const filteredPlants = samplePlants.filter((plant) => {
    const matchesSearch =
      plant.species_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType =
      selectedType === "all" ||
      plant.plant_type === selectedType;
    
    return matchesSearch && matchesType;
  });
  
  // Handle plant selection
  const handlePlantSelect = (plantId: string) => {
    setSelectedPlant(plantId);
    if (isMobile) {
      // For mobile, switch to the details tab when a plant is selected
      document.getElementById("details-tab")?.click();
    }
  };
  
  // Get unique types for filter dropdown
  const plantTypes = Array.from(
    new Set(samplePlants.map((plant) => plant.plant_type))
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navigation activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab)} />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Plant Library</h1>
          <p className="text-green-700 max-w-2xl mx-auto">
            Explore our comprehensive database of plants from around the world. Learn about CO2 absorption, environmental benefits, and expert landscaping tips.
          </p>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by plant name, species, region, or description..."
            className="pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end mb-4">
          <div className="flex items-center">
            <Filter className="mr-2 text-green-700" size={16} />
            <span className="text-green-700 mr-2">Filter by:</span>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Plant Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {plantTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          {isMobile ? (
            <Tabs defaultValue="list">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="list">Plant List</TabsTrigger>
                <TabsTrigger value="details" id="details-tab">Plant Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="mt-0">
                <ScrollArea className="h-[60vh]">
                  <div className="grid grid-cols-1 gap-4">
                    {filteredPlants.length > 0 ? (
                      filteredPlants.map((plant) => (
                        <PlantCard
                          key={plant.id}
                          plant={plant}
                          onSelect={handlePlantSelect}
                          isSelected={plant.id === selectedPlant}
                        />
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <Info className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No Plants found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter terms.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="details" className="mt-0">
                {selectedPlant ? (
                  <PlantDetail
                    plant={samplePlants.find(p => p.id === selectedPlant)!}
                  />
                ) : (
                  <div className="text-center py-20">
                    <Info className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No Plant selected</h3>
                    <p className="mt-1 text-sm text-gray-500">Select a plant from the list to view details.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex">
              <div className="w-1/3 pr-4 border-r border-gray-200">
                <h2 className="text-lg font-semibold text-green-800 mb-4">Plant List</h2>
                <ScrollArea className="h-[70vh]">
                  <div className="grid grid-cols-1 gap-4 pr-2">
                    {filteredPlants.length > 0 ? (
                      filteredPlants.map((plant) => (
                        <PlantCard
                          key={plant.id}
                          plant={plant}
                          onSelect={handlePlantSelect}
                          isSelected={plant.id === selectedPlant}
                        />
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <Info className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No Plants found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter terms.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="w-2/3 pl-6">
                <h2 className="text-lg font-semibold text-green-800 mb-4">Plant Details</h2>
                {selectedPlant ? (
                  <PlantDetail
                    plant={samplePlants.find(p => p.id === selectedPlant)!}
                  />
                ) : (
                  <div className="text-center py-20">
                    <Info className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No Plant selected</h3>
                    <p className="mt-1 text-sm text-gray-500">Select a plant from the list to view details.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Plant Card Component
interface PlantCardProps {
  plant: typeof samplePlants[0];
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const PlantCard = ({ plant, onSelect, isSelected }: PlantCardProps) => {
  const getPlantIcon = (type: string) => {
    switch (type) {
      case 'tree':
        return <TreePine className="h-4 w-4" />;
      case 'flower':
        return <Leaf className="h-4 w-4" />;
      default:
        return <Droplets className="h-4 w-4" />;
    }
  };

  return (
    <Card
      className={`cursor-pointer transition-shadow hover:shadow-lg ${
        isSelected ? 'border-green-500 border-2' : ''
      }`}
      onClick={() => onSelect(plant.id)}
    >
      <CardHeader className="py-3 px-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="text-green-600">
              {getPlantIcon(plant.plant_type)}
            </div>
            <div>
              <CardTitle className="text-md font-medium text-green-800">{plant.common_name}</CardTitle>
              <p className="text-xs text-gray-500 italic">{plant.species_name}</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
            {plant.plant_type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <CardDescription className="text-sm line-clamp-2">
          {plant.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="py-2 px-4">
        <div className="flex items-center justify-between w-full text-xs text-gray-500">
          <div className="flex items-center">
            <span>CO₂: </span>
            <span className="font-medium text-green-600 ml-1">{plant.co2_absorption.annual.toFixed(1)} kg/year</span>
          </div>
          <div className="flex items-center">
            <span>🌍 </span>
            <span className="ml-1">{plant.growth_conditions.height_m.toFixed(1)}m</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlantLibrary;
