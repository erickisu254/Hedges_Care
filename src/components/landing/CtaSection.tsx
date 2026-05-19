
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, MessageSquare } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/contexts/LanguageContext";

const CtaSection = () => {
  const { user } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';
  
  return (
    <div className="py-16 bg-gradient-to-r from-emerald-600 to-green-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium text-sm mb-6">
          <span className="text-lg">🌿</span>
          <span>{t('cta.tag')}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta.title')}</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          {t('cta.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            asChild
            className="bg-white text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <Link to={user ? "/scan" : "/auth"}>
              {t('cta.btnScan')}
              <Zap className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-lg text-lg transition-all duration-300 hover:bg-white/20 flex items-center gap-2"
          >
            <Link to={user ? "/specialist-chat" : "/auth"}>
              {t('cta.btnConsult')}
              <MessageSquare className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 text-emerald-100 text-sm">
          <p>
            {isSwahili 
              ? "🌟 Uchambuzi wa bure wa mazingira • 🏡 Ushauri wa muundo • 🌿 Ufuatiliaji wa afya ya mimea"
              : "🌟 Free landscape analysis • 🏡 Design consultation • 🌿 Plant health monitoring"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
