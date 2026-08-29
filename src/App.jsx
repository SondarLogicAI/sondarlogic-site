import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight, Upload, ScanSearch, ShoppingCart,
  Mail, Zap, Database,
  RotateCcw, Check, ShieldCheck, TrendingUp, Stethoscope, Clock,
  BadgeCheck, ThumbsUp, ThumbsDown, UserCheck, Receipt, Percent, Droplet, Snowflake,
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
  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pdot   { 0%,100% { opacity:1; } 50% { opacity:.35; } }
  @keyframes scanline { 0%,100% { top:15%; opacity:.9; } 50% { top:75%; opacity:.6; } }
  .fu  { animation: fadeUp 0.7s ease both; }
  .d1  { animation-delay:.1s; } .d2 { animation-delay:.2s; }
  .d3  { animation-delay:.3s; } .d4 { animation-delay:.4s; }
  .rv  { opacity:0; transform:translateY(22px); transition: opacity .6s ease, transform .6s ease; }
  .rv.on { opacity:1; transform:translateY(0); }
  .td1 { transition-delay:.1s; } .td2 { transition-delay:.2s; } .td3 { transition-delay:.3s; }
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
  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:#f1f5f9; }
  ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:3px; }
  @media (max-width: 768px) {
    .nav-d        { display:none !important; }
    .zrow         { grid-template-columns:1fr !important; gap:2rem !important; }
    .zrow-text    { order:1 !important; }
    .zrow-visual  { order:2 !important; }
    .pcols        { grid-template-columns:1fr !important; }
    .hero-h1      { font-size:2rem !important; line-height:1.1 !important; }
    .journey-grid { grid-template-columns:1fr 1fr !important; gap:1rem !important; }
    .jrw-arrow    { display:none !important; }
    .extract-grid { grid-template-columns:1fr !important; }
    .ba-grid      { grid-template-columns:1fr !important; }
    .partner-grid { grid-template-columns:1fr !important; }
    .why-grid     { grid-template-columns:1fr !important; }
    .hero-toggle  { flex-direction:column !important; align-items:stretch !important; }
  }
  @media (max-width:480px) {
    .journey-grid { grid-template-columns:1fr !important; }
  }
`;

/* ─── Helpers ─────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.07 }
    );
    [el, ...el.querySelectorAll(".rv")].forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Pill({ children, dark = false }) {
  return (
    <div style={{
      display:"inline-flex", alignItems:"center", gap:".4rem",
      padding:".25rem .9rem", borderRadius:"2rem",
      fontSize:".67rem", fontWeight:700, letterSpacing:".1em", marginBottom:"1rem",
      ...(dark
        ? { background:"rgba(45,212,191,.12)", color:CYAN, border:"1px solid rgba(45,212,191,.25)" }
        : { background:"rgba(13,148,136,.07)", color:CYAN_D, border:"1px solid rgba(13,148,136,.18)" })
    }}>
      <span style={{ width:5, height:5, borderRadius:"50%",
        background: dark ? CYAN : CYAN_D, animation:"pdot 2s infinite" }} />
      {children}
    </div>
  );
}

/* ─── NAVBAR ──────────────────────────────────────────────── */
function Navbar() {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 64);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      background: sc ? "rgba(2,6,23,.92)" : "rgba(2,6,23,.7)",
      backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)",
      borderBottom: sc ? "1px solid rgba(255,255,255,.07)" : "1px solid transparent",
      transition:"background .35s, border-color .35s",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        height:"4rem", gap:"1.5rem" }}>
        <div style={{ fontSize:"1.05rem", fontWeight:800,
          letterSpacing:"-.03em", color:"#fff", flexShrink:0 }}>
          Sondar <span style={{ color:CYAN }}>Logic</span>
        </div>
        <div className="nav-d" style={{ display:"flex", gap:"1.75rem", flex:1, justifyContent:"center" }}>
          {[
            { l:"How it Works", id:"how-it-works" },
            { l:"Features",     id:"features"     },
            { l:"Pricing",      id:"pricing"      },
            { l:"FAQ",          id:"faq"          },
          ].map(n => (
            <a key={n.l} href={`#${n.id}`}
              style={{ color:"rgba(255,255,255,.55)", textDecoration:"none",
                fontSize:".86rem", fontWeight:500, transition:"color .2s", whiteSpace:"nowrap" }}
              onClick={e => { e.preventDefault(); document.getElementById(n.id)?.scrollIntoView({ behavior:"smooth" }); }}
              onMouseEnter={e => e.target.style.color="#fff"}
              onMouseLeave={e => e.target.style.color="rgba(255,255,255,.55)"}>
              {n.l}
            </a>
          ))}
        </div>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="bp"
          style={{ padding:".5rem 1.2rem", fontSize:".82rem", flexShrink:0 }}>
          Book a Demo
        </a>
      </div>
    </nav>
  );
}

/* ─── HERO ────────────────────────────────────────────────── */
function Hero() {
  const c = {
    pill:"INSTANT REBATE PROCESSING · CANADA",
    h1:<>Receipt in. Reward out.</>,
    accent:"Your customers can't wait 8 weeks.",
    sub:[
      "Instant Visa gift card payout the moment a claim is approved",
      "Full basket intelligence on every receipt, from motor oil to pet food to paint",
    ],
    stats:[
      { v:"Same day", l:"Visa Giftcard payout"  },
      { v:"< 8s",     l:"claim to decision"      },
      { v:"10+",      l:"data points per claim"  },
      { v:"$0",       l:"add-on fees"            },
    ],
    cta1:{ label:"See how it works",      href:"#how-it-works",   ext:false },
    cta2:{ label:"Book a Demo",           href:CALENDLY,          ext:true  },
  };
  return (
    <section style={{ background:S950, paddingTop:"7rem", paddingBottom:"1.5rem",
      position:"relative", overflow:"hidden", textAlign:"center" }}>
      <div style={{ position:"absolute", top:"40%", left:"50%",
        transform:"translate(-50%,-50%)", width:760, height:440,
        background:"radial-gradient(ellipse, rgba(45,212,191,.16) 0%, transparent 65%)",
        filter:"blur(72px)", borderRadius:"50%", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0,
        backgroundImage:"linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)",
        backgroundSize:"48px 48px", pointerEvents:"none" }} />
      <div style={{ maxWidth:860, margin:"0 auto", padding:"0 2rem", position:"relative" }}>
        <div className="fu d1" style={{ display:"flex", justifyContent:"center" }}>
          <Pill dark>{c.pill}</Pill>
        </div>
        <h1 className="hero-h1 fu d2" style={{ fontSize:"clamp(2.4rem,5vw,4rem)",
          fontWeight:900, lineHeight:1.1, letterSpacing:"-.04em",
          color:"#fff", marginBottom:".75rem" }}>{c.h1}</h1>
        <h1 className="hero-h1 fu d2" style={{ fontSize:"clamp(2.4rem,5vw,4rem)",
          fontWeight:900, lineHeight:1.1, letterSpacing:"-.04em",
          marginBottom:"1.5rem" }}>
          <span className="grad-text">{c.accent}</span>
        </h1>
        <div className="fu d3" style={{ display:"flex", flexDirection:"column", gap:".6rem",
          alignItems:"center", maxWidth:760, margin:"0 auto 2.5rem" }}>
          {c.sub.map((line,i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:".6rem", textAlign:"left" }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:CYAN,
                marginTop:".5rem", flexShrink:0 }} />
              <span style={{ color:"rgba(255,255,255,.5)", fontSize:".92rem", lineHeight:1.55 }}>{line}</span>
            </div>
          ))}
        </div>
        <div className="fu d3" style={{ display:"flex", gap:"1rem",
          justifyContent:"center", flexWrap:"wrap" }}>
          {c.cta1.ext
            ? <a href={c.cta1.href} target="_blank" rel="noopener noreferrer" className="bp"
                style={{ fontSize:"1rem", padding:".875rem 2rem" }}>
                {c.cta1.icon && <Mail size={16}/>} {c.cta1.label} {!c.cta1.icon && <ArrowRight size={17}/>}
              </a>
            : <a href={c.cta1.href} className="bp" style={{ fontSize:"1rem", padding:".875rem 2rem" }}>
                {c.cta1.icon && <Mail size={16}/>} {c.cta1.label}
              </a>
          }
          {c.cta2.ext
            ? <a href={c.cta2.href} target="_blank" rel="noopener noreferrer" className="bo-dark">
                {c.cta2.label}
              </a>
            : <a href={c.cta2.href} className="bo-dark">
                {c.cta2.icon && <Mail size={15}/>} {c.cta2.label}
              </a>
          }
        </div>
        {/* stats */}
        <div className="fu d4" style={{ marginTop:"3.5rem",
          display:"flex", justifyContent:"center", gap:"3rem", flexWrap:"wrap" }}>
          {c.stats.map((s,i) => (
            <div key={i} style={{ textAlign:"center" }}>
              <div style={{ fontSize:"1.55rem", fontWeight:800, color:CYAN,
                letterSpacing:"-.04em", lineHeight:1 }}>{s.v}</div>
              <div style={{ fontSize:".72rem", color:"rgba(255,255,255,.3)",
                marginTop:".25rem", letterSpacing:".04em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── JOURNEY SECTION ─────────────────────────────────────── */
/* ─── HOW IT WORKS DEMO (scan + dashboard; oil default, pet toggle) ─── */
const DIM = "#64748b", MUTED = "#94a3b8", LINE = "rgba(255,255,255,.09)", AMBER = "#f5b642";
const dcard = {
  background: `linear-gradient(180deg, rgba(45,212,191,.08), rgba(45,212,191,0) 42%), #ffffff`,
  border: "1px solid rgba(13,148,136,.28)", borderRadius: 14,
};

const STAGES = ["Image integrity", "Read every line", "Match to product list", "Check against the form", "Apply campaign rules"];

/* Distinct colours so each row reads on its own, one family per section */
const COL_A = ["#2dd4bf", "#34d399", "#10b981"];
const COL_B = ["#38bdf8", "#0ea5e9", "#6366f1"];
const COL_C = ["#a78bfa", "#8b5cf6", "#ec4899"];

/* Daily submissions: a quiet baseline, then a surge once marketing goes live */
const SUBS_PRE  = [22, 28, 24, 31];
const SUBS_POST = [70, 88, 100, 90, 95, 86, 91, 82];

/* Real vet receipt (Ellesmere Animal Clinic). Oil uses a placeholder until a Canadian Tire receipt is pasted in below. */
const PET_RECEIPT = "data:image/jpeg;base64,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";
const CT_RECEIPT = "data:image/jpeg;base64,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";
/* Exact oil SKU on the receipt: Mobil 1™ ESP Emission System Protection 5W30 Synthetic Engine/Motor Oil, 4.73-L */

const VARIANTS = {
  oil: {
    receiptImg: CT_RECEIPT,
    receiptAlt: "Canadian Tire receipt, Mobil 1 rebate",
    placeholder: { title: "Canadian Tire receipt", note: "Drop a real receipt here \u2014 it scans the same way." },
    fields: [
      { label: "Retailer & date", value: "Canadian Tire \u00b7 Aug 18, 2026" },
      { label: "Qualifying product", value: "Mobil 1 ESP 5W30 Synthetic \u00b7 4.73 L", note: "$5 rebate" },
      { label: "Also in the basket", value: "Oil filter \u00b7 Nitrile gloves", note: "Cross sell", accent: AMBER },
      { label: "Quantity", value: "3 jugs \u00b7 stocking up", note: "High value", accent: AMBER },
      { label: "Customer (from the form)", value: "Michael Baxtor \u00b7 opted in" },
    ],
    approval: "Window, product, retailer and receipt all check out. Edge cases go to our team, so nothing lands on yours.",
    record: [
      { k: "Customer", v: "Michael Baxtor" },
      { k: "Product", v: "Mobil 1 ESP 5W30" },
      { k: "Also bought", v: "Oil filter" },
      { k: "Quantity", v: "3 jugs" },
      { k: "Segment", v: "High value", hi: true },
    ],
    audiences: [
      { Icon: TrendingUp, title: "High value buyers", count: "1,240", rule: "Bought 3+ jugs, stocking up" },
      { Icon: Percent, title: "Value shoppers", count: "1,880", rule: "Buys on promotion, target with deals" },
      { Icon: Droplet, title: "Due for next oil change", count: "2,130", rule: "~6 months since last purchase" },
      { Icon: Snowflake, title: "Seasonal switch", count: "1,540", rule: "Winter and summer oil timing" },
    ],
    breakdowns: [
      { title: "Top retailers", cols: COL_A, bars: [["Canadian Tire", "58%", 100], ["PartSource", "24%", 41], ["Walmart", "11%", 19]] },
      { title: "Top products", cols: COL_B, bars: [["Mobil 1 Full Synthetic 5W30", "44%", 100], ["Mobil 1 Extended Performance 5W30", "29%", 66], ["Mobil 1 ESP 5W30", "17%", 39]] },
      { title: "Top complementary products", cols: COL_C, bars: [["Oil filter", "41%", 100], ["Washer fluid", "28%", 68], ["Shop towels", "19%", 46]] },
    ],
  },
  pet: {
    receiptImg: PET_RECEIPT,
    receiptAlt: "Customer receipt from Ellesmere Animal Clinic",
    placeholder: { title: "Vet clinic receipt", note: "Drop a real receipt here \u2014 it scans the same way." },
    fields: [
      { label: "Clinic & date", value: "Ellesmere Animal Clinic \u00b7 Jan 16, 2026" },
      { label: "Qualifying product", value: "Hill's Prescription Diet t/d \u00b7 $116.00", note: "Rebate" },
      { label: "Also in the basket", value: "Royal Canin Hydrolyzed Treats \u00b7 $24.99", note: "Cross shop", accent: AMBER },
      { label: "Services on the visit", value: "Wellness check \u00b7 Dental scale \u00b7 Anesthesia", note: "Targeting", accent: AMBER },
      { label: "Customer (from the form)", value: "Sarah Davies \u00b7 pet Charlie \u00b7 opted in" },
    ],
    approval: "Window, product, clinic and invoice all check out. Edge cases go to our team, so nothing lands on yours.",
    record: [
      { k: "Customer", v: "Sarah Davies" },
      { k: "Product", v: "Hill's PD t/d" },
      { k: "Also bought", v: "Royal Canin" },
      { k: "Services", v: "Wellness \u00b7 Dental" },
      { k: "Segment", v: "High value", hi: true },
    ],
    audiences: [
      { Icon: TrendingUp, title: "High value buyers", count: "1,240", rule: "Top 20% by spend" },
      { Icon: ShoppingCart, title: "Also buys a competitor product", count: "880", rule: "Royal Canin on the receipt" },
      { Icon: Stethoscope, title: "Due for a wellness visit", count: "2,130", rule: "11+ months since last visit" },
      { Icon: Clock, title: "Lapsed since last claim", count: "640", rule: "No claim in 180 days" },
    ],
    breakdowns: [
      { title: "Top clinics", cols: COL_A, bars: [["Ellesmere Animal Clinic", "9%", 100], ["Bayview Veterinary", "7%", 78], ["Lakeshore Animal Hospital", "6%", 64]] },
      { title: "Top products", cols: COL_B, bars: [["Hill's PD t/d", "38%", 100], ["Hill's PD c/d", "24%", 63], ["Hill's PD k/d", "19%", 50]] },
      { title: "Top services received", cols: COL_C, bars: [["Dental", "38%", 100], ["Wellness", "31%", 82], ["Vaccination", "19%", 50]] },
    ],
  },
};

function Reveal({ show, delay = 0, children, style }) {
  return (
    <div className="sl-anim" style={{
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(14px)",
      transition: `opacity .5s ease ${delay}s, transform .5s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function Field({ show, delay, label, value, note, accent }) {
  return (
    <Reveal show={show} delay={delay} style={{
      display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 12px",
      background: "#ffffff", border: "1px solid #eef2f7",
      borderLeft: `2px solid ${accent || CYAN}`, borderRadius: 8, marginBottom: 7,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: DIM, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1E293B", lineHeight: 1.35 }}>{value}</div>
      </div>
      {note && (
        <span style={{
          flexShrink: 0, fontSize: 10, fontWeight: 700, letterSpacing: ".04em",
          padding: "3px 8px", borderRadius: 20, marginTop: 2,
          color: accent === AMBER ? AMBER : CYAN_D,
          background: accent === AMBER ? "rgba(245,182,66,.1)" : "rgba(45,212,191,.1)",
          border: `1px solid ${accent === AMBER ? "rgba(245,182,66,.28)" : "rgba(45,212,191,.28)"}`,
        }}>{note}</span>
      )}
    </Reveal>
  );
}

function Bar({ label, pct, value, accent }) {
  return (
    <div style={{ marginBottom: 11 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
        <span style={{ color: "#cbd5e1" }}>{label}</span>
        <span style={{ color: MUTED, fontWeight: 600 }}>{value}</span>
      </div>
      <div style={{ height: 6, borderRadius: 6, background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
        <div className="sl-anim" style={{ height: "100%", width: `${pct}%`, borderRadius: 6, background: accent || `linear-gradient(90deg, ${CYAN_D}, ${CYAN})`, transition: "width .8s ease" }} />
      </div>
    </div>
  );
}

function Audience({ Icon, title, count, rule }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "rgba(255,255,255,.03)", border: `1px solid ${LINE}`, borderRadius: 10 }}>
      <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 8, display: "grid", placeItems: "center", background: "rgba(45,212,191,.1)", border: "1px solid rgba(45,212,191,.22)" }}>
        <Icon size={16} color={CYAN} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9" }}>{title}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: CYAN }}>{count}</span>
        </div>
        <div style={{ fontSize: 11.5, color: DIM, marginTop: 1 }}>{rule}</div>
      </div>
      <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 700, color: S950, background: CYAN, padding: "5px 11px", borderRadius: 20 }}>
        Activate <ArrowRight size={12} />
      </span>
    </div>
  );
}

function Chip({ children, icon: Ic, tone }) {
  const on = tone === "cyan";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
      fontSize: 11, fontWeight: 600, padding: "4px 9px", borderRadius: 20,
      color: on ? CYAN_D : "#475569",
      background: on ? "rgba(13,148,136,.08)" : "#f1f5f9",
      border: `1px solid ${on ? "rgba(13,148,136,.25)" : "#e2e8f0"}`,
    }}>
      {Ic && <Ic size={11} color={on ? CYAN_D : DIM} strokeWidth={2.5} />}{children}
    </span>
  );
}

function BenefitCard({ Icon, title, body, children }) {
  return (
    <div style={{ ...dcard, padding: "20px 18px", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 10, display: "grid", placeItems: "center", background: "rgba(13,148,136,.1)", border: "1px solid rgba(13,148,136,.22)" }}>
          <Icon size={19} color={CYAN_D} />
        </div>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A" }}>{title}</h3>
      </div>
      <p style={{ fontSize: ".92rem", color: "#64748B", lineHeight: 1.55, marginBottom: 16 }}>{body}</p>
      <div style={{ marginTop: "auto" }}>{children}</div>
    </div>
  );
}

function JourneySection() {
  const [mode, setMode] = useState("oil");
  const [phase, setPhase] = useState("idle");   // idle | scan | done
  const [prog, setProg] = useState(0);          // 0..100
  const ref = useRef(null);
  const timer = useRef(null);
  const started = useRef(false);
  const didMount = useRef(false);

  const stopTimer = () => { if (timer.current) { clearInterval(timer.current); timer.current = null; } };

  const run = useCallback(() => {
    stopTimer();
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setProg(100); setPhase("done"); return; }
    setPhase("scan"); setProg(0);
    timer.current = setInterval(() => {
      setProg(p => {
        const next = p + 2;
        if (next >= 100) { stopTimer(); setPhase("done"); return 100; }
        return next;
      });
    }, 46);
  }, []);

  // Trigger once on scroll into view; button replays.
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting && !started.current) { started.current = true; run(); }
    }), { threshold: 0.3 });
    obs.observe(el);
    return () => { obs.disconnect(); stopTimer(); };
  }, [run]);

  // Re-run the scan when the scenario changes (skip the initial mount).
  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    run();
  }, [mode, run]);

  const reset = () => { setPhase("idle"); setProg(0); setTimeout(run, 60); };

  const V = VARIANTS[mode];
  const done = phase === "done";
  const stage = Math.min(4, Math.floor(prog / 20));
  const shown = [prog >= 16, prog >= 30, prog >= 46, prog >= 62, prog >= 80];

  return (
    <section ref={ref} id="how-it-works" style={{ background: "#f8fafc", padding: "2.5rem 1.25rem 5.5rem", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes slPulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .sl-btn:focus-visible{ outline:2px solid ${CYAN}; outline-offset:2px; }
        @media (prefers-reduced-motion: reduce){ .sl-anim{ animation:none!important; transition:none!important; } }
        @media (max-width:860px){ .sl-scan{ grid-template-columns:1fr!important; } .sl-3{ grid-template-columns:1fr!important; } .sl-dash{ grid-template-columns:1fr!important; } .sl-stats{ grid-template-columns:repeat(2,1fr)!important; } }
      `}</style>

      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: CYAN_D, background: "rgba(13,148,136,.07)", border: "1px solid rgba(13,148,136,.18)", padding: ".3rem .9rem", borderRadius: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: CYAN_D, animation: "slPulse 2s infinite" }} />
            How it works
          </span>
          <h2 style={{ fontSize: "clamp(1.7rem,3.4vw,2.5rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.12, margin: "1rem auto .8rem", maxWidth: 760, letterSpacing: "-.02em" }}>
            One receipt. Under 8 seconds.<br /><span className="grad-text">Ten insights. Instant payout.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "#475569", maxWidth: 800, margin: "0 auto 1.4rem", lineHeight: 1.55, textWrap: "pretty" }}>
            The four steps at a glance, then the same scan running live on a real claim below.
          </p>
        </div>

        {/* ── 4-step overview strip ── */}
        <div className="rv td1 journey-grid" style={{
          display:"grid",
          gridTemplateColumns:"1fr 28px 1fr 28px 1fr 28px 1fr",
          alignItems:"center", gap:0, marginBottom:"3rem" }}>

          {/* Step 1 — Phone scan */}
          <div style={{ background:`linear-gradient(180deg, rgba(45,212,191,.08), rgba(45,212,191,0) 42%), #ffffff`, border:"1px solid rgba(13,148,136,.28)",
            borderRadius:"1.25rem", padding:"1.5rem", textAlign:"center",
            minHeight:"238px", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ fontSize:".64rem", fontWeight:700, color:CYAN_D,
              letterSpacing:".12em", marginBottom:"1rem" }}>STEP 1</div>
            {/* Phone */}
            <div style={{ width:68, height:84, margin:"0 auto 1rem",
              background:"#1a1f2e", borderRadius:".875rem",
              border:"2px solid rgba(255,255,255,.15)", position:"relative",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 8px 24px rgba(0,0,0,.4)" }}>
              {/* screen */}
              <div style={{ width:52, height:66, background:"#f8fafc",
                borderRadius:".5rem", overflow:"hidden", position:"relative" }}>
                <div style={{ padding:".3rem .35rem" }}>
                  <div style={{ fontSize:".28rem", fontWeight:800, color:"#1d1d1f",
                    textAlign:"center", marginBottom:".15rem",
                    letterSpacing:".08em" }}>RECEIPT</div>
                  <div style={{ height:"0.5px", background:"#e0e0e0", marginBottom:".2rem" }} />
                  <div style={{ fontSize:".22rem", color:"#86868b", marginBottom:".15rem" }}>
                    Store · 100 Main St · Date: Jan 16
                  </div>
                  <div style={{ height:"0.5px", background:"#f0f0f0", marginBottom:".15rem" }} />
                  {[
                    { w:78, hi:false },
                    { w:65, hi:false },
                    { w:82, hi:true  },
                    { w:60, hi:false },
                    { w:55, hi:false, red:true },
                  ].map((r,i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between",
                      alignItems:"center", marginBottom:".12rem",
                      padding:".05rem .1rem", borderRadius:".1rem",
                      background: r.hi ? "rgba(13,148,136,.1)" : r.red ? "rgba(239,68,68,.07)" : "transparent" }}>
                      <div style={{ height:"2px", borderRadius:1, width:`${r.w}%`,
                        background: r.hi ? CYAN_D : r.red ? "#ef4444" : "#d8d8d8" }} />
                      <div style={{ height:"2px", borderRadius:1, width:"16%",
                        background:"#e8e8e8", marginLeft:2 }} />
                    </div>
                  ))}
                  <div style={{ height:"0.5px", background:"#e0e0e0", margin:".15rem 0 .12rem" }} />
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <div style={{ height:"2.5px", borderRadius:1, width:"35%", background:"#1d1d1f" }} />
                    <div style={{ height:"2.5px", borderRadius:1, width:"22%", background:"#1d1d1f" }} />
                  </div>
                </div>
                {/* scan beam */}
                <div style={{ position:"absolute", left:0, right:0, height:"1.5px",
                  background:`linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
                  animation:"scanline 2.4s ease-in-out infinite", opacity:.85 }} />
              </div>
              {/* home bar */}
              <div style={{ position:"absolute", bottom:3, left:"50%",
                transform:"translateX(-50%)", width:16, height:2,
                borderRadius:1, background:"rgba(255,255,255,.25)" }} />
            </div>
            <div style={{ fontSize:"1.02rem", fontWeight:700, color:"#0F172A", marginBottom:".3rem" }}>
              Snap the receipt
            </div>
            <div style={{ fontSize:".84rem", color:"#64748B", lineHeight:1.45 }}>
              One photo, straight from their phone
            </div>
          </div>

          {/* arrow */}
          <div className="jrw-arrow" style={{ display:"flex", alignItems:"center",
            justifyContent:"center", flexDirection:"column", gap:".2rem" }}>
            <div style={{ width:"100%", height:1,
              background:`linear-gradient(90deg, rgba(45,212,191,.08), ${CYAN_D}, rgba(45,212,191,.08))` }} />
          </div>

          {/* Step 2 — Validated */}
          <div style={{ background:`linear-gradient(180deg, rgba(45,212,191,.08), rgba(45,212,191,0) 42%), #ffffff`, border:"1px solid rgba(13,148,136,.28)",
            borderRadius:"1.25rem", padding:"1.5rem", textAlign:"center",
            minHeight:"238px", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ fontSize:".64rem", fontWeight:700, color:CYAN_D,
              letterSpacing:".12em", marginBottom:"1rem" }}>STEP 2</div>
            <div style={{ width:84, height:84, margin:"0 auto 1rem",
              position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ position:"absolute", inset:0, borderRadius:"50%",
                border:`2px solid rgba(45,212,191,.2)` }} />
              <div style={{ position:"absolute", inset:7, borderRadius:"50%",
                border:`1.5px solid rgba(45,212,191,.12)` }} />
              <div style={{ width:58, height:58, borderRadius:"50%",
                background:"radial-gradient(circle, rgba(13,148,136,.18) 0%, rgba(13,148,136,.04) 100%)",
                border:`1.5px solid rgba(45,212,191,.35)`,
                display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", gap:".15rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{ fontSize:".4rem", color:CYAN, fontWeight:800,
                  letterSpacing:".08em" }}>APPROVED</span>
              </div>
              <div style={{ position:"absolute", top:2, right:2,
                background:"rgba(34,197,94,.15)", border:"1px solid rgba(34,197,94,.3)",
                borderRadius:".3rem", padding:".1rem .3rem",
                fontSize:".42rem", color:"#22c55e", fontWeight:700 }}>99.9%</div>
            </div>
            <div style={{ fontSize:"1.02rem", fontWeight:700, color:"#0F172A", marginBottom:".3rem" }}>
              Verified in seconds
            </div>
            <div style={{ fontSize:".84rem", color:"#64748B", lineHeight:1.45 }}>
              Merchant, product, and receipt checked in under 8 seconds
            </div>
          </div>

          {/* arrow */}
          <div className="jrw-arrow" style={{ display:"flex", alignItems:"center",
            justifyContent:"center" }}>
            <div style={{ width:"100%", height:1,
              background:`linear-gradient(90deg, rgba(45,212,191,.08), ${CYAN_D}, rgba(45,212,191,.08))` }} />
          </div>

          {/* Step 3 — Intelligence */}
          <div style={{ background:`linear-gradient(180deg, rgba(45,212,191,.08), rgba(45,212,191,0) 42%), #ffffff`, border:"1px solid rgba(13,148,136,.28)",
            borderRadius:"1.25rem", padding:"1.5rem", textAlign:"center",
            minHeight:"238px", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ fontSize:".64rem", fontWeight:700, color:CYAN_D,
              letterSpacing:".12em", marginBottom:"1rem" }}>STEP 3</div>
            <div style={{ background:"#fff", borderRadius:".625rem",
              padding:".75rem", margin:"0 auto 1rem", width:90,
              boxShadow:"0 4px 16px rgba(0,0,0,.25)" }}>
              {[
                { l:"Qualifying SKU", c:CYAN_D  },
                { l:"Basket items",   c:"#86868b" },
                { l:"Competitor",     c:"#ef4444" },
                { l:"Location",       c:"#86868b" },
                { l:"Confidence",     c:"#22c55e" },
              ].map((r,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center",
                  gap:".35rem", marginBottom: i<4 ? ".35rem" : 0 }}>
                  <div style={{ width:4, height:4, borderRadius:"50%",
                    background:r.c, flexShrink:0 }} />
                  <div style={{ height:"2.5px", borderRadius:1, flex:1,
                    background: i===0 ? CYAN_D : "#e8e8e8" }} />
                </div>
              ))}
            </div>
            <div style={{ fontSize:"1.02rem", fontWeight:700, color:"#0F172A", marginBottom:".3rem" }}>
              Data extracted
            </div>
            <div style={{ fontSize:".84rem", color:"#64748B", lineHeight:1.45 }}>
              Basket, brand, and competitor intel captured automatically
            </div>
          </div>

          {/* arrow */}
          <div className="jrw-arrow" style={{ display:"flex", alignItems:"center",
            justifyContent:"center" }}>
            <div style={{ width:"100%", height:1,
              background:`linear-gradient(90deg, rgba(45,212,191,.08), ${CYAN_D}, rgba(45,212,191,.08))` }} />
          </div>

          {/* Step 4 — Reward delivered */}
          <div style={{ background:`linear-gradient(180deg, rgba(45,212,191,.08), rgba(45,212,191,0) 42%), #ffffff`, border:"1px solid rgba(13,148,136,.28)",
            borderRadius:"1.25rem", padding:"1.5rem", textAlign:"center",
            minHeight:"238px", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ fontSize:".64rem", fontWeight:700, color:CYAN_D,
              letterSpacing:".12em", marginBottom:"1rem" }}>STEP 4</div>
            {/* email notification */}
            <div style={{ background:"#f8fafc", borderRadius:".625rem",
              padding:".625rem", margin:"0 auto 1rem", width:104,
              boxShadow:"0 4px 16px rgba(0,0,0,.2)", textAlign:"left" }}>
              <div style={{ display:"flex", alignItems:"center", gap:".3rem",
                marginBottom:".4rem", paddingBottom:".35rem",
                borderBottom:"1px solid #e8e8e8" }}>
                <div style={{ width:14, height:14, borderRadius:"50%", flexShrink:0,
                  background:`linear-gradient(135deg, ${CYAN_D}, ${BLUE})`,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:".35rem", color:"#fff", fontWeight:800 }}>SL</span>
                </div>
                <div style={{ fontSize:".42rem", color:"#1d1d1f",
                  fontWeight:700, lineHeight:1.2 }}>Reward Ready</div>
              </div>
              {/* visa card */}
              <div style={{ background:"linear-gradient(135deg,#1a1f36,#2d3561)",
                borderRadius:".4rem", padding:".4rem .5rem" }}>
                <div style={{ display:"flex", justifyContent:"space-between",
                  alignItems:"center", marginBottom:".3rem" }}>
                  <div style={{ fontSize:".35rem", color:"rgba(255,255,255,.45)",
                    letterSpacing:".04em" }}>VISA GIFT</div>
                  <div style={{ fontSize:".52rem", fontWeight:900, color:"#fff",
                    fontStyle:"italic" }}>VISA</div>
                </div>
                <div style={{ fontSize:".62rem", fontWeight:800, color:"#fff" }}>$25 CAD</div>
                <div style={{ fontSize:".35rem", color:"rgba(255,255,255,.4)",
                  marginTop:".2rem", fontFamily:"monospace" }}>···· ···· ···· 4521</div>
              </div>
            </div>
            <div style={{ fontSize:"1.02rem", fontWeight:700, color:"#0F172A", marginBottom:".3rem" }}>
              Paid instantly
            </div>
            <div style={{ fontSize:".84rem", color:"#64748B", lineHeight:1.45 }}>
              A Visa gift card, same day — no cheque, no wait
            </div>
          </div>
        </div>

        {/* scenario toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <div style={{ display: "inline-flex", background: "#EEF2F6", border: "1px solid #E2E8F0", borderRadius: 10, padding: 4, gap: 4 }}>
            {[["oil", "Oil change"], ["pet", "Pet food"]].map(([key, label]) => (
              <button key={key} onClick={() => setMode(key)} className="sl-btn" style={{
                padding: ".5rem 1.15rem", borderRadius: 7, border: "none", cursor: "pointer",
                fontFamily: "'Inter',sans-serif", fontSize: ".85rem", fontWeight: 700, transition: "all .2s",
                background: mode === key ? CYAN_D : "transparent",
                color: mode === key ? "#fff" : "#64748B",
              }}>{label}</button>
            ))}
          </div>
        </div>

        {/* Scan stage */}
        <div className="sl-scan" style={{ display: "grid", gridTemplateColumns: "minmax(0,340px) 1fr", gap: 24, alignItems: "start" }}>
          {/* Receipt */}
          <div>
            <div style={{ position: "relative", borderRadius: 12, boxShadow: "0 24px 60px rgba(0,0,0,.5)", overflow: "hidden", background: S800 }}>
              {V.receiptImg ? (
                <img src={V.receiptImg} alt={V.receiptAlt} style={{ display: "block", width: "100%", height: "auto" }} />
              ) : (
                <div style={{ minHeight: 460, border: "1.5px dashed rgba(45,212,191,.3)", borderRadius: 12, display: "grid", placeItems: "center", padding: "0 24px", textAlign: "center" }}>
                  <div>
                    <Receipt size={40} color={DIM} />
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginTop: 12 }}>{V.placeholder.title}</div>
                    <div style={{ fontSize: 12, color: DIM, marginTop: 5, lineHeight: 1.4 }}>{V.placeholder.note}</div>
                  </div>
                </div>
              )}
              {/* scanline */}
              {phase === "scan" && (
                <>
                  <div style={{ position: "absolute", left: 0, right: 0, top: `${prog}%`, height: 44, transform: "translateY(-50%)", background: "linear-gradient(180deg, rgba(45,212,191,0), rgba(45,212,191,.28), rgba(45,212,191,0))", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, top: `${prog}%`, height: 2, background: CYAN, boxShadow: `0 0 12px ${CYAN}`, pointerEvents: "none" }} />
                </>
              )}
              {/* stamp */}
              <div className="sl-anim" style={{
                position: "absolute", right: 16, bottom: 18, transform: `rotate(-11deg) scale(${done ? 1 : 0.7})`,
                opacity: done ? 1 : 0, transition: "opacity .4s ease .15s, transform .4s ease .15s",
                border: `2.5px solid ${CYAN_D}`, color: CYAN_D, borderRadius: 8, padding: "5px 12px",
                textAlign: "center", background: "rgba(255,255,255,.88)",
              }}>
                <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: ".08em" }}>APPROVED</div>
                <div style={{ fontSize: 9, letterSpacing: ".1em" }}>99.9% CONFIDENCE</div>
              </div>
            </div>

            {/* Controls */}
            <button className="sl-btn sl-anim" onClick={reset} disabled={phase === "scan"} style={{
              marginTop: 14, width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: ".8rem 1rem", borderRadius: 10, fontFamily: "'Inter',sans-serif", fontSize: ".95rem", fontWeight: 700,
              cursor: phase === "scan" ? "default" : "pointer", border: "none",
              color: "#fff", background: phase === "scan" ? S800 : CYAN_D,
              opacity: phase === "scan" ? 0.7 : 1, transition: "background .2s, opacity .2s",
            }}>
              {phase === "scan" ? <><ScanSearch size={17} /> Scanning… {prog}%</> : phase === "done" ? <><RotateCcw size={16} /> Scan again</> : <><ScanSearch size={17} /> Scan receipt</>}
            </button>
          </div>

          {/* Extraction + pipeline */}
          <div style={{ ...dcard, padding: "18px 18px 16px" }}>
            {/* pipeline */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 16 }}>
              {STAGES.map((s, i) => {
                const active = phase !== "idle" && (done || i <= stage);
                const current = phase === "scan" && i === stage;
                return (
                  <div key={i} style={{
                    display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600,
                    padding: "5px 10px", borderRadius: 20,
                    color: active ? "#0F172A" : DIM,
                    background: active ? "rgba(13,148,136,.08)" : "#f1f5f9",
                    border: `1px solid ${current ? CYAN_D : active ? "rgba(13,148,136,.25)" : "#e2e8f0"}`,
                    transition: "all .3s ease",
                  }}>
                    <span style={{ width: 15, height: 15, borderRadius: "50%", display: "grid", placeItems: "center", background: active ? CYAN : "transparent", border: active ? "none" : `1px solid ${DIM}` }}>
                      {active && <Check size={10} color={S950} strokeWidth={3.5} />}
                    </span>
                    {s}
                  </div>
                );
              })}
            </div>

            <div style={{ fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: DIM, marginBottom: 10 }}>Pulled from the receipt</div>
            {V.fields.map((f, i) => (
              <Field key={`${mode}-${i}`} show={shown[i]} delay={i ? .04 : 0} label={f.label} value={f.value} note={f.note} accent={f.accent} />
            ))}

            <Reveal show={done} delay={.1} style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, background: "rgba(13,148,136,.1)", border: "1px solid rgba(45,212,191,.3)" }}>
              <BadgeCheck size={17} color={CYAN_D} />
              <span style={{ fontSize: 13, color: "#334155" }}>
                <b style={{ color: "#0F172A" }}>Approved.</b> {V.approval}
              </span>
            </Reveal>
          </div>
        </div>

        {/* Three benefits */}
        <Reveal show={done} delay={.15} style={{ marginTop: 40 }}>
          <div className="sl-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {/* Speed */}
            <BenefitCard Icon={Zap} title="Speed" body="A reward that lands the same day keeps the brand top of mind and brings the customer back. Weeks of waiting for a cheque turns them off.">
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, background: "rgba(248,113,113,.07)", border: "1px solid rgba(248,113,113,.26)" }}>
                  <ThumbsDown size={22} color="#f87171" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>Cheque in the mail</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#f87171" }}>6–8 weeks</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, background: "rgba(52,211,153,.08)", border: "1px solid rgba(52,211,153,.28)" }}>
                  <ThumbsUp size={22} color="#34d399" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>Digital gift card</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#34d399" }}>Same day or next day</div>
                  </div>
                </div>
              </div>
            </BenefitCard>

            {/* Data */}
            <BenefitCard Icon={Database} title="Data" body="Every customer becomes a clean record that drives a CRM journey built on their type.">
              <div style={{ fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: DIM, marginBottom: 10 }}>Captured per customer</div>
              <div style={{ background: "#ffffff", border: "1px solid #eef2f7", borderRadius: 10, overflow: "hidden" }}>
                {V.record.map((r, i, a) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "8px 12px", borderBottom: i < a.length - 1 ? "1px solid #eef2f7" : "none", background: r.hi ? "rgba(45,212,191,.08)" : "transparent" }}>
                    <span style={{ fontSize: 11, color: DIM }}>{r.k}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: r.hi ? CYAN_D : "#334155" }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </BenefitCard>

            {/* Fraud detection */}
            <BenefitCard Icon={ShieldCheck} title="Fraud detection" body="Catches what a reviewer would miss, and clears the messy parts before they reach you.">
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { Icon: RotateCcw, t: "Blurred or unreadable photos are re-submitted automatically" },
                  { Icon: Check, t: "Duplicates and tampering caught automatically" },
                  { Icon: UserCheck, t: "Edge cases handled by a person on our team, not yours" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <r.Icon size={14} color={CYAN_D} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 12, color: "#334155", lineHeight: 1.4 }}>{r.t}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12 }}>
                <Chip>Predictable flat rate per claim</Chip>
              </div>
            </BenefitCard>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ─── PLATFORM INTELLIGENCE (dashboard, merged) ─────── */
function CommandCenter() {
  const ref = useReveal();
  const panel = { background: S900, border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: "20px 20px 22px", boxShadow: "0 24px 60px rgba(2,6,23,.14)" };
  const eyebrow = { fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: DIM, marginBottom: 12 };

  function AudiencePanel() {
    return (
      <div style={panel}>
        <div style={eyebrow}>Ready to use audiences</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <Audience Icon={TrendingUp} title="High value buyers" count="1,240" rule="Bought 4+ jugs, stocking up" />
          <Audience Icon={Percent} title="Value shoppers" count="1,880" rule="Buys on promotion" />
          <Audience Icon={Droplet} title="Due for next oil change" count="2,130" rule="~6 months since purchase" />
          <Audience Icon={Snowflake} title="Seasonal switch" count="1,540" rule="Winter and summer oil" />
        </div>
      </div>
    );
  }

  function SellingPanel() {
    const breakdowns = [
      { title: "Top retailers", cols: COL_A, bars: [["Canadian Tire", "58%", 100], ["PartSource", "24%", 41], ["Walmart", "11%", 19]] },
      { title: "Top products", cols: COL_B, bars: [["Mobil 1 Full Synthetic 5W30", "44%", 100], ["Mobil 1 Extended Performance", "29%", 66], ["Mobil 1 ESP 5W30", "17%", 39]] },
      { title: "Top complementary products", cols: COL_C, bars: [["Oil filter", "41%", 100], ["Washer fluid", "28%", 68], ["Shop towels", "19%", 46]] },
    ];
    return (
      <div style={panel}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
          <div style={eyebrow}>When submissions come in</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: CYAN }}>
            <TrendingUp size={13} color={CYAN} /> Surge after marketing goes live
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", height: 96 }}>
          <div style={{ flex: SUBS_PRE.length, display: "flex", alignItems: "flex-end", gap: 5, height: "100%" }}>
            {SUBS_PRE.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", height: "100%" }}>
                <div style={{ width: "100%", maxWidth: 26, height: `${h}%`, borderRadius: "4px 4px 0 0", background: "rgba(148,163,184,.26)" }} />
              </div>
            ))}
          </div>
          <div style={{ flex: "0 0 0px", height: "100%", margin: "0 8px", display: "flex", justifyContent: "center" }}>
            <div style={{ width: 0, height: "100%", borderLeft: "1px dashed rgba(45,212,191,.55)" }} />
          </div>
          <div style={{ flex: SUBS_POST.length, display: "flex", alignItems: "flex-end", gap: 5, height: "100%" }}>
            {SUBS_POST.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", height: "100%" }}>
                <div style={{ width: "100%", maxWidth: 26, height: `${h}%`, borderRadius: "4px 4px 0 0", background: `linear-gradient(180deg,${CYAN},${CYAN_D})` }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 7, marginBottom: 20 }}>
          <div style={{ flex: SUBS_PRE.length, textAlign: "center", fontSize: 9.5, color: DIM }}>Before campaign</div>
          <div style={{ flex: "0 0 0px", margin: "0 8px", position: "relative" }}>
            <span style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: 9.5, fontWeight: 700, color: CYAN, background: "rgba(45,212,191,.1)", border: "1px solid rgba(45,212,191,.28)", borderRadius: 6, padding: "2px 6px" }}>Marketing live</span>
          </div>
          <div style={{ flex: SUBS_POST.length, textAlign: "center", fontSize: 9.5, color: MUTED }}>Submissions surge</div>
        </div>
        {breakdowns.map((b, i) => (
          <div key={i} style={{ marginTop: i ? 16 : 0 }}>
            <div style={eyebrow}>{b.title}</div>
            {b.bars.map(([label, value, pct], j) => (
              <Bar key={j} label={label} value={value} pct={pct} accent={b.cols[j]} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  function ValidationPanel() {
    const rej = [["Duplicate submission", 100], ["Outside date range", 80], ["Altered image", 70], ["Product mismatch", 50]];
    const leg = [["Approved", "94%", CYAN], ["Pending re-upload", "4%", AMBER], ["Rejected", "2%", "#f87171"]];
    return (
      <div style={panel}>
        <div style={eyebrow}>Claim audit</div>
        <div style={{ display: "flex", height: 10, borderRadius: 6, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ width: "94%", background: CYAN }} />
          <div style={{ width: "4%", background: AMBER }} />
          <div style={{ width: "2%", background: "#f87171" }} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 16px", marginBottom: 18 }}>
          {leg.map(([l, v, col], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#cbd5e1" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: col }} /> {l} <span style={{ color: MUTED, fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={eyebrow}>Why claims are stopped</div>
        {rej.map(([l, pct], i) => (
          <Bar key={i} label={l} value={`${Math.round(pct / 10)}`} pct={pct} accent="#f87171" />
        ))}
      </div>
    );
  }

  const rows = [
    { textLeft: false, pill: "READY TO USE AUDIENCES", title: "Every claim becomes a customer you can market to.",
      bullets: ["Each validated receipt becomes a named customer, sorted into segments you can push straight to your CRM — high value, deal seekers, due for a repeat, seasonal.", "Not a raw data dump. Ready to activate audiences, with competitor and complementary products captured for cross sell."],
      visual: <AudiencePanel /> },
    { textLeft: true, pill: "BASKET & CAMPAIGN INTELLIGENCE", title: "See every item in the purchase, not just yours.",
      bullets: ["Top retailers, products, and complementary buys across every campaign, with competitor brands and basket value read from each receipt.", "Submissions climb the week a campaign runs, so you can line volume up against the marketing you planned."],
      visual: <SellingPanel /> },
    { textLeft: false, pill: "FRAUD & VALIDATION", title: "Every deceptive submission blocked before payout.",
      bullets: ["Edited images, templated submissions, duplicate receipts, and screenshot fraud caught in real time. Blurry photos re-upload automatically.", "Edge cases go to a person on our team, and fraud, re-uploads, and manual review are all covered in your per claim rate."],
      visual: <ValidationPanel /> },
  ];

  return (
    <section id="features" style={{ background: "#ffffff", padding: "4.5rem 0" }}>
      <div ref={ref} style={{ maxWidth: 1120, margin: "0 auto", padding: "0 2rem" }}>
        <div className="rv" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Pill>PLATFORM INTELLIGENCE</Pill>
          <h2 style={{ fontSize: "clamp(1.9rem,3.5vw,2.75rem)", fontWeight: 800, letterSpacing: "-.035em", color: S900, marginBottom: ".75rem" }}>
            The data that comes with every claim.
          </h2>
          <p style={{ color: "#64748b", fontSize: ".92rem", maxWidth: 820, margin: "0 auto", lineHeight: 1.7, textWrap: "pretty" }}>
            Every receipt becomes an approved claim, a named customer, and a live read on your campaign.
          </p>
        </div>

        <div className="rv td1 sl-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "4rem" }}>
          {[["4,812", "Claims validated"], ["94%", "Approval rate"], ["Same day", "Median payout"], ["312", "Duplicates blocked"]].map(([v, l], i) => (
            <div key={i} style={{ background: "#f8fafc", border: "1px solid #eef2f7", borderRadius: 12, padding: "1.1rem 1.25rem" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: S900, letterSpacing: "-.02em", lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: ".78rem", color: "#94a3b8", marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
          {rows.map((row, i) => (
            <div key={i} className={`rv td${i + 1} zrow`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
              <div className="zrow-text" style={{ order: row.textLeft ? 1 : 2 }}>
                <Pill>{row.pill}</Pill>
                <h3 style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 800, letterSpacing: "-.03em", color: S900, marginBottom: "1.25rem", lineHeight: 1.2 }}>{row.title}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: ".875rem" }}>
                  {row.bullets.map((b, j) => (
                    <div key={j} style={{ display: "flex", gap: ".65rem", alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: CYAN_D, flexShrink: 0, marginTop: 7 }} />
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

/* ─── PRICING ─────────────────────────── */
function Pricing() {
  const ref = useReveal();
  const GRN = "#2DD4BF";
  const included = [
    "Receipt validation, SKU extraction, and 10+ data fields per claim",
    "Fraud detection, duplicate blocking, and automatic re-uploads",
    "Manual review of every exception, handled by our team",
    "Named customer profiles fed to your CRM for future targeting",
    "Instant Visa Giftcard payout the day a claim clears",
  ];
  return (
    <section id="pricing" style={{ background:S950, padding:"3.5rem 0 4.5rem", borderTop:"1px solid rgba(255,255,255,.04)" }}>
      <div ref={ref} style={{ maxWidth:960, margin:"0 auto", padding:"0 2rem" }}>
        <div className="rv" style={{ textAlign:"center", marginBottom:"2.5rem" }}>
          <Pill dark>PRICING</Pill>
          <h2 style={{ fontSize:"clamp(1.7rem,3.5vw,2.5rem)", fontWeight:800, letterSpacing:"-.035em", color:"#fff", marginBottom:".75rem" }}>
            Start with one campaign. Scale when you're ready.
          </h2>
          <p style={{ color:"rgba(255,255,255,.45)", fontSize:".88rem", maxWidth:880, margin:"0 auto", lineHeight:1.65, textWrap:"pretty" }}>
            Both plans include the speed, data, and fraud protection that set us apart. No exception fees, no surprises.
          </p>
        </div>

        <div className="rv td1 pcols" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem", marginBottom:"1.25rem", alignItems:"stretch" }}>
          {/* Pilot */}
          <div style={{ position:"relative", display:"flex", flexDirection:"column", background:S800, border:"1.5px solid rgba(45,212,191,.35)", borderRadius:"1.25rem", padding:"1.9rem", overflow:"hidden", boxShadow:"0 0 60px rgba(45,212,191,.08), 0 24px 64px rgba(0,0,0,.5)" }}>
            <div style={{ position:"absolute", top:-50, right:-50, width:200, height:200, background:"radial-gradient(circle, rgba(45,212,191,.08) 0%, transparent 70%)", pointerEvents:"none" }} />
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:".9rem" }}>
              <span style={{ fontSize:".6rem", fontWeight:700, color:"rgba(45,212,191,.75)", letterSpacing:".12em" }}>SINGLE CAMPAIGN PILOT</span>
              <span style={{ fontSize:".58rem", fontWeight:800, color:S950, background:GRN, padding:"3px 8px", borderRadius:"2rem", letterSpacing:".04em" }}>START HERE</span>
            </div>
            <div style={{ display:"flex", alignItems:"baseline", gap:".3rem" }}>
              <span style={{ fontSize:"2.4rem", fontWeight:900, color:GRN, letterSpacing:"-.04em", lineHeight:1 }}>$1.20</span>
              <span style={{ fontSize:".9rem", color:"rgba(255,255,255,.5)" }}>/ claim</span>
            </div>
            <div style={{ fontSize:".85rem", color:"#fff", fontWeight:600, marginTop:".8rem" }}>No platform fee. No setup.</div>
            <div style={{ fontSize:".85rem", color:"rgba(255,255,255,.5)", marginTop:".25rem", lineHeight:1.5 }}>One campaign, no commitment. The easiest way to see it work on your own receipts.</div>
            <div style={{ marginTop:"auto", paddingTop:"1.5rem" }}>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="bp" style={{ width:"100%", justifyContent:"center", fontSize:".9rem" }}>
                Start a pilot <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Multi-campaign */}
          <div style={{ display:"flex", flexDirection:"column", background:S900, border:"1px solid rgba(255,255,255,.1)", borderRadius:"1.25rem", padding:"1.9rem", boxShadow:"0 16px 48px rgba(0,0,0,.4)" }}>
            <span style={{ fontSize:".6rem", fontWeight:700, color:"#475569", letterSpacing:".12em", marginBottom:".9rem" }}>MULTI-CAMPAIGN</span>
            <div style={{ fontSize:"1.7rem", fontWeight:900, color:GRN, letterSpacing:"-.03em", lineHeight:1.15 }}>
              Volume based pricing
            </div>
            <div style={{ fontSize:".85rem", color:"rgba(255,255,255,.5)", marginTop:".6rem", lineHeight:1.5 }}>
              Your per claim rate drops as combined volume across campaigns grows.
            </div>
            <div style={{ marginTop:"1.1rem", paddingTop:"1.1rem", borderTop:"1px solid rgba(255,255,255,.08)", display:"flex", flexDirection:"column", gap:".65rem" }}>
              <div style={{ display:"flex", gap:".6rem", alignItems:"flex-start" }}>
                <Check size={15} color={GRN} strokeWidth={3} style={{ flexShrink:0, marginTop:2 }} />
                <span style={{ fontSize:".85rem", color:"rgba(255,255,255,.7)", lineHeight:1.5 }}>One flat rate per claim, quoted for your volume</span>
              </div>
              <div style={{ display:"flex", gap:".6rem", alignItems:"flex-start" }}>
                <Check size={15} color={GRN} strokeWidth={3} style={{ flexShrink:0, marginTop:2 }} />
                <span style={{ fontSize:".85rem", color:"rgba(255,255,255,.7)", lineHeight:1.5 }}>No surprise add-on charges beyond that rate</span>
              </div>
            </div>
            <div style={{ marginTop:"auto", paddingTop:"1.5rem" }}>
              <a href={`mailto:${EMAIL}`} className="bo-dark" style={{ width:"100%", justifyContent:"center" }}>
                <Mail size={15} /> Talk to us
              </a>
            </div>
          </div>
        </div>

        <div className="rv td2" style={{ background:S900, border:"1px solid rgba(255,255,255,.09)", borderRadius:"1.25rem", padding:"1.75rem 1.9rem" }}>
          <div style={{ fontSize:".62rem", fontWeight:700, color:GRN, letterSpacing:".1em", marginBottom:"1.1rem" }}>EVERY PLAN INCLUDES</div>
          <div className="pcols" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".85rem 1.75rem" }}>
            {included.map((item,i) => (
              <div key={i} style={{ display:"flex", gap:".6rem", alignItems:"flex-start" }}>
                <Check size={15} color={GRN} strokeWidth={3} style={{ flexShrink:0, marginTop:2 }} />
                <span style={{ fontSize:".88rem", color:"rgba(255,255,255,.7)", lineHeight:1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rv td3" style={{ textAlign:"center", marginTop:"1.5rem" }}>
          <p style={{ fontSize:".76rem", color:"#475569" }}>
            Canadian data residency, PIPEDA compliant. Volume discounts on request.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────── */
const FAQ_DATA = [
  { q:"Do you offer a Master Service Agreement (MSA)?",
    a:"Yes. We have a standard, pre-vetted MSA designed to streamline onboarding for enterprise brands, allowing for a single legal review." },
  { q:"Where is data stored and processed?",
    a:"All PII and receipt images are processed and stored exclusively in Canada." },
  { q:"Is SondarLogic SOC2 Compliant?",
    a:"We operate on SOC2 Type II compliant infrastructure and follow industry-standard encryption (AES-256) for all data at rest and in transit." },
  { q:"Can we customize payout timing and branding?",
    a:"Yes. Payout schedules are fully customizable. We can trigger instant payouts the second a receipt is validated, or batch them on a schedule that matches your program cadence." },
  { q:"How fast can we launch a new promotional campaign?",
    a:"Once the Pilot Agreement is signed, we typically go live within 7–10 business days. Our validation engine is context-aware and does not require retraining for each new product category or receipt format." },
  { q:"How does budget reconciliation work at program end?",
    a:"Any unissued Reward Procurement Budget remaining at program close is reconciled and returned to you within 30 days. Once a digital reward is successfully transmitted to a validated consumer, that allocation is fully deployed. SondarLogic acts as a marketing fulfillment agency procuring and distributing promotional inventory on your behalf — not as a financial intermediary." },
  { q:"Can you handle large claim volumes during peak promotions?",
    a:"Our infrastructure scales to handle significant volume spikes without processing delays. Claims are queued and processed in order with no manual bottlenecks on compliant submissions." },
  { q:"What if a customer uploads a blurry or unreadable receipt?",
    a:"We never auto-deny. Our system sends a branded, automated re-upload request ensuring a positive consumer experience while maintaining program integrity." },
  { q:"What data do I get back besides my own SKU?",
    a:"Full line-item extraction feeds directly into a live dashboard — total receipt values, regional distribution, top performing locations, basket intelligence, and competitor product detection across all submissions." },
  { q:"Is the submission portal white-labeled?",
    a:"Yes. The entire consumer journey from submission portal to the Visa Giftcard delivery email is fully branded to your guidelines." },
  { q:"Do you offer a partner program for rebate processors?",
    a:"Yes. If you process rebate programs for CPG brands and want to offer instant digital payouts and basket intelligence to your clients, reach out directly to partnership@sondarlogic.com." },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const ref = useReveal();
  return (
    <section id="faq" style={{ background:"#fff", padding:"4rem 0" }}>
      <div ref={ref} style={{ maxWidth:720, margin:"0 auto", padding:"0 2rem" }}>
        <div className="rv" style={{ textAlign:"center", marginBottom:"3rem" }}>
          <Pill>FAQ</Pill>
          <h2 style={{ fontSize:"clamp(1.9rem,3.5vw,2.5rem)", fontWeight:800,
            letterSpacing:"-.035em", color:S900, marginBottom:".6rem" }}>
            Engineered for Enterprise.
          </h2>
          <p style={{ color:"#64748b", fontSize:".95rem", maxWidth:480,
            margin:"0 auto", lineHeight:1.65 }}>
            Rigorous security, Canadian data residency, and transparent reporting
            for brands across every consumer category.
          </p>
        </div>
        <div className="rv td1">
          {FAQ_DATA.map((item,i) => (
            <div key={i} style={{ borderBottom:"1px solid #f1f5f9" }}>
              <button onClick={() => setOpenIdx(openIdx===i ? null : i)} style={{
                width:"100%", background:"none", border:"none", cursor:"pointer",
                display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"1.2rem 0", textAlign:"left", gap:"1rem" }}>
                <span style={{ fontSize:".95rem", fontWeight:600,
                  color: openIdx===i ? S900 : "#475569", transition:"color .2s",
                  fontFamily:"'Inter',sans-serif" }}>{item.q}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke={CYAN_D} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ flexShrink:0, transform: openIdx===i ? "rotate(180deg)" : "none",
                    transition:"transform .3s" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div style={{ overflow:"hidden", maxHeight: openIdx===i ? "300px" : 0,
                opacity: openIdx===i ? 1 : 0,
                transition:"max-height .4s ease, opacity .3s ease" }}>
                <p style={{ color:"#64748b", fontSize:".92rem",
                  lineHeight:1.75, paddingBottom:"1.2rem" }}>{item.a}</p>
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
    <section style={{ background:S950, padding:"5rem 0",
      position:"relative", overflow:"hidden", textAlign:"center" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%",
        transform:"translate(-50%,-50%)", width:600, height:350,
        background:"radial-gradient(ellipse, rgba(45,212,191,.14) 0%, transparent 65%)",
        filter:"blur(48px)", pointerEvents:"none" }} />
      <div ref={ref} style={{ maxWidth:680, margin:"0 auto",
        padding:"0 2rem", position:"relative" }}>
        <div className="rv" style={{ display:"flex", justifyContent:"center" }}>
          <Pill dark>GET STARTED</Pill>
        </div>
        <h2 className="rv td1" style={{ fontSize:"clamp(2rem,5vw,3.25rem)", fontWeight:900,
          letterSpacing:"-.045em", color:"#fff", lineHeight:1.08, marginBottom:"1rem" }}>
          Ready to see what is on those receipts?
        </h2>
        <p className="rv td2" style={{ color:"rgba(255,255,255,.45)", fontSize:"1rem",
          lineHeight:1.7, marginBottom:"2.5rem" }}>
          From motor oil to pet food to paint — every receipt your consumers submit
          contains data your team has never had access to.
          And now they get paid the same day.
        </p>
        <div className="rv td3" style={{ display:"flex", gap:"2.5rem",
          justifyContent:"center", alignItems:"flex-start", flexWrap:"wrap" }}>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="bp"
            style={{ fontSize:"1rem", padding:".9rem 2.25rem" }}>
            Book a Demo <ArrowRight size={17}/>
          </a>
          <div style={{ display:"flex", flexDirection:"column",
            alignItems:"flex-start", gap:".3rem" }}>
            <span style={{ fontSize:".58rem", fontWeight:700,
              letterSpacing:".14em", color:"rgba(255,255,255,.28)" }}>DIRECT OUTREACH</span>
            <a href={`mailto:${EMAIL}`} style={{ color:CYAN, fontSize:".93rem",
              fontWeight:500, textDecoration:"none",
              borderBottom:"1px solid rgba(45,212,191,.35)", paddingBottom:"1px" }}>
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
    { h:"PRODUCT", links:[
      { l:"How it Works", id:"how-it-works" },
      { l:"Features",     id:"features"     },
      { l:"Pricing",      id:"pricing"      },
      { l:"FAQ",          id:"faq"          },
    ]},
    { h:"SOLUTIONS", links:[
      { l:"Automotive Rebates"             },
      { l:"CPG Promotions"                 },
      { l:"Paint & Home Improvement"       },
    ]},
    { h:"SUPPORT", links:[
      { l:"Contact Sales", href:`mailto:${EMAIL}` },
    ]},
    { h:"LEGAL", links:[
      { l:"Privacy Policy",   action:"privacy" },
      { l:"Terms of Service", action:"terms"   },
      { l:"PIPEDA Compliance"                  },
      { l:"Security (SOC 2)"                   },
    ]},
  ];
  const lkBase = { color:"#475569", textDecoration:"none", fontSize:".84rem",
    display:"block", marginBottom:".6rem", transition:"color .2s",
    fontFamily:"'Inter', sans-serif" };
  return (
    <footer style={{ background:S950, borderTop:"1px solid rgba(255,255,255,.05)",
      paddingTop:"3rem", paddingBottom:"2rem" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between",
          alignItems:"flex-start", flexWrap:"wrap", gap:"2rem", marginBottom:"3rem" }}>
          <div style={{ maxWidth:300 }}>
            <div style={{ fontSize:"1.05rem", fontWeight:800, color:"#fff",
              letterSpacing:"-.03em", marginBottom:".75rem" }}>
              Sondar <span style={{ color:CYAN_D }}>Logic</span>
            </div>
            <p style={{ fontSize:".875rem", color:"rgba(255,255,255,.3)",
              lineHeight:1.7, marginBottom:"1.25rem" }}>
              Instant rebate processing for Canadian consumer programs.
              Motor oil to pet food to paint — every category, every channel.
            </p>
            <a href={`mailto:${EMAIL}`} style={{ color:CYAN, fontSize:".875rem",
              fontWeight:500, textDecoration:"none" }}>{EMAIL}</a>
          </div>
          <div style={{ display:"flex", gap:"3rem", flexWrap:"wrap" }}>
            {cols.map((col,i) => (
              <div key={i}>
                <div style={{ fontSize:".58rem", fontWeight:700,
                  color:"rgba(255,255,255,.2)", letterSpacing:".14em",
                  marginBottom:"1rem" }}>{col.h}</div>
                {col.links.map((lnk,j) => (
                  lnk.action
                    ? <button key={j} onClick={() => { setActiveView(lnk.action); window.scrollTo(0,0); }}
                        style={{ ...lkBase, background:"none", border:"none",
                          cursor:"pointer", padding:0 }}
                        onMouseEnter={e => e.target.style.color="#e2e8f0"}
                        onMouseLeave={e => e.target.style.color="#475569"}>
                        {lnk.l}
                      </button>
                    : lnk.id
                      ? <a key={j} href={`#${lnk.id}`} style={lkBase}
                          onClick={e => { e.preventDefault(); document.getElementById(lnk.id)?.scrollIntoView({ behavior:"smooth" }); }}
                          onMouseEnter={e => e.target.style.color="#e2e8f0"}
                          onMouseLeave={e => e.target.style.color="#475569"}>
                          {lnk.l}
                        </a>
                      : <a key={j} href={lnk.href||"#"} style={lkBase}
                          onMouseEnter={e => e.target.style.color="#e2e8f0"}
                          onMouseLeave={e => e.target.style.color="#475569"}>
                          {lnk.l}
                        </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.05)",
          paddingTop:"1.25rem", textAlign:"center", marginBottom:".6rem" }}>
          <span style={{ fontSize:".76rem", color:"rgba(255,255,255,.15)" }}>
            © 2026 Sondar Logic. Built in Burlington, Ontario.
          </span>
        </div>
        <p style={{ textAlign:"center", fontSize:".65rem", color:"#475569",
          lineHeight:1.6, maxWidth:860, margin:"0 auto" }}>
          <span style={{ fontWeight:600 }}>Promotional Reward Policy:</span> All rebates
          issued via SondarLogic are classified as Promotional Rewards (non-purchased incentives)
          procured and distributed by SondarLogic as a contracted marketing fulfillment service
          on behalf of the sponsoring brand. Digital Visa Gift Cards carry a twelve-month
          validity period from date of issuance. SondarLogic operates as a marketing automation
          and fulfillment agency and does not provide financial services.
        </p>
      </div>
    </footer>
  );
}

/* ─── LEGAL ───────────────────────────────────────────────── */
const lbs={color:"#64748b",fontSize:".93rem",lineHeight:1.8,marginBottom:"1rem"};
const lh2s={fontSize:"1.05rem",fontWeight:700,color:S900,letterSpacing:"-.02em",marginBottom:".5rem",marginTop:"2rem"};

function LegalPage({ title, effectiveDate, children, onBack }) {
  return (
    <div style={{ minHeight:"100vh", background:"#fff" }}>
      <div style={{ position:"sticky", top:0, zIndex:200,
        background:"rgba(255,255,255,.96)", backdropFilter:"blur(16px)",
        borderBottom:"1px solid #f1f5f9", padding:".875rem 2rem" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <button onClick={onBack} style={{ background:"none",
            border:"1px solid #e2e8f0", borderRadius:".5rem",
            padding:".4rem .875rem", color:"#475569", fontSize:".82rem",
            fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>
            ← Back to Home
          </button>
        </div>
      </div>
      <div style={{ maxWidth:800, margin:"0 auto", padding:"4rem 2rem 6rem" }}>
        <Pill>{title.toUpperCase()}</Pill>
        <h1 style={{ fontSize:"clamp(1.9rem,4vw,2.75rem)", fontWeight:800,
          letterSpacing:"-.035em", color:S900, marginBottom:".5rem" }}>{title}</h1>
        <p style={{ color:"#94a3b8", fontSize:".82rem", marginBottom:"3rem",
          borderBottom:"1px solid #f1f5f9", paddingBottom:"1.5rem" }}>
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
      <h2 style={lh2s}>Introduction</h2>
      <p style={lbs}>Sondar Logic, headquartered in Burlington, Ontario, provides an automated rebate validation and fulfillment platform. This Privacy Policy outlines how we collect, use, disclose, and safeguard personal information in compliance with PIPEDA.</p>
      <h2 style={lh2s}>Information We Collect</h2>
      <p style={lbs}>We act as a Data Processor on behalf of our enterprise clients. We collect end-consumer data (names, email addresses, geographic location), transaction data (receipt images, purchase details), and B2B client data (billing details, usage metrics).</p>
      <h2 style={lh2s}>How We Use Your Information</h2>
      <p style={lbs}>We use collected information for claim validation, digital payout routing, anonymized business intelligence reporting, and automated consumer support updates.</p>
      <h2 style={lh2s}>Data Storage and Localization</h2>
      <p style={lbs}>All receipt data and PII are hosted on servers physically located within Canada.</p>
      <h2 style={lh2s}>Data Sharing</h2>
      <p style={lbs}>We do not sell, rent, or trade personal data. Data is only shared with vetted sub-processors essential to operations, all bound by strict confidentiality agreements.</p>
      <h2 style={lh2s}>Security</h2>
      <p style={lbs}>We employ AES-256 encryption at rest and TLS 1.2+ in transit.</p>
      <h2 style={lh2s}>Contact Us</h2>
      <p style={lbs}>Sondar Logic, Burlington, Ontario. <a href={`mailto:${EMAIL}`} style={{ color:CYAN_D, textDecoration:"none" }}>{EMAIL}</a></p>
    </LegalPage>
  );
}

function TermsOfService({ onBack }) {
  return (
    <LegalPage title="Terms of Service" effectiveDate="March 2026" onBack={onBack}>
      <h2 style={lh2s}>Acceptance of Terms</h2>
      <p style={lbs}>By accessing or using the Sondar Logic platform, API, or dashboard, you agree to be bound by these Terms of Service.</p>
      <h2 style={lh2s}>Service Description</h2>
      <p style={lbs}>Sondar Logic provides an automated, proprietary receipt validation and rebate disbursement engine including fraud detection, basket data extraction, and API routing for digital payouts.</p>
      <h2 style={lh2s}>Accuracy and Manual Review</h2>
      <p style={lbs}>Claims scoring above our confidence threshold are automatically approved. Claims below threshold are routed to a human review queue with a 3 business day SLA.</p>
      <h2 style={lh2s}>Fees and Payout Funding</h2>
      <p style={lbs}>Clients are billed a flat monthly platform license fee plus per-claim processing. All-inclusive per claim rate covers exception handling. Clients maintain sufficient payout funding with our Canadian payment partner.</p>
      <h2 style={lh2s}>Data Ownership</h2>
      <p style={lbs}>SondarLogic retains all IP rights to the platform. The Client retains all rights to their consumer data and basket intelligence provided via the platform.</p>
      <h2 style={lh2s}>Limitation of Liability</h2>
      <p style={lbs}>Our total liability is limited to fees paid by Client in the three months preceding any claim.</p>
      <h2 style={lh2s}>Governing Law</h2>
      <p style={lbs}>Governed by the laws of the Province of Ontario and applicable federal laws of Canada.</p>
    </LegalPage>
  );
}

/* ─── ROOT ────────────────────────────────────────────────── */
export default function SondarLogicAI() {
  const [activeView, setActiveView] = useState("home");

  useEffect(() => {
    const GA_ID = "G-KRCG9CCSJG";
    const s = document.createElement("script");
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID);
  }, []);

  useEffect(() => {
    try {
      const KEY = "sl_lead_fired";
      if (sessionStorage.getItem(KEY)) return;
      const viewer = new URLSearchParams(window.location.search).get("viewer");
      if (!viewer) return;
      sessionStorage.setItem(KEY, "1");
      const t = new Date().toLocaleString("en-US", {
        timeZone:"America/New_York", year:"numeric", month:"2-digit",
        day:"2-digit", hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false,
      });
      fetch("https://hook.us2.make.com/ptrjonu1yma9t174qbtsvjobblrsswk7", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ visitor:viewer, timestamp:t, page:window.location.pathname }),
      }).catch(()=>{});
    } catch(_){}
  }, []);

  useEffect(() => {
    if (activeView !== "home") return;
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold:0.07 }
    );
    const t = setTimeout(() =>
      document.querySelectorAll(".rv").forEach(el => obs.observe(el)), 60);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [activeView]);

  if (activeView==="privacy") return (
    <><style dangerouslySetInnerHTML={{__html:G}}/>
      <PrivacyPolicy onBack={() => { setActiveView("home"); window.scrollTo(0,0); }}/></>
  );
  if (activeView==="terms") return (
    <><style dangerouslySetInnerHTML={{__html:G}}/>
      <TermsOfService onBack={() => { setActiveView("home"); window.scrollTo(0,0); }}/></>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:G}}/>
      <Navbar/>
      <Hero/>
      <JourneySection/>
      <CommandCenter/>
      <Pricing/>
      <FAQ/>
      <FinalCTA/>
      <Footer setActiveView={setActiveView}/>
    </>
  );
}
