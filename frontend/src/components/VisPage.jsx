// import { useState } from "react";
// import { useFetch, Icon, Spinner, ReportImage, API } from "./Home";

// // ─── THEME ────────────────────────────────────────────────────────────────────
// const T = {
//   green:       "#1B7A4E",
//   greenMid:    "#25A468",
//   greenLight:  "#E8F8F0",
//   greenPale:   "#F2FCF7",
//   greenBright: "#34C77B",
//   accent:      "#0D6640",
//   mint:        "#A8E6C8",
//   bg:          "#F7FAF8",
//   surface:     "#FFFFFF",
//   border:      "#E2EDE8",
//   text:        "#0F1F17",
//   textMid:     "#2D4A3A",
//   muted:       "#7A9E8C",
//   radius:      "16px",
//   radiusSm:    "10px",
//   shadow:      "0 2px 14px rgba(27,122,78,0.08)",
//   shadowMd:    "0 6px 30px rgba(27,122,78,0.16)",
// };

// // ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
// function Lightbox({ src, caption, onClose }) {
//   const [scale, setScale] = useState(1);
//   const zoom = (d) => setScale(s => Math.min(4, Math.max(0.5, s + d)));

//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: "fixed", inset: 0, zIndex: 9999,
//         background: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//       }}
//     >
//       <div onClick={e => e.stopPropagation()} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
//         {/* image */}
//         <div style={{ overflow: "hidden", borderRadius: 16, maxWidth: "85vw", maxHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//           <img
//             src={src} alt={caption}
//             style={{ transform: `scale(${scale})`, transformOrigin: "center", transition: "transform .2s ease", maxWidth: "85vw", maxHeight: "75vh", objectFit: "contain", display: "block" }}
//           />
//         </div>
//         {/* caption */}
//         <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 600 }}>{caption}</div>
//         {/* controls */}
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <ZoomBtn onClick={() => zoom(-0.25)} label="−" />
//           <div style={{ color: "white", fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", background: "rgba(255,255,255,0.12)", padding: "5px 16px", borderRadius: 99 }}>
//             {Math.round(scale * 100)}%
//           </div>
//           <ZoomBtn onClick={() => zoom(0.25)} label="+" />
//           <ZoomBtn onClick={() => setScale(1)} label="↺" title="Reset" />
//           <ZoomBtn onClick={onClose} label="✕" title="Close" danger />
//         </div>
//       </div>
//     </div>
//   );
// }

// function ZoomBtn({ onClick, label, danger }) {
//   return (
//     <button onClick={onClick} style={{
//       width: 38, height: 38, borderRadius: "50%", border: "none", cursor: "pointer",
//       background: danger ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.15)",
//       color: "white", fontSize: 16, fontWeight: 700,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       transition: "background .15s",
//     }}
//       onMouseEnter={e => e.currentTarget.style.background = danger ? "rgba(239,68,68,0.45)" : "rgba(255,255,255,0.28)"}
//       onMouseLeave={e => e.currentTarget.style.background = danger ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.15)"}
//     >
//       {label}
//     </button>
//   );
// }

// // ─── ZOOMABLE REPORT IMAGE CARD ───────────────────────────────────────────────
// function ReportCard({ name, caption, badge }) {
//   const [lb, setLb] = useState(false);
//   const [hover, setHover] = useState(false);
//   const [err, setErr] = useState(false);
//   const src = `${API}/reports/${name}.png`;

//   return (
//     <>
//       {lb && <Lightbox src={src} caption={caption} onClose={() => setLb(false)} />}
//       <div
//         style={{
//           background: T.surface, borderRadius: T.radius,
//           border: `1.5px solid ${T.border}`,
//           boxShadow: hover ? T.shadowMd : T.shadow,
//           overflow: "hidden", transition: "box-shadow .2s, transform .2s",
//           transform: hover ? "translateY(-2px)" : "",
//           cursor: "pointer",
//         }}
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(false)}
//       >
//         {/* card header */}
//         <div style={{ padding: "13px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.greenBright }} />
//             <span style={{ fontSize: 12, fontWeight: 700, color: T.textMid }}>{caption}</span>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//             {badge && <span style={{ fontSize: 10, fontWeight: 700, background: T.greenLight, color: T.green, padding: "2px 9px", borderRadius: 99 }}>{badge}</span>}
//             {/* zoom icon */}
//             <div style={{ width: 26, height: 26, borderRadius: 7, background: T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.green }}>
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                 <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
//                 <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* image area — fixed aspect ratio box */}
//         <div
//           style={{ position: "relative", width: "100%", paddingBottom: "62%", background: T.greenPale, overflow: "hidden" }}
//           onClick={() => !err && setLb(true)}
//         >
//           {err ? (
//             <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: T.muted }}>
//               <div style={{ fontSize: 28 }}>📊</div>
//               <div style={{ fontSize: 11, fontWeight: 600 }}>Report not yet generated</div>
//             </div>
//           ) : (
//             <img
//               src={src} alt={caption}
//               onError={() => setErr(true)}
//               style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: 8, boxSizing: "border-box", transition: "transform .3s ease", transform: hover ? "scale(1.03)" : "scale(1)" }}
//             />
//           )}
//           {/* hover overlay */}
//           {!err && hover && (
//             <div style={{ position: "absolute", inset: 0, background: "rgba(27,122,78,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <div style={{ background: "rgba(27,122,78,0.85)", color: "white", fontSize: 11, fontWeight: 700, padding: "6px 16px", borderRadius: 99, backdropFilter: "blur(4px)" }}>
//                 Click to zoom
//               </div>
//             </div>
//           )}
//         </div>

//         {/* footer */}
//         <div style={{ padding: "9px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <span style={{ fontSize: 10, color: T.muted, fontWeight: 500 }}>{name}.png</span>
//           <div style={{ display: "flex", gap: 6 }}>
//             <FooterBtn label="+" onClick={e => { e.stopPropagation(); setLb(true); }} />
//             <FooterBtn label="↗" onClick={e => { e.stopPropagation(); window.open(src, "_blank"); }} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function FooterBtn({ label, onClick }) {
//   return (
//     <button onClick={onClick} style={{
//       width: 24, height: 24, borderRadius: 6, border: `1px solid ${T.border}`,
//       background: T.surface, color: T.green, fontSize: 13, fontWeight: 800,
//       cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
//     }}>
//       {label}
//     </button>
//   );
// }

// // ─── TOP TAB BAR ─────────────────────────────────────────────────────────────
// function NavTab({ label, active, onClick }) {
//   return (
//     <button onClick={onClick} style={{
//       fontSize: 13, fontWeight: 700, padding: "8px 18px",
//       borderRadius: 99, border: "none", cursor: "pointer",
//       background: active ? T.green : "transparent",
//       color: active ? "white" : T.muted,
//       boxShadow: active ? `0 4px 14px rgba(27,122,78,0.30)` : "none",
//       transition: "all .18s", fontFamily: "'Outfit',sans-serif",
//     }}>
//       {label}
//     </button>
//   );
// }

// // ─── SECTION TITLE ────────────────────────────────────────────────────────────
// function SecTitle({ emoji, title, sub }) {
//   return (
//     <div style={{ marginBottom: 16 }}>
//       <div style={{ fontSize: 14, fontWeight: 800, color: T.text, display: "flex", alignItems: "center", gap: 8 }}>
//         <span style={{ width: 30, height: 30, borderRadius: 9, background: T.greenLight, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{emoji}</span>
//         {title}
//       </div>
//       {sub && <div style={{ fontSize: 11, color: T.muted, marginTop: 4, marginLeft: 38 }}>{sub}</div>}
//     </div>
//   );
// }

// // ─── CORR BAR ─────────────────────────────────────────────────────────────────
// function CorrBar({ label, value, maxVal }) {
//   const isPos = value >= 0;
//   const pct = (Math.abs(value) / maxVal) * 100;
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
//       <div style={{ width: 140, fontSize: 11, fontWeight: 600, color: T.muted, textAlign: "right", flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</div>
//       <div style={{ flex: 1, background: T.greenPale, borderRadius: 99, height: 10, overflow: "hidden", position: "relative" }}>
//         <div style={{
//           height: "100%", borderRadius: 99,
//           background: isPos
//             ? `linear-gradient(90deg,#34C77B,#1B7A4E)`
//             : `linear-gradient(90deg,#60A5FA,#2563EB)`,
//           width: `${pct}%`,
//           marginLeft: isPos ? 0 : `${50 - pct / 2}%`,
//           transition: "width .5s ease",
//         }} />
//       </div>
//       <div style={{ width: 52, fontSize: 11, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: isPos ? T.green : "#2563EB", textAlign: "right" }}>
//         {value > 0 ? "+" : ""}{value.toFixed(3)}
//       </div>
//     </div>
//   );
// }

// // ─── STAT CARD ────────────────────────────────────────────────────────────────
// function StatCard({ label, value, sub, color, bg, mono }) {
//   return (
//     <div style={{ background: bg || T.surface, border: `1.5px solid ${T.border}`, borderRadius: T.radius, padding: "16px 18px", boxShadow: T.shadow }}>
//       <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.9px", marginBottom: 6 }}>{label}</div>
//       <div style={{ fontSize: "1.8rem", fontWeight: 900, color: color || T.text, fontFamily: mono ? "'JetBrains Mono',monospace" : "inherit", lineHeight: 1 }}>{value}</div>
//       {sub && <div style={{ fontSize: 11, color: T.muted, marginTop: 5 }}>{sub}</div>}
//     </div>
//   );
// }

// // ─── TABS ─────────────────────────────────────────────────────────────────────
// const TABS = [
//   ["charts",   "Report Charts"],
//   ["feat",     "Feature Graphs"],
//   ["corr",     "Correlations"],
//   ["overview", "Live Stats"],
// ];

// const CHART_IMAGES = [
//   { name:"eda_dashboard",      caption:"EDA Dashboard",         badge:"EDA" },
//   { name:"eda_insights",       caption:"EDA Insights",          badge:"EDA" },
//   { name:"correlation_heatmap",caption:"Correlation Heatmap",   badge:"Stats" },
//   { name:"class_imbalance",    caption:"Class Imbalance",       badge:"Stats" },
//   { name:"churn_by_payment",   caption:"Churn by Payment",      badge:"Churn" },
//   { name:"scaling_comparison", caption:"Before vs After Scaling",badge:"Pre-process" },
// ];

// const FEAT_IMAGES = [
//   { name:"graph1_services_vs_churn", caption:"Services vs Churn",     badge:"Graph 1" },
//   { name:"graph2_contract_risk",     caption:"Contract Risk",          badge:"Graph 2" },
//   { name:"graph3_revenue_features",  caption:"Revenue Features",       badge:"Graph 3" },
//   { name:"graph4_flags",             caption:"Risk Flags",             badge:"Graph 4" },
//   { name:"graph5_correlation",       caption:"Feature Correlation",    badge:"Graph 5" },
//   { name:"graph6_tenure_groups",     caption:"Tenure Groups",          badge:"Graph 6" },
//   { name:"graph7_heatmap",           caption:"Full Feature Heatmap",   badge:"Graph 7" },
// ];

// // ─── MAIN PAGE ────────────────────────────────────────────────────────────────
// export default function VisPage() {
//   const { data: corr, loading: corrLoad } = useFetch("/eda/correlation?top_n=20");
//   const { data: ov } = useFetch("/eda/overview");
//   const [activeTab, setActiveTab] = useState("charts");
//   const corrMax = corr ? Math.max(...corr.correlations.map(Math.abs)) : 1;

//   return (
//     <div style={{ fontFamily: "'Outfit',sans-serif" }}>

//       {/* ── Top nav area ── */}
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
//         <div>
//           <div style={{ fontSize: "1.35rem", fontWeight: 900, color: T.text }}>
//             Visualizations & <span style={{ color: T.greenMid }}>Analytics</span>
//           </div>
//           <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>Explore EDA charts, feature graphs, correlations and live dataset stats</div>
//         </div>
//         <div style={{ display: "flex", gap: 4, background: T.greenLight, borderRadius: 99, padding: "5px" }}>
//           {TABS.map(([k, l]) => <NavTab key={k} label={l} active={activeTab === k} onClick={() => setActiveTab(k)} />)}
//         </div>
//       </div>

//       {/* ══ CHARTS ══ */}
//       {activeTab === "charts" && (
//         <div style={{ animation: "fadeIn .3s ease" }}>
//           <SecTitle emoji="🖼️" title="EDA & Statistical Report Charts" sub="Click any chart to zoom in/out — opens full-screen lightbox" />
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
//             {CHART_IMAGES.map(img => <ReportCard key={img.name} {...img} />)}
//           </div>
//         </div>
//       )}

//       {/* ══ FEATURE GRAPHS ══ */}
//       {activeTab === "feat" && (
//         <div style={{ animation: "fadeIn .3s ease" }}>
//           <SecTitle emoji="📈" title="Feature Engineering Graphs" sub="Click any chart to zoom in/out — opens full-screen lightbox" />
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
//             {FEAT_IMAGES.slice(0, 6).map(img => <ReportCard key={img.name} {...img} />)}
//           </div>
//           {/* graph7 full-width */}
//           <div style={{ marginTop: 18 }}>
//             <ReportCard {...FEAT_IMAGES[6]} />
//           </div>
//         </div>
//       )}

//       {/* ══ CORRELATIONS ══ */}
//       {activeTab === "corr" && (
//         <div style={{ animation: "fadeIn .3s ease" }}>
//           <SecTitle emoji="🔗" title="Live Feature Correlations with Churn" sub="Top 20 features — red = positive (more churn) · blue = negative (less churn)" />

//           {corrLoad ? <Spinner /> : corr ? (
//             <>
//               {/* legend chips */}
//               <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
//                 {[
//                   { label: "↑ Positive (risk factor)", bg: "#DCFCE7", color: T.green },
//                   { label: "↓ Negative (protective)",  bg: "#DBEAFE", color: "#2563EB" },
//                 ].map(p => (
//                   <span key={p.label} style={{ background: p.bg, color: p.color, fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 99 }}>{p.label}</span>
//                 ))}
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
//                 {/* Positive */}
//                 <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "20px 22px" }}>
//                   <div style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 16 }}>📈 Positive Correlations</div>
//                   {corr.features.map((f, i) => ({ f, v: corr.correlations[i] }))
//                     .filter(x => x.v > 0).sort((a, b) => b.v - a.v)
//                     .map(({ f, v }) => <CorrBar key={f} label={f} value={v} maxVal={corrMax} />)}
//                 </div>
//                 {/* Negative */}
//                 <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "20px 22px" }}>
//                   <div style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 16 }}>📉 Negative Correlations</div>
//                   {corr.features.map((f, i) => ({ f, v: corr.correlations[i] }))
//                     .filter(x => x.v < 0).sort((a, b) => a.v - b.v)
//                     .map(({ f, v }) => <CorrBar key={f} label={f} value={v} maxVal={corrMax} />)}
//                 </div>
//               </div>

//               {/* full list */}
//               <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "20px 22px" }}>
//                 <div style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 16 }}>📋 All Features</div>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 32px" }}>
//                   {corr.features.map((f, i) => <CorrBar key={f} label={f} value={corr.correlations[i]} maxVal={corrMax} />)}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div style={{ textAlign: "center", padding: "60px 0", color: T.muted }}>
//               <div style={{ fontSize: 36, marginBottom: 10 }}>📊</div>
//               <div style={{ fontSize: 14, fontWeight: 600 }}>Run pipeline to compute correlations</div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ══ LIVE STATS ══ */}
//       {activeTab === "overview" && (
//         <div style={{ animation: "fadeIn .3s ease" }}>
//           <SecTitle emoji="📊" title="Live Dataset Statistics" sub="Pulled directly from the API — real-time figures" />

//           {!ov ? <Spinner /> : (() => {
//             const cd = ov.churn_distribution || {};
//             const mc = ov.monthly_charges || {};
//             const ten = ov.tenure || {};
//             const churnedN = Number(cd[1] ?? 0);
//             const retainedN = Number(cd[0] ?? 0);
//             const churnPct = ov.shape.rows > 0 ? ((churnedN / ov.shape.rows) * 100).toFixed(1) : 0;
//             const retainPct = ov.shape.rows > 0 ? ((retainedN / ov.shape.rows) * 100).toFixed(1) : 0;

//             return (
//               <>
//                 {/* stat strip */}
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
//                   <StatCard label="Total Rows"  value={Number(ov.shape.rows).toLocaleString()} color={T.green}    mono />
//                   <StatCard label="Features"    value={ov.shape.cols}                          color={T.greenMid} mono />
//                   <StatCard label="Churned"     value={churnedN.toLocaleString()}              color="#DC2626"    mono sub={`${churnPct}% of total`} />
//                   <StatCard label="Retained"    value={retainedN.toLocaleString()}             color={T.greenBright} mono sub={`${retainPct}% of total`} />
//                 </div>

//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>

//                   {/* Churn Distribution */}
//                   <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "20px 22px" }}>
//                     <div style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 18 }}>⚖️ Churn Distribution</div>
//                     {[
//                       { label: "Retained", n: retainedN, pct: retainPct, color: T.greenBright, bg: "#DCFCE7" },
//                       { label: "Churned",  n: churnedN,  pct: churnPct,  color: "#F87171",     bg: "#FEF2F2" },
//                     ].map(r => (
//                       <div key={r.label} style={{ marginBottom: 18 }}>
//                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                             <div style={{ width: 10, height: 10, borderRadius: "50%", background: r.color }} />
//                             <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{r.label}</span>
//                           </div>
//                           <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                             <span style={{ fontSize: 13, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: r.color }}>{r.n.toLocaleString()}</span>
//                             <span style={{ background: r.bg, color: r.color, fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 99 }}>{r.pct}%</span>
//                           </div>
//                         </div>
//                         <div style={{ background: T.greenPale, borderRadius: 99, height: 13, overflow: "hidden" }}>
//                           <div style={{ height: "100%", borderRadius: 99, background: r.color, width: `${r.pct}%`, transition: "width .7s ease" }} />
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Monthly Charges + Tenure */}
//                   <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
//                     {mc.mean != null && (
//                       <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "20px 22px", flex: 1 }}>
//                         <div style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 14 }}>💰 Monthly Charges</div>
//                         {[
//                           ["Mean",    mc.mean,   T.green],
//                           ["Median",  mc.median, T.greenMid],
//                           ["Std Dev", mc.std,    "#8B5CF6"],
//                           ["Min",     mc.min,    "#22C55E"],
//                           ["Max",     mc.max,    "#F87171"],
//                         ].map(([l, v, c]) => (
//                           <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
//                             <div style={{ width: 52, fontSize: 11, fontWeight: 600, color: T.muted, flexShrink: 0 }}>{l}</div>
//                             <div style={{ flex: 1, background: T.greenPale, borderRadius: 99, height: 9, overflow: "hidden" }}>
//                               <div style={{ height: "100%", borderRadius: 99, background: c, width: `${Math.min((v / (mc.max || 1)) * 100, 100)}%`, transition: "width .5s ease" }} />
//                             </div>
//                             <div style={{ width: 56, textAlign: "right", fontSize: 12, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: c }}>₹{v}</div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                     {ten.mean != null && (
//                       <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "20px 22px" }}>
//                         <div style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 14 }}>📅 Tenure</div>
//                         {[
//                           ["Mean",    `${ten.mean} mo`,  T.green],
//                           ["Median",  `${ten.median} mo`,T.greenMid],
//                           ["Std Dev", `${ten.std} mo`,   "#8B5CF6"],
//                         ].map(([l, v, c]) => (
//                           <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 13px", borderRadius: T.radiusSm, background: T.greenPale, border: `1px solid ${T.border}`, marginBottom: 7 }}>
//                             <span style={{ fontSize: 12, color: T.muted, fontWeight: 600 }}>{l}</span>
//                             <span style={{ fontSize: 13, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: c }}>{v}</span>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </>
//             );
//           })()}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { useFetch, Icon, Spinner, API } from "./Home";

const T = {
  green: "#1B7A4E", greenMid: "#25A468", greenLight: "#E8F8F0", greenPale: "#F2FCF7",
  greenBright: "#34C77B", accent: "#0D6640", mint: "#A8E6C8",
  bg: "#F7FAF8", surface: "#FFFFFF", border: "#E2EDE8",
  text: "#0F1F17", textMid: "#2D4A3A", muted: "#7A9E8C",
  radius: "16px", radiusSm: "10px",
  shadow: "0 2px 14px rgba(27,122,78,0.08)", shadowMd: "0 6px 30px rgba(27,122,78,0.16)",
};

function Lightbox({ src, caption, onClose }) {
  const [scale, setScale] = useState(1);
  const zoom = (d) => setScale(s => Math.min(4, Math.max(0.5, s + d)));
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, maxWidth: "100%" }}>
        <div style={{ overflow: "hidden", borderRadius: 12, maxWidth: "90vw", maxHeight: "72vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={src} alt={caption} style={{ transform: `scale(${scale})`, transformOrigin: "center", transition: "transform .2s ease", maxWidth: "90vw", maxHeight: "72vh", objectFit: "contain", display: "block" }} />
        </div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600, textAlign: "center" }}>{caption}</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          {[["−", () => zoom(-0.25)], ["+", () => zoom(0.25)], ["↺", () => setScale(1)]].map(([l, fn]) => (
            <button key={l} onClick={fn} style={{ width: 34, height: 34, borderRadius: "50%", border: "none", cursor: "pointer", background: "rgba(255,255,255,0.15)", color: "white", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{l}</button>
          ))}
          <div style={{ color: "white", fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", background: "rgba(255,255,255,0.12)", padding: "4px 14px", borderRadius: 99 }}>{Math.round(scale * 100)}%</div>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: "50%", border: "none", cursor: "pointer", background: "rgba(239,68,68,0.25)", color: "white", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
      </div>
    </div>
  );
}

function ReportCard({ name, caption, badge }) {
  const [lb, setLb] = useState(false);
  const [hover, setHover] = useState(false);
  const [err, setErr] = useState(false);
  const src = `${API}/reports/${name}.png`;
  return (
    <>
      {lb && <Lightbox src={src} caption={caption} onClose={() => setLb(false)} />}
      <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: hover ? T.shadowMd : T.shadow, overflow: "hidden", transition: "box-shadow .2s, transform .2s", transform: hover ? "translateY(-2px)" : "", cursor: "pointer" }}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.greenBright, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: T.textMid, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{caption}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
            {badge && <span style={{ fontSize: 9, fontWeight: 700, background: T.greenLight, color: T.green, padding: "2px 7px", borderRadius: 99 }}>{badge}</span>}
            <div style={{ width: 24, height: 24, borderRadius: 6, background: T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.green }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
            </div>
          </div>
        </div>
        <div style={{ position: "relative", width: "100%", paddingBottom: "60%", background: T.greenPale, overflow: "hidden" }} onClick={() => !err && setLb(true)}>
          {err ? (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, color: T.muted }}>
              <div style={{ fontSize: 24 }}>📊</div>
              <div style={{ fontSize: 10, fontWeight: 600 }}>Not yet generated</div>
            </div>
          ) : (
            <img src={src} alt={caption} onError={() => setErr(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: 6, boxSizing: "border-box", transition: "transform .3s", transform: hover ? "scale(1.03)" : "scale(1)" }} />
          )}
          {!err && hover && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(27,122,78,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: "rgba(27,122,78,0.85)", color: "white", fontSize: 10, fontWeight: 700, padding: "5px 13px", borderRadius: 99 }}>Click to zoom</div>
            </div>
          )}
        </div>
        <div style={{ padding: "7px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 9, color: T.muted, fontWeight: 500 }}>{name}.png</span>
          <div style={{ display: "flex", gap: 5 }}>
            {[["↗", e => { e.stopPropagation(); window.open(src, "_blank"); }], ["+", e => { e.stopPropagation(); setLb(true); }]].map(([l, fn]) => (
              <button key={l} onClick={fn} style={{ width: 22, height: 22, borderRadius: 5, border: `1px solid ${T.border}`, background: T.surface, color: T.green, fontSize: 11, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function NavTab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 99, border: "none", cursor: "pointer", background: active ? T.green : "transparent", color: active ? "white" : T.muted, boxShadow: active ? "0 4px 14px rgba(27,122,78,0.30)" : "none", transition: "all .18s", fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap" }}>
      {label}
    </button>
  );
}

function SecTitle({ emoji, title, sub }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: T.text, display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ width: 28, height: 28, borderRadius: 8, background: T.greenLight, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{emoji}</span>
        {title}
      </div>
      {sub && <div style={{ fontSize: 10, color: T.muted, marginTop: 3, marginLeft: 35 }}>{sub}</div>}
    </div>
  );
}

function CorrBar({ label, value, maxVal }) {
  const isPos = value >= 0;
  const pct = (Math.abs(value) / maxVal) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
      <div style={{ width: 110, fontSize: 10, fontWeight: 600, color: T.muted, textAlign: "right", flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</div>
      <div style={{ flex: 1, background: T.greenPale, borderRadius: 99, height: 8, overflow: "hidden", position: "relative" }}>
        <div style={{ height: "100%", borderRadius: 99, background: isPos ? `linear-gradient(90deg,#34C77B,#1B7A4E)` : `linear-gradient(90deg,#60A5FA,#2563EB)`, width: `${pct}%`, transition: "width .5s ease" }} />
      </div>
      <div style={{ width: 46, fontSize: 10, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: isPos ? T.green : "#2563EB", textAlign: "right", flexShrink: 0 }}>
        {value > 0 ? "+" : ""}{value.toFixed(3)}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color, bg, mono }) {
  return (
    <div style={{ background: bg || T.surface, border: `1.5px solid ${T.border}`, borderRadius: T.radius, padding: "14px 16px", boxShadow: T.shadow }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.9px", marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: "1.6rem", fontWeight: 900, color: color || T.text, fontFamily: mono ? "'JetBrains Mono',monospace" : "inherit", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: T.muted, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

const TABS = [["charts", "Report Charts"], ["feat", "Feature Graphs"], ["corr", "Correlations"], ["overview", "Live Stats"]];
const CHART_IMAGES = [
  { name: "eda_dashboard",       caption: "EDA Dashboard",          badge: "EDA" },
  { name: "eda_insights",        caption: "EDA Insights",           badge: "EDA" },
  { name: "correlation_heatmap", caption: "Correlation Heatmap",    badge: "Stats" },
  { name: "class_imbalance",     caption: "Class Imbalance",        badge: "Stats" },
  { name: "churn_by_payment",    caption: "Churn by Payment",       badge: "Churn" },
  { name: "scaling_comparison",  caption: "Before vs After Scaling", badge: "Pre-process" },
];
const FEAT_IMAGES = [
  { name: "graph1_services_vs_churn", caption: "Services vs Churn",    badge: "Graph 1" },
  { name: "graph2_contract_risk",     caption: "Contract Risk",         badge: "Graph 2" },
  { name: "graph3_revenue_features",  caption: "Revenue Features",      badge: "Graph 3" },
  { name: "graph4_flags",             caption: "Risk Flags",            badge: "Graph 4" },
  { name: "graph5_correlation",       caption: "Feature Correlation",   badge: "Graph 5" },
  { name: "graph6_tenure_groups",     caption: "Tenure Groups",         badge: "Graph 6" },
  { name: "graph7_heatmap",           caption: "Full Feature Heatmap",  badge: "Graph 7" },
];

export default function VisPage() {
  const { data: corr, loading: corrLoad } = useFetch("/eda/correlation?top_n=20");
  const { data: ov } = useFetch("/eda/overview");
  const [activeTab, setActiveTab] = useState("charts");
  const corrMax = corr ? Math.max(...corr.correlations.map(Math.abs)) : 1;

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif" }}>
      <style>{`
        .vis-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .vis-chart-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .vis-corr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .vis-corr-all-grid { display: grid; grid-template-columns: 1fr 1fr; gap: "4px 28px"; }
        .vis-stat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 18px; }
        .vis-bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 900px) {
          .vis-chart-grid { grid-template-columns: 1fr 1fr; }
          .vis-corr-grid { grid-template-columns: 1fr; }
          .vis-corr-all-grid { grid-template-columns: 1fr; }
          .vis-stat-grid { grid-template-columns: 1fr 1fr; }
          .vis-bottom-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .vis-chart-grid { grid-template-columns: 1fr; }
          .vis-stat-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
        }
      `}</style>

      <div className="vis-header">
        <div>
          <div style={{ fontSize: "1.25rem", fontWeight: 900, color: T.text }}>
            Visualizations & <span style={{ color: T.greenMid }}>Analytics</span>
          </div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>EDA charts, feature graphs, correlations and live stats</div>
        </div>
        <div style={{ display: "flex", gap: 3, background: T.greenLight, borderRadius: 99, padding: "4px", flexWrap: "wrap" }}>
          {TABS.map(([k, l]) => <NavTab key={k} label={l} active={activeTab === k} onClick={() => setActiveTab(k)} />)}
        </div>
      </div>

      {/* ── CHARTS ── */}
      {activeTab === "charts" && (
        <div style={{ animation: "fadeIn .3s ease" }}>
          <SecTitle emoji="🖼️" title="EDA & Statistical Report Charts" sub="Click any chart to zoom — opens full-screen lightbox" />
          <div className="vis-chart-grid">
            {CHART_IMAGES.map(img => <ReportCard key={img.name} {...img} />)}
          </div>
        </div>
      )}

      {/* ── FEATURE GRAPHS ── */}
      {activeTab === "feat" && (
        <div style={{ animation: "fadeIn .3s ease" }}>
          <SecTitle emoji="📈" title="Feature Engineering Graphs" sub="Click any chart to zoom" />
          <div className="vis-chart-grid" style={{ marginBottom: 16 }}>
            {FEAT_IMAGES.slice(0, 6).map(img => <ReportCard key={img.name} {...img} />)}
          </div>
          <ReportCard {...FEAT_IMAGES[6]} />
        </div>
      )}

      {/* ── CORRELATIONS ── */}
      {activeTab === "corr" && (
        <div style={{ animation: "fadeIn .3s ease" }}>
          <SecTitle emoji="🔗" title="Live Feature Correlations with Churn" sub="Top 20 features — green = positive (more churn) · blue = negative (less churn)" />
          {corrLoad ? <Spinner /> : corr ? (
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                {[{ label: "↑ Positive (risk factor)", bg: "#DCFCE7", color: T.green }, { label: "↓ Negative (protective)", bg: "#DBEAFE", color: "#2563EB" }].map(p => (
                  <span key={p.label} style={{ background: p.bg, color: p.color, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99 }}>{p.label}</span>
                ))}
              </div>
              <div className="vis-corr-grid">
                <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "18px 20px" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: T.text, marginBottom: 14 }}>📈 Positive Correlations</div>
                  {corr.features.map((f, i) => ({ f, v: corr.correlations[i] })).filter(x => x.v > 0).sort((a, b) => b.v - a.v).map(({ f, v }) => <CorrBar key={f} label={f} value={v} maxVal={corrMax} />)}
                </div>
                <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "18px 20px" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: T.text, marginBottom: 14 }}>📉 Negative Correlations</div>
                  {corr.features.map((f, i) => ({ f, v: corr.correlations[i] })).filter(x => x.v < 0).sort((a, b) => a.v - b.v).map(({ f, v }) => <CorrBar key={f} label={f} value={v} maxVal={corrMax} />)}
                </div>
              </div>
              <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "18px 20px" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: T.text, marginBottom: 14 }}>📋 All Features</div>
                <div className="vis-corr-all-grid">
                  {corr.features.map((f, i) => <CorrBar key={f} label={f} value={corr.correlations[i]} maxVal={corrMax} />)}
                </div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "50px 0", color: T.muted }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Run pipeline to compute correlations</div>
            </div>
          )}
        </div>
      )}

      {/* ── LIVE STATS ── */}
      {activeTab === "overview" && (
        <div style={{ animation: "fadeIn .3s ease" }}>
          <SecTitle emoji="📊" title="Live Dataset Statistics" sub="Pulled directly from the API — real-time figures" />
          {!ov ? <Spinner /> : (() => {
            const cd = ov.churn_distribution || {};
            const mc = ov.monthly_charges || {};
            const ten = ov.tenure || {};
            const churnedN = Number(cd[1] ?? 0);
            const retainedN = Number(cd[0] ?? 0);
            const churnPct = ov.shape.rows > 0 ? ((churnedN / ov.shape.rows) * 100).toFixed(1) : 0;
            const retainPct = ov.shape.rows > 0 ? ((retainedN / ov.shape.rows) * 100).toFixed(1) : 0;
            return (
              <>
                <div className="vis-stat-grid">
                  <StatCard label="Total Rows" value={Number(ov.shape.rows).toLocaleString()} color={T.green} mono />
                  <StatCard label="Features"   value={ov.shape.cols}                          color={T.greenMid} mono />
                  <StatCard label="Churned"    value={churnedN.toLocaleString()}              color="#DC2626" mono sub={`${churnPct}% of total`} />
                  <StatCard label="Retained"   value={retainedN.toLocaleString()}             color={T.greenBright} mono sub={`${retainPct}% of total`} />
                </div>
                <div className="vis-bottom-grid">
                  <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "18px 20px" }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: T.text, marginBottom: 16 }}>⚖️ Churn Distribution</div>
                    {[{ label: "Retained", n: retainedN, pct: retainPct, color: T.greenBright, bg: "#DCFCE7" }, { label: "Churned", n: churnedN, pct: churnPct, color: "#F87171", bg: "#FEF2F2" }].map(r => (
                      <div key={r.label} style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <div style={{ width: 9, height: 9, borderRadius: "50%", background: r.color }} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{r.label}</span>
                          </div>
                          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                            <span style={{ fontSize: 12, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: r.color }}>{r.n.toLocaleString()}</span>
                            <span style={{ background: r.bg, color: r.color, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>{r.pct}%</span>
                          </div>
                        </div>
                        <div style={{ background: T.greenPale, borderRadius: 99, height: 11, overflow: "hidden" }}>
                          <div style={{ height: "100%", borderRadius: 99, background: r.color, width: `${r.pct}%`, transition: "width .7s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {mc.mean != null && (
                      <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "18px 20px", flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: T.text, marginBottom: 12 }}>💰 Monthly Charges</div>
                        {[["Mean", mc.mean, T.green], ["Median", mc.median, T.greenMid], ["Std Dev", mc.std, "#8B5CF6"], ["Min", mc.min, "#22C55E"], ["Max", mc.max, "#F87171"]].map(([l, v, c]) => (
                          <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <div style={{ width: 46, fontSize: 10, fontWeight: 600, color: T.muted, flexShrink: 0 }}>{l}</div>
                            <div style={{ flex: 1, background: T.greenPale, borderRadius: 99, height: 7, overflow: "hidden" }}>
                              <div style={{ height: "100%", borderRadius: 99, background: c, width: `${Math.min((v / (mc.max || 1)) * 100, 100)}%`, transition: "width .5s ease" }} />
                            </div>
                            <div style={{ width: 48, textAlign: "right", fontSize: 11, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: c }}>₹{v}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {ten.mean != null && (
                      <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "18px 20px" }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: T.text, marginBottom: 12 }}>📅 Tenure</div>
                        {[["Mean", `${ten.mean} mo`, T.green], ["Median", `${ten.median} mo`, T.greenMid], ["Std Dev", `${ten.std} mo`, "#8B5CF6"]].map(([l, v, c]) => (
                          <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 11px", borderRadius: T.radiusSm, background: T.greenPale, border: `1px solid ${T.border}`, marginBottom: 6 }}>
                            <span style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{l}</span>
                            <span style={{ fontSize: 12, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: c }}>{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}