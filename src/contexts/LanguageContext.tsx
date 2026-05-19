import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Translation {
  [key: string]: string | Translation;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  translations: Translation;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    translations: {
      app: {
        title: 'AI Crop Doctor',
        tagline: 'Advanced Plant Disease Detection',
      },
      navigation: {
        scan: 'Scan',
        history: 'History',
        about: 'About',
        droneAnalysis: 'Drone Analysis',
        pestPrediction: 'Pest Prediction',
        partnerships: 'Partnerships',
        tools: 'Tools',
        learn: 'Learn',
        marketplace: 'Marketplace',
        more: 'More',
      },
      scan: {
        title: 'Crop Doctor AI',
        description: 'Our advanced AI model analyzes plant images to detect diseases and provide treatment recommendations',
        uploadImage: 'Upload plant image',
        analyze: 'Analyze',
        analyzing: 'Analyzing...',
        newScan: 'New Scan',
      },
      hero: {
        badge: 'Harambee: AI-Powered Community Restoration',
        titlePart1: 'Nurture Your ',
        titlePart2: "Community's",
        titlePart3: 'Green Future',
        description: "Join the Harambee for Our Earth. Our AI technology helps you protect your Shamba while contributing to Kenya's 15 Billion Trees goal. Use data science to solve local agricultural challenges and build a sustainable future together.",
        ctaScan: 'Analyze My Shamba',
        ctaImpact: 'Community Impact'
      },
      features: {
        tag: 'DATA FOR SOCIAL GOOD',
        titlePart1: 'Solving ',
        titlePart2: 'Community Challenges',
        titlePart3: ' Together',
        description: 'Hedges Care uses AI and data science to tackle climate risks, food insecurity, and financial exclusion. Join a community of thousands making a measurable difference.'
      },
      impact: {
        title: 'Impact in ',
        description: 'Real-time data insights showing how your community is contributing to a greener, more resilient Kenya.',
        selectorTag: 'Select Your Community',
        linkDetail: 'View Detailed Community Data Science Report'
      },
      voice: {
        startListening: 'Start Voice Command',
        stopListening: 'Stop Listening',
        speak: 'Speak Result',
        listening: 'Listening...',
        accessibility: 'Voice Assistant (Accessibility)',
        desc: "Describe your plant's symptoms in Swahili or English for better AI accuracy."
      },
      about: {
        title: 'About Hedges Care AI',
        mission: 'Our Mission',
        platform: 'Our Comprehensive Platform',
        benefits: 'Platform Benefits',
        impactTitle: 'Our Global Impact',
        sustainability: 'Our Commitment to Sustainability',
        getStarted: 'Get Started with Hedges Care',
        support: 'For Support'
      },
      dashboard: {
        quickActions: 'Quick Actions',
        quickActionsDesc: 'Access frequently used features with keyboard shortcuts',
        recentActivity: 'Recent Environmental Activity',
        recentActivityDesc: 'Your latest environmental analysis and conservation activities',
        totalImpact: 'Total Environmental Impact This Month',
        viewReport: 'View detailed environmental report'
      },
      workflow: {
        tag: '🔍 AI WORKFLOW',
        title: 'How Our AI Technology Works 🧠',
        description: 'From image upload to diagnosis, our advanced AI processes your plant images using state-of-the-art computer vision techniques.',
        step1Title: '📸 Image Capture',
        step1Desc: 'Take a clear photo of the affected plant part using your smartphone camera.',
        step2Title: '🔄 AI Processing',
        step2Desc: 'Our deep learning model extracts visual features and compares them against our disease database.',
        step3Title: '🧪 Disease Analysis',
        step3Desc: 'The AI identifies the disease with confidence scoring and severity assessment.',
        step4Title: '✅ Expert Treatment',
        step4Desc: 'Receive AI-generated treatment plans validated by agricultural scientists.'
      },
      cta: {
        tag: 'PROFESSIONAL LANDSCAPING SOLUTIONS',
        title: 'Transform Your Outdoor Spaces Today 🏡',
        description: 'Join thousands of homeowners and landscape professionals who trust our AI-powered platform to create stunning, sustainable outdoor environments.',
        btnScan: 'Start Landscape Analysis',
        btnConsult: 'Consult Landscape Experts'
      },
      auth: {
        welcome: 'Welcome to Hedges Care',
        tagline: 'AI-powered assistant for Landscapers',
        login: 'Login',
        signup: 'Sign Up',
        email: 'Email',
        password: 'Password',
        username: 'Username',
        fullName: 'Full Name',
        forgotPassword: 'Forgot password?',
        loggingIn: 'Logging in...',
        creatingAccount: 'Creating account...',
        createAccount: 'Create Account'
      }
    }
  },
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    flag: '🇰🇪',
    translations: {
      app: {
        title: 'Hedges Care AI',
        tagline: 'Utambuzi wa Juu wa Afya ya Mimea',
      },
      navigation: {
        scan: 'Chunguza',
        history: 'Dhibiti',
        about: 'Kuhusu',
        droneAnalysis: 'Uchambuzi wa Drone',
        pestPrediction: 'Utabiri wa Wadudu',
        partnerships: 'Ushirikiano',
        tools: 'Vifaa',
        learn: 'Jifunze',
        marketplace: 'Soko',
        more: 'Zaidi',
      },
      scan: {
        title: 'Hedges Care AI',
        description: 'Mfumo wetu wa kisasa wa AI unachambua picha za mimea kutambua magonjwa na kutoa mapendekezo ya matibabu',
        uploadImage: 'Pakia picha ya mmea',
        analyze: 'Chambua',
        analyzing: 'Inachambua...',
        newScan: 'Uchunguzi Mpya',
      },
      hero: {
        badge: 'Harambee: Urejeshaji wa Mazingira kwa Nguvu ya AI',
        titlePart1: 'Tunza ',
        titlePart2: "Mustakabali wa Kijani",
        titlePart3: 'wa Jamii Yako',
        description: "Jiunge na Harambee ya Dunia Yetu. Teknolojia yetu ya AI inakusaidia kulinda Shamba lako huku ukichangia lengo la Kenya la Kupanda Miti Bilioni 15. Tumia sayansi ya data kutatua changamoto za kilimo na kujenga mustakabali endelevu pamoja.",
        ctaScan: 'Chambua Shamba Langu',
        ctaImpact: 'Matokeo kwa Jamii'
      },
      features: {
        tag: 'DATA KWA AJILI YA JAMII',
        titlePart1: 'Tutatue ',
        titlePart2: 'Changamoto za Jamii',
        titlePart3: ' Pamoja',
        description: 'Hedges Care inatumia AI na sayansi ya data kukabiliana na hatari za hali ya hewa, upungufu wa chakula, na kutengwa kifedha. Jiunge na maelfu ya watu wanaofanya mabadiliko yanayopimika.'
      },
      impact: {
        title: 'Matokeo katika ',
        description: 'Takwimu za muda halisi zinazoonyesha jinsi jamii yako inavyochangia katika Kenya ya kijani na yenye ustahimilivu zaidi.',
        selectorTag: 'Chagua Jamii Yako',
        linkDetail: 'Angalia Ripoti ya Kina ya Sayansi ya Data ya Jamii'
      },
      voice: {
        startListening: 'Anza Amri ya Sauti',
        stopListening: 'Acha Kusikiliza',
        speak: 'Sema Matokeo',
        listening: 'Inasikiliza...',
        accessibility: 'Msaidizi wa Sauti (Ufikiaji)',
        desc: "Elezea dalili za mmea wako kwa Kiswahili au Kiingereza kwa usahihi bora wa AI."
      },
      about: {
        title: 'Kuhusu Hedges Care AI',
        mission: 'Dhamira Yetu',
        platform: 'Mfumo Wetu Kamili',
        benefits: 'Faida za Mfumo',
        impactTitle: 'Matokeo Yetu Duniani',
        sustainability: 'Ahadi Yetu kwa Uendelevu',
        getStarted: 'Anza na Hedges Care',
        support: 'Kwa Msaada'
      },
      dashboard: {
        quickActions: 'Hatua za Haraka',
        quickActionsDesc: 'Fikia vipengele vinavyotumiwa mara kwa mara kwa njia ya mkato ya kibodi',
        recentActivity: 'Shughuli za Mazingira za Hivi Karibuni',
        recentActivityDesc: 'Uchambuzi wako wa hivi karibuni wa mazingira na shughuli za uhifadhi',
        totalImpact: 'Jumla ya Athari za Mazingira Mwezi Huu',
        viewReport: 'Angalia ripoti ya kina ya mazingira'
      },
      workflow: {
        tag: '🔍 MTIRIRIKO WA AI',
        title: 'Jinsi Teknolojia Yetu ya AI Inavyofanya Kazi 🧠',
        description: 'Kuanzia kupakia picha hadi utambuzi, AI yetu ya kisasa inachakata picha zako za mimea kwa kutumia mbinu za kisasa za kompyuta vision.',
        step1Title: '📸 Piga Picha',
        step1Desc: 'Piga picha iliyo wazi ya sehemu ya mmea iliyoathirika kwa kutumia kamera ya smartphone yako.',
        step2Title: '🔄 Uchakataji wa AI',
        step2Desc: 'Mfano wetu wa deep learning unachukua sifa za picha na kuzilinganisha na database yetu ya magonjwa.',
        step3Title: '🧪 Uchambuzi wa Ugonjwa',
        step3Desc: 'AI inatambua ugonjwa kwa kutoa alama ya uhakika na tathmini ya ukali wa hali hiyo.',
        step4Title: '✅ Matibabu ya Kitaalamu',
        step4Desc: 'Pokea mipango ya matibabu iliyotengenezwa na AI na kuthibitishwa na wanasayansi wa kilimo.'
      },
      cta: {
        tag: 'SULUHU ZA KITAALAMU ZA MAZINGIRA',
        title: 'Badilisha Maeneo Yako ya Nje Leo 🏡',
        description: 'Jiunge na maelfu ya wamiliki wa nyumba na wataalamu wa mazingira wanaotumia mfumo wetu wa AI kuunda mazingira mazuri na endelevu.',
        btnScan: 'Anza Uchambuzi wa Mazingira',
        btnConsult: 'Wasiliana na Wataalamu wa Mazingira'
      },
      auth: {
        welcome: 'Karibu Hedges Care',
        tagline: 'Msaidizi wa AI kwa Wapenzi wa Mazingira',
        login: 'Ingia',
        signup: 'Jisajili',
        email: 'Barua Pepe',
        password: 'Nywila',
        username: 'Jina la Mtumiaji',
        fullName: 'Jina Kamili',
        forgotPassword: 'Umesahau nywila?',
        loggingIn: 'Inaingia...',
        creatingAccount: 'Inatengeneza akaunti...',
        createAccount: 'Tengeneza Akaunti'
      }
    }
  }
];

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (languageCode: string) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (languageCode: string) => {
    const language = languages.find(lang => lang.code === languageCode);
    if (language) {
      setCurrentLanguage(language);
      localStorage.setItem('preferredLanguage', languageCode);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    // Use unknown type first, then safely cast
    let value: unknown = currentLanguage.translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      availableLanguages: languages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};