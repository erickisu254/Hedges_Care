
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Camera, History, MessageSquare, BookOpen, Users, Video, Info,
  Plane, Bug, HandHeart, ChevronDown, Settings, MoreHorizontal, Calendar, Wallet,
  ShoppingCart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItemsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile?: boolean;
  closeMenu?: () => void;
}

// Primary navigation items (always visible)
export const primaryNavItems = [
  {
    name: "Expert Chat",
    path: "/specialist-chat",
    icon: <MessageSquare className="h-4 w-4 mr-1" />,
    authRequired: true
  }
];

// Tools navigation items (under dropdown)
export const toolsNavItems = [
  {
    name: "Scan",
    path: "/scan",
    icon: <Camera className="h-4 w-4 mr-1" />,
    authRequired: true
  },
  {
    name: "History",
    path: "/history",
    icon: <History className="h-4 w-4 mr-1" />,
    authRequired: true
  }
];

// Learning resources group
export const learningNavItems = [
  { 
    name: "Plant Library", 
    path: "/plant-library", 
    icon: <BookOpen className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "Video Library", 
    path: "/video-library", 
    icon: <Video className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "Community Forum", 
    path: "/community-forum", 
    icon: <Users className="h-4 w-4 mr-1" />,
    authRequired: false
  }
];

// Advanced tools group
export const advancedNavItems = [
  { 
    name: "Satellite", 
    path: "/drone-analysis", 
    icon: <Plane className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "Partnerships", 
    path: "/partnerships", 
    icon: <HandHeart className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "About", 
    path: "/about", 
    icon: <Info className="h-4 w-4 mr-1" />,
    authRequired: false
  }
];

// NFT Navigation items
export const nftNavItems = [
  {
    name: "NFT Gallery",
    path: "/nft-gallery",
    icon: <Wallet className="h-4 w-4 mr-1" />,
    authRequired: false
  }
];

// E-commerce Navigation items
export const ecommerceNavItems = [
  {
    name: "Plant Store",
    path: "/plant-store",
    icon: <ShoppingCart className="h-4 w-4 mr-1" />,
    authRequired: false
  }
];

// Marketplace navigation items
export const marketplaceNavItems = [
  {
    name: "NFT Gallery",
    path: "/nft-gallery",
    icon: <Wallet className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  {
    name: "Plant Store",
    path: "/plant-store",
    icon: <ShoppingCart className="h-4 w-4 mr-1" />,
    authRequired: false
  }
];

// All navigation items for mobile
export const allNavItems = [...toolsNavItems, ...primaryNavItems, ...learningNavItems, ...advancedNavItems, ...marketplaceNavItems];

const NavItems: React.FC<NavItemsProps> = ({ activeTab, setActiveTab, isMobile = false, closeMenu }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLearningOpen, setIsLearningOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);

  // Localized items
  const toolsItems = [
    {
      name: t('navigation.scan'),
      path: "/scan",
      icon: <Camera className="h-4 w-4 mr-1" />,
      authRequired: true
    },
    {
      name: t('navigation.history'),
      path: "/history",
      icon: <History className="h-4 w-4 mr-1" />,
      authRequired: true
    }
  ];

  const primaryItems = [
    {
      name: "Expert Chat",
      path: "/specialist-chat",
      icon: <MessageSquare className="h-4 w-4 mr-1" />,
      authRequired: true
    }
  ];

  const learningItems = [
    { 
      name: "Plant Library", 
      path: "/plant-library", 
      icon: <BookOpen className="h-4 w-4 mr-1" />,
      authRequired: false
    },
    { 
      name: "Video Library", 
      path: "/video-library", 
      icon: <Video className="h-4 w-4 mr-1" />,
      authRequired: false
    },
    { 
      name: "Community Forum", 
      path: "/community-forum", 
      icon: <Users className="h-4 w-4 mr-1" />,
      authRequired: false
    }
  ];

  const advancedItems = [
    { 
      name: t('navigation.droneAnalysis'), 
      path: "/drone-analysis", 
      icon: <Plane className="h-4 w-4 mr-1" />,
      authRequired: false
    },
    { 
      name: t('navigation.partnerships'), 
      path: "/partnerships", 
      icon: <HandHeart className="h-4 w-4 mr-1" />,
      authRequired: false
    },
    { 
      name: t('navigation.about'), 
      path: "/about", 
      icon: <Info className="h-4 w-4 mr-1" />,
      authRequired: false
    }
  ];

  const marketplaceItems = [
    {
      name: "NFT Gallery",
      path: "/nft-gallery",
      icon: <Wallet className="h-4 w-4 mr-1" />,
      authRequired: false
    },
    {
      name: "Plant Store",
      path: "/plant-store",
      icon: <ShoppingCart className="h-4 w-4 mr-1" />,
      authRequired: false
    }
  ];

  const allItems = [...toolsItems, ...primaryItems, ...learningItems, ...advancedItems, ...marketplaceItems];
  
  const handleNavigation = (path: string, tabName: string) => {
    navigate(path);
    setActiveTab(tabName.toLowerCase());
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };

  const isActive = (itemName: string, itemPath: string) => {
    return (activeTab === itemName.toLowerCase() || 
            (window.location.pathname === itemPath && activeTab === ""));
  };
  
  // Mobile view - show all items in a simple list
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-1">
        {allItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            className={`justify-start w-full px-4 py-3 rounded-lg transition-all duration-300 ${
              isActive(item.name, item.path)
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md"
                : "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
            } flex items-center space-x-3`}
            onClick={() => handleNavigation(item.path, item.name)}
          >
            <div className="flex items-center justify-center w-5 h-5">
              {item.icon}
            </div>
            <span className="font-medium ml-1">{item.name}</span>
            {item.path === "/nft-gallery" && (
              <div className="ml-auto px-2 py-0.5 text-xs bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full">
                NFT
              </div>
            )}
          </Button>
        ))}
      </div>
    );
  }

  // Desktop view - organized dropdowns
  return (
    <div className="flex items-center gap-2">
      {/* Tools Dropdown */}
      <DropdownMenu open={isToolsOpen} onOpenChange={setIsToolsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
              toolsItems.some(item => isActive(item.name, item.path))
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md"
                : "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
            }`}
          >
            <Camera className="h-4 w-4" />
            <span>{t('navigation.tools') || 'Tools'}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52 glass-morphism shadow-xl border border-emerald-200/50">
          {toolsItems.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => handleNavigation(item.path, item.name)}
              className="cursor-pointer transition-all duration-200 hover:bg-emerald-50 text-emerald-700 font-medium"
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Primary Navigation */}
      {primaryItems.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          size="sm"
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            isActive(item.name, item.path)
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md"
              : "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
          } flex items-center space-x-2`}
          onClick={() => handleNavigation(item.path, item.name)}
        >
          {item.icon}
          <span>{item.name}</span>
        </Button>
      ))}

      {/* Learning Resources Dropdown */}
      <DropdownMenu open={isLearningOpen} onOpenChange={setIsLearningOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
              learningItems.some(item => isActive(item.name, item.path))
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md"
                : "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>{t('navigation.learn') || 'Learn'}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52 glass-morphism shadow-xl border border-emerald-200/50">
          {learningItems.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => handleNavigation(item.path, item.name)}
              className="cursor-pointer transition-all duration-200 hover:bg-emerald-50 text-emerald-700 font-medium"
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Marketplace Dropdown */}
      <DropdownMenu open={isMarketplaceOpen} onOpenChange={setIsMarketplaceOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
              marketplaceItems.some(item => isActive(item.name, item.path))
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md"
                : "text-purple-700 hover:bg-purple-50 hover:text-purple-800"
            }`}
          >
            <Wallet className="h-4 w-4" />
            <span>{t('navigation.marketplace') || 'Marketplace'}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52 glass-morphism shadow-xl border border-purple-200/50">
          {marketplaceItems.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => handleNavigation(item.path, item.name)}
              className="cursor-pointer transition-all duration-200 hover:bg-purple-50 text-purple-700 font-medium"
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Advanced Tools Dropdown */}
      <DropdownMenu open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
              advancedItems.some(item => isActive(item.name, item.path))
                ? "bg-gradient-to-r from-sapphire-500 to-sapphire-600 text-white shadow-md"
                : "text-sapphire-700 hover:bg-sapphire-50 hover:text-sapphire-800"
            }`}
          >
            <MoreHorizontal className="h-4 w-4" />
            <span>{t('navigation.more') || 'More'}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52 glass-morphism shadow-xl border border-sapphire-200/50">
          {advancedItems.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => handleNavigation(item.path, item.name)}
              className="cursor-pointer transition-all duration-200 hover:bg-sapphire-50 text-sapphire-700 font-medium"
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavItems;
