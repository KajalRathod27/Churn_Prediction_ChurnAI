// import { useState, useRef } from "react";
// import { api, Icon, Table } from "./Home";

// // ─── THEME ────────────────────────────────────────────────────────────────────
// const T = {
//   green:       "#1B7A4E",
//   greenMid:    "#25A468",
//   greenLight:  "#E8F8F0",
//   greenPale:   "#F2FCF7",
//   greenBright: "#34C77B",
//   teal:        "#4DC9C2",
//   tealLight:   "#E0F7F6",
//   surface:     "#FFFFFF",
//   border:      "#D6EFE9",
//   bg:          "#F4FAF8",
//   text:        "#0F1F17",
//   textMid:     "#2D4A3A",
//   muted:       "#7A9E8C",
//   red:         "#F87171",
//   redLight:    "#FEF2F2",
//   orange:      "#FB923C",
//   orangeLight: "#FFF0E6",
//   blue:        "#60A5FA",
//   blueLight:   "#EFF6FF",
//   radius:      "14px",
//   radiusSm:    "10px",
//   shadow:      "0 2px 14px rgba(27,122,78,0.08)",
//   shadowMd:    "0 6px 30px rgba(27,122,78,0.16)",
// };

// // ─── FILE TYPE ICON ───────────────────────────────────────────────────────────
// function FileIcon({ name }) {
//   const ext = (name || "").split(".").pop().toLowerCase();
//   const cfg = {
//     csv:  { bg:"#DCFCE7", color:"#16A34A", label:"CSV" },
//     xlsx: { bg:"#DCFCE7", color:"#16A34A", label:"XLS" },
//     xls:  { bg:"#DCFCE7", color:"#16A34A", label:"XLS" },
//     pdf:  { bg:"#FEE2E2", color:"#DC2626", label:"PDF" },
//     doc:  { bg:"#DBEAFE", color:"#2563EB", label:"DOC" },
//     docx: { bg:"#DBEAFE", color:"#2563EB", label:"DOC" },
//   }[ext] || { bg:T.greenLight, color:T.green, label:ext.toUpperCase().slice(0,3) || "FILE" };

//   return (
//     <div style={{ width:36, height:36, borderRadius:9, background:cfg.bg,
//                   display:"flex", alignItems:"center", justifyContent:"center",
//                   flexShrink:0 }}>
//       <span style={{ fontSize:9, fontWeight:800, color:cfg.color, letterSpacing:"0.3px" }}>{cfg.label}</span>
//     </div>
//   );
// }

// // ─── UPLOADED FILE ROW ────────────────────────────────────────────────────────
// function FileRow({ name, size, status, pct }) {
//   const isDone = status === "Completed";
//   return (
//     <div style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px",
//                   background:T.surface, borderRadius:T.radiusSm,
//                   border:`1.5px solid ${T.border}`, marginBottom:8,
//                   transition:"box-shadow .15s" }}
//       onMouseEnter={e => e.currentTarget.style.boxShadow = T.shadowMd}
//       onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
//     >
//       <FileIcon name={name} />
//       <div style={{ flex:1, minWidth:0 }}>
//         <div style={{ fontSize:12, fontWeight:700, color:T.text,
//                       overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
//           {name}
//         </div>
//         {!isDone && (
//           <div style={{ marginTop:5 }}>
//             <div style={{ background:"#E5F5EE", borderRadius:99, height:5, overflow:"hidden" }}>
//               <div style={{ height:"100%", borderRadius:99, background:T.greenBright,
//                             width:`${pct}%`, transition:"width .4s ease" }} />
//             </div>
//           </div>
//         )}
//         {size && (
//           <div style={{ fontSize:10, color:T.muted, marginTop:3 }}>{size}</div>
//         )}
//       </div>
//       <div style={{ flexShrink:0 }}>
//         {isDone ? (
//           <span style={{ fontSize:11, fontWeight:700, background:T.greenLight,
//                          color:T.green, padding:"3px 10px", borderRadius:99 }}>
//             ✓ Completed
//           </span>
//         ) : (
//           <span style={{ fontSize:11, fontWeight:700, background:T.tealLight,
//                          color:T.teal, padding:"3px 10px", borderRadius:99 }}>
//             {pct}%
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── KPI CARD ─────────────────────────────────────────────────────────────────
// function KpiCard({ label, value, color, bg, icon }) {
//   return (
//     <div style={{ background:bg, borderRadius:T.radius, padding:"16px 18px",
//                   border:`1.5px solid ${T.border}`, boxShadow:T.shadow,
//                   position:"relative", overflow:"hidden" }}>
//       <div style={{ fontSize:10, fontWeight:700, color:T.muted,
//                     textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:6 }}>
//         {label}
//       </div>
//       <div style={{ fontSize:"1.7rem", fontWeight:900, color,
//                     fontFamily:"'JetBrains Mono',monospace", lineHeight:1 }}>
//         {value}
//       </div>
//       {icon && (
//         <div style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)",
//                       fontSize:22, opacity:.18 }}>{icon}</div>
//       )}
//     </div>
//   );
// }

// // ─── MAIN PAGE ────────────────────────────────────────────────────────────────
// export default function BatchPage() {
//   const [file, setFile]       = useState(null);
//   const [result, setResult]   = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [dragging, setDragging] = useState(false);
//   const [uploadPct, setUploadPct] = useState(0);
//   const fileRef = useRef();

//   const handleFile = (f) => {
//     if (!f?.name.endsWith(".csv")) return;
//     setFile(f);
//     setResult(null);
//     // simulate upload progress animation
//     setUploadPct(0);
//     let p = 0;
//     const iv = setInterval(() => {
//       p += Math.random() * 18 + 8;
//       if (p >= 100) { p = 100; clearInterval(iv); }
//       setUploadPct(Math.round(p));
//     }, 80);
//   };

//   const runBatch = async () => {
//     if (!file) return;
//     setLoading(true);
//     const fd = new FormData();
//     fd.append("file", file);
//     try {
//       const res = await fetch(api("/predict/batch"), { method:"POST", body:fd });
//       setResult(await res.json());
//     } catch (e) { console.error(e); } finally { setLoading(false); }
//   };

//   const downloadCSV = async () => {
//     if (!file) return;
//     const fd = new FormData();
//     fd.append("file", file);
//     const res = await fetch(api("/predict/batch/download"), { method:"POST", body:fd });
//     const blob = await res.blob();
//     const url  = URL.createObjectURL(blob);
//     const a    = document.createElement("a");
//     a.href = url; a.download = "predictions.csv"; a.click();
//   };

//   const cols = result?.top_30?.length ? Object.keys(result.top_30[0]).slice(0, 7) : [];

//   return (
//     <div style={{ fontFamily:"'Outfit',sans-serif" }}>

//       {/* ── Page header ── */}
//       <div style={{ marginBottom:24 }}>
//         <div style={{ fontSize:"1.35rem", fontWeight:900, color:T.text }}>
//           Upload <span style={{ color:T.greenMid }}>Files</span>
//         </div>
//         <div style={{ fontSize:12, color:T.muted, marginTop:3 }}>
//           Upload your CSV to batch score thousands of customers at once
//         </div>
//       </div>

//       {/* ── Main 2-col layout ── */}
//       <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>

//         {/* ── LEFT: Drop zone + info ── */}
//         <div>

//           {/* Drop zone card — matches image */}
//           <div style={{ background:T.surface, borderRadius:T.radius,
//                         border:`1.5px solid ${T.border}`, boxShadow:T.shadow,
//                         padding:"28px 24px", marginBottom:18 }}>

//             <div style={{ fontSize:13, fontWeight:800, color:T.text, marginBottom:18,
//                           display:"flex", alignItems:"center", gap:8 }}>
//               <span style={{ width:28, height:28, borderRadius:8, background:T.greenLight,
//                              display:"inline-flex", alignItems:"center", justifyContent:"center",
//                              fontSize:14 }}>📂</span>
//               Upload CSV
//             </div>

//             {/* dashed drop zone */}
//             <div
//               onClick={() => fileRef.current.click()}
//               onDragOver={e => { e.preventDefault(); setDragging(true); }}
//               onDragLeave={() => setDragging(false)}
//               onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
//               style={{
//                 border:`2px dashed ${dragging ? T.green : T.border}`,
//                 borderRadius:T.radius,
//                 padding:"44px 24px",
//                 textAlign:"center",
//                 cursor:"pointer",
//                 background: dragging ? T.greenLight : T.greenPale,
//                 transition:"all .2s",
//                 marginBottom:20,
//               }}
//             >
//               {/* upload cloud icon */}
//               <div style={{ marginBottom:14 }}>
//                 <svg width="44" height="44" viewBox="0 0 48 48" fill="none"
//                   style={{ margin:"0 auto", display:"block", opacity: dragging ? 1 : 0.45 }}>
//                   <circle cx="24" cy="24" r="22" fill={T.greenLight} />
//                   <path d="M24 30V18M24 18L19 23M24 18L29 23" stroke={T.green}
//                     strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
//                   <path d="M16 34h16" stroke={T.greenMid} strokeWidth="2"
//                     strokeLinecap="round"/>
//                 </svg>
//               </div>

//               {file ? (
//                 <>
//                   <div style={{ fontSize:14, fontWeight:800, color:T.green, marginBottom:4 }}>
//                     ✅ {file.name}
//                   </div>
//                   <div style={{ fontSize:11, color:T.muted }}>
//                     {(file.size / 1024).toFixed(1)} KB · Click to change
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div style={{ fontSize:14, fontWeight:700, color:T.textMid, marginBottom:6 }}>
//                     Drag and drop files here
//                   </div>
//                   <div style={{ fontSize:12, color:T.muted, marginBottom:20 }}>-OR-</div>
//                   <div style={{ display:"inline-block" }}>
//                     <span style={{ background:T.green, color:"white", fontSize:12, fontWeight:700,
//                                    padding:"9px 24px", borderRadius:T.radiusSm, cursor:"pointer",
//                                    boxShadow:`0 4px 14px rgba(27,122,78,0.30)` }}>
//                       Browse Files
//                     </span>
//                   </div>
//                 </>
//               )}
//             </div>

//             <input type="file" ref={fileRef} accept=".csv" style={{ display:"none" }}
//               onChange={e => handleFile(e.target.files[0])} />

//             {/* action buttons */}
//             <div style={{ display:"flex", gap:10 }}>
//               <button
//                 onClick={runBatch} disabled={!file || loading}
//                 style={{ flex:1, padding:"11px", borderRadius:T.radiusSm, border:"none",
//                          background:(!file || loading) ? "#A7D7BC" : T.green,
//                          color:"white", fontSize:13, fontWeight:700,
//                          cursor:(!file || loading) ? "not-allowed" : "pointer",
//                          display:"flex", alignItems:"center", justifyContent:"center", gap:8,
//                          boxShadow:(!file || loading) ? "none" : `0 4px 16px rgba(27,122,78,0.30)`,
//                          transition:"all .18s", fontFamily:"'Outfit',sans-serif" }}
//                 onMouseEnter={e => file && !loading && (e.currentTarget.style.background = T.greenMid)}
//                 onMouseLeave={e => e.currentTarget.style.background = (!file || loading) ? "#A7D7BC" : T.green}
//               >
//                 {loading ? (
//                   <>
//                     <div style={{ width:15, height:15, borderRadius:"50%",
//                                   border:"2.5px solid rgba(255,255,255,0.35)",
//                                   borderTopColor:"white", animation:"spin .7s linear infinite" }} />
//                     Processing…
//                   </>
//                 ) : (
//                   <>
//                     <span style={{ width:16, height:16, display:"flex" }}><Icon.Play /></span>
//                     Run Prediction
//                   </>
//                 )}
//               </button>

//               {result && (
//                 <button onClick={downloadCSV}
//                   style={{ padding:"11px 18px", borderRadius:T.radiusSm,
//                            border:`1.5px solid ${T.border}`, background:T.surface,
//                            color:T.green, fontSize:13, fontWeight:700, cursor:"pointer",
//                            display:"flex", alignItems:"center", gap:7, transition:"all .18s",
//                            fontFamily:"'Outfit',sans-serif" }}
//                   onMouseEnter={e => { e.currentTarget.style.background = T.greenLight; e.currentTarget.style.borderColor = T.green; }}
//                   onMouseLeave={e => { e.currentTarget.style.background = T.surface; e.currentTarget.style.borderColor = T.border; }}
//                 >
//                   <span style={{ width:15, height:15, display:"flex" }}><Icon.Download /></span>
//                   Download CSV
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Requirements card */}
//           <div style={{ background:T.surface, borderRadius:T.radius, border:`1.5px solid ${T.border}`,
//                         boxShadow:T.shadow, padding:"20px 22px" }}>
//             <div style={{ fontSize:13, fontWeight:800, color:T.text, marginBottom:12,
//                           display:"flex", alignItems:"center", gap:8 }}>
//               <span style={{ width:28, height:28, borderRadius:8, background:"#FEF3C7",
//                              display:"inline-flex", alignItems:"center", justifyContent:"center",
//                              fontSize:14 }}>ℹ️</span>
//               Requirements
//             </div>
//             <p style={{ fontSize:12, color:T.muted, lineHeight:1.8, marginBottom:14 }}>
//               Your CSV should contain the same feature columns used during model training.
//               The API will align features automatically and fill missing columns with <code style={{ background:T.greenPale, padding:"1px 6px", borderRadius:4, color:T.green }}>0</code>.
//             </p>
//             <div style={{ background:"#0F1F17", borderRadius:T.radiusSm, padding:"12px 16px",
//                           fontSize:11, fontFamily:"'JetBrains Mono',monospace",
//                           color:"#A8E6C8", lineHeight:1.9 }}>
//               <span style={{ color:"#34C77B" }}>POST</span> /predict/batch{"\n"}
//               <span style={{ color:"#7A9E8C" }}>Content-Type:</span> multipart/form-data{"\n"}
//               <span style={{ color:"#7A9E8C" }}>field:</span> file (CSV)
//             </div>
//           </div>
//         </div>

//         {/* ── RIGHT: Uploaded Files list + Results ── */}
//         <div>

//           {/* Uploaded files panel — always visible once file is chosen */}
//           {file && (
//             <div style={{ background:T.surface, borderRadius:T.radius,
//                           border:`1.5px solid ${T.border}`, boxShadow:T.shadow,
//                           padding:"20px 22px", marginBottom:18,
//                           animation:"fadeIn .3s ease" }}>
//               <div style={{ fontSize:13, fontWeight:800, color:T.text, marginBottom:16,
//                             display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//                 <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                   <span style={{ width:28, height:28, borderRadius:8, background:T.greenLight,
//                                  display:"inline-flex", alignItems:"center", justifyContent:"center",
//                                  fontSize:14 }}>📋</span>
//                   Uploaded Files
//                 </div>
//                 <span style={{ fontSize:10, fontWeight:700, background:T.greenLight,
//                                color:T.green, padding:"3px 10px", borderRadius:99 }}>
//                   1 file
//                 </span>
//               </div>

//               <FileRow
//                 name={file.name}
//                 size={`${(file.size / 1024).toFixed(1)} KB`}
//                 status={uploadPct >= 100 ? "Completed" : "Uploading"}
//                 pct={uploadPct}
//               />

//               {/* decorative placeholder rows (greyed out) matching image style */}
//               {[
//                 { name:"customers_batch.csv (example)", size:"", status:"Pending", pct:0 },
//                 { name:"churn_data_export.csv (example)", size:"", status:"Pending", pct:0 },
//               ].map((r, i) => (
//                 <div key={i} style={{ display:"flex", alignItems:"center", gap:12,
//                                       padding:"11px 14px", background:"#FAFCFB",
//                                       borderRadius:T.radiusSm, border:`1.5px dashed ${T.border}`,
//                                       marginBottom:8, opacity:0.4 }}>
//                   <div style={{ width:36, height:36, borderRadius:9, background:T.greenPale,
//                                 display:"flex", alignItems:"center", justifyContent:"center" }}>
//                     <span style={{ fontSize:8, fontWeight:800, color:T.muted }}>CSV</span>
//                   </div>
//                   <div style={{ flex:1 }}>
//                     <div style={{ fontSize:11, color:T.muted }}>{r.name}</div>
//                   </div>
//                   <span style={{ fontSize:10, color:T.muted, fontStyle:"italic" }}>waiting…</span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Results */}
//           {result ? (
//             <div style={{ animation:"fadeIn .3s ease" }}>
//               {/* KPI grid */}
//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
//                 <KpiCard label="HIGH Risk"   value={result.summary.high_risk.toLocaleString()}
//                   color="#DC2626" bg={T.redLight}    icon="🔴" />
//                 <KpiCard label="MEDIUM Risk" value={result.summary.medium_risk.toLocaleString()}
//                   color="#D97706" bg="#FEF9ED"       icon="🟡" />
//                 <KpiCard label="LOW Risk"    value={result.summary.low_risk.toLocaleString()}
//                   color={T.green} bg={T.greenLight}  icon="🟢" />
//                 <KpiCard label="Total Rows"  value={result.total_rows.toLocaleString()}
//                   color={T.blue}  bg={T.blueLight}   icon="📊" />
//               </div>

//               {/* Revenue at risk */}
//               {result.summary.revenue_at_risk > 0 && (
//                 <div style={{ background:"#FEF2F2", border:"1.5px solid #FECACA",
//                               borderRadius:T.radius, padding:"14px 18px", marginBottom:18,
//                               display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//                   <div>
//                     <div style={{ fontSize:11, fontWeight:700, color:"#B91C1C",
//                                   textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:4 }}>
//                       Annual Revenue at Risk
//                     </div>
//                     <div style={{ fontSize:"1.5rem", fontWeight:900,
//                                   fontFamily:"'JetBrains Mono',monospace", color:"#DC2626" }}>
//                       ₹{Number(result.summary.revenue_at_risk).toLocaleString("en-IN", { maximumFractionDigits:0 })}
//                     </div>
//                   </div>
//                   <div style={{ fontSize:28, opacity:.6 }}>⚠️</div>
//                 </div>
//               )}

//               {/* Top 30 table */}
//               <div style={{ background:T.surface, borderRadius:T.radius,
//                             border:`1.5px solid ${T.border}`, boxShadow:T.shadow,
//                             overflow:"hidden" }}>
//                 <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.border}`,
//                               display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//                   <div style={{ fontSize:13, fontWeight:800, color:T.text,
//                                 display:"flex", alignItems:"center", gap:8 }}>
//                     <span style={{ width:28, height:28, borderRadius:8, background:T.greenLight,
//                                    display:"inline-flex", alignItems:"center",
//                                    justifyContent:"center", fontSize:14 }}>🎯</span>
//                     Top 30 Highest Risk Customers
//                   </div>
//                   <span style={{ fontSize:10, fontWeight:700, background:T.redLight,
//                                  color:"#DC2626", padding:"3px 10px", borderRadius:99 }}>
//                     sorted by risk ↓
//                   </span>
//                 </div>
//                 <div style={{ padding:"0 4px 4px" }}>
//                   {cols.length ? <Table cols={cols} rows={result.top_30} /> : null}
//                 </div>
//               </div>
//             </div>
//           ) : !file ? (
//             /* empty state */
//             <div style={{ background:T.surface, borderRadius:T.radius,
//                           border:`1.5px dashed ${T.border}`, boxShadow:T.shadow,
//                           padding:"56px 24px", textAlign:"center" }}>
//               <div style={{ fontSize:44, marginBottom:14 }}>📦</div>
//               <div style={{ fontSize:15, fontWeight:800, color:T.text, marginBottom:8 }}>
//                 No batch results yet
//               </div>
//               <div style={{ fontSize:12, color:T.muted, lineHeight:1.7 }}>
//                 Upload a CSV file on the left<br />
//                 and click <b style={{ color:T.green }}>Run Prediction</b> to see results here.
//               </div>
//               <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:22, flexWrap:"wrap" }}>
//                 {["CSV Upload","Batch Score","Download Results","Top 30 Risk"].map(t => (
//                   <span key={t} style={{ background:T.greenLight, color:T.green, fontSize:11,
//                                          fontWeight:700, padding:"4px 12px", borderRadius:99 }}>{t}</span>
//                 ))}
//               </div>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { api, Icon, Table } from "./Home";

const T = {
  green: "#1B7A4E", greenMid: "#25A468", greenLight: "#E8F8F0", greenPale: "#F2FCF7",
  greenBright: "#34C77B", teal: "#4DC9C2", tealLight: "#E0F7F6",
  surface: "#FFFFFF", border: "#D6EFE9", bg: "#F4FAF8",
  text: "#0F1F17", textMid: "#2D4A3A", muted: "#7A9E8C",
  red: "#F87171", redLight: "#FEF2F2", orange: "#FB923C", orangeLight: "#FFF0E6",
  blue: "#60A5FA", blueLight: "#EFF6FF",
  radius: "14px", radiusSm: "10px",
  shadow: "0 2px 14px rgba(27,122,78,0.08)", shadowMd: "0 6px 30px rgba(27,122,78,0.16)",
};

function FileIcon({ name }) {
  const ext = (name || "").split(".").pop().toLowerCase();
  const cfg = { csv: { bg: "#DCFCE7", color: "#16A34A", label: "CSV" }, xlsx: { bg: "#DCFCE7", color: "#16A34A", label: "XLS" } }[ext]
    || { bg: T.greenLight, color: T.green, label: ext.toUpperCase().slice(0, 3) || "FILE" };
  return (
    <div style={{ width: 34, height: 34, borderRadius: 8, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: 9, fontWeight: 800, color: cfg.color }}>{cfg.label}</span>
    </div>
  );
}

function FileRow({ name, size, status, pct }) {
  const isDone = status === "Completed";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: T.surface, borderRadius: T.radiusSm, border: `1.5px solid ${T.border}`, marginBottom: 7 }}>
      <FileIcon name={name} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
        {!isDone && (
          <div style={{ marginTop: 4 }}>
            <div style={{ background: "#E5F5EE", borderRadius: 99, height: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 99, background: T.greenBright, width: `${pct}%`, transition: "width .4s ease" }} />
            </div>
          </div>
        )}
        {size && <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>{size}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>
        {isDone
          ? <span style={{ fontSize: 11, fontWeight: 700, background: T.greenLight, color: T.green, padding: "3px 9px", borderRadius: 99 }}>✓ Done</span>
          : <span style={{ fontSize: 11, fontWeight: 700, background: T.tealLight, color: T.teal, padding: "3px 9px", borderRadius: 99 }}>{pct}%</span>}
      </div>
    </div>
  );
}

function KpiCard({ label, value, color, bg, icon }) {
  return (
    <div style={{ background: bg, borderRadius: T.radius, padding: "14px 16px", border: `1.5px solid ${T.border}`, boxShadow: T.shadow, position: "relative", overflow: "hidden" }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: "1.5rem", fontWeight: 900, color, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1 }}>{value}</div>
      {icon && <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 20, opacity: .18 }}>{icon}</div>}
    </div>
  );
}

export default function BatchPage() {
  const [file, setFile]       = useState(null);
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const fileRef = useRef();

  const handleFile = (f) => {
    if (!f?.name.endsWith(".csv")) return;
    setFile(f); setResult(null); setUploadPct(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 100) { p = 100; clearInterval(iv); }
      setUploadPct(Math.round(p));
    }, 80);
  };

  const runBatch = async () => {
    if (!file) return;
    setLoading(true);
    const fd = new FormData(); fd.append("file", file);
    try {
      const res = await fetch(api("/predict/batch"), { method: "POST", body: fd });
      setResult(await res.json());
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const downloadCSV = async () => {
    if (!file) return;
    const fd = new FormData(); fd.append("file", file);
    const res = await fetch(api("/predict/batch/download"), { method: "POST", body: fd });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "predictions.csv"; a.click();
  };

  const cols = result?.top_30?.length ? Object.keys(result.top_30[0]).slice(0, 7) : [];

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif" }}>
      <style>{`
        .batch-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; align-items: start; }
        .batch-kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
        @media (max-width: 900px) { .batch-grid { grid-template-columns: 1fr; } }
        @media (max-width: 480px) { .batch-kpi-grid { grid-template-columns: 1fr; gap: 8px; } }
      `}</style>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: "1.25rem", fontWeight: 900, color: T.text }}>Upload <span style={{ color: T.greenMid }}>Files</span></div>
        <div style={{ fontSize: 12, color: T.muted, marginTop: 3 }}>Upload your CSV to batch score thousands of customers at once</div>
      </div>

      <div className="batch-grid">
        {/* ── LEFT ── */}
        <div>
          <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "22px 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 16, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 26, height: 26, borderRadius: 7, background: T.greenLight, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>📂</span>
              Upload CSV
            </div>

            <div onClick={() => fileRef.current.click()}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
              style={{ border: `2px dashed ${dragging ? T.green : T.border}`, borderRadius: T.radius, padding: "36px 20px", textAlign: "center", cursor: "pointer", background: dragging ? T.greenLight : T.greenPale, transition: "all .2s", marginBottom: 18 }}>
              <div style={{ marginBottom: 12 }}>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto", display: "block", opacity: dragging ? 1 : 0.45 }}>
                  <circle cx="24" cy="24" r="22" fill={T.greenLight} />
                  <path d="M24 30V18M24 18L19 23M24 18L29 23" stroke={T.green} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 34h16" stroke={T.greenMid} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              {file ? (
                <>
                  <div style={{ fontSize: 13, fontWeight: 800, color: T.green, marginBottom: 3 }}>✅ {file.name}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{(file.size / 1024).toFixed(1)} KB · Click to change</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.textMid, marginBottom: 5 }}>Drag and drop files here</div>
                  <div style={{ fontSize: 11, color: T.muted, marginBottom: 16 }}>— OR —</div>
                  <span style={{ background: T.green, color: "white", fontSize: 12, fontWeight: 700, padding: "8px 22px", borderRadius: T.radiusSm, cursor: "pointer" }}>Browse Files</span>
                </>
              )}
            </div>
            <input type="file" ref={fileRef} accept=".csv" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />

            <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              <button onClick={runBatch} disabled={!file || loading}
                style={{ flex: 1, minWidth: 120, padding: "10px", borderRadius: T.radiusSm, border: "none", background: (!file || loading) ? "#A7D7BC" : T.green, color: "white", fontSize: 13, fontWeight: 700, cursor: (!file || loading) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: "'Outfit',sans-serif" }}>
                {loading ? <><div style={{ width: 14, height: 14, borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.35)", borderTopColor: "white", animation: "spin .7s linear infinite" }} />Processing…</> : <><span style={{ width: 14, height: 14, display: "flex" }}><Icon.Play /></span>Run Prediction</>}
              </button>
              {result && (
                <button onClick={downloadCSV} style={{ padding: "10px 16px", borderRadius: T.radiusSm, border: `1.5px solid ${T.border}`, background: T.surface, color: T.green, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "'Outfit',sans-serif" }}>
                  <span style={{ width: 14, height: 14, display: "flex" }}><Icon.Download /></span>CSV
                </button>
              )}
            </div>
          </div>

          <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "18px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 10, display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 26, height: 26, borderRadius: 7, background: "#FEF3C7", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>ℹ️</span>
              Requirements
            </div>
            <p style={{ fontSize: 11, color: T.muted, lineHeight: 1.7, marginBottom: 12 }}>
              CSV should contain the same feature columns used during model training. Missing columns are auto-filled with <code style={{ background: T.greenPale, padding: "1px 5px", borderRadius: 4, color: T.green }}>0</code>.
            </p>
            <div style={{ background: "#0F1F17", borderRadius: T.radiusSm, padding: "10px 14px", fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "#A8E6C8", lineHeight: 1.9, overflowX: "auto" }}>
              <span style={{ color: "#34C77B" }}>POST</span> /predict/batch{"\n"}
              <span style={{ color: "#7A9E8C" }}>Content-Type:</span> multipart/form-data{"\n"}
              <span style={{ color: "#7A9E8C" }}>field:</span> file (CSV)
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div>
          {file && (
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, padding: "18px 20px", marginBottom: 16, animation: "fadeIn .3s ease" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.text, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 7, background: T.greenLight, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>📋</span>
                  Uploaded Files
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, background: T.greenLight, color: T.green, padding: "3px 9px", borderRadius: 99 }}>1 file</span>
              </div>
              <FileRow name={file.name} size={`${(file.size / 1024).toFixed(1)} KB`} status={uploadPct >= 100 ? "Completed" : "Uploading"} pct={uploadPct} />
            </div>
          )}

          {result ? (
            <div style={{ animation: "fadeIn .3s ease" }}>
              <div className="batch-kpi-grid">
                <KpiCard label="HIGH Risk"   value={result.summary.high_risk.toLocaleString()}   color="#DC2626" bg={T.redLight}    icon="🔴" />
                <KpiCard label="MEDIUM Risk" value={result.summary.medium_risk.toLocaleString()} color="#D97706" bg="#FEF9ED"       icon="🟡" />
                <KpiCard label="LOW Risk"    value={result.summary.low_risk.toLocaleString()}    color={T.green} bg={T.greenLight}  icon="🟢" />
                <KpiCard label="Total Rows"  value={result.total_rows.toLocaleString()}          color={T.blue}  bg={T.blueLight}   icon="📊" />
              </div>
              {result.summary.revenue_at_risk > 0 && (
                <div style={{ background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: T.radius, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#B91C1C", textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 3 }}>Annual Revenue at Risk</div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: "#DC2626" }}>₹{Number(result.summary.revenue_at_risk).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div style={{ fontSize: 24, opacity: .6 }}>⚠️</div>
                </div>
              )}
              <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: T.text, display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 7, background: T.greenLight, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🎯</span>
                    Top 30 Highest Risk
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, background: T.redLight, color: "#DC2626", padding: "3px 9px", borderRadius: 99 }}>sorted by risk ↓</span>
                </div>
                <div style={{ padding: "0 4px 4px" }}>
                  {cols.length ? <Table cols={cols} rows={result.top_30} /> : null}
                </div>
              </div>
            </div>
          ) : !file ? (
            <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px dashed ${T.border}`, boxShadow: T.shadow, padding: "48px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 7 }}>No batch results yet</div>
              <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.7 }}>Upload a CSV file on the left<br />and click <b style={{ color: T.green }}>Run Prediction</b></div>
              <div style={{ display: "flex", gap: 7, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
                {["CSV Upload", "Batch Score", "Download Results", "Top 30 Risk"].map(t => (
                  <span key={t} style={{ background: T.greenLight, color: T.green, fontSize: 11, fontWeight: 700, padding: "3px 11px", borderRadius: 99 }}>{t}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}