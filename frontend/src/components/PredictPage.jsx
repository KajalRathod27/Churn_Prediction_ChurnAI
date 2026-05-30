// import { useState } from "react";
// import { api, Icon } from "./Home";

// // ─── THEME ────────────────────────────────────────────────────────────────────
// const T = {
//   blue:       "#4F80F7",
//   blueDark:   "#3563E9",
//   blueLight:  "#EEF3FF",
//   blueMid:    "#C7D7FD",
//   teal:       "#4DC9C2",
//   tealLight:  "#E6F8F7",
//   red:        "#F87171",
//   redLight:   "#FEF2F2",
//   redBorder:  "#FECACA",
//   orange:     "#F59E0B",
//   orangeLight:"#FEF3C7",
//   green:      "#10B981",
//   greenLight: "#D1FAE5",
//   bg:         "#F5F7FF",
//   surface:    "#FFFFFF",
//   border:     "#E5EAFF",
//   text:       "#1E293B",
//   muted:      "#94A3B8",
//   radius:     "14px",
//   radiusSm:   "10px",
//   shadow:     "0 2px 12px rgba(79,128,247,0.08)",
//   shadowMd:   "0 6px 28px rgba(79,128,247,0.16)",
// };

// const DEFAULT_FORM = {
//   tenure: 12, monthly: 75.0, senior: "No", partner: "No", deps: "No",
//   contract: "Month-to-month", internet: "Fiber optic", payment: "Electronic check",
//   paperless: "Yes", phone: "Yes", security: "No", backup: "No",
//   device: "No", support: "No", tv: "No", movies: "No",
// };

// const riskColors = {
//   HIGH:   { text: "#DC2626", bg: "#FEF2F2", border: "#FECACA", bar: "#F87171" },
//   MEDIUM: { text: "#D97706", bg: "#FFFBEB", border: "#FDE68A", bar: "#F59E0B" },
//   LOW:    { text: "#059669", bg: "#ECFDF5", border: "#A7F3D0", bar: "#10B981" },
// };

// // ─── SHARED FIELD COMPONENTS ──────────────────────────────────────────────────
// function FieldLabel({ children }) {
//   return (
//     <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>
//       {children}
//     </div>
//   );
// }

// function TextInput({ value, onChange, placeholder, type = "text", min, max, step }) {
//   const [focused, setFocused] = useState(false);
//   return (
//     <input
//       type={type} value={value} onChange={onChange}
//       placeholder={placeholder} min={min} max={max} step={step}
//       onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
//       style={{
//         width: "100%", padding: "10px 13px",
//         border: `1.5px solid ${focused ? T.blue : T.border}`,
//         borderRadius: T.radiusSm,
//         fontSize: 13, fontFamily: "'Outfit', sans-serif",
//         background: T.surface, color: T.text, outline: "none",
//         boxShadow: focused ? `0 0 0 3px rgba(79,128,247,0.12)` : "none",
//         transition: "border-color .15s, box-shadow .15s",
//         boxSizing: "border-box",
//       }}
//     />
//   );
// }

// function SelectInput({ value, onChange, opts }) {
//   const [focused, setFocused] = useState(false);
//   return (
//     <div style={{ position: "relative" }}>
//       <select
//         value={value} onChange={onChange}
//         onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
//         style={{
//           width: "100%", padding: "10px 36px 10px 13px",
//           border: `1.5px solid ${focused ? T.blue : T.border}`,
//           borderRadius: T.radiusSm,
//           fontSize: 13, fontFamily: "'Outfit', sans-serif",
//           background: T.surface, color: T.text, outline: "none",
//           appearance: "none", cursor: "pointer",
//           boxShadow: focused ? `0 0 0 3px rgba(79,128,247,0.12)` : T.shadow,
//           transition: "border-color .15s, box-shadow .15s",
//           boxSizing: "border-box",
//         }}
//       >
//         {opts.map((o) => <option key={o}>{o}</option>)}
//       </select>
//       {/* chevron */}
//       <div style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: T.muted }}>
//         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
//       </div>
//     </div>
//   );
// }

// function RangeField({ label, value, min, max, onChange }) {
//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
//         <FieldLabel>{label}</FieldLabel>
//         <span style={{ fontSize: 12, fontWeight: 800, color: T.blue, fontFamily: "'JetBrains Mono',monospace", background: T.blueLight, padding: "2px 10px", borderRadius: 99 }}>
//           {value}
//         </span>
//       </div>
//       <input
//         type="range" min={min} max={max} value={value} onChange={onChange}
//         style={{ width: "100%", accentColor: T.blue, cursor: "pointer", height: 4 }}
//       />
//       <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.muted, marginTop: 3 }}>
//         <span>{min}</span><span>{max}</span>
//       </div>
//     </div>
//   );
// }

// // Toggle-style boolean fields
// function ToggleField({ label, value, onChange }) {
//   const isYes = value === "Yes";
//   return (
//     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", background: T.bg, borderRadius: T.radiusSm, border: `1.5px solid ${T.border}` }}>
//       <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{label}</span>
//       <button
//         onClick={() => onChange(isYes ? "No" : "Yes")}
//         style={{
//           width: 42, height: 22, borderRadius: 99, border: "none", cursor: "pointer",
//           background: isYes ? T.blue : "#CBD5E1",
//           position: "relative", transition: "background .2s",
//           flexShrink: 0,
//         }}
//       >
//         <div style={{
//           position: "absolute", top: 3,
//           left: isYes ? 22 : 3,
//           width: 16, height: 16, borderRadius: "50%",
//           background: "white", transition: "left .2s",
//           boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
//         }} />
//       </button>
//     </div>
//   );
// }

// // Card section wrapper
// function Section({ title, icon, children, mb = 18 }) {
//   return (
//     <div style={{
//       background: T.surface, borderRadius: T.radius,
//       border: `1.5px solid ${T.border}`,
//       boxShadow: T.shadow, marginBottom: mb, overflow: "hidden",
//     }}>
//       {/* header stripe */}
//       <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 9 }}>
//         <div style={{ width: 30, height: 30, borderRadius: 9, background: T.blueLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.blue }}>
//           <span style={{ width: 15, height: 15, display: "flex" }}>{icon}</span>
//         </div>
//         <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>{title}</span>
//       </div>
//       <div style={{ padding: "18px 18px" }}>{children}</div>
//     </div>
//   );
// }

// // 2/3-col form grid
// function FormGrid({ cols = 3, children }) {
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 14, marginBottom: 14 }}>
//       {children}
//     </div>
//   );
// }

// function FormField({ label, children }) {
//   return (
//     <div>
//       <FieldLabel>{label}</FieldLabel>
//       {children}
//     </div>
//   );
// }

// // ─── RESULT PANEL ─────────────────────────────────────────────────────────────
// function ResultPanel({ result }) {
//   const rc = riskColors[result.risk_category] || riskColors.LOW;
//   const ri = result.revenue_impact;

//   return (
//     <div style={{ animation: "fadeIn .4s ease" }}>

//       {/* Big risk score card */}
//       <div style={{
//         background: rc.bg, border: `2px solid ${rc.border}`,
//         borderRadius: T.radius, padding: "28px 24px",
//         textAlign: "center", marginBottom: 16, position: "relative", overflow: "hidden",
//       }}>
//         <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: `${rc.bar}18` }} />
//         <div style={{ fontSize: "3.8rem", fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: rc.text, lineHeight: 1 }}>
//           {result.churn_probability_pct}%
//         </div>
//         <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: rc.text, marginTop: 8, marginBottom: 6 }}>
//           {result.risk_category} RISK
//         </div>
//         <div style={{ fontSize: 11, color: T.muted }}>Mode: {result.mode}</div>
//       </div>

//       {/* Progress bar */}
//       <div style={{ background: T.border, borderRadius: 99, height: 10, overflow: "hidden", marginBottom: 20 }}>
//         <div style={{
//           height: "100%", borderRadius: 99,
//           width: `${result.churn_probability_pct}%`,
//           background: `linear-gradient(90deg, ${T.blue}, ${rc.bar})`,
//           transition: "width .8s ease",
//         }} />
//       </div>

//       {/* Revenue impact */}
//       <div style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: T.radius, boxShadow: T.shadow, marginBottom: 14, overflow: "hidden" }}>
//         <div style={{ padding: "13px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 9 }}>
//           <div style={{ width: 30, height: 30, borderRadius: 9, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", color: "#D97706" }}>
//             <span style={{ width: 15, height: 15, display: "flex" }}><Icon.ROI /></span>
//           </div>
//           <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>Revenue Impact</span>
//         </div>
//         <div style={{ padding: "14px 18px" }}>
//           {[
//             ["Annual Revenue at Risk", `₹${ri.annual_revenue_at_risk.toLocaleString("en-IN",{maximumFractionDigits:0})}`, T.red],
//             ["Campaign Cost Estimate", `₹${ri.campaign_cost_estimate.toLocaleString("en-IN",{maximumFractionDigits:0})}`, T.orange],
//             ["Net Saving if Retained", `₹${ri.net_saving_if_retained.toLocaleString("en-IN",{maximumFractionDigits:0})}`, T.green],
//             ["Monthly Charges",        `₹${ri.monthly_charges}`,            T.blue],
//             ["Tenure",                 `${ri.tenure_months} months`,         T.blue],
//             ["Services Subscribed",    `${ri.services_subscribed}`,          T.blue],
//           ].map(([l, v, c]) => (
//             <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", borderRadius: T.radiusSm, background: T.bg, border: `1px solid ${T.border}`, marginBottom: 7 }}>
//               <span style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>{l}</span>
//               <span style={{ fontSize: 13, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: c }}>{v}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Retention Actions */}
//       <div style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: T.radius, boxShadow: T.shadow, overflow: "hidden" }}>
//         <div style={{ padding: "13px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 9 }}>
//           <div style={{ width: 30, height: 30, borderRadius: 9, background: T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.green }}>
//             <span style={{ width: 15, height: 15, display: "flex" }}><Icon.Check /></span>
//           </div>
//           <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>Retention Actions</span>
//         </div>
//         <div style={{ padding: "14px 18px" }}>
//           {result.retention_actions.map((a, i) => (
//             <div key={i} style={{
//               display: "flex", alignItems: "flex-start", gap: 10,
//               padding: "10px 13px", marginBottom: 7,
//               borderRadius: T.radiusSm, background: T.bg,
//               border: `1px solid ${T.border}`,
//               borderLeft: `3px solid ${rc.bar}`,
//             }}>
//               <div style={{ width: 18, height: 18, borderRadius: "50%", background: `${rc.bar}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
//                 <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={rc.bar} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
//               </div>
//               <span style={{ fontSize: 12, color: T.text, lineHeight: 1.6 }}>{a}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── MAIN PAGE ────────────────────────────────────────────────────────────────
// export default function PredictPage() {
//   const [form, setForm] = useState(DEFAULT_FORM);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

//   const predict = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(api("/predict"), {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           tenure: form.tenure, monthly: form.monthly, senior: form.senior,
//           partner: form.partner, deps: form.deps, contract: form.contract,
//           internet: form.internet, payment: form.payment, paperless: form.paperless,
//           phone: form.phone, security: form.security, backup: form.backup,
//           device: form.device, support: form.support, tv: form.tv, movies: form.movies,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.detail || "Prediction failed");
//       setResult(data);
//     } catch (e) { console.error(e); } finally { setLoading(false); }
//   };

//   return (
//     <div style={{ fontFamily: "'Outfit',sans-serif", animation: "fadeIn .4s ease" }}>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 20, alignItems: "start" }}>

//         {/* ── LEFT: Form ── */}
//         <div>

//           {/* Customer Profile */}
//           <Section title="Customer Profile" icon={<Icon.Users />}>
//             <RangeField label="Tenure (months)" value={form.tenure} min={0} max={72} onChange={e => set("tenure", +e.target.value)} />
//             <div style={{ height: 16 }} />
//             <FormGrid cols={2}>
//               <FormField label="Monthly Charges (₹)">
//                 <TextInput type="number" value={form.monthly} min={20} max={120} step={0.5} onChange={e => set("monthly", +e.target.value)} />
//               </FormField>
//               <FormField label="Senior Citizen">
//                 <SelectInput value={form.senior} onChange={e => set("senior", e.target.value)} opts={["No","Yes"]} />
//               </FormField>
//             </FormGrid>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//               <ToggleField label="Has Partner" value={form.partner} onChange={v => set("partner", v)} />
//               <ToggleField label="Has Dependents" value={form.deps} onChange={v => set("deps", v)} />
//             </div>
//           </Section>

//           {/* Contract & Billing */}
//           <Section title="Contract & Billing" icon={<Icon.Filter />}>
//             <FormGrid cols={3}>
//               <FormField label="Contract Type">
//                 <SelectInput value={form.contract} onChange={e => set("contract", e.target.value)} opts={["Month-to-month","One year","Two year"]} />
//               </FormField>
//               <FormField label="Internet Service">
//                 <SelectInput value={form.internet} onChange={e => set("internet", e.target.value)} opts={["Fiber optic","DSL","No"]} />
//               </FormField>
//               <FormField label="Payment Method">
//                 <SelectInput value={form.payment} onChange={e => set("payment", e.target.value)} opts={["Electronic check","Mailed check","Bank transfer (automatic)","Credit card (automatic)"]} />
//               </FormField>
//             </FormGrid>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//               <ToggleField label="Paperless Billing" value={form.paperless} onChange={v => set("paperless", v)} />
//               <ToggleField label="Phone Service"     value={form.phone}     onChange={v => set("phone", v)} />
//             </div>
//           </Section>

//           {/* Add-on Services */}
//           <Section title="Add-on Services" icon={<Icon.Chart />} mb={0}>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
//               {[
//                 ["Online Security",   "security"],
//                 ["Online Backup",     "backup"],
//                 ["Device Protection", "device"],
//                 ["Tech Support",      "support"],
//                 ["Streaming TV",      "tv"],
//                 ["Streaming Movies",  "movies"],
//               ].map(([label, key]) => (
//                 <div key={key}>
//                   <FieldLabel>{label}</FieldLabel>
//                   <SelectInput value={form[key]} onChange={e => set(key, e.target.value)} opts={["No","Yes","No internet service"]} />
//                 </div>
//               ))}
//             </div>
//           </Section>

//           {/* Submit button */}
//           <button
//             onClick={predict}
//             disabled={loading}
//             style={{
//               width: "100%", marginTop: 18,
//               padding: "14px", borderRadius: T.radius,
//               background: loading ? "#93C5FD" : `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`,
//               color: "white", border: "none",
//               fontSize: 14, fontWeight: 800, fontFamily: "'Outfit',sans-serif",
//               cursor: loading ? "not-allowed" : "pointer",
//               boxShadow: `0 4px 20px rgba(79,128,247,0.35)`,
//               display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
//               transition: "all .18s",
//             }}
//             onMouseEnter={e => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
//             onMouseLeave={e => (e.currentTarget.style.transform = "")}
//           >
//             {loading ? (
//               <>
//                 <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.35)", borderTopColor: "white", animation: "spin .7s linear infinite" }} />
//                 Predicting...
//               </>
//             ) : (
//               <>
//                 <span style={{ width: 17, height: 17, display: "flex" }}><Icon.Predict /></span>
//                 Predict Churn Risk
//               </>
//             )}
//           </button>
//         </div>

//         {/* ── RIGHT: Result / Empty ── */}
//         <div>
//           {result ? (
//             <ResultPanel result={result} />
//           ) : (
//             <div style={{
//               background: T.surface, border: `1.5px dashed ${T.blueMid}`,
//               borderRadius: T.radius, padding: "56px 24px",
//               textAlign: "center", boxShadow: T.shadow,
//             }}>
//               <div style={{ fontSize: 44, marginBottom: 14 }}>🔮</div>
//               <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 8 }}>No prediction yet</div>
//               <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>
//                 Fill in the customer details on the left<br />and click <b style={{ color: T.blue }}>Predict Churn Risk</b>
//               </div>

//               {/* decorative pill tags */}
//               <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 22, flexWrap: "wrap" }}>
//                 {["Contract Type","Tenure","Monthly Charges","Add-ons"].map(t => (
//                   <span key={t} style={{ background: T.blueLight, color: T.blue, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99 }}>{t}</span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { api, Icon } from "./Home";

const T = {
  blue: "#4F80F7", blueDark: "#3563E9", blueLight: "#EEF3FF", blueMid: "#C7D7FD",
  teal: "#4DC9C2", tealLight: "#E6F8F7",
  red: "#F87171", redLight: "#FEF2F2", redBorder: "#FECACA",
  orange: "#F59E0B", orangeLight: "#FEF3C7",
  green: "#10B981", greenLight: "#D1FAE5",
  bg: "#F5F7FF", surface: "#FFFFFF", border: "#E5EAFF",
  text: "#1E293B", muted: "#94A3B8",
  radius: "14px", radiusSm: "10px",
  shadow: "0 2px 12px rgba(79,128,247,0.08)", shadowMd: "0 6px 28px rgba(79,128,247,0.16)",
};

const DEFAULT_FORM = {
  tenure: 12, monthly: 75.0, senior: "No", partner: "No", deps: "No",
  contract: "Month-to-month", internet: "Fiber optic", payment: "Electronic check",
  paperless: "Yes", phone: "Yes", security: "No", backup: "No",
  device: "No", support: "No", tv: "No", movies: "No",
};

const riskColors = {
  HIGH:   { text: "#DC2626", bg: "#FEF2F2", border: "#FECACA", bar: "#F87171" },
  MEDIUM: { text: "#D97706", bg: "#FFFBEB", border: "#FDE68A", bar: "#F59E0B" },
  LOW:    { text: "#059669", bg: "#ECFDF5", border: "#A7F3D0", bar: "#10B981" },
};

function FieldLabel({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 5 }}>{children}</div>;
}

function SelectInput({ value, onChange, opts }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", padding: "9px 32px 9px 12px", border: `1.5px solid ${focused ? T.blue : T.border}`, borderRadius: T.radiusSm, fontSize: 13, fontFamily: "'Outfit',sans-serif", background: T.surface, color: T.text, outline: "none", appearance: "none", cursor: "pointer", boxSizing: "border-box", boxShadow: focused ? `0 0 0 3px rgba(79,128,247,0.12)` : "none", transition: "border-color .15s" }}>
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
      <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: T.muted }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
    </div>
  );
}

function RangeField({ label, value, min, max, onChange }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <FieldLabel>{label}</FieldLabel>
        <span style={{ fontSize: 11, fontWeight: 800, color: T.blue, fontFamily: "'JetBrains Mono',monospace", background: T.blueLight, padding: "2px 9px", borderRadius: 99 }}>{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={onChange} style={{ width: "100%", accentColor: T.blue, cursor: "pointer", height: 4 }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.muted, marginTop: 2 }}>
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

function ToggleField({ label, value, onChange }) {
  const isYes = value === "Yes";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 11px", background: T.bg, borderRadius: T.radiusSm, border: `1.5px solid ${T.border}` }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{label}</span>
      <button onClick={() => onChange(isYes ? "No" : "Yes")} style={{ width: 40, height: 20, borderRadius: 99, border: "none", cursor: "pointer", background: isYes ? T.blue : "#CBD5E1", position: "relative", transition: "background .2s", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 2, left: isYes ? 20 : 2, width: 16, height: 16, borderRadius: "50%", background: "white", transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,0.18)" }} />
      </button>
    </div>
  );
}

function Section({ title, icon, children, mb = 16 }) {
  return (
    <div style={{ background: T.surface, borderRadius: T.radius, border: `1.5px solid ${T.border}`, boxShadow: T.shadow, marginBottom: mb, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: T.blueLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.blue }}>
          <span style={{ width: 14, height: 14, display: "flex" }}>{icon}</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>{title}</span>
      </div>
      <div style={{ padding: "16px" }}>{children}</div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}

function ResultPanel({ result }) {
  const rc = riskColors[result.risk_category] || riskColors.LOW;
  const ri = result.revenue_impact;
  return (
    <div style={{ animation: "fadeIn .4s ease" }}>
      <div style={{ background: rc.bg, border: `2px solid ${rc.border}`, borderRadius: T.radius, padding: "24px 20px", textAlign: "center", marginBottom: 14, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 90, height: 90, borderRadius: "50%", background: `${rc.bar}18` }} />
        <div style={{ fontSize: "3.2rem", fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", color: rc.text, lineHeight: 1 }}>{result.churn_probability_pct}%</div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: rc.text, marginTop: 7, marginBottom: 5 }}>{result.risk_category} RISK</div>
        <div style={{ fontSize: 10, color: T.muted }}>Mode: {result.mode}</div>
      </div>
      <div style={{ background: T.border, borderRadius: 99, height: 8, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ height: "100%", borderRadius: 99, width: `${result.churn_probability_pct}%`, background: `linear-gradient(90deg, ${T.blue}, ${rc.bar})`, transition: "width .8s ease" }} />
      </div>
      <div style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: T.radius, boxShadow: T.shadow, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ padding: "11px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", color: "#D97706" }}>
            <span style={{ width: 14, height: 14, display: "flex" }}><Icon.ROI /></span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>Revenue Impact</span>
        </div>
        <div style={{ padding: "12px 16px" }}>
          {[
            ["Annual Revenue at Risk", `₹${ri.annual_revenue_at_risk.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, T.red],
            ["Campaign Cost Estimate", `₹${ri.campaign_cost_estimate.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, T.orange],
            ["Net Saving if Retained", `₹${ri.net_saving_if_retained.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, T.green],
            ["Monthly Charges", `₹${ri.monthly_charges}`, T.blue],
            ["Tenure", `${ri.tenure_months} months`, T.blue],
            ["Services Subscribed", `${ri.services_subscribed}`, T.blue],
          ].map(([l, v, c]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: T.radiusSm, background: T.bg, border: `1px solid ${T.border}`, marginBottom: 6, gap: 8 }}>
              <span style={{ fontSize: 11, color: T.muted, fontWeight: 500 }}>{l}</span>
              <span style={{ fontSize: 12, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: c }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: T.radius, boxShadow: T.shadow, overflow: "hidden" }}>
        <div style={{ padding: "11px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", color: T.green }}>
            <span style={{ width: 14, height: 14, display: "flex" }}><Icon.Check /></span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>Retention Actions</span>
        </div>
        <div style={{ padding: "12px 16px" }}>
          {result.retention_actions.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "9px 11px", marginBottom: 6, borderRadius: T.radiusSm, background: T.bg, border: `1px solid ${T.border}`, borderLeft: `3px solid ${rc.bar}` }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: `${rc.bar}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={rc.bar} strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <span style={{ fontSize: 12, color: T.text, lineHeight: 1.5 }}>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PredictPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const predict = async () => {
    setLoading(true);
    try {
      const res = await fetch(api("/predict"), {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenure: form.tenure, monthly: form.monthly, senior: form.senior, partner: form.partner, deps: form.deps, contract: form.contract, internet: form.internet, payment: form.payment, paperless: form.paperless, phone: form.phone, security: form.security, backup: form.backup, device: form.device, support: form.support, tv: form.tv, movies: form.movies }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Prediction failed");
      setResult(data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", animation: "fadeIn .4s ease" }}>
      <style>{`
        .predict-grid { display: grid; grid-template-columns: 1fr 400px; gap: 18px; align-items: start; }
        .predict-form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .predict-form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .predict-toggle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .predict-addon-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px; }
        @media (max-width: 1100px) {
          .predict-grid { grid-template-columns: 1fr; }
          .predict-form-grid-3 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 639px) {
          .predict-form-grid-2 { grid-template-columns: 1fr; }
          .predict-form-grid-3 { grid-template-columns: 1fr; }
          .predict-toggle-grid { grid-template-columns: 1fr; }
          .predict-addon-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 420px) {
          .predict-addon-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="predict-grid">
        {/* ── Form ── */}
        <div>
          <Section title="Customer Profile" icon={<Icon.Users />}>
            <RangeField label="Tenure (months)" value={form.tenure} min={0} max={72} onChange={e => set("tenure", +e.target.value)} />
            <div style={{ height: 14 }} />
            <div className="predict-form-grid-2">
              <FormField label="Monthly Charges (₹)">
                <input type="number" value={form.monthly} min={20} max={120} step={0.5} onChange={e => set("monthly", +e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${T.border}`, borderRadius: T.radiusSm, fontSize: 13, fontFamily: "'Outfit',sans-serif", background: T.surface, color: T.text, outline: "none", boxSizing: "border-box" }} />
              </FormField>
              <FormField label="Senior Citizen">
                <SelectInput value={form.senior} onChange={e => set("senior", e.target.value)} opts={["No", "Yes"]} />
              </FormField>
            </div>
            <div className="predict-toggle-grid">
              <ToggleField label="Has Partner" value={form.partner} onChange={v => set("partner", v)} />
              <ToggleField label="Has Dependents" value={form.deps} onChange={v => set("deps", v)} />
            </div>
          </Section>

          <Section title="Contract & Billing" icon={<Icon.Filter />}>
            <div className="predict-form-grid-3">
              <FormField label="Contract Type">
                <SelectInput value={form.contract} onChange={e => set("contract", e.target.value)} opts={["Month-to-month", "One year", "Two year"]} />
              </FormField>
              <FormField label="Internet Service">
                <SelectInput value={form.internet} onChange={e => set("internet", e.target.value)} opts={["Fiber optic", "DSL", "No"]} />
              </FormField>
              <FormField label="Payment Method">
                <SelectInput value={form.payment} onChange={e => set("payment", e.target.value)} opts={["Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)"]} />
              </FormField>
            </div>
            <div className="predict-toggle-grid">
              <ToggleField label="Paperless Billing" value={form.paperless} onChange={v => set("paperless", v)} />
              <ToggleField label="Phone Service" value={form.phone} onChange={v => set("phone", v)} />
            </div>
          </Section>

          <Section title="Add-on Services" icon={<Icon.Chart />} mb={0}>
            <div className="predict-addon-grid">
              {[["Online Security", "security"], ["Online Backup", "backup"], ["Device Protection", "device"], ["Tech Support", "support"], ["Streaming TV", "tv"], ["Streaming Movies", "movies"]].map(([label, key]) => (
                <div key={key}>
                  <FieldLabel>{label}</FieldLabel>
                  <SelectInput value={form[key]} onChange={e => set(key, e.target.value)} opts={["No", "Yes", "No internet service"]} />
                </div>
              ))}
            </div>
          </Section>

          <button onClick={predict} disabled={loading} style={{ width: "100%", marginTop: 16, padding: "13px", borderRadius: T.radius, background: loading ? "#93C5FD" : `linear-gradient(135deg, ${T.blue}, ${T.blueDark})`, color: "white", border: "none", fontSize: 14, fontWeight: 800, fontFamily: "'Outfit',sans-serif", cursor: loading ? "not-allowed" : "pointer", boxShadow: `0 4px 20px rgba(79,128,247,0.35)`, display: "flex", alignItems: "center", justifyContent: "center", gap: 9, transition: "all .18s" }}
            onMouseEnter={e => !loading && (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "")}>
            {loading ? <><div style={{ width: 15, height: 15, borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.35)", borderTopColor: "white", animation: "spin .7s linear infinite" }} />Predicting...</> : <><span style={{ width: 16, height: 16, display: "flex" }}><Icon.Predict /></span>Predict Churn Risk</>}
          </button>
        </div>

        {/* ── Result ── */}
        <div>
          {result ? <ResultPanel result={result} /> : (
            <div style={{ background: T.surface, border: `1.5px dashed ${T.blueMid}`, borderRadius: T.radius, padding: "48px 20px", textAlign: "center", boxShadow: T.shadow }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔮</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: T.text, marginBottom: 7 }}>No prediction yet</div>
              <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.6 }}>Fill in the customer details<br />and click <b style={{ color: T.blue }}>Predict Churn Risk</b></div>
              <div style={{ display: "flex", gap: 7, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
                {["Contract Type", "Tenure", "Monthly Charges", "Add-ons"].map(t => (
                  <span key={t} style={{ background: T.blueLight, color: T.blue, fontSize: 11, fontWeight: 700, padding: "3px 11px", borderRadius: 99 }}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}