
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const FooterSection = () => {
  const { currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  return (
    <footer className="bg-emerald-950 text-white py-16 border-t border-emerald-900/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              Hedges Care AI
            </h3>
            <p className="mb-4 text-emerald-200/80 leading-relaxed">
              {isSwahili 
                ? "Kubadilisha Maeneo ya Nje na Ndani kwa kutumia utambuzi wa mimea unaoendeshwa na AI na ushauri wa kitaalamu wa Mazingira."
                : "Revolutionizing Outdoor & Indoor Spaces with AI-powered Plant detection and expert Landscaping advice."}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-emerald-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Other social icons remain same */}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-emerald-400">{isSwahili ? "Vipengele" : "Features"}</h3>
            <ul className="space-y-4">
              <li><Link to="/scan" className="text-emerald-200/60 hover:text-white transition-colors">{isSwahili ? "Uchambuzi wa AI" : "AI Plant Detection"}</Link></li>
              <li><Link to="/plant-library" className="text-emerald-200/60 hover:text-white transition-colors">{isSwahili ? "Maktaba ya Mimea" : "Plant Encyclopedia"}</Link></li>
              <li><Link to="/video-library" className="text-emerald-200/60 hover:text-white transition-colors">{isSwahili ? "Mafunzo ya Video" : "Landscaping Tutorials"}</Link></li>
              <li><Link to="/specialist-chat" className="text-emerald-200/60 hover:text-white transition-colors">{isSwahili ? "Ongea na Mtaalamu" : "Expert Chat"}</Link></li>
              <li><Link to="/community-forum" className="text-emerald-200/60 hover:text-white transition-colors">{isSwahili ? "Jukwaa la Jamii" : "Community Forum"}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-emerald-400">{isSwahili ? "Kampuni" : "Company"}</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-emerald-200/60 hover:text-white transition-colors">{isSwahili ? "Kuhusu Sisi" : "About Us"}</Link></li>
              <li><Link to="/subscription" className="text-emerald-200/60 hover:text-white transition-colors">{isSwahili ? "Bei" : "Pricing"}</Link></li>
              <li><a href="#" className="text-emerald-200/60 hover:text-white transition-colors">{isSwahili ? "Kazi" : "Careers"}</a></li>
              <li><a href="#" className="text-emerald-200/60 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-emerald-200/60 hover:text-white transition-colors">{isSwahili ? "Wasiliana Nasi" : "Contact Us"}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-emerald-400">{isSwahili ? "Kisheria" : "Legal"}</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-emerald-200/60 hover:text-white transition-colors">{isSwahili ? "Masharti ya Huduma" : "Terms of Service"}</a></li>
              <li><a href="#" className="text-emerald-200/60 hover:text-white transition-colors">{isSwahili ? "Sera ya Faragha" : "Privacy Policy"}</a></li>
              <li><a href="#" className="text-emerald-200/60 hover:text-white transition-colors">{isSwahili ? "Ulinzi wa Data" : "Data Protection"}</a></li>
            </ul>
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <h4 className="font-semibold mb-3 text-xs uppercase tracking-widest text-emerald-500">{isSwahili ? "Njia za Malipo" : "Payment Methods"}</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/10 text-white px-3 py-1 rounded-lg text-[10px] font-bold border border-white/10 tracking-widest">M-PESA</span>
                <span className="bg-white/10 text-white px-3 py-1 rounded-lg text-[10px] font-bold border border-white/10 tracking-widest">VISA</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-emerald-900/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-emerald-500 text-sm font-medium">
            © {new Date().getFullYear()} Hedges Care. {isSwahili ? "Haki zote zimehifadhiwa." : "All rights reserved."}
          </p>
          <div className="flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-inner">
            <span className="text-emerald-300 text-xs font-bold tracking-tighter">MADE BY PHR3EDEVELOPERS</span>
            <img src="https://flagcdn.com/w40/ke.png" alt="Kenya Flag" className="ml-3 h-4 rounded-sm shadow-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
