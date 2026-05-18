# Hedges Care - Comprehensive Project Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Landscaping Features](#landscaping-features)
- [NFT Integration](#nft-integration)
- [CO2 Measurement & Environmental Impact](#co2-measurement--environmental-impact)
- [UN SDG 15 Alignment](#un-sdg-15-alignment)
- [Technical Architecture](#technical-architecture)
- [Key Components](#key-components)
- [Data Sources](#data-sources)

## Project Overview

**Hedges Care** is an innovative AI-powered platform designed to revolutionize plant healthcare while contributing to environmental sustainability. The application combines cutting-edge machine learning with blockchain technology to create a comprehensive ecosystem for plant management, environmental monitoring, and carbon footprint tracking.

### Mission Statement
To promote biodiversity, carbon sequestration, and sustainable landscaping practices through intelligent plant health management and environmental impact measurement.

### Core Features
- AI-powered plant disease detection and species identification
- Real-time CO2 absorption calculation and tracking
- Expert landscaping advice and recommendations
- NFT minting for plant verification and environmental impact
- Community forum for knowledge sharing
- Professional consultation services

## Landscaping Features

### AI-Powered Plant Analysis
The platform utilizes advanced computer vision algorithms to analyze plant images with up to 96% accuracy in species identification and health assessment.

**Key Components:**
- **Image Processing**: Advanced CNN-based models for feature extraction
- **Species Identification**: Database of 1000+ plant species from global datasets
- **Health Assessment**: Comprehensive evaluation of plant vitality and growth conditions
- **Expert Recommendations**: Science-backed landscaping advice tailored to specific plant types

### Plant Library
A comprehensive database containing detailed information about various plant species, including:

```typescript
interface PlantData {
  id: string;
  species_name: string;
  common_name: string;
  plant_type: string; // 'tree', 'flower', 'shrub', etc.
  description: string;
  environmental_benefits: string;
  landscaping_tips: string;
  co2_absorption: {
    daily: number;
    annual: number;
    impact: string;
  };
  growth_conditions: {
    height_m: number;
    canopy_m2: number;
    optimal_temp: number;
    rainfall_mm: number;
    soil_type: string;
  };
  confidence: number;
}
```

**Sample Plants in Database:**
- **Mango Tree (Mangifera indica)**: 52.5 kg CO2/year absorption
- **Jacaranda Tree (Jacaranda mimosifolia)**: 28.9 kg CO2/year absorption
- **Flame Tree (Delonix regia)**: 51.0 kg CO2/year absorption
- **Weeping Willow (Salix babylonica)**: 29.0 kg CO2/year absorption
- **Deodar Cedar (Cedrus deodara)**: 25.0 kg CO2/year absorption

### Landscaping Recommendations
The system provides personalized recommendations based on:
- Plant species and growth requirements
- Local climate conditions
- Soil analysis
- Optimal spacing and placement
- Seasonal care guidelines
- Disease prevention strategies

## NFT Integration

### Plant NFT Concept
Convert verified plant analysis into unique NFTs representing their environmental impact and providing digital ownership of verified plant species.

**NFT Structure:**
```typescript
interface PlantNFT {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  imageUrl: string;
  speciesName: string;
  commonName: string;
  plantType: string;
  environmentalImpact: {
    co2AbsorbedAnnual: number;
    co2AbsorbedDaily: number;
    canopyArea: number;
    height: number;
    location: string;
  };
  metadata: {
    confidence: number;
    scanDate: string;
    optimalTemp: number;
    rainfall: number;
    soilType: string;
    healthScore: number;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  };
  ownership: {
    ownerAddress: string;
    creatorAddress: string;
    mintDate: string;
    lastTransferDate?: string;
  };
  blockchain: {
    contractAddress: string;
    chainId: string;
    transactionHash: string;
    blockNumber: number;
  };
  marketData?: {
    currentPrice?: number;
    currency?: string;
    listedForSale?: boolean;
    lastSalePrice?: number;
    lastSaleDate?: string;
  };
}
```

### Rarity System
NFT rarity is determined by CO2 absorption capacity:
- **Legendary**: ≥ 60 kg CO2/year
- **Epic**: 45-59 kg CO2/year
- **Rare**: 35-44 kg CO2/year
- **Uncommon**: 25-34 kg CO2/year
- **Common**: < 25 kg CO2/year

### NFT Marketplace Features
- **Buy/Sell Trading Platform**: Users can buy, sell, and trade plant NFTs
- **Portfolio Management**: Track NFT collection and value
- **Environmental Impact Tracking**: Monitor CO2 contributions through NFT holdings
- **Provenance Verification**: Blockchain-based verification of plant analysis data

### Minting Process
1. User uploads plant image for analysis
2. AI completes plant identification and environmental impact assessment
3. User can choose to mint the analysis as an NFT
4. NFT is created with environmental impact metadata
5. NFT can be traded on the marketplace

## CO2 Measurement & Environmental Impact

### Community Impact Dashboard
The platform features a collective dashboard that aggregates data from all users to show broader environmental impact.

**Key Features:**
- **Global Impact Counter**: Real-time display of total CO2 sequestered and trees monitored by the community.
- **Disease Outbreak Heatmap**: Visual map showing regional hotspots for plant diseases (e.g., Nairobi, Mombasa, Nakuru), enabling proactive community response.
- **ROI Insights**: Financial analysis of crop losses prevented through early detection.

### 15 Billion Trees Initiative (Kenya)
Hedges Care is strategically aligned with the Kenyan government's goal to plant 15 billion trees by 2032. The platform serves as a monitoring and verification tool for:
- Tracking individual and community contributions to national targets.
- Verifying plant health and survival rates through AI scanning.
- Quantifying the actual CO2 sequestration of newly planted forests and hedges.

## UN SDG 15 Alignment

### UN Sustainable Development Goal 15: Life on Land
The platform directly contributes to UN SDG 15 through multiple initiatives:

#### Key Aligned Targets:
1. **15.1**: Protect, restore and promote sustainable use of terrestrial ecosystems
   - Through sustainable landscaping recommendations
   - Promoting biodiversity through proper plant healthcare

2. **15.2**: Promote sustainable forest management
   - Supporting tree planting and maintenance
   - Measuring carbon sequestration impact

3. **15.4**: Ensure conservation of mountain ecosystems
   - Including mountain-specific plant recommendations
   - Climate-appropriate landscaping guidance

4. **15.7: Take urgent action to reduce degradation of natural habitats
   - Early disease detection prevents ecosystem damage
   - Data-driven conservation recommendations

#### Environmental Contributions:
- **Carbon Sequestration**: Measuring and promoting CO2 absorption
- **Biodiversity Support**: Creating habitats through proper landscaping
- **Ecosystem Restoration**: Guiding sustainable land management
- **Climate Resilience**: Promoting climate-adaptive plant species

### Impact Measurement
The platform quantifies contributions to SDG 15 through:
- CO2 absorption metrics (kg/year)
- Biodiversity impact scoring
- Ecosystem health indicators
- Sustainable landscaping adoption rates

## Technical Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Tailwind CSS** for responsive design
- **Shadcn/ui** component library
- **React Router** for navigation
- **React Query** for data management

### Backend Services
- **Supabase** for database and authentication
- **Custom AI Service** for plant analysis
- **NFT Service** for blockchain integration
- **Mock Data Service** for development

### AI/ML Components
- **TensorFlow/PyTorch**: CNN-based classifiers
- **Computer Vision**: Image processing and feature extraction
- **Environmental Algorithms**: CO2 absorption calculations
- **Confidence Scoring**: Accuracy assessment

### Blockchain Integration
- **Polygon Network**: For NFT minting and trading
- **Custom Smart Contracts**: Plant NFT standards
- **Wallet Integration**: User wallet connectivity
- **Marketplace Protocol**: Trading functionality

## Key Components

### 1. Plant Analysis System (`src/components/scan/`)
- **ImageUpload**: Handles image capture and upload
- **DiagnosisResult**: Displays AI analysis results
- **TimelineIntegration**: Tracks plant health over time
- **AIExplanation**: Provides detailed analysis insights

### 2. NFT System (`src/components/nft/`)
- **NFTCard**: Individual NFT display component
- **NFTMintingModal**: Minting interface
- **NFTMarketplace**: Trading platform
- **NFTCollection**: Collection management

### 3. Plant Library (`src/pages/PlantLibrary.tsx`)
- **Searchable Database**: 1000+ plant species
- **Detailed Information**: Growth conditions and environmental benefits
- **Filtering System**: By type, region, and environmental impact
- **Interactive Interface**: Mobile-responsive design

### 4. Environmental Dashboard (`src/components/dashboard/`)
- **Quick Actions**: Access to key features
- **Recent Activity**: Scan history and tracking
- **Analytics**: Environmental impact visualization
- **Trends**: Long-term monitoring

### 5. Community Features
- **Forum System**: Knowledge sharing
- **Expert Chat**: Professional consultations
- **Video Library**: Educational content
- **User Profiles**: Personalized experience

## Data Sources

### Global Plant Database
The platform incorporates data from comprehensive datasets including:
- **Global Hybrid Plants Emissions Data** (2000-2024)
- **Scientific Research on CO2 Absorption**
- **Botanical Databases** for species information
- **Environmental Research** for impact calculations

### Research Partnerships
- Collaboration with environmental scientists
- Partnerships with botanical institutions
- Integration with climate research data
- Validation of AI models through expert review

## Future Development

### Planned Features
1. **Drone Analysis Integration**: Aerial monitoring of large landscapes
2. **IoT Sensor Integration**: Real-time environmental monitoring
3. **Carbon Credit Trading**: Monetize environmental impact
4. **Mobile Application**: Native iOS and Android apps
5. **Enterprise Solutions**: Professional landscaping tools

### Expansion Goals
- **Global Coverage**: Expand to international markets
- **Species Database**: Add more plant varieties
- **Advanced AI**: Improve detection accuracy
- **Blockchain Integration**: Enhanced NFT functionality

## Conclusion

Hedges Care represents a groundbreaking intersection of technology and environmental stewardship. By combining AI-powered plant analysis with blockchain technology and scientific environmental measurement, the platform creates a comprehensive ecosystem that promotes sustainable landscaping while directly contributing to UN SDG 15: Life on Land.

The dual focus on practical plant management and environmental impact measurement creates a unique value proposition that serves homeowners, landscaping professionals, and environmental stewards alike. Through continuous innovation and community engagement, the platform aims to become a global leader in sustainable landscape management and environmental monitoring.

---

*This documentation provides a comprehensive overview of the Hedges Care platform, highlighting its innovative approach to plant healthcare, environmental sustainability, and technological integration.*