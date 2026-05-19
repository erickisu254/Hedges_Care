
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import UserMenu from "./UserMenu";
import NavItems from "./NavItems";
import LanguageSelector from '../language/LanguageSelector';

interface NavigationProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void; // Updated to accept a string parameter
}

const Navigation = ({ activeTab = "", setActiveTab = () => {} }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { t, currentLanguage } = useLanguage();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Close mobile menu when navigating
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-emerald-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className="relative">
                  <span className="text-3xl animate-float">🌿</span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="font-bold gradient-text text-lg hidden md:block">Hedges Care</span>
                  <span className="text-xs text-emerald-600 hidden md:block block">
                    {currentLanguage.code === 'sw' ? 'Akili ya Mimea Inayotumia NFT' : 'NFT-Powered Plant Intelligence'}
                  </span>
                </div>
              </Link>
              
              {/* Display premium badge if user has premium subscription */}
              {user && (
                <div className="ml-3 flex items-center space-x-1">
                  <div className="px-2.5 py-1 text-xs bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full flex items-center space-x-1 animate-pulse">
                    <span className="w-1 h-1 bg-white rounded-full"></span>
                    <span className="font-medium">PREMIUM</span>
                    <span className="w-1 h-1 bg-white rounded-full"></span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center">
            <NavItems activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
            {user ? (
              <>
                <Link to="/subscription">
                  <Button variant="outline" size="sm" className="premium-border-gold text-amber-700 hover:bg-amber-50 transition-all duration-300">
                    <span className="flex items-center space-x-1">
                      <span>⭐</span>
                      <span>{currentLanguage.code === 'sw' ? 'Boresha' : 'Upgrade'}</span>
                    </span>
                  </Button>
                </Link>
                <UserMenu />
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300">
                  <Link to="/auth?mode=signin" className="flex items-center space-x-2">
                    <span>🔐</span>
                    <span>{currentLanguage.code === 'sw' ? 'Ingia' : 'Log in'}</span>
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <Link to="/auth?mode=signup" className="flex items-center space-x-2">
                    <span>🚀</span>
                    <span>{currentLanguage.code === 'sw' ? 'Jisajili' : 'Sign up'}</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-all duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ?
                <X className="block h-6 w-6 text-emerald-600" /> :
                <Menu className="block h-6 w-6 text-emerald-600" />
              }
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg">
          <NavItems activeTab={activeTab} setActiveTab={setActiveTab} isMobile={true} closeMenu={() => setIsOpen(false)} />
        </div>
        {/* Mobile auth buttons */}
        <div className="pt-4 pb-3 border-t border-emerald-200/50 bg-white/95 backdrop-blur-lg">
          <div className="flex items-center justify-between px-4">
            {user ? (
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full border-2 border-emerald-200"
                      src={(user as any).user_metadata?.avatar_url || "/placeholder.svg"}
                      alt="User avatar"
                    />
                  </div>
                  <div className="ml-3 text-left">
                    <div className="text-base font-medium gradient-text">
                      {(user as any).user_metadata?.full_name || "User"}
                    </div>
                    <div className="text-sm text-emerald-600 font-medium">
                      {user.email}
                    </div>
                  </div>
                </div>
                <Link to="/subscription">
                  <Button variant="outline" size="sm" className="premium-border-gold text-amber-700 hover:bg-amber-50 transition-all duration-300">
                    <span className="flex items-center space-x-1">
                      <span>⭐</span>
                      <span>{currentLanguage.code === 'sw' ? 'Boresha' : 'Upgrade'}</span>
                    </span>
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex w-full gap-2">
                <Button asChild variant="outline" className="flex-1 premium-border text-emerald-700 hover:bg-emerald-50 transition-all duration-300">
                  <Link to="/auth?mode=signin" className="flex items-center justify-center space-x-2">
                    <span>🔐</span>
                    <span>{currentLanguage.code === 'sw' ? 'Ingia' : 'Log in'}</span>
                  </Link>
                </Button>
                <Button asChild className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <Link to="/auth?mode=signup" className="flex items-center justify-center space-x-2">
                    <span>🚀</span>
                    <span>{currentLanguage.code === 'sw' ? 'Jisajili' : 'Sign up'}</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
          {user && (
            <div className="mt-3 space-y-1 px-2">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-emerald-700 hover:bg-emerald-50 transition-all duration-300"
              >
                <span className="flex items-center space-x-2">
                  <span>👤</span>
                  <span>{currentLanguage.code === 'sw' ? 'Wasifu Wako' : 'Your Profile'}</span>
                </span>
              </Link>
              <Link
                to="/history"
                className="block px-3 py-2 rounded-md text-base font-medium text-emerald-700 hover:bg-emerald-50 transition-all duration-300"
              >
                <span className="flex items-center space-x-2">
                  <span>📊</span>
                  <span>{currentLanguage.code === 'sw' ? 'Historia ya Scan' : 'Scan History'}</span>
                </span>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 text-base font-medium text-emerald-700 hover:bg-emerald-50 rounded-md transition-all duration-300"
                // onClick={signOut}
              >
                <span className="flex items-center space-x-2">
                  <span>🚪</span>
                  <span>{currentLanguage.code === 'sw' ? 'Ondoka' : 'Sign out'}</span>
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
