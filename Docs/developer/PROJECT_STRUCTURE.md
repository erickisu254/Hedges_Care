# Hedges Care - Project Structure

This document provides a comprehensive overview of the Hedges Care project structure, explaining the purpose of each directory and how the application is organized.

## 🌳 Directory Tree

```text
Hedges_Care/
├── Docs/                   # Project documentation (Technical specs, Summary, etc.)
├── Notebooks/              # Data analysis and machine learning research
│   └── Data/               # Raw datasets for plant and emission research
├── public/                 # Static assets (images, icons, robots.txt)
│   └── screenshots/        # Application preview images
├── src/                    # Main source code
│   ├── components/         # Reusable UI components
│   │   ├── about/          # Components for the About section
│   │   ├── analytics/      # Data visualization and impact tracking
│   │   ├── auth/           # Authentication related components
│   │   ├── chat/           # Real-time chat with specialists
│   │   ├── dashboard/      # User dashboard widgets
│   │   ├── forum/          # Community forum UI elements
│   │   ├── history/        # Scan history list components
│   │   ├── landing/        # Landing page sections (Hero, Features, etc.)
│   │   ├── layout/         # Layout components (Nav, Footer, Menus)
│   │   ├── language/       # Language selection and localization UI
│   │   ├── nft/            # NFT marketplace and minting UI
│   │   ├── payment/        # M-Pesa payment modals
│   │   ├── plant/          # Plant detail and store components
│   │   ├── scan/           # AI scan and diagnosis UI
│   │   ├── timeline/       # Plant care timeline components
│   │   └── ui/             # Core UI primitives (Shadcn UI)
│   ├── contexts/           # Global React Contexts (Auth, Cart, Language)
│   ├── data/               # Static data and mock datasets
│   ├── hooks/              # Custom React hooks (use-forum, use-timeline, etc.)
│   ├── integrations/       # External service configurations
│   │   └── supabase/       # Supabase client and database types
│   ├── lib/                # Utility functions and helper libraries
│   ├── pages/              # Main application views
│   │   ├── analysis/       # Plant scan, Drone analysis, and Predictions
│   │   ├── auth/           # Login and Registration pages
│   │   ├── community/      # Forum, Specialist chat, and Video library
│   │   ├── landing/        # Landing page and Partnerships
│   │   ├── shop/           # Plant store, Cart, and Plant library
│   │   ├── user/           # Profile, Subscriptions, Timeline, and NFT Gallery
│   │   └── NotFound.tsx    # 404 error page
│   ├── services/           # Business logic and API wrappers
│   ├── types/              # TypeScript interfaces and type definitions
│   └── utils/              # General helper functions (Image verification)

│   └── snippets/           # Reusable SQL snippets
├── .env.example            # Template for environment variables
├── database_schema_queries.txt # SQL for database initialization
├── package.json            # Project dependencies and scripts
└── tailwind.config.ts      # Tailwind CSS configuration
```

---

## 📂 Detailed Directory Explanation

### `src/components/`
This is the heart of the UI. Components are organized by feature area:
- **`ui/`**: Low-level, generic components like buttons, inputs, and cards.
- **`layout/`**: Structural components that appear on most pages (Navigation, Footer).
- **`scan/`**: The core AI diagnosis interface.
- **`nft/`**: Everything related to the environmental impact NFT marketplace.

### `src/pages/`
Each file in this directory represents a full page in the application, corresponding to a specific route defined in `App.tsx`.

### `src/services/`
Contains the logic for interacting with external services:
- **`enhancedAIService.ts`**: The AI processing pipeline.
- **`mpesaService.ts`**: Integration with mobile payments.
- **`nftService.ts`**: Blockchain-related operations.
- **`weatherService.ts`**: Real-time environmental data fetching.

### `src/integrations/supabase/`
Contains the auto-generated types and the initialization client for Supabase. This is the primary bridge to the backend.

### `src/contexts/`
Manages global state that needs to be accessible across the entire application, such as the current user's authentication status, selected language, or shopping cart contents.

### `src/hooks/`
Custom hooks that encapsulate reusable logic, such as managing the plant care timeline or interacting with the community forum.

### `Docs/`
Comprehensive documentation for developers, including technical specifications, project summaries, and architectural diagrams.

---

## 🛠 Architectural Patterns

- **Component-Based:** Highly modular UI built with functional components.
- **Service Layer:** Separation of business logic from UI components.
- **Type Safety:** Extensive use of TypeScript to ensure data integrity.
- **Context-API State:** Global state management without the overhead of Redux.
- **Shadcn UI:** Consistent design language using pre-built, accessible primitives.

---

*Explore the project by navigating through these folders to understand how each piece contributes to the Hedges Care ecosystem.*
