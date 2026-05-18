import React, { useState, useEffect, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { MessageSquare, ArrowRight, Search, User, MapPin, ExternalLink, ChevronRight } from "lucide-react";

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
    { label: "ABOUT", to: "/about" },
    { label: "SERVICES", to: "/plant-store" },
    { label: "PROJECTS", to: "/drone-analysis" },
    { label: "CONTACT", to: "/community-forum" },
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
  const slides: SlideItem[] = [
    { label: "Hachioji Garden", desc: "We design Hachioji Garden as part of our new Landscape Design Commission." },
    { label: "Nairobi Greens", desc: "Urban oasis design blending native flora with contemporary landscape art." },
    { label: "Highland Estate", desc: "Full-service estate landscaping across 40 acres of premium highland terrain." },
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

      {/* Slide counter badge */}
      <div style={{
        position: "absolute", top: 100, right: 48,
        background: T.glass, backdropFilter: "blur(12px)",
        border: `1px solid ${T.glassBorder}`, borderRadius: 16,
        padding: "16px 24px", textAlign: "center", color: T.white,
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>500+</div>
        <div style={{ fontSize: 12, letterSpacing: "0.12em", opacity: 0.75, marginTop: 4 }}>Satisfied Clients</div>
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
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(48px, 7vw, 96px)",
          fontWeight: 700, color: T.white, lineHeight: 1.0,
          textTransform: "uppercase", letterSpacing: "-0.01em",
          margin: "0 0 24px 0", maxWidth: 700,
        }}>
          Create Your<br />Dream Garden
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.7)", maxWidth: 420, lineHeight: 1.65,
          fontFamily: "'DM Sans', sans-serif", fontSize: 15, margin: "0 0 36px 0",
        }}>
          Crafting dream gardens with passion, creativity, and sustainability. 
          Supporting Kenya's <strong>15 Billion Trees Initiative</strong> through 
          AI-driven health monitoring and carbon sequestration tracking.
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
          >Get Started</button>

          <button 
            onClick={() => navigate("/drone-analysis")}
            style={{
              background: "transparent", color: T.white,
              border: "1px solid rgba(255,255,255,0.4)",
              padding: "14px 32px", borderRadius: 4, fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500, letterSpacing: "0.06em", cursor: "pointer",
              transition: "border-color 0.2s",
            }}>Explore Projects</button>
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
          }}>Community Impact</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
            Join our community of environmental stewards tracking real-time carbon sequestration across Kenya.
          </p>
        </div>
        
        <div style={{ display: "flex", gap: 48 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              color: T.white, 
              fontSize: 36, 
              fontWeight: 700, 
              fontFamily: "'DM Sans', sans-serif" 
            }}>{count.toLocaleString()} kg</div>
            <div style={{ color: T.gold, fontSize: 12, letterSpacing: "0.1em", marginTop: 4 }}>TOTAL CO2 SEQUESTERED</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              color: T.white, 
              fontSize: 36, 
              fontWeight: 700, 
              fontFamily: "'DM Sans', sans-serif" 
            }}>1,842</div>
            <div style={{ color: T.gold, fontSize: 12, letterSpacing: "0.1em", marginTop: 4 }}>TREES MONITORED</div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Values / "We Are Different" Section ─── */
const ValuesSection: FC = () => {
  const navigate = useNavigate();
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, enter: boolean) => {
    if (enter) {
      e.currentTarget.style.paddingLeft = "12px";
    } else {
      e.currentTarget.style.paddingLeft = "0px";
    }
  };

  return (
    <section style={{ background: T.cream, padding: "100px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.25em",
          color: T.muted, marginBottom: 60, display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ color: T.muted }}>[ VALUES ]</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 700,
              color: T.darkGreen, lineHeight: 1.1, textTransform: "uppercase",
              letterSpacing: "-0.01em", margin: "0 0 32px 0",
            }}>
              We Are<br /><em style={{ fontStyle: "italic", color: T.accent }}>Different</em>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8,
              color: "#4A4A3A", maxWidth: 420, margin: "0 0 40px 0",
            }}>
              Our platform fuses AI-powered plant diagnostics with hands-on landscape artistry —
              delivering beauty, health, and sustainability in every outdoor space we touch.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {([
                { stat: "500+", label: "Plant Species" },
                { stat: "98%", label: "Client Satisfaction" },
                { stat: "24/7", label: "Expert Support" },
                { stat: "10K+", label: "Projects Delivered" },
              ] as StatItem[]).map(({ stat, label }) => (
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
            {([
              { num: "01", title: "Landscape Design", desc: "AI-analysed layout recommendations, plant placement and seasonal planning.", link: "/drone-analysis" },
              { num: "02", title: "Plant Health Monitoring", desc: "Early disease detection, nutrient tracking and environmental stress alerts.", link: "/scan" },
              { num: "03", title: "Smart Irrigation", desc: "Water-optimised schedules powered by real-time soil and weather data.", link: "/drone-analysis" },
              { num: "04", title: "Expert Consultation", desc: "Live sessions with certified landscape designers and horticulturists.", link: "/specialist-chat" },
            ] as ServiceItem[]).map(({ num, title, desc, link }) => (
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
  const features: Feature[] = [
    { emoji: "🏡", title: "Landscape Design Analysis", desc: "AI analyses your entire landscape — plant placement, health signals, and aesthetic improvements for optimal outdoor living.", link: "/drone-analysis" },
    { emoji: "🌿", title: "Plant Health Monitoring", desc: "Comprehensive monitoring detecting early signs of disease, nutrient deficiencies, and environmental stressors before they escalate.", link: "/scan" },
    { emoji: "🛡️", title: "Landscape Protection Plans", desc: "Customised pest management, disease prevention, and seasonal care tailored to your climate and plant varieties.", link: "/plant-timeline" },
    { emoji: "⚡", title: "Smart Irrigation Management", desc: "AI-powered water scheduling that reduces waste while ensuring every plant receives precisely the hydration it needs.", link: "/drone-analysis" },
    { emoji: "📊", title: "Performance Analytics", desc: "Track health, growth, and beauty metrics over time with seasonal recommendations and performance insights.", link: "/profile" },
    { emoji: "🌍", title: "Expert Knowledge Base", desc: "Access an extensive database of plant selection guides, maintenance schedules, and sustainable practices from industry pros.", link: "/plant-library" },
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
            }}>[ CAPABILITIES ]</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 700, color: T.darkGreen, textTransform: "uppercase", margin: 0,
            }}>Complete<br /><em style={{ fontStyle: "italic", color: T.accent }}>Landscape Solutions</em></h2>
          </div>
          <p style={{
            maxWidth: 360, fontSize: 14, lineHeight: 1.75, color: T.muted,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Every tool you need to design, monitor, and maintain a thriving outdoor space — all in one platform.
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
const WorkflowSection: FC = () => (
  <section style={{ background: T.cream, padding: "100px 48px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.25em", color: T.muted, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>
          [ AI WORKFLOW ]
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3vw, 44px)",
          fontWeight: 700, color: T.darkGreen, textTransform: "uppercase", margin: "0 0 20px",
        }}>How Our AI<br /><em style={{ fontStyle: "italic", color: T.accent }}>Technology Works</em></h2>
        <p style={{ fontSize: 15, color: T.muted, maxWidth: 560, margin: "0 auto", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75 }}>
          From image upload to expert diagnosis — powered by advanced computer vision.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
        {([
          { num: "01", emoji: "📸", title: "Image Capture", desc: "Take a clear photo of the affected plant part using your smartphone camera." },
          { num: "02", emoji: "🔄", title: "AI Processing", desc: "Our deep learning model extracts visual features and cross-references our disease database." },
          { num: "03", emoji: "🔬", title: "Disease Analysis", desc: "AI identifies the issue with confidence scoring and severity assessment." },
          { num: "04", emoji: "✅", title: "Expert Treatment", desc: "Receive AI-generated treatment plans validated by agricultural scientists." },
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

/* ─── Expert Chat ─── */
const ExpertSection: FC<ExpertSectionProps> = ({ user }) => {
  const navigate = useNavigate();
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.25em", color: T.gold, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>
              [ PROFESSIONAL EXPERTS ]
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 700, color: T.white, textTransform: "uppercase", margin: "0 0 24px",
            }}>Connect With<br /><em style={{ fontStyle: "italic", color: T.gold }}>Specialists</em></h2>
            <p style={{
              fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.8,
              fontFamily: "'DM Sans', sans-serif", marginBottom: 40,
            }}>
              Get personalised guidance from certified landscape designers, horticulturists,
              and outdoor living experts ready to transform your property.
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
              Start Consultation
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {([
              { initials: "DR", name: "Dr. Maria Rodriguez", role: "Landscape Pathologist", online: true },
              { initials: "JT", name: "John Thompson", role: "Sustainable Designer", online: false },
              { initials: "SC", name: "Dr. Sarah Chen", role: "Landscape Horticulturist", online: true },
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
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{online ? "Online" : "Busy"}</span>
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
  return (
    <section style={{
      background: `linear-gradient(135deg, ${T.forestGreen} 0%, ${T.darkGreen} 100%)`,
      padding: "100px 48px", textAlign: "center",
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.25em", color: T.gold, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>
          [ PROFESSIONAL LANDSCAPING SOLUTIONS ]
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 56px)",
          fontWeight: 700, color: T.white, textTransform: "uppercase", margin: "0 0 24px",
        }}>Transform Your<br /><em style={{ fontStyle: "italic", color: T.gold }}>Outdoor Spaces Today</em></h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 48, fontFamily: "'DM Sans', sans-serif" }}>
          Join thousands of homeowners and landscape professionals who trust our AI-powered platform.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button 
            onClick={() => navigate("/scan")}
            style={{
              background: T.white, color: T.darkGreen, border: "none",
              padding: "16px 40px", borderRadius: 4, fontWeight: 600, fontSize: 13,
              letterSpacing: "0.06em", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>Start Landscape Analysis ⚡</button>
          <button 
            onClick={() => navigate("/plant-store")}
            style={{
              background: "transparent", color: T.white, border: "1px solid rgba(255,255,255,0.35)",
              padding: "16px 40px", borderRadius: 4, fontWeight: 500, fontSize: 13,
              letterSpacing: "0.06em", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>Landscaping Services</button>
        </div>
        <p style={{ marginTop: 24, color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}>
          🌟 Free landscape analysis &nbsp;•&nbsp; 🏡 Design consultation &nbsp;•&nbsp; 🌿 Plant health monitoring
        </p>
      </div>
    </section>
  );
};

/* ─── Testimonials ─── */
const TestimonialsSection: FC = () => (
  <section style={{ background: T.cream, padding: "100px 48px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.25em", color: T.muted, fontFamily: "'DM Sans', sans-serif", marginBottom: 16 }}>
          [ TESTIMONIALS ]
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3vw, 44px)",
          fontWeight: 700, color: T.darkGreen, textTransform: "uppercase", margin: 0,
        }}>What Our Users Say 🌟</h2>
        <p style={{ marginTop: 16, color: T.muted, fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
          Thousands of farmers and gardeners trust Hedges Care to protect their plants.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {([
          { init: "J", name: "Ann Njeru 🐯", role: "Small-scale Farmer", quote: "Crop Doctor has transformed how I manage my farm. Identifying diseases early has saved me thousands in potential crop losses. Highly recommend! 🌱" },
          { init: "S", name: "Stephen Ndwiga 🐯", role: "Urban Gardener", quote: "As a hobby gardener, I was always struggling with plant diseases. Crop Doctor makes it so easy to identify and treat problems! My garden has never looked better. 🌿" },
          { init: "R", name: "Wilson Omondi 🐯", role: "Commercial Grower", quote: "This app has become an essential tool for our farm operations. The instant diagnosis helps us take action quickly and protect our yields. Worth every penny! 💯" },
        ] as Testimonial[]).map(({ init, name, role, quote }) => (
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

/* ─── Footer ─── */
const FooterSection: FC = () => {
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    e.currentTarget.style.color = enter ? T.white : "rgba(255,255,255,0.5)";
  };

  const footerCols: FooterColumn[] = [
    { title: "Features", links: [
      { label: "AI Plant Detection", to: "/scan" },
      { label: "Plant Encyclopedia", to: "/plant-library" },
      { label: "Tutorial Videos", to: "/video-library" },
      { label: "Expert Chat", to: "/specialist-chat" },
      { label: "Community Forum", to: "/community-forum" }
    ]},
    { title: "Company", links: [
      { label: "About Us", to: "/about" },
      { label: "Pricing", to: "/subscription" },
      { label: "Drone Analysis", to: "/drone-analysis" },
      { label: "Partnerships", to: "/partnerships" },
      { label: "Contact Us", to: "/community-forum" }
    ]},
    { title: "Legal", links: [
      { label: "Terms of Service", to: "#" },
      { label: "Privacy Policy", to: "#" },
      { label: "Cookie Policy", to: "#" },
      { label: "Data Protection", to: "#" }
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
                AI Plant Detector
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.75, maxWidth: 260, fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>
              Revolutionizing outdoor & indoor spaces with AI-powered plant detection and expert landscaping advice.
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
            © 2026 Hedges Care. All rights reserved.
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
            Made by Phr3edevelopers 🇰🇪
          </span>
        </div>
      </div>
    </footer>
  );
};

/* ─── Root ─── */
const Landing: FC = () => {
  const { user } = useAuth();

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
