# ============================================================
# api_server.py — Churn AI FastAPI Backend
# Connects: XGBoost model + SQLite DB + ROI + Batch Predict
# Usage:
#   pip install fastapi uvicorn pandas scikit-learn xgboost joblib
#   uvicorn api_server:app --reload --port 8000
#
# React+Vite frontend: set VITE_API_URL=http://localhost:8000
# ============================================================

import os, json, sqlite3, warnings, io
from typing import Optional
import numpy as np
import pandas as pd
import joblib

warnings.filterwarnings("ignore")

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

# ─────────────────────────────────────────────
# APP INIT + CORS
# ─────────────────────────────────────────────
app = FastAPI(
    title="Churn AI API",
    description="XGBoost-powered customer churn prediction backend",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # tighten in production: ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────
# STATIC FILES — serve reports/ images
# Access: http://localhost:8000/reports/eda_dashboard.png
# ─────────────────────────────────────────────
os.makedirs("reports", exist_ok=True)
app.mount("/reports", StaticFiles(directory="reports"), name="reports")

# ─────────────────────────────────────────────
# REPORTS LIST ENDPOINT
# ─────────────────────────────────────────────
REPORT_NAMES = [
    # EDA
    "eda_dashboard", "eda_insights", "correlation_heatmap", "class_imbalance",
    "churn_by_payment", "scaling_comparison",
    # Feature / Graph series
    "graph1_services_vs_churn", "graph2_contract_risk", "graph3_revenue_features",
    "graph4_flags", "graph5_correlation", "graph6_tenure_groups", "graph7_heatmap",
    # Model performance
    "all_models_metric_comparison", "all_models_roc_comparison",
    "model_comparison_bar", "roc_curves", "roc_curve_lightgbm",
    "confusion_matrix", "confusion_matrix_lightgbm",
    "churn_score_analysis", "risk_distribution", "revenue_waterfall", "roi_analysis",
    "feature_importance_lightgbm", "feature_importance_rf",
    # SHAP
    "shap_bar", "shap_summary", "shap_waterfall_highrisk",
    "shap_dependence", "shap_force_plot",
]

@app.get("/api/reports/list", tags=["Reports"])
def list_reports():
    """Returns which report PNG images exist on disk."""
    return {
        name: os.path.exists(f"reports/{name}.png")
        for name in REPORT_NAMES
    }

# ─────────────────────────────────────────────
# PATHS
# ─────────────────────────────────────────────
MODEL_DIR   = "models"
DATA_DIR    = "data"
RAW_CSV     = os.path.join(DATA_DIR, "raw", "teleco_churn.csv")
FEAT_CSV    = os.path.join(DATA_DIR, "processed", "featured_data.csv")
FEAT_COLS   = os.path.join(MODEL_DIR, "feature_columns.json")
XGB_PATH    = os.path.join(MODEL_DIR, "xgboost.pkl")
RF_PATH     = os.path.join(MODEL_DIR, "random_forest.pkl")
LR_PATH     = os.path.join(MODEL_DIR, "logistic_regression.pkl")
DB_PATH     = os.path.join(DATA_DIR, "churn_analytics.db")

# ─────────────────────────────────────────────
# LAZY LOADERS (cached at module level)
# ─────────────────────────────────────────────
_cache: dict = {}

def _load(key, loader):
    if key not in _cache:
        _cache[key] = loader()
    return _cache[key]

def get_xgb():
    return _load("xgb", lambda: joblib.load(XGB_PATH) if os.path.exists(XGB_PATH) else None)

def get_rf():
    return _load("rf", lambda: joblib.load(RF_PATH) if os.path.exists(RF_PATH) else None)

def get_lr():
    return _load("lr", lambda: joblib.load(LR_PATH) if os.path.exists(LR_PATH) else None)

def get_feat_cols():
    def _load_fc():
        if os.path.exists(FEAT_COLS):
            with open(FEAT_COLS) as f:
                return json.load(f)
        m = get_xgb()
        if m:
            try: return list(m.get_booster().feature_names)
            except: pass
        return None
    return _load("feat_cols", _load_fc)

def get_df_feat():
    return _load("df_feat", lambda: pd.read_csv(FEAT_CSV) if os.path.exists(FEAT_CSV) else None)

def get_df_raw():
    return _load("df_raw", lambda: pd.read_csv(RAW_CSV) if os.path.exists(RAW_CSV) else None)

# ─────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────
def risk_label(p: float) -> str:
    if p >= 0.70: return "HIGH"
    if p >= 0.40: return "MEDIUM"
    return "LOW"

def align_features(X: pd.DataFrame, model_cols: list) -> pd.DataFrame:
    for c in model_cols:
        if c not in X.columns:
            X[c] = 0
    X = X[model_cols]
    bool_c = X.select_dtypes(include="bool").columns
    if len(bool_c):
        X[bool_c] = X[bool_c].astype(int)
    return X.fillna(0)

def get_db_conn():
    if not os.path.exists(DB_PATH):
        raise HTTPException(status_code=503, detail="Database not found. Run the ML pipeline first.")
    return sqlite3.connect(DB_PATH, check_same_thread=False)

def _build_prediction_row(tenure, monthly, senior, partner, deps,
                           contract, internet, payment, paperless,
                           phone, security, backup, device,
                           support, tv, movies, feat_cols) -> dict:
    """Map form inputs → feature vector (mirrors Streamlit logic)."""
    row = {c: 0 for c in feat_cols}
    row["tenure"]           = (tenure  - 32.4) / 24.6
    row["MonthlyCharges"]   = (monthly - 64.8) / 30.1
    row["TotalCharges"]     = ((monthly * tenure) - 2283) / 2267
    row["SeniorCitizen"]    = int(senior   == "Yes")
    row["Partner"]          = int(partner  == "Yes")
    row["Dependents"]       = int(deps     == "Yes")
    row["PhoneService"]     = int(phone    == "Yes")
    row["PaperlessBilling"] = int(paperless == "Yes")
    for k, v in {
        "InternetService_Fiber optic":          internet == "Fiber optic",
        "InternetService_No":                   internet == "No",
        "Contract_One year":                    contract == "One year",
        "Contract_Two year":                    contract == "Two year",
        "PaymentMethod_Credit card (automatic)":payment  == "Credit card (automatic)",
        "PaymentMethod_Electronic check":       payment  == "Electronic check",
        "PaymentMethod_Mailed check":           payment  == "Mailed check",
    }.items():
        if k in row: row[k] = int(v)
    svc = sum([phone == "Yes", security == "Yes", backup == "Yes",
               device == "Yes", support == "Yes", tv == "Yes", movies == "Yes"])
    if "total_services"     in row: row["total_services"]     = svc
    if "high_value"         in row: row["high_value"]         = int(monthly > 80)
    if "contract_risk"      in row: row["contract_risk"]      = int(contract == "Month-to-month")
    if "fiber_risk"         in row: row["fiber_risk"]         = int(internet == "Fiber optic")
    if "revenue_per_tenure" in row: row["revenue_per_tenure"] = monthly / (tenure + 1)
    if "charges_x_tenure"   in row: row["charges_x_tenure"]  = monthly * tenure
    t_s = (tenure - 32.4) / 24.6
    if "tenure_risk_med"  in row: row["tenure_risk_med"]  = int(-0.5 <= t_s < 0.1)
    if "tenure_risk_low"  in row: row["tenure_risk_low"]  = int(0.1 <= t_s < 0.7)
    if "tenure_risk_vlow" in row: row["tenure_risk_vlow"] = int(t_s >= 0.7)
    return row, svc

def _heuristic_prob(contract, internet, tenure, monthly, security, support):
    prob = 0.20
    if contract == "Month-to-month": prob += 0.28
    if internet == "Fiber optic":    prob += 0.12
    if tenure < 12:                  prob += 0.18
    if monthly > 80:                 prob += 0.08
    if security == "No":             prob += 0.05
    if support  == "No":             prob += 0.05
    return min(prob, 0.97)


# ═══════════════════════════════════════════════════════════════
# PYDANTIC SCHEMAS
# ═══════════════════════════════════════════════════════════════
class PredictRequest(BaseModel):
    tenure:    int   = Field(..., ge=0, le=72,  example=12)
    monthly:   float = Field(..., ge=20, le=120, example=75.0)
    senior:    str   = Field("No",  example="No")
    partner:   str   = Field("No",  example="Yes")
    deps:      str   = Field("No",  example="No")
    contract:  str   = Field("Month-to-month", example="Month-to-month")
    internet:  str   = Field("Fiber optic",    example="Fiber optic")
    payment:   str   = Field("Electronic check", example="Electronic check")
    paperless: str   = Field("Yes", example="Yes")
    phone:     str   = Field("Yes", example="Yes")
    security:  str   = Field("No",  example="No")
    backup:    str   = Field("No",  example="No")
    device:    str   = Field("No",  example="No")
    support:   str   = Field("No",  example="No")
    tv:        str   = Field("No",  example="No")
    movies:    str   = Field("No",  example="No")

class ROIRequest(BaseModel):
    total_customers:   int   = 7043
    avg_monthly_rev:   float = 64.76
    churn_rate_pct:    float = 27.0
    retention_high:    float = 25.0
    retention_medium:  float = 15.0
    campaign_cost_high:   int = 250
    campaign_cost_medium: int = 100

class CustomSQLRequest(BaseModel):
    sql: str


# ═══════════════════════════════════════════════════════════════
# ROUTES — SYSTEM / STATUS
# ═══════════════════════════════════════════════════════════════
@app.get("/", tags=["System"])
def root():
    return {"status": "ok", "app": "Churn AI API", "version": "1.0.0"}

@app.get("/status", tags=["System"])
def system_status():
    """Returns model + data availability (mirrors sidebar status panel)."""
    df_feat = get_df_feat()
    return {
        "models": {
            "xgboost":            os.path.exists(XGB_PATH),
            "random_forest":      os.path.exists(RF_PATH),
            "logistic_regression":os.path.exists(LR_PATH),
        },
        "data": {
            "featured_data": os.path.exists(FEAT_CSV),
            "raw_data":       os.path.exists(RAW_CSV),
            "database":       os.path.exists(DB_PATH),
        },
        "dataset": {
            "rows":     int(len(df_feat)) if df_feat is not None else None,
            "features": int(df_feat.shape[1]) if df_feat is not None else None,
        }
    }


# ═══════════════════════════════════════════════════════════════
# ROUTES — DASHBOARD
# ═══════════════════════════════════════════════════════════════
@app.get("/dashboard/kpis", tags=["Dashboard"])
def dashboard_kpis():
    """Top KPI cards: total customers, churned, churn rate, revenue at risk."""
    df_feat = get_df_feat()
    df_raw  = get_df_raw()
    if df_feat is None:
        raise HTTPException(status_code=503, detail="Pipeline not run yet.")
    avg_mc     = float(df_raw["MonthlyCharges"].mean()) if df_raw is not None else 64.76
    churn_rate = float(df_feat["Churn"].mean())
    n_churn    = int(df_feat["Churn"].sum())
    return {
        "total_customers": int(len(df_feat)),
        "churned":         n_churn,
        "churn_rate_pct":  round(churn_rate * 100, 1),
        "annual_rev_at_risk": round(n_churn * avg_mc * 12, 2),
    }

@app.get("/dashboard/model_performance", tags=["Dashboard"])
def model_performance():
    """Static model performance metrics."""
    return {
        "models": [
            {"name": "XGBoost",           "roc_auc": 87.4, "recall": 84.1, "f1": 81.7, "color": "#6366f1"},
            {"name": "Random Forest",     "roc_auc": 86.3, "recall": 79.5, "f1": 75.2, "color": "#8b5cf6"},
            {"name": "Logistic Regression","roc_auc": 82.2, "recall": 75.8, "f1": 71.3, "color": "#f59e0b"},
        ]
    }

@app.get("/dashboard/insights", tags=["Dashboard"])
def business_insights():
    """Key business insight cards."""
    return {
        "insights": [
            {"title": "Month-to-month", "description": "42.7% churn — 3× riskier than 2-yr contract", "color": "#ef4444"},
            {"title": "Fiber optic",    "description": "41.9% churn — highest of all internet segments","color": "#f59e0b"},
            {"title": "5+ services",    "description": "Only 12% churn — embed customers deeper",        "color": "#10b981"},
            {"title": "First 12 months","description": "47% churn rate — critical retention window",     "color": "#6366f1"},
        ]
    }


# ═══════════════════════════════════════════════════════════════
# ROUTES — LIVE PREDICTION
# ═══════════════════════════════════════════════════════════════
@app.post("/predict", tags=["Prediction"])
def predict_single(req: PredictRequest):
    """
    Run XGBoost churn prediction for a single customer.
    Falls back to calibrated heuristic if model unavailable.
    """
    model     = get_xgb()
    feat_cols = get_feat_cols()
    prob      = None
    mode      = "model"

    if model and feat_cols:
        try:
            row, svc = _build_prediction_row(
                req.tenure, req.monthly, req.senior, req.partner, req.deps,
                req.contract, req.internet, req.payment, req.paperless,
                req.phone, req.security, req.backup, req.device,
                req.support, req.tv, req.movies, feat_cols)
            X_in = pd.DataFrame([row])[feat_cols]
            prob = float(model.predict_proba(X_in)[0][1])
        except Exception as e:
            mode = f"heuristic (model error: {e})"
    else:
        svc = sum([req.phone == "Yes", req.security == "Yes", req.backup == "Yes",
                   req.device == "Yes", req.support == "Yes", req.tv == "Yes",
                   req.movies == "Yes"])

    if prob is None:
        mode = "heuristic"
        prob = _heuristic_prob(req.contract, req.internet, req.tenure,
                               req.monthly, req.security, req.support)

    risk   = risk_label(prob)
    annual = req.monthly * 12
    camp   = annual * 0.18
    saving = annual * 0.82

    actions_map = {
        "HIGH":   ["📞 Personal call within 24 hrs",
                   "💰 Offer 20–25% discount + annual upgrade",
                   "🎁 Free bundle: Security + Support + Streaming",
                   "⚡ Escalate to Retention Team — PRIORITY",
                   "📋 Schedule satisfaction review in 48 hrs"],
        "MEDIUM": ["📧 Personalised loyalty email in 48 hrs",
                   "🔒 Contract upgrade offer with add-ons",
                   "💬 Proactive support check-in call",
                   "🎯 Referral bonus or cashback incentive"],
        "LOW":    ["🌟 Enroll in loyalty rewards programme",
                   "📢 Upsell premium plan via in-app message",
                   "✉️ Monthly engagement newsletter"],
    }

    return {
        "churn_probability":    round(prob, 4),
        "churn_probability_pct":round(prob * 100, 1),
        "risk_category":        risk,
        "mode":                 mode,
        "revenue_impact": {
            "annual_revenue_at_risk":  round(annual, 2),
            "campaign_cost_estimate":  round(camp, 2),
            "net_saving_if_retained":  round(saving, 2),
            "monthly_charges":         req.monthly,
            "tenure_months":           req.tenure,
            "services_subscribed":     svc,
        },
        "retention_actions": actions_map[risk],
    }


# ═══════════════════════════════════════════════════════════════
# ROUTES — EDA
# ═══════════════════════════════════════════════════════════════
@app.get("/eda/correlation", tags=["EDA"])
def eda_correlation(top_n: int = 20):
    """Top-N feature correlations with Churn (live from featured_data.csv)."""
    df_feat = get_df_feat()
    if df_feat is None:
        raise HTTPException(status_code=503, detail="featured_data.csv not found.")
    num_df = df_feat.select_dtypes(include=[np.number])
    corr   = num_df.corr()["Churn"].drop("Churn").sort_values(key=abs, ascending=False)
    top    = corr.head(top_n)
    return {
        "features":     top.index.tolist(),
        "correlations": top.round(4).tolist(),
    }

@app.get("/eda/overview", tags=["EDA"])
def eda_overview():
    """Basic dataset overview stats."""
    df_feat = get_df_feat()
    df_raw  = get_df_raw()
    if df_feat is None:
        raise HTTPException(status_code=503, detail="Pipeline not run yet.")
    result = {
        "shape": {"rows": int(df_feat.shape[0]), "cols": int(df_feat.shape[1])},
        "churn_distribution": df_feat["Churn"].value_counts().to_dict(),
    }
    if df_raw is not None and "MonthlyCharges" in df_raw.columns:
        result["monthly_charges"] = {
            "mean":   round(float(df_raw["MonthlyCharges"].mean()), 2),
            "median": round(float(df_raw["MonthlyCharges"].median()), 2),
            "std":    round(float(df_raw["MonthlyCharges"].std()), 2),
            "min":    round(float(df_raw["MonthlyCharges"].min()), 2),
            "max":    round(float(df_raw["MonthlyCharges"].max()), 2),
        }
        result["tenure"] = {
            "mean":   round(float(df_raw["tenure"].mean()), 2),
            "median": round(float(df_raw["tenure"].median()), 2),
            "std":    round(float(df_raw["tenure"].std()), 2),
        }
    return result


# ═══════════════════════════════════════════════════════════════
# ROUTES — BATCH PREDICTION
# ═══════════════════════════════════════════════════════════════
@app.post("/predict/batch", tags=["Batch"])
async def predict_batch(file: UploadFile = File(...)):
    """
    Upload a CSV → score every row → download results CSV.
    Returns JSON summary + download link hint.
    """
    model     = get_xgb()
    feat_cols = get_feat_cols()
    if not model or not feat_cols:
        raise HTTPException(status_code=503, detail="XGBoost model not available.")
    contents = await file.read()
    try:
        df_up = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"CSV parse error: {e}")

    X_b    = align_features(df_up.copy(), feat_cols)
    probs  = model.predict_proba(X_b)[:, 1]
    df_up["churn_probability"] = probs.round(4)
    df_up["risk_category"]     = pd.cut(probs, bins=[-0.1, 0.4, 0.7, 1.01],
                                         labels=["LOW", "MEDIUM", "HIGH"]).astype(str)
    high = int((df_up["risk_category"] == "HIGH").sum())
    med  = int((df_up["risk_category"] == "MEDIUM").sum())
    low  = int((df_up["risk_category"] == "LOW").sum())

    return {
        "total_rows": len(df_up),
        "summary": {
            "high_risk":        high,
            "medium_risk":      med,
            "low_risk":         low,
            "revenue_at_risk":  round(high * 64.76 * 12, 2),
        },
        "top_30": df_up.sort_values("churn_probability", ascending=False)
                       .head(30)
                       .to_dict(orient="records"),
    }

@app.post("/predict/batch/download", tags=["Batch"])
async def predict_batch_download(file: UploadFile = File(...)):
    """Same as /predict/batch but streams back a scored CSV for download."""
    model     = get_xgb()
    feat_cols = get_feat_cols()
    if not model or not feat_cols:
        raise HTTPException(status_code=503, detail="XGBoost model not available.")
    contents = await file.read()
    df_up = pd.read_csv(io.BytesIO(contents))
    X_b   = align_features(df_up.copy(), feat_cols)
    probs = model.predict_proba(X_b)[:, 1]
    df_up["churn_probability"] = probs.round(4)
    df_up["risk_category"]     = pd.cut(probs, bins=[-0.1, 0.4, 0.7, 1.01],
                                         labels=["LOW", "MEDIUM", "HIGH"]).astype(str)
    output = io.StringIO()
    df_up.sort_values("churn_probability", ascending=False).to_csv(output, index=False)
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=predictions.csv"},
    )


# ═══════════════════════════════════════════════════════════════
# ROUTES — ROI CALCULATOR
# ═══════════════════════════════════════════════════════════════
@app.post("/roi/calculate", tags=["ROI"])
def roi_calculate(req: ROIRequest):
    """Business ROI calculation — all inputs, all outputs."""
    churn_r    = req.churn_rate_pct / 100
    ret_h      = req.retention_high / 100
    ret_m      = req.retention_medium / 100
    n_churn    = int(req.total_customers * churn_r)
    n_high     = int(n_churn * 0.40)
    n_med      = int(n_churn * 0.35)
    rev_risk   = round(n_churn * req.avg_monthly_rev * 12, 2)
    camp_cost  = n_high * req.campaign_cost_high + n_med * req.campaign_cost_medium
    rev_saved  = round((int(n_high * ret_h) + int(n_med * ret_m)) * req.avg_monthly_rev * 12, 2)
    net_roi    = round(rev_saved - camp_cost, 2)
    roi_pct    = round((net_roi / camp_cost * 100), 1) if camp_cost > 0 else 0.0
    total_annual = round(req.total_customers * req.avg_monthly_rev * 12, 2)
    return {
        "inputs": req.dict(),
        "results": {
            "predicted_churners":   n_churn,
            "high_risk_customers":  n_high,
            "medium_risk_customers":n_med,
            "annual_revenue_at_risk":rev_risk,
            "total_campaign_cost":  camp_cost,
            "revenue_saved":        rev_saved,
            "net_roi":              net_roi,
            "roi_pct":              roi_pct,
        },
        "waterfall": [
            {"label": "Total Annual Revenue", "value": total_annual,  "color": "#6366f1"},
            {"label": "Revenue at Risk",       "value": rev_risk,      "color": "#ef4444"},
            {"label": "Campaign Cost",         "value": camp_cost,     "color": "#f59e0b"},
            {"label": "Revenue Saved",         "value": rev_saved,     "color": "#10b981"},
            {"label": "Net ROI",               "value": net_roi,       "color": "#8b5cf6"},
        ],
    }


# ═══════════════════════════════════════════════════════════════
# ROUTES — SQL ANALYTICS
# ═══════════════════════════════════════════════════════════════
@app.get("/sql/kpis", tags=["SQL Analytics"])
def sql_kpis():
    """Top KPIs pulled live from the SQLite DB (customers + predictions join)."""
    conn = get_db_conn()
    try:
        df = pd.read_sql_query("""
            SELECT COUNT(*) AS total,
                   SUM(c.churn)                                          AS actual_churned,
                   COUNT(CASE WHEN p.risk_category='HIGH'   THEN 1 END) AS high_risk,
                   COUNT(CASE WHEN p.risk_category='MEDIUM' THEN 1 END) AS med_risk,
                   COUNT(CASE WHEN p.risk_category='LOW'    THEN 1 END) AS low_risk,
                   ROUND(SUM(CASE WHEN p.risk_category='HIGH'
                       THEN c.monthly_charges*12 ELSE 0 END),0)         AS rev_at_risk
            FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
        """, conn)
        return df.iloc[0].to_dict()
    finally:
        conn.close()

@app.get("/sql/high_risk_customers", tags=["SQL Analytics"])
def sql_high_risk(min_monthly: float = 60.0, limit: int = 50):
    """Top high-value customers at HIGH risk (mirrors high_risk_customers.sql Q1)."""
    conn = get_db_conn()
    try:
        df = pd.read_sql_query(f"""
            SELECT c.customer_id, c.tenure, c.monthly_charges,
                   c.contract, c.internet_service,
                   ROUND(p.churn_prob*100,2) AS churn_probability_pct,
                   ROUND(c.monthly_charges*12,2) AS annual_revenue_at_risk
            FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
            WHERE p.risk_category='HIGH' AND c.monthly_charges>{min_monthly}
            ORDER BY annual_revenue_at_risk DESC LIMIT {limit}
        """, conn)
        return {"count": len(df), "rows": df.to_dict(orient="records")}
    finally:
        conn.close()

@app.get("/sql/risk_by_contract", tags=["SQL Analytics"])
def sql_risk_by_contract():
    """Risk distribution by contract type (mirrors high_risk_customers.sql Q2)."""
    conn = get_db_conn()
    try:
        df = pd.read_sql_query("""
            SELECT c.contract, p.risk_category,
                   COUNT(*) AS customer_count,
                   ROUND(AVG(p.churn_prob)*100,2) AS avg_churn_prob_pct,
                   ROUND(SUM(c.monthly_charges*12),2) AS total_annual_revenue
            FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
            GROUP BY c.contract, p.risk_category
            ORDER BY c.contract, p.risk_category
        """, conn)
        return df.to_dict(orient="records")
    finally:
        conn.close()

@app.get("/sql/senior_high_risk", tags=["SQL Analytics"])
def sql_senior_high_risk():
    """Senior citizens at HIGH risk (mirrors high_risk_customers.sql Q3)."""
    conn = get_db_conn()
    try:
        df = pd.read_sql_query("""
            SELECT c.customer_id, c.tenure, c.monthly_charges,
                   ROUND(p.churn_prob*100,2) AS churn_pct,
                   c.contract, c.internet_service
            FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
            WHERE c.senior_citizen=1 AND p.risk_category='HIGH'
            ORDER BY p.churn_prob DESC
        """, conn)
        return {"count": len(df), "rows": df.to_dict(orient="records")}
    finally:
        conn.close()

@app.get("/sql/revenue_summary", tags=["SQL Analytics"])
def sql_revenue_summary():
    """Revenue summary by risk segment (mirrors high_risk_customers.sql Q4)."""
    conn = get_db_conn()
    try:
        df = pd.read_sql_query("""
            SELECT p.risk_category, COUNT(*) AS customers,
                   ROUND(AVG(p.churn_prob)*100,2) AS avg_churn_pct,
                   ROUND(SUM(c.monthly_charges),2) AS monthly_rev,
                   ROUND(SUM(c.monthly_charges*12),2) AS annual_rev
            FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
            GROUP BY p.risk_category ORDER BY avg_churn_pct DESC
        """, conn)
        return df.to_dict(orient="records")
    finally:
        conn.close()

@app.get("/sql/churn_by_contract", tags=["SQL Analytics"])
def sql_churn_by_contract():
    """Actual churn rate by contract (mirrors churn_trend.sql Q2)."""
    conn = get_db_conn()
    try:
        df = pd.read_sql_query("""
            SELECT contract, COUNT(*) AS total, SUM(churn) AS churned,
                   ROUND(100.0*SUM(churn)/COUNT(*),2) AS churn_rate_pct,
                   ROUND(AVG(monthly_charges),2) AS avg_monthly_charges,
                   ROUND(AVG(tenure),1) AS avg_tenure_months
            FROM customers GROUP BY contract ORDER BY churn_rate_pct DESC
        """, conn)
        return df.to_dict(orient="records")
    finally:
        conn.close()

@app.get("/sql/tenure_cohort", tags=["SQL Analytics"])
def sql_tenure_cohort():
    """Churn rate by tenure cohort (mirrors churn_trend.sql Q5)."""
    conn = get_db_conn()
    try:
        df = pd.read_sql_query("""
            SELECT CASE WHEN tenure BETWEEN 0  AND 12 THEN '1. 0-12m (High Risk)'
                        WHEN tenure BETWEEN 13 AND 24 THEN '2. 13-24m (Med Risk)'
                        WHEN tenure BETWEEN 25 AND 48 THEN '3. 25-48m (Low Risk)'
                        ELSE '4. 48m+ (Very Low)' END AS tenure_group,
                   COUNT(*) AS customers, SUM(churn) AS churned,
                   ROUND(100.0*SUM(churn)/COUNT(*),2) AS churn_rate_pct,
                   ROUND(AVG(monthly_charges),2) AS avg_charges
            FROM customers GROUP BY tenure_group ORDER BY tenure_group
        """, conn)
        return df.to_dict(orient="records")
    finally:
        conn.close()

@app.get("/sql/churn_by_internet", tags=["SQL Analytics"])
def sql_churn_by_internet():
    """Churn rate by internet service type (mirrors churn_trend.sql internet query)."""
    conn = get_db_conn()
    try:
        df = pd.read_sql_query("""
            SELECT c.internet_service, COUNT(*) AS customers, SUM(c.churn) AS churned,
                   ROUND(100.0*SUM(c.churn)/COUNT(*),2) AS churn_rate_pct,
                   ROUND(AVG(c.monthly_charges),2) AS avg_charges,
                   COUNT(CASE WHEN p.risk_category='HIGH' THEN 1 END) AS high_risk_count
            FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
            GROUP BY c.internet_service ORDER BY churn_rate_pct DESC
        """, conn)
        return df.to_dict(orient="records")
    finally:
        conn.close()

@app.get("/sql/unactioned_high_risk", tags=["SQL Analytics"])
def sql_unactioned(limit: int = 50):
    """HIGH-risk customers with no action taken yet (mirrors churn_trend.sql Q3)."""
    conn = get_db_conn()
    try:
        df = pd.read_sql_query(f"""
            SELECT c.customer_id, c.tenure, c.monthly_charges, c.contract,
                   ROUND(p.churn_prob*100,2) AS churn_pct,
                   ROUND(c.monthly_charges*12,2) AS annual_rev
            FROM customers c JOIN predictions p ON c.customer_id=p.customer_id
            WHERE p.risk_category='HIGH' AND p.action_taken IS NULL
            ORDER BY p.churn_prob DESC LIMIT {limit}
        """, conn)
        return {"count": len(df), "rows": df.to_dict(orient="records")}
    finally:
        conn.close()

@app.get("/sql/schema_stats", tags=["SQL Analytics"])
def sql_schema_stats():
    """Live row counts and basic stats for both tables."""
    conn = get_db_conn()
    try:
        c_stats = pd.read_sql_query("""
            SELECT COUNT(*) AS rows,
                   COUNT(DISTINCT contract) AS contracts,
                   COUNT(DISTINCT internet_service) AS inet_types,
                   SUM(churn) AS total_churned
            FROM customers
        """, conn).iloc[0].to_dict()
        p_stats = pd.read_sql_query("""
            SELECT COUNT(*) AS predictions,
                   COUNT(DISTINCT risk_category) AS risk_levels,
                   ROUND(AVG(churn_prob)*100,2) AS avg_churn_pct,
                   COUNT(CASE WHEN risk_category='HIGH' THEN 1 END) AS high_count
            FROM predictions
        """, conn).iloc[0].to_dict()
        return {"customers_table": c_stats, "predictions_table": p_stats}
    finally:
        conn.close()

@app.post("/sql/custom", tags=["SQL Analytics"])
def sql_custom(req: CustomSQLRequest):
    """
    Execute arbitrary read-only SQL against the SQLite DB.
    Only SELECT statements are allowed.
    """
    sql = req.sql.strip()
    if not sql.lower().startswith("select"):
        raise HTTPException(status_code=400, detail="Only SELECT statements are permitted.")
    conn = get_db_conn()
    try:
        df = pd.read_sql_query(sql, conn)
        return {"rows": len(df), "data": df.to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"SQL Error: {e}")
    finally:
        conn.close()


# ═══════════════════════════════════════════════════════════════
# ENTRY POINT
# ═══════════════════════════════════════════════════════════════
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api_server:app", host="0.0.0.0", port=8000, reload=True)