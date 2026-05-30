// import { useFetch, Icon, KpiSkel, API } from "./Home";

// // ─── THEME TOKENS ─────────────────────────────────────────────────────────────
// const T = {
//   teal:       "#4DC9C2",
//   tealDark:   "#2EA8A1",
//   tealLight:  "#E6F8F7",
//   tealMid:    "#A8E6E3",
//   blue:       "#5B9BD5",
//   blueLight:  "#EBF4FC",
//   yellow:     "#F7C948",
//   yellowLight:"#FEF9E7",
//   red:        "#F87171",
//   redLight:   "#FEF2F2",
//   bg:         "#F2FAFA",
//   surface:    "#FFFFFF",
//   border:     "#D9F0EE",
//   text:       "#2D4A52",
//   muted:      "#7FA8AE",
//   radius:     "18px",
//   radiusSm:   "12px",
//   shadow:     "0 4px 20px rgba(77,201,194,0.10)",
//   shadowMd:   "0 8px 32px rgba(77,201,194,0.20)",
// };

// const cardStyle = (extra = {}) => ({
//   background: T.surface,
//   borderRadius: T.radius,
//   border: `1.5px solid ${T.border}`,
//   padding: "20px 22px",
//   boxShadow: T.shadow,
//   ...extra,
// });

// const chipStyle = (bg, color) => ({
//   display: "inline-flex", alignItems: "center", gap: 6,
//   padding: "5px 13px", borderRadius: 99,
//   fontSize: 11, fontWeight: 700,
//   background: bg, color: color,
// });

// // ─── WELCOME CARD ─────────────────────────────────────────────────────────────
// function WelcomeCard({ kpis, navigate }) {
//   return (
//     <div style={{
//       background: `linear-gradient(135deg, ${T.teal} 0%, ${T.blue} 100%)`,
//       borderRadius: T.radius, padding: "26px 28px", color: "white",
//       position: "relative", overflow: "hidden", flex: 1, minWidth: 0,
//     }}>
//       <div style={{ position:"absolute", right:-25, bottom:-35, width:130, height:130, borderRadius:"50%", background:"rgba(255,255,255,0.09)" }} />
//       <div style={{ position:"absolute", right:55, top:-25, width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }} />
//       <div style={{ fontSize:10, fontWeight:700, opacity:.75, letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:8 }}>🔮 Churn AI Platform</div>
//       <div style={{ fontSize:"1.6rem", fontWeight:800, lineHeight:1.25, marginBottom:8 }}>Welcome back,<br/>Analyst 👋</div>
//       <div style={{ fontSize:12, opacity:.85, marginBottom:20, maxWidth:230, lineHeight:1.6 }}>
//         {kpis
//           ? `${Number(kpis.churned).toLocaleString()} customers at risk · ₹${Number(kpis.annual_rev_at_risk).toLocaleString("en-IN",{maximumFractionDigits:0})} annual exposure`
//           : "Loading live data..."}
//       </div>
//       <div style={{ display:"flex", gap:10 }}>
//         <button onClick={() => navigate("predict")} style={{ background:"white", border:"none", color:T.tealDark, fontWeight:700, fontSize:12, padding:"9px 20px", borderRadius:99, cursor:"pointer", boxShadow:"0 2px 12px rgba(0,0,0,0.14)", fontFamily:"'Outfit',sans-serif" }}>
//           Run Prediction
//         </button>
//         <button onClick={() => navigate("sql")} style={{ background:"rgba(255,255,255,0.18)", border:"1.5px solid rgba(255,255,255,0.38)", color:"white", fontWeight:700, fontSize:12, padding:"9px 18px", borderRadius:99, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
//           SQL Analytics
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── LATEST RESULTS CARD ──────────────────────────────────────────────────────
// function LatestResultsCard({ kpis }) {
//   const metrics = kpis ? [
//     { label:"Total Customers", value:Number(kpis.total_customers).toLocaleString(), pct:100, color:T.teal },
//     { label:"Churned",         value:Number(kpis.churned).toLocaleString(),          pct:parseFloat(kpis.churn_rate_pct)||0, color:T.red },
//     { label:"Rev at Risk",     value:`₹${Number(kpis.annual_rev_at_risk/1e6).toFixed(1)}M`, pct:60, color:T.yellow },
//   ] : [];

//   return (
//     <div style={{ ...cardStyle(), flex:1, minWidth:0 }}>
//       <div style={{ fontSize:13, fontWeight:800, color:T.text, marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
//         <span style={{ width:8, height:8, borderRadius:"50%", background:T.teal, display:"inline-block" }} />
//         Latest Results
//       </div>
//       {metrics.map((m) => (
//         <div key={m.label} style={{ marginBottom:14 }}>
//           <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, fontWeight:600, color:T.muted, marginBottom:5 }}>
//             <span>{m.label}</span>
//             <span style={{ color:T.text, fontWeight:800, fontFamily:"'JetBrains Mono',monospace" }}>{m.value}</span>
//           </div>
//           <div style={{ background:T.tealLight, borderRadius:99, height:7, overflow:"hidden" }}>
//             <div style={{ height:"100%", borderRadius:99, background:m.color, width:`${Math.min(m.pct,100)}%`, transition:"width .6s ease" }} />
//           </div>
//         </div>
//       ))}
//       {!kpis && [1,2,3].map(i => (
//         <div key={i} style={{ marginBottom:14 }}>
//           <div style={{ height:11, background:"#EEF8F8", borderRadius:6, marginBottom:5, width:"60%", animation:"shimmer 1.4s infinite" }} />
//           <div style={{ height:7, background:"#EEF8F8", borderRadius:99, animation:"shimmer 1.4s infinite" }} />
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── KPI CARD ─────────────────────────────────────────────────────────────────
// function KpiCard({ label, value, sub, colorKey, icon }) {
//   const pal = {
//     blue:   { bg:T.tealLight,   accent:T.teal,   text:T.tealDark  },
//     red:    { bg:T.redLight,    accent:T.red,     text:"#DC2626"   },
//     yellow: { bg:T.yellowLight, accent:T.yellow,  text:"#B45309"   },
//     green:  { bg:T.tealLight,   accent:T.tealDark,text:T.tealDark  },
//   }[colorKey] || { bg:T.tealLight, accent:T.teal, text:T.tealDark };

//   return (
//     <div
//       style={{ background:T.surface, border:`1.5px solid ${T.border}`, borderRadius:T.radius, padding:"18px 20px", boxShadow:T.shadow, position:"relative", overflow:"hidden", cursor:"default", transition:"transform .2s, box-shadow .2s" }}
//       onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=T.shadowMd; }}
//       onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=T.shadow; }}
//     >
//       <div style={{ width:40, height:40, borderRadius:13, background:pal.bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14, color:pal.accent }}>
//         <span style={{ width:19, height:19, display:"flex" }}>{icon}</span>
//       </div>
//       <div style={{ fontSize:10, fontWeight:700, color:T.muted, textTransform:"uppercase", letterSpacing:"0.9px", marginBottom:4 }}>{label}</div>
//       <div style={{ fontSize:"1.55rem", fontWeight:800, color:pal.text, fontFamily:"'JetBrains Mono',monospace", lineHeight:1 }}>{value}</div>
//       <div style={{ fontSize:11, color:T.muted, marginTop:6 }}>{sub}</div>
//       <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:pal.accent, borderRadius:"0 0 18px 18px" }} />
//     </div>
//   );
// }

// // ─── QUICK ACTION CARD ────────────────────────────────────────────────────────
// function QuickActionCard({ icon, color, iconColor, title, sub, onClick }) {
//   return (
//     <div
//       style={{ background:T.surface, border:`1.5px solid ${T.border}`, borderRadius:T.radius, padding:"16px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:14, transition:"all .2s", boxShadow:T.shadow }}
//       onClick={onClick}
//       onMouseEnter={e => { e.currentTarget.style.borderColor=T.teal; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=T.shadowMd; }}
//       onMouseLeave={e => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=T.shadow; }}
//     >
//       <div style={{ width:44, height:44, borderRadius:14, background:color, color:iconColor, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//         <span style={{ width:20, height:20, display:"flex" }}>{icon}</span>
//       </div>
//       <div>
//         <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{title}</div>
//         <div style={{ fontSize:11, color:T.muted, marginTop:2 }}>{sub}</div>
//       </div>
//       <div style={{ marginLeft:"auto", width:28, height:28, borderRadius:"50%", background:T.tealLight, display:"flex", alignItems:"center", justifyContent:"center", color:T.teal }}>
//         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
//       </div>
//     </div>
//   );
// }

// // ─── MODEL PERFORMANCE ────────────────────────────────────────────────────────
// function ModelPerformanceCard({ perf }) {
//   return (
//     <div style={cardStyle()}>
//       <div style={{ fontSize:13, fontWeight:800, color:T.text, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
//         <span style={{ width:8, height:8, borderRadius:"50%", background:T.blue, display:"inline-block" }} />
//         Model Performance
//       </div>
//       {perf?.models.map((m) => (
//         <div key={m.name} style={{ padding:"10px 0", borderBottom:`1px solid ${T.border}` }}>
//           <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
//             <span style={{ fontSize:12, fontWeight:700, color:T.text }}>{m.name}</span>
//             <div style={{ display:"flex", gap:12 }}>
//               {[["AUC",m.roc_auc],["Recall",m.recall],["F1",m.f1]].map(([k,v]) => (
//                 <span key={k} style={{ fontSize:10, color:T.muted }}>
//                   {k}: <b style={{color:T.text}}>{v}%</b>
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div style={{ background:T.tealLight, borderRadius:99, height:8, overflow:"hidden" }}>
//             <div style={{ height:"100%", borderRadius:99, background:`linear-gradient(90deg,${T.teal},${T.blue})`, width:`${m.roc_auc}%`, transition:"width .6s ease" }} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── BUSINESS INSIGHTS ───────────────────────────────────────────────────────
// function InsightsCard({ insights }) {
//   const dots = [T.teal, T.blue, T.yellow, T.red, "#A78BFA"];
//   return (
//     <div style={cardStyle()}>
//       <div style={{ fontSize:13, fontWeight:800, color:T.text, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
//         <span style={{ width:8, height:8, borderRadius:"50%", background:T.yellow, display:"inline-block" }} />
//         Business Insights
//       </div>
//       {insights?.insights.map((ins, i) => (
//         <div key={ins.title} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"11px 14px", borderRadius:T.radiusSm, background:T.bg, border:`1px solid ${T.border}`, marginBottom:8 }}>
//           <div style={{ width:9, height:9, borderRadius:"50%", background:dots[i%dots.length], flexShrink:0, marginTop:3 }} />
//           <div>
//             <div style={{ fontSize:12, fontWeight:700, color:T.text, marginBottom:2 }}>{ins.title}</div>
//             <div style={{ fontSize:11, color:T.muted, lineHeight:1.5 }}>{ins.description}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── SYSTEM STATUS ────────────────────────────────────────────────────────────
// function StatusCard({ status }) {
//   const items = [
//     { name:"XGBoost",       ok:status.models.xgboost },
//     { name:"Random Forest", ok:status.models.random_forest },
//     { name:"Logistic Reg.", ok:status.models.logistic_regression },
//     { name:"Feature Data",  ok:status.data.featured_data },
//     { name:"Raw Data",      ok:status.data.raw_data },
//     { name:"Database",      ok:status.data.database },
//   ];
//   return (
//     <div style={cardStyle()}>
//       <div style={{ fontSize:13, fontWeight:800, color:T.text, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
//         <span style={{ width:8, height:8, borderRadius:"50%", background:"#4ADE80", display:"inline-block" }} />
//         System Status
//       </div>
//       <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
//         {items.map((s) => (
//           <div key={s.name} style={chipStyle(s.ok?T.tealLight:T.redLight, s.ok?T.tealDark:"#DC2626")}>
//             <div style={{ width:7, height:7, borderRadius:"50%", background:s.ok?T.teal:T.red }} />
//             {s.name}
//           </div>
//         ))}
//         {status.dataset?.rows && (
//           <div style={chipStyle(T.blueLight, T.blue)}>
//             📊 {Number(status.dataset.rows).toLocaleString()} rows · {status.dataset.features} features
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── REPORT FILES ─────────────────────────────────────────────────────────────
// function ReportFilesCard({ reportList }) {
//   const generated = Object.values(reportList).filter(Boolean).length;
//   const total = Object.keys(reportList).length;
//   const pct = Math.round((generated / total) * 100);

//   return (
//     <div style={cardStyle()}>
//       <div style={{ display:"flex", alignItems:"center", marginBottom:16 }}>
//         <div style={{ fontSize:13, fontWeight:800, color:T.text }}>📁 Report Files</div>
//         <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:12 }}>
//           <span style={{ fontSize:11, color:T.muted }}>{generated} / {total} generated</span>
//           <div style={{ width:34, height:34, borderRadius:"50%", background:`conic-gradient(${T.teal} ${pct}%, ${T.tealLight} 0)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
//             <div style={{ width:24, height:24, borderRadius:"50%", background:T.surface, display:"flex", alignItems:"center", justifyContent:"center", fontSize:7, fontWeight:800, color:T.tealDark }}>{pct}%</div>
//           </div>
//         </div>
//       </div>
//       <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
//         {Object.entries(reportList).map(([name, exists]) => (
//           <div key={name}
//             style={{ background:exists?T.tealLight:T.bg, border:`1.5px solid ${exists?T.tealMid:T.border}`, borderRadius:10, padding:"8px 10px", fontSize:10, fontWeight:600, color:exists?T.tealDark:T.muted, display:"flex", alignItems:"center", gap:5, cursor:exists?"pointer":"default", transition:"all .15s" }}
//             onClick={() => exists && window.open(`${API}/reports/${name}.png`,"_blank")}
//             onMouseEnter={e => exists && (e.currentTarget.style.background=T.tealMid)}
//             onMouseLeave={e => exists && (e.currentTarget.style.background=T.tealLight)}
//           >
//             <span>{exists ? "✅" : "⬜"}</span>
//             <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── MAIN PAGE ────────────────────────────────────────────────────────────────
// export default function DashboardPage({ navigate }) {
//   const { data: kpis, loading: kLoad } = useFetch("/dashboard/kpis");
//   const { data: perf }       = useFetch("/dashboard/model_performance");
//   const { data: insights }   = useFetch("/dashboard/insights");
//   const { data: status }     = useFetch("/status");
//   const { data: reportList } = useFetch("/api/reports/list");

//   const kpiCards = kpis ? [
//     { label:"Total Customers", value:Number(kpis.total_customers).toLocaleString(),                                        colorKey:"blue",   icon:<Icon.Users />,  sub:"All tracked accounts" },
//     { label:"Churned",         value:Number(kpis.churned).toLocaleString(),                                                 colorKey:"red",    icon:<Icon.Alert />,  sub:`${kpis.churn_rate_pct}% churn rate` },
//     { label:"Churn Rate",      value:`${kpis.churn_rate_pct}%`,                                                             colorKey:"yellow", icon:<Icon.Trend />,  sub:"Monthly average" },
//     { label:"Revenue at Risk", value:`₹${Number(kpis.annual_rev_at_risk/1e6).toFixed(1)}M`,                                colorKey:"green",  icon:<Icon.ROI />,    sub:"Annual exposure" },
//   ] : [];

//   const quickActions = [
//     { icon:<Icon.Predict />, color:T.tealLight,   iconColor:T.tealDark, title:"Live Prediction", sub:"Score a customer instantly", page:"predict" },
//     { icon:<Icon.Batch />,   color:"#F0FDF4",      iconColor:"#16A34A",  title:"Batch Upload",    sub:"Score thousands at once",    page:"batch"   },
//     { icon:<Icon.SQL />,     color:T.yellowLight,  iconColor:"#B45309",  title:"SQL Analytics",   sub:"Query the predictions DB",   page:"sql"     },
//   ];

//   return (
//     <div style={{ fontFamily:"'Outfit',sans-serif" }}>

//       {/* ── TOP ROW: Welcome + Latest Results ── */}
//       <div style={{ display:"flex", gap:18, marginBottom:20 }}>
//         <WelcomeCard kpis={kpis} navigate={navigate} />
//         <LatestResultsCard kpis={kpis} />
//       </div>

//       {/* ── KPI CARDS ── */}
//       {kLoad ? <KpiSkel /> : (
//         <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:20 }}>
//           {kpiCards.map((c) => <KpiCard key={c.label} {...c} />)}
//         </div>
//       )}

//       {/* ── QUICK ACTIONS ── */}
//       <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:20 }}>
//         {quickActions.map((q) => (
//           <QuickActionCard key={q.title} {...q} onClick={() => navigate(q.page)} />
//         ))}
//       </div>

//       {/* ── MODEL + INSIGHTS ── */}
//       <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
//         <ModelPerformanceCard perf={perf} />
//         <InsightsCard insights={insights} />
//       </div>

//       {/* ── SYSTEM STATUS ── */}
//       {status && <div style={{ marginBottom:18 }}><StatusCard status={status} /></div>}

//       {/* ── REPORT FILES ── */}
//       {reportList && <ReportFilesCard reportList={reportList} />}
//     </div>
//   );
// }

import { useFetch, Icon, KpiSkel, API } from "./Home";

const T = {
  teal: "#4DC9C2", tealDark: "#2EA8A1", tealLight: "#E6F8F7", tealMid: "#A8E6E3",
  blue: "#5B9BD5", blueLight: "#EBF4FC", yellow: "#F7C948", yellowLight: "#FEF9E7",
  red: "#F87171", redLight: "#FEF2F2", bg: "#F2FAFA", surface: "#FFFFFF",
  border: "#D9F0EE", text: "#2D4A52", muted: "#7FA8AE",
  radius: "18px", radiusSm: "12px",
  shadow: "0 4px 20px rgba(77,201,194,0.10)", shadowMd: "0 8px 32px rgba(77,201,194,0.20)",
};

const cardStyle = (extra = {}) => ({
  background: T.surface, borderRadius: T.radius,
  border: `1.5px solid ${T.border}`, padding: "18px 20px",
  boxShadow: T.shadow, ...extra,
});

const chipStyle = (bg, color) => ({
  display: "inline-flex", alignItems: "center", gap: 5,
  padding: "4px 11px", borderRadius: 99, fontSize: 11, fontWeight: 700,
  background: bg, color: color,
});

// ─── WELCOME CARD ──────────────────────────────────────────────────────────────
function WelcomeCard({ kpis, navigate }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${T.teal} 0%, ${T.blue} 100%)`,
      borderRadius: T.radius, padding: "22px 24px", color: "white",
      position: "relative", overflow: "hidden", flex: 1, minWidth: 0,
    }}>
      <div style={{ position: "absolute", right: -20, bottom: -30, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.09)" }} />
      <div style={{ position: "absolute", right: 50, top: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
      <div style={{ fontSize: 9, fontWeight: 700, opacity: .75, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 6 }}>🔮 Churn AI Platform</div>
      <div style={{ fontSize: "1.45rem", fontWeight: 800, lineHeight: 1.25, marginBottom: 6 }}>Welcome back,<br />Analyst 👋</div>
      <div style={{ fontSize: 11, opacity: .85, marginBottom: 16, maxWidth: 240, lineHeight: 1.6 }}>
        {kpis
          ? `${Number(kpis.churned).toLocaleString()} customers at risk · ₹${Number(kpis.annual_rev_at_risk).toLocaleString("en-IN", { maximumFractionDigits: 0 })} annual exposure`
          : "Loading live data..."}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => navigate("predict")} style={{ background: "white", border: "none", color: T.tealDark, fontWeight: 700, fontSize: 12, padding: "8px 16px", borderRadius: 99, cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.14)", fontFamily: "'Outfit',sans-serif" }}>
          Run Prediction
        </button>
        <button onClick={() => navigate("sql")} style={{ background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.38)", color: "white", fontWeight: 700, fontSize: 12, padding: "8px 14px", borderRadius: 99, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
          SQL Analytics
        </button>
      </div>
    </div>
  );
}

// ─── LATEST RESULTS ────────────────────────────────────────────────────────────
function LatestResultsCard({ kpis }) {
  const metrics = kpis ? [
    { label: "Total Customers", value: Number(kpis.total_customers).toLocaleString(), pct: 100, color: T.teal },
    { label: "Churned", value: Number(kpis.churned).toLocaleString(), pct: parseFloat(kpis.churn_rate_pct) || 0, color: T.red },
    { label: "Rev at Risk", value: `₹${Number(kpis.annual_rev_at_risk / 1e6).toFixed(1)}M`, pct: 60, color: T.yellow },
  ] : [];

  return (
    <div style={{ ...cardStyle(), flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: T.text, marginBottom: 14, display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.teal, display: "inline-block" }} />
        Latest Results
      </div>
      {metrics.map((m) => (
        <div key={m.label} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, color: T.muted, marginBottom: 4 }}>
            <span>{m.label}</span>
            <span style={{ color: T.text, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace" }}>{m.value}</span>
          </div>
          <div style={{ background: T.tealLight, borderRadius: 99, height: 6, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 99, background: m.color, width: `${Math.min(m.pct, 100)}%`, transition: "width .6s ease" }} />
          </div>
        </div>
      ))}
      {!kpis && [1, 2, 3].map(i => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ height: 10, background: "#EEF8F8", borderRadius: 6, marginBottom: 4, width: "60%", animation: "shimmer 1.4s infinite" }} />
          <div style={{ height: 6, background: "#EEF8F8", borderRadius: 99, animation: "shimmer 1.4s infinite" }} />
        </div>
      ))}
    </div>
  );
}

// ─── KPI CARD ──────────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, colorKey, icon }) {
  const pal = {
    blue:   { bg: T.tealLight,   accent: T.teal,    text: T.tealDark },
    red:    { bg: T.redLight,    accent: T.red,      text: "#DC2626" },
    yellow: { bg: T.yellowLight, accent: T.yellow,   text: "#B45309" },
    green:  { bg: T.tealLight,   accent: T.tealDark, text: T.tealDark },
  }[colorKey] || { bg: T.tealLight, accent: T.teal, text: T.tealDark };

  return (
    <div
      style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: T.radius, padding: "16px 18px", boxShadow: T.shadow, position: "relative", overflow: "hidden", cursor: "default", transition: "transform .2s, box-shadow .2s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = T.shadowMd; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = T.shadow; }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 11, background: pal.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, color: pal.accent }}>
        <span style={{ width: 17, height: 17, display: "flex" }}>{icon}</span>
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.9px", marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: "1.4rem", fontWeight: 800, color: pal.text, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10, color: T.muted, marginTop: 5 }}>{sub}</div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: pal.accent, borderRadius: "0 0 18px 18px" }} />
    </div>
  );
}

// ─── QUICK ACTION CARD ─────────────────────────────────────────────────────────
function QuickActionCard({ icon, color, iconColor, title, sub, onClick }) {
  return (
    <div
      style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: T.radius, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all .2s", boxShadow: T.shadow }}
      onClick={onClick}
      onMouseEnter={e => { e.currentTarget.style.borderColor = T.teal; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = T.shadowMd; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = T.shadow; }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 12, background: color, color: iconColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ width: 18, height: 18, display: "flex" }}>{icon}</span>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{title}</div>
        <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ marginLeft: "auto", width: 26, height: 26, borderRadius: "50%", background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.teal, flexShrink: 0 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
      </div>
    </div>
  );
}

// ─── MODEL PERFORMANCE ─────────────────────────────────────────────────────────
function ModelPerformanceCard({ perf }) {
  return (
    <div style={cardStyle()}>
      <div style={{ fontSize: 12, fontWeight: 800, color: T.text, marginBottom: 14, display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.blue, display: "inline-block" }} />
        Model Performance
      </div>
      {perf?.models.map((m) => (
        <div key={m.name} style={{ padding: "9px 0", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5, flexWrap: "wrap", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{m.name}</span>
            <div style={{ display: "flex", gap: 8 }}>
              {[["AUC", m.roc_auc], ["Recall", m.recall], ["F1", m.f1]].map(([k, v]) => (
                <span key={k} style={{ fontSize: 10, color: T.muted }}>
                  {k}: <b style={{ color: T.text }}>{v}%</b>
                </span>
              ))}
            </div>
          </div>
          <div style={{ background: T.tealLight, borderRadius: 99, height: 7, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg,${T.teal},${T.blue})`, width: `${m.roc_auc}%`, transition: "width .6s ease" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── INSIGHTS CARD ─────────────────────────────────────────────────────────────
function InsightsCard({ insights }) {
  const dots = [T.teal, T.blue, T.yellow, T.red, "#A78BFA"];
  return (
    <div style={cardStyle()}>
      <div style={{ fontSize: 12, fontWeight: 800, color: T.text, marginBottom: 14, display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.yellow, display: "inline-block" }} />
        Business Insights
      </div>
      {insights?.insights.map((ins, i) => (
        <div key={ins.title} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: T.radiusSm, background: T.bg, border: `1px solid ${T.border}`, marginBottom: 7 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: dots[i % dots.length], flexShrink: 0, marginTop: 3 }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.text, marginBottom: 2 }}>{ins.title}</div>
            <div style={{ fontSize: 10, color: T.muted, lineHeight: 1.5 }}>{ins.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── STATUS CARD ───────────────────────────────────────────────────────────────
function StatusCard({ status }) {
  const items = [
    { name: "XGBoost",       ok: status.models.xgboost },
    { name: "Random Forest", ok: status.models.random_forest },
    { name: "Logistic Reg.", ok: status.models.logistic_regression },
    { name: "Feature Data",  ok: status.data.featured_data },
    { name: "Raw Data",      ok: status.data.raw_data },
    { name: "Database",      ok: status.data.database },
  ];
  return (
    <div style={cardStyle()}>
      <div style={{ fontSize: 12, fontWeight: 800, color: T.text, marginBottom: 12, display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />
        System Status
      </div>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
        {items.map((s) => (
          <div key={s.name} style={chipStyle(s.ok ? T.tealLight : T.redLight, s.ok ? T.tealDark : "#DC2626")}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.ok ? T.teal : T.red }} />
            {s.name}
          </div>
        ))}
        {status.dataset?.rows && (
          <div style={chipStyle("#EBF4FC", T.blue)}>
            📊 {Number(status.dataset.rows).toLocaleString()} rows · {status.dataset.features} features
          </div>
        )}
      </div>
    </div>
  );
}

// ─── REPORT FILES ──────────────────────────────────────────────────────────────
function ReportFilesCard({ reportList }) {
  const generated = Object.values(reportList).filter(Boolean).length;
  const total = Object.keys(reportList).length;
  const pct = Math.round((generated / total) * 100);

  return (
    <div style={cardStyle()}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: T.text }}>📁 Report Files</div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10, color: T.muted }}>{generated} / {total} generated</span>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: `conic-gradient(${T.teal} ${pct}%, ${T.tealLight} 0)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 6, fontWeight: 800, color: T.tealDark }}>{pct}%</div>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 7 }}>
        {Object.entries(reportList).map(([name, exists]) => (
          <div key={name}
            style={{ background: exists ? T.tealLight : T.bg, border: `1.5px solid ${exists ? T.tealMid : T.border}`, borderRadius: 9, padding: "7px 9px", fontSize: 10, fontWeight: 600, color: exists ? T.tealDark : T.muted, display: "flex", alignItems: "center", gap: 4, cursor: exists ? "pointer" : "default", transition: "all .15s", minWidth: 0 }}
            onClick={() => exists && window.open(`${API}/reports/${name}.png`, "_blank")}
            onMouseEnter={e => exists && (e.currentTarget.style.background = T.tealMid)}
            onMouseLeave={e => exists && (e.currentTarget.style.background = T.tealLight)}
          >
            <span>{exists ? "✅" : "⬜"}</span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function DashboardPage({ navigate }) {
  const { data: kpis, loading: kLoad } = useFetch("/dashboard/kpis");
  const { data: perf }       = useFetch("/dashboard/model_performance");
  const { data: insights }   = useFetch("/dashboard/insights");
  const { data: status }     = useFetch("/status");
  const { data: reportList } = useFetch("/api/reports/list");

  const kpiCards = kpis ? [
    { label: "Total Customers", value: Number(kpis.total_customers).toLocaleString(), colorKey: "blue",   icon: <Icon.Users />,  sub: "All tracked accounts" },
    { label: "Churned",         value: Number(kpis.churned).toLocaleString(),          colorKey: "red",    icon: <Icon.Alert />,  sub: `${kpis.churn_rate_pct}% churn rate` },
    { label: "Churn Rate",      value: `${kpis.churn_rate_pct}%`,                      colorKey: "yellow", icon: <Icon.Trend />,  sub: "Monthly average" },
    { label: "Revenue at Risk", value: `₹${Number(kpis.annual_rev_at_risk / 1e6).toFixed(1)}M`, colorKey: "green", icon: <Icon.ROI />, sub: "Annual exposure" },
  ] : [];

  const quickActions = [
    { icon: <Icon.Predict />, color: T.tealLight,   iconColor: T.tealDark, title: "Live Prediction", sub: "Score a customer instantly", page: "predict" },
    { icon: <Icon.Batch />,   color: "#F0FDF4",      iconColor: "#16A34A",  title: "Batch Upload",    sub: "Score thousands at once",    page: "batch" },
    { icon: <Icon.SQL />,     color: T.yellowLight,  iconColor: "#B45309",  title: "SQL Analytics",   sub: "Query the predictions DB",   page: "sql" },
  ];

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif" }}>

      {/* ── TOP ROW ── */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
        <WelcomeCard kpis={kpis} navigate={navigate} />
        <LatestResultsCard kpis={kpis} />
      </div>

      {/* ── KPI CARDS ── */}
      {kLoad ? <KpiSkel /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 16 }}>
          {kpiCards.map((c) => <KpiCard key={c.label} {...c} />)}
        </div>
      )}

      {/* ── QUICK ACTIONS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 16 }}>
        {quickActions.map((q) => (
          <QuickActionCard key={q.title} {...q} onClick={() => navigate(q.page)} />
        ))}
      </div>

      {/* ── MODEL + INSIGHTS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 16 }}>
        <ModelPerformanceCard perf={perf} />
        <InsightsCard insights={insights} />
      </div>

      {/* ── SYSTEM STATUS ── */}
      {status && <div style={{ marginBottom: 16 }}><StatusCard status={status} /></div>}

      {/* ── REPORT FILES ── */}
      {reportList && <ReportFilesCard reportList={reportList} />}
    </div>
  );
}