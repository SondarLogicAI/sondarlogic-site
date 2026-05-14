import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Upload, ScanSearch, ShoppingCart,
  Banknote, Mail, BarChart3, Zap, Database,
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
function Navbar({ audience, setAudience }) {
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
        {/* toggle */}
        <div style={{ display:"flex", background:"rgba(255,255,255,.06)",
          borderRadius:".5rem", padding:".2rem", flexShrink:0, gap:".15rem" }}>
          {["Brands","Partners"].map(a => (
            <button key={a} onClick={() => setAudience(a)} style={{
              padding:".3rem .875rem", borderRadius:".35rem", border:"none",
              fontSize:".78rem", fontWeight:600, cursor:"pointer",
              fontFamily:"'Inter',sans-serif", transition:"all .2s",
              background: audience===a ? CYAN_D : "transparent",
              color: audience===a ? "#fff" : "rgba(255,255,255,.45)",
            }}>
              {a==="Brands" ? "For Brands" : "For Partners"}
            </button>
          ))}
        </div>
        <div className="nav-d" style={{ display:"flex", gap:"1.75rem", flex:1, justifyContent:"center" }}>
          {[
            { l:"How it Works", id:"how-it-works" },
            { l:"Features",     id:"features"     },
            { l:"Pricing",      id:"pricing"      },
            { l:"For Partners", id:"partners"     },
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
function Hero({ audience, setAudience }) {
  const content = {
    Brands: {
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
      cta1:{ label:"Book a Demo",           href:CALENDLY,          ext:true  },
      cta2:{ label:"Email Us",              href:`mailto:${EMAIL}`, ext:false, icon:true },
    },
    Partners: {
      pill:"TECHNOLOGY PARTNER PROGRAM · CANADA",
      h1:<>Your technology layer.</>,
      accent:"Already built.",
      sub:"Plug our validation and payout engine underneath your existing programs. Reduce manual review cost. Add instant Visa Giftcard payout as a premium your clients are already asking for.",
      stats:[
        { v:"< 8s",     l:"per claim validated"    },
        { v:"$0",       l:"add-on fees"         },
        { v:"10+",      l:"data fields returned"   },
        { v:"Same day", l:"payout execution"       },
      ],
      cta1:{ label:"Discuss a Partnership", href:`mailto:${EMAIL}`, ext:false, icon:true },
      cta2:{ label:"Book a Technical Call", href:CALENDLY,          ext:true  },
    },
  };
  const c = content[audience];
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
        {/* toggle */}
        <div className="fu hero-toggle" style={{ display:"flex", justifyContent:"center",
          gap:".5rem", marginBottom:"1.75rem" }}>
          {["Brands","Partners"].map(a => (
            <button key={a} onClick={() => setAudience(a)} style={{
              padding:".5rem 1.5rem", borderRadius:"2rem", border:"none",
              fontSize:".82rem", fontWeight:700, cursor:"pointer",
              fontFamily:"'Inter',sans-serif",
              transition:"all .25s",
              background: audience===a ? CYAN_D : "rgba(255,255,255,.06)",
              color: audience===a ? "#fff" : "rgba(255,255,255,.4)",
              boxShadow: audience===a ? `0 0 20px rgba(13,148,136,.35)` : "none",
            }}>
              {a==="Brands" ? "For Brands" : "For Partners"}
            </button>
          ))}
        </div>
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
function JourneySection() {
  const ref = useReveal();
  return (
    <section id="how-it-works" style={{ background:S950, padding:"2.5rem 0 4rem",
      borderTop:"1px solid rgba(255,255,255,.04)" }}>
      <div ref={ref} style={{ maxWidth:1100, margin:"0 auto", padding:"0 2rem" }}>

        {/* header */}
        <div className="rv" style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <Pill dark>FROM RECEIPT TO REWARD</Pill>
          <h2 style={{ fontSize:"clamp(1.9rem,3.5vw,2.75rem)", fontWeight:800,
            letterSpacing:"-.035em", color:"#fff", marginBottom:".75rem" }}>
            One receipt. Under 8 seconds.<br/>
            <span className="grad-text">Ten insights. Instant payout.</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,.4)", fontSize:"1rem",
            maxWidth:500, margin:"0 auto", lineHeight:1.7 }}>
            Every claim your consumer submits unlocks a complete picture of that purchase —
            and puts a Visa Giftcard in their inbox before they leave the store.
          </p>
        </div>

        {/* ── STEP STRIP ── */}
        <div className="rv td1 journey-grid" style={{
          display:"grid",
          gridTemplateColumns:"1fr 28px 1fr 28px 1fr 28px 1fr",
          alignItems:"center", gap:0, marginBottom:"3rem" }}>

          {/* Step 1 — Phone scan */}
          <div style={{ background:S800, border:"1px solid rgba(45,212,191,.25)",
            borderRadius:"1.25rem", padding:"1.5rem", textAlign:"center",
            minHeight:"220px", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ fontSize:".52rem", fontWeight:700, color:CYAN,
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
            <div style={{ fontSize:".78rem", fontWeight:600, color:"#fff", marginBottom:".25rem" }}>
              Consumer submits
            </div>
            <div style={{ fontSize:".7rem", color:"rgba(255,255,255,.35)", lineHeight:1.4 }}>
              Photo of receipt
            </div>
          </div>

          {/* arrow */}
          <div className="jrw-arrow" style={{ display:"flex", alignItems:"center",
            justifyContent:"center", flexDirection:"column", gap:".2rem" }}>
            <div style={{ width:"100%", height:1,
              background:`linear-gradient(90deg, rgba(45,212,191,.08), ${CYAN_D}, rgba(45,212,191,.08))` }} />
          </div>

          {/* Step 2 — Validated */}
          <div style={{ background:S800, border:"1px solid rgba(45,212,191,.25)",
            borderRadius:"1.25rem", padding:"1.5rem", textAlign:"center",
            minHeight:"220px", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ fontSize:".52rem", fontWeight:700, color:CYAN,
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
            <div style={{ fontSize:".78rem", fontWeight:600, color:"#fff", marginBottom:".25rem" }}>
              Validated
            </div>
            <div style={{ fontSize:".7rem", color:"rgba(255,255,255,.35)", lineHeight:1.4 }}>
              Under 8 seconds
            </div>
          </div>

          {/* arrow */}
          <div className="jrw-arrow" style={{ display:"flex", alignItems:"center",
            justifyContent:"center" }}>
            <div style={{ width:"100%", height:1,
              background:`linear-gradient(90deg, rgba(45,212,191,.08), ${CYAN_D}, rgba(45,212,191,.08))` }} />
          </div>

          {/* Step 3 — Intelligence */}
          <div style={{ background:S800, border:"1px solid rgba(45,212,191,.25)",
            borderRadius:"1.25rem", padding:"1.5rem", textAlign:"center",
            minHeight:"220px", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ fontSize:".52rem", fontWeight:700, color:CYAN,
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
            <div style={{ fontSize:".78rem", fontWeight:600, color:"#fff", marginBottom:".25rem" }}>
              Intelligence extracted
            </div>
            <div style={{ fontSize:".7rem", color:"rgba(255,255,255,.35)", lineHeight:1.4 }}>
              10+ data points captured
            </div>
          </div>

          {/* arrow */}
          <div className="jrw-arrow" style={{ display:"flex", alignItems:"center",
            justifyContent:"center" }}>
            <div style={{ width:"100%", height:1,
              background:`linear-gradient(90deg, rgba(45,212,191,.08), ${CYAN_D}, rgba(45,212,191,.08))` }} />
          </div>

          {/* Step 4 — Reward delivered */}
          <div style={{ background:S800, border:"1px solid rgba(45,212,191,.25)",
            borderRadius:"1.25rem", padding:"1.5rem", textAlign:"center",
            minHeight:"220px", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ fontSize:".52rem", fontWeight:700, color:CYAN,
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
            <div style={{ fontSize:".78rem", fontWeight:600, color:"#fff", marginBottom:".25rem" }}>
              Reward delivered
            </div>
            <div style={{ fontSize:".7rem", color:"rgba(255,255,255,.35)", lineHeight:1.4 }}>
              Instant — same day
            </div>
          </div>
        </div>

        {/* ── EXTRACTION PANEL ── */}
        <div className="rv td2" style={{ background:S800,
          border:"1px solid rgba(255,255,255,.07)", borderRadius:"1.25rem",
          overflow:"hidden", marginBottom:"1.5rem" }}>
          <div style={{ padding:"1rem 1.75rem",
            borderBottom:"1px solid rgba(255,255,255,.05)" }}>
            <div style={{ fontSize:".56rem", fontWeight:700, color:CYAN,
              letterSpacing:".1em" }}>WHAT GETS EXTRACTED FROM EVERY RECEIPT</div>
          </div>
          <div className="extract-grid" style={{ display:"grid",
            gridTemplateColumns:"1fr 1fr", gap:0, alignItems:"stretch" }}>
            {/* receipt */}
            <div style={{ padding:"1.5rem 1.75rem",
              borderRight:"1px solid rgba(255,255,255,.05)" }}>
              <div style={{ fontSize:".5rem", fontWeight:700, color:"#475569",
                letterSpacing:".1em", marginBottom:".875rem" }}>SAMPLE RECEIPT</div>
              <div style={{ background:"#fff", borderRadius:".75rem",
                padding:"1rem", boxShadow:"0 4px 20px rgba(0,0,0,.3)" }}>
                <div style={{ fontSize:".52rem", fontWeight:800, color:"#1d1d1f",
                  textAlign:"center", marginBottom:".5rem",
                  letterSpacing:".1em", fontFamily:"monospace" }}>RECEIPT</div>
                <div style={{ height:".5px", background:"#e0e0e0", marginBottom:".5rem" }} />
                <div style={{ fontSize:".46rem", color:"#86868b",
                  marginBottom:".5rem", lineHeight:1.6, fontFamily:"monospace" }}>
                  Store Name · Address<br/>Date: Jan 16, 2026 · #100456
                </div>
                <div style={{ height:".5px", background:"#f0f0f0", marginBottom:".4rem" }} />
                {[
                  { l:"Annual Service Check",  p:"$110.00", hi:false,      red:false },
                  { l:"Professional Service",  p:"$580.00", hi:false,      red:false },
                  { l:"Qualifying Product",     p:"$135.00", hi:true,       red:false },
                  { l:"Complementary Item A",   p:"$245.00", hi:false,      red:false },
                  { l:"Competitor Product",     p:"$24.99",  hi:false,      red:true  },
                ].map((r,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between",
                    alignItems:"center", padding:".2rem .3rem", marginBottom:".15rem",
                    borderRadius:".2rem",
                    background: r.hi ? "rgba(13,148,136,.08)" : r.red ? "rgba(239,68,68,.06)" : "transparent",
                    border: r.hi ? `0.5px solid rgba(13,148,136,.2)` : r.red ? "0.5px solid rgba(239,68,68,.15)" : "none" }}>
                    <span style={{ fontSize:".47rem", color: r.hi ? CYAN_D : r.red ? "#ef4444" : "#475569",
                      fontWeight: r.hi ? 700 : 400, fontFamily:"monospace" }}>{r.l}</span>
                    <span style={{ fontSize:".47rem", color: r.hi ? CYAN_D : "#86868b",
                      fontWeight: r.hi ? 700 : 400, fontFamily:"monospace" }}>{r.p}</span>
                  </div>
                ))}
                <div style={{ height:".5px", background:"#e0e0e0", margin:".5rem 0 .4rem" }} />
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontSize:".5rem", fontWeight:700,
                    color:"#1d1d1f", fontFamily:"monospace" }}>TOTAL</span>
                  <span style={{ fontSize:".5rem", fontWeight:700,
                    color:"#1d1d1f", fontFamily:"monospace" }}>$1,094.99</span>
                </div>
              </div>
            </div>
            {/* extracted */}
            <div style={{ padding:"1.5rem 1.75rem" }}>
              <div style={{ fontSize:".5rem", fontWeight:700, color:CYAN,
                letterSpacing:".1em", marginBottom:".875rem" }}>EXTRACTED & STRUCTURED</div>
              <div style={{ display:"flex", flexDirection:"column", gap:".5rem" }}>
                {[
                  { label:"Qualifying SKU",      value:"Confirmed — product matched"         },
                  { label:"Purchase Price",       value:"$135.00 extracted"                  },
                  { label:"Total Receipt Value",  value:"$1,094.99"                          },
                  { label:"Basket Items",         value:"3 additional items identified"      },
                  { label:"Competitor Product",   value:"Detected — brand and SKU captured"  },
                  { label:"Invoice Number",       value:"#100456"                            },
                  { label:"Location",             value:"Store name and address confirmed"   },
                  { label:"Confidence Score",     value:"99.9% — approved for payout"        },
                ].map((r,i) => (
                  <div key={i} style={{
                    padding:".5rem .875rem",
                    borderRadius:"2rem",
                    background:"rgba(45,212,191,.06)",
                    border:"1px solid rgba(45,212,191,.25)",
                    display:"flex", alignItems:"center",
                    justifyContent:"space-between", gap:".75rem"
                  }}>
                    <span style={{ fontSize:".62rem", fontWeight:700, color:"rgba(255,255,255,.45)",
                      letterSpacing:".04em", whiteSpace:"nowrap" }}>{r.label}</span>
                    <span style={{ fontSize:".72rem", color:CYAN, fontWeight:600,
                      textAlign:"right", lineHeight:1.3 }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BEFORE / AFTER ── */}
        <div className="rv td3 ba-grid" style={{ display:"grid",
          gridTemplateColumns:"1fr 1fr", gap:"1px",
          background:"rgba(255,255,255,.06)", borderRadius:"1rem", overflow:"hidden" }}>
          <div style={{ background:S900, padding:"1.25rem 1.75rem",
            display:"flex", alignItems:"center", gap:"1rem" }}>
            <div style={{ width:36, height:36, borderRadius:".5rem", flexShrink:0,
              background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.2)",
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize:".55rem", fontWeight:700, color:"#ef4444",
                letterSpacing:".1em", marginBottom:".2rem" }}>LEGACY PROCESSOR</div>
              <div style={{ fontSize:".9rem", fontWeight:700, color:"#fff",
                marginBottom:".15rem" }}>Paper cheque in the mail</div>
              <div style={{ fontSize:".75rem", color:"rgba(255,255,255,.3)" }}>
                8 to 10 weeks — if it arrives at all
              </div>
            </div>
          </div>
          <div style={{ background:"rgba(13,148,136,.07)", padding:"1.25rem 1.75rem",
            display:"flex", alignItems:"center", gap:"1rem" }}>
            <div style={{ width:36, height:36, borderRadius:".5rem", flexShrink:0,
              background:"rgba(45,212,191,.12)", border:"1px solid rgba(45,212,191,.25)",
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize:".55rem", fontWeight:700, color:CYAN,
                letterSpacing:".1em", marginBottom:".2rem" }}>SONDARLOGIC</div>
              <div style={{ fontSize:".9rem", fontWeight:700, color:"#fff",
                marginBottom:".15rem" }}>Instant Visa Giftcard by email</div>
              <div style={{ fontSize:".75rem", color:"rgba(255,255,255,.3)" }}>
                Same day as approval — accepted everywhere Visa is accepted
              </div>
            </div>
          </div>
        </div>

        {/* human review note */}
        <div className="rv td3" style={{ marginTop:"1.25rem",
          background:"rgba(13,148,136,.05)", border:"1px solid rgba(13,148,136,.15)",
          borderRadius:".875rem", padding:".875rem 1.25rem",
          display:"flex", alignItems:"flex-start", gap:".875rem" }}>
          <div style={{ width:6, height:6, borderRadius:"50%",
            background:CYAN_D, flexShrink:0, marginTop:5 }} />
          <p style={{ color:"#475569", fontSize:".84rem", lineHeight:1.65 }}>
            <span style={{ color:CYAN_D, fontWeight:700 }}>Human review: </span>
            Claims scoring below our confidence threshold are never auto-denied.
            Every flagged claim enters a secure human review queue with a
            3-business-day audit SLA and automated follow-up to the consumer.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ─── COMMAND CENTER ──────────────────────────────────────── */
function CommandCenter() {
  const ref = useReveal();

  function BasketMockup() {
    const T=CYAN_D, B="#378add", P="#7f77dd";
    return (
      <div style={{ background:"#fff", border:"0.5px solid rgba(0,0,0,.09)",
        borderRadius:14, padding:"1.25rem", boxShadow:"0 4px 20px rgba(0,0,0,.06)" }}>
        <div style={{ display:"flex", justifyContent:"space-between",
          alignItems:"center", marginBottom:".875rem" }}>
          <span style={{ fontSize:".62rem", fontWeight:700, color:T, letterSpacing:".08em" }}>CAMPAIGN INTELLIGENCE</span>
          <div style={{ display:"flex", alignItems:"center", gap:".3rem" }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e", animation:"pdot 2s infinite" }} />
            <span style={{ fontSize:".58rem", color:"#22c55e", fontWeight:600 }}>LIVE</span>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:".4rem", marginBottom:".875rem" }}>
          {[{l:"Claims",v:"1,000",c:T},{l:"Value",v:"$25K",c:"#1d1d1f"},{l:"Approval",v:"91%",c:T},{l:"Competitor",v:"12%",c:"#1d1d1f"}].map((k,i) => (
            <div key={i} style={{ background:"#f5f5f7", borderRadius:8, padding:".45rem .5rem" }}>
              <div style={{ fontSize:".5rem", color:"#86868b", marginBottom:2 }}>{k.l}</div>
              <div style={{ fontSize:".9rem", fontWeight:600, color:k.c, lineHeight:1 }}>{k.v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom:".75rem" }}>
          <div style={{ fontSize:".56rem", color:"#86868b", letterSpacing:".06em", marginBottom:".45rem" }}>CAMPAIGN BREAKDOWN</div>
          {[{l:"Campaign A",v:622,pct:100,c:B},{l:"Campaign B",v:272,pct:43.7,c:T},{l:"Campaign C",v:106,pct:17,c:P}].map((c,i) => (
            <div key={i} style={{ marginBottom: i<2 ? ".38rem" : 0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:".15rem" }}>
                <span style={{ fontSize:".6rem", color:"#1d1d1f" }}>{c.l}</span>
                <span style={{ fontSize:".6rem", color:"#86868b", fontWeight:600 }}>{c.v}</span>
              </div>
              <div style={{ height:5, background:"#f0f0f0", borderRadius:3 }}>
                <div style={{ height:"100%", width:`${c.pct}%`, background:c.c, borderRadius:3 }} />
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:".56rem", color:"#86868b", letterSpacing:".06em", marginBottom:".45rem" }}>TOP COMPETITOR PRODUCTS</div>
          {[["Competitor A — Product 1",19],["Competitor A — Product 2",18],["Competitor B — Product 1",13],["Competitor C — Product 1",12]].map(([l,v],i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:".28rem 0", borderBottom: i<3 ? "0.5px solid rgba(0,0,0,.06)" : "none" }}>
              <span style={{ fontSize:".6rem", color:"#1d1d1f" }}>{l}</span>
              <span style={{ fontSize:".6rem", color:"#86868b", fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function FraudMockup() {
    const T=CYAN_D, A="#f4a623", R="#e24b4a";
    return (
      <div style={{ background:"#fff", border:"0.5px solid rgba(0,0,0,.09)",
        borderRadius:14, padding:"1.25rem", boxShadow:"0 4px 20px rgba(0,0,0,.06)" }}>
        <div style={{ fontSize:".62rem", fontWeight:700, color:R, letterSpacing:".08em", marginBottom:".875rem" }}>CLAIM AUDIT RESULTS</div>
        <div style={{ display:"flex", alignItems:"center", gap:"1.25rem", marginBottom:"1rem", paddingBottom:"1rem", borderBottom:"0.5px solid rgba(0,0,0,.06)" }}>
          <div style={{ flexShrink:0, width:88, height:88, borderRadius:"50%",
            background:`conic-gradient(${T} 0% 91%, ${A} 91% 97%, ${R} 97% 100%)`,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:58, height:58, borderRadius:"50%", background:"#fff",
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:".9rem", fontWeight:700, color:T, lineHeight:1 }}>91%</span>
              <span style={{ fontSize:".42rem", color:"#86868b" }}>APPROVED</span>
            </div>
          </div>
          <div style={{ flex:1 }}>
            {[{c:T,l:"Approved",v:"91%"},{c:A,l:"Pending re-upload",v:"6%"},{c:R,l:"Rejected",v:"3%"}].map((row,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:7, marginBottom: i<2 ? 7 : 0 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:row.c, flexShrink:0 }} />
                <span style={{ fontSize:".62rem", color:"#1d1d1f", flex:1 }}>{row.l}</span>
                <span style={{ fontSize:".62rem", color:"#86868b", fontWeight:600 }}>{row.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize:".56rem", color:"#86868b", letterSpacing:".06em", marginBottom:".5rem" }}>REJECTION REASONS</div>
          {[{l:"Duplicate submission",v:10},{l:"Outside date range",v:8},{l:"Altered image",v:7},{l:"Product mismatch",v:5}].map((row,i) => (
            <div key={i} style={{ marginBottom: i<3 ? ".4rem" : 0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:".15rem" }}>
                <span style={{ fontSize:".6rem", color:"#1d1d1f" }}>{row.l}</span>
                <span style={{ fontSize:".6rem", color:"#86868b", fontWeight:600 }}>{row.v}</span>
              </div>
              <div style={{ height:5, background:"#f0f0f0", borderRadius:3 }}>
                <div style={{ height:"100%", width:`${(row.v/10)*100}%`, background:R, borderRadius:3, opacity:.75 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function MapMockup() {
    const data=[42,68,72,55,60,65,58,70,62,54,61,66,50,55,47,53];
    const W=380,H=68,PAD=4;
    const pts=data.map((v,i)=>[(((i/15)*W)).toFixed(1),(PAD+(1-v/90)*H).toFixed(1)]);
    const line=pts.map(p=>p.join(",")).join(" ");
    const area=`M ${pts[0].join(",")} L ${pts.slice(1).map(p=>p.join(",")).join(" L ")} L ${pts[15][0]},${PAD+H} L ${pts[0][0]},${PAD+H} Z`;
    const B="#378add",C2="#d85a30",T=CYAN_D,P="#7f77dd",A="#f4a623",Gr="#888780";
    const pg=`conic-gradient(${B} 0% 44.8%,${C2} 44.8% 57.9%,${T} 57.9% 68.7%,${P} 68.7% 78.3%,${A} 78.3% 86.1%,${Gr} 86.1% 100%)`;
    return (
      <div style={{ background:"#fff", border:"0.5px solid rgba(0,0,0,.09)",
        borderRadius:14, padding:"1.25rem", boxShadow:"0 4px 20px rgba(0,0,0,.06)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:".875rem" }}>
          <span style={{ fontSize:".62rem", fontWeight:700, color:"#1d1d1f", letterSpacing:".08em" }}>MARKET INTELLIGENCE</span>
          <div style={{ display:"flex", alignItems:"center", gap:".3rem" }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e", animation:"pdot 2s infinite" }} />
            <span style={{ fontSize:".58rem", color:"#22c55e", fontWeight:600 }}>LIVE</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:"1rem", marginBottom:".875rem", paddingBottom:".875rem", borderBottom:"0.5px solid rgba(0,0,0,.06)" }}>
          <div style={{ flexShrink:0 }}>
            <div style={{ fontSize:".52rem", color:"#86868b", letterSpacing:".06em", marginBottom:".4rem" }}>BY REGION</div>
            <div style={{ width:68,height:68,borderRadius:"50%",background:pg,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <div style={{ width:44,height:44,borderRadius:"50%",background:"#fff" }} />
            </div>
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", gap:5 }}>
            {[{c:B,l:"Region 1",v:"44.8%"},{c:C2,l:"Region 2",v:"13.1%"},{c:T,l:"Region 3",v:"10.8%"},{c:P,l:"Region 4",v:"9.6%"},{c:Gr,l:"Other",v:"21.7%"}].map((r,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:7,height:7,borderRadius:2,background:r.c,flexShrink:0 }} />
                <span style={{ fontSize:".6rem",color:"#1d1d1f",flex:1 }}>{r.l}</span>
                <span style={{ fontSize:".6rem",color:"#86868b",fontWeight:600 }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize:".52rem",color:"#86868b",letterSpacing:".06em",marginBottom:".4rem" }}>SUBMISSION TIMELINE — 16 WEEKS</div>
          <svg viewBox={`0 0 ${W} ${PAD+H+14}`} style={{ width:"100%",height:"auto" }}>
            <path d={area} fill="rgba(13,148,136,0.08)" />
            <polyline points={line} fill="none" stroke={T} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
            {pts.map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r="2" fill={T} stroke="#fff" strokeWidth="1" />)}
            {[0,3,7,11,15].map(idx=><text key={idx} x={(idx/15)*W} y={PAD+H+11} textAnchor="middle" fontSize="7" fill="#86868b">W{idx+1}</text>)}
          </svg>
        </div>
      </div>
    );
  }

  const rows=[
    { textLeft:true, pill:"DEEP BASKET EXTRACTION", title:"See every item in the purchase, not just yours.",
      bullets:["Every receipt is read in full — competitor brands, complementary products, service line items, and total purchase value extracted per claim automatically","Understand what else your customers buy alongside your product at no extra cost — basket intelligence is included in every plan"],
      visual:<BasketMockup /> },
    { textLeft:false, pill:"FRAUD INTELLIGENCE", title:"Every deceptive submission blocked before payout.",
      bullets:["Our system detects digitally edited images, templated submissions, duplicate receipts, and screenshot fraud in real time","Fraud protection, re-uploads, and manual review are all covered in your per claim rate — nothing billed separately"],
      visual:<FraudMockup /> },
    { textLeft:true, pill:"MARKET INTELLIGENCE", title:"Know exactly where your product is selling.",
      bullets:["Track claim volume by region and location with postal code precision, updated live across all active campaigns","Understand geographic distribution, top performing markets, and submission trends — motor oil, paint, pet food, tires — every category"],
      visual:<MapMockup /> },
  ];

  return (
    <section id="features" style={{ background:"#f8fafc", padding:"4rem 0" }}>
      <div ref={ref} style={{ maxWidth:1120, margin:"0 auto", padding:"0 2rem" }}>
        <div className="rv" style={{ textAlign:"center", marginBottom:"4rem" }}>
          <Pill>PLATFORM INTELLIGENCE</Pill>
          <h2 style={{ fontSize:"clamp(1.9rem,3.5vw,2.75rem)", fontWeight:800,
            letterSpacing:"-.035em", color:S900, marginBottom:".75rem" }}>
            The data that comes with every claim.
          </h2>
          <p style={{ color:"#64748b", fontSize:"1rem", maxWidth:480,
            margin:"0 auto", lineHeight:1.7 }}>
            Three intelligence engines running on every receipt.
            Every category. Every channel.
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"5rem" }}>
          {rows.map((row,i) => (
            <div key={i} className={`rv td${i+1} zrow`}
              style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
                gap:"4rem", alignItems:"center" }}>
              <div className="zrow-text" style={{ order:row.textLeft ? 1 : 2 }}>
                <Pill>{row.pill}</Pill>
                <h3 style={{ fontSize:"clamp(1.4rem,2.5vw,2rem)", fontWeight:800,
                  letterSpacing:"-.03em", color:S900, marginBottom:"1.25rem",
                  lineHeight:1.2 }}>{row.title}</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:".875rem" }}>
                  {row.bullets.map((b,j) => (
                    <div key={j} style={{ display:"flex", gap:".65rem", alignItems:"flex-start" }}>
                      <div style={{ width:6, height:6, borderRadius:"50%",
                        background:CYAN_D, flexShrink:0, marginTop:7 }} />
                      <span style={{ fontSize:".93rem", color:"#475569", lineHeight:1.65 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="zrow-visual" style={{ order:row.textLeft ? 2 : 1 }}>{row.visual}</div>
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
  return (
    <section id="pricing" style={{ background:S950, padding:"2.5rem 0 4rem",
      borderTop:"1px solid rgba(255,255,255,.04)" }}>
      <div ref={ref} style={{ maxWidth:860, margin:"0 auto", padding:"0 2rem" }}>
        <div className="rv" style={{ textAlign:"center", marginBottom:"3rem" }}>
          <Pill dark>PRICING</Pill>
          <h2 style={{ fontSize:"clamp(1.7rem,3.5vw,2.5rem)", fontWeight:800,
            letterSpacing:"-.035em", color:"#fff", marginBottom:".75rem" }}>
            Transparent pricing model. Custom quotes on request.
          </h2>
          <p style={{ color:"rgba(255,255,255,.4)", fontSize:".93rem",
            maxWidth:440, margin:"0 auto", lineHeight:1.65 }}>
            All-inclusive per claim rate. Nothing billed separately. Book a call for a custom quote.
          </p>
        </div>
        <div className="rv td1 pcols" style={{ display:"grid",
          gridTemplateColumns:"1fr 1fr", gap:"1.25rem", marginBottom:"1.5rem" }}>

          {/* Pilot */}
          <div style={{ background:S900, border:"1px solid rgba(255,255,255,.1)",
            borderRadius:"1.25rem", padding:"1.75rem",
            boxShadow:"0 16px 48px rgba(0,0,0,.4)" }}>
            <div style={{ fontSize:".56rem", fontWeight:700, color:"#475569",
              letterSpacing:".12em", marginBottom:".75rem" }}>SINGLE CAMPAIGN PILOT</div>
            <div style={{ marginBottom:".35rem" }}>
              <span style={{ fontSize:"2rem", fontWeight:900, color:CYAN,
                letterSpacing:"-.04em" }}>No Platform Fee</span>
            </div>
            <div style={{ fontSize:".85rem", color:CYAN, fontWeight:600,
              marginBottom:"1.25rem" }}>Flat per claim rate · No long-term commitment</div>
            <div style={{ height:".5px", background:"rgba(255,255,255,.07)",
              marginBottom:"1rem" }} />
            {[
              "Up to 3 campaigns",
              "One submission form per campaign",
              "Full receipt validation and SKU extraction",
              "Basket analysis — all line items",
              "Competitor product detection",
              "Duplicate and fraud detection",
              "Automated re-upload request email",
              "Manual review on all rejected claims",
              "Instant Visa Giftcard payout",
              "Complete intelligence dashboard — 18 panels",
              "Canadian data residency — PIPEDA compliant",
            ].map((item,i) => (
              <div key={i} style={{ display:"flex", gap:".5rem",
                alignItems:"flex-start", marginBottom:".4rem" }}>
                <span style={{ color:CYAN, fontSize:".72rem", flexShrink:0, marginTop:1 }}>✓</span>
                <span style={{ fontSize:".82rem", color:"rgba(255,255,255,.5)",
                  lineHeight:1.45 }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop:"1.25rem" }}>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="bp"
                style={{ width:"100%", justifyContent:"center", fontSize:".9rem" }}>
                Book a pilot call <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Enterprise */}
          <div style={{ background:S800, border:`1.5px solid rgba(45,212,191,.35)`,
            borderRadius:"1.25rem", padding:"1.75rem", position:"relative",
            overflow:"hidden",
            boxShadow:"0 0 60px rgba(45,212,191,.08), 0 24px 64px rgba(0,0,0,.5)" }}>
            <div style={{ position:"absolute", top:-50, right:-50, width:200, height:200,
              background:"radial-gradient(circle, rgba(45,212,191,.08) 0%, transparent 70%)",
              pointerEvents:"none" }} />
            <div style={{ fontSize:".56rem", fontWeight:700,
              color:"rgba(45,212,191,.7)", letterSpacing:".12em",
              marginBottom:".75rem" }}>ENTERPRISE MULTI CAMPAIGN</div>
            <div style={{ marginBottom:".35rem" }}>
              <span style={{ fontSize:"2rem", fontWeight:900, color:CYAN,
                letterSpacing:"-.04em" }}>Monthly Platform Fee</span>
            </div>
            <div style={{ fontSize:".85rem", color:CYAN, fontWeight:600,
              marginBottom:"1.25rem" }}>Volume tiered per claim rate · Scales as you grow</div>
            <div style={{ background:"rgba(45,212,191,.07)",
              border:"1px solid rgba(45,212,191,.18)", borderRadius:".5rem",
              padding:".4rem .75rem", marginBottom:"1rem" }}>
              <span style={{ fontSize:".75rem", color:CYAN, fontWeight:600 }}>Everything in Pilot </span>
              <span style={{ fontSize:".75rem", color:"#fff", fontWeight:800 }}>PLUS</span>
              <span style={{ fontSize:".75rem", color:CYAN, fontWeight:600 }}> the following:</span>
            </div>
            {[
              "Unlimited campaigns across all brands",
              "Multiple submission forms",
              "Rates decrease automatically as monthly volume scales",
              "Claim data delivered to your CRM automatically",
              "Custom dashboard panels per brand request",
              "Manual review with committed SLA",
              "Priority support",
              "Annual MSA with defined terms",
            ].map((item,i) => (
              <div key={i} style={{ display:"flex", gap:".5rem",
                alignItems:"flex-start", marginBottom:".4rem" }}>
                <span style={{ color:CYAN, fontSize:".72rem", flexShrink:0, marginTop:1 }}>✓</span>
                <span style={{ fontSize:".82rem", color:"rgba(255,255,255,.5)",
                  lineHeight:1.45 }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop:"1.25rem" }}>
              <a href={`mailto:${EMAIL}`} className="bp"
                style={{ width:"100%", justifyContent:"center", fontSize:".9rem" }}>
                <Mail size={15} /> Discuss enterprise pricing
              </a>
            </div>
          </div>
        </div>
        <div className="rv td2" style={{ textAlign:"center" }}>
          <p style={{ fontSize:".78rem", color:"#334155" }}>
            All plans include Canadian data residency and PIPEDA compliance.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY SONDARLOGIC ─────────────────────────────────────── */
function WhySondarLogic() {
  const ref = useReveal();
  const pillars = [
    { icon:<Zap size={24} strokeWidth={1.75} color={CYAN}/>,
      title:"Instant payout. Same day.",
      body:"Consumers receive a digital Visa Giftcard the moment their claim is approved — not weeks later. The payout experience reflects directly on your brand.",
      stat:"Same day", statLabel:"Visa Giftcard delivery" },
    { icon:<Database size={24} strokeWidth={1.75} color={CYAN}/>,
      title:"Data you have never had before.",
      body:"Every receipt contains a complete purchase picture — what else was bought, what competitor products were present, what services accompanied the sale. Legacy processors give you a yes or a no.",
      stat:"10+", statLabel:"data points per claim" },
    { icon:<Zap size={24} strokeWidth={1.75} color={CYAN}/>,
      title:"One rate. Everything included.",
      body:"Blurry receipts trigger automated re-upload. Duplicates caught automatically. Fraud flagged without a reviewer. Re-uploads, exception handling, and manual review are all covered in your per claim rate.",
      stat:"$0", statLabel:"add-on fees" },
  ];
  return (
    <section style={{ background:S950, padding:"2.5rem 0 4rem",
      borderTop:"1px solid rgba(255,255,255,.04)" }}>
      <div ref={ref} style={{ maxWidth:1100, margin:"0 auto", padding:"0 2rem" }}>
        <div className="rv" style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <Pill dark>WHY SONDARLOGIC</Pill>
          <h2 style={{ fontSize:"clamp(1.7rem,3.5vw,2.5rem)", fontWeight:800,
            letterSpacing:"-.035em", color:"#fff", marginBottom:".6rem" }}>
            Built differently. Priced differently.
          </h2>
          <p style={{ color:"rgba(255,255,255,.4)", fontSize:".93rem",
            maxWidth:500, margin:"0 auto", lineHeight:1.65 }}>
            Legacy processors charge per touch. We automated all of it and charge one flat rate.
          </p>
        </div>
        <div className="rv td1 why-grid" style={{ display:"grid",
          gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem" }}>
          {pillars.map((p,i) => (
            <div key={i} style={{ background:S800, border:"1px solid rgba(255,255,255,.07)",
              borderRadius:"1.25rem", padding:"1.75rem", display:"flex",
              flexDirection:"column", gap:"1rem", transition:"border-color .25s, transform .25s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(45,212,191,.3)";e.currentTarget.style.transform="translateY(-3px)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.07)";e.currentTarget.style.transform="none"}}>
              <div style={{ width:48, height:48, borderRadius:".75rem",
                background:"rgba(45,212,191,.1)", border:"1px solid rgba(45,212,191,.2)",
                display:"flex", alignItems:"center", justifyContent:"center" }}>{p.icon}</div>
              <div>
                <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#fff",
                  letterSpacing:"-.02em", marginBottom:".625rem", lineHeight:1.3 }}>{p.title}</h3>
                <p style={{ fontSize:".85rem", color:"rgba(255,255,255,.45)", lineHeight:1.7 }}>{p.body}</p>
              </div>
              <div style={{ marginTop:"auto", paddingTop:"1rem",
                borderTop:"1px solid rgba(255,255,255,.06)" }}>
                <div style={{ fontSize:"1.75rem", fontWeight:900, color:CYAN,
                  letterSpacing:"-.04em", lineHeight:1 }}>{p.stat}</div>
                <div style={{ fontSize:".7rem", color:"rgba(255,255,255,.3)",
                  marginTop:".25rem" }}>{p.statLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESSING PARTNERS ─────────────────────────────────── */
function ProcessingPartners() {
  const ref = useReveal();
  const capabilities = [
    { icon:<Zap size={20} strokeWidth={1.75} color={CYAN}/>,
      title:"Reduce manual review cost",
      body:"Our validation engine automates every clean claim — receipt reading, SKU extraction, fraud detection, and duplicate blocking. Your team handles exceptions only. Your cost per claim drops as volume scales." },
    { icon:<Banknote size={20} strokeWidth={1.75} color={CYAN}/>,
      title:"Offer instant digital payout as a premium",
      body:"Replace the paper cheque with an instant Visa Giftcard the same day a claim is approved. A premium your clients will pay more for — and a consumer experience that sets you apart from every other processor in the market." },
    { icon:<BarChart3 size={20} strokeWidth={1.75} color={CYAN}/>,
      title:"Deliver data your clients have never had",
      body:"Basket intelligence, competitor product detection, service correlation — structured data extracted from every receipt, delivered back to your platform in real time. Insights your clients have never had access to before." },
  ];
  return (
    <section id="partners" style={{ background:S900, padding:"4rem 0",
      borderTop:"1px solid rgba(255,255,255,.05)",
      borderBottom:"1px solid rgba(255,255,255,.05)" }}>
      <div ref={ref} style={{ maxWidth:1100, margin:"0 auto", padding:"0 2rem" }}>
        <div className="rv" style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <Pill dark>FOR PROCESSING PARTNERS</Pill>
          <h2 style={{ fontSize:"clamp(1.7rem,3.5vw,2.6rem)", fontWeight:800,
            letterSpacing:"-.035em", color:"#fff", marginBottom:".75rem", lineHeight:1.1 }}>
            Power your clients' rebate programs<br/>with SondarLogic technology.
          </h2>
          <p style={{ color:"rgba(255,255,255,.4)", fontSize:".95rem",
            maxWidth:560, margin:"0 auto", lineHeight:1.7 }}>
            We are not here to compete with rebate processors. We are the technology layer underneath.
            You keep your client relationships and your billing rates.
          </p>
        </div>
        <div className="rv td1 partner-grid" style={{ display:"grid",
          gridTemplateColumns:"repeat(3,1fr)", gap:"1.5rem", marginBottom:"3.5rem" }}>
          {capabilities.map((c,i) => (
            <div key={i} style={{ background:S800, border:"1px solid rgba(255,255,255,.07)",
              borderRadius:"1.25rem", padding:"1.75rem",
              transition:"border-color .25s, transform .25s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(45,212,191,.3)";e.currentTarget.style.transform="translateY(-3px)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.07)";e.currentTarget.style.transform="none"}}>
              <div style={{ width:40, height:40, borderRadius:".625rem",
                background:"rgba(45,212,191,.1)", border:"1px solid rgba(45,212,191,.2)",
                display:"flex", alignItems:"center", justifyContent:"center",
                marginBottom:"1rem" }}>{c.icon}</div>
              <h3 style={{ fontSize:".95rem", fontWeight:700, color:"#fff",
                letterSpacing:"-.02em", marginBottom:".625rem", lineHeight:1.3 }}>{c.title}</h3>
              <p style={{ fontSize:".84rem", color:"rgba(255,255,255,.45)", lineHeight:1.7 }}>{c.body}</p>
            </div>
          ))}
        </div>
        <div className="rv td2" style={{ background:S800,
          border:"1px solid rgba(45,212,191,.2)", borderRadius:"1.25rem",
          padding:"2rem 2.5rem", display:"flex", alignItems:"center",
          justifyContent:"space-between", gap:"2rem", flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:280 }}>
            <div style={{ fontSize:".6rem", fontWeight:700, color:CYAN,
              letterSpacing:".1em", marginBottom:".625rem" }}>THE PARTNER MODEL</div>
            <p style={{ fontSize:".95rem", color:"rgba(255,255,255,.7)", lineHeight:1.7 }}>
              Your client. Your billing rate. Your brand on all consumer communications.
              SondarLogic stays invisible. You get faster processing, lower labour cost,
              and a premium instant payout product your clients are already asking for.
            </p>
            <div style={{ marginTop:"1.25rem", display:"flex", gap:"1.5rem", flexWrap:"wrap" }}>
              {[{v:"< 8s",l:"per claim validated"},{v:"$0",l:"add-on fees"},{v:"10+",l:"data fields returned"}].map((s,i) => (
                <div key={i}>
                  <div style={{ fontSize:"1.4rem", fontWeight:900, color:CYAN,
                    letterSpacing:"-.04em", lineHeight:1 }}>{s.v}</div>
                  <div style={{ fontSize:".68rem", color:"rgba(255,255,255,.3)",
                    marginTop:".2rem" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:".875rem", flexShrink:0 }}>
            <a href={`mailto:${EMAIL}`} className="bp"
              style={{ fontSize:".95rem", padding:".875rem 2rem" }}>
              <Mail size={16}/> Discuss a Partnership
            </a>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
              className="bo-dark" style={{ justifyContent:"center" }}>
              Book a Technical Call
            </a>
          </div>
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
      { l:"Processing Partners", id:"partners" },
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
  const [audience, setAudience] = useState("Brands");

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
      <Navbar audience={audience} setAudience={setAudience}/>
      <Hero audience={audience} setAudience={setAudience}/>
      <JourneySection/>
      <CommandCenter/>
      <Pricing/>
      <WhySondarLogic/>
      <ProcessingPartners/>
      <FAQ/>
      <FinalCTA/>
      <Footer setActiveView={setActiveView}/>
    </>
  );
}
