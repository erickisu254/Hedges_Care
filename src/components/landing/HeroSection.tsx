import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Languages } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { user } = useAuth();
  const { t, currentLanguage, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(currentLanguage.code === 'en' ? 'sw' : 'en');
  };
  
  return (
    <div className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-amber-50">
      {/* Enhanced landscape background with subtle texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      ></div>
      
      {/* Enhanced mountain silhouette with landscaping elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-800/20 to-transparent"></div>
      <div className="absolute bottom-0 left-10 w-40 h-24 bg-gradient-to-t from-green-700/30 to-transparent rounded-t-full"></div>
      <div className="absolute bottom-0 right-20 w-32 h-20 bg-gradient-to-t from-green-600/25 to-transparent rounded-t-full"></div>
      
      {/* Additional landscaping elements - trees */}
      <div className="absolute bottom-0 left-1/4 w-8 h-16 bg-gradient-to-t from-green-800/40 to-transparent rounded-t-full"></div>
      <div className="absolute bottom-0 right-1/3 w-6 h-12 bg-gradient-to-t from-green-700/35 to-transparent rounded-t-full"></div>
      
      {/* Floating landscaping elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <div className="text-4xl">🌳</div>
      </div>
      <div className="absolute top-32 right-16 opacity-20">
        <div className="text-3xl">🌲</div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Language Toggle Button for Hero */}
            <div className="flex justify-start mb-2">
              <Button 
                onClick={toggleLanguage}
                variant="outline" 
                size="sm"
                className="gap-2 border-emerald-200 bg-white/50 backdrop-blur-sm text-emerald-800 hover:bg-emerald-100 shadow-sm"
              >
                <Languages className="h-4 w-4" />
                {currentLanguage.code === 'en' ? 'Badilisha lugha kuwa Kiswahili' : 'Switch to English'}
              </Button>
            </div>

            {/* Enhanced badge with social good theme */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 text-emerald-800 font-medium text-sm mb-4 shadow-sm">
              <span className="text-lg">🌍</span>
              <span>{t('hero.badge')}</span>
            </div>
            
            {/* Enhanced heading with social good focus */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              {t('hero.titlePart1')}<span className="text-emerald-600">{t('hero.titlePart2')}</span> <br />
              <span className="text-green-600">{t('hero.titlePart3')}</span> 🌿
            </h1>
            
            {/* Enhanced description */}
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {t('hero.description')}
            </p>
            
            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                asChild
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-10 py-4 rounded-xl text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <Link to={user ? "/scan" : "/auth"}>
                  {t('hero.ctaScan')}
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-10 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:border-emerald-600"
              >
                <Link to="/about">{t('hero.ctaImpact')}</Link>
              </Button>
            </div>
            
            {/* Enhanced trust indicators */}
            <div className="flex items-center gap-8 pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                <span>Data for Social Good</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                <span>Climate Resilience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                <span>M-Pesa Integrated</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced visual with landscaping theme */}
          <div className="relative">
            {/* Main image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1580218769217-b3c5d8cd15b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Professional landscape design"
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Floating landscaping cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 transform hover:scale-110 transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <span className="text-emerald-600 text-xl">🌿</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Professional Design</p>
                  <p className="text-xs text-gray-600">Expert landscaping</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 transform hover:scale-110 transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <span className="text-green-600 text-xl">🏡</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Complete Solutions</p>
                  <p className="text-xs text-gray-600">Full service</p>
                </div>
              </div>
            </div>
            
            {/* Bottom overlay */}
            <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-emerald-900/90 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-bold text-lg">🌳 Landscape Excellence</p>
              <p className="text-sm text-emerald-100">Transform your outdoor spaces</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom landscape elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-100/50 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
