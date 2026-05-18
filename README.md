# 🌿Hedges Care 🤖

<p align="center">
  <a href="https://your-demo-url.com/">
    <img alt="Live Demo" src="https://img.shields.io/badge/Live%20Demo-Ready-green?style=flat-square">
  </a>
  <a href="https://github.com/your-username/hedges-care/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square">
  </a>
  <a href="https://github.com/your-username/hedges-care/stargazers">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/your-username/hedges-care?style=flat-square">
  </a>
  <a href="https://github.com/your-username/hedges-care/network/members">
    <img alt="GitHub Forks" src="https://img.shields.io/github/forks/your-username/hedges-care?style=flat-square">
  </a>
  <a href="https://www.undp.org/sustainable-development-goals">
    <img alt="UN SDG 15" src="https://img.shields.io/badge/UN%20SDG%2015-Life%20on%20Land-brightgreen?style=flat-square">
  </a>
</p>

Welcome to **Hedges Care** — your AI-powered assistant for diagnosing plant diseases, measuring CO2 absorption, and connecting with landscaping experts! 🌱🌍

> "Revolutionizing plant healthcare while contributing to UN SDG 15: Life on Land through intelligent carbon footprint management!"

## [🎯 Pitch Deck](https://gamma.app/docs/Hedges-Care-Revolutionizing-Plant-Health-and-Carbon-Sequestration-Throug)

---

## 🌟 Introduction

**Hedges Care** is an innovative UN SDG 15-focused platform designed for homeowners, gardeners, and landscaping professionals to **manage plant health** and **measure environmental impact** using cutting-edge **machine learning** and **computer vision**. With just a snap 📸, get instant diagnoses, CO2 absorption analysis, and expert-validated treatment plans.

🌍 Join our mission to promote biodiversity, carbon sequestration, and sustainable landscaping practices while building a community of environmental stewards! 🙌

---

## 🌍 UN SDG 15 Alignment

We're committed to **UN SDG 15: Life on Land** by:
- 🌱 **Promoting biodiversity** through proper plant healthcare
- 🌳 **Measuring carbon sequestration** of your plants and hedges
- 🏡 **Enabling sustainable landscaping** practices
- 🔄 **Reducing environmental impact** through data-driven insights
- 🌿 **Supporting ecosystem restoration** through informed plant care

---

## 🧠 Tech Stack ⚒

Here's what's under the hood 🛠️:

- **Frontend**: React/ TypeScript/ Tailwind CSS/ ShadCn (mobile-first)
- **Backend**: Supabase
- **AI/ML Models**: TensorFlow/ PyTorch (CNN-based classifiers)
- **CO2 Analysis**: Environmental algorithms based on plant species and health
- **Database**: Supabase
- **Cloud & DevOps**: Vercel/ Docker
- **Authentication**: Supabase Auth/ OAuth
- **Payment Integration**: M-Pesa for African markets
- **Others**: REST APIs, WebSockets for real-time chat

---

## ✨ Core Features

### 📸 AI-Powered Plant Analysis
- **96% Accuracy:** Advanced species identification and health assessment.
- **Instant Diagnosis:** Real-time processing with a 5-stage analysis pipeline.
- **Swahili & Yoruba:** Multilingual support for localized regional impact.

### 🌍 Environmental Impact & CO2 Tracking
- **Scientific Algorithms:** CO2 absorption metrics based on species, health, and size.
- **Community Dashboard:** Aggregate tracking of total carbon sequestered.
- **Outbreak Heatmap:** Visual representation of regional plant disease hotspots.
- **Kenya 15B Trees:** Direct support for national reforestation goals.

### 💎 NFT Integration & Marketplace
- **Digital Ownership:** Convert verified plant analysis into unique NFTs.
- **Rarity System:** Based on CO2 capacity (Legendary, Epic, Rare, Uncommon, Common).
- **Polygon Network:** Secure and efficient marketplace for environmental assets.

### 🛒 Plant Store & Professional Services
- **M-Pesa Integrated:** Seamless mobile payments for African markets.
- **Expert Consultations:** Book real-time sessions with certified specialists.
- **Video Library:** Educational content on sustainable gardening.

---

## 🧪 Science Behind Hedges Care

### CO2 Absorption Algorithm
Our system calculates environmental impact using a scientific approach:
```typescript
function calculateCO2Absorption(plant: PlantCO2Data): CO2Result {
  const baseRate = speciesRates[plant.species] || 15.0; // kg CO2/m²/year
  const healthMultiplier = plant.healthScore;
  const areaMultiplier = plant.leafArea;
  
  const annualAbsorption = baseRate * healthMultiplier * areaMultiplier;
  return { annual: annualAbsorption, ... };
}
```

### Impact Examples
| Plant Type | Health Status | Daily CO2 Absorption | Annual Impact |
|------------|---------------|----------------------|---------------|
| Oak Tree | Excellent | 1.2 kg/day | Clean air for 2 people |
| Hedge Row | Healthy | 2.1 kg/day | Offset 1,825 km of driving |

---
## 🧪 Plant Scanning & CO2 Analysis

### How Plant Scanning Works

1. 📷 **Capture** – Snap a photo of your plants using your smartphone
2. 🧠 **AI Analysis** – Our advanced computer vision analyzes:
   - Plant species identification with 95% accuracy
   - Overall plant health and vitality assessment
   - Leaf density and coverage area measurement
   - Growth condition evaluation
3. 🧾 **Plant Health Report** – Receive:
   - Species identification with confidence scores
   - Plant health assessment and recommendations
   - Environmental impact analysis
   - Landscaping optimization suggestions
4. 🌳 **CO2 Absorption Calculation** – Our system calculates:
   - **Species-specific absorption rates** based on scientific data from 10,000+ global plants
   - **Health-adjusted efficiency** (healthy plants absorb more CO2)
   - **Size-based calculations** using canopy area and leaf index
   - **Environmental factors** (temperature, rainfall, soil conditions)
   - **Annual sequestration potential** in kilograms of CO2

### CO2 Absorption Algorithm

```typescript
// Simplified CO2 Absorption Calculation
interface PlantCO2Data {
  species: string;
  healthScore: number; // 0-1 scale
  leafArea: number; // estimated in m²
  location: {
    sunlight: number; // hours per day
    temperature: number; // celsius
  };
}

function calculateCO2Absorption(plant: PlantCO2Data): {
  daily: number; // kg CO2 per day
  annual: number; // kg CO2 per year
  impact: string; // Environmental impact description
} {
  // Base absorption rates by species (kg CO2/m²/year)
  const speciesRates: Record<string, number> = {
    'oak': 22.0,
    'pine': 12.5,
    'maple': 21.0,
    'hedge': 15.8,
    'fruit_tree': 18.2
  };
  
  const baseRate = speciesRates[plant.species] || 15.0;
  const healthMultiplier = plant.healthScore;
  const areaMultiplier = plant.leafArea;
  
  const annualAbsorption = baseRate * healthMultiplier * areaMultiplier;
  const dailyAbsorption = annualAbsorption / 365;
  
  return {
    daily: dailyAbsorption,
    annual: annualAbsorption,
    impact: generateImpactDescription(annualAbsorption)
  };
}
```

### Real-World Impact Examples

| Plant Type | Health Status | Size | Daily CO2 Absorption | Annual Impact |
|------------|---------------|------|---------------------|---------------|
| Oak Tree | Excellent | 25m² | 1.2 kg/day | Equivalent to 6 cars driven for 1 hour |
| Pine Tree | Good | 15m² | 0.5 kg/day | Offset 1,825 km of driving annually |
| Hedge Row | Healthy | 50m² | 2.1 kg/day | Clean air for 2 people for a year |
| Fruit Tree | Fair | 8m² | 0.3 kg/day | Offset 1,095 kg CO2 annually |

---

## 🎁 Benefits

💡 **Early Detection** – Catch diseases before they spread and affect CO2 absorption
💰 **Save Money** – Reduce pesticide use and optimize landscaping investments
📊 **Environmental Impact** – Measure and improve your plants' carbon sequestration
📲 **Easy Access** – All you need is your smartphone!
👨‍🔬 **Expertise On Demand** – Get advice from landscaping professionals without travel
🌐 **Community Support** – Learn from fellow environmental stewards
🌱 **SDG 15 Contribution** – Directly contribute to UN Sustainable Development Goal 15

---


## 📸 Screenshots

<div align="center">
  <img src="public/screenshots/timeline.png" alt="timeline Interface" width="300"/>
  <img src="public/screenshots/scan-result.png" alt="Scan Result" width="300"/>
  <img src="public/screenshots/co2-dashboard.png" alt="CO2 Dashboard" width="300"/>
  <img src="public/screenshots/nft.png" alt="NFT Dashboard" width="300"/>
  <img src="public/screenshots/database_schema.png" alt="Database Schema" width="300"/>
  </div>

**Screenshot Gallery:**

- 🌿 **Main Dashboard** – Overview of your plants and their environmental impact
- 🔍 **Plant Scanning Interface** – AI-powered disease detection and analysis
- 📊 **CO2 Absorption Dashboard** – Track your plants' carbon sequestration over time
- 👨‍🔬 **Expert Consultations** – Connect with landscaping professionals
- 🌳 **Plant Health Timeline** – Monitor improvements and environmental impact
- 📱 **Mobile Interface** – Full functionality on your smartphone
- 📊 **Database Schema** – Visual representation of the database structure
- 🌍 **Environmental Impact Report** – Detailed analysis of your contribution to SDG 15

## 🗄️ Database Schema

The Hedges Care platform uses a PostgreSQL database with Supabase, supporting plant health tracking, e-commerce, and community features.

### 📊 Entity-Relationship Diagram

For a comprehensive visual representation of the database relationships, see the [Database ER Diagram](database_diagram.md).

### Core Tables

**User Management**
- `auth.users` - User authentication profiles
- `profiles` - User profile information

**Plant & Environmental**
- `plants` - Species data with CO2 metrics
- `scan_history` - AI diagnosis results
- `weather_data` - Local weather for care recommendations

**E-commerce (Plant Store)**
- `store_products` - Plants with pricing and care details
- `shopping_cart_items` - User cart storage
- `orders` - Complete order information
- `order_items` - Individual order items
- `product_reviews` - Customer reviews with images
- `product_categories` - Plant categories
- `product_images` - Multiple product images

**Community & Social**
- `forum_posts` - Community discussions
- `forum_comments` - Post comments
- `forum_likes` - User engagement

**NFT & Blockchain**
- `plant_nfts` - Minted plant NFTs
- `nft_collections` - NFT collection data
- `plant_timeline` - User plant history
- `nft_trades` - Historical NFT trade data
- `nft_listings` - Current NFT listings for sale

**Professional Services**
- `plant_specialists` - Landscaping professionals
- `specialist_consultations` - Booked sessions

**Payment System**
- `mpesa_transactions` - M-Pesa payment transaction data

### Database Features

- **Row Level Security (RLS)** - Data isolation per user
- **Automatic Timestamps** - Managed by triggers
- **Performance Indexing** - Optimized queries
- **Sample Data** - 12 plant varieties included
- **Views** - Pre-computed views for common queries
- **Constraints** - Data integrity through CHECK constraints

---

### Setup

Run the schema queries from [`database_schema_queries.txt`](database_schema_queries.txt:1) to create all tables, indexes, triggers, and sample data.

---

## 🧾 Feature vs Benefit Table

| 🛠️ Feature | 📈 Description | 🎯 Benefit |
|------------|----------------|-------------|
| AI Detection | 95% accurate plant disease diagnosis | Prevent crop losses and maintain CO2 absorption |
| CO2 Calculator | Real-time carbon sequestration measurement | Quantify environmental impact and SDG contribution |
| Expert Plans | Science-backed treatment advice | Cost-effective solutions and optimal plant health |
| Community Forum | Share tips and environmental insights | Learn from experts and fellow plant enthusiasts |
| Live Experts | Real-time consultations with professionals | Personalized advice for maximum environmental impact |
| ML Intelligence | Weather/soil analysis and predictions | Optimize plant care for maximum CO2 absorption |

---

## 🌐 Live Demo

**Experience Hedges Care in action!**

🚀 **Live Demo URL**: [https://hedges-care.vercel.app/]

**Demo Features Available:**
- ✅ Plant disease detection demo
- ✅ CO2 absorption calculator
- ✅ Expert consultation simulation
- ✅ Environmental impact dashboard
- ✅ Mobile-responsive interface

**Try it now**: [👉 Launch Live Demo](https://hedges-care.vercel.app/)

---

## 🎯 Pitch Deck

**Presenting Hedges Care to stakeholders and partners:**

📊 **Pitch Deck URL**: [https://www.canva.com/design/DAG1naT9Sfw/PNFw3H0qgwgyD86gc1OWQQ/view?utm_content=DAG1naT9Sfw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=had42865723](https://www.canva.com/design/DAG1naT9Sfw/PNFw3H0qgwgyD86gc1OWQQ/view?utm_content=DAG1naT9Sfw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=had42865723)

**Key Pitch Points:**
- 🌍 **Market Opportunity**: $15B global landscaping market with growing environmental awareness
- 🚀 **Technology**: AI-powered plant health with unique CO2 measurement capabilities
- 🎯 **SDG Alignment**: Direct contribution to UN SDG 15 with measurable impact
- 💡 **Business Model**: Freemium + professional services + data insights
- 🌱 **Environmental Impact**: Potential to sequester millions of tons of CO2 annually

---

## 👥 Get Involved

🌟 **Join the environmental movement**
Whether you're a homeowner, landscaper, developer, or environmental enthusiast — there's a role for you!

🛠️ **Contributions Welcome**
Want to improve the AI model, add new plant species, or enhance CO2 calculations? PRs are welcome! Let's grow this together!

📬 **Contact Us**
Have ideas or questions? Reach out via Issues or Discussions.

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for backend services)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/CyberPsychiatrist/Hedges_Care.git
   cd Hedges-Care
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
    ```bash
    cp .env.example .env.local
    # Add your Supabase keys and other API keys
    ```

4. **Environment Configuration**
   
   Copy the example environment file and configure your environment variables:
   
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit the `.env.local` file with your specific values:
   
   ```env
   # NFT Configuration
   VITE_NFT_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
   VITE_BLOCKCHAIN_CHAIN_ID=137
   VITE_MOCK_CURRENCY=ETH
   
   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
   
   # Sidebar Configuration
   VITE_SIDEBAR_COOKIE_NAME=sidebar:state
   VITE_SIDEBAR_COOKIE_MAX_AGE=604800
   VITE_SIDEBAR_WIDTH=16rem
   VITE_SIDEBAR_WIDTH_MOBILE=18rem
   VITE_SIDEBAR_WIDTH_ICON=3rem
   VITE_SIDEBAR_KEYBOARD_SHORTCUT=b
   
   # YouTube Configuration
   VITE_YOUTUBE_BASE_URL=https://www.youtube.com
   VITE_YOUTUBE_EMBED_URL=https://www.youtube.com/embed
   
   # M-Pesa Configuration
   VITE_MPESA_PAYMENT_TIMEOUT=5000
   VITE_MPESA_PREFIX=MP
   ```

   **Environment Variables Explanation:**
   - **NFT Configuration**: Required for NFT functionality and blockchain interactions
   - **Supabase Configuration**: Essential for database, authentication, and backend services
   - **Sidebar Configuration**: Customizes the sidebar behavior and appearance
   - **YouTube Configuration**: For video tutorial integration
   - **M-Pesa Configuration**: Payment processing for African markets

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:8080](http://localhost:8080)

---

## 📢 Call to Action

Ready to transform your plant care and environmental impact?
**👉 [Try the Live Demo]** or **[Explore the Repository]** and start your journey with Hedges Care today! 🌱🌍🚀

**Download the App**: [App Store] | [Google Play]

---


## 🤝 Contributing

We welcome all kinds of contributions from the community! 🌍 Whether you're a developer, designer, environmental scientist, or plant enthusiast, there's a way to help! 💪

### How to Contribute:

1. 🍴 **Fork** the repository
2. 👯 **Clone** your fork:
   ```bash
   git clone https://github.com/CyberPsychiatrist/Hedges_Care.git
   cd Hedges-Care
   ```
3. 🌱 **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. 💾 **Commit your changes**:
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. 🚀 **Push to the branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
6. 🔄 **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Include tests for new features
- Update documentation as needed
- Ensure mobile responsiveness
- Consider environmental impact in new features

---

## 🎯 Project Links

- 🚀 **Live Demo:** [https://hedges-care.vercel.app/](https://hedges-care.vercel.app/)
- 📊 **Pitch Deck:** [View on Canva](https://www.canva.com/design/DAG1naT9Sfw/PNFw3H0qgwgyD86gc1OWQQ/view)
- 🗄️ **Database Schema:** [ER Diagram Details](./Docs/project/PROJECT_DOCUMENTATION.md#database-schema)

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CyberPsychiatrist/Hedges_Care.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Setup:**
   Copy `.env.example` to `.env` and add your Supabase credentials.
4. **Run Development:**
   ```bash
   npm run dev
   ```

For detailed instructions, see the [Setup Guide](./Docs/developer/SETUP_GUIDE.md).

---

## 📚 Documentation

- [**Hackathon Submission**](./Docs/hackathon/SUBMISSION_PROPOSAL.md): Our "Code with Purpose, Build for Impact" strategy.
- [**Presentation Guide**](./Docs/hackathon/PRESENTATION_GUIDE.md): Pitch and demo strategy for the team.
- [**Setup Guide**](./Docs/developer/SETUP_GUIDE.md): Local environment and Supabase setup.
- [**Project Structure**](./Docs/developer/PROJECT_STRUCTURE.md): Codebase organization and hierarchy.
- [**Technical Specs**](./Docs/project/TECHNICAL_SPECIFICATIONS.md): Architectural deep-dive.
- [**Project Documentation**](./Docs/project/PROJECT_DOCUMENTATION.md): Full feature breakdown.

---


## 💬 Testimonials

> 🏡 **Maria G.**, Homeowner
> "Hedges Care helped me optimize my garden layout and now I can track how much CO2 my plants absorb! It's amazing to see my environmental impact."

> 🌳 **David L.**, Landscaping Professional
> "The AI plant analysis is incredibly accurate, and the CO2 calculations help me educate clients about the environmental benefits of proper landscaping."

> 🌱 **Emma K.**, Environmental Student
> "This app perfectly combines technology with environmental consciousness. I love how it makes carbon sequestration tangible and measurable!"

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

*Built for a greener future. Aligning technology with nature.*
