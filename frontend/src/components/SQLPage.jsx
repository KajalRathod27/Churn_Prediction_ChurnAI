// import { useState } from "react";
// import { api, useFetch, Icon, Spinner, Table } from "./Home";

// export default function SQLPage() {
//   const [tab, setTab] = useState("kpis");
//   const [customSQL, setCustomSQL] = useState(
//     "SELECT contract, COUNT(*) AS customers,\n       ROUND(100.0*SUM(churn)/COUNT(*),2) AS churn_rate_pct\nFROM customers\nGROUP BY contract\nORDER BY churn_rate_pct DESC;"
//   );
//   const [customResult, setCustomResult] = useState(null);
//   const [customLoading, setCustomLoading] = useState(false);
//   const [customError, setCustomError] = useState(null);

//   const { data: kpis }       = useFetch("/sql/kpis");
//   const { data: highRisk }   = useFetch("/sql/high_risk_customers?min_monthly=60&limit=30");
//   const { data: contract }   = useFetch("/sql/churn_by_contract");
//   const { data: cohort }     = useFetch("/sql/tenure_cohort");
//   const { data: internet }   = useFetch("/sql/churn_by_internet");
//   const { data: schema }     = useFetch("/sql/schema_stats");
//   const { data: unactioned } = useFetch("/sql/unactioned_high_risk?limit=30");

//   const runCustom = async () => {
//     setCustomLoading(true); setCustomError(null); setCustomResult(null);
//     try {
//       const res = await fetch(api("/sql/custom"), {
//         method:"POST", headers:{"Content-Type":"application/json"},
//         body: JSON.stringify({ sql:customSQL }),
//       });
//       const d = await res.json();
//       if (!res.ok) setCustomError(d.detail || "SQL Error");
//       else setCustomResult(d);
//     } catch (e) { setCustomError(String(e)); } finally { setCustomLoading(false); }
//   };

//   const TABS = [["kpis","📊 KPIs"],["highrisk","🚨 High Risk"],["trends","📈 Trends"],["unact","⚠️ Unactioned"],["schema","⚙️ Schema"],["custom","✍️ Custom SQL"]];

//   return (
//     <div className="fade-in">
//       <div className="sql-tabs">
//         {TABS.map(([k,l]) => (
//           <button key={k} className={`sql-tab ${tab===k?"active":""}`} onClick={() => setTab(k)}>{l}</button>
//         ))}
//       </div>

//       {tab === "kpis" && kpis && (
//         <div className="fade-in">
//           <div className="kpi-grid" style={{ gridTemplateColumns:"repeat(6,1fr)" }}>
//             {[
//               ["Total",      Number(kpis.total).toLocaleString(),          "blue"],
//               ["Churned",    Number(kpis.actual_churned).toLocaleString(), "red"],
//               ["HIGH Risk",  Number(kpis.high_risk).toLocaleString(),      "red"],
//               ["MED Risk",   Number(kpis.med_risk).toLocaleString(),       "yellow"],
//               ["LOW Risk",   Number(kpis.low_risk??0).toLocaleString(),    "green"],
//               ["Rev at Risk",`₹${Number(kpis.rev_at_risk).toLocaleString("en-IN",{maximumFractionDigits:0})}`,"blue"],
//             ].map(([l,v,c]) => (
//               <div key={l} className={`kpi-card ${c}`}>
//                 <div className="kpi-label">{l}</div>
//                 <div className="kpi-value" style={{fontSize:"1.4rem"}}>{v}</div>
//               </div>
//             ))}
//           </div>
//           <div className="grid-2" style={{ marginTop:20 }}>
//             <div className="card">
//               <div className="card-title">📊 Risk Segment Breakdown</div>
//               {[["HIGH",Number(kpis.high_risk),"#DC2626"],["MEDIUM",Number(kpis.med_risk),"#D97706"],["LOW",Number(kpis.low_risk??0),"#059669"]].map(([label,val,color]) => {
//                 const total = Number(kpis.total)||1;
//                 const pct = ((val/total)*100).toFixed(1);
//                 return (
//                   <div key={label} style={{ marginBottom:14 }}>
//                     <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
//                       <span style={{ fontWeight:700, fontSize:13, color }}>{label} RISK</span>
//                       <span style={{ fontFamily:"JetBrains Mono", fontWeight:700, fontSize:13 }}>{val.toLocaleString()} <span style={{color:"var(--muted)",fontWeight:400}}>({pct}%)</span></span>
//                     </div>
//                     <div className="progress-wrap" style={{height:10}}>
//                       <div className="progress-bar" style={{ width:`${pct}%`, background:color }} />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="card">
//               <div className="card-title">💰 Revenue Summary</div>
//               {[
//                 ["Annual Rev at Risk (HIGH)", `₹${Number(kpis.rev_at_risk).toLocaleString("en-IN",{maximumFractionDigits:0})}`, "#DC2626"],
//                 ["Total Customers",           Number(kpis.total).toLocaleString(),                    "#4361EE"],
//                 ["Actual Churned",            Number(kpis.actual_churned).toLocaleString(),           "#DC2626"],
//                 ["Churn Rate",                `${((kpis.actual_churned/kpis.total)*100).toFixed(1)}%`,"#D97706"],
//               ].map(([l,v,c]) => (
//                 <div key={l} className="roi-row"><span className="roi-label">{l}</span><span className="roi-value" style={{color:c}}>{v}</span></div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {tab === "highrisk" && highRisk && (
//         <div className="fade-in">
//           <div style={{ marginBottom:14 }}>
//             <span className="status-chip chip-red"><Icon.Alert /> {highRisk.count} HIGH-risk customers · Monthly charges &gt; ₹60</span>
//           </div>
//           <div className="card">
//             <Table cols={["customer_id","tenure","monthly_charges","contract","internet_service","churn_probability_pct","annual_revenue_at_risk"]} rows={highRisk.rows} />
//           </div>
//         </div>
//       )}

//       {tab === "trends" && (
//         <div className="fade-in">
//           <div className="grid-2">
//             <div className="card">
//               <div className="card-title">📋 Churn by Contract</div>
//               {contract ? <Table cols={["contract","total","churned","churn_rate_pct","avg_monthly_charges","avg_tenure_months"]} rows={contract} /> : <Spinner />}
//             </div>
//             <div className="card">
//               <div className="card-title">🌐 Churn by Internet Service</div>
//               {internet ? <Table cols={["internet_service","customers","churned","churn_rate_pct","avg_charges","high_risk_count"]} rows={internet} /> : <Spinner />}
//             </div>
//           </div>
//           <div className="card">
//             <div className="card-title">📅 Tenure Cohort Analysis</div>
//             {cohort ? (<>
//               <Table cols={["tenure_group","customers","churned","churn_rate_pct","avg_charges"]} rows={cohort} />
//               <div style={{ marginTop:20 }}>
//                 {cohort.map((row,i) => {
//                   const colors=["#DC2626","#D97706","#059669","#22C55E"];
//                   return (
//                     <div key={i} style={{ marginBottom:10 }}>
//                       <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4, fontSize:12 }}>
//                         <span style={{fontWeight:600}}>{row.tenure_group}</span>
//                         <span style={{ fontFamily:"JetBrains Mono", color:colors[i], fontWeight:700 }}>{row.churn_rate_pct}%</span>
//                       </div>
//                       <div className="progress-wrap">
//                         <div className="progress-bar" style={{ width:`${row.churn_rate_pct}%`, background:colors[i] }} />
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </>) : <Spinner />}
//           </div>
//         </div>
//       )}

//       {tab === "unact" && unactioned && (
//         <div className="fade-in">
//           <div style={{ marginBottom:14 }}>
//             <span className="status-chip chip-red">⚠️ {unactioned.count} HIGH-risk customers with NO action taken yet!</span>
//           </div>
//           <div className="card">
//             <Table cols={["customer_id","tenure","monthly_charges","contract","churn_pct","annual_rev"]} rows={unactioned.rows} />
//           </div>
//         </div>
//       )}

//       {tab === "schema" && schema && (
//         <div className="fade-in grid-2">
//           <div className="card">
//             <div className="card-title">📋 `customers` Table</div>
//             {Object.entries(schema.customers_table).map(([k,v]) => (
//               <div key={k} className="roi-row"><span className="roi-label">{k.replace(/_/g," ")}</span><span className="roi-value" style={{color:"#4361EE"}}>{Number(v).toLocaleString()}</span></div>
//             ))}
//             <div className="code-block" style={{ marginTop:16, fontSize:11 }}>
//               {`CREATE TABLE customers (\n  customer_id     TEXT PRIMARY KEY,\n  tenure          INTEGER,\n  monthly_charges REAL,\n  contract        TEXT,\n  internet_service TEXT,\n  churn           INTEGER,\n  ...16 columns total\n);`}
//             </div>
//           </div>
//           <div className="card">
//             <div className="card-title">🤖 `predictions` Table</div>
//             {Object.entries(schema.predictions_table).map(([k,v]) => (
//               <div key={k} className="roi-row"><span className="roi-label">{k.replace(/_/g," ")}</span><span className="roi-value" style={{color:"#7209B7"}}>{typeof v==="number"?Number(v).toLocaleString():v}</span></div>
//             ))}
//             <div className="code-block" style={{ marginTop:16, fontSize:11 }}>
//               {`CREATE TABLE predictions (\n  prediction_id    INTEGER PRIMARY KEY,\n  customer_id      TEXT,\n  model_version    TEXT,\n  churn_prob       REAL,\n  risk_category    TEXT,\n  action_taken     TEXT\n);`}
//             </div>
//           </div>
//         </div>
//       )}

//       {tab === "custom" && (
//         <div className="fade-in">
//           <div className="card" style={{ marginBottom:18 }}>
//             <div className="card-title">✍️ Custom SQL Query</div>
//             <p style={{ fontSize:12, color:"var(--muted)", marginBottom:12 }}>
//               Tables: <code style={{background:"#EEF2FF",color:"#4361EE",padding:"2px 6px",borderRadius:4}}>customers</code> and <code style={{background:"#EEF2FF",color:"#4361EE",padding:"2px 6px",borderRadius:4}}>predictions</code> — JOIN on <code style={{background:"#EEF2FF",color:"#4361EE",padding:"2px 6px",borderRadius:4}}>customer_id</code>. Only SELECT is permitted.
//             </p>
//             <textarea className="form-control" style={{ fontFamily:"JetBrains Mono", fontSize:13, height:160, resize:"vertical" }} value={customSQL} onChange={(e) => setCustomSQL(e.target.value)} />
//             <div style={{ display:"flex", gap:10, marginTop:12 }}>
//               <button className="btn btn-primary" onClick={runCustom} disabled={customLoading}>
//                 {customLoading ? <><div className="spinner" style={{width:15,height:15,borderWidth:2}}/> Running...</> : <><Icon.Play /> Execute</>}
//               </button>
//               {customResult && (
//                 <button className="btn btn-outline" onClick={() => {
//                   const csv = [Object.keys(customResult.data[0]).join(","),...customResult.data.map((r) => Object.values(r).join(","))].join("\n");
//                   const blob = new Blob([csv],{type:"text/csv"});
//                   const a = document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="query_result.csv"; a.click();
//                 }}>
//                   <Icon.Download /> Download
//                 </button>
//               )}
//             </div>
//             {customError && (
//               <div style={{ marginTop:12, padding:"10px 14px", background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:8, fontSize:13, color:"#DC2626" }}>
//                 ❌ {customError}
//               </div>
//             )}
//           </div>
//           {customResult && (
//             <div className="card fade-in">
//               <div className="card-title"><Icon.Check /> {customResult.rows} rows returned</div>
//               <Table cols={Object.keys(customResult.data[0]||{})} rows={customResult.data} />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { api, useFetch, Icon, Spinner, Table } from "./Home";

export default function SQLPage() {
  const [tab, setTab] = useState("kpis");
  const [customSQL, setCustomSQL] = useState(
    "SELECT contract, COUNT(*) AS customers,\n       ROUND(100.0*SUM(churn)/COUNT(*),2) AS churn_rate_pct\nFROM customers\nGROUP BY contract\nORDER BY churn_rate_pct DESC;"
  );
  const [customResult, setCustomResult] = useState(null);
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState(null);

  const { data: kpis }       = useFetch("/sql/kpis");
  const { data: highRisk }   = useFetch("/sql/high_risk_customers?min_monthly=60&limit=30");
  const { data: contract }   = useFetch("/sql/churn_by_contract");
  const { data: cohort }     = useFetch("/sql/tenure_cohort");
  const { data: internet }   = useFetch("/sql/churn_by_internet");
  const { data: schema }     = useFetch("/sql/schema_stats");
  const { data: unactioned } = useFetch("/sql/unactioned_high_risk?limit=30");

  const runCustom = async () => {
    setCustomLoading(true); setCustomError(null); setCustomResult(null);
    try {
      const res = await fetch(api("/sql/custom"), {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql: customSQL }),
      });
      const d = await res.json();
      if (!res.ok) setCustomError(d.detail || "SQL Error");
      else setCustomResult(d);
    } catch (e) { setCustomError(String(e)); } finally { setCustomLoading(false); }
  };

  const TABS = [
    ["kpis", "📊 KPIs"], ["highrisk", "🚨 High Risk"], ["trends", "📈 Trends"],
    ["unact", "⚠️ Unactioned"], ["schema", "⚙️ Schema"], ["custom", "✍️ Custom SQL"],
  ];

  return (
    <div className="fade-in">
      <style>{`
        .sql-schema-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .sql-trends-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .sql-kpi-summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 18px; }
        @media (max-width: 800px) {
          .sql-schema-grid, .sql-trends-grid, .sql-kpi-summary-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sql-tabs">
        {TABS.map(([k, l]) => (
          <button key={k} className={`sql-tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {/* ── KPIs ── */}
      {tab === "kpis" && kpis && (
        <div className="fade-in">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 18 }}>
            {[
              ["Total",       Number(kpis.total).toLocaleString(),                    "blue"],
              ["Churned",     Number(kpis.actual_churned).toLocaleString(),           "red"],
              ["HIGH Risk",   Number(kpis.high_risk).toLocaleString(),                "red"],
              ["MED Risk",    Number(kpis.med_risk).toLocaleString(),                 "yellow"],
              ["LOW Risk",    Number(kpis.low_risk ?? 0).toLocaleString(),            "green"],
              ["Rev at Risk", `₹${Number(kpis.rev_at_risk).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, "blue"],
            ].map(([l, v, c]) => (
              <div key={l} className={`kpi-card ${c}`}>
                <div className="kpi-label">{l}</div>
                <div className="kpi-value" style={{ fontSize: "1.3rem" }}>{v}</div>
              </div>
            ))}
          </div>
          <div className="sql-kpi-summary-grid">
            <div className="card">
              <div className="card-title">📊 Risk Segment Breakdown</div>
              {[["HIGH", Number(kpis.high_risk), "#DC2626"], ["MEDIUM", Number(kpis.med_risk), "#D97706"], ["LOW", Number(kpis.low_risk ?? 0), "#059669"]].map(([label, val, color]) => {
                const total = Number(kpis.total) || 1;
                const pct = ((val / total) * 100).toFixed(1);
                return (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, flexWrap: "wrap", gap: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 12, color }}>{label} RISK</span>
                      <span style={{ fontFamily: "JetBrains Mono", fontWeight: 700, fontSize: 12 }}>{val.toLocaleString()} <span style={{ color: "var(--muted)", fontWeight: 400 }}>({pct}%)</span></span>
                    </div>
                    <div className="progress-wrap">
                      <div className="progress-bar" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="card">
              <div className="card-title">💰 Revenue Summary</div>
              {[
                ["Annual Rev at Risk (HIGH)", `₹${Number(kpis.rev_at_risk).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, "#DC2626"],
                ["Total Customers",           Number(kpis.total).toLocaleString(),                    "#4361EE"],
                ["Actual Churned",            Number(kpis.actual_churned).toLocaleString(),           "#DC2626"],
                ["Churn Rate",                `${((kpis.actual_churned / kpis.total) * 100).toFixed(1)}%`, "#D97706"],
              ].map(([l, v, c]) => (
                <div key={l} className="roi-row">
                  <span className="roi-label">{l}</span>
                  <span className="roi-value" style={{ color: c }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── HIGH RISK ── */}
      {tab === "highrisk" && highRisk && (
        <div className="fade-in">
          <div style={{ marginBottom: 12 }}>
            <span className="status-chip chip-red"><Icon.Alert /> {highRisk.count} HIGH-risk · Monthly charges &gt; ₹60</span>
          </div>
          <div className="card">
            <Table cols={["customer_id", "tenure", "monthly_charges", "contract", "internet_service", "churn_probability_pct", "annual_revenue_at_risk"]} rows={highRisk.rows} />
          </div>
        </div>
      )}

      {/* ── TRENDS ── */}
      {tab === "trends" && (
        <div className="fade-in">
          <div className="sql-trends-grid" style={{ marginBottom: 16 }}>
            <div className="card">
              <div className="card-title">📋 Churn by Contract</div>
              {contract ? <Table cols={["contract", "total", "churned", "churn_rate_pct", "avg_monthly_charges", "avg_tenure_months"]} rows={contract} /> : <Spinner />}
            </div>
            <div className="card">
              <div className="card-title">🌐 Churn by Internet Service</div>
              {internet ? <Table cols={["internet_service", "customers", "churned", "churn_rate_pct", "avg_charges", "high_risk_count"]} rows={internet} /> : <Spinner />}
            </div>
          </div>
          <div className="card">
            <div className="card-title">📅 Tenure Cohort Analysis</div>
            {cohort ? (
              <>
                <Table cols={["tenure_group", "customers", "churned", "churn_rate_pct", "avg_charges"]} rows={cohort} />
                <div style={{ marginTop: 16 }}>
                  {cohort.map((row, i) => {
                    const colors = ["#DC2626", "#D97706", "#059669", "#22C55E"];
                    return (
                      <div key={i} style={{ marginBottom: 9 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 11, flexWrap: "wrap", gap: 4 }}>
                          <span style={{ fontWeight: 600 }}>{row.tenure_group}</span>
                          <span style={{ fontFamily: "JetBrains Mono", color: colors[i], fontWeight: 700 }}>{row.churn_rate_pct}%</span>
                        </div>
                        <div className="progress-wrap">
                          <div className="progress-bar" style={{ width: `${row.churn_rate_pct}%`, background: colors[i] }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : <Spinner />}
          </div>
        </div>
      )}

      {/* ── UNACTIONED ── */}
      {tab === "unact" && unactioned && (
        <div className="fade-in">
          <div style={{ marginBottom: 12 }}>
            <span className="status-chip chip-red">⚠️ {unactioned.count} HIGH-risk with NO action taken!</span>
          </div>
          <div className="card">
            <Table cols={["customer_id", "tenure", "monthly_charges", "contract", "churn_pct", "annual_rev"]} rows={unactioned.rows} />
          </div>
        </div>
      )}

      {/* ── SCHEMA ── */}
      {tab === "schema" && schema && (
        <div className="fade-in sql-schema-grid">
          <div className="card">
            <div className="card-title">📋 `customers` Table</div>
            {Object.entries(schema.customers_table).map(([k, v]) => (
              <div key={k} className="roi-row">
                <span className="roi-label">{k.replace(/_/g, " ")}</span>
                <span className="roi-value" style={{ color: "#4361EE" }}>{Number(v).toLocaleString()}</span>
              </div>
            ))}
            <div className="code-block" style={{ marginTop: 14, fontSize: 10 }}>
              {`CREATE TABLE customers (\n  customer_id     TEXT PRIMARY KEY,\n  tenure          INTEGER,\n  monthly_charges REAL,\n  contract        TEXT,\n  internet_service TEXT,\n  churn           INTEGER,\n  ...16 columns total\n);`}
            </div>
          </div>
          <div className="card">
            <div className="card-title">🤖 `predictions` Table</div>
            {Object.entries(schema.predictions_table).map(([k, v]) => (
              <div key={k} className="roi-row">
                <span className="roi-label">{k.replace(/_/g, " ")}</span>
                <span className="roi-value" style={{ color: "#7209B7" }}>{typeof v === "number" ? Number(v).toLocaleString() : v}</span>
              </div>
            ))}
            <div className="code-block" style={{ marginTop: 14, fontSize: 10 }}>
              {`CREATE TABLE predictions (\n  prediction_id    INTEGER PRIMARY KEY,\n  customer_id      TEXT,\n  model_version    TEXT,\n  churn_prob       REAL,\n  risk_category    TEXT,\n  action_taken     TEXT\n);`}
            </div>
          </div>
        </div>
      )}

      {/* ── CUSTOM SQL ── */}
      {tab === "custom" && (
        <div className="fade-in">
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-title">✍️ Custom SQL Query</div>
            <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>
              Tables: <code style={{ background: "#EEF2FF", color: "#4361EE", padding: "2px 6px", borderRadius: 4 }}>customers</code> and <code style={{ background: "#EEF2FF", color: "#4361EE", padding: "2px 6px", borderRadius: 4 }}>predictions</code> — JOIN on <code style={{ background: "#EEF2FF", color: "#4361EE", padding: "2px 6px", borderRadius: 4 }}>customer_id</code>. Only SELECT permitted.
            </p>
            <textarea className="form-control" style={{ fontFamily: "JetBrains Mono", fontSize: 12, height: 140, resize: "vertical" }} value={customSQL} onChange={(e) => setCustomSQL(e.target.value)} />
            <div style={{ display: "flex", gap: 9, marginTop: 10, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={runCustom} disabled={customLoading}>
                {customLoading ? <><div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Running...</> : <><Icon.Play /> Execute</>}
              </button>
              {customResult && (
                <button className="btn btn-outline" onClick={() => {
                  const csv = [Object.keys(customResult.data[0]).join(","), ...customResult.data.map((r) => Object.values(r).join(","))].join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "query_result.csv"; a.click();
                }}>
                  <Icon.Download /> Download
                </button>
              )}
            </div>
            {customError && (
              <div style={{ marginTop: 10, padding: "9px 13px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, fontSize: 12, color: "#DC2626" }}>
                ❌ {customError}
              </div>
            )}
          </div>
          {customResult && (
            <div className="card fade-in">
              <div className="card-title"><Icon.Check /> {customResult.rows} rows returned</div>
              <Table cols={Object.keys(customResult.data[0] || {})} rows={customResult.data} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}