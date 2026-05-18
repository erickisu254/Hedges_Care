# 🌿 Hedges Care 🤖

**AI-Powered Plant Healthcare & Environmental Impact Platform**

<p align="center">
  <a href="https://hedges-care.vercel.app/">
    <img alt="Live Demo" src="https://img.shields.io/badge/Live%20Demo-Ready-green?style=flat-square">
  </a>
  <a href="https://github.com/CyberPsychiatrist/Hedges_Care/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square">
  </a>
  <a href="https://www.undp.org/sustainable-development-goals">
    <img alt="UN SDG 15" src="https://img.shields.io/badge/UN%20SDG%2015-Life%20on%20Land-brightgreen?style=flat-square">
  </a>
</p>

Welcome to **Hedges Care** — your AI-powered assistant for diagnosing plant diseases, measuring CO2 absorption, and connecting with landscaping experts! 🌱🌍

> "Revolutionizing plant healthcare while contributing to UN SDG 15: Life on Land through intelligent carbon footprint management!"

---

## 🌟 Introduction

**Hedges Care** is an innovative platform designed for homeowners, gardeners, and landscaping professionals to **manage plant health** and **measure environmental impact** using cutting-edge **machine learning** and **computer vision**. With just a snap 📸, get instant diagnoses, CO2 absorption analysis, and expert-validated treatment plans.

🌍 Join our mission to promote biodiversity, carbon sequestration, and sustainable landscaping practices while building a community of environmental stewards! 🙌

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

## 🧠 Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Shadcn UI
- **Backend:** Supabase (Auth, PostgreSQL, Edge Functions)
- **AI/ML:** TensorFlow/PyTorch, HuggingFace Transformers
- **PWA:** Optimized for offline use in remote agricultural areas
- **Payments:** M-Pesa Integration
- **Blockchain:** Polygon Network

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

> 🏡 **Maria G.**, Homeowner: *"Hedges Care helped me optimize my garden layout and now I can track how much CO2 my plants absorb! It's amazing."*

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

*Built for a greener future. Aligning technology with nature.*
