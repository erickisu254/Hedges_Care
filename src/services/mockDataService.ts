// Mock data service for when Supabase is unavailable
export interface MockUser {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  created_at: string;
}

export interface MockScanHistory {
  id: string;
  user_id: string;
  image_url: string;
  diagnosis: string; // Now plant species name
  treatment: string; // Now landscaping tips
  confidence: number;
  created_at: string;
  environmental_impact?: {
    co2_absorbed: number;
    location?: string;
    plants_identified: number;
  };
}

let isUsingMockData = false;
const mockUsers: MockUser[] = [];
let mockScanHistory: MockScanHistory[] = [];
let currentMockUser: MockUser | null = null;

// User change callback for AuthProvider
let onUserChangeCallback: ((user: MockUser | null) => void) | null = null;

// Sample plant data from global dataset
const samplePlants = [
  {
    species_name: "Mangifera indica",
    common_name: "Mango Tree",
    plant_type: "tree",
    description: "Tropical fruit tree known for its delicious fruits and excellent carbon sequestration capabilities.",
    environmental_benefits: "High CO2 absorption rate of 52.5 kg CO2 annually per healthy tree.",
    landscaping_tips: "Plant in full sun, well-draining soil. Space 15-20 feet apart. Regular watering during fruit development.",
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
    description: "Beautiful ornamental tree with purple flowers. Excellent for urban landscaping.",
    environmental_benefits: "Absorbs 28.9 kg CO2 annually. Creates beautiful canopy cover and improves urban air quality.",
    landscaping_tips: "Prefers full sun and well-drained soil. Drought-tolerant once established. Perfect for streetscapes.",
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
    environmental_benefits: "High absorption rate of 51.0 kg CO2 annually. Provides excellent shade and habitat for birds.",
    landscaping_tips: "Plant in full sun, tolerates various soil types. Fast-growing, so provide adequate space.",
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
  }
];

// Initialize with some sample data
const initializeMockData = () => {
  if (mockScanHistory.length === 0) {
    mockScanHistory = [
      {
        id: '1',
        user_id: 'mock-user-1',
        image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%234ade80"/><text x="100" y="100" text-anchor="middle" dominant-baseline="central" fill="white" font-size="16">Mango Tree</text></svg>',
        diagnosis: 'Mangifera indica',
        treatment: 'Plant in full sun, well-draining soil. Space 15-20 feet apart. Regular watering during fruit development.',
        confidence: 0.95,
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        environmental_impact: {
          co2_absorbed: 52.5,
          location: "Nairobi, Kenya",
          plants_identified: 1
        }
      },
      {
        id: '2',
        user_id: 'mock-user-1',
        image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f59e0b"/><text x="100" y="100" text-anchor="middle" dominant-baseline="central" fill="white" font-size="16">Jacaranda Tree</text></svg>',
        diagnosis: 'Jacaranda mimosifolia',
        treatment: 'Prefers full sun and well-drained soil. Drought-tolerant once established. Perfect for streetscapes.',
        confidence: 0.92,
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        environmental_impact: {
          co2_absorbed: 28.9,
          location: "Mombasa, Kenya",
          plants_identified: 1
        }
      },
      {
        id: '3',
        user_id: 'mock-user-1',
        image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23ef4444"/><text x="100" y="100" text-anchor="middle" dominant-baseline="central" fill="white" font-size="16">Flame Tree</text></svg>',
        diagnosis: 'Delonix regia',
        treatment: 'Plant in full sun, tolerates various soil types. Fast-growing, so provide adequate space.',
        confidence: 0.94,
        created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        environmental_impact: {
          co2_absorbed: 51.0,
          location: "Kisumu, Kenya",
          plants_identified: 1
        }
      },
      {
        id: '4',
        user_id: 'mock-user-1',
        image_url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%238b5cf6"/><text x="100" y="100" text-anchor="middle" dominant-baseline="central" fill="white" font-size="16">Drone Scan</text></svg>',
        diagnosis: 'Drone Environmental Analysis',
        treatment: '5-hectare area mapped with 15 plants identified. Environmental impact assessment completed.',
        confidence: 0.88,
        created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        environmental_impact: {
          co2_absorbed: 265.8,
          location: "Nakuru, Kenya",
          plants_identified: 15
        }
      }
    ];
  }
};

const notifyUserChange = (user: MockUser | null) => {
  if (onUserChangeCallback) {
    onUserChangeCallback(user);
  }
};

export const mockDataService = {
  // Check if we should use mock data
  isAvailable: () => !isUsingMockData,
  
  // Enable mock data mode
  enableMockData: () => {
    isUsingMockData = true;
    initializeMockData();
    console.log('🟡 Mock data mode enabled - Supabase unavailable');
  },

  // Set user change callback
  setUserChangeCallback: (callback: (user: MockUser | null) => void) => {
    onUserChangeCallback = callback;
  },

  // Auth functions
  signUp: async (email: string, password: string, username?: string, fullName?: string) => {
    const mockUser: MockUser = {
      id: `mock-user-${Date.now()}`,
      email,
      username,
      full_name: fullName,
      created_at: new Date().toISOString(),
    };
    
    mockUsers.push(mockUser);
    currentMockUser = mockUser;
    notifyUserChange(mockUser);
    
    return { user: mockUser, error: null };
  },

  signIn: async (email: string, password: string) => {
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      currentMockUser = existingUser;
      localStorage.setItem('mockUser', JSON.stringify(existingUser));
      notifyUserChange(existingUser);
      return { user: existingUser, error: null };
    }
    
    // Create a default user for demo
    const mockUser: MockUser = {
      id: 'mock-user-1',
      email,
      username: 'demouser',
      full_name: 'Demo User',
      created_at: new Date().toISOString(),
    };
    
    mockUsers.push(mockUser);
    currentMockUser = mockUser;
    initializeMockData();
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    notifyUserChange(mockUser);
    
    return { user: mockUser, error: null };
  },

  signOut: async () => {
    currentMockUser = null;
    localStorage.removeItem('mockUser');
    notifyUserChange(null);
    return { error: null };
  },

  getCurrentUser: () => {
    // Check localStorage first
    if (!currentMockUser) {
      const stored = localStorage.getItem('mockUser');
      if (stored) {
        try {
          currentMockUser = JSON.parse(stored);
        } catch (error) {
          console.error('Error parsing stored mock user:', error);
        }
      }
    }
    return currentMockUser;
  },

  // Scan history functions
  getScanHistory: async (userId?: string) => {
    initializeMockData();
    const userScans = mockScanHistory.filter(scan => 
      !userId || scan.user_id === userId || scan.user_id === 'mock-user-1'
    );
    return { data: userScans, error: null };
  },

  addScanHistory: async (userId: string, scanData: Omit<MockScanHistory, 'id' | 'user_id' | 'created_at'>) => {
    // Add environmental impact data if not present
    const enhancedScanData = {
      ...scanData,
      environmental_impact: scanData.environmental_impact || {
        co2_absorbed: Math.random() * 100 + 10, // Random CO2 between 10-110
        location: "Kenya",
        plants_identified: Math.floor(Math.random() * 5) + 1 // Random plants 1-5
      }
    };

    const newScan: MockScanHistory = {
      id: `mock-scan-${Date.now()}`,
      user_id: userId,
      created_at: new Date().toISOString(),
      ...enhancedScanData,
    };
    
    mockScanHistory.unshift(newScan);
    return { data: newScan, error: null };
  },

  // Get environmental summary for user
  getEnvironmentalSummary: async (userId: string) => {
    const userScans = mockScanHistory.filter(scan =>
      scan.user_id === userId || scan.user_id === 'mock-user-1'
    );

    const totalCO2 = userScans.reduce((sum, scan) =>
      sum + (scan.environmental_impact?.co2_absorbed || 0), 0
    );
    
    const totalPlants = userScans.reduce((sum, scan) =>
      sum + (scan.environmental_impact?.plants_identified || 0), 0
    );

    const locations = [...new Set(userScans.map(scan => scan.environmental_impact?.location).filter(Boolean))];

    return {
      totalCO2Absorbed: totalCO2,
      totalPlantsIdentified: totalPlants,
      uniqueLocations: locations.length,
      scanCount: userScans.length,
      locations: locations
    };
  },

  // Get recent environmental activities
  getRecentEnvironmentalActivities: async (userId: string, limit: number = 5) => {
    const userScans = mockScanHistory
      .filter(scan => scan.user_id === userId || scan.user_id === 'mock-user-1')
      .slice(0, limit);

    return userScans.map(scan => ({
      id: scan.id,
      type: scan.diagnosis.includes('Drone') ? 'drone-analysis' : 'plant-analysis',
      title: scan.diagnosis.includes('Drone') ? 'Drone Environmental Scan' : `${scan.diagnosis.split(' ')[0]} Analysis`,
      description: `${scan.environmental_impact?.co2_absorbed.toFixed(1)} kg CO₂/year • ${scan.environmental_impact?.location}`,
      timestamp: scan.created_at,
      status: 'success' as const,
      confidence: scan.confidence,
      environmentalImpact: scan.environmental_impact
    }));
  },

  clearScanHistory: async (userId: string) => {
    mockScanHistory = mockScanHistory.filter(scan => scan.user_id !== userId);
    return { error: null };
  }
};

// Function to test if Supabase is available
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('Supabase credentials missing, falling back to mock data');
      return false;
    }

    // Try a simple query to test connection with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'HEAD',
        headers: {
          'apikey': supabaseKey,
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response.ok;
    } catch (e) {
      clearTimeout(timeoutId);
      console.log('Supabase connection test failed or timed out:', e);
      return false;
    }
  } catch (error) {
    console.log('Supabase connection test failed:', error);
    return false;
  }
};