import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home, Bell } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Route Insight: User accessing developing feature:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-emerald-950">
      {/* Hero-style background (reusing the theme from Landing) */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(20%)'
        }}
      />
      
      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-900/60 to-emerald-950/90" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-100 font-medium text-sm mb-8 animate-pulse">
          <span className="text-lg">🏗️</span>
          <span>Harambee Innovation Lab: Feature in Development</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Nurturing This <span className="text-emerald-400">Innovation</span> 🌿
        </h1>

        <p className="text-xl md:text-2xl text-emerald-100/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          The <span className="font-mono text-emerald-300">"{location.pathname}"</span> feature is currently being cultivated by our data scientists to better serve the community.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            asChild
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-xl text-lg shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Link to="/">
              <Home className="h-5 w-5" />
              Return to Shamba
            </Link>
          </Button>
          
          <Button
            variant="outline"
            className="border-white/20 text-white bg-white/5 hover:bg-white/10 px-8 py-6 rounded-xl text-lg backdrop-blur-md transition-all duration-300 hover:scale-105 flex items-center gap-2"
            onClick={() => alert("We will notify you once this community feature is live!")}
          >
            <Bell className="h-5 w-5" />
            Notify Me
          </Button>
        </div>

        {/* Development Roadmap */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <h4 className="text-emerald-400 font-bold mb-2">Phase 1: Analysis</h4>
            <p className="text-xs text-emerald-100/60 leading-relaxed">Refining CNN models for higher accuracy in regional plant disease detection.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <h4 className="text-emerald-400 font-bold mb-2">Phase 2: Prediction</h4>
            <p className="text-xs text-emerald-100/60 leading-relaxed">Integrating satellite and weather data for real-time pest outbreak forecasting.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <h4 className="text-emerald-400 font-bold mb-2">Phase 3: Inclusion</h4>
            <p className="text-xs text-emerald-100/60 leading-relaxed">Expanding M-Pesa micro-grant systems to support local community restoration.</p>
          </div>
        </div>

        {/* Community Context Note */}
        <div className="mt-16 pt-8 border-t border-white/10 max-w-lg mx-auto">
          <p className="text-sm text-emerald-200/60 italic">
            "By building together (Harambee), we ensure every data-driven tool meets the unique needs of our local community."
          </p>
        </div>
      </div>

      {/* Floating Elements for visual interest */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 animate-bounce">🌳</div>
      <div className="absolute bottom-20 right-10 text-5xl opacity-10 animate-pulse delay-700">🌲</div>
      <div className="absolute bottom-10 left-1/4 text-4xl opacity-10 animate-bounce delay-500">🌿</div>
    </div>
  );
};

export default NotFound;
