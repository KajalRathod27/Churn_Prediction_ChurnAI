# ============================================================
# app.py  — Complete Churn Prediction System
# UPGRADED: Light gradient UI + Full SQL Analytics
# Run: streamlit run app.py
# ============================================================

import streamlit as st
import pandas as pd
import numpy as np
import joblib, os, json, sqlite3, warnings
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
warnings.filterwarnings("ignore")

st.set_page_config(
    page_title="Churn AI", page_icon="🔮",
    layout="wide", initial_sidebar_state="expanded"
)

# ═══════════════════════════════════════════════════════════════
# LIGHT GRADIENT THEME
# ═══════════════════════════════════════════════════════════════
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@400;600&family=Manrope:wght@300;400;600;700&display=swap');

html, body, [class*="css"] { font-family: 'Manrope', sans-serif; }

/* Main background — soft lavender → white → mint */
.stApp {
    background: linear-gradient(145deg, #eef2ff 0%, #f8f7ff 30%, #fefcff 60%, #f0fdfa 100%);
    color: #1e293b;
}

/* Sidebar */
[data-testid="stSidebar"] {
    background: linear-gradient(180deg, #ffffff 0%, #f5f3ff 100%) !important;
    border-right: 1px solid #ddd6fe !important;
    box-shadow: 3px 0 20px rgba(109,40,217,0.06) !important;
}

/* KPI Cards */
.kpi {
    background: linear-gradient(135deg, #ffffff 0%, #faf8ff 100%);
    border: 1.5px solid #e0e7ff; border-radius: 18px;
    padding: 24px 20px; text-align: center; margin: 4px 0;
    box-shadow: 0 4px 20px rgba(99,102,241,0.10);
    transition: transform .2s, box-shadow .2s;
}
.kpi:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(99,102,241,0.16); }
.kpi-val { font-family:'Syne',sans-serif; font-size:2rem; font-weight:800; line-height:1; }
.kpi-lbl { font-size:0.68rem; color:#a5b4fc; letter-spacing:2px; text-transform:uppercase; margin-top:8px; }

/* Risk Badge */
.risk-box { border-radius:22px; border:2px solid; padding:32px 28px; text-align:center; margin:8px 0; }
.risk-pct { font-family:'Syne',sans-serif; font-size:4.5rem; font-weight:800; line-height:1; }
.risk-tag { font-size:1rem; font-weight:700; letter-spacing:3px; text-transform:uppercase; margin-top:10px; }

/* Buttons */
.stButton>button {
    background: linear-gradient(135deg,#6366f1,#8b5cf6) !important;
    color:#fff !important; border:none !important; border-radius:11px !important;
    font-family:'Syne' !important; font-weight:700 !important; padding:.65rem 1.8rem !important;
    box-shadow: 0 4px 16px rgba(99,102,241,0.35) !important; transition: all .2s !important;
}
.stButton>button:hover { filter:brightness(1.1); transform:translateY(-2px); }

/* Tabs */
.stTabs [data-baseweb="tab-list"] {
    background:#ffffff; border-radius:14px; padding:5px; gap:4px;
    border:1.5px solid #e0e7ff; box-shadow:0 2px 12px rgba(99,102,241,0.08);
}
.stTabs [data-baseweb="tab"] {
    color:#94a3b8 !important; border-radius:10px !important;
    font-family:'Syne' !important; font-weight:700 !important; padding:8px 16px !important;
}
.stTabs [aria-selected="true"] {
    background:linear-gradient(135deg,#6366f1,#8b5cf6) !important;
    color:#fff !important; box-shadow:0 2px 10px rgba(99,102,241,0.30) !important;
}

/* Code */
code {
    font-family:'JetBrains Mono',monospace !important;
    background:#eef2ff !important; color:#4f46e5 !important;
    padding:2px 7px !important; border-radius:5px !important; font-size:.83rem !important;
}

/* Typography */
h1,h2,h3 { font-family:'Syne',sans-serif !important; color:#1e293b !important; }
p, li { color:#475569; }
hr  { border-color:#e0e7ff !important; }
label { color:#64748b !important; font-size:.82rem !important; }

/* Expanders */
.streamlit-expanderHeader {
    background:#fafaff !important; border-radius:10px !important;
    color:#1e293b !important; font-family:'Syne' !important; font-weight:700 !important;
}
[data-testid="stExpander"] {
    border:1.5px solid #e0e7ff !important; border-radius:12px !important; background:#ffffff !important;
}

/* Inputs */
[data-testid="stSelectbox"] > div > div,
[data-testid="stNumberInput"] > div > div > input,
.stTextArea textarea {
    background:#ffffff !important; border:1.5px solid #e0e7ff !important;
    border-radius:9px !important; color:#1e293b !important;
}

/* Metric widget */
[data-testid="stMetric"] {
    background:#ffffff; border:1.5px solid #e0e7ff; border-radius:14px; padding:14px;
    box-shadow:0 2px 10px rgba(99,102,241,0.06);
}
[data-testid="stMetricLabel"] { color:#64748b !important; }

/* Reusable card types */
.info-card {
    background:#ffffff; border:1px solid #e0e7ff; border-left:4px solid;
    border-radius:0 12px 12px 0; padding:11px 16px; margin:5px 0;
    box-shadow:0 1px 6px rgba(99,102,241,0.05);
}
.row-card {
    display:flex; justify-content:space-between; align-items:center;
    background:#ffffff; border:1px solid #e2e8f0; border-radius:9px;
    padding:9px 14px; margin:4px 0; box-shadow:0 1px 4px rgba(0,0,0,0.03);
}
.db-banner {
    background:linear-gradient(135deg,#f0f4ff,#f5f3ff);
    border:1.5px solid #e0e7ff; border-left:4px solid #6366f1;
    border-radius:0 12px 12px 0; padding:12px 18px; margin-bottom:14px;
    font-size:13px; color:#4f46e5;
}

/* Status chips */
.chip-ok  { background:#f0fdf4; color:#16a34a; border:1px solid #bbf7d0; border-radius:6px; padding:4px 9px; font-size:11px; display:inline-block; margin:2px 0; }
.chip-err { background:#fff1f2; color:#dc2626; border:1px solid #fecdd3; border-radius:6px; padding:4px 9px; font-size:11px; display:inline-block; margin:2px 0; }

/* Alerts */
.stAlert { border-radius:10px !important; }
</style>
""", unsafe_allow_html=True)


# ═══════════════════════════════════════════════════════════════
# HELPERS & LOADERS
# ═══════════════════════════════════════════════════════════════
@st.cache_resource(show_spinner=False)
def load_model(path):
    return joblib.load(path) if os.path.exists(path) else None

@st.cache_data(show_spinner=False)
def load_df(path):
    return pd.read_csv(path) if os.path.exists(path) else None

@st.cache_data(show_spinner=False)
def load_feature_cols():
    p = "models/feature_columns.json"
    if os.path.exists(p):
        with open(p) as f: return json.load(f)
    m = load_model("models/xgboost.pkl")
    if m:
        try: return m.get_booster().feature_names
        except: pass
    return None

def align_features(X, model_cols):
    for c in model_cols:
        if c not in X.columns: X[c] = 0
    X = X[model_cols]
    bc = X.select_dtypes(include='bool').columns
    if len(bc): X[bc] = X[bc].astype(int)
    return X.fillna(0)

def get_risk(p):
    if p >= .70: return "HIGH",   "#ef4444", "#fff1f2", "#fecdd3"
    if p >= .40: return "MEDIUM", "#f59e0b", "#fffbeb", "#fde68a"
    return              "LOW",    "#10b981", "#f0fdf4", "#bbf7d0"

def img_or_placeholder(path, caption=""):
    if os.path.exists(path):
        st.image(path, caption=caption, use_container_width=True)
    else:
        st.markdown(
            f"<div style='background:#fafaff;border:1.5px dashed #c7d2fe;"
            f"border-radius:12px;padding:38px;text-align:center;color:#c7d2fe'>"
            f"📊 Run notebook to generate<br>"
            f"<code style='color:#6366f1;font-size:11px'>{path}</code></div>",
            unsafe_allow_html=True)

def lax(figsize=(11, 4)):
    """Return light-themed fig + ax."""
    fig, ax = plt.subplots(figsize=figsize, facecolor="#ffffff")
    ax.set_facecolor("#fafaff")
    ax.tick_params(colors="#64748b")
    ax.yaxis.grid(True, color="#f1f5f9", linestyle="--", alpha=.9)
    for sp in ["top","right"]: ax.spines[sp].set_visible(False)
    for sp in ["bottom","left"]: ax.spines[sp].set_color("#e0e7ff")
    return fig, ax

def laxs(axes):
    for ax in (axes if hasattr(axes, '__iter__') else [axes]):
        ax.set_facecolor("#fafaff")
        ax.tick_params(colors="#64748b")
        ax.yaxis.grid(True, color="#f1f5f9", linestyle="--", alpha=.9)
        for sp in ["top","right"]: ax.spines[sp].set_visible(False)
        for sp in ["bottom","left"]: ax.spines[sp].set_color("#e0e7ff")


# ═══════════════════════════════════════════════════════════════
# SQL — AUTO-BUILD SQLITE DATABASE
# Implements create_tables.sql schema in Python/SQLite
# Loads XGBoost predictions automatically
# ═══════════════════════════════════════════════════════════════
DB_PATH = "data/churn_analytics.db"

@st.cache_resource(show_spinner=False)
def get_db():
    """
    Python implementation of sql/create_tables.sql.
    Builds SQLite DB from raw data + XGBoost predictions.
    Returns (connection, status_message).
    """
    os.makedirs("data", exist_ok=True)
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    cur  = conn.cursor()
    # Already populated?
    try:
        n = cur.execute("SELECT COUNT(*) FROM customers").fetchone()[0]
        if n > 0:
            return conn, f"✅ {n:,} customers loaded"
    except: pass

    # ── Schema from create_tables.sql ─────────────────────────
    cur.executescript("""
        DROP TABLE IF EXISTS predictions;
        DROP TABLE IF EXISTS customers;
        CREATE TABLE customers (
            customer_id       TEXT    PRIMARY KEY,
            tenure            INTEGER NOT NULL,
            monthly_charges   REAL    NOT NULL,
            total_charges     REAL,
            contract          TEXT    NOT NULL,
            internet_service  TEXT,
            payment_method    TEXT,
            senior_citizen    INTEGER DEFAULT 0,
            partner           INTEGER DEFAULT 0,
            dependents        INTEGER DEFAULT 0,
            phone_service     INTEGER DEFAULT 1,
            paperless_billing INTEGER DEFAULT 0,
            online_security   TEXT,
            tech_support      TEXT,
            streaming_tv      TEXT,
            streaming_movies  TEXT,
            churn             INTEGER DEFAULT 0
        );
        CREATE TABLE predictions (
            prediction_id    INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id      TEXT    REFERENCES customers(customer_id),
            model_version    TEXT    DEFAULT 'xgboost_v1',
            churn_prob       REAL    NOT NULL,
            churn_prediction INTEGER NOT NULL,
            risk_category    TEXT    NOT NULL,
            action_taken     TEXT,
            outcome          TEXT
        );
        CREATE INDEX IF NOT EXISTS idx_contract ON customers(contract);
        CREATE INDEX IF NOT EXISTS idx_churn    ON customers(churn);
        CREATE INDEX IF NOT EXISTS idx_prob     ON predictions(churn_prob DESC);
        CREATE INDEX IF NOT EXISTS idx_risk     ON predictions(risk_category);
    """)
    conn.commit()

    raw_p  = "data/raw/teleco_churn.csv"
    feat_p = "data/processed/featured_data.csv"
    mdl_p  = "models/xgboost.pkl"
    if not (os.path.exists(raw_p) and os.path.exists(feat_p) and os.path.exists(mdl_p)):
        return conn, "⚠️ Run pipeline first → preprocessing → feature_eng → train"

    df_r = pd.read_csv(raw_p)
    df_r["TotalCharges"] = pd.to_numeric(df_r["TotalCharges"], errors="coerce")
    df_r["TotalCharges"].fillna(df_r["TotalCharges"].median(), inplace=True)
    df_f = pd.read_csv(feat_p)
    mdl  = joblib.load(mdl_p)
    X    = df_f.drop("Churn", axis=1)
    try:
        mc = mdl.get_booster().feature_names
        for c in mc:
            if c not in X.columns: X[c] = 0
        X = X[mc].fillna(0)
    except: pass
    probs = mdl.predict_proba(X)[:,1]
    risks = pd.cut(probs, bins=[-0.1,.4,.7,1.01], labels=["LOW","MEDIUM","HIGH"]).astype(str)

    pd.DataFrame({
        "customer_id":df_r["customerID"], "tenure":df_r["tenure"].astype(int),
        "monthly_charges":df_r["MonthlyCharges"].round(2),
        "total_charges":df_r["TotalCharges"].round(2),
        "contract":df_r["Contract"], "internet_service":df_r["InternetService"],
        "payment_method":df_r["PaymentMethod"],
        "senior_citizen":df_r["SeniorCitizen"].astype(int),
        "partner":df_r["Partner"].map({"Yes":1,"No":0}),
        "dependents":df_r["Dependents"].map({"Yes":1,"No":0}),
        "phone_service":df_r["PhoneService"].map({"Yes":1,"No":0}),
        "paperless_billing":df_r["PaperlessBilling"].map({"Yes":1,"No":0}),
        "online_security":df_r["OnlineSecurity"], "tech_support":df_r["TechSupport"],
        "streaming_tv":df_r["StreamingTV"], "streaming_movies":df_r["StreamingMovies"],
        "churn":df_r["Churn"].map({"Yes":1,"No":0}),
    }).to_sql("customers", conn, if_exists="append", index=False)

    pd.DataFrame({
        "customer_id":df_r["customerID"], "model_version":"xgboost_v1",
        "churn_prob":probs.round(4), "churn_prediction":(probs>=0.5).astype(int),
        "risk_category":risks, "action_taken":None, "outcome":None,
    }).to_sql("predictions", conn, if_exists="append", index=False)
    conn.commit()
    n = cur.execute("SELECT COUNT(*) FROM customers").fetchone()[0]
    return conn, f"✅ {n:,} customers loaded"

def run_sql(sql):
    try:
        db, _ = get_db()
        return pd.read_sql_query(sql, db), None
    except Exception as e:
        return pd.DataFrame(), str(e)


# ── Load assets ───────────────────────────────────────────────
xgb_model = load_model("models/xgboost.pkl")
rf_model  = load_model("models/random_forest.pkl")
lr_model  = load_model("models/logistic_regression.pkl")
df_feat   = load_df("data/processed/featured_data.csv")
df_raw    = load_df("data/raw/teleco_churn.csv")
feat_cols = load_feature_cols()
models_available = {k:v for k,v in {"XGBoost":xgb_model,
    "Random Forest":rf_model,"Logistic Regression":lr_model}.items() if v}


# ═══════════════════════════════════════════════════════════════
# SIDEBAR
# ═══════════════════════════════════════════════════════════════
with st.sidebar:
    st.markdown(
        "<div style='font-family:Syne;font-size:1.4rem;font-weight:800;"
        "background:linear-gradient(135deg,#6366f1,#a855f7);-webkit-background-clip:text;"
        "-webkit-text-fill-color:transparent;padding:14px 0 2px'>🔮 Churn AI</div>",
        unsafe_allow_html=True)
    st.markdown("<div style='font-size:11px;color:#94a3b8;padding-bottom:14px'>"
                "Enterprise ML Platform</div>", unsafe_allow_html=True)
    st.divider()

    page = st.radio("", [
        "🏠  Dashboard",
        "🎯  Live Prediction",
        "📊  EDA & Charts",
        "🤖  Model Reports",
        "📦  Batch Predict",
        "💰  ROI Calculator",
        "🗄️  SQL Analytics",
    ], label_visibility="collapsed")

    st.divider()
    st.markdown("**System Status**")
    for name, obj in [("XGBoost",xgb_model),("Random Forest",rf_model),
                       ("Log. Reg.",lr_model),("Feature Data",df_feat),("Raw Data",df_raw)]:
        ok = obj is not None
        st.markdown(f"<div class='{'chip-ok' if ok else 'chip-err'}'>"
                    f"{'✅' if ok else '❌'} {name}</div>", unsafe_allow_html=True)
    if df_feat is not None:
        st.markdown(f"<div style='font-size:11px;color:#94a3b8;margin-top:8px'>"
                    f"📊 {len(df_feat):,} rows · {df_feat.shape[1]} features</div>",
                    unsafe_allow_html=True)


# ═══════════════════════════════════════════════════════════════
# PAGE 1 — DASHBOARD
# ═══════════════════════════════════════════════════════════════
if "Dashboard" in page:
    st.markdown("# 🔮 Customer Churn Prediction System")
    st.markdown("<p style='color:#94a3b8;font-size:1.05rem;margin-top:-8px'>"
                "XGBoost · SHAP · Real-time Predictions · SQL Analytics · Business ROI</p>",
                unsafe_allow_html=True)
    st.divider()

    if df_feat is not None and df_raw is not None:
        churn_rate = df_feat["Churn"].mean()
        n_churn    = int(df_feat["Churn"].sum())
        avg_mc     = df_raw["MonthlyCharges"].mean() if "MonthlyCharges" in df_raw.columns else 64.76
        rev_risk   = n_churn * avg_mc * 12

        c1,c2,c3,c4 = st.columns(4)
        for col,val,lbl,clr in [
            (c1,f"{len(df_feat):,}","Total Customers","#6366f1"),
            (c2,f"{n_churn:,}","Churned","#ef4444"),
            (c3,f"{churn_rate*100:.1f}%","Churn Rate","#f59e0b"),
            (c4,f"₹{rev_risk:,.0f}","Annual Rev at Risk","#10b981"),
        ]:
            col.markdown(f"<div class='kpi'><div class='kpi-val' style='color:{clr}'>{val}</div>"
                         f"<div class='kpi-lbl'>{lbl}</div></div>", unsafe_allow_html=True)

        st.divider()
        col_a, col_b = st.columns(2)
        with col_a:
            st.markdown("### 📈 Model Performance")
            perf  = {"XGBoost":{"ROC-AUC":"87.4%","Recall":"84.1%","F1":"81.7%"},
                     "Random Forest":{"ROC-AUC":"86.3%","Recall":"79.5%","F1":"75.2%"},
                     "Logistic Reg.":{"ROC-AUC":"82.2%","Recall":"75.8%","F1":"71.3%"}}
            pclrs = {"XGBoost":"#6366f1","Random Forest":"#8b5cf6","Logistic Reg.":"#f59e0b"}
            for mn,metrics in perf.items():
                badges = "".join([f"<span style='margin-left:12px;font-size:12px;color:#94a3b8'>"
                                  f"{k}: <b style='color:#1e293b'>{v}</b></span>"
                                  for k,v in metrics.items()])
                st.markdown(f"<div class='info-card' style='border-left-color:{pclrs[mn]}'>"
                            f"<span style='font-family:Syne;font-weight:700;color:{pclrs[mn]}'>"
                            f"{mn}</span>{badges}</div>", unsafe_allow_html=True)
        with col_b:
            st.markdown("### 🔑 Business Insights")
            for clr,title,desc in [
                ("#ef4444","Month-to-month","42.7% churn — 3× riskier than 2-yr contract"),
                ("#f59e0b","Fiber optic","41.9% churn — highest of all internet segments"),
                ("#10b981","5+ services","Only 12% churn — embed customers deeper"),
                ("#6366f1","First 12 months","47% churn rate — critical retention window"),
            ]:
                st.markdown(f"<div class='info-card' style='border-left-color:{clr}'>"
                            f"<span style='color:{clr};font-weight:700;font-size:13px'>{title}</span>"
                            f"<br><span style='font-size:12px;color:#94a3b8'>{desc}</span></div>",
                            unsafe_allow_html=True)

        st.divider()
        st.markdown("### 📁 Report Files")
        rfiles = [("EDA Dashboard","reports/eda_dashboard.png"),
                  ("Correlation Heatmap","reports/correlation_heatmap.png"),
                  ("ROC Curves","reports/roc_curves.png"),
                  ("Confusion Matrix","reports/confusion_matrix.png"),
                  ("SHAP Summary","reports/shap_summary.png"),
                  ("ROI Analysis","reports/roi_analysis.png"),
                  ("Risk Distribution","reports/risk_distribution.png"),
                  ("Revenue Waterfall","reports/revenue_waterfall.png")]
        cols = st.columns(4)
        for i,(name,path) in enumerate(rfiles):
            ok = os.path.exists(path)
            cols[i%4].markdown(
                f"<div style='background:{'#f0fdf4' if ok else '#fafaff'};"
                f"border:1.5px solid {'#bbf7d0' if ok else '#e0e7ff'};"
                f"border-radius:9px;padding:10px;text-align:center;"
                f"font-size:12px;color:{'#16a34a' if ok else '#94a3b8'}'>"
                f"{'✅' if ok else '⬜'} {name}</div>", unsafe_allow_html=True)
    else:
        st.warning("Pipeline not run yet. Execute in terminal:")
        for cmd in ["python src/preprocessing.py",
                    "python src/feature_engineering.py","python src/train.py"]:
            st.code(cmd)


# ═══════════════════════════════════════════════════════════════
# PAGE 2 — LIVE PREDICTION
# ═══════════════════════════════════════════════════════════════
elif "Prediction" in page:
    st.markdown("# 🎯 Live Churn Prediction")
    st.markdown("<p style='color:#94a3b8;margin-top:-8px'>"
                "Real XGBoost model · Instant result · Retention strategy</p>",
                unsafe_allow_html=True)
    st.divider()

    c1,c2,c3 = st.columns(3)
    with c1:
        st.markdown("**👤 Customer Profile**")
        tenure   = st.slider("Tenure (months)",0,72,12)
        monthly  = st.number_input("Monthly Charges (₹)",20.0,120.0,75.0)
        senior   = st.selectbox("Senior Citizen",["No","Yes"])
        partner  = st.selectbox("Has Partner",["No","Yes"])
        deps     = st.selectbox("Dependents",["No","Yes"])
    with c2:
        st.markdown("**📋 Contract & Billing**")
        contract  = st.selectbox("Contract",["Month-to-month","One year","Two year"])
        internet  = st.selectbox("Internet",["Fiber optic","DSL","No"])
        payment   = st.selectbox("Payment",["Electronic check","Mailed check",
                                            "Bank transfer (automatic)",
                                            "Credit card (automatic)"])
        paperless = st.selectbox("Paperless Billing",["Yes","No"])
        phone     = st.selectbox("Phone Service",["Yes","No"])
    with c3:
        st.markdown("**🔧 Add-on Services**")
        security = st.selectbox("Online Security",["No","Yes","No internet service"])
        backup   = st.selectbox("Online Backup",["No","Yes","No internet service"])
        device   = st.selectbox("Device Protection",["No","Yes","No internet service"])
        support  = st.selectbox("Tech Support",["No","Yes","No internet service"])
        tv       = st.selectbox("Streaming TV",["No","Yes","No internet service"])
        movies   = st.selectbox("Streaming Movies",["No","Yes","No internet service"])

    if st.button("🔮 Predict Churn Risk", use_container_width=True):
        svc = sum([phone=="Yes",security=="Yes",backup=="Yes",
                   device=="Yes",support=="Yes",tv=="Yes",movies=="Yes"])
        prob = None
        if xgb_model and feat_cols:
            row = {c:0 for c in feat_cols}
            row["tenure"]           = (tenure-32.4)/24.6
            row["MonthlyCharges"]   = (monthly-64.8)/30.1
            row["TotalCharges"]     = ((monthly*tenure)-2283)/2267
            row["SeniorCitizen"]    = int(senior=="Yes")
            row["Partner"]          = int(partner=="Yes")
            row["Dependents"]       = int(deps=="Yes")
            row["PhoneService"]     = int(phone=="Yes")
            row["PaperlessBilling"] = int(paperless=="Yes")
            for k,v in {"InternetService_Fiber optic":internet=="Fiber optic",
                        "InternetService_No":internet=="No",
                        "Contract_One year":contract=="One year",
                        "Contract_Two year":contract=="Two year",
                        "PaymentMethod_Credit card (automatic)":payment=="Credit card (automatic)",
                        "PaymentMethod_Electronic check":payment=="Electronic check",
                        "PaymentMethod_Mailed check":payment=="Mailed check"}.items():
                if k in row: row[k]=int(v)
            if "total_services"     in row: row["total_services"]     = svc
            if "high_value"         in row: row["high_value"]         = int(monthly>80)
            if "contract_risk"      in row: row["contract_risk"]      = int(contract=="Month-to-month")
            if "fiber_risk"         in row: row["fiber_risk"]         = int(internet=="Fiber optic")
            if "revenue_per_tenure" in row: row["revenue_per_tenure"] = monthly/(tenure+1)
            if "charges_x_tenure"   in row: row["charges_x_tenure"]   = monthly*tenure
            t_s = (tenure-32.4)/24.6
            if "tenure_risk_med"  in row: row["tenure_risk_med"]  = int(-.5<=t_s<.1)
            if "tenure_risk_low"  in row: row["tenure_risk_low"]  = int(.1<=t_s<.7)
            if "tenure_risk_vlow" in row: row["tenure_risk_vlow"] = int(t_s>=.7)
            try:
                X_in = pd.DataFrame([row])[feat_cols]
                prob = float(xgb_model.predict_proba(X_in)[0][1])
            except Exception as e:
                st.warning(f"Model error — using heuristic ({e})")
        if prob is None:
            prob = 0.20
            if contract=="Month-to-month": prob+=0.28
            if internet=="Fiber optic":    prob+=0.12
            if tenure<12:                  prob+=0.18
            if monthly>80:                 prob+=0.08
            if security=="No":             prob+=0.05
            if support=="No":              prob+=0.05
            prob = min(prob,0.97)
            st.info("ℹ️ Heuristic mode — run pipeline for real predictions.")

        risk,clr,bg,border = get_risk(prob)
        annual=monthly*12; camp=annual*0.18; saving=annual*0.82

        st.divider()
        r1,r2,r3 = st.columns([1.1,1,1.1])
        with r1:
            st.markdown(
                f"<div class='risk-box' style='background:{bg};border-color:{border};"
                f"box-shadow:0 6px 28px {border}80'>"
                f"<div class='risk-pct' style='color:{clr}'>{prob*100:.1f}%</div>"
                f"<div class='risk-tag' style='color:{clr}'>{risk}</div>"
                f"<div style='font-size:11px;color:#94a3b8;margin-top:10px'>XGBoost Model</div>"
                f"</div>", unsafe_allow_html=True)
        with r2:
            st.markdown("**💰 Revenue Impact**")
            for lbl,val,c in [("Annual Revenue at Risk",f"₹{annual:,.0f}","#ef4444"),
                               ("Campaign Cost Estimate",f"₹{camp:,.0f}","#f59e0b"),
                               ("Net Saving if Retained",f"₹{saving:,.0f}","#10b981"),
                               ("Monthly Charges",f"₹{monthly:.0f}","#6366f1"),
                               ("Tenure",f"{tenure} months","#6366f1"),
                               ("Services Subscribed",str(svc),"#6366f1")]:
                st.markdown(f"<div class='row-card'>"
                            f"<span style='color:#94a3b8;font-size:13px'>{lbl}</span>"
                            f"<span style='color:{c};font-weight:700;font-family:JetBrains Mono'>"
                            f"{val}</span></div>", unsafe_allow_html=True)
        with r3:
            st.markdown("**🎯 Retention Actions**")
            actions = (
                ["📞 Personal call within 24 hrs",
                 "💰 Offer 20–25% discount + annual upgrade",
                 "🎁 Free bundle: Security + Support + Streaming",
                 "⚡ Escalate to Retention Team — PRIORITY",
                 "📋 Schedule satisfaction review in 48 hrs"]
                if risk=="HIGH" else
                ["📧 Personalised loyalty email in 48 hrs",
                 "🔒 Contract upgrade offer with add-ons",
                 "💬 Proactive support check-in call",
                 "🎯 Referral bonus or cashback incentive"]
                if risk=="MEDIUM" else
                ["🌟 Enroll in loyalty rewards programme",
                 "📢 Upsell premium plan via in-app message",
                 "✉️ Monthly engagement newsletter"]
            )
            for a in actions:
                st.markdown(
                    f"<div style='background:linear-gradient(135deg,#fafaff,#f5f3ff);"
                    f"border-left:3px solid {clr};border-radius:0 10px 10px 0;"
                    f"padding:9px 13px;margin:5px 0;font-size:13px;color:#374151'>"
                    f"{a}</div>", unsafe_allow_html=True)

        st.divider()
        pct=int(prob*100)
        st.markdown(
            f"<div style='margin:4px 0'>"
            f"<div style='display:flex;justify-content:space-between;"
            f"font-size:11px;color:#94a3b8;margin-bottom:7px'>"
            f"<span>0% Safe</span>"
            f"<span style='color:{clr};font-weight:700;font-size:13px'>"
            f"Churn Probability: {pct}%</span><span>100% Certain Churn</span></div>"
            f"<div style='background:#e0e7ff;border-radius:99px;height:14px;overflow:hidden'>"
            f"<div style='width:{pct}%;height:100%;"
            f"background:linear-gradient(90deg,#6366f1,{clr});"
            f"border-radius:99px;box-shadow:0 2px 8px {clr}50'></div>"
            f"</div></div>", unsafe_allow_html=True)


# ═══════════════════════════════════════════════════════════════
# PAGE 3 — EDA & CHARTS
# ═══════════════════════════════════════════════════════════════
elif "EDA" in page:
    st.markdown("# 📊 EDA & Feature Analysis")
    st.divider()
    tab1,tab2,tab3,tab4 = st.tabs(["🔍 Overview","📈 Feature Engineering",
                                    "🌡️ Distributions","🔗 Correlations"])
    with tab1:
        r1a,r1b = st.columns(2)
        with r1a: img_or_placeholder("reports/eda_dashboard.png","EDA Dashboard")
        with r1b: img_or_placeholder("reports/correlation_heatmap.png","Correlation Heatmap")
        r2a,r2b = st.columns(2)
        with r2a: img_or_placeholder("reports/class_imbalance.png","Class Imbalance")
        with r2b: img_or_placeholder("reports/churn_by_payment.png","Churn by Payment")
    with tab2:
        feat_imgs=[("reports/feat_tenure_groups.png","Tenure Groups"),
                   ("reports/feat_service_count.png","Service Count vs Churn"),
                   ("reports/feat_contract_risk.png","Contract Risk"),
                   ("reports/feat_fiber_risk.png","Fiber Risk"),
                   ("reports/feat_revenue_features.png","Revenue Features"),
                   ("reports/feat_high_value.png","High Value Flag")]
        for i in range(0,len(feat_imgs),2):
            ca,cb=st.columns(2)
            with ca: img_or_placeholder(*feat_imgs[i])
            if i+1<len(feat_imgs):
                with cb: img_or_placeholder(*feat_imgs[i+1])
    with tab3:
        ca,cb=st.columns(2)
        with ca:
            img_or_placeholder("reports/scaling_comparison.png","Before vs After Scaling")
            img_or_placeholder("reports/feat_distributions_overview.png","Feature Distributions")
        with cb:
            img_or_placeholder("reports/feat_correlation_with_churn.png","Feature Correlation")
            img_or_placeholder("reports/feat_final_validation.png","Final Validation")
    with tab4:
        img_or_placeholder("reports/graph7_heatmap.png","Feature Heatmap")
        if df_feat is not None:
            st.markdown("**Live Correlation with Churn**")
            num_df=df_feat.select_dtypes(include=[np.number])
            corr=num_df.corr()["Churn"].drop("Churn").sort_values(key=abs,ascending=False)
            st.dataframe(
                corr.reset_index().rename(columns={"index":"Feature","Churn":"Correlation"})
                    .head(20).style.background_gradient(cmap="RdYlGn",subset=["Correlation"]),
                use_container_width=True, hide_index=True)


# ═══════════════════════════════════════════════════════════════
# PAGE 4 — MODEL REPORTS
# ═══════════════════════════════════════════════════════════════
elif "Model" in page:
    st.markdown("# 🤖 Model Performance Reports")
    st.divider()
    tab1,tab2,tab3 = st.tabs(["📉 ROC & Curves","🔲 Confusion Matrix","🌳 SHAP"])
    with tab1:
        ca,cb=st.columns(2)
        with ca: img_or_placeholder("reports/roc_curves.png","ROC Curves")
        with cb: img_or_placeholder("reports/precision_recall_curves.png","Precision-Recall")
        cc,cd=st.columns(2)
        with cc: img_or_placeholder("reports/threshold_analysis.png","Threshold Analysis")
        with cd: img_or_placeholder("reports/model_comparison_bar.png","Model Comparison")
        if os.path.exists("reports/model_comparison.csv"):
            st.markdown("**Comparison Table**")
            df_comp=pd.read_csv("reports/model_comparison.csv",index_col=0)
            st.dataframe(df_comp.style.highlight_max(axis=0,color="#eef2ff")
                                      .format("{:.4f}"),use_container_width=True)
    with tab2:
        ca,cb=st.columns(2)
        with ca: img_or_placeholder("reports/confusion_matrix.png","Confusion Matrix")
        with cb: img_or_placeholder("reports/actual_vs_predicted_segments.png","Actual vs Predicted")
        img_or_placeholder("reports/churn_score_analysis.png","Churn Score Distribution")
    with tab3:
        ca,cb=st.columns(2)
        with ca:
            img_or_placeholder("reports/shap_bar.png","SHAP Feature Importance")
            img_or_placeholder("reports/shap_waterfall_highrisk.png","Waterfall — High Risk")
        with cb:
            img_or_placeholder("reports/shap_summary.png","SHAP Beeswarm")
            img_or_placeholder("reports/shap_waterfall_lowrisk.png","Waterfall — Low Risk")
        if os.path.exists("reports/shap_feature_ranking.csv"):
            st.markdown("**SHAP Feature Ranking**")
            st.dataframe(pd.read_csv("reports/shap_feature_ranking.csv"),
                         use_container_width=True,hide_index=True)


# ═══════════════════════════════════════════════════════════════
# PAGE 5 — BATCH PREDICT
# ═══════════════════════════════════════════════════════════════
elif "Batch" in page:
    st.markdown("# 📦 Batch Prediction")
    st.markdown("<p style='color:#94a3b8;margin-top:-8px'>"
                "Upload CSV → score every customer → download results</p>",
                unsafe_allow_html=True)
    st.divider()
    uploaded=st.file_uploader("Upload Customer CSV",type=["csv"])
    if uploaded:
        df_up=pd.read_csv(uploaded)
        st.success(f"✅ Loaded {len(df_up):,} rows × {df_up.shape[1]} columns")
        st.dataframe(df_up.head(5),use_container_width=True)
        if st.button("🚀 Run Batch Prediction") and xgb_model and feat_cols:
            try:
                X_b=align_features(df_up.copy(),feat_cols)
                probs_b=xgb_model.predict_proba(X_b)[:,1]
                df_up["churn_probability"]=probs_b.round(4)
                df_up["risk_category"]=pd.cut(probs_b,bins=[-0.1,.4,.7,1.01],
                                              labels=["LOW","MEDIUM","HIGH"])
                high=(df_up["risk_category"]=="HIGH").sum()
                med=(df_up["risk_category"]=="MEDIUM").sum()
                ca,cb,cc=st.columns(3)
                ca.metric("🔴 High Risk",f"{high:,}")
                cb.metric("🟡 Medium Risk",f"{med:,}")
                cc.metric("💰 Rev at Risk",f"₹{high*64.76*12:,.0f}")
                st.dataframe(
                    df_up.sort_values("churn_probability",ascending=False)
                         [["churn_probability","risk_category"]+list(df_up.columns[:4])]
                         .head(30),use_container_width=True)
                st.download_button("⬇️ Download CSV",df_up.to_csv(index=False),
                                   "predictions.csv","text/csv")
            except Exception as e: st.error(f"Error: {e}")
    else:
        st.info("Upload a CSV with the same feature columns as training data.")
        if df_feat is not None and xgb_model and feat_cols:
            if st.button("▶️ Demo on Test Set"):
                from sklearn.model_selection import train_test_split
                X=align_features(df_feat.drop("Churn",axis=1).copy(),feat_cols)
                y=df_feat["Churn"]
                _,Xt,_,yt=train_test_split(X,y,test_size=.2,stratify=y,random_state=42)
                pb=xgb_model.predict_proba(Xt)[:,1]
                df_demo=Xt.copy()
                df_demo["churn_probability"]=pb.round(4)
                df_demo["actual_churn"]=yt.values
                df_demo["risk_category"]=pd.cut(pb,bins=[-0.1,.4,.7,1.01],
                                                labels=["LOW","MEDIUM","HIGH"])
                ca,cb,cc=st.columns(3)
                ca.metric("🔴 High",f"{(df_demo['risk_category']=='HIGH').sum():,}")
                cb.metric("🟡 Medium",f"{(df_demo['risk_category']=='MEDIUM').sum():,}")
                cc.metric("📊 Total",f"{len(df_demo):,}")
                st.dataframe(
                    df_demo[["churn_probability","risk_category","actual_churn"]]
                    .sort_values("churn_probability",ascending=False).head(30),
                    use_container_width=True)


# ═══════════════════════════════════════════════════════════════
# PAGE 6 — ROI CALCULATOR
# ═══════════════════════════════════════════════════════════════
elif "ROI" in page:
    st.markdown("# 💰 Business ROI Calculator")
    st.divider()
    c_in,c_out=st.columns([1,1.2])
    with c_in:
        st.markdown("**📥 Inputs**")
        total_c=st.number_input("Total Customers",100,1000000,7043,100)
        avg_rev=st.number_input("Avg Monthly Revenue (₹)",10.0,500.0,64.76,1.0)
        churn_r=st.slider("Predicted Churn Rate (%)",1,50,27)/100
        ret_h=st.slider("Retention Rate — HIGH (%)",5,50,25)/100
        ret_m=st.slider("Retention Rate — MEDIUM (%)",5,30,15)/100
        cost_h=st.number_input("Campaign Cost HIGH (₹/customer)",50,5000,250)
        cost_m=st.number_input("Campaign Cost MEDIUM (₹/customer)",20,1000,100)

    n_churn=int(total_c*churn_r); n_high=int(n_churn*.40); n_med=int(n_churn*.35)
    rev_risk=n_churn*avg_rev*12; camp_cost=n_high*cost_h+n_med*cost_m
    rev_saved=(int(n_high*ret_h)+int(n_med*ret_m))*avg_rev*12
    net_roi=rev_saved-camp_cost; roi_pct=(net_roi/camp_cost*100) if camp_cost>0 else 0

    with c_out:
        st.markdown("**📊 Results**")
        for lbl,val,clr in [
            ("Predicted Churners",f"{n_churn:,}","#ef4444"),
            ("HIGH Risk Customers",f"{n_high:,}","#f59e0b"),
            ("Annual Revenue at Risk",f"₹{rev_risk:,.0f}","#ef4444"),
            ("Total Campaign Cost",f"₹{camp_cost:,.0f}","#f59e0b"),
            ("Revenue Saved",f"₹{rev_saved:,.0f}","#10b981"),
            ("Net ROI",f"₹{net_roi:,.0f}","#6366f1"),
            ("ROI %",f"{roi_pct:.1f}%","#8b5cf6")]:
            st.markdown(f"<div class='row-card'>"
                        f"<span style='color:#64748b;font-size:14px'>{lbl}</span>"
                        f"<span style='color:{clr};font-weight:700;font-family:JetBrains Mono;"
                        f"font-size:15px'>{val}</span></div>", unsafe_allow_html=True)

    st.divider()
    st.markdown("### Revenue Waterfall")
    wf_l=["Total Annual\nRevenue","Revenue\nat Risk","Campaign\nCost","Revenue\nSaved","Net\nROI"]
    wf_v=[total_c*avg_rev*12,rev_risk,camp_cost,rev_saved,net_roi]
    wf_c=["#6366f1","#ef4444","#f59e0b","#10b981","#8b5cf6"]
    fig,ax=lax((10,4.5))
    bars=ax.bar(wf_l,wf_v,color=wf_c,edgecolor="white",width=.55,linewidth=2,zorder=3)
    for bar,v in zip(bars,wf_v):
        ax.text(bar.get_x()+bar.get_width()/2, bar.get_height()+max(wf_v)*.012,
                f"₹{v:,.0f}",ha="center",fontsize=9,fontweight="bold",color="#1e293b")
    ax.set_title("Revenue Waterfall Analysis",color="#1e293b",fontsize=12,fontweight="bold")
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x,_:f"₹{x:,.0f}"))
    st.pyplot(fig,use_container_width=True)
    if os.path.exists("reports/roi_analysis.png"):
        st.divider(); st.markdown("### Notebook Charts")
        ca,cb=st.columns(2)
        with ca: st.image("reports/roi_analysis.png",use_container_width=True)
        if os.path.exists("reports/revenue_waterfall.png"):
            with cb: st.image("reports/revenue_waterfall.png",use_container_width=True)


# ═══════════════════════════════════════════════════════════════
# PAGE 7 — SQL ANALYTICS  (all 3 SQL files fully integrated)
# ═══════════════════════════════════════════════════════════════
elif "SQL" in page:
    st.markdown("# 🗄️ SQL Analytics Dashboard")

    # Auto-build DB + show status banner
    db_conn, db_msg = get_db()
    ok_db = "✅" in db_msg
    st.markdown(
        f"<div class='db-banner'>🗄️ <b>SQLite Database</b> — {db_msg} &nbsp;·&nbsp; "
        f"Tables: <code>customers</code> + <code>predictions</code> &nbsp;·&nbsp; "
        f"Schema: <code>create_tables.sql</code></div>",
        unsafe_allow_html=True)

    if not ok_db:
        st.warning("Run the pipeline first: preprocessing → feature_engineering → train")
        st.stop()

    # Top KPIs pulled live from SQL
    kpi_df,_ = run_sql("""
        SELECT COUNT(*) AS total,
               SUM(c.churn)                                          AS actual_churned,
               COUNT(CASE WHEN p.risk_category='HIGH'   THEN 1 END) AS high_risk,
               COUNT(CASE WHEN p.risk_category='MEDIUM' THEN 1 END) AS med_risk,
               ROUND(SUM(CASE WHEN p.risk_category='HIGH'
                   THEN c.monthly_charges*12 ELSE 0 END),0)         AS rev_at_risk
        FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
    """)
    if not kpi_df.empty:
        row=kpi_df.iloc[0]
        c1,c2,c3,c4,c5=st.columns(5)
        for col,val,lbl,clr in [
            (c1,f"{int(row['total']):,}","Total Customers","#6366f1"),
            (c2,f"{int(row['actual_churned']):,}","Actual Churned","#ef4444"),
            (c3,f"{int(row['high_risk']):,}","HIGH Risk","#ef4444"),
            (c4,f"{int(row['med_risk']):,}","MEDIUM Risk","#f59e0b"),
            (c5,f"₹{int(row['rev_at_risk']):,}","Rev at Risk (HIGH)","#10b981")]:
            col.markdown(f"<div class='kpi'><div class='kpi-val' style='color:{clr}'>{val}</div>"
                         f"<div class='kpi-lbl'>{lbl}</div></div>", unsafe_allow_html=True)

    st.divider()
    SEG_C = {"HIGH":"#ef4444","MEDIUM":"#f59e0b","LOW":"#10b981"}

    tab1,tab2,tab3,tab4 = st.tabs([
        "🚨  high_risk_customers.sql",
        "📈  churn_trend.sql",
        "⚙️  create_tables.sql",
        "✍️  Custom SQL"
    ])

    # ════════════════════════════════════════════════════════════
    # TAB 1 — high_risk_customers.sql  (4 queries)
    # ════════════════════════════════════════════════════════════
    with tab1:
        st.markdown("### 🚨 `sql/high_risk_customers.sql`")
        st.markdown("<p style='color:#94a3b8'>Answers: "
                    "<b style='color:#1e293b'>Who should the retention team call first?</b></p>",
                    unsafe_allow_html=True)

        s1,s2,s3,s4 = st.tabs(["Q1 — Top High-Value at Risk",
                                 "Q2 — Risk by Contract",
                                 "Q3 — Senior Citizens",
                                 "Q4 — Revenue Summary"])

        with s1:
            with st.expander("📋 SQL Code",expanded=False):
                st.code("""-- high_risk_customers.sql — Query 1
-- Top 50 high-value customers at risk (monthly > ₹60)
SELECT c.customer_id, c.tenure, c.monthly_charges, c.total_charges,
       c.contract, c.internet_service, c.payment_method,
       ROUND(p.churn_prob * 100, 2)  AS churn_probability_pct,
       p.risk_category,
       c.monthly_charges * 12         AS annual_revenue_at_risk
FROM customers c
JOIN predictions p ON c.customer_id = p.customer_id
WHERE p.risk_category = 'HIGH'
  AND c.monthly_charges > 60
ORDER BY annual_revenue_at_risk DESC
LIMIT 50;""", language="sql")
            df_q1,err=run_sql("""
                SELECT c.customer_id, c.tenure, c.monthly_charges,
                       c.contract, c.internet_service,
                       ROUND(p.churn_prob*100,2) AS churn_probability_pct,
                       ROUND(c.monthly_charges*12,2) AS annual_revenue_at_risk
                FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
                WHERE p.risk_category='HIGH' AND c.monthly_charges>60
                ORDER BY annual_revenue_at_risk DESC LIMIT 50""")
            if not df_q1.empty:
                st.success(f"✅ {len(df_q1)} high-value customers at HIGH risk")
                st.dataframe(df_q1.style.background_gradient(
                    cmap="Reds",subset=["churn_probability_pct"]),
                    use_container_width=True,hide_index=True)
                st.download_button("⬇️ Download Call List",
                    df_q1.to_csv(index=False),"high_risk_call_list.csv","text/csv")
                fig,axes=plt.subplots(1,2,figsize=(13,4),facecolor="white")
                laxs(axes)
                top10=df_q1.head(10)
                axes[0].barh(top10["customer_id"],top10["annual_revenue_at_risk"],
                             color="#ef4444",edgecolor="white",height=0.6)
                axes[0].set_title("Top 10 — Annual Revenue at Risk",
                                  color="#1e293b",fontweight="bold",fontsize=10)
                axes[0].set_xlabel("Revenue (₹)",color="#64748b"); axes[0].tick_params(labelsize=8)
                axes[1].hist(df_q1["churn_probability_pct"],bins=15,
                             color="#6366f1",edgecolor="white",alpha=.85)
                axes[1].set_title("Score Distribution (HIGH Segment)",
                                  color="#1e293b",fontweight="bold",fontsize=10)
                axes[1].set_xlabel("Churn Probability (%)",color="#64748b")
                plt.tight_layout(); st.pyplot(fig,use_container_width=True)
            if err: st.error(err)

        with s2:
            with st.expander("📋 SQL Code",expanded=False):
                st.code("""-- high_risk_customers.sql — Query 2
SELECT c.contract, p.risk_category,
       COUNT(*) AS customer_count,
       ROUND(AVG(p.churn_prob)*100,2)     AS avg_churn_prob_pct,
       ROUND(SUM(c.monthly_charges*12),2) AS total_annual_revenue
FROM customers c
JOIN predictions p ON c.customer_id = p.customer_id
GROUP BY c.contract, p.risk_category
ORDER BY c.contract, p.risk_category;""", language="sql")
            df_q2,err=run_sql("""
                SELECT c.contract, p.risk_category, COUNT(*) AS customer_count,
                       ROUND(AVG(p.churn_prob)*100,2) AS avg_churn_prob_pct,
                       ROUND(SUM(c.monthly_charges*12),2) AS total_annual_revenue
                FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
                GROUP BY c.contract, p.risk_category ORDER BY c.contract, p.risk_category""")
            if not df_q2.empty:
                st.dataframe(df_q2.style.background_gradient(
                    cmap="RdYlGn_r",subset=["avg_churn_prob_pct"]),
                    use_container_width=True,hide_index=True)
                pivot=df_q2.pivot(index="contract",columns="risk_category",
                                  values="customer_count").fillna(0)
                fig,ax=lax((9,4))
                pivot.plot(kind="bar",ax=ax,color=["#ef4444","#f59e0b","#10b981"],
                           edgecolor="white",width=.65)
                ax.set_title("Risk Distribution by Contract Type",
                             color="#1e293b",fontweight="bold")
                ax.tick_params(axis="x",rotation=15,labelsize=9)
                ax.legend(title="Risk",facecolor="white",edgecolor="#e0e7ff")
                plt.tight_layout(); st.pyplot(fig,use_container_width=True)
            if err: st.error(err)

        with s3:
            with st.expander("📋 SQL Code",expanded=False):
                st.code("""-- high_risk_customers.sql — Query 3
SELECT c.customer_id, c.tenure, c.monthly_charges,
       ROUND(p.churn_prob*100,2) AS churn_pct,
       c.contract, c.internet_service
FROM customers c
JOIN predictions p ON c.customer_id = p.customer_id
WHERE c.senior_citizen = 1
  AND p.risk_category  = 'HIGH'
ORDER BY p.churn_prob DESC;""", language="sql")
            df_q3,err=run_sql("""
                SELECT c.customer_id, c.tenure, c.monthly_charges,
                       ROUND(p.churn_prob*100,2) AS churn_pct,
                       c.contract, c.internet_service
                FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
                WHERE c.senior_citizen=1 AND p.risk_category='HIGH'
                ORDER BY p.churn_prob DESC""")
            if not df_q3.empty:
                st.warning(f"👴 {len(df_q3)} senior citizens at HIGH risk — needs special care")
                st.dataframe(df_q3,use_container_width=True,hide_index=True)
            elif not err: st.success("✅ No senior citizens at HIGH risk currently")
            if err: st.error(err)

        with s4:
            with st.expander("📋 SQL Code",expanded=False):
                st.code("""-- high_risk_customers.sql — Query 4
SELECT p.risk_category,
       COUNT(*) AS customers,
       ROUND(AVG(p.churn_prob)*100,2)      AS avg_churn_pct,
       ROUND(SUM(c.monthly_charges),2)     AS monthly_revenue_at_risk,
       ROUND(SUM(c.monthly_charges*12),2)  AS annual_revenue_at_risk
FROM customers c
JOIN predictions p USING (customer_id)
GROUP BY p.risk_category
ORDER BY avg_churn_pct DESC;""", language="sql")
            df_q4,err=run_sql("""
                SELECT p.risk_category, COUNT(*) AS customers,
                       ROUND(AVG(p.churn_prob)*100,2) AS avg_churn_pct,
                       ROUND(SUM(c.monthly_charges),2) AS monthly_rev,
                       ROUND(SUM(c.monthly_charges*12),2) AS annual_rev
                FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
                GROUP BY p.risk_category ORDER BY avg_churn_pct DESC""")
            if not df_q4.empty:
                st.dataframe(df_q4,use_container_width=True,hide_index=True)
                seg_c=[SEG_C.get(r,"#6366f1") for r in df_q4["risk_category"]]
                fig,axes=plt.subplots(1,2,figsize=(12,4),facecolor="white")
                laxs(axes)
                axes[0].bar(df_q4["risk_category"],df_q4["customers"],
                            color=seg_c,edgecolor="white",width=.5)
                for i,(s,v) in enumerate(zip(df_q4["risk_category"],df_q4["customers"])):
                    axes[0].text(i,v+20,f"{int(v):,}",ha="center",fontsize=10,
                                 fontweight="bold",color="#1e293b")
                axes[0].set_title("Customers by Risk Segment",color="#1e293b",fontweight="bold")
                axes[1].bar(df_q4["risk_category"],df_q4["annual_rev"],
                            color=seg_c,edgecolor="white",width=.5)
                axes[1].set_title("Annual Revenue at Risk",color="#1e293b",fontweight="bold")
                axes[1].yaxis.set_major_formatter(plt.FuncFormatter(lambda x,_:f"₹{x:,.0f}"))
                plt.tight_layout(); st.pyplot(fig,use_container_width=True)
            if err: st.error(err)

    # ════════════════════════════════════════════════════════════
    # TAB 2 — churn_trend.sql  (4 queries)
    # ════════════════════════════════════════════════════════════
    with tab2:
        st.markdown("### 📈 `sql/churn_trend.sql`")
        st.markdown("<p style='color:#94a3b8'>Answers: "
                    "<b style='color:#1e293b'>Where are churn patterns concentrated?</b></p>",
                    unsafe_allow_html=True)

        st2a,st2b,st2c,st2d = st.tabs([
            "Q1 — Churn by Contract",
            "Q2 — Tenure Cohort",
            "Q3 — Internet Service",
            "Q4 — Not Yet Actioned"])

        with st2a:
            with st.expander("📋 SQL Code",expanded=False):
                st.code("""-- churn_trend.sql — Query 2
SELECT c.contract, COUNT(*) AS total,
       SUM(CASE WHEN c.churn=1 THEN 1 ELSE 0 END) AS actual_churned,
       ROUND(100.0*SUM(c.churn)/COUNT(*),2)        AS churn_rate_pct,
       ROUND(AVG(c.monthly_charges),2)             AS avg_monthly_charges,
       ROUND(AVG(c.tenure),1)                      AS avg_tenure_months
FROM customers c
GROUP BY c.contract
ORDER BY churn_rate_pct DESC;""", language="sql")
            df_t1,err=run_sql("""
                SELECT contract, COUNT(*) AS total, SUM(churn) AS churned,
                       ROUND(100.0*SUM(churn)/COUNT(*),2) AS churn_rate_pct,
                       ROUND(AVG(monthly_charges),2) AS avg_monthly_charges,
                       ROUND(AVG(tenure),1) AS avg_tenure_months
                FROM customers GROUP BY contract ORDER BY churn_rate_pct DESC""")
            if not df_t1.empty:
                st.dataframe(df_t1.style.background_gradient(
                    cmap="RdYlGn_r",subset=["churn_rate_pct"]),
                    use_container_width=True,hide_index=True)
                ct_c=["#ef4444","#f59e0b","#10b981"]
                fig,axes=plt.subplots(1,3,figsize=(14,4),facecolor="white")
                laxs(axes)
                for ax,col,title in [(axes[0],"churn_rate_pct","Churn Rate (%)"),
                                     (axes[1],"avg_monthly_charges","Avg Monthly Charges (₹)"),
                                     (axes[2],"avg_tenure_months","Avg Tenure (months)")]:
                    ax.barh(df_t1["contract"],df_t1[col],color=ct_c,edgecolor="white",height=.4)
                    ax.set_title(title,color="#1e293b",fontweight="bold",fontsize=10)
                    ax.tick_params(labelsize=8)
                plt.tight_layout(); st.pyplot(fig,use_container_width=True)
            if err: st.error(err)

        with st2b:
            with st.expander("📋 SQL Code",expanded=False):
                st.code("""-- churn_trend.sql — Query 5 (cohort analysis)
SELECT
    CASE WHEN tenure BETWEEN 0  AND 12 THEN '0–12 months'
         WHEN tenure BETWEEN 13 AND 24 THEN '13–24 months'
         WHEN tenure BETWEEN 25 AND 48 THEN '25–48 months'
         ELSE '48+ months' END          AS tenure_group,
    COUNT(*) AS customers,
    SUM(churn) AS churned,
    ROUND(100.0*SUM(churn)/COUNT(*),2)  AS churn_rate_pct,
    ROUND(AVG(monthly_charges),2)       AS avg_charges
FROM customers
GROUP BY tenure_group
ORDER BY churn_rate_pct DESC;""", language="sql")
            df_t2,err=run_sql("""
                SELECT CASE WHEN tenure BETWEEN 0  AND 12 THEN '1. 0-12m (High Risk)'
                            WHEN tenure BETWEEN 13 AND 24 THEN '2. 13-24m (Med Risk)'
                            WHEN tenure BETWEEN 25 AND 48 THEN '3. 25-48m (Low Risk)'
                            ELSE '4. 48m+ (Very Low)' END AS tenure_group,
                       COUNT(*) AS customers, SUM(churn) AS churned,
                       ROUND(100.0*SUM(churn)/COUNT(*),2) AS churn_rate_pct,
                       ROUND(AVG(monthly_charges),2) AS avg_charges
                FROM customers GROUP BY tenure_group ORDER BY tenure_group""")
            if not df_t2.empty:
                st.dataframe(df_t2,use_container_width=True,hide_index=True)
                coh_c=["#ef4444","#f59e0b","#10b981","#22c55e"]
                fig,axes=plt.subplots(1,2,figsize=(12,4),facecolor="white")
                laxs(axes)
                bars=axes[0].bar(df_t2["tenure_group"],df_t2["churn_rate_pct"],
                                 color=coh_c,edgecolor="white",width=.6)
                for bar,v in zip(bars,df_t2["churn_rate_pct"]):
                    axes[0].text(bar.get_x()+bar.get_width()/2,bar.get_height()+.4,
                                 f"{v:.1f}%",ha="center",fontweight="bold",
                                 fontsize=10,color="#1e293b")
                axes[0].set_title("Churn Rate by Tenure Cohort",color="#1e293b",fontweight="bold")
                axes[0].set_ylabel("Churn Rate (%)",color="#64748b")
                axes[0].tick_params(axis="x",rotation=15,labelsize=8)
                axes[1].bar(df_t2["tenure_group"],df_t2["customers"],
                            color=coh_c,edgecolor="white",width=.6)
                axes[1].set_title("Customers per Cohort",color="#1e293b",fontweight="bold")
                axes[1].tick_params(axis="x",rotation=15,labelsize=8)
                plt.tight_layout(); st.pyplot(fig,use_container_width=True)
            if err: st.error(err)

        with st2c:
            with st.expander("📋 SQL Code",expanded=False):
                st.code("""-- churn_trend.sql — internet service breakdown
SELECT c.internet_service,
       COUNT(*) AS customers,
       SUM(c.churn) AS churned,
       ROUND(100.0*SUM(c.churn)/COUNT(*),2)              AS churn_rate_pct,
       ROUND(AVG(c.monthly_charges),2)                   AS avg_charges,
       COUNT(CASE WHEN p.risk_category='HIGH' THEN 1 END) AS high_risk_count
FROM customers c
JOIN predictions p ON c.customer_id = p.customer_id
GROUP BY internet_service
ORDER BY churn_rate_pct DESC;""", language="sql")
            df_t3,err=run_sql("""
                SELECT c.internet_service, COUNT(*) AS customers, SUM(c.churn) AS churned,
                       ROUND(100.0*SUM(c.churn)/COUNT(*),2) AS churn_rate_pct,
                       ROUND(AVG(c.monthly_charges),2) AS avg_charges,
                       COUNT(CASE WHEN p.risk_category='HIGH' THEN 1 END) AS high_risk_count
                FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
                GROUP BY c.internet_service ORDER BY churn_rate_pct DESC""")
            if not df_t3.empty:
                st.dataframe(df_t3.style.background_gradient(
                    cmap="RdYlGn_r",subset=["churn_rate_pct"]),
                    use_container_width=True,hide_index=True)
                inet_c=["#ef4444","#6366f1","#10b981"]
                fig,axes=plt.subplots(1,2,figsize=(11,4),facecolor="white")
                laxs(axes)
                bars=axes[0].bar(df_t3["internet_service"],df_t3["churn_rate_pct"],
                                 color=inet_c,edgecolor="white",width=.5)
                for bar,v in zip(bars,df_t3["churn_rate_pct"]):
                    axes[0].text(bar.get_x()+bar.get_width()/2,bar.get_height()+.3,
                                 f"{v:.1f}%",ha="center",fontweight="bold",color="#1e293b")
                axes[0].set_title("Churn Rate by Internet Service",color="#1e293b",fontweight="bold")
                axes[1].bar(df_t3["internet_service"],df_t3["avg_charges"],
                            color=inet_c,edgecolor="white",width=.5)
                axes[1].set_title("Avg Monthly Charges",color="#1e293b",fontweight="bold")
                axes[1].set_ylabel("₹",color="#64748b")
                plt.tight_layout(); st.pyplot(fig,use_container_width=True)
            if err: st.error(err)

        with st2d:
            with st.expander("📋 SQL Code",expanded=False):
                st.code("""-- churn_trend.sql — Query 3
-- HIGH-risk customers not yet actioned
SELECT c.customer_id, c.tenure, c.monthly_charges,
       ROUND(p.churn_prob*100,2) AS churn_pct,
       p.risk_category
FROM customers c
JOIN predictions p USING (customer_id)
WHERE p.risk_category = 'HIGH'
  AND p.action_taken  IS NULL
ORDER BY p.churn_prob DESC
LIMIT 50;""", language="sql")
            df_t4,err=run_sql("""
                SELECT c.customer_id, c.tenure, c.monthly_charges, c.contract,
                       ROUND(p.churn_prob*100,2) AS churn_pct,
                       ROUND(c.monthly_charges*12,2) AS annual_rev
                FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
                WHERE p.risk_category='HIGH' AND p.action_taken IS NULL
                ORDER BY p.churn_prob DESC LIMIT 50""")
            if not df_t4.empty:
                st.warning(f"⚠️ {len(df_t4)} HIGH-risk customers with **no action taken yet!**")
                st.dataframe(df_t4.style.background_gradient(
                    cmap="Reds",subset=["churn_pct"]),
                    use_container_width=True,hide_index=True)
                st.download_button("⬇️ Download Urgent List",
                    df_t4.to_csv(index=False),"urgent_action_list.csv","text/csv")
            if err: st.error(err)

    # ════════════════════════════════════════════════════════════
    # TAB 3 — create_tables.sql  (schema reference + live stats)
    # ════════════════════════════════════════════════════════════
    with tab3:
        st.markdown("### ⚙️ `sql/create_tables.sql` — Schema Reference")
        st.markdown(
            "<div class='info-card' style='border-left-color:#6366f1;margin-bottom:14px'>"
            "<b style='color:#6366f1'>What this file does</b><br>"
            "<span style='color:#475569;font-size:13px'>"
            "Defines 2 tables: <code>customers</code> (raw Telco data) + "
            "<code>predictions</code> (XGBoost output). "
            "In this app it runs automatically via Python/SQLite. "
            "For a production PostgreSQL server run once with: "
            "<code>psql -d your_db -f sql/create_tables.sql</code></span></div>",
            unsafe_allow_html=True)

        st.code("""-- sql/create_tables.sql  (PostgreSQL-compatible full schema)

CREATE TABLE customers (
    customer_id        VARCHAR(20)    PRIMARY KEY,
    tenure             INT            NOT NULL CHECK (tenure >= 0),
    monthly_charges    DECIMAL(10,2)  NOT NULL,
    total_charges      DECIMAL(10,2),
    contract           VARCHAR(30)    NOT NULL,
    internet_service   VARCHAR(30),
    payment_method     VARCHAR(50),
    senior_citizen     BOOLEAN        DEFAULT FALSE,
    partner            BOOLEAN        DEFAULT FALSE,
    dependents         BOOLEAN        DEFAULT FALSE,
    phone_service      BOOLEAN        DEFAULT TRUE,
    paperless_billing  BOOLEAN        DEFAULT FALSE,
    online_security    VARCHAR(20),
    tech_support       VARCHAR(20),
    streaming_tv       VARCHAR(20),
    streaming_movies   VARCHAR(20),
    churn              BOOLEAN        DEFAULT FALSE,
    created_at         TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE predictions (
    prediction_id    SERIAL          PRIMARY KEY,
    customer_id      VARCHAR(20)     REFERENCES customers(customer_id),
    model_version    VARCHAR(20)     NOT NULL,
    churn_prob       DECIMAL(6,4)    NOT NULL CHECK (churn_prob BETWEEN 0 AND 1),
    churn_prediction BOOLEAN         NOT NULL,
    risk_category    VARCHAR(10)     NOT NULL CHECK (risk_category IN ('HIGH','MEDIUM','LOW')),
    predicted_at     TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    action_taken     VARCHAR(100),
    outcome          VARCHAR(50)
);

-- Performance indexes (from create_tables.sql)
CREATE INDEX idx_cust_contract   ON customers(contract);
CREATE INDEX idx_cust_churn      ON customers(churn);
CREATE INDEX idx_pred_churn_prob ON predictions(churn_prob DESC);
CREATE INDEX idx_pred_risk       ON predictions(risk_category);""", language="sql")

        st.markdown("**Live Table Stats**")
        ca,cb=st.columns(2)
        with ca:
            st.markdown("📋 `customers` table")
            df_s1,_=run_sql("""SELECT COUNT(*) AS rows,
                COUNT(DISTINCT contract) AS contracts,
                COUNT(DISTINCT internet_service) AS inet_types,
                SUM(churn) AS total_churned FROM customers""")
            if not df_s1.empty: st.dataframe(df_s1,use_container_width=True,hide_index=True)
        with cb:
            st.markdown("🤖 `predictions` table")
            df_s2,_=run_sql("""SELECT COUNT(*) AS predictions,
                COUNT(DISTINCT risk_category) AS risk_levels,
                ROUND(AVG(churn_prob)*100,2) AS avg_churn_pct,
                COUNT(CASE WHEN risk_category='HIGH' THEN 1 END) AS high_count
                FROM predictions""")
            if not df_s2.empty: st.dataframe(df_s2,use_container_width=True,hide_index=True)

    # ════════════════════════════════════════════════════════════
    # TAB 4 — Custom SQL
    # ════════════════════════════════════════════════════════════
    with tab4:
        st.markdown("### ✍️ Write Your Own SQL")
        st.markdown("<p style='color:#94a3b8'>Available tables: "
                    "<code>customers</code> and <code>predictions</code>. "
                    "Join on <code>customer_id</code>.</p>",
                    unsafe_allow_html=True)

        preset=st.selectbox("Load a preset",[
            "Custom (write your own)",
            "Payment Method vs Churn",
            "Revenue by Risk Segment (ROI)",
            "Top 10 Highest Churn Probability",
            "Retention Campaign Effectiveness",
        ])
        PRESETS={
            "Payment Method vs Churn":
                "SELECT c.payment_method, COUNT(*) AS customers,\n"
                "       ROUND(100.0*SUM(c.churn)/COUNT(*),2) AS churn_rate_pct,\n"
                "       ROUND(AVG(c.monthly_charges),2) AS avg_charges\n"
                "FROM customers c GROUP BY c.payment_method\n"
                "ORDER BY churn_rate_pct DESC;",
            "Revenue by Risk Segment (ROI)":
                "SELECT p.risk_category, COUNT(*) AS customers,\n"
                "       ROUND(SUM(c.monthly_charges*12),0) AS annual_rev_at_risk,\n"
                "       ROUND(COUNT(*)*250.0,0) AS campaign_cost_est,\n"
                "       ROUND(SUM(c.monthly_charges*12)*0.20,0) AS est_rev_saved,\n"
                "       ROUND(SUM(c.monthly_charges*12)*0.20-COUNT(*)*250.0,0) AS net_roi\n"
                "FROM customers c JOIN predictions p ON c.customer_id=p.customer_id\n"
                "WHERE p.risk_category IN ('HIGH','MEDIUM')\n"
                "GROUP BY p.risk_category ORDER BY annual_rev_at_risk DESC;",
            "Top 10 Highest Churn Probability":
                "SELECT c.customer_id, c.tenure, c.monthly_charges,\n"
                "       c.contract, c.internet_service,\n"
                "       ROUND(p.churn_prob*100,2) AS churn_pct,\n"
                "       ROUND(c.monthly_charges*12,2) AS annual_rev\n"
                "FROM customers c JOIN predictions p ON c.customer_id=p.customer_id\n"
                "ORDER BY p.churn_prob DESC LIMIT 10;",
            "Retention Campaign Effectiveness":
                "SELECT p.action_taken, COUNT(*) AS targeted,\n"
                "       SUM(CASE WHEN p.outcome='retained' THEN 1 ELSE 0 END) AS retained,\n"
                "       SUM(CASE WHEN p.outcome='churned'  THEN 1 ELSE 0 END) AS churned\n"
                "FROM predictions p WHERE p.action_taken IS NOT NULL\n"
                "GROUP BY p.action_taken ORDER BY targeted DESC;",
        }
        default_sql=PRESETS.get(preset,
            "SELECT c.contract, c.internet_service,\n"
            "       COUNT(*) AS customers,\n"
            "       ROUND(100.0*SUM(c.churn)/COUNT(*),2) AS churn_rate_pct\n"
            "FROM customers c\n"
            "GROUP BY c.contract, c.internet_service\n"
            "ORDER BY churn_rate_pct DESC LIMIT 15;")

        custom_sql=st.text_area("SQL Query",value=default_sql,height=165)
        ca,cb=st.columns([1,4])
        with ca: run_btn=st.button("▶️ Execute",use_container_width=True)
        with cb:
            st.markdown(
                "<div style='padding:10px 0;font-size:12px;color:#94a3b8'>"
                "💡 Tip: use <code>JOIN predictions p ON c.customer_id=p.customer_id</code>"
                " to combine customer data with ML scores.</div>",
                unsafe_allow_html=True)
        if run_btn:
            df_c,err=run_sql(custom_sql)
            if not df_c.empty:
                st.success(f"✅ {len(df_c)} rows returned")
                st.dataframe(df_c,use_container_width=True,hide_index=True)
                st.download_button("⬇️ Download",df_c.to_csv(index=False),
                                   "query_result.csv","text/csv")
            if err: st.error(f"SQL Error: {err}")