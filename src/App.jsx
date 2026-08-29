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
const PET_RECEIPT = "/receipts/pet-receipt.jpg";
const CT_RECEIPT = "/receipts/ct-receipt.jpg";
/* Exact oil SKU on the receipt: Mobil 1™ ESP Emission System Protection 5W30 Synthetic Engine/Motor Oil, 4.73-L */

const VARIANTS = {
  oil: {
    receiptImg: CT_RECEIPT,
    receiptAlt: "Canadian Tire receipt, Mobil 1 rebate",
    receiptW: 534, receiptH: 700,
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
    receiptW: 620, receiptH: 816,
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
                <img src={V.receiptImg} alt={V.receiptAlt} width={V.receiptW} height={V.receiptH}
                  fetchPriority="high"
                  style={{ display: "block", width: "100%", height: "auto" }} />
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

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_DATA.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a },
  })),
};

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const ref = useReveal();
  return (
    <section id="faq" style={{ background:"#fff", padding:"4rem 0" }}>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
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
      <main>
        <Hero/>
        <JourneySection/>
        <CommandCenter/>
        <Pricing/>
        <FAQ/>
        <FinalCTA/>
      </main>
      <Footer setActiveView={setActiveView}/>
    </>
  );
}
