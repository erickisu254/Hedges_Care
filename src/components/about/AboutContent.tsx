
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle, Users, Calendar, Target, Leaf, Database,
  Camera, BookOpen, MessageSquare, Plane, Bug, Heart, Zap,
  TrendingUp, Globe, Shield, Award as AwardIcon
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutContent = () => {
  const { t, currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  return (
    <Card className="max-w-4xl mx-auto border-emerald-100 shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-emerald-600 text-white">
        <CardTitle className="text-2xl">{t('about.title')}</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-green max-w-none p-8">
        <p className="text-gray-700 leading-relaxed italic border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50 rounded-r-lg">
          {isSwahili 
            ? "Hedges Care ni mfumo mmoja wa akili wa utunzaji wa mimea unaounganisha utambuzi unaoendeshwa na AI, ushauri wa kitaalamu, ufuatiliaji wa mazingira, na teknolojia ya blockchain."
            : "Hedges Care is an all-in-one intelligent plant care platform that combines AI-powered diagnostics, expert consultations, environmental monitoring, and blockchain technology."}
        </p>
        
        <h3 className="text-xl font-semibold text-emerald-700 mt-8 mb-4 flex items-center gap-2">
          <Target className="h-5 w-5" />
          {t('about.mission')}
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {isSwahili 
            ? "Dhamira yetu ni kuziwezesha jamii kupitia akili mbandia (AI) na sayansi ya data ili kurejesha mazingira yetu na kuhakikisha usalama wa chakula kupitia utunzaji sahihi wa mimea. Tunaamini kuwa kila mmea wenye afya ni hatua kuelekea sayari ya kijani kibichi na yenye afya zaidi."
            : "Our mission is to empower communities through AI and data science to restore our environment and ensure food security through precision plant healthcare. We believe that every healthy plant is a step toward a greener, healthier planet."}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-emerald-50 p-6 rounded-2xl flex flex-col items-center text-center border border-emerald-100 hover:shadow-md transition-shadow">
            <Users className="h-10 w-10 text-emerald-600 mb-3" />
            <h4 className="font-bold text-emerald-800">{isSwahili ? "Jamii ya Harambee" : "Harambee Community"}</h4>
            <p className="text-sm text-gray-600">{isSwahili ? "Mamia ya watumiaji nchini Kenya wakifanya kazi pamoja kwa ajili ya mazingira" : "Hundreds of users in Kenya working together for a greener future"}</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-2xl flex flex-col items-center text-center border border-emerald-100 hover:shadow-md transition-shadow">
            <TrendingUp className="h-10 w-10 text-emerald-600 mb-3" />
            <h4 className="font-bold text-emerald-800">{isSwahili ? "Matokeo ya Kaboni" : "Carbon Impact"}</h4>
            <p className="text-sm text-gray-600">{isSwahili ? "Kufuatilia na kuongeza ufyonzwaji wa CO2 kwa 25% katika jamii za mitaa" : "Tracking and increasing CO2 absorption by 25% in local communities"}</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-emerald-700 mt-10 mb-4">
          {t('about.platform')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm hover:border-emerald-300 transition-colors">
            <Camera className="h-6 w-6 text-emerald-600 mb-2" />
            <h4 className="font-semibold text-emerald-800">{isSwahili ? "Scan ya Shamba ya AI" : "AI Shamba Scanning"}</h4>
            <p className="text-sm text-gray-600">{isSwahili ? "Tambua magonjwa papo hapo kwa usahihi wa 96%." : "Identify diseases instantly with 96% accuracy."}</p>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm hover:border-emerald-300 transition-colors">
            <Shield className="h-6 w-6 text-emerald-600 mb-2" />
            <h4 className="font-semibold text-emerald-800">{isSwahili ? "Ulinzi wa Jamii" : "Community Protection"}</h4>
            <p className="text-sm text-gray-600">{isSwahili ? "Tahadhari za mapema za magonjwa kwa majirani." : "Early disease outbreak alerts for neighbors."}</p>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm hover:border-emerald-300 transition-colors">
            <Globe className="h-6 w-6 text-emerald-600 mb-2" />
            <h4 className="font-semibold text-emerald-800">{isSwahili ? "Mkakati wa Tabianchi" : "Climate Strategy"}</h4>
            <p className="text-sm text-gray-600">{isSwahili ? "Upandaji unaozingatia hali ya hewa kwa uimara wa mazingira." : "Climate-smart planting for environmental resilience."}</p>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm hover:border-emerald-300 transition-colors">
            <Zap className="h-6 w-6 text-emerald-600 mb-2" />
            <h4 className="font-semibold text-emerald-800">{isSwahili ? "Inalipwa na M-Pesa" : "M-Pesa Powered"}</h4>
            <p className="text-sm text-gray-600">{isSwahili ? "Ushirikishwaji wa kifedha kupitia malipo ya simu ya mkononi." : "Financial inclusion through mobile money integration."}</p>
          </div>
        </div>
        
        <div className="bg-amber-50 p-6 rounded-xl my-8 border border-amber-100 flex items-start space-x-4">
          <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-900 font-bold">{isSwahili ? "Kanusho la Teknolojia ya AI" : "AI Technology Disclaimer"}</p>
            <p className="text-xs text-amber-800 mt-1">
              {isSwahili 
                ? "Ingawa AI yetu ni sahihi sana, inapaswa kutumiwa kama msaada wa uchunguzi. Kwa maamuzi muhimu ya kilimo au mazingira, tunapendekeza kushauriana na wataalamu waliothibitishwa." 
                : "While our AI systems provide highly accurate insights, they should be used as diagnostic aids. For critical agricultural or environmental decisions, we recommend consulting with certified professionals."}
            </p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-emerald-700 mt-10 mb-6 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          {t('about.impactTitle')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
          <div className="p-4 bg-emerald-50 rounded-xl text-center border border-emerald-100 shadow-sm">
            <Leaf className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-emerald-700">1,240</p>
            <p className="text-xs text-emerald-600 uppercase tracking-wider font-semibold">{isSwahili ? "Tani za CO2" : "Tons CO2"}</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl text-center border border-emerald-100 shadow-sm">
            <Users className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-emerald-700">15,000+</p>
            <p className="text-xs text-emerald-600 uppercase tracking-wider font-semibold">{isSwahili ? "Wakulima" : "Farmers"}</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl text-center border border-emerald-100 shadow-sm">
            <Database className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-emerald-700">1,000+</p>
            <p className="text-xs text-emerald-600 uppercase tracking-wider font-semibold">{isSwahili ? "Aina" : "Species"}</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl text-center border border-emerald-100 shadow-sm">
            <Target className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-emerald-700">15B</p>
            <p className="text-xs text-emerald-600 uppercase tracking-wider font-semibold">{isSwahili ? "Miti" : "Trees Goal"}</p>
          </div>
        </div>
        
        <div className="bg-emerald-900 p-8 rounded-2xl mt-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp className="h-32 w-32" />
          </div>
          <h3 className="text-xl font-bold mb-4 relative z-10">{t('about.getStarted')}</h3>
          <p className="text-emerald-100 mb-6 relative z-10">
            {isSwahili 
              ? "Jiunge na jamii yetu ya wapenzi wa mimea na wasimamizi wa mazingira wanaofanya kazi pamoja kwa ajili ya mustakabali wa kijani kibichi." 
              : "Join our community of plant enthusiasts and environmental stewards working together for a greener future."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <p className="text-xs text-emerald-300 uppercase tracking-widest font-bold mb-1">{t('about.support')}</p>
              <p className="text-sm font-medium">support@hedgescare.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <p className="text-xs text-emerald-300 uppercase tracking-widest font-bold mb-1">{isSwahili ? "Ushirikiano" : "Partnerships"}</p>
              <p className="text-sm font-medium">hello@hedgescare.com</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutContent;
