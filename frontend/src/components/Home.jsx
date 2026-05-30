// // import { useState, useEffect } from "react";

// // // ─── CONFIG ───────────────────────────────────────────────────────────────────
// // export const API = import.meta.env?.VITE_API_URL || "http://localhost:8000";
// // export const api = (path) => `${API}${path}`;

// // // ─── HOOK ─────────────────────────────────────────────────────────────────────
// // export function useFetch(url, deps = []) {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   useEffect(() => {
// //     if (!url) return;
// //     setLoading(true); setError(null);
// //     fetch(api(url))
// //       .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
// //       .then((d) => { setData(d); setLoading(false); })
// //       .catch((e) => { setError(String(e)); setLoading(false); });
// //   }, deps);
// //   return { data, loading, error };
// // }

// // // ─── ICONS ────────────────────────────────────────────────────────────────────
// // export const Icon = {
// //   Dashboard: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
// //   Predict:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
// //   Chart:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
// //   Model:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
// //   Batch:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
// //   ROI:       () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
// //   SQL:       () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
// //   Logout:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
// //   Upload:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
// //   Download:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
// //   Play:      () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
// //   Alert:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
// //   Check:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
// //   Trend:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
// //   Users:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
// //   Filter:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
// //   Refresh:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.43"/></svg>,
// // };

// // // ─── SHARED UI COMPONENTS ─────────────────────────────────────────────────────
// // export const Spinner = () => (
// //   <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
// //     <div className="spinner" />
// //   </div>
// // );

// // export const Skel = ({ h = 20, w = "100%", mb = 8 }) => (
// //   <div className="skeleton" style={{ height: h, width: w, marginBottom: mb }} />
// // );

// // export const KpiSkel = () => (
// //   <div className="kpi-grid">
// //     {[0, 1, 2, 3].map((i) => (
// //       <div key={i} className="card" style={{ padding: 22 }}>
// //         <Skel h={12} w="60%" mb={12} /><Skel h={36} w="80%" mb={8} /><Skel h={10} w="50%" mb={0} />
// //       </div>
// //     ))}
// //   </div>
// // );

// // export function RiskBadge({ risk }) {
// //   return <span className={`risk risk-${risk}`}>{risk}</span>;
// // }

// // export function Table({ cols, rows, maxRows = 30 }) {
// //   return (
// //     <div className="table-wrap">
// //       <table>
// //         <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
// //         <tbody>
// //           {rows.slice(0, maxRows).map((r, i) => (
// //             <tr key={i}>
// //               {cols.map((c) => (
// //                 <td key={c}>
// //                   {c === "risk_category" ? <RiskBadge risk={r[c]} /> :
// //                    typeof r[c] === "number" ? r[c].toLocaleString() : String(r[c] ?? "—")}
// //                 </td>
// //               ))}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // export function ReportImage({ name, caption }) {
// //   const [err, setErr] = useState(false);
// //   const url = `${API}/reports/${name}.png`;
// //   if (err) return (
// //     <div style={{ background:"#F7F9FF", border:"1.5px dashed #C7D2FE", borderRadius:12, padding:"36px 24px", textAlign:"center", color:"#94A3B8" }}>
// //       <div style={{ fontSize:28, marginBottom:10 }}>📊</div>
// //       <div style={{ fontSize:13, fontWeight:600, color:"#64748B", marginBottom:4 }}>Run notebook to generate</div>
// //       <code style={{ fontSize:11, color:"#6366F1", background:"#EEF2FF", padding:"2px 8px", borderRadius:4 }}>reports/{name}.png</code>
// //     </div>
// //   );
// //   return (
// //     <div style={{ marginBottom:8 }}>
// //       <img key={name} src={url} alt={caption||name} onError={() => setErr(true)}
// //         style={{ width:"100%", borderRadius:10, border:"1.5px solid #E0E7FF", display:"block" }} />
// //       {caption && <div style={{ fontSize:11, color:"#94A3B8", textAlign:"center", marginTop:6 }}>{caption}</div>}
// //     </div>
// //   );
// // }

// // // ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
// // const GlobalStyles = () => (
// //   <style>{`
// //     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
// //     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
// //     :root {
// //       --bg:#F2FAFA; --surface:#FFFFFF; --surface2:#E6F8F7; --border:#D9F0EE;
// //       --accent:#4DC9C2; --accent2:#5B9BD5; --accent3:#F7C948;
// //       --green:#4DC9C2; --yellow:#F7C948; --red:#F87171;
// //       --text:#2D4A52; --muted:#7FA8AE;
// //       --radius:14px; --radius-sm:9px;
// //       --shadow:0 2px 16px rgba(67,97,238,0.10);
// //       --shadow-lg:0 8px 40px rgba(67,97,238,0.18);
// //     }
// //     body { font-family:'Outfit',sans-serif; background:var(--bg); color:var(--text); }
// //     .app-shell { display:flex; min-height:100vh; }
// //     .sidebar { width:230px; min-height:100vh; background:var(--surface); border-right:1.5px solid var(--border); display:flex; flex-direction:column; position:fixed; top:0; left:0; z-index:100; box-shadow:4px 0 24px rgba(77,201,194,0.10); }
// //     .sidebar-logo { padding:22px 20px 18px; display:flex; align-items:center; gap:10px; border-bottom:1.5px solid var(--border); }
// //     .logo-icon { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,var(--accent),var(--accent2)); display:flex; align-items:center; justify-content:center; color:white; font-weight:800; font-size:18px; }
// //     .logo-text { font-weight:800; font-size:1.1rem; color:var(--text); letter-spacing:-0.3px; }
// //     .logo-sub { font-size:10px; color:var(--muted); font-weight:500; margin-top:1px; }
// //     .sidebar-nav { flex:1; padding:16px 12px; display:flex; flex-direction:column; gap:3px; }
// //     .nav-label { font-size:10px; font-weight:700; color:var(--muted); letter-spacing:1.5px; text-transform:uppercase; padding:10px 10px 4px; }
// //     .nav-item { display:flex; align-items:center; gap:11px; padding:10px 12px; border-radius:var(--radius-sm); cursor:pointer; transition:all .18s ease; color:var(--muted); font-size:0.875rem; font-weight:500; border:1.5px solid transparent; }
// //     .nav-item:hover { background:#E6F8F7; color:var(--accent); }
// //     .nav-item.active { background:linear-gradient(135deg,#E6F8F7,#EBF4FC); color:var(--accent); font-weight:700; border-color:#A8E6E3; box-shadow:0 2px 8px rgba(77,201,194,0.15); }
// //     .nav-item svg { width:17px; height:17px; flex-shrink:0; }
// //     .nav-item .badge { margin-left:auto; font-size:10px; font-weight:700; background:#FEE2E2; color:var(--red); padding:2px 7px; border-radius:99px; }
// //     .sidebar-footer { padding:14px 12px 20px; border-top:1.5px solid var(--border); }
// //     .user-card { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:var(--radius-sm); background:var(--surface2); border:1.5px solid var(--border); }
// //     .avatar { width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg,var(--accent),var(--accent2)); display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:13px; flex-shrink:0; }
// //     .user-name { font-size:13px; font-weight:600; color:var(--text); }
// //     .user-role { font-size:11px; color:var(--muted); }
// //     .main { margin-left:230px; flex:1; min-height:100vh; display:flex; flex-direction:column; }
// //     .topbar { height:66px; background:var(--surface); border-bottom:1.5px solid var(--border); display:flex; align-items:center; justify-content:space-between; padding:0 28px; position:sticky; top:0; z-index:50; }
// //     .topbar-left { display:flex; align-items:center; gap:12px; }
// //     .page-title { font-size:1.2rem; font-weight:700; color:var(--text); }
// //     .breadcrumb { font-size:13px; color:var(--muted); }
// //     .topbar-right { display:flex; align-items:center; gap:14px; }
// //     .status-chip { font-size:12px; font-weight:600; padding:5px 13px; border-radius:99px; display:flex; align-items:center; gap:5px; }
// //     .chip-green { background:#ECFDF5; color:#059669; }
// //     .chip-red   { background:#FEF2F2; color:#DC2626; }
// //     .chip-yellow{ background:#FFFBEB; color:#D97706; }
// //     .content { padding:24px 28px; flex:1; }
// //     .kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px; }
// //     .kpi-card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--radius); padding:20px 22px; box-shadow:var(--shadow); position:relative; overflow:hidden; transition:transform .2s,box-shadow .2s; }
// //     .kpi-card:hover { transform:translateY(-3px); box-shadow:var(--shadow-lg); }
// //     .kpi-card::after { content:''; position:absolute; top:0; left:0; width:4px; height:100%; border-radius:99px 0 0 99px; }
// //     .kpi-card.blue::after  { background:var(--accent); }
// //     .kpi-card.red::after   { background:var(--red); }
// //     .kpi-card.yellow::after{ background:var(--yellow); }
// //     .kpi-card.green::after { background:var(--green); }
// //     .kpi-label { font-size:12px; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:8px; }
// //     .kpi-value { font-size:1.9rem; font-weight:800; line-height:1; font-family:'JetBrains Mono',monospace; }
// //     .kpi-card.blue  .kpi-value { color:var(--accent); }
// //     .kpi-card.red   .kpi-value { color:var(--red); }
// //     .kpi-card.yellow .kpi-value{ color:#D97706; }
// //     .kpi-card.green .kpi-value { color:#059669; }
// //     .kpi-sub { font-size:12px; color:var(--muted); margin-top:6px; }
// //     .kpi-icon { position:absolute; right:16px; top:50%; transform:translateY(-50%); width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; opacity:0.13; }
// //     .kpi-icon svg { width:26px; height:26px; }
// //     .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:22px; }
// //     .grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:18px; margin-bottom:22px; }
// //     .card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--radius); padding:22px; box-shadow:var(--shadow); }
// //     .card-title { font-size:15px; font-weight:700; color:var(--text); margin-bottom:16px; display:flex; align-items:center; gap:8px; }
// //     .card-title svg { width:17px; height:17px; color:var(--accent); }
// //     .hero-banner { background:linear-gradient(120deg,var(--accent) 0%,var(--accent2) 60%,var(--accent3) 100%); border-radius:var(--radius); padding:26px 30px; color:white; position:relative; overflow:hidden; margin-bottom:24px; }
// //     .hero-banner::before { content:''; position:absolute; right:-30px; top:-40px; width:200px; height:200px; border-radius:50%; background:rgba(255,255,255,0.07); }
// //     .hero-banner::after  { content:''; position:absolute; right:80px; bottom:-60px; width:160px; height:160px; border-radius:50%; background:rgba(255,255,255,0.05); }
// //     .hero-greeting { font-size:11px; font-weight:600; opacity:.75; letter-spacing:1px; text-transform:uppercase; }
// //     .hero-title { font-size:1.7rem; font-weight:800; line-height:1.2; margin:6px 0; }
// //     .hero-sub { font-size:13px; opacity:.8; max-width:380px; }
// //     .hero-actions { display:flex; gap:10px; margin-top:18px; }
// //     .btn-white { background:rgba(255,255,255,0.18); border:1.5px solid rgba(255,255,255,0.35); color:white; font-size:13px; font-weight:700; font-family:'Outfit',sans-serif; padding:9px 20px; border-radius:var(--radius-sm); cursor:pointer; transition:all .18s; backdrop-filter:blur(8px); }
// //     .btn-white:hover { background:rgba(255,255,255,0.30); }
// //     .btn-solid-white { background:white; border:none; color:var(--accent); font-size:13px; font-weight:700; font-family:'Outfit',sans-serif; padding:9px 22px; border-radius:var(--radius-sm); cursor:pointer; transition:all .18s; box-shadow:0 2px 12px rgba(0,0,0,0.12); }
// //     .btn-solid-white:hover { transform:translateY(-1px); box-shadow:0 4px 20px rgba(0,0,0,0.18); }
// //     .table-wrap { overflow-x:auto; border-radius:var(--radius-sm); border:1.5px solid var(--border); }
// //     table { width:100%; border-collapse:collapse; font-size:13px; }
// //     th { background:var(--surface2); font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:0.8px; padding:11px 14px; text-align:left; border-bottom:1.5px solid var(--border); }
// //     td { padding:11px 14px; color:var(--text); border-bottom:1px solid var(--border); vertical-align:middle; }
// //     tr:last-child td { border-bottom:none; }
// //     tr:hover td { background:#F7F9FF; }
// //     .risk { font-size:11px; font-weight:700; padding:3px 10px; border-radius:99px; }
// //     .risk-HIGH   { background:#FEF2F2; color:#DC2626; }
// //     .risk-MEDIUM { background:#FFFBEB; color:#D97706; }
// //     .risk-LOW    { background:#ECFDF5; color:#059669; }
// //     .btn { font-family:'Outfit',sans-serif; font-weight:700; font-size:13px; padding:10px 22px; border-radius:var(--radius-sm); cursor:pointer; transition:all .18s; border:none; display:inline-flex; align-items:center; gap:7px; }
// //     .btn-primary { background:linear-gradient(135deg,var(--accent),var(--accent2)); color:white; box-shadow:0 4px 16px rgba(77,201,194,0.35); }
// //     .btn-primary:hover { filter:brightness(1.08); transform:translateY(-1px); }
// //     .btn-primary:disabled { opacity:.5; cursor:not-allowed; transform:none; }
// //     .btn-outline { background:white; color:var(--accent); border:1.5px solid var(--border); box-shadow:var(--shadow); }
// //     .btn-outline:hover { border-color:var(--accent); background:#E6F8F7; }
// //     .btn-ghost { background:transparent; color:var(--muted); }
// //     .btn-ghost:hover { background:var(--surface2); color:var(--text); }
// //     .btn svg { width:15px; height:15px; }
// //     .form-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-bottom:14px; }
// //     .form-group { display:flex; flex-direction:column; gap:5px; }
// //     .form-label { font-size:12px; font-weight:600; color:var(--muted); }
// //     .form-control { padding:9px 12px; border:1.5px solid var(--border); border-radius:var(--radius-sm); font-size:13px; font-family:'Outfit',sans-serif; background:var(--surface); color:var(--text); outline:none; transition:border-color .18s; }
// //     .form-control:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(77,201,194,0.15); }
// //     input[type="range"] { width:100%; accent-color:var(--accent); cursor:pointer; }
// //     .progress-wrap { background:#E0E7FF; border-radius:99px; height:10px; overflow:hidden; margin:6px 0; }
// //     .progress-bar { height:100%; border-radius:99px; transition:width .6s ease; }
// //     .insight-item { display:flex; align-items:flex-start; gap:12px; padding:13px 16px; border-radius:var(--radius-sm); background:var(--surface2); border:1px solid var(--border); margin-bottom:8px; }
// //     .insight-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; margin-top:4px; }
// //     .insight-title { font-size:13px; font-weight:700; color:var(--text); margin-bottom:2px; }
// //     .insight-desc  { font-size:12px; color:var(--muted); }
// //     .perf-row { padding:12px 0; border-bottom:1px solid var(--border); }
// //     .perf-row:last-child { border-bottom:none; }
// //     .perf-name { font-size:13px; font-weight:700; margin-bottom:6px; }
// //     .perf-metrics { display:flex; gap:18px; margin-bottom:6px; }
// //     .perf-metric { font-size:11px; color:var(--muted); }
// //     .perf-metric b { color:var(--text); }
// //     .upload-zone { border:2px dashed var(--border); border-radius:var(--radius); padding:48px 24px; text-align:center; cursor:pointer; transition:all .2s; background:var(--surface2); }
// //     .upload-zone:hover,.upload-zone.dragging { border-color:var(--accent); background:#E6F8F7; }
// //     .upload-icon { font-size:2.5rem; margin-bottom:12px; }
// //     .upload-title { font-size:15px; font-weight:700; color:var(--text); margin-bottom:6px; }
// //     .upload-sub   { font-size:13px; color:var(--muted); }
// //     .roi-row { display:flex; justify-content:space-between; align-items:center; padding:11px 16px; border-radius:var(--radius-sm); background:var(--surface2); border:1px solid var(--border); margin-bottom:8px; }
// //     .roi-label { font-size:13px; color:var(--muted); }
// //     .roi-value { font-size:15px; font-weight:800; font-family:'JetBrains Mono',monospace; }
// //     .waterfall { display:flex; gap:10px; align-items:flex-end; height:180px; padding:0 4px; }
// //     .wf-bar-wrap { flex:1; display:flex; flex-direction:column; align-items:center; gap:6px; }
// //     .wf-bar { width:100%; border-radius:8px 8px 0 0; transition:height .6s ease; min-height:10px; }
// //     .wf-label { font-size:10px; font-weight:600; color:var(--muted); text-align:center; line-height:1.3; }
// //     .wf-value { font-size:10px; font-weight:700; font-family:'JetBrains Mono'; text-align:center; }
// //     .sql-tabs { display:flex; gap:6px; margin-bottom:18px; flex-wrap:wrap; }
// //     .sql-tab { font-size:12px; font-weight:600; padding:7px 16px; border-radius:var(--radius-sm); cursor:pointer; border:1.5px solid var(--border); background:var(--surface); color:var(--muted); transition:all .18s; }
// //     .sql-tab.active { background:linear-gradient(135deg,var(--accent),var(--accent2)); color:white; border-color:transparent; box-shadow:0 4px 14px rgba(77,201,194,0.35); }
// //     .sql-tab:hover:not(.active) { border-color:var(--accent); color:var(--accent); }
// //     .code-block { background:#0D1B2A; color:#7DD3FC; font-family:'JetBrains Mono',monospace; font-size:12px; padding:16px 18px; border-radius:var(--radius-sm); overflow-x:auto; margin:12px 0; line-height:1.7; border:1px solid #1E3A5F; }
// //     .skeleton { background:linear-gradient(90deg,#EEF2FF 25%,#F5F8FF 50%,#EEF2FF 75%); background-size:400% 100%; animation:shimmer 1.4s infinite; border-radius:6px; }
// //     @keyframes shimmer { 0%{background-position:100% 0} 100%{background-position:-100% 0} }
// //     .spinner { width:20px; height:20px; border-radius:50%; border:2.5px solid #E0E7FF; border-top-color:var(--accent); animation:spin .7s linear infinite; }
// //     @keyframes spin { to{transform:rotate(360deg)} }
// //     .predict-result { border-radius:var(--radius); padding:28px; text-align:center; border:2px solid; margin-bottom:18px; }
// //     .predict-pct { font-size:4rem; font-weight:800; line-height:1; font-family:'JetBrains Mono'; }
// //     .predict-tag { font-size:14px; font-weight:700; letter-spacing:3px; text-transform:uppercase; margin-top:8px; }
// //     .predict-src { font-size:11px; color:var(--muted); margin-top:8px; }
// //     .fade-in { animation:fadeIn .4s ease; }
// //     @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
// //     .corr-bar { display:flex; align-items:center; gap:10px; margin-bottom:7px; }
// //     .corr-label { font-size:11px; color:var(--muted); width:150px; flex-shrink:0; text-align:right; }
// //     .corr-track { flex:1; height:8px; background:#EEF2FF; border-radius:99px; overflow:hidden; position:relative; }
// //     .corr-fill  { height:100%; border-radius:99px; position:absolute; }
// //     .corr-val   { font-size:11px; font-weight:600; width:50px; font-family:'JetBrains Mono'; }
// //     .status-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
// //     .quick-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:22px; }
// //     .quick-card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--radius); padding:18px 20px; cursor:pointer; transition:all .2s; display:flex; align-items:center; gap:14px; }
// //     .quick-card:hover { border-color:var(--accent); transform:translateY(-2px); box-shadow:var(--shadow-lg); }
// //     .quick-icon { width:44px; height:44px; border-radius:12px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
// //     .quick-icon svg { width:20px; height:20px; }
// //     .quick-title { font-size:14px; font-weight:700; color:var(--text); margin-bottom:2px; }
// //     .quick-sub   { font-size:12px; color:var(--muted); }
// //     ::-webkit-scrollbar { width:6px; height:6px; }
// //     ::-webkit-scrollbar-track { background:transparent; }
// //     ::-webkit-scrollbar-thumb { background:#A8E6E3; border-radius:99px; }
// //     ::-webkit-scrollbar-thumb:hover { background:var(--accent); }
// //     .empty-state { text-align:center; padding:48px 24px; color:var(--muted); }
// //     .empty-icon  { font-size:2.5rem; margin-bottom:12px; }
// //     .empty-title { font-size:15px; font-weight:700; color:var(--text); margin-bottom:6px; }
// //     .tag { display:inline-block; font-size:11px; font-weight:600; padding:3px 10px; border-radius:99px; }
// //   `}</style>
// // );

// // // ─── NAV CONFIG ───────────────────────────────────────────────────────────────
// // const NAV = [
// //   { id: "dashboard", label: "Dashboard",        icon: <Icon.Dashboard />, badge: null },
// //   { id: "predict",   label: "Churn Prediction", icon: <Icon.Predict />,   badge: null },
// //   { id: "eda",       label: "Visualization",    icon: <Icon.Chart />,     badge: null },
// //   { id: "model",     label: "Model Reports",    icon: <Icon.Model />,     badge: null },
// //   { id: "batch",     label: "Batch Prediction", icon: <Icon.Batch />,     badge: null },
// //   { id: "roi",       label: "ROI Calculator",   icon: <Icon.ROI />,       badge: null },
// //   { id: "sql",       label: "SQL Analytics",    icon: <Icon.SQL />,       badge: "Live" },
// // ];

// // const PAGE_TITLES = {
// //   dashboard: "Dashboard",
// //   predict:   "Churn Prediction",
// //   eda:       "Visualization · EDA & Charts",
// //   model:     "Model Reports",
// //   batch:     "Batch Prediction",
// //   roi:       "ROI Calculator",
// //   sql:       "SQL Analytics",
// // };

// // // ─── HOME (APP SHELL) ─────────────────────────────────────────────────────────
// // import DashboardPage from "./DashboardPage";
// // import PredictPage   from "./PredictPage";
// // import VisPage       from "./VisPage";
// // import ModelPage     from "./ModelPage";
// // import BatchPage     from "./BatchPage";
// // import ROIPage       from "./ROIPage";
// // import SQLPage       from "./SQLPage";

// // export default function Home() {
// //   const [page, setPage] = useState("dashboard");
// //   const { data: status } = useFetch("/status");
// //   const allModelsOk = status?.models ? Object.values(status.models).every(Boolean) : null;

// //   const renderPage = () => {
// //     switch (page) {
// //       case "dashboard": return <DashboardPage navigate={setPage} />;
// //       case "predict":   return <PredictPage />;
// //       case "eda":       return <VisPage />;
// //       case "model":     return <ModelPage />;
// //       case "batch":     return <BatchPage />;
// //       case "roi":       return <ROIPage />;
// //       case "sql":       return <SQLPage />;
// //       default:          return <DashboardPage navigate={setPage} />;
// //     }
// //   };

// //   return (
// //     <>
// //       <GlobalStyles />
// //       <div className="app-shell">
// //         <aside className="sidebar">
// //           <div className="sidebar-logo">
// //             <div className="logo-icon">C</div>
// //             <div>
// //               <div className="logo-text">Churn AI</div>
// //               <div className="logo-sub">Enterprise ML Platform</div>
// //             </div>
// //           </div>
// //           <nav className="sidebar-nav">
// //             <div className="nav-label">Main Menu</div>
// //             {NAV.map((n) => (
// //               <div key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
// //                 {n.icon}{n.label}
// //                 {n.badge && <span className="badge">{n.badge}</span>}
// //               </div>
// //             ))}
// //           </nav>
// //           <div className="sidebar-footer">
// //             <div className="user-card">
// //               <div className="avatar">A</div>
// //               <div><div className="user-name">Analyst</div><div className="user-role">Data Scientist</div></div>
// //             </div>
// //             <div className="nav-item" style={{ marginTop:8 }} onClick={() => alert("Logout")}>
// //               <Icon.Logout /> Logout
// //             </div>
// //           </div>
// //         </aside>

// //         <main className="main">
// //           <header className="topbar">
// //             <div className="topbar-left">
// //               <div>
// //                 <div className="page-title">{PAGE_TITLES[page]}</div>
// //                 <div className="breadcrumb">Churn AI / {PAGE_TITLES[page]}</div>
// //               </div>
// //             </div>
// //             <div className="topbar-right">
// //               {allModelsOk === true  && <span className="status-chip chip-green"><div className="status-dot" style={{background:"#059669"}}/> Models Online</span>}
// //               {allModelsOk === false && <span className="status-chip chip-red"><div className="status-dot" style={{background:"#DC2626"}}/> Pipeline Needed</span>}
// //               {allModelsOk === null  && <span className="status-chip" style={{background:"#F1F5F9",color:"#64748B"}}>Checking status…</span>}
// //               <button className="btn btn-ghost btn-outline" style={{padding:"7px 14px",fontSize:12}} onClick={() => window.location.reload()}>
// //                 <Icon.Refresh /> Refresh
// //               </button>
// //             </div>
// //           </header>
// //           <div className="content">{renderPage()}</div>
// //         </main>
// //       </div>
// //     </>
// //   );
// // }

// import { useState, useEffect } from "react";

// // ─── CONFIG ───────────────────────────────────────────────────────────────────
// export const API = import.meta.env?.VITE_API_URL || "http://localhost:8000";
// export const api = (path) => `${API}${path}`;

// // ─── HOOK ─────────────────────────────────────────────────────────────────────
// export function useFetch(url, deps = []) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     if (!url) return;
//     setLoading(true); setError(null);
//     fetch(api(url))
//       .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
//       .then((d) => { setData(d); setLoading(false); })
//       .catch((e) => { setError(String(e)); setLoading(false); });
//   }, deps);
//   return { data, loading, error };
// }

// // ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────────
// export function useBreakpoint() {
//   const [bp, setBp] = useState(() => {
//     const w = typeof window !== "undefined" ? window.innerWidth : 1200;
//     return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, width: w };
//   });
//   useEffect(() => {
//     const handler = () => {
//       const w = window.innerWidth;
//       setBp({ isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, width: w });
//     };
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);
//   return bp;
// }

// // ─── ICONS ────────────────────────────────────────────────────────────────────
// export const Icon = {
//   Dashboard: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
//   Predict:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
//   Chart:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
//   Model:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
//   Batch:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
//   ROI:       () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
//   SQL:       () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
//   Logout:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
//   Upload:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
//   Download:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
//   Play:      () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
//   Alert:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
//   Check:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
//   Trend:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
//   Users:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
//   Filter:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
//   Refresh:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.43"/></svg>,
//   Menu:      () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
//   Close:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
// };

// // ─── SHARED UI COMPONENTS ─────────────────────────────────────────────────────
// export const Spinner = () => (
//   <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
//     <div className="spinner" />
//   </div>
// );

// export const Skel = ({ h = 20, w = "100%", mb = 8 }) => (
//   <div className="skeleton" style={{ height: h, width: w, marginBottom: mb }} />
// );

// export const KpiSkel = () => (
//   <div className="kpi-grid">
//     {[0, 1, 2, 3].map((i) => (
//       <div key={i} className="card" style={{ padding: 22 }}>
//         <Skel h={12} w="60%" mb={12} /><Skel h={36} w="80%" mb={8} /><Skel h={10} w="50%" mb={0} />
//       </div>
//     ))}
//   </div>
// );

// export function RiskBadge({ risk }) {
//   return <span className={`risk risk-${risk}`}>{risk}</span>;
// }

// export function Table({ cols, rows, maxRows = 30 }) {
//   return (
//     <div className="table-wrap">
//       <table>
//         <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
//         <tbody>
//           {rows.slice(0, maxRows).map((r, i) => (
//             <tr key={i}>
//               {cols.map((c) => (
//                 <td key={c}>
//                   {c === "risk_category" ? <RiskBadge risk={r[c]} /> :
//                    typeof r[c] === "number" ? r[c].toLocaleString() : String(r[c] ?? "—")}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export function ReportImage({ name, caption }) {
//   const [err, setErr] = useState(false);
//   const url = `${API}/reports/${name}.png`;
//   if (err) return (
//     <div style={{ background:"#F7F9FF", border:"1.5px dashed #C7D2FE", borderRadius:12, padding:"36px 24px", textAlign:"center", color:"#94A3B8" }}>
//       <div style={{ fontSize:28, marginBottom:10 }}>📊</div>
//       <div style={{ fontSize:13, fontWeight:600, color:"#64748B", marginBottom:4 }}>Run notebook to generate</div>
//       <code style={{ fontSize:11, color:"#6366F1", background:"#EEF2FF", padding:"2px 8px", borderRadius:4 }}>reports/{name}.png</code>
//     </div>
//   );
//   return (
//     <div style={{ marginBottom:8 }}>
//       <img key={name} src={url} alt={caption||name} onError={() => setErr(true)}
//         style={{ width:"100%", borderRadius:10, border:"1.5px solid #E0E7FF", display:"block" }} />
//       {caption && <div style={{ fontSize:11, color:"#94A3B8", textAlign:"center", marginTop:6 }}>{caption}</div>}
//     </div>
//   );
// }

// // ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
// const GlobalStyles = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     :root {
//       --bg:#F2FAFA; --surface:#FFFFFF; --surface2:#E6F8F7; --border:#D9F0EE;
//       --accent:#4DC9C2; --accent2:#5B9BD5; --accent3:#F7C948;
//       --green:#4DC9C2; --yellow:#F7C948; --red:#F87171;
//       --text:#2D4A52; --muted:#7FA8AE;
//       --radius:14px; --radius-sm:9px;
//       --shadow:0 2px 16px rgba(67,97,238,0.10);
//       --shadow-lg:0 8px 40px rgba(67,97,238,0.18);
//       --sidebar-w: 230px;
//     }
//     html { font-size: 16px; }
//     body { font-family:'Outfit',sans-serif; background:var(--bg); color:var(--text); overflow-x:hidden; }

//     /* ── APP SHELL ── */
//     .app-shell { display:flex; min-height:100vh; position:relative; }

//     /* ── SIDEBAR ── */
//     .sidebar {
//       width: var(--sidebar-w);
//       min-height: 100vh;
//       background: var(--surface);
//       border-right: 1.5px solid var(--border);
//       display: flex;
//       flex-direction: column;
//       position: fixed;
//       top: 0; left: 0;
//       z-index: 200;
//       box-shadow: 4px 0 24px rgba(77,201,194,0.10);
//       transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
//     }
//     .sidebar.mobile-hidden { transform: translateX(-100%); }
//     .sidebar.mobile-visible { transform: translateX(0); }

//     /* overlay for mobile sidebar */
//     .sidebar-overlay {
//       display: none;
//       position: fixed;
//       inset: 0;
//       background: rgba(0,0,0,0.45);
//       z-index: 199;
//     }
//     .sidebar-overlay.active { display: block; }

//     .sidebar-logo { padding:18px 16px 14px; display:flex; align-items:center; gap:10px; border-bottom:1.5px solid var(--border); }
//     .logo-icon { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,var(--accent),var(--accent2)); display:flex; align-items:center; justify-content:center; color:white; font-weight:800; font-size:18px; flex-shrink:0; }
//     .logo-text { font-weight:800; font-size:1.05rem; color:var(--text); letter-spacing:-0.3px; }
//     .logo-sub { font-size:10px; color:var(--muted); font-weight:500; margin-top:1px; }
//     .sidebar-close-btn {
//       display: none;
//       margin-left: auto;
//       width: 30px; height: 30px;
//       border-radius: 8px;
//       border: none;
//       background: var(--surface2);
//       color: var(--muted);
//       cursor: pointer;
//       align-items: center; justify-content: center;
//     }

//     .sidebar-nav { flex:1; padding:12px 10px; display:flex; flex-direction:column; gap:2px; overflow-y:auto; }
//     .nav-label { font-size:10px; font-weight:700; color:var(--muted); letter-spacing:1.5px; text-transform:uppercase; padding:8px 10px 4px; }
//     .nav-item { display:flex; align-items:center; gap:10px; padding:9px 11px; border-radius:var(--radius-sm); cursor:pointer; transition:all .18s ease; color:var(--muted); font-size:0.855rem; font-weight:500; border:1.5px solid transparent; }
//     .nav-item:hover { background:#E6F8F7; color:var(--accent); }
//     .nav-item.active { background:linear-gradient(135deg,#E6F8F7,#EBF4FC); color:var(--accent); font-weight:700; border-color:#A8E6E3; box-shadow:0 2px 8px rgba(77,201,194,0.15); }
//     .nav-item svg { width:16px; height:16px; flex-shrink:0; }
//     .nav-item .badge { margin-left:auto; font-size:10px; font-weight:700; background:#FEE2E2; color:var(--red); padding:2px 7px; border-radius:99px; }
//     .sidebar-footer { padding:12px 10px 16px; border-top:1.5px solid var(--border); }
//     .user-card { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:var(--radius-sm); background:var(--surface2); border:1.5px solid var(--border); }
//     .avatar { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,var(--accent),var(--accent2)); display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:13px; flex-shrink:0; }
//     .user-name { font-size:12px; font-weight:600; color:var(--text); }
//     .user-role { font-size:10px; color:var(--muted); }

//     /* ── MAIN CONTENT ── */
//     .main { margin-left: var(--sidebar-w); flex:1; min-height:100vh; display:flex; flex-direction:column; min-width:0; }
//     .topbar { height:60px; background:var(--surface); border-bottom:1.5px solid var(--border); display:flex; align-items:center; justify-content:space-between; padding:0 20px; position:sticky; top:0; z-index:100; gap:12px; }
//     .topbar-left { display:flex; align-items:center; gap:12px; min-width:0; }
//     .topbar-hamburger { display:none; width:36px; height:36px; border-radius:9px; border:1.5px solid var(--border); background:var(--surface); cursor:pointer; align-items:center; justify-content:center; color:var(--muted); flex-shrink:0; }
//     .page-title { font-size:1.1rem; font-weight:700; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
//     .breadcrumb { font-size:12px; color:var(--muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
//     .topbar-right { display:flex; align-items:center; gap:10px; flex-shrink:0; }
//     .status-chip { font-size:11px; font-weight:600; padding:4px 11px; border-radius:99px; display:flex; align-items:center; gap:5px; white-space:nowrap; }
//     .chip-green { background:#ECFDF5; color:#059669; }
//     .chip-red   { background:#FEF2F2; color:#DC2626; }
//     .chip-yellow{ background:#FFFBEB; color:#D97706; }
//     .content { padding:18px 20px; flex:1; min-width:0; overflow-x:hidden; }

//     /* ── GRIDS ── */
//     .kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
//     .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }
//     .grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:20px; }

//     /* ── CARD ── */
//     .card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--radius); padding:18px 20px; box-shadow:var(--shadow); }
//     .card-title { font-size:14px; font-weight:700; color:var(--text); margin-bottom:14px; display:flex; align-items:center; gap:8px; }
//     .card-title svg { width:16px; height:16px; color:var(--accent); }

//     /* ── KPI CARDS ── */
//     .kpi-card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--radius); padding:16px 18px; box-shadow:var(--shadow); position:relative; overflow:hidden; transition:transform .2s,box-shadow .2s; }
//     .kpi-card:hover { transform:translateY(-3px); box-shadow:var(--shadow-lg); }
//     .kpi-card::after { content:''; position:absolute; top:0; left:0; width:4px; height:100%; border-radius:99px 0 0 99px; }
//     .kpi-card.blue::after  { background:var(--accent); }
//     .kpi-card.red::after   { background:var(--red); }
//     .kpi-card.yellow::after{ background:var(--yellow); }
//     .kpi-card.green::after { background:var(--green); }
//     .kpi-label { font-size:11px; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:6px; }
//     .kpi-value { font-size:1.7rem; font-weight:800; line-height:1; font-family:'JetBrains Mono',monospace; }
//     .kpi-card.blue  .kpi-value { color:var(--accent); }
//     .kpi-card.red   .kpi-value { color:var(--red); }
//     .kpi-card.yellow .kpi-value{ color:#D97706; }
//     .kpi-card.green .kpi-value { color:#059669; }
//     .kpi-sub { font-size:11px; color:var(--muted); margin-top:5px; }
//     .kpi-icon { position:absolute; right:14px; top:50%; transform:translateY(-50%); width:38px; height:38px; border-radius:11px; display:flex; align-items:center; justify-content:center; opacity:0.13; }
//     .kpi-icon svg { width:22px; height:22px; }

//     /* ── BUTTONS ── */
//     .btn { font-family:'Outfit',sans-serif; font-weight:700; font-size:13px; padding:9px 18px; border-radius:var(--radius-sm); cursor:pointer; transition:all .18s; border:none; display:inline-flex; align-items:center; gap:7px; }
//     .btn-primary { background:linear-gradient(135deg,var(--accent),var(--accent2)); color:white; box-shadow:0 4px 16px rgba(77,201,194,0.35); }
//     .btn-primary:hover { filter:brightness(1.08); transform:translateY(-1px); }
//     .btn-primary:disabled { opacity:.5; cursor:not-allowed; transform:none; }
//     .btn-outline { background:white; color:var(--accent); border:1.5px solid var(--border); box-shadow:var(--shadow); }
//     .btn-outline:hover { border-color:var(--accent); background:#E6F8F7; }
//     .btn-ghost { background:transparent; color:var(--muted); }
//     .btn-ghost:hover { background:var(--surface2); color:var(--text); }
//     .btn svg { width:14px; height:14px; }

//     /* ── FORMS ── */
//     .form-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:12px; }
//     .form-group { display:flex; flex-direction:column; gap:5px; }
//     .form-label { font-size:11px; font-weight:600; color:var(--muted); }
//     .form-control { padding:9px 12px; border:1.5px solid var(--border); border-radius:var(--radius-sm); font-size:13px; font-family:'Outfit',sans-serif; background:var(--surface); color:var(--text); outline:none; transition:border-color .18s; width:100%; }
//     .form-control:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(77,201,194,0.15); }
//     input[type="range"] { width:100%; accent-color:var(--accent); cursor:pointer; }

//     /* ── TABLE ── */
//     .table-wrap { overflow-x:auto; border-radius:var(--radius-sm); border:1.5px solid var(--border); -webkit-overflow-scrolling:touch; }
//     table { width:100%; border-collapse:collapse; font-size:12px; min-width:500px; }
//     th { background:var(--surface2); font-size:10px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:0.8px; padding:10px 12px; text-align:left; border-bottom:1.5px solid var(--border); white-space:nowrap; }
//     td { padding:10px 12px; color:var(--text); border-bottom:1px solid var(--border); vertical-align:middle; white-space:nowrap; }
//     tr:last-child td { border-bottom:none; }
//     tr:hover td { background:#F7F9FF; }
//     .risk { font-size:10px; font-weight:700; padding:2px 9px; border-radius:99px; }
//     .risk-HIGH   { background:#FEF2F2; color:#DC2626; }
//     .risk-MEDIUM { background:#FFFBEB; color:#D97706; }
//     .risk-LOW    { background:#ECFDF5; color:#059669; }

//     /* ── PROGRESS ── */
//     .progress-wrap { background:#E0E7FF; border-radius:99px; height:8px; overflow:hidden; margin:5px 0; }
//     .progress-bar { height:100%; border-radius:99px; transition:width .6s ease; }

//     /* ── UPLOAD ── */
//     .upload-zone { border:2px dashed var(--border); border-radius:var(--radius); padding:36px 20px; text-align:center; cursor:pointer; transition:all .2s; background:var(--surface2); }
//     .upload-zone:hover,.upload-zone.dragging { border-color:var(--accent); background:#E6F8F7; }

//     /* ── SQL ── */
//     .sql-tabs { display:flex; gap:6px; margin-bottom:16px; flex-wrap:wrap; }
//     .sql-tab { font-size:12px; font-weight:600; padding:6px 14px; border-radius:var(--radius-sm); cursor:pointer; border:1.5px solid var(--border); background:var(--surface); color:var(--muted); transition:all .18s; }
//     .sql-tab.active { background:linear-gradient(135deg,var(--accent),var(--accent2)); color:white; border-color:transparent; box-shadow:0 4px 14px rgba(77,201,194,0.35); }
//     .sql-tab:hover:not(.active) { border-color:var(--accent); color:var(--accent); }
//     .code-block { background:#0D1B2A; color:#7DD3FC; font-family:'JetBrains Mono',monospace; font-size:11px; padding:14px 16px; border-radius:var(--radius-sm); overflow-x:auto; margin:10px 0; line-height:1.7; border:1px solid #1E3A5F; -webkit-overflow-scrolling:touch; }

//     /* ── ROI ── */
//     .roi-row { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-radius:var(--radius-sm); background:var(--surface2); border:1px solid var(--border); margin-bottom:7px; gap:8px; }
//     .roi-label { font-size:12px; color:var(--muted); }
//     .roi-value { font-size:14px; font-weight:800; font-family:'JetBrains Mono',monospace; }
//     .waterfall { display:flex; gap:8px; align-items:flex-end; height:160px; padding:0 4px; overflow-x:auto; }
//     .wf-bar-wrap { flex:1; min-width:44px; display:flex; flex-direction:column; align-items:center; gap:5px; }
//     .wf-bar { width:100%; border-radius:6px 6px 0 0; transition:height .6s ease; min-height:8px; }
//     .wf-label { font-size:9px; font-weight:600; color:var(--muted); text-align:center; line-height:1.3; }
//     .wf-value { font-size:9px; font-weight:700; font-family:'JetBrains Mono'; text-align:center; }

//     /* ── MISC ── */
//     .predict-result { border-radius:var(--radius); padding:24px; text-align:center; border:2px solid; margin-bottom:16px; }
//     .predict-pct { font-size:3.5rem; font-weight:800; line-height:1; font-family:'JetBrains Mono'; }
//     .predict-tag { font-size:13px; font-weight:700; letter-spacing:3px; text-transform:uppercase; margin-top:8px; }
//     .skeleton { background:linear-gradient(90deg,#EEF2FF 25%,#F5F8FF 50%,#EEF2FF 75%); background-size:400% 100%; animation:shimmer 1.4s infinite; border-radius:6px; }
//     @keyframes shimmer { 0%{background-position:100% 0} 100%{background-position:-100% 0} }
//     .spinner { width:18px; height:18px; border-radius:50%; border:2.5px solid #E0E7FF; border-top-color:var(--accent); animation:spin .7s linear infinite; }
//     @keyframes spin { to{transform:rotate(360deg)} }
//     .fade-in { animation:fadeIn .4s ease; }
//     @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
//     .corr-bar { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
//     .corr-label { font-size:10px; color:var(--muted); width:120px; flex-shrink:0; text-align:right; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
//     .corr-track { flex:1; height:7px; background:#EEF2FF; border-radius:99px; overflow:hidden; position:relative; }
//     .corr-fill  { height:100%; border-radius:99px; position:absolute; }
//     .corr-val   { font-size:10px; font-weight:600; width:44px; font-family:'JetBrains Mono'; }
//     .status-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
//     .insight-item { display:flex; align-items:flex-start; gap:10px; padding:11px 13px; border-radius:var(--radius-sm); background:var(--surface2); border:1px solid var(--border); margin-bottom:7px; }
//     .empty-state { text-align:center; padding:40px 20px; color:var(--muted); }
//     .empty-icon  { font-size:2.2rem; margin-bottom:10px; }
//     .empty-title { font-size:14px; font-weight:700; color:var(--text); margin-bottom:5px; }
//     .tag { display:inline-block; font-size:11px; font-weight:600; padding:3px 10px; border-radius:99px; }

//     ::-webkit-scrollbar { width:5px; height:5px; }
//     ::-webkit-scrollbar-track { background:transparent; }
//     ::-webkit-scrollbar-thumb { background:#A8E6E3; border-radius:99px; }
//     ::-webkit-scrollbar-thumb:hover { background:var(--accent); }

//     /* ══════════════════════════════════════
//        RESPONSIVE BREAKPOINTS
//     ══════════════════════════════════════ */

//     /* Tablet: 640px – 1023px */
//     @media (max-width: 1023px) {
//       :root { --sidebar-w: 0px; }
//       .main { margin-left: 0; }
//       .sidebar { transform: translateX(-100%); width: 240px; }
//       .sidebar.mobile-visible { transform: translateX(0); }
//       .sidebar-close-btn { display: flex; }
//       .topbar-hamburger { display: flex; }
//       .kpi-grid { grid-template-columns: repeat(2, 1fr); }
//       .grid-2 { grid-template-columns: 1fr; }
//       .grid-3 { grid-template-columns: 1fr 1fr; }
//       .form-row { grid-template-columns: 1fr 1fr; }
//       .content { padding: 14px 16px; }
//     }

//     /* Mobile: < 640px */
//     @media (max-width: 639px) {
//       .kpi-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
//       .grid-2 { grid-template-columns: 1fr; gap: 12px; }
//       .grid-3 { grid-template-columns: 1fr; gap: 12px; }
//       .form-row { grid-template-columns: 1fr; }
//       .topbar { padding: 0 12px; height: 54px; }
//       .page-title { font-size: 0.95rem; }
//       .breadcrumb { display: none; }
//       .content { padding: 12px; }
//       .card { padding: 14px 14px; }
//       .kpi-value { font-size: 1.4rem; }
//       .status-chip { font-size: 10px; padding: 3px 8px; }
//       .topbar-right .btn { padding: 6px 10px; font-size: 11px; }
//       .topbar-right .btn span:not(.spinner) { display: none; }
//       .sql-tabs { gap: 4px; }
//       .sql-tab { font-size: 11px; padding: 5px 10px; }
//       .waterfall { height: 130px; }
//       .roi-row { padding: 8px 10px; }
//       .roi-label { font-size: 11px; }
//       .roi-value { font-size: 12px; }
//     }

//     /* Very small: < 400px */
//     @media (max-width: 399px) {
//       .kpi-grid { grid-template-columns: 1fr; }
//       .kpi-value { font-size: 1.6rem; }
//     }
//   `}</style>
// );

// // ─── NAV CONFIG ───────────────────────────────────────────────────────────────
// const NAV = [
//   { id: "dashboard", label: "Dashboard",        icon: <Icon.Dashboard />, badge: null },
//   { id: "predict",   label: "Churn Prediction", icon: <Icon.Predict />,   badge: null },
//   { id: "eda",       label: "Visualization",    icon: <Icon.Chart />,     badge: null },
//   { id: "model",     label: "Model Reports",    icon: <Icon.Model />,     badge: null },
//   { id: "batch",     label: "Batch Prediction", icon: <Icon.Batch />,     badge: null },
//   { id: "roi",       label: "ROI Calculator",   icon: <Icon.ROI />,       badge: null },
//   { id: "sql",       label: "SQL Analytics",    icon: <Icon.SQL />,       badge: "Live" },
// ];

// const PAGE_TITLES = {
//   dashboard: "Dashboard",
//   predict:   "Churn Prediction",
//   eda:       "Visualization · EDA",
//   model:     "Model Reports",
//   batch:     "Batch Prediction",
//   roi:       "ROI Calculator",
//   sql:       "SQL Analytics",
// };

// // ─── HOME (APP SHELL) ─────────────────────────────────────────────────────────
// import DashboardPage from "./DashboardPage";
// import PredictPage   from "./PredictPage";
// import VisPage       from "./VisPage";
// import ModelPage     from "./ModelPage";
// import BatchPage     from "./BatchPage";
// import ROIPage       from "./ROIPage";
// import SQLPage       from "./SQLPage";

// export default function Home() {
//   const [page, setPage] = useState("dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { data: status } = useFetch("/status");
//   const allModelsOk = status?.models ? Object.values(status.models).every(Boolean) : null;

//   const navigate = (p) => { setPage(p); setSidebarOpen(false); };

//   const renderPage = () => {
//     switch (page) {
//       case "dashboard": return <DashboardPage navigate={navigate} />;
//       case "predict":   return <PredictPage />;
//       case "eda":       return <VisPage />;
//       case "model":     return <ModelPage />;
//       case "batch":     return <BatchPage />;
//       case "roi":       return <ROIPage />;
//       case "sql":       return <SQLPage />;
//       default:          return <DashboardPage navigate={navigate} />;
//     }
//   };

//   return (
//     <>
//       <GlobalStyles />
//       <div className="app-shell">

//         {/* Mobile overlay */}
//         <div
//           className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
//           onClick={() => setSidebarOpen(false)}
//         />

//         {/* Sidebar */}
//         <aside className={`sidebar ${sidebarOpen ? "mobile-visible" : "mobile-hidden"}`}>
//           <div className="sidebar-logo">
//             <div className="logo-icon">C</div>
//             <div style={{ minWidth: 0 }}>
//               <div className="logo-text">Churn AI</div>
//               <div className="logo-sub">Enterprise ML Platform</div>
//             </div>
//             <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
//               <span style={{ width: 16, height: 16, display: "flex" }}><Icon.Close /></span>
//             </button>
//           </div>

//           <nav className="sidebar-nav">
//             <div className="nav-label">Main Menu</div>
//             {NAV.map((n) => (
//               <div
//                 key={n.id}
//                 className={`nav-item ${page === n.id ? "active" : ""}`}
//                 onClick={() => navigate(n.id)}
//               >
//                 {n.icon}
//                 <span style={{ flex: 1 }}>{n.label}</span>
//                 {n.badge && <span className="badge">{n.badge}</span>}
//               </div>
//             ))}
//           </nav>

//           <div className="sidebar-footer">
//             <div className="user-card">
//               <div className="avatar">A</div>
//               <div>
//                 <div className="user-name">Analyst</div>
//                 <div className="user-role">Data Scientist</div>
//               </div>
//             </div>
//             <div className="nav-item" style={{ marginTop: 6 }} onClick={() => alert("Logout")}>
//               <Icon.Logout /> Logout
//             </div>
//           </div>
//         </aside>

//         {/* Main */}
//         <main className="main">
//           <header className="topbar">
//             <div className="topbar-left">
//               <button className="topbar-hamburger" onClick={() => setSidebarOpen(true)}>
//                 <span style={{ width: 18, height: 18, display: "flex" }}><Icon.Menu /></span>
//               </button>
//               <div style={{ minWidth: 0 }}>
//                 <div className="page-title">{PAGE_TITLES[page]}</div>
//                 <div className="breadcrumb">Churn AI / {PAGE_TITLES[page]}</div>
//               </div>
//             </div>

//             <div className="topbar-right">
//               {allModelsOk === true  && <span className="status-chip chip-green"><div className="status-dot" style={{ background: "#059669" }} /> Models Online</span>}
//               {allModelsOk === false && <span className="status-chip chip-red"><div className="status-dot" style={{ background: "#DC2626" }} /> Pipeline Needed</span>}
//               {allModelsOk === null  && <span className="status-chip" style={{ background: "#F1F5F9", color: "#64748B" }}>Checking…</span>}
//               <button className="btn btn-ghost btn-outline" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => window.location.reload()}>
//                 <span style={{ width: 13, height: 13, display: "flex" }}><Icon.Refresh /></span>
//                 <span>Refresh</span>
//               </button>
//             </div>
//           </header>

//           <div className="content">{renderPage()}</div>
//         </main>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
export const API = import.meta.env?.VITE_API_URL || "http://localhost:8000";
export const api = (path) => `${API}${path}`;

// ─── HOOK ─────────────────────────────────────────────────────────────────────
export function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!url) return;
    setLoading(true); setError(null);
    fetch(api(url))
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((d) => { setData(d); setLoading(false); })
      .catch((e) => { setError(String(e)); setLoading(false); });
  }, deps);
  return { data, loading, error };
}

// ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────────
export function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, width: w };
  });
  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth;
      setBp({ isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, width: w });
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return bp;
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
export const Icon = {
  Dashboard: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Predict:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
  Chart:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Model:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  Batch:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  ROI:       () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  SQL:       () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  Logout:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Upload:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Download:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Play:      () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Alert:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Check:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Trend:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  Users:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Filter:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Refresh:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.43"/></svg>,
  Menu:      () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Close:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

// ─── SHARED UI COMPONENTS ─────────────────────────────────────────────────────
export const Spinner = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
    <div className="spinner" />
  </div>
);

export const Skel = ({ h = 20, w = "100%", mb = 8 }) => (
  <div className="skeleton" style={{ height: h, width: w, marginBottom: mb }} />
);

export const KpiSkel = () => (
  <div className="kpi-grid">
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className="card" style={{ padding: 22 }}>
        <Skel h={12} w="60%" mb={12} /><Skel h={36} w="80%" mb={8} /><Skel h={10} w="50%" mb={0} />
      </div>
    ))}
  </div>
);

export function RiskBadge({ risk }) {
  return <span className={`risk risk-${risk}`}>{risk}</span>;
}

export function Table({ cols, rows, maxRows = 30 }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.slice(0, maxRows).map((r, i) => (
            <tr key={i}>
              {cols.map((c) => (
                <td key={c}>
                  {c === "risk_category" ? <RiskBadge risk={r[c]} /> :
                   typeof r[c] === "number" ? r[c].toLocaleString() : String(r[c] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ReportImage({ name, caption }) {
  const [err, setErr] = useState(false);
  const url = `${API}/reports/${name}.png`;
  if (err) return (
    <div style={{ background:"#F7F9FF", border:"1.5px dashed #C7D2FE", borderRadius:12, padding:"36px 24px", textAlign:"center", color:"#94A3B8" }}>
      <div style={{ fontSize:28, marginBottom:10 }}>📊</div>
      <div style={{ fontSize:13, fontWeight:600, color:"#64748B", marginBottom:4 }}>Run notebook to generate</div>
      <code style={{ fontSize:11, color:"#6366F1", background:"#EEF2FF", padding:"2px 8px", borderRadius:4 }}>reports/{name}.png</code>
    </div>
  );
  return (
    <div style={{ marginBottom:8 }}>
      <img key={name} src={url} alt={caption||name} onError={() => setErr(true)}
        style={{ width:"100%", borderRadius:10, border:"1.5px solid #E0E7FF", display:"block" }} />
      {caption && <div style={{ fontSize:11, color:"#94A3B8", textAlign:"center", marginTop:6 }}>{caption}</div>}
    </div>
  );
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg:#F2FAFA; --surface:#FFFFFF; --surface2:#E6F8F7; --border:#D9F0EE;
      --accent:#4DC9C2; --accent2:#5B9BD5; --accent3:#F7C948;
      --green:#4DC9C2; --yellow:#F7C948; --red:#F87171;
      --text:#2D4A52; --muted:#7FA8AE;
      --radius:14px; --radius-sm:9px;
      --shadow:0 2px 16px rgba(67,97,238,0.10);
      --shadow-lg:0 8px 40px rgba(67,97,238,0.18);
      --sidebar-w: 230px;
    }
    html { font-size: 16px; }
    body { font-family:'Outfit',sans-serif; background:var(--bg); color:var(--text); overflow-x:hidden; }

    /* ── APP SHELL ── */
    .app-shell { display:flex; min-height:100vh; position:relative; }

    /* ── SIDEBAR ── */
    .sidebar {
      width: var(--sidebar-w);
      min-height: 100vh;
      background: var(--surface);
      border-right: 1.5px solid var(--border);
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0; left: 0;
      z-index: 200;
      box-shadow: 4px 0 24px rgba(77,201,194,0.10);
      transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
      /* Desktop: always visible */
      transform: translateX(0);
    }

    /* overlay for mobile sidebar */
    .sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 199;
    }
    .sidebar-overlay.active { display: block; }

    .sidebar-logo { padding:18px 16px 14px; display:flex; align-items:center; gap:10px; border-bottom:1.5px solid var(--border); }
    .logo-icon { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,var(--accent),var(--accent2)); display:flex; align-items:center; justify-content:center; color:white; font-weight:800; font-size:18px; flex-shrink:0; }
    .logo-text { font-weight:800; font-size:1.05rem; color:var(--text); letter-spacing:-0.3px; }
    .logo-sub { font-size:10px; color:var(--muted); font-weight:500; margin-top:1px; }
    .sidebar-close-btn {
      display: none;
      margin-left: auto;
      width: 30px; height: 30px;
      border-radius: 8px;
      border: none;
      background: var(--surface2);
      color: var(--muted);
      cursor: pointer;
      align-items: center; justify-content: center;
    }

    .sidebar-nav { flex:1; padding:12px 10px; display:flex; flex-direction:column; gap:2px; overflow-y:auto; }
    .nav-label { font-size:10px; font-weight:700; color:var(--muted); letter-spacing:1.5px; text-transform:uppercase; padding:8px 10px 4px; }
    .nav-item { display:flex; align-items:center; gap:10px; padding:9px 11px; border-radius:var(--radius-sm); cursor:pointer; transition:all .18s ease; color:var(--muted); font-size:0.855rem; font-weight:500; border:1.5px solid transparent; }
    .nav-item:hover { background:#E6F8F7; color:var(--accent); }
    .nav-item.active { background:linear-gradient(135deg,#E6F8F7,#EBF4FC); color:var(--accent); font-weight:700; border-color:#A8E6E3; box-shadow:0 2px 8px rgba(77,201,194,0.15); }
    .nav-item svg { width:16px; height:16px; flex-shrink:0; }
    .nav-item .badge { margin-left:auto; font-size:10px; font-weight:700; background:#FEE2E2; color:var(--red); padding:2px 7px; border-radius:99px; }
    .sidebar-footer { padding:12px 10px 16px; border-top:1.5px solid var(--border); }
    .user-card { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:var(--radius-sm); background:var(--surface2); border:1.5px solid var(--border); }
    .avatar { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,var(--accent),var(--accent2)); display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:13px; flex-shrink:0; }
    .user-name { font-size:12px; font-weight:600; color:var(--text); }
    .user-role { font-size:10px; color:var(--muted); }

    /* ── MAIN CONTENT ── */
    .main { margin-left: var(--sidebar-w); flex:1; min-height:100vh; display:flex; flex-direction:column; min-width:0; }
    .topbar { height:60px; background:var(--surface); border-bottom:1.5px solid var(--border); display:flex; align-items:center; justify-content:space-between; padding:0 20px; position:sticky; top:0; z-index:100; gap:12px; }
    .topbar-left { display:flex; align-items:center; gap:12px; min-width:0; }
    .topbar-hamburger { display:none; width:36px; height:36px; border-radius:9px; border:1.5px solid var(--border); background:var(--surface); cursor:pointer; align-items:center; justify-content:center; color:var(--muted); flex-shrink:0; }
    .page-title { font-size:1.1rem; font-weight:700; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .breadcrumb { font-size:12px; color:var(--muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .topbar-right { display:flex; align-items:center; gap:10px; flex-shrink:0; }
    .status-chip { font-size:11px; font-weight:600; padding:4px 11px; border-radius:99px; display:flex; align-items:center; gap:5px; white-space:nowrap; }
    .chip-green { background:#ECFDF5; color:#059669; }
    .chip-red   { background:#FEF2F2; color:#DC2626; }
    .chip-yellow{ background:#FFFBEB; color:#D97706; }
    .content { padding:18px 20px; flex:1; min-width:0; overflow-x:hidden; }

    /* ── GRIDS ── */
    .kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
    .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }
    .grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:20px; }

    /* ── CARD ── */
    .card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--radius); padding:18px 20px; box-shadow:var(--shadow); }
    .card-title { font-size:14px; font-weight:700; color:var(--text); margin-bottom:14px; display:flex; align-items:center; gap:8px; }
    .card-title svg { width:16px; height:16px; color:var(--accent); }

    /* ── KPI CARDS ── */
    .kpi-card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--radius); padding:16px 18px; box-shadow:var(--shadow); position:relative; overflow:hidden; transition:transform .2s,box-shadow .2s; }
    .kpi-card:hover { transform:translateY(-3px); box-shadow:var(--shadow-lg); }
    .kpi-card::after { content:''; position:absolute; top:0; left:0; width:4px; height:100%; border-radius:99px 0 0 99px; }
    .kpi-card.blue::after  { background:var(--accent); }
    .kpi-card.red::after   { background:var(--red); }
    .kpi-card.yellow::after{ background:var(--yellow); }
    .kpi-card.green::after { background:var(--green); }
    .kpi-label { font-size:11px; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:6px; }
    .kpi-value { font-size:1.7rem; font-weight:800; line-height:1; font-family:'JetBrains Mono',monospace; }
    .kpi-card.blue  .kpi-value { color:var(--accent); }
    .kpi-card.red   .kpi-value { color:var(--red); }
    .kpi-card.yellow .kpi-value{ color:#D97706; }
    .kpi-card.green .kpi-value { color:#059669; }
    .kpi-sub { font-size:11px; color:var(--muted); margin-top:5px; }
    .kpi-icon { position:absolute; right:14px; top:50%; transform:translateY(-50%); width:38px; height:38px; border-radius:11px; display:flex; align-items:center; justify-content:center; opacity:0.13; }
    .kpi-icon svg { width:22px; height:22px; }

    /* ── BUTTONS ── */
    .btn { font-family:'Outfit',sans-serif; font-weight:700; font-size:13px; padding:9px 18px; border-radius:var(--radius-sm); cursor:pointer; transition:all .18s; border:none; display:inline-flex; align-items:center; gap:7px; }
    .btn-primary { background:linear-gradient(135deg,var(--accent),var(--accent2)); color:white; box-shadow:0 4px 16px rgba(77,201,194,0.35); }
    .btn-primary:hover { filter:brightness(1.08); transform:translateY(-1px); }
    .btn-primary:disabled { opacity:.5; cursor:not-allowed; transform:none; }
    .btn-outline { background:white; color:var(--accent); border:1.5px solid var(--border); box-shadow:var(--shadow); }
    .btn-outline:hover { border-color:var(--accent); background:#E6F8F7; }
    .btn-ghost { background:transparent; color:var(--muted); }
    .btn-ghost:hover { background:var(--surface2); color:var(--text); }
    .btn svg { width:14px; height:14px; }

    /* ── FORMS ── */
    .form-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:12px; }
    .form-group { display:flex; flex-direction:column; gap:5px; }
    .form-label { font-size:11px; font-weight:600; color:var(--muted); }
    .form-control { padding:9px 12px; border:1.5px solid var(--border); border-radius:var(--radius-sm); font-size:13px; font-family:'Outfit',sans-serif; background:var(--surface); color:var(--text); outline:none; transition:border-color .18s; width:100%; }
    .form-control:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(77,201,194,0.15); }
    input[type="range"] { width:100%; accent-color:var(--accent); cursor:pointer; }

    /* ── TABLE ── */
    .table-wrap { overflow-x:auto; border-radius:var(--radius-sm); border:1.5px solid var(--border); -webkit-overflow-scrolling:touch; }
    table { width:100%; border-collapse:collapse; font-size:12px; min-width:500px; }
    th { background:var(--surface2); font-size:10px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:0.8px; padding:10px 12px; text-align:left; border-bottom:1.5px solid var(--border); white-space:nowrap; }
    td { padding:10px 12px; color:var(--text); border-bottom:1px solid var(--border); vertical-align:middle; white-space:nowrap; }
    tr:last-child td { border-bottom:none; }
    tr:hover td { background:#F7F9FF; }
    .risk { font-size:10px; font-weight:700; padding:2px 9px; border-radius:99px; }
    .risk-HIGH   { background:#FEF2F2; color:#DC2626; }
    .risk-MEDIUM { background:#FFFBEB; color:#D97706; }
    .risk-LOW    { background:#ECFDF5; color:#059669; }

    /* ── PROGRESS ── */
    .progress-wrap { background:#E0E7FF; border-radius:99px; height:8px; overflow:hidden; margin:5px 0; }
    .progress-bar { height:100%; border-radius:99px; transition:width .6s ease; }

    /* ── UPLOAD ── */
    .upload-zone { border:2px dashed var(--border); border-radius:var(--radius); padding:36px 20px; text-align:center; cursor:pointer; transition:all .2s; background:var(--surface2); }
    .upload-zone:hover,.upload-zone.dragging { border-color:var(--accent); background:#E6F8F7; }

    /* ── SQL ── */
    .sql-tabs { display:flex; gap:6px; margin-bottom:16px; flex-wrap:wrap; }
    .sql-tab { font-size:12px; font-weight:600; padding:6px 14px; border-radius:var(--radius-sm); cursor:pointer; border:1.5px solid var(--border); background:var(--surface); color:var(--muted); transition:all .18s; }
    .sql-tab.active { background:linear-gradient(135deg,var(--accent),var(--accent2)); color:white; border-color:transparent; box-shadow:0 4px 14px rgba(77,201,194,0.35); }
    .sql-tab:hover:not(.active) { border-color:var(--accent); color:var(--accent); }
    .code-block { background:#0D1B2A; color:#7DD3FC; font-family:'JetBrains Mono',monospace; font-size:11px; padding:14px 16px; border-radius:var(--radius-sm); overflow-x:auto; margin:10px 0; line-height:1.7; border:1px solid #1E3A5F; -webkit-overflow-scrolling:touch; }

    /* ── ROI ── */
    .roi-row { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-radius:var(--radius-sm); background:var(--surface2); border:1px solid var(--border); margin-bottom:7px; gap:8px; }
    .roi-label { font-size:12px; color:var(--muted); }
    .roi-value { font-size:14px; font-weight:800; font-family:'JetBrains Mono',monospace; }
    .waterfall { display:flex; gap:8px; align-items:flex-end; height:160px; padding:0 4px; overflow-x:auto; }
    .wf-bar-wrap { flex:1; min-width:44px; display:flex; flex-direction:column; align-items:center; gap:5px; }
    .wf-bar { width:100%; border-radius:6px 6px 0 0; transition:height .6s ease; min-height:8px; }
    .wf-label { font-size:9px; font-weight:600; color:var(--muted); text-align:center; line-height:1.3; }
    .wf-value { font-size:9px; font-weight:700; font-family:'JetBrains Mono'; text-align:center; }

    /* ── MISC ── */
    .predict-result { border-radius:var(--radius); padding:24px; text-align:center; border:2px solid; margin-bottom:16px; }
    .predict-pct { font-size:3.5rem; font-weight:800; line-height:1; font-family:'JetBrains Mono'; }
    .predict-tag { font-size:13px; font-weight:700; letter-spacing:3px; text-transform:uppercase; margin-top:8px; }
    .skeleton { background:linear-gradient(90deg,#EEF2FF 25%,#F5F8FF 50%,#EEF2FF 75%); background-size:400% 100%; animation:shimmer 1.4s infinite; border-radius:6px; }
    @keyframes shimmer { 0%{background-position:100% 0} 100%{background-position:-100% 0} }
    .spinner { width:18px; height:18px; border-radius:50%; border:2.5px solid #E0E7FF; border-top-color:var(--accent); animation:spin .7s linear infinite; }
    @keyframes spin { to{transform:rotate(360deg)} }
    .fade-in { animation:fadeIn .4s ease; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
    .corr-bar { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
    .corr-label { font-size:10px; color:var(--muted); width:120px; flex-shrink:0; text-align:right; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .corr-track { flex:1; height:7px; background:#EEF2FF; border-radius:99px; overflow:hidden; position:relative; }
    .corr-fill  { height:100%; border-radius:99px; position:absolute; }
    .corr-val   { font-size:10px; font-weight:600; width:44px; font-family:'JetBrains Mono'; }
    .status-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
    .insight-item { display:flex; align-items:flex-start; gap:10px; padding:11px 13px; border-radius:var(--radius-sm); background:var(--surface2); border:1px solid var(--border); margin-bottom:7px; }
    .empty-state { text-align:center; padding:40px 20px; color:var(--muted); }
    .empty-icon  { font-size:2.2rem; margin-bottom:10px; }
    .empty-title { font-size:14px; font-weight:700; color:var(--text); margin-bottom:5px; }
    .tag { display:inline-block; font-size:11px; font-weight:600; padding:3px 10px; border-radius:99px; }

    ::-webkit-scrollbar { width:5px; height:5px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:#A8E6E3; border-radius:99px; }
    ::-webkit-scrollbar-thumb:hover { background:var(--accent); }

    /* ══════════════════════════════════════
       RESPONSIVE BREAKPOINTS
    ══════════════════════════════════════ */

    /* Tablet & Mobile: <= 1023px — hide sidebar, show hamburger */
    @media (max-width: 1023px) {
      :root { --sidebar-w: 0px; }
      .main { margin-left: 0; }
      .sidebar { transform: translateX(-100%); width: 240px; }
      .sidebar.mobile-visible { transform: translateX(0); }
      .sidebar-close-btn { display: flex; }
      .topbar-hamburger { display: flex; }
      .kpi-grid { grid-template-columns: repeat(2, 1fr); }
      .grid-2 { grid-template-columns: 1fr; }
      .grid-3 { grid-template-columns: 1fr 1fr; }
      .form-row { grid-template-columns: 1fr 1fr; }
      .content { padding: 14px 16px; }
    }

    /* Mobile: < 640px */
    @media (max-width: 639px) {
      .kpi-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
      .grid-2 { grid-template-columns: 1fr; gap: 12px; }
      .grid-3 { grid-template-columns: 1fr; gap: 12px; }
      .form-row { grid-template-columns: 1fr; }
      .topbar { padding: 0 12px; height: 54px; }
      .page-title { font-size: 0.95rem; }
      .breadcrumb { display: none; }
      .content { padding: 12px; }
      .card { padding: 14px 14px; }
      .kpi-value { font-size: 1.4rem; }
      .status-chip { font-size: 10px; padding: 3px 8px; }
      .topbar-right .btn { padding: 6px 10px; font-size: 11px; }
      .topbar-right .btn span:not(.spinner) { display: none; }
      .sql-tabs { gap: 4px; }
      .sql-tab { font-size: 11px; padding: 5px 10px; }
      .waterfall { height: 130px; }
      .roi-row { padding: 8px 10px; }
      .roi-label { font-size: 11px; }
      .roi-value { font-size: 12px; }
    }

    /* Very small: < 400px */
    @media (max-width: 399px) {
      .kpi-grid { grid-template-columns: 1fr; }
      .kpi-value { font-size: 1.6rem; }
    }
  `}</style>
);

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Dashboard",        icon: <Icon.Dashboard />, badge: null },
  { id: "predict",   label: "Churn Prediction", icon: <Icon.Predict />,   badge: null },
  { id: "eda",       label: "Visualization",    icon: <Icon.Chart />,     badge: null },
  { id: "model",     label: "Model Reports",    icon: <Icon.Model />,     badge: null },
  { id: "batch",     label: "Batch Prediction", icon: <Icon.Batch />,     badge: null },
  { id: "roi",       label: "ROI Calculator",   icon: <Icon.ROI />,       badge: null },
  { id: "sql",       label: "SQL Analytics",    icon: <Icon.SQL />,       badge: "Live" },
];

const PAGE_TITLES = {
  dashboard: "Dashboard",
  predict:   "Churn Prediction",
  eda:       "Visualization · EDA",
  model:     "Model Reports",
  batch:     "Batch Prediction",
  roi:       "ROI Calculator",
  sql:       "SQL Analytics",
};

// ─── HOME (APP SHELL) ─────────────────────────────────────────────────────────
import DashboardPage from "./DashboardPage";
import PredictPage   from "./PredictPage";
import VisPage       from "./VisPage";
import ModelPage     from "./ModelPage";
import BatchPage     from "./BatchPage";
import ROIPage       from "./ROIPage";
import SQLPage       from "./SQLPage";

export default function Home() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: status } = useFetch("/status");
  const allModelsOk = status?.models ? Object.values(status.models).every(Boolean) : null;

  const navigate = (p) => { setPage(p); setSidebarOpen(false); };

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardPage navigate={navigate} />;
      case "predict":   return <PredictPage />;
      case "eda":       return <VisPage />;
      case "model":     return <ModelPage />;
      case "batch":     return <BatchPage />;
      case "roi":       return <ROIPage />;
      case "sql":       return <SQLPage />;
      default:          return <DashboardPage navigate={navigate} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="app-shell">

        {/* Mobile overlay */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "mobile-visible" : ""}`}>
          <div className="sidebar-logo">
            <div className="logo-icon">C</div>
            <div style={{ minWidth: 0 }}>
              <div className="logo-text">Churn AI</div>
              <div className="logo-sub">Enterprise ML Platform</div>
            </div>
            <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
              <span style={{ width: 16, height: 16, display: "flex" }}><Icon.Close /></span>
            </button>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-label">Main Menu</div>
            {NAV.map((n) => (
              <div
                key={n.id}
                className={`nav-item ${page === n.id ? "active" : ""}`}
                onClick={() => navigate(n.id)}
              >
                {n.icon}
                <span style={{ flex: 1 }}>{n.label}</span>
                {n.badge && <span className="badge">{n.badge}</span>}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="avatar">A</div>
              <div>
                <div className="user-name">Analyst</div>
                <div className="user-role">Data Scientist</div>
              </div>
            </div>
            <div className="nav-item" style={{ marginTop: 6 }} onClick={() => alert("Logout")}>
              <Icon.Logout /> Logout
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="main">
          <header className="topbar">
            <div className="topbar-left">
              <button className="topbar-hamburger" onClick={() => setSidebarOpen(true)}>
                <span style={{ width: 18, height: 18, display: "flex" }}><Icon.Menu /></span>
              </button>
              <div style={{ minWidth: 0 }}>
                <div className="page-title">{PAGE_TITLES[page]}</div>
                <div className="breadcrumb">Churn AI / {PAGE_TITLES[page]}</div>
              </div>
            </div>

            <div className="topbar-right">
              {allModelsOk === true  && <span className="status-chip chip-green"><div className="status-dot" style={{ background: "#059669" }} /> Models Online</span>}
              {allModelsOk === false && <span className="status-chip chip-red"><div className="status-dot" style={{ background: "#DC2626" }} /> Pipeline Needed</span>}
              {allModelsOk === null  && <span className="status-chip" style={{ background: "#F1F5F9", color: "#64748B" }}>Checking…</span>}
              <button className="btn btn-ghost btn-outline" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => window.location.reload()}>
                <span style={{ width: 13, height: 13, display: "flex" }}><Icon.Refresh /></span>
                <span>Refresh</span>
              </button>
            </div>
          </header>

          <div className="content">{renderPage()}</div>
        </main>
      </div>
    </>
  );
}