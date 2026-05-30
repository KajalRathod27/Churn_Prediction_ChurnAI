// import { useState, useEffect } from "react";
// import { api, Icon } from "./Home";

// export default function ROIPage() {
//   const [form, setForm] = useState({
//     total_customers:7043, avg_monthly_rev:64.76, churn_rate_pct:27,
//     retention_high:25, retention_medium:15,
//     campaign_cost_high:250, campaign_cost_medium:100,
//   });
//   const [result, setResult] = useState(null);
//   const set = (k, v) => setForm((p) => ({ ...p, [k]:v }));

//   useEffect(() => {
//     const t = setTimeout(async () => {
//       try {
//         const res = await fetch(api("/roi/calculate"), {
//           method:"POST", headers:{"Content-Type":"application/json"},
//           body: JSON.stringify({ total_customers:form.total_customers, avg_monthly_rev:form.avg_monthly_rev, churn_rate_pct:form.churn_rate_pct, retention_high:form.retention_high, retention_medium:form.retention_medium, campaign_cost_high:form.campaign_cost_high, campaign_cost_medium:form.campaign_cost_medium }),
//         });
//         if (res.ok) setResult(await res.json());
//       } catch(e) { console.error("ROI fetch error", e); }
//     }, 400);
//     return () => clearTimeout(t);
//   }, [JSON.stringify(form)]);

//   const maxWf = result ? Math.max(...result.waterfall.map((w) => Math.abs(w.value))) : 1;

//   return (
//     <div className="fade-in">
//       <div className="grid-2" style={{ alignItems:"start" }}>
//         <div className="card">
//           <div className="card-title"><Icon.Filter /> Input Parameters</div>
//           {[
//             ["Total Customers",          "total_customers",    100, 1000000, 100],
//             ["Campaign Cost HIGH (₹)",   "campaign_cost_high",  50,    5000,  10],
//             ["Campaign Cost MEDIUM (₹)", "campaign_cost_medium", 20,   1000,   5],
//           ].map(([l,k,min,max,step]) => (
//             <div key={k} className="form-group" style={{ marginBottom:12 }}>
//               <label className="form-label">{l}</label>
//               <input type="number" className="form-control" min={min} max={max} step={step} value={form[k]} onChange={(e) => set(k,+e.target.value)} />
//             </div>
//           ))}
//           <div className="form-group" style={{ marginBottom:12 }}>
//             <label className="form-label">Avg Monthly Revenue (₹) — {form.avg_monthly_rev}</label>
//             <input type="range" min={10} max={200} step={0.5} value={form.avg_monthly_rev} onChange={(e) => set("avg_monthly_rev",+e.target.value)} />
//           </div>
//           {[
//             ["Predicted Churn Rate (%)",  "churn_rate_pct",   1, 50],
//             ["Retention Rate HIGH (%)",   "retention_high",   5, 60],
//             ["Retention Rate MEDIUM (%)", "retention_medium", 5, 40],
//           ].map(([l,k,min,max]) => (
//             <div key={k} className="form-group" style={{ marginBottom:12 }}>
//               <label className="form-label">{l} — {form[k]}%</label>
//               <input type="range" min={min} max={max} value={form[k]} onChange={(e) => set(k,+e.target.value)} />
//             </div>
//           ))}
//         </div>

//         <div>
//           {result && (
//             <div className="fade-in">
//               <div className="card" style={{ marginBottom:16 }}>
//                 <div className="card-title"><Icon.ROI /> Results</div>
//                 {[
//                   ["Predicted Churners",  result.results.predicted_churners.toLocaleString(),                                                              "#DC2626"],
//                   ["HIGH Risk Customers", result.results.high_risk_customers.toLocaleString(),                                                             "#D97706"],
//                   ["Revenue at Risk",     `₹${Number(result.results.annual_revenue_at_risk).toLocaleString("en-IN",{maximumFractionDigits:0})}`,           "#DC2626"],
//                   ["Campaign Cost",       `₹${Number(result.results.total_campaign_cost).toLocaleString("en-IN",{maximumFractionDigits:0})}`,              "#D97706"],
//                   ["Revenue Saved",       `₹${Number(result.results.revenue_saved).toLocaleString("en-IN",{maximumFractionDigits:0})}`,                    "#059669"],
//                   ["Net ROI",             `₹${Number(result.results.net_roi).toLocaleString("en-IN",{maximumFractionDigits:0})}`,                          "#4361EE"],
//                   ["ROI %",               `${result.results.roi_pct}%`,                                                                                    "#7209B7"],
//                 ].map(([l,v,c]) => (
//                   <div key={l} className="roi-row">
//                     <span className="roi-label">{l}</span>
//                     <span className="roi-value" style={{color:c}}>{v}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="card">
//                 <div className="card-title"><Icon.Chart /> Revenue Waterfall</div>
//                 <div className="waterfall">
//                   {result.waterfall.map((w) => {
//                     const h = Math.max(20,(Math.abs(w.value)/maxWf)*150);
//                     return (
//                       <div key={w.label} className="wf-bar-wrap">
//                         <div className="wf-value" style={{color:w.color}}>
//                           ₹{Math.abs(w.value)>=1e6?`${(w.value/1e6).toFixed(1)}M`:Math.abs(w.value)>=1e3?`${(w.value/1e3).toFixed(0)}K`:w.value}
//                         </div>
//                         <div className="wf-bar" style={{ height:h, background:w.color }} />
//                         <div className="wf-label">{w.label}</div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { api, Icon } from "./Home";

export default function ROIPage() {
  const [form, setForm] = useState({
    total_customers: 7043, avg_monthly_rev: 64.76, churn_rate_pct: 27,
    retention_high: 25, retention_medium: 15,
    campaign_cost_high: 250, campaign_cost_medium: 100,
  });
  const [result, setResult] = useState(null);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        const res = await fetch(api("/roi/calculate"), {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ total_customers: form.total_customers, avg_monthly_rev: form.avg_monthly_rev, churn_rate_pct: form.churn_rate_pct, retention_high: form.retention_high, retention_medium: form.retention_medium, campaign_cost_high: form.campaign_cost_high, campaign_cost_medium: form.campaign_cost_medium }),
        });
        if (res.ok) setResult(await res.json());
      } catch (e) { console.error("ROI fetch error", e); }
    }, 400);
    return () => clearTimeout(t);
  }, [JSON.stringify(form)]);

  const maxWf = result ? Math.max(...result.waterfall.map((w) => Math.abs(w.value))) : 1;

  return (
    <div className="fade-in">
      <style>{`
        .roi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }
        @media (max-width: 800px) { .roi-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="roi-grid">
        <div className="card">
          <div className="card-title"><Icon.Filter /> Input Parameters</div>
          {[
            ["Total Customers",          "total_customers",     100, 1000000, 100],
            ["Campaign Cost HIGH (₹)",   "campaign_cost_high",   50,    5000,  10],
            ["Campaign Cost MEDIUM (₹)", "campaign_cost_medium", 20,    1000,   5],
          ].map(([l, k, min, max, step]) => (
            <div key={k} className="form-group" style={{ marginBottom: 12 }}>
              <label className="form-label">{l}</label>
              <input type="number" className="form-control" min={min} max={max} step={step} value={form[k]} onChange={(e) => set(k, +e.target.value)} />
            </div>
          ))}
          <div className="form-group" style={{ marginBottom: 12 }}>
            <label className="form-label">Avg Monthly Revenue (₹) — <b style={{ color: "var(--accent)" }}>₹{form.avg_monthly_rev}</b></label>
            <input type="range" min={10} max={200} step={0.5} value={form.avg_monthly_rev} onChange={(e) => set("avg_monthly_rev", +e.target.value)} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--muted)", marginTop: 2 }}><span>₹10</span><span>₹200</span></div>
          </div>
          {[
            ["Predicted Churn Rate (%)",  "churn_rate_pct",   1, 50],
            ["Retention Rate HIGH (%)",   "retention_high",   5, 60],
            ["Retention Rate MEDIUM (%)", "retention_medium", 5, 40],
          ].map(([l, k, min, max]) => (
            <div key={k} className="form-group" style={{ marginBottom: 12 }}>
              <label className="form-label">{l} — <b style={{ color: "var(--accent)" }}>{form[k]}%</b></label>
              <input type="range" min={min} max={max} value={form[k]} onChange={(e) => set(k, +e.target.value)} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--muted)", marginTop: 2 }}><span>{min}%</span><span>{max}%</span></div>
            </div>
          ))}
        </div>

        <div>
          {result && (
            <div className="fade-in">
              <div className="card" style={{ marginBottom: 16 }}>
                <div className="card-title"><Icon.ROI /> Results</div>
                {[
                  ["Predicted Churners",  result.results.predicted_churners.toLocaleString(),                                                               "#DC2626"],
                  ["HIGH Risk Customers", result.results.high_risk_customers.toLocaleString(),                                                              "#D97706"],
                  ["Revenue at Risk",     `₹${Number(result.results.annual_revenue_at_risk).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,        "#DC2626"],
                  ["Campaign Cost",       `₹${Number(result.results.total_campaign_cost).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,           "#D97706"],
                  ["Revenue Saved",       `₹${Number(result.results.revenue_saved).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,                 "#059669"],
                  ["Net ROI",             `₹${Number(result.results.net_roi).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,                       "#4361EE"],
                  ["ROI %",               `${result.results.roi_pct}%`,                                                                                     "#7209B7"],
                ].map(([l, v, c]) => (
                  <div key={l} className="roi-row">
                    <span className="roi-label">{l}</span>
                    <span className="roi-value" style={{ color: c }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="card">
                <div className="card-title"><Icon.Chart /> Revenue Waterfall</div>
                <div className="waterfall">
                  {result.waterfall.map((w) => {
                    const h = Math.max(16, (Math.abs(w.value) / maxWf) * 130);
                    const display = Math.abs(w.value) >= 1e6
                      ? `₹${(w.value / 1e6).toFixed(1)}M`
                      : Math.abs(w.value) >= 1e3
                      ? `₹${(w.value / 1e3).toFixed(0)}K`
                      : w.value;
                    return (
                      <div key={w.label} className="wf-bar-wrap">
                        <div className="wf-value" style={{ color: w.color }}>{display}</div>
                        <div className="wf-bar" style={{ height: h, background: w.color }} />
                        <div className="wf-label">{w.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {!result && (
            <div style={{ background: "var(--surface)", borderRadius: "var(--radius)", border: "1.5px dashed var(--border)", padding: "48px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>💰</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Adjust sliders to calculate ROI</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Results will update automatically</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}