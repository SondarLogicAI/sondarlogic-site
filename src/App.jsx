import { useState, useEffect, useRef } from "react";
import {
  Shield, ScanSearch, Zap, Check, X,
  ArrowRight, MapPin, BarChart3, Eye, TrendingUp,
  Upload, Brain, GitBranch, Banknote
} from "lucide-react";

/* ─── Palette ─────────────────────────────────────────────── */
const CYAN = "#2DD4BF";
const BLUE = "#0EA5E9";
const BG   = "#050505";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body { background: ${BG}; color: #e2e8f0; font-family: 'Inter', sans-serif; overflow-x: hidden; }

  .grid-bg {
    background-color: ${BG};
    background-image:
      linear-gradient(rgba(45,212,191,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px);
    background-size: 64px 64px;
  }

  .cyan-glow { box-shadow: 0 0 30px rgba(45,212,191,0.25), 0 0 60px rgba(45,212,191,0.1); }
  .cyan-text-glow { text-shadow: 0 0 20px rgba(45,212,191,0.5); }

  .gradient-text {
    background: linear-gradient(135deg, ${CYAN} 0%, ${BLUE} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(45,212,191,0.4); }
    70%  { box-shadow: 0 0 0 12px rgba(45,212,191,0); }
    100% { box-shadow: 0 0 0 0 rgba(45,212,191,0); }
  }
  .animate-fade-up { animation: fadeUp 0.7s ease both; }
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }
  .delay-500 { animation-delay: 0.5s; }

  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  .btn-cyan {
    background: ${CYAN};
    color: #020617;
    font-weight: 600;
    padding: 0.75rem 1.75rem;
    border-radius: 0.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    transition: all 0.2s ease;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    white-space: nowrap;
  }
  .btn-cyan:hover {
    background: #5eead4;
    box-shadow: 0 0 24px rgba(45,212,191,0.5);
    transform: translateY(-1px);
  }
  .btn-outline {
    border: 1px solid rgba(45,212,191,0.35);
    color: ${CYAN};
    background: transparent;
    font-weight: 500;
    padding: 0.75rem 1.75rem;
    border-radius: 0.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    transition: all 0.2s ease;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    white-space: nowrap;
  }
  .btn-outline:hover {
    background: rgba(45,212,191,0.08);
    border-color: ${CYAN};
    transform: translateY(-1px);
  }

  .nav-link {
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .nav-link:hover { color: #fff; }

  .feature-card {
    background: rgba(15,23,42,0.7);
    border: 1px solid rgba(45,212,191,0.12);
    border-radius: 1rem;
    padding: 2rem;
    transition: all 0.3s ease;
  }
  .feature-card:hover {
    border-color: rgba(45,212,191,0.35);
    box-shadow: 0 0 40px rgba(45,212,191,0.08);
    transform: translateY(-4px);
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0f172a; }
  ::-webkit-scrollbar-thumb { background: rgba(45,212,191,0.3); border-radius: 3px; }

  /* 📱 MOBILE FIXES - ADDED FOR AHMED */
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .nav-links-desktop { display: none !important; }
    .hero-title { font-size: 2.3rem !important; }
    .section-padding { padding: 3rem 0 !important; }
    .responsive-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .stats-grid-mobile { grid-template-columns: 1fr 1fr !important; gap: 1rem !important; }
    .footer-grid-mobile { grid-template-columns: 1fr !important; gap: 3rem !important; }
  }
`;

/* ─── Helpers ─────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = [el, ...el.querySelectorAll('.reveal')];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    targets.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Section({ children, id, style = {} }) {
  return <section id={id} className="section-padding" style={{ padding: "3.5rem 0", ...style }}>{children}</section>;
}

function Tag({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.4rem",
      border: "1px solid rgba(45,212,191,0.3)", borderRadius: "2rem",
      padding: "0.3rem 1rem", fontSize: "0.7rem", fontWeight: 600,
      letterSpacing: "0.12em", color: CYAN, marginBottom: "1.25rem"
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: CYAN, display: "inline-block", animation: "pulse-ring 2s infinite" }} />
      {children}
    </div>
  );
}

/* ─── NAVBAR ──────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(3,7,18,0.88)" : "rgba(3,7,18,0.6)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(45,212,191,0.08)",
      transition: "all 0.3s ease"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>
        <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
          Sondar <span style={{ color: CYAN }}>Logic AI</span>
        </div>
        <div className="nav-links-desktop" style={{ display: "flex", gap: "2rem" }}>
          {[
            { label: "Features",     id: "features" },
            { label: "How it Works", id: "how-it-works" },
            { label: "Pricing",      id: "pricing" },
            { label: "FAQ",          id: "faq" },
          ].map(l => (
            <a key={l.label} href={`#${l.id}`} className="nav-link"
              onClick={e => { e.preventDefault(); document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' }); }}>
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a href="https://calendly.com/ahmed_sondarlogic" target="_blank" rel="noopener noreferrer" className="btn-cyan" style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}>Book a Demo</a>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ paddingTop: "7rem", paddingBottom: "3.5rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 800, height: 500, background: "radial-gradient(ellipse at center, rgba(45,212,191,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
        <div className="animate-fade-up" style={{ display: "flex", justifyContent: "center" }}>
          <Tag>AI REBATE ENGINE · NEXT-GEN</Tag>
        </div>
        <h1 className="hero-title animate-fade-up delay-100" style={{ fontSize: "clamp(2.4rem, 5vw, 3.75rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.035em", marginBottom: "1.25rem" }}>
          <span style={{ color: "#fff", display: "block" }}>Enterprise Rebate Processing.</span>
          <span className="gradient-text">As low as $0.35 per claim.</span>
        </h1>
        <p className="animate-fade-up delay-200" style={{ color: "#64748b", fontSize: "1.2rem", fontWeight: 500, marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>
          No fees. No delays. No exceptions.
        </p>
        <p className="animate-fade-up delay-300" style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.75, maxWidth: 620, margin: "0 auto 2.5rem" }}>
          Sondar Logic AI validates claims instantly, extracts deep-basket intelligence, and maps provincial retailer performance across Canada. Zero setup fees. Zero hidden costs.
        </p>
        <div className="animate-fade-up delay-400" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
          <a href="https://calendly.com/ahmed_sondarlogic" target="_blank" rel="noopener noreferrer" className="btn-cyan">Book a Demo <ArrowRight size={16} /></a>
        </div>
        <div className="stats-grid-mobile animate-fade-up delay-500" style={{
          background: "rgba(15,23,42,0.6)",
          border: "1px solid rgba(45,212,191,0.12)",
          borderRadius: "1rem",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          padding: "1.75rem 2rem"
        }}>
          {[
            { value: "97%+", label: "Extraction Accuracy" },
            { value: "<3s",  label: "Processing Time" },
            { value: "$0",   label: "Exception Fees" },
            { value: "80%+", label: "Average Cost Reduction" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0.5rem 0", borderRight: i < 3 ? "1px solid rgba(45,212,191,0.1)" : "none" }}>
              <div style={{ fontSize: "1.85rem", fontWeight: 800, color: CYAN, letterSpacing: "-0.04em" }}>{s.value}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.25rem", letterSpacing: "0.02em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── COST ANALYSIS ───────────────────────────────────────── */
function CostAnalysis() {
  const ref = useReveal();
  return (
    <Section id="pricing-section">
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <Tag>COST ANALYSIS</Tag>
          <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            <span style={{ color: "#fff" }}>The Hidden Cost of </span>
            <span style={{ color: "#334155" }}>"Cheap" Processing</span>
          </h2>
        </div>
        <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {/* Legacy card */}
          <div className="reveal reveal-delay-1" style={{ background: "rgba(15,23,42,0.5)", border: "1px solid rgba(100,116,139,0.25)", borderRadius: "1.25rem", padding: "2.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.75rem" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
              <span style={{ fontWeight: 700, fontSize: "0.82rem", color: "#94a3b8", letterSpacing: "0.08em" }}>LEGACY PROCESSORS</span>
            </div>
            {[
              { label: "THE BREAKDOWN",  text: "$1.20+ base processing rate, plus heavy additional fees to process issues, manual reviews, and support calls." },
              { label: "THE RESULT",     text: "Large setup costs and final campaign bills that inevitably come in way above your initial budget." },
              { label: "THE EXPERIENCE", text: "Mail and manual processing delays, data entry errors, and frustrated customers." },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", gap: "0.875rem", marginBottom: "1.25rem", alignItems: "flex-start" }}>
                <X size={17} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <span style={{ fontSize: "0.67rem", color: "#475569", fontWeight: 600, letterSpacing: "0.1em", display: "block", marginBottom: "0.2rem" }}>{row.label}</span>
                  <span style={{ color: "#94a3b8", fontSize: "0.92rem", lineHeight: 1.55 }}>{row.text}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(100,116,139,0.2)" }}>
              <div style={{ fontSize: "0.67rem", color: "#475569", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "0.4rem" }}>BASE COST / CLAIM (PLUS FEES)</div>
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#ef4444", letterSpacing: "-0.04em" }}>$1.20+</div>
            </div>
          </div>

          {/* Sondar card */}
          <div className="reveal reveal-delay-2 cyan-glow" style={{ background: "rgba(10,30,40,0.7)", border: `1px solid ${CYAN}`, borderRadius: "1.25rem", padding: "2.25rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle at top right, rgba(45,212,191,0.09), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.75rem" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: CYAN, animation: "pulse-ring 2s infinite" }} />
              <span style={{ fontWeight: 700, fontSize: "0.82rem", color: CYAN, letterSpacing: "0.08em" }}>SONDAR LOGIC AI</span>
            </div>
            {[
              { label: "THE BREAKDOWN",  text: "A flat $499/mo platform fee unlocks the full AI engine. $0 setup fees. $0 exception penalties." },
              { label: "THE RESULT",     text: "Includes deep-basket data extraction, provincial performance mapping, and automated customer email handling." },
              { label: "THE EXPERIENCE", text: "Instant digital payouts and predictable per-claim billing that automatically scales with your volume." },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", gap: "0.875rem", marginBottom: "1.25rem", alignItems: "flex-start" }}>
                <Check size={17} color={CYAN} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <span style={{ fontSize: "0.67rem", color: "rgba(45,212,191,0.55)", fontWeight: 600, letterSpacing: "0.1em", display: "block", marginBottom: "0.2rem" }}>{row.label}</span>
                  <span style={{ color: "#cbd5e1", fontSize: "0.92rem", lineHeight: 1.55 }}>{row.text}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(45,212,191,0.2)" }}>
              <div style={{ fontSize: "0.67rem", color: "rgba(45,212,191,0.55)", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "0.4rem" }}>TOTAL COST / CLAIM</div>
              <div className="gradient-text" style={{ fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-0.04em" }}>$0.35 – $0.55</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── THREE SYSTEMS ───────────────────────────────────────── */
function ThreeSystems() {
  const ref = useReveal();
  const cards = [
    { icon: <Shield size={26} color={CYAN} />,    tag: "FRAUD_DETECT", title: "Instant Fraud Blocking",    text: "Sondar Logic AI automatically detects Photoshop edits, Canva templates, and blocks duplicate receipts before a payout is ever triggered." },
    { icon: <ScanSearch size={26} color={CYAN} />, tag: "BASKET_SCAN",  title: "Deep Basket Analysis",      text: "We don't just read the total. Our engine extracts exactly what competitor brands and complementary items were in the shopper's basket at no extra cost." },
    { icon: <Zap size={26} color={CYAN} />,        tag: "PAYOUT_EXEC",  title: "Instant Consumer Payouts",  text: "Eliminate the 8-week wait. Automatically trigger instant digital payouts the second a valid receipt is uploaded." },
  ];
  return (
    <Section id="features">
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <Tag>CORE ENGINE</Tag>
          <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            <span style={{ color: "#fff" }}>Three systems. </span>
            <span style={{ color: "#334155" }}>95% AI confidence failsafe.</span>
          </h2>
        </div>
        <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {cards.map((c, i) => (
            <div key={i} className={`feature-card reveal reveal-delay-${i + 1}`}>
              <div style={{ width: 50, height: 50, borderRadius: "0.75rem", background: "rgba(45,212,191,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", border: "1px solid rgba(45,212,191,0.2)" }}>
                {c.icon}
              </div>
              <div style={{ fontSize: "0.63rem", fontWeight: 700, color: CYAN, letterSpacing: "0.15em", marginBottom: "0.6rem", fontFamily: "monospace" }}>{c.tag}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>{c.title}</h3>
              <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.92rem" }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── COMMAND CENTER ──────────────────────────────────────── */
function CommandCenter() {
  const ref = useReveal();
  const features = [
    { title: "Provincial Heatmaps",         text: "Track volume from BC to NL with postal-code precision." },
    { title: "Retailer & Vendor Analytics", text: "See exactly which independent shops or big-box retailers are moving your product the fastest, updated live." },
    { title: "Competitor Basket Share",     text: "Identify exactly what other brands are in the shopper's basket at the time of purchase. Full receipt extraction, no extra charge." },
    { title: "Live Financial Tracking",     text: "Watch your payout volume, CAD disbursement totals, and exact dollar amount of fraud blocked update by the second." },
  ];
  return (
    <Section>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          {/* Left text */}
          <div>
            <div className="reveal"><Tag>COMMAND CENTER</Tag></div>
            <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1rem" }}>
              <span style={{ color: "#fff" }}>Your First-Party Data, </span>
              <span style={{ color: CYAN }} className="cyan-text-glow">Live 24/7.</span>
            </h2>
            <p className="reveal reveal-delay-2" style={{ color: "#64748b", fontSize: "1rem", marginBottom: "2rem", lineHeight: 1.7 }}>
              We don't just clear receipts; we map your entire Canadian market.
            </p>
            <div className="reveal reveal-delay-3" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: CYAN, flexShrink: 0, marginTop: 7, boxShadow: `0 0 8px ${CYAN}` }} />
                  <div>
                    <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.92rem" }}>{f.title}: </span>
                    <span style={{ color: "#64748b", fontSize: "0.92rem" }}>{f.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right dashboard mockup */}
          <div className="hide-mobile reveal reveal-delay-2" style={{ background: "rgba(8,15,32,0.9)", border: "1px solid rgba(45,212,191,0.2)", borderRadius: "1.25rem", padding: "1.75rem", boxShadow: "0 0 60px rgba(45,212,191,0.07), 0 40px 80px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <span style={{ color: CYAN, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em" }}>SONDAR DASHBOARD</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulse-ring 2s infinite" }} />
                <span style={{ color: "#22c55e", fontSize: "0.67rem", fontWeight: 600 }}>LIVE</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {[
                { label: "Claims Today",  value: "2,847",  change: "+12.3%" },
                { label: "CAD Disbursed", value: "$142.4K", change: "+8.1%" },
                { label: "Fraud Blocked", value: "$23.8K",  change: "—" },
                { label: "Avg Process",   value: "1.8s",    change: "↓0.3s" },
              ].map((m, i) => (
                <div key={i} style={{ background: "rgba(15,23,42,0.8)", borderRadius: "0.75rem", padding: "1rem", border: "1px solid rgba(45,212,191,0.08)" }}>
                  <div style={{ color: "#475569", fontSize: "0.62rem", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>{m.label}</div>
                  <div style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.03em" }}>{m.value}</div>
                  <div style={{ color: i === 2 ? "#ef4444" : CYAN, fontSize: "0.67rem", marginTop: "0.2rem" }}>{m.change}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(15,23,42,0.8)", borderRadius: "0.75rem", padding: "1rem", border: "1px solid rgba(45,212,191,0.08)", marginBottom: "1rem" }}>
              <div style={{ color: "#475569", fontSize: "0.62rem", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>PROVINCIAL VOLUME</div>
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "flex-end", height: 60 }}>
                {[{p:"BC",h:85},{p:"AB",h:65},{p:"SK",h:35},{p:"MB",h:45},{p:"ON",h:100},{p:"QC",h:78},{p:"NB",h:28},{p:"NS",h:32},{p:"NL",h:18}].map((b, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
                    <div style={{ width: "100%", background: `linear-gradient(to top, ${CYAN}, ${BLUE})`, borderRadius: "3px 3px 0 0", height: `${b.h * 0.6}%`, opacity: 0.8 }} />
                    <span style={{ color: "#334155", fontSize: "0.5rem" }}>{b.p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(15,23,42,0.8)", borderRadius: "0.75rem", padding: "1rem", border: "1px solid rgba(45,212,191,0.08)" }}>
              <div style={{ color: "#475569", fontSize: "0.62rem", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>RECENT CLAIMS</div>
              {[
                { id: "#48821", retailer: "Canadian Tire – Burnaby", amt: "$12.50", status: "PAID" },
                { id: "#48820", retailer: "NAPA – Calgary NW",       amt: "$8.75",  status: "PAID" },
                { id: "#48819", retailer: "Costco – Mississauga",    amt: "$22.00", status: "FLAGGED" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: i < 2 ? "1px solid rgba(45,212,191,0.06)" : "none" }}>
                  <div>
                    <span style={{ color: "#475569", fontSize: "0.62rem" }}>{r.id} </span>
                    <span style={{ color: "#94a3b8", fontSize: "0.67rem" }}>{r.retailer}</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <span style={{ color: "#e2e8f0", fontSize: "0.72rem", fontWeight: 600 }}>{r.amt}</span>
                    <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.06em", color: r.status === "PAID" ? "#22c55e" : "#f59e0b", background: r.status === "PAID" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)", padding: "0.15rem 0.4rem", borderRadius: "0.25rem" }}>{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── PRICING ─────────────────────────────────────────────── */
function Pricing() {
  const ref = useReveal();
  const checks = [
    "Instant Digital Payout Routing (Virtual Visa)",
    "Secure CAD e-Transfers (Available)",
    "Flexible Payout Scheduling (1, 7, or 30 days)",
    "97%+ AI Visual Audit — No Exception Fees",
    "Deep Basket & Competitor Data Extraction",
    "Looker Studio Dashboard & Dedicated API Routing",
  ];
  return (
    <Section id="pricing">
      <div ref={ref} style={{ maxWidth: 820, margin: "0 auto", padding: "0 2rem" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Tag>PRICING</Tag>
          <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: "1rem" }}>
            One Engine. Automatic Volume Discounts.
          </h2>
          <p style={{ color: "#64748b", lineHeight: 1.75, maxWidth: 620, margin: "0 auto", fontSize: "0.93rem" }}>
            Stop paying for gated features. Every Sondar Logic AI partner gets full access to our AI visual validation, instant digital payouts, and deep-basket data extraction. You pay one flat infrastructure license, and your per-claim rate automatically drops as you scale.
          </p>
        </div>

        <div className="reveal reveal-delay-1 cyan-glow" style={{ background: "rgba(5,15,30,0.9)", border: `1px solid ${CYAN}`, borderRadius: "1.5rem", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, background: "radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

          {/* Header band — enlarged $499 */}
          <div style={{ padding: "1.25rem 2rem", borderBottom: "1px solid rgba(45,212,191,0.12)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(45,212,191,0.03)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
              <span style={{ fontSize: "2.25rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.05em", lineHeight: 1 }}>$499</span>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#cbd5e1", letterSpacing: "-0.01em" }}>/mo Platform License</div>
                <div style={{ fontSize: "0.72rem", color: "#475569", marginTop: "0.1rem" }}>Flat infrastructure fee · All features included</div>
              </div>
            </div>
          </div>

          {/* Tiers — compact */}
          <div style={{ padding: "1.5rem 2rem" }}>
            <div style={{ fontSize: "0.62rem", color: "#475569", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "0.75rem" }}>PER-CLAIM PROCESSING RATE</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(45,212,191,0.15)", borderRadius: "0.875rem", overflow: "hidden", marginBottom: "1.5rem" }}>
              {[
                { label: "First 10,000 claims",    rate: "$0.55 / claim", best: false },
                { label: "Claims 10,001 – 50,000", rate: "$0.45 / claim", best: false },
                { label: "Claims 50,001+",          rate: "$0.35 / claim", best: true  },
              ].map((t, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "0.9rem 1.5rem",
                  background: t.best ? "rgba(45,212,191,0.07)" : "transparent",
                  borderBottom: i < 2 ? "1px solid rgba(45,212,191,0.1)" : "none"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <span style={{ color: t.best ? "#e2e8f0" : "#64748b", fontSize: "0.93rem" }}>{t.label}</span>
                    {t.best && (
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#020617", background: CYAN, padding: "0.12rem 0.55rem", borderRadius: "2rem", letterSpacing: "0.08em" }}>BEST RATE</span>
                    )}
                  </div>
                  <span style={{ color: t.best ? CYAN : "#94a3b8", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.02em" }}>{t.rate}</span>
                </div>
              ))}
            </div>

            {/* Checklist — tight grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 2rem", marginBottom: "1.5rem" }}>
              {checks.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "0.55rem", alignItems: "flex-start" }}>
                  <Check size={14} color={CYAN} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ color: "#94a3b8", fontSize: "0.82rem", lineHeight: 1.5 }}>{c}</span>
                </div>
              ))}
            </div>

            <a href="https://calendly.com/ahmed_sondarlogic" target="_blank" rel="noopener noreferrer" className="btn-cyan" style={{ display: "flex", justifyContent: "center", width: "100%", fontSize: "0.96rem", padding: "0.875rem" }}>
              Start Processing Today <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── WORKFLOW ────────────────────────────────────────────── */
function Workflow() {
  const ref = useReveal();
  const steps = [
    {
      icon: <Upload size={24} color={CYAN} />,
      number: "01",
      title: "Instant Ingestion",
      text: "Receipts are uploaded and instantly scanned by our vision AI models.",
    },
    {
      icon: <Brain size={24} color={CYAN} />,
      number: "02",
      title: "95% Confidence Filter",
      text: "The AI audits the receipt for fraud, dates, and SKUs, assigning a mathematical confidence score.",
    },
    {
      icon: <GitBranch size={24} color={CYAN} />,
      number: "03",
      title: "Edge-Case Routing",
      text: "Any claim scoring below our strict 95% confidence threshold — e.g., blurry images or complex receipts — is automatically routed to our secure manual review queue for human verification.",
    },
    {
      icon: <Banknote size={24} color={CYAN} />,
      number: "04",
      title: "Payout Execution",
      text: "Validated claims instantly trigger API routing for CAD disbursement.",
    },
  ];
  return (
    <Section id="how-it-works">
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <Tag>THE WORKFLOW</Tag>
          <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: "0.6rem" }}>
            Enterprise scale.{" "}
            <span style={{ color: "#475569" }}>Human-in-the-loop accuracy.</span>
          </h2>
        </div>

        <div className="reveal reveal-delay-1" style={{ position: "relative" }}>
          {/* Connector line behind cards */}
          <div className="hide-mobile" style={{
            position: "absolute", top: 37,
            left: "calc(12.5% + 0.75rem)", right: "calc(12.5% + 0.75rem)",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.2) 15%, rgba(45,212,191,0.2) 85%, transparent)",
            pointerEvents: "none"
          }} />

          <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
            {steps.map((s, i) => (
              <div key={i}
                style={{ background: "rgba(10,20,40,0.7)", border: "1px solid rgba(45,212,191,0.13)", borderRadius: "1.125rem", padding: "1.75rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem", transition: "border-color 0.3s, transform 0.3s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.38)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.13)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ width: 50, height: 50, borderRadius: "0.875rem", background: "rgba(45,212,191,0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(45,212,191,0.2)" }}>
                    {s.icon}
                  </div>
                  <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "rgba(45,212,191,0.1)", letterSpacing: "-0.05em", lineHeight: 1 }}>{s.number}</div>
                </div>
                <div>
                  <h3 style={{ fontSize: "0.97rem", fontWeight: 700, color: "#fff", marginBottom: "0.45rem", letterSpacing: "-0.02em" }}>{s.title}</h3>
                  <p style={{ color: "#64748b", fontSize: "0.86rem", lineHeight: 1.7 }}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence callout strip */}
        <div className="reveal reveal-delay-2" style={{ marginTop: "2rem", background: "rgba(45,212,191,0.04)", border: "1px solid rgba(45,212,191,0.14)", borderRadius: "0.875rem", padding: "1.1rem 1.75rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: CYAN, flexShrink: 0, marginTop: 6, animation: "pulse-ring 2s infinite" }} />
          <p style={{ color: "#94a3b8", fontSize: "0.86rem", lineHeight: 1.65 }}>
            <span style={{ color: CYAN, fontWeight: 600 }}>95% confidence threshold: </span>
            Claims that pass go directly to instant payout. Claims that fall below the threshold are never auto-denied — they enter a transparent human-review queue with a 3-business-day audit SLA and automatic customer follow-up.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────── */
const FAQ_DATA = [
  {
    q: "Can we customize the payout timing?",
    a: "Yes. Through our API routing, payout schedules are completely customizable to your campaign rules. We can trigger instant payouts the second a receipt is validated, or batch them for scheduled weekly or monthly disbursements.",
  },
  {
    q: "What specific retailer and geographical data do we see?",
    a: "Your dashboard provides real-time mapping of provincial volume (from BC to NL) and specific dealer performance. You'll see exactly which independent shops or big-box retailers are moving your product, right down to the postal code.",
  },
  {
    q: "How do you handle Canadian tax and compliance?",
    a: "Sondar Logic AI is built for the Canadian market. We handle GST/HST calculations and provide secure payouts in CAD through our BC-based payment partner, ensuring compliance with local regulations.",
  },
  {
    q: "How long does it take to launch a new promotional campaign?",
    a: "Days, not months. Because our AI is context-aware, it doesn't need to be \"trained\" on new receipt layouts. We can have your custom routing live in under a week.",
  },
  {
    q: "What types of payment can we send to customers?",
    a: "We offer a variety of digital rewards to match your brand's needs. Most partners choose Virtual Visa Gift Cards because there is no additional charge for fulfillment. We also support CAD e-Transfers and direct bank transfers.",
  },
];

function FAQItem({ q, a, open, toggle }) {
  return (
    <div style={{ borderBottom: "1px solid rgba(45,212,191,0.1)" }}>
      <button
        onClick={toggle}
        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.4rem 0", textAlign: "left", gap: "1rem" }}
      >
        <span style={{ color: open ? "#fff" : "#94a3b8", fontSize: "0.97rem", fontWeight: 600, transition: "color 0.2s", letterSpacing: "-0.01em", fontFamily: "'Inter', sans-serif" }}>{q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={CYAN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div style={{ overflow: "hidden", transition: "max-height 0.4s ease, opacity 0.3s ease", maxHeight: open ? "300px" : "0", opacity: open ? 1 : 0 }}>
        <p style={{ color: "#64748b", lineHeight: 1.75, paddingBottom: "1.4rem", fontSize: "0.93rem" }}>{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const ref = useReveal();
  return (
    <Section id="faq">
      <div ref={ref} style={{ maxWidth: 760, margin: "0 auto", padding: "0 2rem" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <Tag>FAQ</Tag>
          <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>
            Operational Transparency
          </h2>
        </div>
        <div className="reveal reveal-delay-1">
          {FAQ_DATA.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} open={openIdx === i} toggle={() => setOpenIdx(openIdx === i ? null : i)} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── FINAL CTA ───────────────────────────────────────────── */
function FinalCTA() {
  const ref = useReveal();
  return (
    <Section>
      <div ref={ref} style={{ maxWidth: 900, margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
        <div style={{ position: "relative", background: "rgba(5,15,30,0.8)", border: "1px solid rgba(45,212,191,0.15)", borderRadius: "2rem", padding: "3.5rem 3rem", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(45,212,191,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div className="reveal"><Tag>GET STARTED</Tag></div>
          <h2 className="reveal reveal-delay-1" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.12, marginBottom: "2.5rem" }}>
            <span style={{ color: "#fff" }}>Stop paying exception fees </span>
            <span style={{ color: "#334155" }}>for manual data entry.</span>
          </h2>
          <div className="reveal reveal-delay-2">
            <a href="https://calendly.com/ahmed_sondarlogic" target="_blank" rel="noopener noreferrer" className="btn-cyan" style={{ fontSize: "1.05rem", padding: "1rem 2.25rem" }}>
              Upgrade to Sondar Logic AI Today <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────── */
function Footer({ setActiveView }) {
  const navCols = [
    { heading: "PRODUCT", links: [
      { label: "Features",     id: "features" },
      { label: "How it Works", id: "how-it-works" },
      { label: "Pricing",      id: "pricing" },
      { label: "FAQ",          id: "faq" },
    ]},
    { heading: "INDUSTRY SOLUTIONS", links: [
      { label: "Automotive Rebates" },
      { label: "CPG Promotions" },
      { label: "Appliance Claims" },
    ]},
    { heading: "SUPPORT & OPERATIONS", links: [
      { label: "API Documentation" },
      { label: "Manual Review Portal" },
      { label: "Contact Sales: partnerships@sondarlogic.com", href: "mailto:partnerships@sondarlogic.com" },
    ]},
    { heading: "LEGAL & TRUST", links: [
      { label: "Privacy Policy",     action: "privacy" },
      { label: "Terms of Service",   action: "terms" },
      { label: "PIPEDA Compliance" },
      { label: "Security (SOC 2)" },
    ]},
  ];

  return (
    <footer style={{ borderTop: "1px solid rgba(45,212,191,0.08)", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "3rem", letterSpacing: "-0.02em" }}>
          Sondar <span style={{ color: CYAN }}>Logic AI</span>
        </div>
        <div className="footer-grid-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "3rem", marginBottom: "3rem" }}>
          {navCols.map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "#475569", letterSpacing: "0.15em", marginBottom: "1.25rem" }}>{col.heading}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {col.links.map((l, j) => (
                  l.action
                    ? <button key={j} onClick={() => { setActiveView(l.action); window.scrollTo(0,0); }}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#64748b", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s", textAlign: "left", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={e => e.target.style.color = "#e2e8f0"}
                        onMouseLeave={e => e.target.style.color = "#64748b"}>
                        {l.label}
                      </button>
                    : l.id
                      ? <a key={j} href={`#${l.id}`}
                          onClick={e => { e.preventDefault(); document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                          style={{ color: "#64748b", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s", cursor: "pointer" }}
                          onMouseEnter={e => e.target.style.color = "#e2e8f0"}
                          onMouseLeave={e => e.target.style.color = "#64748b"}>
                          {l.label}
                        </a>
                      : <a key={j} href={l.href || "#"}
                          style={{ color: "#64748b", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                          onMouseEnter={e => e.target.style.color = "#e2e8f0"}
                          onMouseLeave={e => e.target.style.color = "#64748b"}>
                          {l.label}
                        </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(45,212,191,0.06)", padding: "1.75rem 0", textAlign: "center" }}>
          <span style={{ color: "#334155", fontSize: "0.8rem" }}>© 2026 Sondar Logic AI. Built in Burlington, Ontario.</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── LEGAL PAGE LAYOUT ───────────────────────────────────── */
const legalBodyStyle = { color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1rem" };
const legalH2Style  = { fontSize: "1.1rem", fontWeight: 700, color: "#e2e8f0", letterSpacing: "-0.02em", marginBottom: "0.6rem", marginTop: "2.25rem" };

function LegalPage({ title, effectiveDate, children, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: BG }}>
      {/* Fixed back bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(3,7,18,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(45,212,191,0.1)", padding: "0.875rem 2rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <button
            onClick={onBack}
            style={{ background: "none", border: `1px solid rgba(45,212,191,0.35)`, borderRadius: "0.5rem", padding: "0.45rem 1rem", color: CYAN, fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Inter', sans-serif", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(45,212,191,0.08)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(45,212,191,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 2rem 6rem" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", color: CYAN, border: "1px solid rgba(45,212,191,0.3)", borderRadius: "2rem", padding: "0.25rem 0.875rem" }}>LEGAL DOCUMENT</span>
        </div>
        <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.035em", color: "#fff", marginTop: "1.25rem", marginBottom: "0.5rem" }}>{title}</h1>
        <p style={{ color: "#475569", fontSize: "0.85rem", marginBottom: "3rem", borderBottom: "1px solid rgba(45,212,191,0.1)", paddingBottom: "1.5rem" }}>Effective Date: {effectiveDate}</p>
        {children}
      </div>
    </div>
  );
}

/* ─── PRIVACY POLICY ──────────────────────────────────────── */
function PrivacyPolicy({ onBack }) {
  return (
    <LegalPage title="Privacy Policy" effectiveDate="March 2026" onBack={onBack}>
      <h2 style={legalH2Style}>Introduction</h2>
      <p style={legalBodyStyle}>Sondar Logic AI ("we," "us," or "our"), headquartered in Burlington, Ontario, provides an automated rebate validation and payment processing platform. This Privacy Policy outlines how we collect, use, disclose, and safeguard personal information in compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation.</p>

      <h2 style={legalH2Style}>Information We Collect</h2>
      <p style={legalBodyStyle}>We act as a Data Processor on behalf of our enterprise clients (the "Brands"). We collect information exclusively to validate rebate claims and process payouts. This includes:</p>
      <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
        {[
          { term: "End-Consumer Data", def: "Names, email addresses, phone numbers (if required for e-Transfers), and geographic location (Forward Sortation Area/Postal Code)." },
          { term: "Transaction Data", def: "Images of retail receipts uploaded by consumers, which include purchase dates, store locations, specific items purchased (including complementary and competitor items), and transaction totals." },
          { term: "B2B Client Data", def: "Business contact information, billing details, and platform usage metrics." },
        ].map((item, i) => (
          <li key={i} style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "0.5rem" }}>
            <strong style={{ color: "#cbd5e1" }}>{item.term}:</strong> {item.def}
          </li>
        ))}
      </ul>

      <h2 style={legalH2Style}>How We Use Your Information</h2>
      <p style={legalBodyStyle}>We use the collected information for the following specific business purposes:</p>
      <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
        {[
          { term: "Claim Validation", def: "Utilizing our vision AI models (hosted securely via AWS) to audit receipt images for fraud, duplication, and promotional compliance." },
          { term: "Digital Payouts", def: "Routing validated consumer information to our authorized digital disbursement partners to issue Virtual Visa cards or direct CAD e-Transfers." },
          { term: "Business Intelligence", def: "Aggregating anonymized, non-personally identifiable basket data to provide our Brands with high-level provincial heatmaps and retail analytics." },
          { term: "Customer Support", def: "Sending automated updates regarding claim status (e.g., approvals, rejections, or requests for clearer receipt images)." },
        ].map((item, i) => (
          <li key={i} style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "0.5rem" }}>
            <strong style={{ color: "#cbd5e1" }}>{item.term}:</strong> {item.def}
          </li>
        ))}
      </ul>

      <h2 style={legalH2Style}>Data Storage and Localization</h2>
      <p style={legalBodyStyle}>All receipt data, personally identifiable information (PII), and application databases are securely hosted on localized AWS servers physically located within Canada. We maintain strict data residency protocols to ensure Canadian consumer data does not cross borders unnecessarily.</p>

      <h2 style={legalH2Style}>Data Sharing and Third-Party Sub-Processors</h2>
      <p style={legalBodyStyle}>We do not sell, rent, or trade personal data. We only share data with vetted sub-processors essential to our operations, including:</p>
      <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
        {[
          { term: "Cloud Infrastructure", def: "AWS Canada (for secure storage and Claude vision AI processing)." },
          { term: "Workflow Automation", def: "Enterprise-grade routing infrastructure for secure data transfer between modules." },
          { term: "Payment Processors", def: "Authorized Canadian disbursement partners (for executing secure, instant digital payouts)." },
        ].map((item, i) => (
          <li key={i} style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "0.5rem" }}>
            <strong style={{ color: "#cbd5e1" }}>{item.term}:</strong> {item.def}
          </li>
        ))}
      </ul>
      <p style={legalBodyStyle}>All sub-processors are bound by strict confidentiality and data protection agreements.</p>

      <h2 style={legalH2Style}>Data Retention and Security</h2>
      <p style={legalBodyStyle}>We retain end-consumer PII only for as long as necessary to fulfill the promotional campaign, handle customer support inquiries, and satisfy legal or tax obligations. Once a campaign's retention period expires, consumer PII is permanently redacted or destroyed. We employ industry-standard encryption (AES-256 at rest, TLS 1.2+ in transit) and strict access controls to protect data from unauthorized access.</p>

      <h2 style={legalH2Style}>Individual Rights (Access and Deletion)</h2>
      <p style={legalBodyStyle}>Under PIPEDA, Canadian consumers have the right to request access to their personal information, request corrections, or withdraw consent. As Sondar Logic AI acts as a processor, end-consumers should direct these requests to the specific Brand running the promotion. We will fully assist our enterprise clients in executing any verified data deletion or access requests within the required legal timeframes.</p>

      <h2 style={legalH2Style}>Contact Us</h2>
      <p style={legalBodyStyle}>For inquiries regarding this Privacy Policy or our data practices, please contact our Privacy Officer at: Sondar Logic AI, Burlington, Ontario, Canada. Email: <a href="mailto:hello@sondarlogic.com" style={{ color: CYAN, textDecoration: "none" }}>hello@sondarlogic.com</a></p>
    </LegalPage>
  );
}

/* ─── TERMS OF SERVICE ────────────────────────────────────── */
function TermsOfService({ onBack }) {
  return (
    <LegalPage title="Terms of Service" effectiveDate="March 2026" onBack={onBack}>
      <h2 style={legalH2Style}>Acceptance of Terms</h2>
      <p style={legalBodyStyle}>By accessing or using the Sondar Logic AI platform, API, or dashboard, you (the "Client") agree to be bound by these Terms of Service. If you are entering into these Terms on behalf of an enterprise entity, you represent that you have the authority to bind that entity.</p>

      <h2 style={legalH2Style}>Service Description</h2>
      <p style={legalBodyStyle}>Sondar Logic AI provides an automated, AI-driven receipt validation and rebate disbursement engine. The service includes instant visual auditing, fraud detection, deep-basket data extraction, and API routing for digital payouts.</p>

      <h2 style={legalH2Style}>Accuracy and Manual Review SLA</h2>
      <p style={legalBodyStyle}>Our vision AI assigns a mathematical confidence score to every processed claim.</p>
      <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
        {[
          { term: "Automated Clearing", def: "Claims scoring 90% or higher are automatically approved and routed for instant payout based on Client campaign rules." },
          { term: "Manual Review Queue", def: "Claims scoring below the 90% threshold (e.g., blurry images, suspected duplicates, or edge cases) are automatically routed to our manual review queue. Sondar Logic AI commits to a 3-business-day Service Level Agreement (SLA) to manually audit these flagged claims. Clients also retain the option to manually override or review claims via their dedicated portal." },
        ].map((item, i) => (
          <li key={i} style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "0.5rem" }}>
            <strong style={{ color: "#cbd5e1" }}>{item.term}:</strong> {item.def}
          </li>
        ))}
      </ul>

      <h2 style={legalH2Style}>Client Obligations and Consent</h2>
      <p style={legalBodyStyle}>The Client remains the Data Controller. The Client is solely responsible for ensuring that their consumer-facing promotional materials, landing pages, and terms explicitly capture valid, informed consent from end-consumers to collect and share their receipt data and PII with Sondar Logic AI and our sub-processors, in full compliance with PIPEDA and CASL.</p>

      <h2 style={legalH2Style}>Fees, Invoicing, and Payout Funding</h2>
      <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
        {[
          { term: "Platform and Processing Fees", def: "Clients are billed a flat monthly platform license fee, plus a tiered per-claim processing rate as outlined in their active Service Agreement." },
          { term: "Exception Fees", def: "Sondar Logic AI does not charge additional penalties or exception fees for claims requiring manual review or claims that are rejected for fraud." },
          { term: "Payout Funding", def: "Clients must maintain a sufficiently funded balance with our designated payment disbursement partners to facilitate instant consumer payouts. Sondar Logic AI is not responsible for delayed consumer payouts resulting from insufficient Client funding." },
        ].map((item, i) => (
          <li key={i} style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "0.5rem" }}>
            <strong style={{ color: "#cbd5e1" }}>{item.term}:</strong> {item.def}
          </li>
        ))}
      </ul>

      <h2 style={legalH2Style}>Proprietary Rights and Data Ownership</h2>
      <p style={legalBodyStyle}>Sondar Logic AI retains all intellectual property rights to the platform, AI models, routing architecture, and dashboard interfaces. The Client retains all rights to their first-party consumer data and the extracted deep-basket business intelligence provided via the platform.</p>

      <h2 style={legalH2Style}>Limitation of Liability</h2>
      <p style={legalBodyStyle}>To the maximum extent permitted by applicable law, Sondar Logic AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising out of or related to the use of the platform. Our total liability for any claims arising under these terms shall be limited to the amount paid by the Client for the specific services giving rise to the claim in the three (3) months preceding the incident.</p>

      <h2 style={legalH2Style}>Governing Law</h2>
      <p style={legalBodyStyle}>These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein.</p>
    </LegalPage>
  );
}

/* ─── ROOT ────────────────────────────────────────────────── */
export default function SondarLogicAI() {
  const [activeView, setActiveView] = useState('home');

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (activeView !== 'home') return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    // Small delay to let DOM settle after view switch
    const t = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    }, 50);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [activeView]);

  if (activeView === 'privacy') return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <PrivacyPolicy onBack={() => { setActiveView('home'); window.scrollTo(0,0); }} />
    </>
  );

  if (activeView === 'terms') return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <TermsOfService onBack={() => { setActiveView('home'); window.scrollTo(0,0); }} />
    </>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="grid-bg" style={{ minHeight: "100vh" }}>
        <Navbar />
        <Hero />
        <CostAnalysis />
        <ThreeSystems />
        <Workflow />
        <CommandCenter />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer setActiveView={setActiveView} />
      </div>
    </>
  );
}