// import { useState } from "react";
// import { useFetch, API } from "./Home";

// // ─── THEME ────────────────────────────────────────────────────────────────────
// const T = {
//   green:       "#1B7A4E",
//   greenMid:    "#25A468",
//   greenLight:  "#E8F8F0",
//   greenPale:   "#F2FCF7",
//   greenBright: "#34C77B",
//   accent:      "#0D6640",
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

// // ─── HARDCODED 5-MODEL FALLBACK ───────────────────────────────────────────────
// // Used when API returns fewer than 5 models.
// // Update these numbers after you run the full pipeline.
// const FIVE_MODELS = [
//   { name:"XGBoost",             roc_auc:87.4, recall:84.1, f1:81.7, color:"#6366F1" },
//   { name:"Random Forest",       roc_auc:86.3, recall:79.5, f1:75.2, color:"#8B5CF6" },
//   { name:"Logistic Regression", roc_auc:82.2, recall:75.8, f1:71.3, color:"#F59E0B" },
//   { name:"LightGBM",            roc_auc:83.1, recall:72.5, f1:74.6, color:"#EC4899" },
//   { name:"ANN",                 roc_auc:81.9, recall:70.2, f1:72.8, color:"#10B981" },
// ];

// // ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
// function Lightbox({ src, caption, onClose }) {
//   const [scale, setScale] = useState(1);
//   const zoom = (d) => setScale(s => Math.min(4, Math.max(0.5, s + d)));
//   return (
//     <div onClick={onClose}
//       style={{ position:"fixed", inset:0, zIndex:9999, background:"rgba(0,0,0,0.82)",
//                backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center" }}>
//       <div onClick={e => e.stopPropagation()}
//         style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
//         <div style={{ overflow:"hidden", borderRadius:16, maxWidth:"85vw", maxHeight:"75vh",
//                       display:"flex", alignItems:"center", justifyContent:"center" }}>
//           <img src={src} alt={caption}
//             style={{ transform:`scale(${scale})`, transformOrigin:"center",
//                      transition:"transform .2s ease", maxWidth:"85vw", maxHeight:"75vh",
//                      objectFit:"contain", display:"block" }} />
//         </div>
//         <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13, fontWeight:600 }}>{caption}</div>
//         <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//           <LbBtn label="−" onClick={() => zoom(-0.25)} />
//           <div style={{ color:"white", fontSize:13, fontWeight:700,
//                         fontFamily:"'JetBrains Mono',monospace",
//                         background:"rgba(255,255,255,0.12)", padding:"5px 16px", borderRadius:99 }}>
//             {Math.round(scale * 100)}%
//           </div>
//           <LbBtn label="+" onClick={() => zoom(0.25)} />
//           <LbBtn label="↺" onClick={() => setScale(1)} />
//           <LbBtn label="✕" onClick={onClose} danger />
//         </div>
//       </div>
//     </div>
//   );
// }
// function LbBtn({ label, onClick, danger }) {
//   const base = danger ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.15)";
//   const hover = danger ? "rgba(239,68,68,0.45)" : "rgba(255,255,255,0.28)";
//   return (
//     <button onClick={onClick}
//       style={{ width:38, height:38, borderRadius:"50%", border:"none", cursor:"pointer",
//                background:base, color:"white", fontSize:16, fontWeight:700,
//                display:"flex", alignItems:"center", justifyContent:"center", transition:"background .15s" }}
//       onMouseEnter={e => e.currentTarget.style.background = hover}
//       onMouseLeave={e => e.currentTarget.style.background = base}
//     >{label}</button>
//   );
// }

// // ─── REPORT CARD (zoomable, fixed aspect ratio) ───────────────────────────────
// function ReportCard({ name, caption, badge, fullWidth }) {
//   const [lb, setLb]       = useState(false);
//   const [hover, setHover] = useState(false);
//   const [err, setErr]     = useState(false);
//   const src = `${API}/reports/${name}.png`;
//   return (
//     <>
//       {lb && <Lightbox src={src} caption={caption} onClose={() => setLb(false)} />}
//       <div
//         style={{ background:T.surface, borderRadius:T.radius, border:`1.5px solid ${T.border}`,
//                  boxShadow:hover ? T.shadowMd : T.shadow, overflow:"hidden",
//                  transition:"box-shadow .2s,transform .2s", transform:hover?"translateY(-2px)":"",
//                  cursor:"pointer", gridColumn:fullWidth ? "1/-1" : undefined }}
//         onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
//       >
//         {/* header */}
//         <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.border}`,
//                       display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//           <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//             <div style={{ width:8, height:8, borderRadius:"50%", background:T.greenBright }} />
//             <span style={{ fontSize:12, fontWeight:700, color:T.textMid }}>{caption}</span>
//           </div>
//           <div style={{ display:"flex", gap:6, alignItems:"center" }}>
//             {badge && (
//               <span style={{ fontSize:10, fontWeight:700, background:T.greenLight,
//                              color:T.green, padding:"2px 9px", borderRadius:99 }}>{badge}</span>
//             )}
//             <div style={{ width:26, height:26, borderRadius:7, background:T.greenLight,
//                           display:"flex", alignItems:"center", justifyContent:"center", color:T.green }}>
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                 <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
//                 <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
//               </svg>
//             </div>
//           </div>
//         </div>
//         {/* fixed-ratio image box */}
//         <div style={{ position:"relative", width:"100%", paddingBottom:"62%",
//                       background:T.greenPale, overflow:"hidden" }}
//           onClick={() => !err && setLb(true)}>
//           {err ? (
//             <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
//                           alignItems:"center", justifyContent:"center", gap:8, color:T.muted }}>
//               <div style={{ fontSize:28 }}>📊</div>
//               <div style={{ fontSize:11, fontWeight:600 }}>Report not yet generated</div>
//             </div>
//           ) : (
//             <img src={src} alt={caption} onError={() => setErr(true)}
//               style={{ position:"absolute", inset:0, width:"100%", height:"100%",
//                        objectFit:"contain", padding:8, boxSizing:"border-box",
//                        transition:"transform .3s", transform:hover?"scale(1.03)":"scale(1)" }}
//             />
//           )}
//           {!err && hover && (
//             <div style={{ position:"absolute", inset:0, background:"rgba(27,122,78,0.08)",
//                           display:"flex", alignItems:"center", justifyContent:"center" }}>
//               <div style={{ background:"rgba(27,122,78,0.85)", color:"white", fontSize:11,
//                             fontWeight:700, padding:"6px 16px", borderRadius:99, backdropFilter:"blur(4px)" }}>
//                 Click to zoom
//               </div>
//             </div>
//           )}
//         </div>
//         {/* footer */}
//         <div style={{ padding:"9px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//           <span style={{ fontSize:10, color:T.muted, fontWeight:500 }}>{name}.png</span>
//           <div style={{ display:"flex", gap:6 }}>
//             <FBtn label="+" onClick={e => { e.stopPropagation(); setLb(true); }} />
//             <FBtn label="↗" onClick={e => { e.stopPropagation(); window.open(src,"_blank"); }} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// function FBtn({ label, onClick }) {
//   return (
//     <button onClick={onClick}
//       style={{ width:24, height:24, borderRadius:6, border:`1px solid ${T.border}`,
//                background:T.surface, color:T.green, fontSize:13, fontWeight:800,
//                cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
//       {label}
//     </button>
//   );
// }

// // ─── NAV TAB ──────────────────────────────────────────────────────────────────
// function NavTab({ label, active, onClick }) {
//   return (
//     <button onClick={onClick}
//       style={{ fontSize:12, fontWeight:700, padding:"7px 15px", borderRadius:99, border:"none",
//                cursor:"pointer", background:active ? T.green : "transparent",
//                color:active ? "white" : T.muted,
//                boxShadow:active ? "0 4px 14px rgba(27,122,78,0.30)" : "none",
//                transition:"all .18s", fontFamily:"'Outfit',sans-serif", whiteSpace:"nowrap" }}>
//       {label}
//     </button>
//   );
// }

// // ─── SECTION TITLE ────────────────────────────────────────────────────────────
// function SecTitle({ emoji, title, sub }) {
//   return (
//     <div style={{ marginBottom:16 }}>
//       <div style={{ fontSize:14, fontWeight:800, color:T.text, display:"flex", alignItems:"center", gap:8 }}>
//         <span style={{ width:30, height:30, borderRadius:9, background:T.greenLight,
//                        display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>
//           {emoji}
//         </span>
//         {title}
//       </div>
//       {sub && <div style={{ fontSize:11, color:T.muted, marginTop:4, marginLeft:38 }}>{sub}</div>}
//     </div>
//   );
// }

// // ─── METRIC BAR ───────────────────────────────────────────────────────────────
// function MetricBar({ model, metKey }) {
//   const val = model[metKey] ?? 0;
//   return (
//     <div style={{ marginBottom:12 }}>
//       <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
//         <div style={{ display:"flex", alignItems:"center", gap:7 }}>
//           <div style={{ width:8, height:8, borderRadius:"50%", background:model.color, flexShrink:0 }} />
//           <span style={{ fontWeight:700, fontSize:12, color:model.color }}>{model.name}</span>
//         </div>
//         <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:800, fontSize:12, color:T.text }}>
//           {val}%
//         </span>
//       </div>
//       <div style={{ background:T.greenPale, borderRadius:99, height:10, overflow:"hidden" }}>
//         <div style={{ height:"100%", borderRadius:99, background:model.color,
//                       width:`${val}%`, transition:"width .6s ease" }} />
//       </div>
//     </div>
//   );
// }

// // ─── TABS CONFIG ──────────────────────────────────────────────────────────────
// const TABS = [
//   ["metrics",   "📊 Metrics"],
//   ["roc",       "📉 ROC & Curves"],
//   ["confusion", "🔲 Confusion"],
//   ["shap",      "🌳 SHAP"],
// ];

// const METRICS_CFG = [
//   { key:"roc_auc", emoji:"🎯", label:"ROC-AUC",
//     desc:"Area under the ROC curve — measures overall discrimination ability." },
//   { key:"recall",  emoji:"🔍", label:"Recall",
//     desc:"Of all actual churners, how many did the model correctly flag?" },
//   { key:"f1",      emoji:"⚖️", label:"F1 Score",
//     desc:"Harmonic mean of precision & recall — best for imbalanced classes." },
// ];

// // ─── RANK BADGE ───────────────────────────────────────────────────────────────
// function RankBadge({ i }) {
//   const badges = [
//     { bg:"#ECFDF5", color:"#059669", label:"🥇 Best" },
//     { bg:"#FFFBEB", color:"#D97706", label:"🥈 2nd"  },
//     { bg:T.greenLight, color:T.greenMid, label:"🥉 3rd" },
//     { bg:"#F1F5F9", color:"#64748B", label:"4th" },
//     { bg:"#F1F5F9", color:"#94A3B8", label:"5th" },
//   ];
//   const b = badges[i] || badges[4];
//   return (
//     <span style={{ background:b.bg, color:b.color, fontSize:11, fontWeight:700,
//                    padding:"3px 11px", borderRadius:99 }}>{b.label}</span>
//   );
// }

// // ═══════════════════════════════════════════════════════════════════════════════
// // MAIN PAGE
// // ═══════════════════════════════════════════════════════════════════════════════
// export default function ModelPage() {
//   const { data: perf } = useFetch("/dashboard/model_performance");
//   const [activeTab, setActiveTab] = useState("metrics");

//   // Merge API data with the 5-model fallback so we always show all 5.
//   // If the API returns a model by the same name, its values override the fallback.
//   const apiMap = Object.fromEntries((perf?.models || []).map(m => [m.name, m]));
//   const MODELS = FIVE_MODELS.map(fm => ({ ...fm, ...(apiMap[fm.name] || {}) }));

//   const sorted    = [...MODELS].sort((a, b) => b.roc_auc - a.roc_auc);
//   const bestAUC   = sorted[0];
//   const bestRecall= [...MODELS].sort((a, b) => b.recall - a.recall)[0];

//   return (
//     <div style={{ fontFamily:"'Outfit',sans-serif" }}>

//       {/* ── Page header ── */}
//       <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20, gap:16 }}>
//         <div>
//           <div style={{ fontSize:"1.35rem", fontWeight:900, color:T.text }}>
//             Model <span style={{ color:T.greenMid }}>Performance</span>
//           </div>
//           <div style={{ fontSize:12, color:T.muted, marginTop:2 }}>
//             5 trained churn prediction models — XGBoost · Random Forest · Logistic Regression · LightGBM · ANN
//           </div>
//         </div>
//         {/* Tab bar */}
//         <div style={{ display:"flex", gap:4, background:T.greenLight, borderRadius:99,
//                       padding:"5px", flexShrink:0 }}>
//           {TABS.map(([k, l]) => (
//             <NavTab key={k} label={l} active={activeTab === k} onClick={() => setActiveTab(k)} />
//           ))}
//         </div>
//       </div>

//       {/* ── Info banner ── */}
//       <div style={{ background:T.greenLight, border:`1.5px solid #A8E6C8`, borderRadius:T.radiusSm,
//                     padding:"11px 18px", marginBottom:20, fontSize:13, color:T.accent,
//                     display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
//         <span style={{ fontSize:16 }}>📌</span>
//         <span>
//           5 models evaluated:&nbsp;
//           {MODELS.map((m, i) => (
//             <span key={m.name}>
//               <b style={{ color:m.color }}>{m.name}</b>
//               {i < MODELS.length - 1 ? " · " : ""}
//             </span>
//           ))}
//           &nbsp;·&nbsp;
//           Best ROC-AUC: <b style={{ color:T.green }}>{bestAUC?.name} ({bestAUC?.roc_auc}%)</b>
//           &nbsp;·&nbsp;
//           Best Recall: <b style={{ color:T.green }}>{bestRecall?.name} ({bestRecall?.recall}%)</b>
//         </span>
//       </div>

//       {/* ── 5 Model KPI cards ── */}
//       <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14, marginBottom:24 }}>
//         {MODELS.map((m) => (
//           <div key={m.name}
//             style={{ background:T.surface, borderRadius:T.radius, border:`1.5px solid ${T.border}`,
//                      borderTop:`4px solid ${m.color}`, padding:"15px 14px 14px",
//                      boxShadow:T.shadow, transition:"transform .18s,box-shadow .18s", cursor:"default" }}
//             onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=T.shadowMd; }}
//             onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=T.shadow; }}
//           >
//             {/* model name */}
//             <div style={{ fontSize:10, fontWeight:700, color:T.muted, textTransform:"uppercase",
//                           letterSpacing:"0.7px", marginBottom:8, lineHeight:1.4, minHeight:28 }}>
//               {m.name}
//             </div>
//             {/* big AUC */}
//             <div style={{ fontSize:"1.45rem", fontWeight:900, color:m.color,
//                           fontFamily:"'JetBrains Mono',monospace", lineHeight:1 }}>
//               {m.roc_auc}%
//             </div>
//             <div style={{ fontSize:10, color:T.muted, marginTop:4, marginBottom:12 }}>ROC-AUC</div>
//             {/* mini bars for all 3 metrics */}
//             {[["ROC", m.roc_auc], ["Recall", m.recall], ["F1", m.f1]].map(([k, v]) => (
//               <div key={k} style={{ marginBottom:7 }}>
//                 <div style={{ display:"flex", justifyContent:"space-between",
//                               fontSize:9, fontWeight:700, color:T.muted, marginBottom:3 }}>
//                   <span>{k}</span>
//                   <span style={{ color:T.textMid }}>{v}%</span>
//                 </div>
//                 <div style={{ background:T.greenPale, borderRadius:99, height:5, overflow:"hidden" }}>
//                   <div style={{ height:"100%", borderRadius:99, background:m.color,
//                                 width:`${v}%`, transition:"width .6s ease", opacity:.85 }} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>

//       {/* ══ METRICS TAB ══ */}
//       {activeTab === "metrics" && (
//         <div style={{ animation:"fadeIn .3s ease" }}>
//           <SecTitle emoji="📊" title="Metric Breakdown"
//             sub="ROC-AUC, Recall and F1 Score compared across all 5 models" />

//           {/* 3 metric cards in a row */}
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18, marginBottom:20 }}>
//             {METRICS_CFG.map(met => (
//               <div key={met.key}
//                 style={{ background:T.surface, borderRadius:T.radius, border:`1.5px solid ${T.border}`,
//                          boxShadow:T.shadow, padding:"20px 22px" }}>
//                 <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:5 }}>
//                   <span style={{ width:30, height:30, borderRadius:9, background:T.greenLight,
//                                  display:"inline-flex", alignItems:"center", justifyContent:"center",
//                                  fontSize:16 }}>{met.emoji}</span>
//                   <span style={{ fontSize:13, fontWeight:800, color:T.text }}>{met.label}</span>
//                 </div>
//                 <div style={{ fontSize:11, color:T.muted, marginBottom:18, lineHeight:1.6 }}>{met.desc}</div>
//                 {MODELS.map(m => <MetricBar key={m.name} model={m} metKey={met.key} />)}
//               </div>
//             ))}
//           </div>

//           {/* Comparison table — all 5 models */}
//           <div style={{ background:T.surface, borderRadius:T.radius, border:`1.5px solid ${T.border}`,
//                         boxShadow:T.shadow, overflow:"hidden" }}>
//             <div style={{ padding:"16px 20px", borderBottom:`1px solid ${T.border}`,
//                           display:"flex", alignItems:"center", gap:9 }}>
//               <span style={{ width:30, height:30, borderRadius:9, background:T.greenLight,
//                              display:"inline-flex", alignItems:"center", justifyContent:"center",
//                              fontSize:16 }}>🏆</span>
//               <span style={{ fontSize:13, fontWeight:800, color:T.text }}>Model Comparison Table</span>
//               <span style={{ marginLeft:"auto", fontSize:11, color:T.muted }}>sorted by ROC-AUC ↓</span>
//             </div>
//             <div style={{ overflowX:"auto" }}>
//               <table style={{ width:"100%", borderCollapse:"collapse" }}>
//                 <thead>
//                   <tr style={{ background:T.greenPale }}>
//                     {["#","Model","ROC-AUC","Recall","F1 Score","Rank"].map(h => (
//                       <th key={h}
//                         style={{ padding:"11px 16px", fontSize:11, fontWeight:700, color:T.muted,
//                                  textTransform:"uppercase", letterSpacing:"0.8px", textAlign:"left",
//                                  borderBottom:`1.5px solid ${T.border}` }}>
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sorted.map((m, i) => (
//                     <tr key={m.name}
//                       style={{ borderBottom:`1px solid ${T.border}`, transition:"background .15s" }}
//                       onMouseEnter={e => e.currentTarget.style.background = T.greenPale}
//                       onMouseLeave={e => e.currentTarget.style.background = ""}
//                     >
//                       {/* rank number */}
//                       <td style={{ padding:"13px 16px" }}>
//                         <div style={{ width:24, height:24, borderRadius:"50%",
//                                       background:T.greenLight, display:"flex", alignItems:"center",
//                                       justifyContent:"center", fontSize:11, fontWeight:800, color:T.green }}>
//                           {i + 1}
//                         </div>
//                       </td>
//                       {/* name */}
//                       <td style={{ padding:"13px 16px" }}>
//                         <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//                           <div style={{ width:11, height:11, borderRadius:"50%",
//                                         background:m.color, flexShrink:0 }} />
//                           <span style={{ fontWeight:700, fontSize:13, color:m.color }}>{m.name}</span>
//                         </div>
//                       </td>
//                       {/* ROC-AUC pill */}
//                       <td style={{ padding:"13px 16px" }}>
//                         <span style={{ background:T.greenLight, color:T.green, fontSize:12,
//                                        fontWeight:700, fontFamily:"'JetBrains Mono',monospace",
//                                        padding:"3px 11px", borderRadius:99 }}>
//                           {m.roc_auc}%
//                         </span>
//                       </td>
//                       {/* Recall */}
//                       <td style={{ padding:"13px 16px", fontSize:13, fontWeight:600,
//                                    color:T.textMid, fontFamily:"'JetBrains Mono',monospace" }}>
//                         {m.recall}%
//                       </td>
//                       {/* F1 */}
//                       <td style={{ padding:"13px 16px", fontSize:13, fontWeight:600,
//                                    color:T.textMid, fontFamily:"'JetBrains Mono',monospace" }}>
//                         {m.f1}%
//                       </td>
//                       {/* rank badge */}
//                       <td style={{ padding:"13px 16px" }}>
//                         <RankBadge i={i} />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ══ ROC & CURVES TAB ══ */}
//       {activeTab === "roc" && (
//         <div style={{ animation:"fadeIn .3s ease" }}>
//           <SecTitle emoji="📉" title="ROC Curves & Comparison Charts"
//             sub="Click any chart to zoom — opens full-screen lightbox" />
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
//             <ReportCard name="all_models_roc_comparison"    caption="All Models — ROC Comparison"   badge="ROC" />
//             <ReportCard name="all_models_metric_comparison" caption="All Models — Metric Comparison" badge="Metrics" />
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
//             <ReportCard name="roc_curve_lightgbm"    caption="ROC Curve — LightGBM"       badge="LightGBM" />
//             <ReportCard name="model_comparison_bar"  caption="Model Comparison Bar Chart" badge="Compare" />
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
//             <ReportCard name="churn_score_analysis"  caption="Churn Score Distribution"   badge="Scores" />
//             <ReportCard name="risk_distribution"     caption="Risk Score Distribution"    badge="Risk" />
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
//             <ReportCard name="revenue_waterfall"     caption="Revenue Waterfall"           badge="Revenue" />
//             <ReportCard name="roi_analysis"          caption="ROI Analysis"               badge="ROI" />
//           </div>
//         </div>
//       )}

//       {/* ══ CONFUSION & FEATURES TAB ══ */}
//       {activeTab === "confusion" && (
//         <div style={{ animation:"fadeIn .3s ease" }}>
//           <SecTitle emoji="🔲" title="Confusion Matrices & Feature Importance"
//             sub="Click any chart to zoom — opens full-screen lightbox" />
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
//             <ReportCard name="confusion_matrix"          caption="Confusion Matrix"                  badge="XGBoost"  />
//             <ReportCard name="confusion_matrix_lightgbm" caption="Confusion Matrix — LightGBM"       badge="LightGBM" />
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
//             <ReportCard name="feature_importance_lightgbm" caption="Feature Importance — LightGBM"      badge="LightGBM" />
//             <ReportCard name="feature_importance_rf"       caption="Feature Importance — Random Forest" badge="RF"       />
//           </div>
//         </div>
//       )}

//       {/* ══ SHAP TAB ══ */}
//       {activeTab === "shap" && (
//         <div style={{ animation:"fadeIn .3s ease" }}>
//           <SecTitle emoji="🌳" title="SHAP Explainability Charts"
//             sub="Click any chart to zoom — opens full-screen lightbox" />
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
//             <ReportCard name="shap_bar"     caption="SHAP Bar — Feature Importance"       badge="SHAP" />
//             <ReportCard name="shap_summary" caption="SHAP Summary Beeswarm Plot"          badge="SHAP" />
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
//             <ReportCard name="shap_waterfall_highrisk" caption="SHAP Waterfall — High Risk" badge="SHAP" />
//             <ReportCard name="shap_dependence"         caption="SHAP Dependence Plot"       badge="SHAP" />
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:18 }}>
//             <ReportCard name="shap_force_plot" caption="SHAP Force Plot" badge="SHAP" fullWidth />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { useFetch, API } from "./Home";

const T = {
  green: "#1B7A4E", greenMid: "#25A468", greenLight: "#E8F8F0", greenPale: "#F2FCF7",
  greenBright: "#34C77B", accent: "#0D6640",
  surface: "#FFFFFF", border: "#E2EDE8", text: "#0F1F17", textMid: "#2D4A3A", muted: "#7A9E8C",
  radius: "16px", radiusSm: "10px",
  shadow: "0 2px 14px rgba(27,122,78,0.08)", shadowMd: "0 6px 30px rgba(27,122,78,0.16)",
};

const FIVE_MODELS = [
  { name: "XGBoost",             roc_auc: 87.4, recall: 84.1, f1: 81.7, color: "#6366F1" },
  { name: "Random Forest",       roc_auc: 86.3, recall: 79.5, f1: 75.2, color: "#8B5CF6" },
  { name: "Logistic Regression", roc_auc: 82.2, recall: 75.8, f1: 71.3, color: "#F59E0B" },
  { name: "LightGBM",            roc_auc: 83.1, recall: 72.5, f1: 74.6, color: "#EC4899" },
  { name: "ANN",                 roc_auc: 81.9, recall: 70.2, f1: 72.8, color: "#10B981" },
];

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
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
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

function ReportCard({ name, caption, badge, fullWidth }) {
  const [lb, setLb] = useState(false);
  const [hover, setHover] = useState(false);
  const [err, setErr] = useState(false);
  const src = `${API}/reports/${name}.png`;
  return (
    <>
      {lb && <Lightbox src={src} caption={caption} onClose={() => setLb(false)} />}
      <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: hover ? T.shadowMd : T.shadow, overflow: "hidden", transition: "box-shadow .2s,transform .2s", transform: hover ? "translateY(-2px)" : "", cursor: "pointer", gridColumn: fullWidth ? "1/-1" : undefined }}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div style={{ padding: "10px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.greenBright, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: T.textMid, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{caption}</span>
          </div>
          <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
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

function MetricBar({ model, metKey }) {
  const val = model[metKey] ?? 0;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: model.color, flexShrink: 0 }} />
          <span style={{ fontWeight: 700, fontSize: 11, color: model.color }}>{model.name}</span>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 11, color: T.text }}>{val}%</span>
      </div>
      <div style={{ background: T.greenPale, borderRadius: 99, height: 9, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 99, background: model.color, width: `${val}%`, transition: "width .6s ease" }} />
      </div>
    </div>
  );
}

function RankBadge({ i }) {
  const badges = [
    { bg: "#ECFDF5", color: "#059669", label: "🥇 Best" },
    { bg: "#FFFBEB", color: "#D97706", label: "🥈 2nd" },
    { bg: T.greenLight, color: T.greenMid, label: "🥉 3rd" },
    { bg: "#F1F5F9", color: "#64748B", label: "4th" },
    { bg: "#F1F5F9", color: "#94A3B8", label: "5th" },
  ];
  const b = badges[i] || badges[4];
  return <span style={{ background: b.bg, color: b.color, fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 99 }}>{b.label}</span>;
}

const TABS = [["metrics", "📊 Metrics"], ["roc", "📉 ROC & Curves"], ["confusion", "🔲 Confusion"], ["shap", "🌳 SHAP"]];
const METRICS_CFG = [
  { key: "roc_auc", emoji: "🎯", label: "ROC-AUC",  desc: "Area under the ROC curve — overall discrimination ability." },
  { key: "recall",  emoji: "🔍", label: "Recall",    desc: "Of all actual churners, how many did the model correctly flag?" },
  { key: "f1",      emoji: "⚖️", label: "F1 Score",  desc: "Harmonic mean of precision & recall." },
];

export default function ModelPage() {
  const { data: perf } = useFetch("/dashboard/model_performance");
  const [activeTab, setActiveTab] = useState("metrics");

  const apiMap = Object.fromEntries((perf?.models || []).map(m => [m.name, m]));
  const MODELS = FIVE_MODELS.map(fm => ({ ...fm, ...(apiMap[fm.name] || {}) }));
  const sorted = [...MODELS].sort((a, b) => b.roc_auc - a.roc_auc);
  const bestAUC = sorted[0];
  const bestRecall = [...MODELS].sort((a, b) => b.recall - a.recall)[0];

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif" }}>
      <style>{`
        .model-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }
        .model-kpi-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 12px; margin-bottom: 20px; }
        .model-metric-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 18px; }
        .model-report-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        @media (max-width: 1100px) { .model-kpi-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 800px) {
          .model-kpi-grid { grid-template-columns: repeat(2,1fr); }
          .model-metric-grid { grid-template-columns: 1fr; }
          .model-report-grid-2 { grid-template-columns: 1fr; }
        }
        @media (max-width: 500px) {
          .model-kpi-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="model-header">
        <div>
          <div style={{ fontSize: "1.25rem", fontWeight: 900, color: T.text }}>
            Model <span style={{ color: T.greenMid }}>Performance</span>
          </div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>5 trained models — XGBoost · RF · LR · LightGBM · ANN</div>
        </div>
        <div style={{ display: "flex", gap: 3, background: T.greenLight, borderRadius: 99, padding: "4px", flexWrap: "wrap" }}>
          {TABS.map(([k, l]) => <NavTab key={k} label={l} active={activeTab === k} onClick={() => setActiveTab(k)} />)}
        </div>
      </div>

      <div style={{ background: T.greenLight, border: `1.5px solid #A8E6C8`, borderRadius: T.radiusSm, padding: "10px 16px", marginBottom: 18, fontSize: 12, color: T.accent, display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 14, flexShrink: 0 }}>📌</span>
        <span style={{ lineHeight: 1.6 }}>
          Best ROC-AUC: <b style={{ color: T.green }}>{bestAUC?.name} ({bestAUC?.roc_auc}%)</b>
          &nbsp;·&nbsp;
          Best Recall: <b style={{ color: T.green }}>{bestRecall?.name} ({bestRecall?.recall}%)</b>
        </span>
      </div>

      {/* ── 5 Model Cards ── */}
      <div className="model-kpi-grid">
        {MODELS.map((m) => (
          <div key={m.name} style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, borderTop: `4px solid ${m.color}`, padding: "13px 12px", boxShadow: T.shadow, transition: "transform .18s,box-shadow .18s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = T.shadowMd; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = T.shadow; }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 6, lineHeight: 1.4, minHeight: 24 }}>{m.name}</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: m.color, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>{m.roc_auc}%</div>
            <div style={{ fontSize: 9, color: T.muted, marginTop: 3, marginBottom: 9 }}>ROC-AUC</div>
            {[["ROC", m.roc_auc], ["Recall", m.recall], ["F1", m.f1]].map(([k, v]) => (
              <div key={k} style={{ marginBottom: 5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, fontWeight: 700, color: T.muted, marginBottom: 2 }}>
                  <span>{k}</span><span style={{ color: T.textMid }}>{v}%</span>
                </div>
                <div style={{ background: T.greenPale, borderRadius: 99, height: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, background: m.color, width: `${v}%`, opacity: .85 }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── METRICS ── */}
      {activeTab === "metrics" && (
        <div style={{ animation: "fadeIn .3s ease" }}>
          <SecTitle emoji="📊" title="Metric Breakdown" sub="ROC-AUC, Recall and F1 Score across all 5 models" />
          <div className="model-metric-grid">
            {METRICS_CFG.map(met => (
              <div key={met.key} style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: T.greenLight, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{met.emoji}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: T.text }}>{met.label}</span>
                </div>
                <div style={{ fontSize: 10, color: T.muted, marginBottom: 14, lineHeight: 1.6 }}>{met.desc}</div>
                {MODELS.map(m => <MetricBar key={m.name} model={m} metKey={met.key} />)}
              </div>
            ))}
          </div>
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: T.greenLight, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🏆</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>Model Comparison Table</span>
              <span style={{ marginLeft: "auto", fontSize: 10, color: T.muted }}>sorted by ROC-AUC ↓</span>
            </div>
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                <thead>
                  <tr style={{ background: T.greenPale }}>
                    {["#", "Model", "ROC-AUC", "Recall", "F1 Score", "Rank"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", fontSize: 10, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.8px", textAlign: "left", borderBottom: `1.5px solid ${T.border}`, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((m, i) => (
                    <tr key={m.name} style={{ borderBottom: `1px solid ${T.border}` }}
                      onMouseEnter={e => e.currentTarget.style.background = T.greenPale}
                      onMouseLeave={e => e.currentTarget.style.background = ""}>
                      <td style={{ padding: "11px 14px" }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: T.green }}>{i + 1}</div>
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 10, height: 10, borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                          <span style={{ fontWeight: 700, fontSize: 12, color: m.color, whiteSpace: "nowrap" }}>{m.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        <span style={{ background: T.greenLight, color: T.green, fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", padding: "2px 9px", borderRadius: 99 }}>{m.roc_auc}%</span>
                      </td>
                      <td style={{ padding: "11px 14px", fontSize: 12, fontWeight: 600, color: T.textMid, fontFamily: "'JetBrains Mono',monospace" }}>{m.recall}%</td>
                      <td style={{ padding: "11px 14px", fontSize: 12, fontWeight: 600, color: T.textMid, fontFamily: "'JetBrains Mono',monospace" }}>{m.f1}%</td>
                      <td style={{ padding: "11px 14px" }}><RankBadge i={i} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "roc" && (
        <div style={{ animation: "fadeIn .3s ease" }}>
          <SecTitle emoji="📉" title="ROC Curves & Comparison Charts" sub="Click any chart to zoom" />
          <div className="model-report-grid-2">
            <ReportCard name="all_models_roc_comparison"    caption="All Models — ROC Comparison"   badge="ROC" />
            <ReportCard name="all_models_metric_comparison" caption="All Models — Metric Comparison" badge="Metrics" />
          </div>
          <div className="model-report-grid-2">
            <ReportCard name="roc_curve_lightgbm"   caption="ROC Curve — LightGBM"       badge="LightGBM" />
            <ReportCard name="model_comparison_bar" caption="Model Comparison Bar Chart"  badge="Compare" />
          </div>
          <div className="model-report-grid-2">
            <ReportCard name="churn_score_analysis" caption="Churn Score Distribution" badge="Scores" />
            <ReportCard name="risk_distribution"    caption="Risk Score Distribution"  badge="Risk" />
          </div>
          <div className="model-report-grid-2">
            <ReportCard name="revenue_waterfall" caption="Revenue Waterfall" badge="Revenue" />
            <ReportCard name="roi_analysis"      caption="ROI Analysis"      badge="ROI" />
          </div>
        </div>
      )}

      {activeTab === "confusion" && (
        <div style={{ animation: "fadeIn .3s ease" }}>
          <SecTitle emoji="🔲" title="Confusion Matrices & Feature Importance" sub="Click any chart to zoom" />
          <div className="model-report-grid-2" style={{ marginBottom: 16 }}>
            <ReportCard name="confusion_matrix"          caption="Confusion Matrix"            badge="XGBoost" />
            <ReportCard name="confusion_matrix_lightgbm" caption="Confusion Matrix — LightGBM" badge="LightGBM" />
          </div>
          <div className="model-report-grid-2">
            <ReportCard name="feature_importance_lightgbm" caption="Feature Importance — LightGBM"      badge="LightGBM" />
            <ReportCard name="feature_importance_rf"       caption="Feature Importance — Random Forest" badge="RF" />
          </div>
        </div>
      )}

      {activeTab === "shap" && (
        <div style={{ animation: "fadeIn .3s ease" }}>
          <SecTitle emoji="🌳" title="SHAP Explainability Charts" sub="Click any chart to zoom" />
          <div className="model-report-grid-2" style={{ marginBottom: 16 }}>
            <ReportCard name="shap_bar"     caption="SHAP Bar — Feature Importance" badge="SHAP" />
            <ReportCard name="shap_summary" caption="SHAP Summary Beeswarm Plot"    badge="SHAP" />
          </div>
          <div className="model-report-grid-2" style={{ marginBottom: 16 }}>
            <ReportCard name="shap_waterfall_highrisk" caption="SHAP Waterfall — High Risk" badge="SHAP" />
            <ReportCard name="shap_dependence"         caption="SHAP Dependence Plot"       badge="SHAP" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
            <ReportCard name="shap_force_plot" caption="SHAP Force Plot" badge="SHAP" fullWidth />
          </div>
        </div>
      )}
    </div>
  );
}