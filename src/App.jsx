import { useState, useEffect, useRef } from "react";
import {
  Check, ArrowRight, Upload, ScanSearch, ShoppingCart,
  Banknote, Shield, Mail, MapPin, TrendingUp, BarChart3,
} from "lucide-react";

/* ─── Constants ───────────────────────────────────────────── */
const CYAN    = "#2DD4BF";
const CYAN_D  = "#0d9488";
const BLUE    = "#0EA5E9";
const S950    = "#020617";
const S900    = "#0f172a";
const S800    = "#1e293b";
const CALENDLY = "https://calendly.com/ahmed_sondarlogic";
const EMAIL    = "partnership@sondarlogic.com";

/* ─── Global CSS ──────────────────────────────────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  body { background: #fff; color: #0f172a; font-family: 'Inter', sans-serif; overflow-x: hidden; }

  .grad-text {
    background: linear-gradient(135deg, ${CYAN} 0%, ${BLUE} 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .grad-text-d {
    background: linear-gradient(135deg, ${CYAN_D} 0%, ${BLUE} 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pdot   { 0%,100% { opacity:1; } 50% { opacity:.35; } }

  .fu  { animation: fadeUp 0.7s ease both; }
  .d1  { animation-delay:.1s; } .d2 { animation-delay:.2s; }
  .d3  { animation-delay:.3s; } .d4 { animation-delay:.4s; }

  .rv  { opacity:0; transform:translateY(22px); transition: opacity .6s ease, transform .6s ease; }
  .rv.on { opacity:1; transform:translateY(0); }
  .td1 { transition-delay:.1s; } .td2 { transition-delay:.2s; } .td3 { transition-delay:.3s; }

  /* Buttons */
  .bp { background:${CYAN_D}; color:#fff; font-weight:700; padding:.75rem 1.75rem; border-radius:.5rem;
        display:inline-flex; align-items:center; gap:.4rem; text-decoration:none;
        font-family:'Inter',sans-serif; font-size:.95rem; white-space:nowrap;
        border:none; cursor:pointer; transition: background .2s, box-shadow .2s, transform .2s; }
  .bp:hover { background:#0f766e; box-shadow:0 0 24px rgba(13,148,136,.4); transform:translateY(-1px); }

  .bo-dark { border:1.5px solid rgba(255,255,255,.22); color:#fff; background:transparent;
             font-weight:600; padding:.7rem 1.4rem; border-radius:.5rem;
             display:inline-flex; align-items:center; gap:.4rem; text-decoration:none;
             font-family:'Inter',sans-serif; font-size:.9rem; white-space:nowrap; cursor:pointer;
             transition:all .2s; }
  .bo-dark:hover { background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.5); }

  .bo-light { border:1.5px solid #e2e8f0; color:#0f172a; background:transparent;
              font-weight:600; padding:.7rem 1.4rem; border-radius:.5rem;
              display:inline-flex; align-items:center; gap:.4rem; text-decoration:none;
              font-family:'Inter',sans-serif; font-size:.9rem; white-space:nowrap; cursor:pointer;
              transition:all .2s; }
  .bo-light:hover { border-color:${CYAN_D}; color:${CYAN_D}; }

  /* Cards */
  .cw { background:#fff; border:1px solid #e2e8f0; border-radius:1rem; padding:1.75rem;
        transition: border-color .25s, box-shadow .25s, transform .25s; }
  .cw:hover { border-color:rgba(13,148,136,.3); box-shadow:0 8px 32px rgba(13,148,136,.07); transform:translateY(-3px); }
  .cd { background:${S800}; border:1px solid rgba(255,255,255,.07); border-radius:1rem; padding:1.75rem;
        transition: border-color .25s, transform .25s; }
  .cd:hover { border-color:rgba(45,212,191,.28); transform:translateY(-3px); }

  /* ROI slider */
  .rs { -webkit-appearance:none; width:100%; height:4px; border-radius:2px; background:#e2e8f0; outline:none; }
  .rs::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%;
    background:${CYAN_D}; cursor:pointer; box-shadow:0 0 0 3px rgba(13,148,136,.2); transition:box-shadow .2s; }
  .rs::-webkit-slider-thumb:hover { box-shadow:0 0 0 6px rgba(13,148,136,.2); }
  .rs::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:${CYAN_D}; cursor:pointer; border:none; }

  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:#f1f5f9; }
  ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:3px; }

  /* Responsive */
  @media (max-width: 768px) {
    .h-mobile { display:none !important; }
    .nav-d    { display:none !important; }
    .g2       { grid-template-columns:1fr !important; gap:2rem !important; }
    .g4       { grid-template-columns:1fr 1fr !important; gap:.875rem !important; }
    .zrow     { grid-template-columns:1fr !important; gap:2rem !important; }
    /* Z-pattern: always text first, visual second on mobile */
    .zrow-text  { order:1 !important; }
    .zrow-visual { order:2 !important; }
    .pcols    { grid-template-columns:1fr !important; }
    .pr-col   { order:1 !important; border-left:none !important; border-top:1px solid rgba(255,255,255,.07) !important; }
    .pl-col   { order:2 !important; }
    .rg       { grid-template-columns:1fr !important; gap:.75rem !important; }
    .ctcols   { grid-template-columns:1fr 72px 82px !important; }
    .hero-h1  { font-size:2.2rem !important; line-height:1.08 !important; }
    .assump-grid { grid-template-columns:1fr !important; }
    /* Pricing tier row: stack label above rate on very small screens */
    .tier-row { flex-direction:column !important; align-items:flex-start !important; gap:.25rem !important; padding:.75rem !important; }
    .tier-rate { font-size:.85rem !important; }
  }
  @media (max-width: 480px) {
    .g4 { grid-template-columns:1fr !important; }
    .wf-card { flex-direction:row !important; gap:1rem !important; align-items:flex-start !important; }
    .wf-icon-row { flex-direction:column !important; align-items:flex-start !important; }
    .assump-grid { grid-template-columns:1fr !important; }
  }
`;

/* ─── Helpers ─────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = [el, ...el.querySelectorAll(".rv")];
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.07 }
    );
    targets.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Pill({ children, dark = false }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: ".4rem",
      padding: ".25rem .9rem", borderRadius: "2rem",
      fontSize: ".67rem", fontWeight: 700, letterSpacing: ".1em", marginBottom: "1rem",
      ...(dark
        ? { background: "rgba(45,212,191,.12)", color: CYAN, border: "1px solid rgba(45,212,191,.25)" }
        : { background: "rgba(13,148,136,.07)", color: CYAN_D, border: "1px solid rgba(13,148,136,.18)" })
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: dark ? CYAN : CYAN_D, animation: "pdot 2s infinite" }} />
      {children}
    </div>
  );
}

/* ─── NAVBAR ──────────────────────────────────────────────── */
function Navbar() {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 64);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: sc ? "rgba(2,6,23,.85)" : "rgba(2,6,23,.6)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: sc ? "1px solid rgba(255,255,255,.07)" : "1px solid transparent",
      transition: "background .35s ease, border-color .35s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem",
      }}>
        {/* Logo — always white on the dark bar */}
        <div style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-.03em", color: "#fff", flexShrink: 0 }}>
          Sondar <span style={{ color: CYAN }}>Logic AI</span>
        </div>

        {/* Desktop links */}
        <div className="nav-d" style={{ display: "flex", gap: "2rem" }}>
          {[
            { l: "How it Works", id: "how-it-works" },
            { l: "Features",     id: "features"     },
            { l: "Pricing",      id: "pricing"      },
            { l: "FAQ",          id: "faq"          },
          ].map(n => (
            <a key={n.l} href={`#${n.id}`}
              style={{ color: "rgba(255,255,255,.65)", textDecoration: "none",
                fontSize: ".9rem", fontWeight: 500, transition: "color .2s", whiteSpace: "nowrap" }}
              onClick={e => { e.preventDefault(); document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth" }); }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.65)"}>
              {n.l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="bp"
          style={{ padding: ".5rem 1.2rem", fontSize: ".85rem", flexShrink: 0 }}>
          Book a Demo
        </a>
      </div>
    </nav>
  );
}

/* ─── HERO ────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ background: S950, paddingTop: "7rem", paddingBottom: "5rem",
      position: "relative", overflow: "hidden", textAlign: "center" }}>
      {/* Radial spotlight */}
      <div style={{ position: "absolute", top: "38%", left: "50%",
        transform: "translate(-50%,-50%)", width: 720, height: 420,
        background: "radial-gradient(ellipse, rgba(45,212,191,.18) 0%, transparent 65%)",
        filter: "blur(72px)", borderRadius: "50%", pointerEvents: "none" }} />
      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
        backgroundSize: "48px 48px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 840, margin: "0 auto", padding: "0 2rem", position: "relative" }}>
        <div className="fu" style={{ display: "flex", justifyContent: "center" }}>
          <Pill dark>ENTERPRISE REBATE PROCESSING · CANADA</Pill>
        </div>

        <h1 className="hero-h1 fu d1" style={{
          fontSize: "clamp(2.6rem, 5.5vw, 4.25rem)", fontWeight: 900,
          lineHeight: 1.09, letterSpacing: "-.045em", color: "#fff", marginBottom: "1.25rem" }}>
          Enterprise Rebate Processing.<br />
          <span className="grad-text">As low as $0.35 per claim.</span>
        </h1>

        <p className="fu d2" style={{ color: "rgba(255,255,255,.5)", fontSize: "1.05rem",
          lineHeight: 1.75, maxWidth: 560, margin: "0 auto 2.5rem" }}>
          Our Vision AI validates claims instantly, extracts full basket intelligence,
          and maps retailer performance across Canada. Zero setup fees. Zero hidden costs.
        </p>

        <div className="fu d3" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="bp"
            style={{ fontSize: "1rem", padding: ".875rem 2rem" }}>
            Book a Demo <ArrowRight size={17} />
          </a>
          <a href={`mailto:${EMAIL}`} className="bo-dark">
            <Mail size={15} /> Email Us
          </a>
        </div>

        {/* Stats bar */}
        <div className="fu d4" style={{ marginTop: "3.5rem",
          display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
          {[
            { v: "$0.35", l: "per claim at 50k+" },
            { v: "97%+",  l: "audit accuracy" },
            { v: "$0",    l: "exception fees" },
            { v: "< 3s",  l: "processing time" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: CYAN,
                letterSpacing: "-.04em", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: ".73rem", color: "rgba(255,255,255,.35)",
                marginTop: ".25rem", letterSpacing: ".04em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WORKFLOW ────────────────────────────────────────────── */
function Workflow() {
  const ref = useReveal();
  const steps = [
    {
      icon: <Upload size={22} strokeWidth={1.75} color={CYAN_D} />,
      num: "01", title: "Instant Ingestion",
      bullets: ["Real-time queueing", "Infinite volume scalability"],
    },
    {
      icon: <ScanSearch size={22} strokeWidth={1.75} color={CYAN_D} />,
      num: "02", title: "Confidence Filter",
      bullets: ["AI accuracy scoring", "Instant fraud & Photoshop detection"],
    },
    {
      icon: <ShoppingCart size={22} strokeWidth={1.75} color={CYAN_D} />,
      num: "03", title: "Basket Extraction",
      bullets: ["Full competitor brand parsing", "Item-level intelligence"],
    },
    {
      icon: <Banknote size={22} strokeWidth={1.75} color={CYAN_D} />,
      num: "04", title: "Payout Execution",
      bullets: ["Instant Visa Gift Card disbursements", "Custom payout cadence"],
    },
  ];

  return (
    <section id="how-it-works" style={{ background: "#fff", padding: "5rem 0" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
        <div className="rv" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <Pill>THE WORKFLOW</Pill>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)", fontWeight: 800,
            letterSpacing: "-.035em", color: S900, marginBottom: ".75rem" }}>
            From receipt to payout in under 3 seconds.
          </h2>
          <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            Four automated stages. Zero manual handoffs on compliant claims.
          </p>
        </div>

        <div className="rv td1 g4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ position: "relative" }}>
              {i < 3 && (
                <div className="h-mobile" style={{ position: "absolute", top: "2.4rem",
                  right: "-.625rem", width: "1.25rem", height: 1, background: "#e2e8f0", zIndex: 1 }} />
              )}
              <div className="cw wf-card" style={{ height: "100%", display: "flex", flexDirection: "column", gap: ".875rem" }}>
                <div className="wf-icon-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ width: 44, height: 44, borderRadius: ".625rem", flexShrink: 0,
                    background: "rgba(13,148,136,.07)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(13,148,136,.15)" }}>{s.icon}</div>
                  <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "#f1f5f9",
                    letterSpacing: "-.05em" }}>{s.num}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: ".93rem", fontWeight: 700, color: S900,
                    marginBottom: ".5rem", letterSpacing: "-.02em" }}>{s.title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".3rem" }}>
                    {s.bullets.map((b, j) => (
                      <div key={j} style={{ display: "flex", gap: ".45rem", alignItems: "center" }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%",
                          background: CYAN_D, flexShrink: 0 }} />
                        <span style={{ fontSize: ".8rem", color: "#64748b", lineHeight: 1.5 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rv td2" style={{ marginTop: "2rem",
          background: "rgba(13,148,136,.05)", border: "1px solid rgba(13,148,136,.15)",
          borderRadius: ".875rem", padding: "1rem 1.5rem",
          display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%",
            background: CYAN_D, flexShrink: 0, marginTop: 6 }} />
          <p style={{ color: "#475569", fontSize: ".86rem", lineHeight: 1.65 }}>
            <span style={{ color: CYAN_D, fontWeight: 700 }}>Edge Case Handling: </span>
            Claims scoring below the required confidence threshold are never auto-denied. They enter a secure human review queue with a 3-business day audit SLA and automated customer follow-up.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── NATIVE UI VISUALS ───────────────────────────────────── */

/* Dashboard mockup for Deep Basket */
function BasketMockup() {
  const bars = [85, 62, 40, 55, 100, 78, 30, 45, 22];
  const provs = ["BC","AB","SK","MB","ON","QC","NB","NS","NL"];
  return (
    <div style={{ background: S900, borderRadius: "1.125rem", padding: "1.5rem",
      border: "1px solid rgba(255,255,255,.07)",
      boxShadow: "0 24px 64px rgba(0,0,0,.28)" }}>
      <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "1.25rem" }}>
        <span style={{ fontSize: ".68rem", fontWeight: 700, color: CYAN,
          letterSpacing: ".1em" }}>COMMAND CENTER</span>
        <div style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%",
            background: "#22c55e", animation: "pdot 2s infinite" }} />
          <span style={{ fontSize: ".62rem", color: "#22c55e", fontWeight: 600 }}>LIVE</span>
        </div>
      </div>
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        gap: ".6rem", marginBottom: "1.25rem" }}>
        {[
          { l: "Claims Today",  v: "4,217" },
          { l: "CAD Disbursed", v: "$186K"  },
          { l: "Fraud Blocked", v: "$31.4K" },
        ].map((k, i) => (
          <div key={i} style={{ background: S800, borderRadius: ".6rem",
            padding: ".75rem", border: "1px solid rgba(255,255,255,.05)" }}>
            <div style={{ fontSize: ".56rem", color: "#475569",
              letterSpacing: ".06em", marginBottom: ".3rem" }}>{k.l}</div>
            <div style={{ fontSize: "1.05rem", fontWeight: 800,
              color: "#fff", letterSpacing: "-.03em", lineHeight: 1 }}>{k.v}</div>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div style={{ background: S800, borderRadius: ".6rem", padding: ".875rem",
        border: "1px solid rgba(255,255,255,.05)", marginBottom: ".75rem" }}>
        <div style={{ fontSize: ".56rem", color: "#475569",
          letterSpacing: ".08em", marginBottom: ".6rem" }}>PROVINCIAL PAYOUT VOLUME</div>
        <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: 50 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex",
              flexDirection: "column", alignItems: "center", gap: "3px" }}>
              <div style={{ width: "100%", height: `${h * .5}%`,
                background: `linear-gradient(to top, ${CYAN_D}, ${BLUE})`,
                borderRadius: "2px 2px 0 0", opacity: .85 }} />
              <span style={{ fontSize: ".42rem", color: "#334155" }}>{provs[i]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Competitor basket */}
      <div style={{ background: S800, borderRadius: ".6rem", padding: ".875rem",
        border: "1px solid rgba(255,255,255,.05)" }}>
        <div style={{ fontSize: ".56rem", color: "#475569",
          letterSpacing: ".08em", marginBottom: ".6rem" }}>COMPETITOR BASKET SHARE</div>
        {[
          { b: "Competitor A", pct: 38 },
          { b: "Competitor B", pct: 24 },
          { b: "Other",        pct: 18 },
        ].map((r, i) => (
          <div key={i} style={{ marginBottom: i < 2 ? ".5rem" : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between",
              marginBottom: ".18rem" }}>
              <span style={{ fontSize: ".6rem", color: "#94a3b8" }}>{r.b}</span>
              <span style={{ fontSize: ".6rem", color: "#e2e8f0", fontWeight: 600 }}>{r.pct}%</span>
            </div>
            <div style={{ height: 4, background: "#334155", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${r.pct}%`,
                background: `linear-gradient(90deg, ${CYAN_D}, ${BLUE})`, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Fraud card mockup */
function FraudMockup() {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0",
      borderRadius: "1.125rem", padding: "1.75rem",
      boxShadow: "0 8px 40px rgba(0,0,0,.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: "1.5rem" }}>
        <Shield size={17} color={CYAN_D} />
        <span style={{ fontSize: ".68rem", fontWeight: 700, color: CYAN_D,
          letterSpacing: ".08em" }}>FRAUD INTELLIGENCE LAYER</span>
      </div>
      {[
        { l: "Photoshop / Canva Detection", r: "BLOCKED",  n: "1,204", ok: false },
        { l: "Duplicate Receipt Flag",      r: "BLOCKED",  n: "842",   ok: false },
        { l: "Date Manipulation",           r: "FLAGGED",  n: "317",   ok: null  },
        { l: "Valid — High Confidence",     r: "CLEARED",  n: "41,887",ok: true  },
      ].map((row, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: ".65rem 0",
          borderBottom: i < 3 ? "1px solid #f1f5f9" : "none" }}>
          <span style={{ fontSize: ".84rem", color: "#475569" }}>{row.l}</span>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <span style={{ fontSize: ".78rem", fontWeight: 700, color: S900 }}>{row.n}</span>
            <span style={{
              fontSize: ".58rem", fontWeight: 700, letterSpacing: ".06em",
              padding: ".14rem .5rem", borderRadius: ".25rem",
              color: row.ok === true ? "#16a34a" : row.ok === null ? "#d97706" : "#dc2626",
              background: row.ok === true ? "#f0fdf4" : row.ok === null ? "#fffbeb" : "#fef2f2",
            }}>{row.r}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Provincial Heatmap — grid-based with SVG Canada outline */
function MapMockup() {
  // Provinces with relative positions on a simplified Canada grid
  // Grid is 10 cols × 5 rows; col/row are 0-indexed
  const provinces = [
    { id: "YT",  col: 1, row: 0, heat: 0.15, v: "$4K"   },
    { id: "NT",  col: 2, row: 0, heat: 0.20, v: "$6K"   },
    { id: "NU",  col: 4, row: 0, heat: 0.10, v: "$3K"   },
    { id: "BC",  col: 1, row: 1, heat: 0.72, v: "$41K"  },
    { id: "AB",  col: 2, row: 1, heat: 0.55, v: "$29K"  },
    { id: "SK",  col: 3, row: 1, heat: 0.38, v: "$18K"  },
    { id: "MB",  col: 4, row: 1, heat: 0.42, v: "$22K"  },
    { id: "ON",  col: 5, row: 1, heat: 1.00, v: "$94K"  },
    { id: "QC",  col: 6, row: 1, heat: 0.78, v: "$67K"  },
    { id: "NB",  col: 7, row: 2, heat: 0.28, v: "$12K"  },
    { id: "NS",  col: 8, row: 2, heat: 0.26, v: "$11K"  },
    { id: "PE",  col: 9, row: 2, heat: 0.14, v: "$5K"   },
    { id: "NL",  col: 8, row: 1, heat: 0.22, v: "$9K"   },
  ];

  function heatColor(h) {
    // 0 = dark slate, 1 = bright cyan
    const r = Math.round(13 + h * (45 - 13));
    const g = Math.round(148 + h * (212 - 148));
    const b = Math.round(136 + h * (191 - 136));
    return `rgba(${r},${g},${b},${0.15 + h * 0.75})`;
  }

  const CELL = 38; // px per cell
  const COLS = 10;
  const ROWS = 4;

  return (
    <div style={{ background: S900, borderRadius: "1.125rem", padding: "1.25rem",
      border: "1px solid rgba(255,255,255,.07)", boxShadow: "0 24px 64px rgba(0,0,0,.28)" }}>
      <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: ".875rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
          <MapPin size={13} color={CYAN} />
          <span style={{ fontSize: ".65rem", fontWeight: 700, color: CYAN, letterSpacing: ".1em" }}>
            PROVINCIAL PAYOUT HEATMAP
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".35rem" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", animation: "pdot 2s infinite" }} />
          <span style={{ fontSize: ".58rem", color: "#22c55e", fontWeight: 600 }}>LIVE</span>
        </div>
      </div>

      {/* Heatmap grid */}
      <div style={{ position: "relative", height: ROWS * CELL + 8,
        marginBottom: ".875rem", overflowX: "auto" }}>
        {/* Grid background cells */}
        {Array.from({ length: ROWS }, (_, row) =>
          Array.from({ length: COLS }, (_, col) => (
            <div key={`${row}-${col}`} style={{
              position: "absolute",
              left: col * CELL, top: row * CELL,
              width: CELL - 2, height: CELL - 2,
              borderRadius: "4px",
              background: "rgba(255,255,255,.02)",
              border: "1px solid rgba(255,255,255,.03)",
            }} />
          ))
        )}
        {/* Province heat cells */}
        {provinces.map((p, i) => (
          <div key={i} style={{
            position: "absolute",
            left: p.col * CELL, top: p.row * CELL,
            width: CELL - 2, height: CELL - 2,
            borderRadius: "4px",
            background: heatColor(p.heat),
            border: `1px solid rgba(45,212,191,${p.heat * 0.4 + 0.08})`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "1px",
            cursor: "default",
            boxShadow: p.heat > 0.7 ? `0 0 ${Math.round(p.heat * 14)}px rgba(45,212,191,${p.heat * 0.35})` : "none",
            transition: "box-shadow .2s",
          }}>
            <span style={{ fontSize: ".5rem", fontWeight: 800, color: "#fff",
              letterSpacing: ".02em", textShadow: "0 1px 2px rgba(0,0,0,.5)" }}>{p.id}</span>
            <span style={{ fontSize: ".42rem", color: "rgba(255,255,255,.6)",
              fontWeight: 600 }}>{p.v}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".875rem" }}>
        <span style={{ fontSize: ".6rem", color: "#475569" }}>Low</span>
        <div style={{ flex: 1, height: 4, borderRadius: 2,
          background: `linear-gradient(90deg, rgba(13,148,136,.2), ${CYAN_D}, ${CYAN})` }} />
        <span style={{ fontSize: ".6rem", color: "#475569" }}>High</span>
      </div>

      {/* Top retailer callouts */}
      {[
        { name: "Canadian Tire", region: "National",     v: "$214K", trend: "+8.4%" },
        { name: "NAPA Auto",     region: "Western",      v: "$98K",  trend: "+12%" },
        { name: "Costco",        region: "ON & QC",      v: "$187K", trend: "+6.1%" },
      ].map((r, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: ".45rem 0",
          borderTop: "1px solid rgba(255,255,255,.04)" }}>
          <div>
            <span style={{ fontSize: ".75rem", color: "#e2e8f0", fontWeight: 600 }}>{r.name}</span>
            <span style={{ fontSize: ".68rem", color: "#475569", marginLeft: ".35rem" }}>{r.region}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
            <span style={{ fontSize: ".78rem", fontWeight: 700, color: "#fff" }}>{r.v}</span>
            <span style={{ fontSize: ".62rem", color: "#22c55e", fontWeight: 600 }}>{r.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── COMMAND CENTER (Z-Pattern) ──────────────────────────── */
function CommandCenter() {
  const ref = useReveal();

  const zRows = [
    {
      textLeft: true,
      pill: "DEEP BASKET EXTRACTION",
      title: "See every item in the cart, not just yours.",
      bullets: [
        "Our Vision AI reads the full receipt: competitor brands, SKUs, and basket totals extracted per claim",
        "Understand what else your customers buy alongside your product at no extra cost — it's included in your platform fee",
      ],
      visual: <BasketMockup />,
    },
    {
      textLeft: false,
      pill: "FRAUD INTELLIGENCE",
      title: "Every deceptive submission blocked before payout.",
      bullets: [
        "Our Vision AI detects Photoshop edits, Canva templates, duplicate receipts, and screenshot fraud in real time",
        "$0 exception fees on rejected or flagged claims — fraud costs you nothing extra",
      ],
      visual: <FraudMockup />,
    },
    {
      textLeft: true,
      pill: "MARKET INTELLIGENCE AND RETAILER MAPPING",
      title: "Know exactly where your product is selling.",
      bullets: [
        "Track claim volume from coast to coast with postal code precision, updated live by retailer",
        "Canada based secure payment partner handles all CAD disbursements automatically",
      ],
      visual: <MapMockup />,
    },
  ];

  return (
    <section id="features" style={{ background: "#f8fafc", padding: "5rem 0" }}>
      <div ref={ref} style={{ maxWidth: 1120, margin: "0 auto", padding: "0 2rem" }}>
        <div className="rv" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <Pill>PLATFORM CAPABILITIES</Pill>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)", fontWeight: 800,
            letterSpacing: "-.035em", color: S900, marginBottom: ".75rem" }}>
            Built to replace your entire rebate ops stack.
          </h2>
          <p style={{ color: "#64748b", fontSize: "1rem",
            maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Three core engines. One flat platform fee.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
          {zRows.map((row, i) => (
            <div key={i} className={`rv td${i + 1} zrow`}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
              <div className="zrow-text" style={{ order: row.textLeft ? 1 : 2 }}>
                <Pill>{row.pill}</Pill>
                <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800,
                  letterSpacing: "-.03em", color: S900, marginBottom: "1.25rem", lineHeight: 1.2 }}>
                  {row.title}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: ".875rem" }}>
                  {row.bullets.map((b, j) => (
                    <div key={j} style={{ display: "flex", gap: ".65rem", alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%",
                        background: CYAN_D, flexShrink: 0, marginTop: 7 }} />
                      <span style={{ fontSize: ".93rem", color: "#475569", lineHeight: 1.65 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="zrow-visual" style={{ order: row.textLeft ? 2 : 1 }}>{row.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ─────────────────────────────────────────────── */
function Pricing() {
  const ref = useReveal();

  const pilotFeatures = [
    { text: "No long-term commitment (5k–10k claims)" },
    { text: "Full SKU + Competitor basket extraction" },
    { text: "Live Looker Studio geographic heatmaps" },
    { text: "Automated CAD payouts (Visa/e-Transfer)" },
    { text: "Zero-risk testing period" },
  ];

  const msaFeatures = [
    { text: "Annual MSA & Dedicated Infrastructure" },
    { text: "Unlimited data extraction (No per field tolls)" },
    { text: "Custom SLAs & Priority Support" },
    { text: "Unified data warehouse (ERP/Accounting export)" },
    { text: "Volume-scaled processing discounts" },
    { text: "Human in the loop exception handling" },
  ];

  const tierRows = [
    { l: "First 10,000 claims",  r: "$0.55", best: false },
    { l: "Claims 10,001–50,000", r: "$0.45", best: false },
    { l: "Claims 50,001+",        r: "$0.35", best: true  },
  ];

  return (
    <section id="pricing" style={{ background: S950, padding: "5rem 0" }}>
      <div ref={ref} style={{ maxWidth: 1060, margin: "0 auto", padding: "0 2rem" }}>
        <div className="rv" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Pill dark>PRICING</Pill>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)", fontWeight: 800,
            letterSpacing: "-.035em", color: "#fff", marginBottom: ".75rem" }}>
            Pricing that scales with you. Zero exception penalties.
          </h2>
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: "1rem",
            maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            Start with a single campaign or go all-in with an enterprise agreement. Either way, you get the full platform.
          </p>
        </div>

        {/* Two-card grid */}
        <div className="rv td1 pcols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

          {/* ── Card 1: Single Campaign Pilot ── */}
          <div style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: "1.25rem",
            background: S900, display: "flex", flexDirection: "column",
            boxShadow: "0 16px 48px rgba(0,0,0,.4)", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "2rem 2rem 1.5rem" }}>
              <div style={{ fontSize: ".6rem", color: "#475569", fontWeight: 700,
                letterSpacing: ".1em", marginBottom: ".75rem" }}>SINGLE CAMPAIGN PILOT</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: ".35rem", marginBottom: ".3rem" }}>
                <span style={{ fontSize: "2rem", fontWeight: 900, color: "#fff",
                  letterSpacing: "-.05em", lineHeight: 1 }}>$0</span>
                <span style={{ fontSize: ".85rem", color: "#64748b" }}>platform fee</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: ".35rem", marginBottom: ".75rem" }}>
                <span style={{ fontSize: "1.35rem", fontWeight: 800, color: CYAN,
                  letterSpacing: "-.04em" }}>$0.65</span>
                <span style={{ fontSize: ".82rem", color: "#64748b" }}>per processed claim</span>
              </div>
              <p style={{ fontSize: ".82rem", color: "#64748b", lineHeight: 1.6 }}>
                Perfect for testing Sondar Logic alongside your current vendor.
              </p>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,.06)" }} />
            {/* Features */}
            <div style={{ padding: "1.5rem 2rem", flex: 1, display: "flex", flexDirection: "column", gap: ".75rem" }}>
              {pilotFeatures.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: ".6rem", alignItems: "flex-start" }}>
                  <Check size={13} color={CYAN} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: ".83rem", color: "#94a3b8", lineHeight: 1.5 }}>{f.text}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "1.5rem 2rem" }}>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="bp"
                style={{ display: "flex", justifyContent: "center", width: "100%",
                  padding: ".8rem", fontSize: ".92rem", background: S800,
                  border: "1px solid rgba(255,255,255,.1)", color: "#e2e8f0" }}
                onMouseEnter={e => e.currentTarget.style.background = "#334155"}
                onMouseLeave={e => e.currentTarget.style.background = S800}>
                Request Pilot Access <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* ── Card 2: Enterprise MSA ── */}
          <div style={{ border: `1.5px solid rgba(45,212,191,.35)`, borderRadius: "1.25rem",
            background: S800, display: "flex", flexDirection: "column",
            boxShadow: "0 0 60px rgba(45,212,191,.08), 0 24px 64px rgba(0,0,0,.5)", overflow: "hidden",
            position: "relative" }}>
            {/* Glow */}
            <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240,
              background: "radial-gradient(circle, rgba(45,212,191,.1) 0%, transparent 70%)",
              pointerEvents: "none" }} />
            {/* Header */}
            <div style={{ padding: "2rem 2rem 1.5rem" }}>
              <div style={{ fontSize: ".6rem", color: "rgba(45,212,191,.7)", fontWeight: 700,
                letterSpacing: ".1em", marginBottom: ".75rem" }}>ENTERPRISE MSA</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: ".35rem", marginBottom: ".3rem" }}>
                <span style={{ fontSize: "2rem", fontWeight: 900, color: "#fff",
                  letterSpacing: "-.05em", lineHeight: 1 }}>$1,500</span>
                <span style={{ fontSize: ".85rem", color: "#64748b" }}>per month</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".75rem" }}>
                <span style={{ fontSize: ".9rem", fontWeight: 700, color: CYAN }}>
                  Volume tiered processing
                </span>
                <span style={{ fontSize: ".75rem", color: "#475569" }}>as low as $0.35/claim</span>
              </div>
              <p style={{ fontSize: ".82rem", color: "#94a3b8", lineHeight: 1.6 }}>
                Built for national rollouts and constant promotional volume.
              </p>
            </div>
            {/* Tier table */}
            <div style={{ margin: "0 2rem", border: "1px solid rgba(45,212,191,.15)",
              borderRadius: ".75rem", overflow: "hidden", marginBottom: "1.25rem" }}>
              {tierRows.map((t, i) => (
                <div key={i} className="tier-row" style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: ".6rem .875rem",
                  background: t.best ? "rgba(45,212,191,.07)" : "transparent",
                  borderBottom: i < 2 ? "1px solid rgba(45,212,191,.08)" : "none" }}>
                  <span style={{ fontSize: ".8rem", color: t.best ? "#e2e8f0" : "#64748b",
                    whiteSpace: "nowrap" }}>{t.l}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: ".4rem", flexShrink: 0 }}>
                    {t.best && (
                      <span style={{ fontSize: ".5rem", fontWeight: 700, color: S950,
                        background: CYAN, padding: ".1rem .38rem",
                        borderRadius: "2rem", letterSpacing: ".05em", whiteSpace: "nowrap" }}>BEST</span>
                    )}
                    <span className="tier-rate" style={{ fontSize: ".85rem", fontWeight: 700,
                      color: t.best ? CYAN : "#475569",
                      letterSpacing: "-.02em", whiteSpace: "nowrap" }}>{t.r}/claim</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,.06)", margin: "0 0 0 0" }} />
            {/* Features */}
            <div style={{ padding: "1.25rem 2rem", flex: 1, display: "flex", flexDirection: "column", gap: ".75rem" }}>
              {msaFeatures.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: ".6rem", alignItems: "flex-start" }}>
                  <Check size={13} color={CYAN} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: ".83rem", color: "#94a3b8", lineHeight: 1.5 }}>{f.text}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "1.5rem 2rem" }}>
              <button onClick={() => document.getElementById("roi-calculator")?.scrollIntoView({ behavior: "smooth" })}
                className="bp"
                style={{ display: "flex", justifyContent: "center", width: "100%",
                  padding: ".8rem", fontSize: ".92rem", cursor: "pointer" }}>
                Build Your Enterprise MSA <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ANATOMY OF A CLAIM (dark card) ─────────────────────── */
function ClaimBreakdown() {
  const ref = useReveal();

  const rows = [
    { l: "Base Verification & Entry",  lg: "$0.85",     s: { v: "INCLUDED" } },
    { l: "Bank Clearing",              lg: "$0.35",     s: { v: "INCLUDED" } },
    { l: "Data Capture",               lg: "$0.08",     s: { v: "INCLUDED" } },
    { l: "Inquiries & Support Calls",  lg: "$4.75",     s: { v: "INCLUDED" } },
    { l: "Non-Compliance Rejects",     lg: "$1.50",     s: { v: "INCLUDED" } },
    { l: "Manual Email Lookups",       lg: "$2.00",     s: { v: "INCLUDED" } },
    { l: "Campaign Admin Fee",         lg: "$170 flat", s: { v: "INCLUDED" } },
  ];

  const sondarOnly = [
    { l: "Platform Fee (Enterprise MSA)", v: "$1,500 /mo" },
    { l: "Volume Tier Rate",               v: "$0.35–$0.55" },
  ];

  // Unified green style for all Sondar column values
  const sondarPill = {
    fontSize: ".8rem", fontWeight: 700,
    color: "#20B2AA",
    background: "rgba(32,178,170,.09)",
    border: "1px solid rgba(32,178,170,.28)",
    padding: ".14rem .48rem", borderRadius: ".3rem", display: "inline-block",
  };

  const CH = {
    fontSize: ".58rem", fontWeight: 700, letterSpacing: ".1em",
    color: "#475569", padding: ".7rem 1rem",
    background: "rgba(255,255,255,.03)", borderBottom: "1px solid rgba(255,255,255,.06)",
  };

  return (
    <section style={{ background: S950, padding: "5rem 0" }}>
      <div ref={ref} style={{ maxWidth: 840, margin: "0 auto", padding: "0 2rem" }}>
        <div className="rv" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Pill dark>COST BREAKDOWN</Pill>
          <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)", fontWeight: 800,
            letterSpacing: "-.035em", color: "#fff", marginBottom: ".6rem" }}>
            The Anatomy of a Claim
          </h2>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: ".93rem",
            maxWidth: 460, margin: "0 auto" }}>
            Where legacy processors hide fees — and what Sondar absorbs in its platform rate.
          </p>
        </div>

        <div className="rv td1" style={{ background: S900,
          border: "1px solid rgba(255,255,255,.07)", borderRadius: "1.125rem",
          overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,.45)" }}>

          {/* Header row */}
          <div className="ctcols" style={{ display: "grid",
            gridTemplateColumns: "1fr 110px 120px" }}>
            <div style={{ ...CH }}>COST LINE ITEM</div>
            <div style={{ ...CH, textAlign: "center", color: "#ef4444" }}>LEGACY</div>
            <div style={{ ...CH, textAlign: "center", color: CYAN }}>SONDAR</div>
          </div>

          {/* Data rows */}
          {rows.map((r, i) => (
            <div key={i} className="ctcols" style={{ display: "grid",
              gridTemplateColumns: "1fr 110px 120px",
              borderBottom: "1px solid rgba(255,255,255,.04)" }}>
              <div style={{ padding: ".6rem 1rem" }}>
                <span style={{ fontSize: ".83rem", color: "#cbd5e1", fontWeight: 500 }}>{r.l}</span>
              </div>
              <div style={{ padding: ".6rem .5rem", display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: ".85rem", fontWeight: 700,
                  color: "#ef4444" }}>{r.lg}</span>
              </div>
              <div style={{ padding: ".6rem .5rem", display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                <span style={sondarPill}>{r.s.v}</span>
              </div>
            </div>
          ))}

          {/* Sondar only costs */}
          <div style={{ background: "rgba(45,212,191,.04)",
            borderTop: "1px solid rgba(45,212,191,.12)" }}>
            <div style={{ padding: ".4rem 1rem .2rem" }}>
              <span style={{ fontSize: ".56rem", fontWeight: 700,
                color: CYAN, letterSpacing: ".1em" }}>SONDAR ONLY COSTS</span>
            </div>
            {sondarOnly.map((r, i) => (
              <div key={i} className="ctcols" style={{ display: "grid",
                gridTemplateColumns: "1fr 110px 120px",
                borderTop: "1px solid rgba(45,212,191,.07)" }}>
                <div style={{ padding: ".5rem 1rem" }}>
                  <span style={{ fontSize: ".83rem", color: "#94a3b8" }}>{r.l}</span>
                </div>
                <div style={{ padding: ".5rem .5rem", display: "flex",
                  alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: ".82rem", color: "#334155" }}>—</span>
                </div>
                <div style={{ padding: ".5rem .5rem", display: "flex",
                  alignItems: "center", justifyContent: "center" }}>
                  <span style={sondarPill}>{r.v}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: ".6rem 1rem",
            borderTop: "1px solid rgba(255,255,255,.04)", textAlign: "center" }}>
            <span style={{ fontSize: ".68rem", color: "#334155" }}>
              Postage and fulfillment costs omitted for a conservative baseline comparison.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ROI CALCULATOR ──────────────────────────────────────── */
function ROICalculator() {
  const ref = useReveal();
  const [volume, setVolume] = useState(30000);
  const [assumOpen, setAssumOpen] = useState(false);
  const [tipVisible, setTipVisible] = useState(false);

  // Legacy math
  const adminFee      = 170;
  const baseEntry     = volume * 0.85;
  const bankClearing  = volume * 0.35;
  const fieldCapture  = volume * 0.08;           // 100% of claims, 1 custom field
  const supportCalls  = volume * 0.05 * 4.75;
  const nonCompliance = volume * 0.10 * 1.50;
  const emailLookups  = volume * 0.05 * 2.00;
  const legacyTotal   = adminFee + baseEntry + bankClearing + fieldCapture + supportCalls + nonCompliance + emailLookups;

  // Sondar math — Enterprise MSA: $1,500 base + volume tiers
  let sv = 0;
  if (volume <= 10000) sv = volume * 0.55;
  else if (volume <= 50000) sv = 5500 + (volume - 10000) * 0.45;
  else sv = 5500 + 18000 + (volume - 50000) * 0.35;
  const sondarTotal = 1500 + sv;

  const savings  = legacyTotal - sondarTotal;
  const pct      = Math.max(0, (savings / legacyTotal) * 100).toFixed(0);
  const fmt      = n => "$" + Math.round(n).toLocaleString();
  const sliderW  = `${((volume - 10000) / 90000) * 100}%`;

  const assumptions = [
    { l: "Base Verification",                          r: "$0.85 per claim" },
    { l: "Bank Clearing",                              r: "$0.35 per claim" },
    { l: "Data Capture ($0.08 x 1 custom field per claim)", r: "$0.08 per claim" },
    { l: "Inquiries & Support",                        r: "5% of volume × $4.75" },
    { l: "Non-Compliance Rejects",                     r: "10% of volume × $1.50" },
    { l: "Manual Email Lookups",                       r: "5% of volume × $2.00" },
    { l: "Campaign Admin Fee",                         r: "$170 flat / month" },
  ];

  return (
    <section id="roi-calculator" style={{ background: S950, padding: "5rem 0", borderTop: "1px solid rgba(255,255,255,.04)" }}>
      <div ref={ref} style={{ maxWidth: 780, margin: "0 auto", padding: "0 2rem" }}>
        <div className="rv" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Pill dark>ROI CALCULATOR</Pill>
          <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)", fontWeight: 800,
            letterSpacing: "-.035em", color: "#fff", marginBottom: ".5rem" }}>
            See your savings in real time.
          </h2>
          <p style={{ color: "#94a3b8", fontSize: ".93rem" }}>
            Drag the slider to match your monthly claim volume. Reflects Enterprise MSA pricing.
          </p>
        </div>

        <div className="rv td1" style={{ background: S900,
          border: "1px solid rgba(255,255,255,.07)", borderRadius: "1.25rem", padding: "2rem",
          boxShadow: "0 32px 80px rgba(0,0,0,.4)" }}>

          {/* Volume display */}
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: ".58rem", color: "#475569", fontWeight: 700,
              letterSpacing: ".1em", marginBottom: ".4rem" }}>MONTHLY CLAIMS</div>
            <div style={{ fontSize: "clamp(2.2rem, 6vw, 3.25rem)", fontWeight: 900,
              color: "#fff", letterSpacing: "-.06em", lineHeight: 1 }}>
              {volume.toLocaleString()}
            </div>
          </div>

          {/* Slider */}
          <div style={{ marginBottom: "2rem", position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: 0, height: 4,
              width: sliderW, background: `linear-gradient(90deg, ${CYAN_D}, ${BLUE})`,
              borderRadius: 2, transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1 }} />
            <input type="range" min={10000} max={100000} step={1000} value={volume}
              onChange={e => setVolume(+e.target.value)}
              className="rs" style={{ position: "relative", zIndex: 2 }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".35rem" }}>
              <span style={{ fontSize: ".7rem", color: "#475569" }}>10,000</span>
              <span style={{ fontSize: ".7rem", color: "#475569" }}>100,000</span>
            </div>
          </div>

          {/* Result cards */}
          <div className="rg" style={{ display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { lbl: "LEGACY COST",  val: fmt(legacyTotal), sub: "est. per month",
                col: "#ef4444", bg: "rgba(239,68,68,.07)", bd: "rgba(239,68,68,.2)", info: true },
              { lbl: "SONDAR COST",  val: fmt(sondarTotal), sub: "Enterprise MSA",
                col: CYAN, bg: "rgba(45,212,191,.06)", bd: "rgba(45,212,191,.2)", info: false },
              { lbl: "YOU SAVE",     val: fmt(savings),     sub: `${pct}% reduction`,
                col: "#22c55e", bg: "rgba(34,197,94,.06)", bd: "rgba(34,197,94,.2)", info: false },
            ].map((c, i) => (
              <div key={i} style={{ background: c.bg, border: `1px solid ${c.bd}`,
                borderRadius: ".875rem", padding: "1.1rem", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".35rem", marginBottom: ".4rem" }}>
                  <span style={{ fontSize: ".58rem", color: c.col, fontWeight: 700, letterSpacing: ".08em" }}>{c.lbl}</span>
                  {c.info && (
                    <div style={{ position: "relative", display: "inline-flex" }}
                      onMouseEnter={() => setTipVisible(true)}
                      onMouseLeave={() => setTipVisible(false)}>
                      <span style={{ width: 14, height: 14, borderRadius: "50%",
                        border: `1px solid ${c.col}`, color: c.col, fontSize: ".52rem",
                        fontWeight: 700, display: "inline-flex", alignItems: "center",
                        justifyContent: "center", cursor: "default", opacity: .75,
                        lineHeight: 1 }}>i</span>
                      {tipVisible && (
                        <div style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
                          transform: "translateX(-50%)", width: 220,
                          background: S800, border: "1px solid rgba(255,255,255,.1)",
                          borderRadius: ".5rem", padding: ".6rem .75rem",
                          fontSize: ".72rem", color: "#94a3b8", lineHeight: 1.5,
                          whiteSpace: "normal", zIndex: 10, textAlign: "left",
                          boxShadow: "0 8px 24px rgba(0,0,0,.4)" }}>
                          Legacy costs represent industry standard manual processing fees, bank clearing, and support overhead.
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.7rem)", fontWeight: 900,
                  color: c.col, letterSpacing: "-.04em", lineHeight: 1 }}>{c.val}</div>
                <div style={{ fontSize: ".68rem", color: "#94a3b8", marginTop: ".3rem" }}>{c.sub}</div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p style={{ textAlign: "center", color: "#94a3b8", fontSize: ".7rem", marginBottom: "1.25rem" }}>
            Calculation omits payout fulfillment costs (postage/e-transfers) and assumes 1 custom data field. Actual legacy costs are typically higher depending on campaign complexity.
          </p>

          {/* Legacy Cost Assumptions accordion */}
          <div style={{ border: "1px solid rgba(255,255,255,.07)", borderRadius: ".75rem", overflow: "hidden" }}>
            <button onClick={() => setAssumOpen(!assumOpen)} style={{
              width: "100%", background: "rgba(255,255,255,.03)", border: "none",
              cursor: "pointer", display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: ".875rem 1.25rem", gap: "1rem" }}>
              <span style={{ fontSize: ".78rem", fontWeight: 700, color: "#94a3b8",
                letterSpacing: ".04em", fontFamily: "'Inter',sans-serif" }}>
                LEGACY COST ASSUMPTIONS
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ flexShrink: 0, transform: assumOpen ? "rotate(180deg)" : "none", transition: "transform .3s" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div style={{ overflow: "hidden", maxHeight: assumOpen ? "600px" : 0,
              opacity: assumOpen ? 1 : 0, transition: "max-height .4s ease, opacity .3s ease" }}>
              <div style={{ padding: ".75rem 1.25rem 1.25rem" }}>
                <p style={{ fontSize: ".72rem", color: "#94a3b8", marginBottom: "1rem", lineHeight: 1.5 }}>
                  The legacy cost estimate applies the following rates to your selected monthly volume.
                </p>
                {/* Two-column grid — collapses to single col on mobile via inline style + assumpGrid class */}
                <div className="assump-grid" style={{ display: "grid",
                  gridTemplateColumns: "1fr 1fr", gap: ".375rem 2rem" }}>
                  {assumptions.map((a, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: ".1rem",
                      padding: ".45rem 0",
                      borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                      <span style={{ fontSize: ".75rem", color: "#64748b", lineHeight: 1.4 }}>{a.l}</span>
                      <span style={{ fontSize: ".78rem", color: "#e2e8f0", fontWeight: 500,
                        fontFamily: "monospace" }}>{a.r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ENTERPRISE FAQ ──────────────────────────────────────── */
const ENT_FAQ = [
  { q: "Do you offer a Master Service Agreement (MSA)?",
    a: "Yes. We have a standard, pre-vetted MSA designed to streamline onboarding for enterprise brands, allowing for a single legal review." },
  { q: "Where is data stored and processed?",
    a: "All PII and receipt images are processed and stored exclusively in Canada." },
  { q: "Is SondarLogic SOC2 Compliant?",
    a: "We operate on SOC2 Type II compliant infrastructure and follow industry-standard encryption (AES-256) for all data at rest and in transit." },
  { q: "Can we customize payout timing and branding?",
    a: "Yes. Through our API routing, payout schedules are completely customizable. We can trigger instant payouts the second a receipt is validated, or batch them for flexible payout schedules on your exact cadence — weekly, monthly, or custom." },
  { q: "How fast can we launch a new promotional campaign?",
    a: "Once the Pilot Agreement is signed, we typically go live within 7–10 business days. For Enterprise MSA clients, our Vision AI is context-aware and does not require retraining on new receipt layouts for each retailer." },
  { q: "Do you offer an MSA?",
    a: "Yes, we provide standard MSAs and custom SLAs for our enterprise partners." },
  { q: "How do you handle unclaimed funds?",
    a: "We recapture expired promotional rewards after 90 days and credit 50% back to your next campaign budget." },
  { q: "Can you handle 100k+ claims in a day?",
    a: "Our serverless infrastructure scales instantly to handle massive promotional spikes without processing delays." },
  { q: "What if a customer uploads a blurry receipt?",
    a: "We don't auto-deny. Our system sends a branded, automated re-upload link to ensure a positive customer experience while preventing fraud." },
  { q: "What data do I get besides my own SKU?",
    a: "You get full line-item extraction, including competitor brands and basket totals, included in your platform fee." },
  { q: "Is the portal white-labeled?",
    a: "Yes. The entire journey from upload to the Visa Gift Card delivery email is 100% branded to your guidelines." },
];

function EnterpriseFAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const ref = useReveal();
  return (
    <section id="faq" style={{ background: "#fff", padding: "5rem 0" }}>
      <div ref={ref} style={{ maxWidth: 720, margin: "0 auto", padding: "0 2rem" }}>
        <div className="rv" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Pill>ENTERPRISE FAQ</Pill>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.5rem)", fontWeight: 800,
            letterSpacing: "-.035em", color: S900, marginBottom: ".6rem" }}>
            Engineered for Enterprise Partnerships.
          </h2>
          <p style={{ color: "#64748b", fontSize: ".95rem", maxWidth: 520,
            margin: "0 auto", lineHeight: 1.65 }}>
            Rigorous security, Canadian data residency, and automated budget recovery for Tier-1 brands.
          </p>
        </div>
        <div className="rv td1">
          {ENT_FAQ.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
                width: "100%", background: "none", border: "none", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "1.2rem 0", textAlign: "left", gap: "1rem" }}>
                <span style={{ fontSize: ".97rem", fontWeight: 600,
                  color: openIdx === i ? S900 : "#475569",
                  transition: "color .2s", letterSpacing: "-.01em",
                  fontFamily: "'Inter',sans-serif" }}>{item.q}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke={CYAN_D} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ flexShrink: 0, transform: openIdx === i ? "rotate(180deg)" : "none", transition: "transform .3s" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div style={{ overflow: "hidden", maxHeight: openIdx === i ? "280px" : 0,
                opacity: openIdx === i ? 1 : 0, transition: "max-height .4s ease, opacity .3s ease" }}>
                <p style={{ color: "#64748b", fontSize: ".92rem",
                  lineHeight: 1.75, paddingBottom: "1.2rem" }}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ───────────────────────────────────────────── */
function FinalCTA() {
  const ref = useReveal();
  return (
    <section style={{ background: S950, padding: "5rem 0",
      position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)", width: 600, height: 350,
        background: "radial-gradient(ellipse, rgba(45,212,191,.14) 0%, transparent 65%)",
        filter: "blur(48px)", pointerEvents: "none" }} />
      <div ref={ref} style={{ maxWidth: 680, margin: "0 auto", padding: "0 2rem", position: "relative" }}>
        <div className="rv" style={{ display: "flex", justifyContent: "center" }}>
          <Pill dark>GET STARTED</Pill>
        </div>
        <h2 className="rv td1" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 900,
          letterSpacing: "-.045em", color: "#fff", lineHeight: 1.08, marginBottom: "1rem" }}>
          Stop throwing away your basket data.
        </h2>
        <p className="rv td2" style={{ color: "rgba(255,255,255,.45)", fontSize: "1rem",
          lineHeight: 1.7, marginBottom: "2.5rem" }}>
          Put 65% of your admin budget back into marketing with Sondar Logic AI.
        </p>
        <div className="rv td3" style={{ display: "flex", gap: "2.5rem",
          justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap" }}>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="bp"
            style={{ fontSize: "1rem", padding: ".9rem 2.25rem" }}>
            Book a Demo <ArrowRight size={17} />
          </a>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: ".3rem" }}>
            <span style={{ fontSize: ".58rem", fontWeight: 700,
              letterSpacing: ".14em", color: "rgba(255,255,255,.28)" }}>DIRECT OUTREACH</span>
            <a href={`mailto:${EMAIL}`} style={{ color: CYAN, fontSize: ".93rem",
              fontWeight: 500, textDecoration: "none",
              borderBottom: "1px solid rgba(45,212,191,.35)", paddingBottom: "1px",
              transition: "border-color .2s" }}
              onMouseEnter={e => e.target.style.borderColor = CYAN}
              onMouseLeave={e => e.target.style.borderColor = "rgba(45,212,191,.35)"}>
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────── */
function Footer({ setActiveView }) {
  const cols = [
    { h: "PRODUCT", links: [
      { l: "How it Works",  id: "how-it-works" },
      { l: "Features",      id: "features" },
      { l: "Pricing",       id: "pricing" },
      { l: "FAQ",           id: "faq" },
    ]},
    { h: "SOLUTIONS", links: [
      { l: "Automotive Rebates" }, { l: "CPG Promotions" }, { l: "Appliance Claims" },
    ]},
    { h: "SUPPORT", links: [
      { l: "API Documentation" }, { l: "Manual Review Portal" },
      { l: "Contact Sales", href: "mailto:partnerships@sondarlogic.com" },
    ]},
    { h: "LEGAL", links: [
      { l: "Privacy Policy",   action: "privacy" },
      { l: "Terms of Service", action: "terms" },
      { l: "PIPEDA Compliance" }, { l: "Security (SOC 2)" },
    ]},
  ];
  const lkBase = { color: "#475569", textDecoration: "none", fontSize: ".84rem",
    display: "block", marginBottom: ".6rem", transition: "color .2s",
    fontFamily: "'Inter', sans-serif" };

  return (
    <footer style={{ background: S950, borderTop: "1px solid rgba(255,255,255,.05)",
      paddingTop: "3rem", paddingBottom: "2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
          <div style={{ maxWidth: 340 }}>
            <div style={{ fontSize: "1.05rem", fontWeight: 800,
              color: "#fff", letterSpacing: "-.03em", marginBottom: ".75rem" }}>
              Sondar <span style={{ color: CYAN_D }}>Logic AI</span>
            </div>
            <p style={{ fontSize: ".875rem", color: "rgba(255,255,255,.35)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Stop throwing away your basket data — and put 65% of your admin budget back into marketing.
            </p>
            <div>
              <div style={{ fontSize: ".57rem", fontWeight: 700,
                color: "rgba(255,255,255,.25)", letterSpacing: ".12em", marginBottom: ".35rem" }}>
                DIRECT OUTREACH
              </div>
              <a href={`mailto:${EMAIL}`} style={{ color: CYAN, fontSize: ".875rem",
                fontWeight: 500, textDecoration: "none" }}
                onMouseEnter={e => e.target.style.opacity = ".75"}
                onMouseLeave={e => e.target.style.opacity = "1"}>
                {EMAIL}
              </a>
            </div>
          </div>

          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            {cols.map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: ".58rem", fontWeight: 700,
                  color: "rgba(255,255,255,.22)", letterSpacing: ".14em",
                  marginBottom: "1rem" }}>{col.h}</div>
                {col.links.map((lnk, j) => (
                  lnk.action
                    ? <button key={j} onClick={() => { setActiveView(lnk.action); window.scrollTo(0, 0); }}
                        style={{ ...lkBase, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                        onMouseEnter={e => e.target.style.color = "#e2e8f0"}
                        onMouseLeave={e => e.target.style.color = "#475569"}>
                        {lnk.l}
                      </button>
                    : lnk.id
                      ? <a key={j} href={`#${lnk.id}`} style={lkBase}
                          onClick={e => { e.preventDefault(); document.getElementById(lnk.id)?.scrollIntoView({ behavior: "smooth" }); }}
                          onMouseEnter={e => e.target.style.color = "#e2e8f0"}
                          onMouseLeave={e => e.target.style.color = "#475569"}>
                          {lnk.l}
                        </a>
                      : <a key={j} href={lnk.href || "#"} style={lkBase}
                          onMouseEnter={e => e.target.style.color = "#e2e8f0"}
                          onMouseLeave={e => e.target.style.color = "#475569"}>
                          {lnk.l}
                        </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.05)",
          paddingTop: "1.25rem", textAlign: "center", marginBottom: ".6rem" }}>
          <span style={{ fontSize: ".76rem", color: "rgba(255,255,255,.18)" }}>
            © 2026 Sondar Logic AI. Built in Burlington, Ontario.
          </span>
        </div>

        {/* Legal disclaimer – small print */}
        <p style={{ textAlign: "center", fontSize: ".65rem", color: "#64748b",
          lineHeight: 1.6, maxWidth: 860, margin: "0 auto" }}>
          <span style={{ fontWeight: 600 }}>Promotional Reward Policy:</span> All rebates issued via SondarLogic are classified as Promotional Rewards. These non-purchased incentives carry a standard 90-day claim period. Unclaimed funds are recaptured for promotional budget reallocation.
        </p>
      </div>
    </footer>
  );
}

/* ─── LEGAL PAGES ─────────────────────────────────────────── */
const lbs = { color: "#64748b", fontSize: ".93rem", lineHeight: 1.8, marginBottom: "1rem" };
const lh2 = { fontSize: "1.05rem", fontWeight: 700, color: S900,
  letterSpacing: "-.02em", marginBottom: ".5rem", marginTop: "2rem" };

function LegalPage({ title, effectiveDate, children, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 200,
        background: "rgba(255,255,255,.96)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid #f1f5f9", padding: ".875rem 2rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <button onClick={onBack}
            style={{ background: "none", border: "1px solid #e2e8f0", borderRadius: ".5rem",
              padding: ".4rem .875rem", color: "#475569", fontSize: ".82rem", fontWeight: 600,
              cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = CYAN_D; e.currentTarget.style.color = CYAN_D; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#475569"; }}>
            ← Back to Home
          </button>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 2rem 6rem" }}>
        <Pill>{title.toUpperCase()}</Pill>
        <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.75rem)", fontWeight: 800,
          letterSpacing: "-.035em", color: S900, marginBottom: ".5rem" }}>{title}</h1>
        <p style={{ color: "#94a3b8", fontSize: ".82rem", marginBottom: "3rem",
          borderBottom: "1px solid #f1f5f9", paddingBottom: "1.5rem" }}>
          Effective Date: {effectiveDate}
        </p>
        {children}
      </div>
    </div>
  );
}

function PrivacyPolicy({ onBack }) {
  return (
    <LegalPage title="Privacy Policy" effectiveDate="March 2026" onBack={onBack}>
      <h2 style={lh2}>Introduction</h2>
      <p style={lbs}>Sondar Logic AI, headquartered in Burlington, Ontario, provides an automated rebate validation and payment processing platform. This Privacy Policy outlines how we collect, use, disclose, and safeguard personal information in compliance with PIPEDA and applicable provincial privacy legislation.</p>
      <h2 style={lh2}>Information We Collect</h2>
      <p style={lbs}>We act as a Data Processor on behalf of our enterprise clients. We collect end-consumer data (names, email addresses, geographic location), transaction data (receipt images, purchase details), and B2B client data (billing details, usage metrics).</p>
      <h2 style={lh2}>How We Use Your Information</h2>
      <p style={lbs}>We use collected information for claim validation via Enterprise Level Vision AI, digital payout routing, anonymized business intelligence reporting, and automated customer support updates.</p>
      <h2 style={lh2}>Data Storage and Localization</h2>
      <p style={lbs}>All receipt data and PII are hosted on AWS servers physically located within Canada. We maintain strict data residency protocols to ensure Canadian consumer data does not cross borders unnecessarily.</p>
      <h2 style={lh2}>Data Sharing</h2>
      <p style={lbs}>We do not sell, rent, or trade personal data. Data is only shared with vetted sub-processors essential to operations, all bound by strict confidentiality agreements.</p>
      <h2 style={lh2}>Data Retention and Security</h2>
      <p style={lbs}>We retain end-consumer PII only for as long as necessary to fulfill the promotional campaign. We employ AES-256 encryption at rest and TLS 1.2+ in transit.</p>
      <h2 style={lh2}>Individual Rights</h2>
      <p style={lbs}>Under PIPEDA, Canadian consumers may request access, corrections, or withdrawal of consent. Direct requests to the specific Brand running the promotion. We assist in executing all verified requests within required legal timeframes.</p>
      <h2 style={lh2}>Contact Us</h2>
      <p style={lbs}>Sondar Logic AI, Burlington, Ontario. Email: <a href="mailto:hello@sondarlogic.com" style={{ color: CYAN_D, textDecoration: "none" }}>hello@sondarlogic.com</a></p>
    </LegalPage>
  );
}

function TermsOfService({ onBack }) {
  return (
    <LegalPage title="Terms of Service" effectiveDate="March 2026" onBack={onBack}>
      <h2 style={lh2}>Acceptance of Terms</h2>
      <p style={lbs}>By accessing or using the Sondar Logic AI platform, API, or dashboard, you agree to be bound by these Terms of Service.</p>
      <h2 style={lh2}>Service Description</h2>
      <p style={lbs}>Sondar Logic AI provides an automated, AI-driven receipt validation and rebate disbursement engine including Enterprise Level Vision AI, fraud detection, deep basket data extraction, and API routing for digital payouts.</p>
      <h2 style={lh2}>Accuracy and Manual Review SLA</h2>
      <p style={lbs}>Claims scoring 95% or higher are automatically approved and routed for instant payout. Claims scoring below the threshold are routed to a human review queue with a 3 business day audit SLA.</p>
      <h2 style={lh2}>Client Obligations and Consent</h2>
      <p style={lbs}>The Client remains the Data Controller and is solely responsible for ensuring their promotional materials capture valid informed consent from end-consumers in compliance with PIPEDA and CASL.</p>
      <h2 style={lh2}>Fees and Payout Funding</h2>
      <p style={lbs}>Clients are billed a flat monthly platform license fee plus volume tiered pricing per claim. Sondar Logic AI does not charge exception fees on rejected claims. Clients must maintain sufficient payout funding with our Canada based secure payment partner.</p>
      <h2 style={lh2}>Proprietary Rights and Data Ownership</h2>
      <p style={lbs}>Sondar Logic AI retains all intellectual property rights to the platform and AI models. The Client retains all rights to their first-party consumer data and the basket intelligence provided via the platform.</p>
      <h2 style={lh2}>Limitation of Liability</h2>
      <p style={lbs}>Our total liability for any claims arising under these terms shall be limited to the amount paid by the Client for the specific services in the three months preceding the incident.</p>
      <h2 style={lh2}>Governing Law</h2>
      <p style={lbs}>These Terms shall be governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.</p>
    </LegalPage>
  );
}

/* ─── ROOT ────────────────────────────────────────────────── */
export default function SondarLogicAI() {
  const [activeView, setActiveView] = useState("home");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (activeView !== "home") return;
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.07 }
    );
    const t = setTimeout(() => document.querySelectorAll(".rv").forEach(el => obs.observe(el)), 60);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [activeView]);

  if (activeView === "privacy") return (
    <><style dangerouslySetInnerHTML={{ __html: G }} />
      <PrivacyPolicy onBack={() => { setActiveView("home"); window.scrollTo(0, 0); }} /></>
  );
  if (activeView === "terms") return (
    <><style dangerouslySetInnerHTML={{ __html: G }} />
      <TermsOfService onBack={() => { setActiveView("home"); window.scrollTo(0, 0); }} /></>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: G }} />
      <Navbar />
      <Hero />
      <Workflow />
      <CommandCenter />
      <Pricing />
      <ClaimBreakdown />
      <ROICalculator />
      <EnterpriseFAQ />
      <FinalCTA />
      <Footer setActiveView={setActiveView} />
    </>
  );
}
