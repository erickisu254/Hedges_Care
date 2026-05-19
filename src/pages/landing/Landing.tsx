import React, { useState, useEffect, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { MessageSquare, ArrowRight, Search, User, MapPin, ExternalLink, ChevronRight, Languages } from "lucide-react";
import { CommunityImpact } from "@/components/analytics/CommunityImpact";
import { useRegion } from "@/contexts/RegionContext";
import { RegionSelector } from "@/components/layout/RegionSelector";
import { useLanguage } from "@/contexts/LanguageContext";

/* ─── Types ─── */
interface TokenMap {
  cream: string;
  darkGreen: string;
  forestGreen: string;
  accent: string;
  gold: string;
  white: string;
  muted: string;
  glass: string;
  glassBorder: string;
}

interface SlideItem {
  label: string;
  desc: string;
}

interface StatItem {
  stat: string;
  label: string;
}

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  link: string;
}

interface WorkflowStep {
  num: string;
  emoji: string;
  title: string;
  desc: string;
}

interface Feature {
  emoji: string;
  title: string;
  desc: string;
  link?: string;
}

interface Expert {
  initials: string;
  name: string;
  role: string;
  online: boolean;
}

interface Testimonial {
  init: string;
  name: string;
  role: string;
  quote: string;
}

interface FooterColumn {
  title: string;
  links: { label: string; to: string }[];
}

interface ExpertSectionProps {
  user: unknown;
}

/* ─── Design Tokens ─── */
const T: TokenMap = {
  cream:    "#F5F2EC",
  darkGreen:"#1A2A1A",
  forestGreen:"#2D4A2D",
  accent:   "#4A7C59",
  gold:     "#C8A96E",
  white:    "#FFFFFF",
  muted:    "#8A8A7A",
  glass:    "rgba(255,255,255,0.12)",
  glassBorder: "rgba(255,255,255,0.2)",
};

/* ─── Navbar ─── */
const Navbar: FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Helper function for hover styles
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = T.white;
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "rgba(255,255,255,0.75)";
  };

  const navLinks = [
    { label: isSwahili ? "KUHUSU" : "ABOUT", to: "/about" },
    { label: isSwahili ? "HUDUMA" : "SERVICES", to: "/plant-store" },
    { label: isSwahili ? "MIRADI" : "PROJECTS", to: "/drone-analysis" },
    { label: isSwahili ? "WASILIANA" : "CONTACT", to: "/community-forum" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 48px",
      background: scrolled ? "rgba(26,42,26,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      transition: "background 0.4s ease",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: `linear-gradient(135deg, ${T.accent}, ${T.gold})`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 14 }}>🌿</span>
        </div>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: T.white, fontSize: 16, letterSpacing: "0.08em", fontWeight: 500,
        }}>hedges care</span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: 40 }}>
        {navLinks.map(link => (
          <Link 
            key={link.label} 
            to={link.to} 
            style={{
              color: "rgba(255,255,255,0.75)", textDecoration: "none",
              fontSize: 12, letterSpacing: "0.18em", fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500, transition: "color 0.2s",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >{link.label}</Link>
        ))}
      </div>

      {/* Icons */}
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <User 
          size={18} 
          color="rgba(255,255,255,0.75)" 
          style={{ cursor: "pointer" }} 
          onClick={() => navigate(user ? "/profile" : "/auth")}
        />
        <Search 
          size={18} 
          color="rgba(255,255,255,0.75)" 
          style={{ cursor: "pointer" }} 
          onClick={() => navigate("/plant-library")}
        />
      </div>
    </nav>
  );
};

/* ─── Hero Section ─── */
const HeroSection: FC = () => {
  const [slide, setSlide] = useState<number>(0);
  const navigate = useNavigate();
  const { t, currentLanguage, setLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  const toggleLanguage = () => {
    setLanguage(isSwahili ? 'en' : 'sw');
  };

  const slides: SlideItem[] = [
    { 
      label: isSwahili ? "Bustani ya Hachioji" : "Hachioji Garden", 
      desc: isSwahili ? "Tunatengeneza Bustani ya Hachioji kama sehemu ya Tume yetu mpya ya Ubunifu wa Mazingira." : "We design Hachioji Garden as part of our new Landscape Design Commission." 
    },
    { 
      label: isSwahili ? "Kijani cha Nairobi" : "Nairobi Greens", 
      desc: isSwahili ? "Ubunifu wa oasis wa mijini unaochanganya mimea ya asili na sanaa ya kisasa ya mazingira." : "Urban oasis design blending native flora with contemporary landscape art." 
    },
    { 
      label: isSwahili ? "Highland Estate" : "Highland Estate", 
      desc: isSwahili ? "Huduma kamili ya mazingira ya shamba katika hekta 40 za ardhi ya nyanda za juu." : "Full-service estate landscaping across 40 acres of premium highland terrain." 
    },
  ];

  // Button hover handlers
  const handleGetStartedEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
  };
  const handleGetStartedLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section style={{
      position: "relative", height: "100vh", minHeight: 640, overflow: "hidden",
      background: T.darkGreen, display: "flex", flexDirection: "column", justifyContent: "flex-end",
    }}>
      {/* Background image placeholder */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(to bottom, rgba(26,42,26,0.3) 0%, rgba(26,42,26,0.15) 40%, rgba(26,42,26,0.65) 100%),
          url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80') center/cover no-repeat
        `,
      }} />

      {/* Language Toggle */}
      <div style={{ position: "absolute", top: 100, left: 48, zIndex: 10 }}>
        <button 
          onClick={toggleLanguage}
          style={{
            background: "rgba(255,255,255,0.15)", color: T.white, border: "1px solid rgba(255,255,255,0.2)",
            padding: "10px 20px", borderRadius: 30, fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", cursor: "pointer",
            backdropFilter: "blur(10px)", display: "flex", alignItems: "center", gap: 8
          }}
        >
          <Languages size={14} />
          {isSwahili ? 'Switch to English' : 'Badilisha kuwa Kiswahili'}
        </button>
      </div>

      {/* Slide counter badge */}
      <div style={{
        position: "absolute", top: 100, right: 48,
        background: T.glass, backdropFilter: "blur(12px)",
        border: `1px solid ${T.glassBorder}`, borderRadius: 16,
        padding: "16px 24px", textAlign: "center", color: T.white,
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>500+</div>
        <div style={{ fontSize: 12, letterSpacing: "0.12em", opacity: 0.75, marginTop: 4 }}>
          {isSwahili ? "Wateja Walioridhika" : "Satisfied Clients"}
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 10 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 24, height: 24, borderRadius: "50%",
              background: i === 0 ? T.accent : "rgba(255,255,255,0.25)",
              border: "2px solid rgba(255,255,255,0.4)",
            }} />
          ))}
        </div>
      </div>

      {/* Hero headline */}
      <div style={{ position: "relative", padding: "0 48px 60px", zIndex: 2 }}>
        <div style={{ 
          display: "inline-flex", alignItems: "center", gap: 8, 
          padding: "8px 16px", borderRadius: 40, background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)", color: T.gold, 
          fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 20
        }}>
          🌍 {t('hero.badge').toUpperCase()}
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(48px, 7vw, 96px)",
          fontWeight: 700, color: T.white, lineHeight: 1.0,
          textTransform: "uppercase", letterSpacing: "-0.01em",
          margin: "0 0 24px 0", maxWidth: 800,
        }}>
          {t('hero.titlePart1')}<br />
          <span style={{ color: T.accent }}>{t('hero.titlePart2')}</span>
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.7)", maxWidth: 460, lineHeight: 1.65,
          fontFamily: "'DM Sans', sans-serif", fontSize: 15, margin: "0 0 36px 0",
        }}>
          {t('hero.description')}
        </p>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button 
            onClick={() => navigate("/scan")}
            style={{
              background: T.white, color: T.darkGreen, border: "none",
              padding: "14px 32px", borderRadius: 4, fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={handleGetStartedEnter}
            onMouseLeave={handleGetStartedLeave}
          >{t('hero.ctaScan')}</button>

          <button 
            onClick={() => navigate("/about")}
            style={{
              background: "transparent", color: T.white,
              border: "1px solid rgba(255,255,255,0.4)",
              padding: "14px 32px", borderRadius: 4, fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500, letterSpacing: "0.06em", cursor: "pointer",
              transition: "border-color 0.2s",
            }}>{t('hero.ctaImpact')}</button>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        padding: "0 48px 32px",
      }}>
        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif", color: T.white,
            fontSize: 16, fontWeight: 600,
          }}>0{slide + 1}</span>
          <div style={{ width: 120, height: 1, background: "rgba(255,255,255,0.25)", position: "relative" }}>
            <div style={{
              position: "absolute", left: 0, top: 0, height: "100%",
              width: `${((slide + 1) / 3) * 100}%`,
              background: T.white, transition: "width 0.5s",
            }} />
          </div>
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 16 }}>03</span>
          <div style={{ display: "flex", gap: 8, marginLeft: 8 }}>
            <button onClick={() => setSlide(s => Math.max(0, s - 1))} style={{
              width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)",
              background: "transparent", color: T.white, cursor: "pointer", fontSize: 14,
            }}>‹</button>
            <button onClick={() => setSlide(s => Math.min(2, s + 1))} style={{
              width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)",
              background: "transparent", color: T.white, cursor: "pointer", fontSize: 14,
            }}>›</button>
          </div>
        </div>

        {/* Location card */}
        <div style={{
          background: T.glass, backdropFilter: "blur(16px)",
          border: `1px solid ${T.glassBorder}`, borderRadius: 12,
          padding: "16px 20px", maxWidth: 300, display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <MapPin size={16} color={T.white} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              color: T.white, fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, fontSize: 14, marginBottom: 4,
            }}>{slides[slide].label}</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, lineHeight: 1.5 }}>
              {slides[slide].desc}
            </div>
          </div>
          <ExternalLink size={14} color="rgba(255,255,255,0.5)" style={{ flexShrink: 0, marginTop: 2 }} />
        </div>

        {/* Services list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { label: "Landscape Design", to: "/drone-analysis" },
            { label: "Plant Health", to: "/scan" },
            { label: "Expert Chat", to: "/specialist-chat" }
          ].map((svc, i) => (
            <div 
              key={svc.label} 
              onClick={() => navigate(svc.to)}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.15)",
                gap: 64, cursor: "pointer",
              }}>
              <span style={{
                color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, letterSpacing: "0.06em",
              }}>{svc.label}</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Global Impact Counter ─── */
const GlobalImpactSection: FC = () => {
  const [count, setCount] = useState<number>(12450);
  const { currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ 
      background: T.darkGreen, 
      padding: "60px 48px", 
      borderBottom: `1px solid ${T.glassBorder}` 
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: "0 auto", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        flexWrap: "wrap",
        gap: 32
      }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h3 style={{ 
            color: T.gold, 
            fontFamily: "'Playfair Display', serif", 
            fontSize: 24, 
            marginBottom: 8 
          }}>{isSwahili ? "Matokeo kwa Jamii" : "Community Impact"}</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
            {isSwahili 
              ? "Jiunge na jamii yetu ya wasimamizi wa mazingira wanaofuatilia ufyonzwaji wa kaboni wa muda halisi kote Kenya."
              : "Join our community of environmental stewards tracking real-time carbon sequestration across Kenya."}
          </p>
        </div>
        
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              color: T.white, 
              fontSize: 36, 
              fontWeight: 700, 
              fontFamily: "'DM Sans', sans-serif" 
            }}>{count.toLocaleString()} kg</div>
            <div style={{ color: T.gold, fontSize: 12, letterSpacing: "0.1em", marginTop: 4 }}>
              {isSwahili ? "JUMLA YA CO2 ILIYOFYONZWA" : "TOTAL CO2 SEQUESTERED"}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              color: T.white, 
              fontSize: 36, 
              fontWeight: 700, 
              fontFamily: "'DM Sans', sans-serif" 
            }}>1,842</div>
            <div style={{ color: T.gold, fontSize: 12, letterSpacing: "0.1em", marginTop: 4 }}>
              {isSwahili ? "MITI INAYOFUATILIWA" : "TREES MONITORED"}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              color: T.white, 
              fontSize: 36, 
              fontWeight: 700, 
              fontFamily: "'DM Sans', sans-serif" 
            }}>KSh 45.2k</div>
            <div style={{ color: T.gold, fontSize: 12, letterSpacing: "0.1em", marginTop: 4 }}>
              {isSwahili ? "MIFUKO YA JAMII YA M-PESA" : "M-PESA COMMUNITY FUNDS"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Values / "We Are Different" Section ─── */
const ValuesSection: FC = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, enter: boolean) => {
    if (enter) {
      e.currentTarget.style.paddingLeft = "12px";
    } else {
      e.currentTarget.style.paddingLeft = "0px";
    }
  };

  const stats = [
    { stat: "500+", label: isSwahili ? "Aina za Mimea" : "Plant Species" },
    { stat: "98%", label: isSwahili ? "Kuridhika kwa Wateja" : "Client Satisfaction" },
    { stat: "24/7", label: isSwahili ? "Msaada wa Kitaalamu" : "Expert Support" },
    { stat: "10K+", label: isSwahili ? "Miradi Iliyokamilika" : "Projects Delivered" },
  ];

  const services = [
    { num: "01", title: isSwahili ? "Ubunifu wa Mazingira" : "Landscape Design", desc: isSwahili ? "Mapendekezo ya mpangilio yaliyochambuliwa na AI, upandaji na upangaji wa msimu." : "AI-analysed layout recommendations, plant placement and seasonal planning.", link: "/drone-analysis" },
    { num: "02", title: isSwahili ? "Ufuatiliaji wa Afya" : "Plant Health Monitoring", desc: isSwahili ? "Ugunduzi wa mapema wa magonjwa, ufuatiliaji wa virutubisho na tahadhari za mazingira." : "Early disease detection, nutrient tracking and environmental stress alerts.", link: "/scan" },
    { num: "03", title: isSwahili ? "Umwagiliaji Mahiri" : "Smart Irrigation", desc: isSwahili ? "Ratiba zilizoboreshwa za maji zinazoendeshwa na data ya muda halisi ya udongo na hali ya hewa." : "Water-optimised schedules powered by real-time soil and weather data.", link: "/drone-analysis" },
    { num: "04", title: isSwahili ? "Ushauri wa Kitaalamu" : "Expert Consultation", desc: isSwahili ? "Vikao vya moja kwa moja na wabunifu wa mazingira na wataalamu wa mimea walioidhinishwa." : "Live sessions with certified landscape designers and horticulturists.", link: "/specialist-chat" },
  ];

  return (
    <section style={{ background: T.cream, padding: "100px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.25em",
          color: T.muted, marginBottom: 60, display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ color: T.muted }}>[ {isSwahili ? "THAMANI" : "VALUES"} ]</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 700,
              color: T.darkGreen, lineHeight: 1.1, textTransform: "uppercase",
              letterSpacing: "-0.01em", margin: "0 0 32px 0",
            }}>
              {isSwahili ? "Tuko" : "We Are"}<br /><em style={{ fontStyle: "italic", color: T.accent }}>{isSwahili ? "Tofauti" : "Different"}</em>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8,
              color: "#4A4A3A", maxWidth: 420, margin: "0 0 40px 0",
            }}>
              {isSwahili 
                ? "Mfumo wetu unaunganisha utambuzi wa mimea unaoendeshwa na AI na usanii wa mazingira — ukileta uzuri, afya, na uendelevu katika kila eneo la nje tunalogusa."
                : "Our platform fuses AI-powered plant diagnostics with hands-on landscape artistry — delivering beauty, health, and sustainability in every outdoor space we touch."}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {stats.map(({ stat, label }) => (
                <div key={stat}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif", fontSize: 40,
                    fontWeight: 700, color: T.darkGreen, lineHeight: 1,
                  }}>{stat}</div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                    letterSpacing: "0.1em", color: T.muted, marginTop: 6,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {services.map(({ num, title, desc, link }) => (
              <div 
                key={num} 
                onClick={() => navigate(link)}
                style={{
                  display: "flex", gap: 24, padding: "24px 0",
                  borderBottom: `1px solid rgba(26,42,26,0.1)`,
                  cursor: "pointer", transition: "padding-left 0.2s",
                }}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <span style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 12,
                  color: T.accent, fontWeight: 600, paddingTop: 4, minWidth: 24,
                }}>{num}</span>
                <div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                    color: T.darkGreen, fontSize: 15, marginBottom: 6, letterSpacing: "0.02em",
                  }}>{title}</div>
                  <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>{desc}</div>
                </div>
                <ChevronRight size={16} color={T.muted} style={{ marginLeft: "auto", marginTop: 4, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Features Grid ─── */
const FeaturesSection: FC = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  const features: Feature[] = [
    { emoji: "🏡", title: isSwahili ? "Uchambuzi wa Ubunifu wa Mazingira" : "Landscape Design Analysis", desc: isSwahili ? "AI inachambua mazingira yako yote — mpangilio wa mimea, ishara za afya, na maboresho ya urembo." : "AI analyses your entire landscape — plant placement, health signals, and aesthetic improvements for optimal outdoor living.", link: "/drone-analysis" },
    { emoji: "🌿", title: isSwahili ? "Ufuatiliaji wa Afya ya Mimea" : "Plant Health Monitoring", desc: isSwahili ? "Ufuatiliaji kamili unaogundua ishara za mapema za magonjwa na virutubisho." : "Comprehensive monitoring detecting early signs of disease, nutrient deficiencies, and environmental stressors.", link: "/scan" },
    { emoji: "🛡️", title: isSwahili ? "Mipango ya Ulinzi wa Mazingira" : "Landscape Protection Plans", desc: isSwahili ? "Udhibiti wa wadudu uliolengwa, kuzuia magonjwa, na utunzaji wa msimu uliotengenezwa kwa ajili yako." : "Customised pest management, disease prevention, and seasonal care tailored to your climate and plant varieties.", link: "/plant-timeline" },
    { emoji: "⚡", title: isSwahili ? "Udhibiti wa Umwagiliaji Mahiri" : "Smart Irrigation Management", desc: isSwahili ? "Upangaji wa maji unaoendeshwa na AI unaopunguza upotevu huku ukihakikisha kila mmea unapata maji." : "AI-powered water scheduling that reduces waste while ensuring every plant receives precisely the hydration it needs.", link: "/drone-analysis" },
    { emoji: "📊", title: isSwahili ? "Uchambuzi wa Utendaji" : "Performance Analytics", desc: isSwahili ? "Fuatilia vipimo vya afya, ukuaji, na urembo kwa muda na mapendekezo ya msimu." : "Track health, growth, and beauty metrics over time with seasonal recommendations and performance insights.", link: "/profile" },
    { emoji: "🌍", title: isSwahili ? "Msingi wa Maarifa ya Kitaalamu" : "Expert Knowledge Base", desc: isSwahili ? "Fikia database kubwa ya miongozo ya uteuzi wa mimea, ratiba za matengenezo, na mazoea endelevu." : "Access an extensive database of plant selection guides, maintenance schedules, and sustainable practices from industry pros.", link: "/plant-library" },
  ];

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, enter: boolean) => {
    if (enter) {
      e.currentTarget.style.background = T.darkGreen;
      const children = e.currentTarget.querySelectorAll("*");
      children.forEach((el: Element) => {
        (el as HTMLElement).style.color = T.white;
      });
    } else {
      const index = Array.from(e.currentTarget.parentElement?.children || []).indexOf(e.currentTarget);
      e.currentTarget.style.background = index % 2 === 0 ? "#FAFAF7" : T.white;
      const children = e.currentTarget.querySelectorAll("*");
      children.forEach((el: Element) => {
        (el as HTMLElement).style.color = "";
      });
    }
  };

  return (
    <section style={{ background: T.white, padding: "100px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 64, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{
              fontSize: 11, letterSpacing: "0.25em", color: T.muted,
              fontFamily: "'DM Sans', sans-serif", marginBottom: 16,
            }}>[ {isSwahili ? "UWEZO" : "CAPABILITIES"} ]</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 700, color: T.darkGreen, textTransform: "uppercase", margin: 0,
            }}>
              {isSwahili ? "Suluhu Kamili za" : "Complete"}<br />
              <em style={{ fontStyle: "italic", color: T.accent }}>{isSwahili ? "Maeneo ya Nje" : "Landscape Solutions"}</em>
            </h2>
          </div>
          <p style={{
            maxWidth: 360, fontSize: 14, lineHeight: 1.75, color: T.muted,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {t('features.description')}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {features.map(({ emoji, title, desc, link }, i) => (
            <div 
              key={title} 
              onClick={() => link && navigate(link)}
              style={{
                padding: "40px 36px",
                background: i % 2 === 0 ? "#FAFAF7" : T.white,
                border: "1px solid rgba(26,42,26,0.07)",
                cursor: "pointer", transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div style={{ fontSize: 32, marginBottom: 20 }}>{emoji}</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700,
                color: T.darkGreen, marginBottom: 12, lineHeight: 1.3,
              }}>{title}</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.75, color: T.muted,
              }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── AI Workflow ─── */
const WorkflowSection: FC = () => {
  const { t } = useLanguage();
  return (
    <section style={{ background: T.cream, padding: "100px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", color: T.muted, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>
            [ {t('workflow.tag')} ]
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3vw, 44px)",
            fontWeight: 700, color: T.darkGreen, textTransform: "uppercase", margin: "0 0 20px",
          }}>{t('workflow.title')}</h2>
          <p style={{ fontSize: 15, color: T.muted, maxWidth: 560, margin: "0 auto", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75 }}>
            {t('workflow.description')}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {([
            { num: "01", emoji: "📸", title: t('workflow.step1Title'), desc: t('workflow.step1Desc') },
            { num: "02", emoji: "🔄", title: t('workflow.step2Title'), desc: t('workflow.step2Desc') },
            { num: "03", emoji: "🔬", title: t('workflow.step3Title'), desc: t('workflow.step3Desc') },
            { num: "04", emoji: "✅", title: t('workflow.step4Title'), desc: t('workflow.step4Desc') },
          ] as WorkflowStep[]).map(({ num, emoji, title, desc }, i) => (
            <div key={num} style={{
              padding: "40px 32px",
              borderRight: i < 3 ? "1px solid rgba(26,42,26,0.1)" : "none",
              position: "relative",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700,
                color: "rgba(26,42,26,0.08)", lineHeight: 1, marginBottom: 24,
              }}>{num}</div>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{emoji}</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17,
                color: T.darkGreen, marginBottom: 12,
              }}>{title}</h3>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Expert Chat ─── */
const ExpertSection: FC<ExpertSectionProps> = ({ user }) => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, enter: boolean) => {
    e.currentTarget.style.background = enter ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)";
  };

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    if (enter) {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.4)";
    } else {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = "none";
    }
  };

  return (
    <section style={{ background: T.darkGreen, padding: "100px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ gridTemplateColumns: "1fr 1fr", display: "grid", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.25em", color: T.gold, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>
              [ {isSwahili ? "WATAALAMU WA KITAALAMU" : "PROFESSIONAL EXPERTS"} ]
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 700, color: T.white, textTransform: "uppercase", margin: "0 0 24px",
            }}>
              {isSwahili ? "Wasiliana na" : "Connect With"}<br />
              <em style={{ fontStyle: "italic", color: T.gold }}>{isSwahili ? "Wataalamu" : "Specialists"}</em>
            </h2>
            <p style={{
              fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.8,
              fontFamily: "'DM Sans', sans-serif", marginBottom: 40,
            }}>
              {isSwahili 
                ? "Pata mwongozo uliolengwa kutoka kwa wabunifu wa mazingira walioidhinishwa, wataalamu wa mimea, na wataalamu wa maisha ya nje."
                : "Get personalised guidance from certified landscape designers, horticulturists, and outdoor living experts ready to transform your property."}
            </p>
            <Link 
              to={user ? "/specialist-chat" : "/auth"} 
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: T.white, color: T.darkGreen, textDecoration: "none",
                padding: "16px 36px", borderRadius: 4,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
            >
              <MessageSquare size={16} />
              {isSwahili ? "Anza Ushauri" : "Start Consultation"}
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {([
              { initials: "DR", name: "Dr. Maria Rodriguez", role: isSwahili ? "Mtaalamu wa Magonjwa" : "Landscape Pathologist", online: true },
              { initials: "JT", name: "John Thompson", role: isSwahili ? "Mbunifu Endelevu" : "Sustainable Designer", online: false },
              { initials: "SC", name: "Dr. Sarah Chen", role: isSwahili ? "Mtaalamu wa Mimea" : "Landscape Horticulturist", online: true },
            ] as Expert[]).map(({ initials, name, role, online }) => (
              <div 
                key={name} 
                onClick={() => navigate(user ? "/specialist-chat" : "/auth")}
                style={{
                  display: "flex", alignItems: "center", gap: 20,
                  padding: "20px 24px",
                  background: "rgba(255,255,255,0.05)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  transition: "background 0.2s", cursor: "pointer",
                }}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${T.accent}, ${T.forestGreen})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.white, fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                }}>{initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: T.white, fontWeight: 600, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{name}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>{role}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: online ? "#4ade80" : T.gold }} />
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{online ? (isSwahili ? "Yupo" : "Online") : (isSwahili ? "Ana Kazi" : "Busy")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── CTA ─── */
const CtaSection: FC = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';
  
  return (
    <section style={{
      background: `linear-gradient(135deg, ${T.forestGreen} 0%, ${T.darkGreen} 100%)`,
      padding: "100px 48px", textAlign: "center",
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.25em", color: T.gold, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>
          [ {t('cta.tag')} ]
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 56px)",
          fontWeight: 700, color: T.white, textTransform: "uppercase", margin: "0 0 24px",
        }}>{t('cta.title')}</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 48, fontFamily: "'DM Sans', sans-serif" }}>
          {t('cta.description')}
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button 
            onClick={() => navigate("/scan")}
            style={{
              background: T.white, color: T.darkGreen, border: "none",
              padding: "16px 40px", borderRadius: 4, fontWeight: 600, fontSize: 13,
              letterSpacing: "0.06em", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>{t('cta.btnScan')} ⚡</button>
          <button 
            onClick={() => navigate("/plant-store")}
            style={{
              background: "transparent", color: T.white, border: "1px solid rgba(255,255,255,0.35)",
              padding: "16px 40px", borderRadius: 4, fontWeight: 500, fontSize: 13,
              letterSpacing: "0.06em", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>{isSwahili ? "Huduma za Mazingira" : "Landscaping Services"}</button>
        </div>
        <p style={{ marginTop: 24, color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}>
          {isSwahili 
            ? "🌟 Uchambuzi wa bure wa mazingira • 🏡 Ushauri wa muundo • 🌿 Ufuatiliaji wa afya ya mimea"
            : "🌟 Free landscape analysis • 🏡 Design consultation • 🌿 Plant health monitoring"}
        </p>
      </div>
    </section>
  );
};

/* ─── Testimonials ─── */
const TestimonialsSection: FC = () => {
  const { currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  const testimonials = [
    { init: "A", name: "Ann Njeru 👨‍🌾", role: isSwahili ? "Mkulima Mdogo" : "Small-scale Farmer", quote: isSwahili ? "Hedges Care imebadilisha jinsi ninavyosimamia shamba langu. Kutambua magonjwa mapema kumeniokoa maelfu ya hasara za mazao. Naipendekeza sana! 🌱" : "Hedges Care has transformed how I manage my farm. Identifying diseases early has saved me thousands in potential crop losses. Highly recommend! 🌱" },
    { init: "S", name: "Stephen Ndwiga 👩‍🌾", role: isSwahili ? "Mkulima wa Mijini" : "Urban Gardener", quote: isSwahili ? "Kama mpenzi wa bustani, nilikuwa nikihangaika na magonjwa ya mimea. Hedges Care inafanya iwe rahisi kutambua na kutibu matatizo! Bustani yangu haijawahi kuonekana vizuri hivi. 🌿" : "As a hobby gardener, I was always struggling with plant diseases. Hedges Care makes it so easy to identify and treat problems! My garden has never looked better. 🌿" },
    { init: "W", name: "Wilson Omondi 🧑‍🌾", role: isSwahili ? "Mzalishaji wa Biashara" : "Commercial Grower", quote: isSwahili ? "Programu hii imekuwa chombo muhimu kwa shughuli zetu za shamba. Utambuzi wa papo hapo unatusaidia kuchukua hatua haraka na kulinda mavuno yetu. Inastahili kila senti! 💯" : "This app has become an essential tool for our farm operations. The instant diagnosis helps us take action quickly and protect our yields. Worth every penny! 💯" },
  ];

  return (
    <section style={{ background: T.cream, padding: "100px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", color: T.muted, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>
            [ {isSwahili ? "USHUHUDA" : "TESTIMONIALS"} ]
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3vw, 44px)",
            fontWeight: 700, color: T.darkGreen, textTransform: "uppercase", margin: 0,
          }}>{isSwahili ? "Watumiaji Wetu Wanasema Nini 🌟" : "What Our Users Say 🌟"}</h2>
          <p style={{ marginTop: 16, color: T.muted, fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
            {isSwahili 
              ? "Maelfu ya wakulima na wapenzi wa bustani wanaamini Hedges Care kulinda mimea yao."
              : "Thousands of farmers and gardeners trust Hedges Care to protect their plants."}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {testimonials.map(({ init, name, role, quote }) => (
            <div key={name} style={{
              background: T.white, padding: "40px 36px",
              border: "1px solid rgba(26,42,26,0.07)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${T.accent}, ${T.forestGreen})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.white, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                }}>{init}</div>
                <div>
                  <div style={{ fontWeight: 600, color: T.darkGreen, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{name}</div>
                  <div style={{ fontSize: 12, color: T.muted }}>{role}</div>
                </div>
              </div>
              <div style={{ width: 24, height: 2, background: T.accent, marginBottom: 20 }} />
              <p style={{ fontSize: 14, color: "#4A4A3A", lineHeight: 1.75, fontStyle: "italic", fontFamily: "'DM Sans', sans-serif" }}>
                "{quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Footer ─── */
const FooterSection: FC = () => {
  const { currentLanguage } = useLanguage();
  const isSwahili = currentLanguage.code === 'sw';

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    e.currentTarget.style.color = enter ? T.white : "rgba(255,255,255,0.5)";
  };

  const footerCols: FooterColumn[] = [
    { title: isSwahili ? "Vipengele" : "Features", links: [
      { label: isSwahili ? "Uchambuzi wa AI" : "AI Plant Detection", to: "/scan" },
      { label: isSwahili ? "Maktaba ya Mimea" : "Plant Encyclopedia", to: "/plant-library" },
      { label: isSwahili ? "Mafunzo ya Video" : "Tutorial Videos", to: "/video-library" },
      { label: isSwahili ? "Ongea na Mtaalamu" : "Expert Chat", to: "/specialist-chat" },
      { label: isSwahili ? "Jukwaa la Jamii" : "Community Forum", to: "/community-forum" }
    ]},
    { title: isSwahili ? "Kampuni" : "Company", links: [
      { label: isSwahili ? "Kuhusu Sisi" : "About Us", to: "/about" },
      { label: isSwahili ? "Bei" : "Pricing", to: "/subscription" },
      { label: isSwahili ? "Uchambuzi wa Drone" : "Drone Analysis", to: "/drone-analysis" },
      { label: isSwahili ? "Ushirikiano" : "Partnerships", to: "/partnerships" },
      { label: isSwahili ? "Wasiliana Nasi" : "Contact Us", to: "/community-forum" }
    ]},
    { title: isSwahili ? "Kisheria" : "Legal", links: [
      { label: isSwahili ? "Masharti ya Huduma" : "Terms of Service", to: "#" },
      { label: isSwahili ? "Sera ya Faragha" : "Privacy Policy", to: "#" },
      { label: isSwahili ? "Sera ya Cookie" : "Cookie Policy", to: "#" },
      { label: isSwahili ? "Ulinzi wa Data" : "Data Protection", to: "#" }
    ]},
  ];

  return (
    <footer style={{ background: T.darkGreen, padding: "80px 48px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 60 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: 20 }}>🌿</span>
              <span style={{ fontFamily: "'Playfair Display', serif", color: T.white, fontSize: 18, fontWeight: 600 }}>
                Hedges Care AI
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.75, maxWidth: 260, fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>
              {isSwahili 
                ? "Kubadilisha maeneo ya nje na ndani kwa kutumia utambuzi wa mimea unaoendeshwa na AI na ushauri wa kitaalamu."
                : "Revolutionizing outdoor & indoor spaces with AI-powered plant detection and expert landscaping advice."}
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              {["f", "𝕏", "ig"].map(s => (
                <div key={s} style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer",
                  transition: "border-color 0.2s",
                }}>{s}</div>
              ))}
            </div>
          </div>

          {footerCols.map(({ title, links }) => (
            <div key={title}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: T.white,
                fontSize: 12, letterSpacing: "0.15em", marginBottom: 24,
              }}>{title.toUpperCase()}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map(l => (
                  <Link 
                    key={l.label} 
                    to={l.to} 
                    style={{
                      color: "rgba(255,255,255,0.5)", textDecoration: "none",
                      fontSize: 13, fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                  >{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
            © {new Date().getFullYear()} Hedges Care. {isSwahili ? "Haki zote zimehifadhiwa." : "All rights reserved."}
          </span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {["M-Pesa", "Visa", "MasterCard"].map(pm => (
              <div key={pm} style={{
                border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4,
                padding: "4px 10px", color: "rgba(255,255,255,0.6)",
                fontSize: 11, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em",
              }}>{pm}</div>
            ))}
          </div>
          <span style={{ color: T.gold, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
            {isSwahili ? "Imetengenezwa na" : "Made by"} Phr3edevelopers 🇰🇪
          </span>
        </div>
      </div>
    </footer>
  );
};

/* ─── Root ─── */
const Landing: FC = () => {
  const { user } = useAuth();
  const { currentRegion } = useRegion();
  const { t } = useLanguage();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <HeroSection />
      
      {/* Dynamic Community Impact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-2">
              {t('impact.title')}<span className="text-emerald-600">{currentRegion.name}</span>
            </h2>
            <p className="text-gray-600 max-w-lg">
              {t('impact.description')}
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-semibold text-emerald-700 tracking-widest uppercase">{t('impact.selectorTag')}</span>
            <RegionSelector />
          </div>
        </div>
        
        <CommunityImpact />
        
        <div className="mt-8 text-center">
          <Link 
            to="/pest-prediction" 
            className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors group"
          >
            {t('impact.linkDetail')}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <GlobalImpactSection />
      <ValuesSection />
      <FeaturesSection />
      <WorkflowSection />
      <ExpertSection user={user} />
      <CtaSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
};

export default Landing;
