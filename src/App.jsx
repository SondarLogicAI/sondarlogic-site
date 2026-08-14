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
    sub:"Instant Visa Giftcard payout the moment a claim is approved. Full basket intelligence and competitive data on every receipt — from motor oil to pet food to paint.",
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
    <section style={{ background:S950, paddingTop:"7rem", paddingBottom:"3rem",
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
        <p className="fu d3" style={{ color:"rgba(255,255,255,.45)", fontSize:"1.05rem",
          lineHeight:1.75, maxWidth:580, margin:"0 auto 2.5rem" }}>{c.sub}</p>
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
const dcard = { background: S900, border: `1px solid ${LINE}`, borderRadius: 14 };

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
const CT_RECEIPT = "data:image/jpeg;base64,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gAAAAAAAAAAAAAAAAAAAAAABBgAgAAAAAADBABDCAAAAAAAAAAAAAAAAAAAAAAABCAACAAAAADizggjTQAgQihAAAAAAAAAAAAAAAAAADwCyAAAABBAADBADACBCDCAAAAAAAAAAAAAAAAAADCAAAAAABDDhjjAAhShAigAAAAAAAAAAAAAAAAAABAAggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABACBACBACBACBACBACBACBACBACBACBACBACAAAAAQwAggAAAAAAAAAAAAAAAAAAAAAAAAAAQggAAAAAAAADCBAAAAAAAAAAAAAAAAAAAAAAAAABDAAAAAAABAyhRQAAAAAAAAAAAAAAAAAAAAAAAAAAAiigAAAAABAACCAAAAAAAAAAAAAAAAAAAAAAAAAACCDAAAAABCjTogAAAAAAAAAAAAAAAAAAAAAAAABiRxTwgAAAABCDAAAAAAAAAAAAAAAAAAAAAAAAAADCDDDAAAAAAQAgQAgQAgQAgQAgQAgQAgQAgQAgQAgQAgQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjQiCDBAADBiQAAAAAAAAAAAAAAAAABTyyAAAAAAAwwAAgQQAgQwwAAAAAAAAAAAAAAAAAAAAAAAAAAACABBABCABDBBAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAgQAgQAgQAgQAgQAgQAgQAgQAgQAgQAgQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABhRBiwBRQADwQBRyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCDhjywACDxiDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAwQjTACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT6KDr7aj5jrbJaD6Jr7rr77b57r7r57767YgAAABT4ICr5aj6ipYJYD4Kr6qr75b76r6r77775agAAABT4ICr5aj6ipYJYD4Kr6qr75b76r6r77775agAAAACCCBDDACBBDDBCwTBwBBwTDABBADAADBCDAAAAAAAAAAAAAAAAAAADDCBACCAAAAAAAAAAAAAAAAAAAAAAAAAAA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";
/* Exact oil SKU on the receipt: Mobil 1™ ESP Emission System Protection 5W30 Synthetic Engine/Motor Oil, 4.73-L */

const VARIANTS = {
  oil: {
    receiptImg: CT_RECEIPT,
    receiptAlt: "Canadian Tire receipt, Mobil 1 rebate",
    placeholder: { title: "Canadian Tire receipt", note: "Drop a real receipt here \u2014 it scans the same way." },
    fields: [
      { label: "Retailer & date", value: "Canadian Tire \u00b7 Mar 8, 2026" },
      { label: "Qualifying product", value: "Mobil 1 ESP 5W30 Synthetic \u00b7 4.73 L", note: "$5 rebate" },
      { label: "Also in the basket", value: "Oil filter \u00b7 Nitrile gloves", note: "Cross sell", accent: AMBER },
      { label: "Quantity", value: "4 jugs \u00b7 stocking up", note: "High value", accent: AMBER },
      { label: "Customer (from the form)", value: "Mike Chen \u00b7 opted in" },
    ],
    approval: "Window, product, retailer and receipt all check out. Edge cases go to our team, so nothing lands on yours.",
    record: [
      { k: "Customer", v: "Mike Chen" },
      { k: "Product", v: "Mobil 1 ESP 5W30" },
      { k: "Also bought", v: "Oil filter" },
      { k: "Quantity", v: "4 jugs" },
      { k: "Segment", v: "High value", hi: true },
    ],
    audiences: [
      { Icon: TrendingUp, title: "High value buyers", count: "1,240", rule: "Bought 4+ jugs, stocking up" },
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
      background: "rgba(255,255,255,.03)", border: `1px solid ${LINE}`,
      borderLeft: `2px solid ${accent || CYAN}`, borderRadius: 8, marginBottom: 7,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: DIM, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e2e8f0", lineHeight: 1.35 }}>{value}</div>
      </div>
      {note && (
        <span style={{
          flexShrink: 0, fontSize: 10, fontWeight: 700, letterSpacing: ".04em",
          padding: "3px 8px", borderRadius: 20, marginTop: 2,
          color: accent === AMBER ? AMBER : CYAN,
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
      color: on ? CYAN : "#cbd5e1",
      background: on ? "rgba(45,212,191,.1)" : "rgba(255,255,255,.04)",
      border: `1px solid ${on ? "rgba(45,212,191,.28)" : LINE}`,
    }}>
      {Ic && <Ic size={11} color={on ? CYAN : DIM} strokeWidth={2.5} />}{children}
    </span>
  );
}

function BenefitCard({ Icon, title, body, lead, children }) {
  return (
    <div style={{
      ...dcard, padding: "20px 18px", display: "flex", flexDirection: "column",
      ...(lead ? {
        borderColor: "rgba(45,212,191,.4)",
        background: `linear-gradient(180deg, rgba(45,212,191,.06), rgba(15,23,42,0) 42%), ${S900}`,
      } : {}),
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 10, display: "grid", placeItems: "center", background: "rgba(45,212,191,.1)", border: "1px solid rgba(45,212,191,.22)" }}>
          <Icon size={19} color={CYAN} />
        </div>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>{title}</h3>
      </div>
      <p style={{ fontSize: ".92rem", color: MUTED, lineHeight: 1.55, marginBottom: 16 }}>{body}</p>
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
    <section ref={ref} id="how-it-works" style={{ background: S950, padding: "5rem 1.25rem 5.5rem", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes slPulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .sl-btn:focus-visible{ outline:2px solid ${CYAN}; outline-offset:2px; }
        @media (prefers-reduced-motion: reduce){ .sl-anim{ animation:none!important; transition:none!important; } }
        @media (max-width:860px){ .sl-scan{ grid-template-columns:1fr!important; } .sl-3{ grid-template-columns:1fr!important; } .sl-dash{ grid-template-columns:1fr!important; } .sl-stats{ grid-template-columns:repeat(2,1fr)!important; } }
      `}</style>

      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: CYAN, background: "rgba(45,212,191,.1)", border: "1px solid rgba(45,212,191,.25)", padding: ".3rem .9rem", borderRadius: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: CYAN, animation: "slPulse 2s infinite" }} />
            How it works
          </span>
          <h2 style={{ fontSize: "clamp(1.7rem,3.4vw,2.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.12, margin: "1rem auto .8rem", maxWidth: 760, letterSpacing: "-.02em" }}>
            One scan turns a receipt into an approved claim<br />and a customer you can market to
          </h2>
          <p style={{ fontSize: "1.05rem", color: MUTED, maxWidth: 620, margin: "0 auto 1.4rem", lineHeight: 1.55 }}>
            A real rebate claim, running through the engine. Every field it reads becomes either a decision or a marketing signal.
          </p>
          {/* scenario toggle */}
          <div style={{ display: "inline-flex", background: "rgba(255,255,255,.06)", border: `1px solid ${LINE}`, borderRadius: 10, padding: 4, gap: 4 }}>
            {[["oil", "Oil change"], ["pet", "Pet food"]].map(([key, label]) => (
              <button key={key} onClick={() => setMode(key)} className="sl-btn" style={{
                padding: ".5rem 1.15rem", borderRadius: 7, border: "none", cursor: "pointer",
                fontFamily: "'Inter',sans-serif", fontSize: ".85rem", fontWeight: 700, transition: "all .2s",
                background: mode === key ? CYAN_D : "transparent",
                color: mode === key ? "#fff" : "rgba(255,255,255,.5)",
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
                    color: active ? "#fff" : DIM,
                    background: active ? "rgba(45,212,191,.1)" : "rgba(255,255,255,.03)",
                    border: `1px solid ${current ? CYAN : active ? "rgba(45,212,191,.28)" : LINE}`,
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
              <BadgeCheck size={17} color={CYAN} />
              <span style={{ fontSize: 13, color: "#e2e8f0" }}>
                <b style={{ color: "#fff" }}>Approved.</b> {V.approval}
              </span>
            </Reveal>
          </div>
        </div>

        {/* Three benefits */}
        <Reveal show={done} delay={.15} style={{ marginTop: 40 }}>
          <div className="sl-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {/* Speed */}
            <BenefitCard Icon={Zap} title="Speed" lead body="A reward that lands the same day keeps the brand top of mind and brings the customer back. Weeks of waiting for a cheque turns them off.">
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, background: "rgba(248,113,113,.07)", border: "1px solid rgba(248,113,113,.26)" }}>
                  <ThumbsDown size={22} color="#f87171" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>Cheque in the mail</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#f87171" }}>6–8 weeks</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, background: "rgba(52,211,153,.08)", border: "1px solid rgba(52,211,153,.28)" }}>
                  <ThumbsUp size={22} color="#34d399" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>Digital gift card</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#34d399" }}>Same day or next day</div>
                  </div>
                </div>
              </div>
            </BenefitCard>

            {/* Data */}
            <BenefitCard Icon={Database} title="Data" body="Every customer becomes a clean record that drives a CRM journey built on their type.">
              <div style={{ fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: DIM, marginBottom: 10 }}>Captured per customer</div>
              <div style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${LINE}`, borderRadius: 10, overflow: "hidden" }}>
                {V.record.map((r, i, a) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "8px 12px", borderBottom: i < a.length - 1 ? `1px solid ${LINE}` : "none", background: r.hi ? "rgba(45,212,191,.06)" : "transparent" }}>
                    <span style={{ fontSize: 11, color: DIM }}>{r.k}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: r.hi ? CYAN : "#e2e8f0" }}>{r.v}</span>
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
                    <r.Icon size={14} color={CYAN} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.4 }}>{r.t}</span>
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
          <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
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
          <p style={{ color:"rgba(255,255,255,.45)", fontSize:".95rem", maxWidth:540, margin:"0 auto", lineHeight:1.65 }}>
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
            <div style={{ display:"flex", alignItems:"baseline", gap:".3rem" }}>
              <span style={{ fontSize:"2.4rem", fontWeight:900, color:GRN, letterSpacing:"-.04em", lineHeight:1 }}>$0.70–0.99</span>
              <span style={{ fontSize:".9rem", color:"rgba(255,255,255,.5)" }}>/ claim</span>
            </div>
            <div style={{ fontSize:".8rem", color:"rgba(255,255,255,.5)", marginTop:".55rem" }}>based on volume</div>
            <div style={{ marginTop:"1.1rem", paddingTop:"1.1rem", borderTop:"1px solid rgba(255,255,255,.08)", display:"flex", flexDirection:"column", gap:".65rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                <span style={{ fontSize:".85rem", color:"rgba(255,255,255,.55)" }}>Platform fee</span>
                <span style={{ fontSize:".9rem", color:"#fff", fontWeight:700 }}>$1,500 / month</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                <span style={{ fontSize:".85rem", color:"rgba(255,255,255,.55)" }}>Campaign setup</span>
                <span style={{ fontSize:".9rem", color:"#fff", fontWeight:700 }}>$400 / campaign</span>
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
