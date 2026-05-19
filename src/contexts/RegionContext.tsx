import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Region {
  id: string;
  name: string;
  county: string;
  coordinates: { lat: number; lng: number };
  co2Metrics: {
    absorbed: string;
    trees: string;
    shambas: string;
    resilience: string;
  };
  pestAlert?: {
    pest: string;
    risk: string;
    insight: string;
  };
  climateSmartPlants: Array<{
    name: string;
    benefit: string;
  }>;
}

export const regions: Region[] = [
  {
    id: 'kiambu',
    name: 'Kiambu Region',
    county: 'Kiambu',
    coordinates: { lat: -1.1714, lng: 36.8356 },
    co2Metrics: {
      absorbed: '1,240 Tons',
      trees: '154,000',
      shambas: '12,450',
      resilience: '+15%',
    },
    pestAlert: {
      pest: 'Tomato Leaf Miner',
      risk: '15%',
      insight: 'Recent high humidity (75%) has increased pest probability by 12%. Early organic intervention recommended.'
    },
    climateSmartPlants: [
      { name: 'Mango Tree (Mangifera indica)', benefit: 'High Impact' },
      { name: 'Jacaranda (J. mimosifolia)', benefit: 'Drought Resistant' }
    ]
  },
  {
    id: 'nairobi',
    name: 'Nairobi Central',
    county: 'Nairobi',
    coordinates: { lat: -1.286389, lng: 36.817223 },
    co2Metrics: {
      absorbed: '850 Tons',
      trees: '45,000',
      shambas: '3,200',
      resilience: '+8%',
    },
    pestAlert: {
      pest: 'Aphids',
      risk: '25%',
      insight: 'Urban heat island effect is accelerating aphid reproduction. Ensure proper spacing for airflow.'
    },
    climateSmartPlants: [
      { name: 'Bamboo (Bambusoideae)', benefit: 'Air Purification' },
      { name: 'Flame Tree (Delonix regia)', benefit: 'Urban Shade' }
    ]
  },
  {
    id: 'mombasa',
    name: 'Coast Region',
    county: 'Mombasa',
    coordinates: { lat: -4.043479, lng: 39.668206 },
    co2Metrics: {
      absorbed: '2,100 Tons',
      trees: '89,000',
      shambas: '5,600',
      resilience: '+22%',
    },
    pestAlert: {
      pest: 'Coconut Beetle',
      risk: '40%',
      insight: 'Rising sea levels and salinity are stressing coastal palms. Check for pheromone trap readiness.'
    },
    climateSmartPlants: [
      { name: 'Coconut Palm (Cocos nucifera)', benefit: 'Coastal Protection' },
      { name: 'Casuarina (C. equisetifolia)', benefit: 'Windbreak' }
    ]
  },
  {
    id: 'nakuru',
    name: 'Rift Valley North',
    county: 'Nakuru',
    coordinates: { lat: -0.303099, lng: 36.080230 },
    co2Metrics: {
      absorbed: '3,400 Tons',
      trees: '210,000',
      shambas: '18,900',
      resilience: '+18%',
    },
    pestAlert: {
      pest: 'Maize Lethal Necrosis',
      risk: '10%',
      insight: 'Soil moisture is optimal for crop growth, but watch for vector movement from neighboring regions.'
    },
    climateSmartPlants: [
      { name: 'Acacia (Acacia abyssinica)', benefit: 'Soil Nitrogen' },
      { name: 'Grevillea (G. robusta)', benefit: 'Agroforestry' }
    ]
  }
];

interface RegionContextType {
  currentRegion: Region;
  setRegion: (regionId: string) => void;
  availableRegions: Region[];
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRegion, setCurrentRegion] = useState<Region>(regions[0]);

  const setRegion = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    if (region) {
      setCurrentRegion(region);
      localStorage.setItem('preferredRegion', regionId);
    }
  };

  useEffect(() => {
    const savedRegion = localStorage.getItem('preferredRegion');
    if (savedRegion) {
      const region = regions.find(r => r.id === savedRegion);
      if (region) setCurrentRegion(region);
    }
  }, []);

  return (
    <RegionContext.Provider value={{
      currentRegion,
      setRegion,
      availableRegions: regions
    }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
};
