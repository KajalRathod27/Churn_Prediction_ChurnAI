# 🔮 Churn AI — Customer Churn Prediction Platform

An **industry-grade, end-to-end AI-powered** customer churn prediction and retention analytics platform built for the telecommunications domain with:

| Layer | Stack |
|-------|-------|
| Frontend | React 18 + Vite + Custom CSS + JetBrains Mono |
| Backend API | FastAPI (Python) + Uvicorn |
| ML Models | XGBoost · LightGBM · Random Forest · Logistic Regression · ANN (Keras) |
| Explainability | SHAP (SHapley Additive exPlanations) |
| Data Storage | SQLite — customer records + prediction history |
| Visualization | Matplotlib · Seaborn — 30+ analytical report charts |

🚀 **Live Demo:** https://churnpredictionai.netlify.app
⚙️ **Backend API:** https://churn-prediction-churnai.onrender.com
📖 **API Docs:** https://churn-prediction-churnai.onrender.com/docs

---

## 📁 Folder Structure

```
Churn_Prediction_ChurnAI/
├── backend/
│   ├── api_server.py              # FastAPI app — all REST endpoints
│   ├── requirements.txt           # Python dependencies
│   ├── data/
│   │   ├── churn_analytics.db     # SQLite DB — customers + predictions
│   │   ├── processed/
│   │   │   ├── cleaned_data.csv   # Post-preprocessing data
│   │   │   └── featured_data.csv  # Feature-engineered data
│   │   └── raw/
│   │       └── teleco_churn.csv   # IBM Telco raw dataset
│   ├── models/
│   │   ├── xgboost.pkl            # Primary production model
│   │   ├── random_forest.pkl      # Ensemble model
│   │   ├── logistic_regression.pkl# Baseline linear model
│   │   ├── lightgbm.pkl           # Fast gradient boosting
│   │   ├── ann_model.h5           # Deep learning model (Keras)
│   │   ├── scaler.pkl             # StandardScaler for normalization
│   │   └── feature_columns.json   # Feature schema for inference
│   └── reports/
│       └── (30+ PNG charts)       # EDA, SHAP, ROC, confusion matrices
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── netlify.toml               # Netlify deployment config
│   ├── .env                       # VITE_API_URL environment variable
│   └── src/
│       ├── main.jsx               # React entry point
│       ├── App.jsx                # Root component
│       ├── App.css                # Global styles
│       └── components/
│           ├── Home.jsx           # App shell — sidebar, topbar, routing
│           ├── DashboardPage.jsx  # KPIs, model performance, insights
│           ├── PredictPage.jsx    # Real-time single customer prediction
│           ├── BatchPage.jsx      # CSV bulk prediction + download
│           ├── ROIPage.jsx        # Retention campaign ROI calculator
│           ├── SQLPage.jsx        # SQL analytics interface
│           ├── VisPage.jsx        # EDA + feature graph gallery
│           └── ModelPage.jsx      # Model metrics, ROC, SHAP charts
│
├── notebooks/
│   ├── EDA.ipynb                  # Exploratory data analysis
│   ├── preprocessing.ipynb        # Data cleaning pipeline
│   ├── feature_engineering.ipynb  # Feature derivation
│   ├── business_roi.ipynb         # ROI analysis notebook
│   └── shap_explainability.ipynb  # SHAP analysis
│
├── pycodes/src/
│   ├── preprocessing.py           # Data cleaning pipeline
│   ├── feature_engineering.py     # Feature derivation
│   ├── train.py                   # Model training pipeline
│   └── evaluate.py                # Model evaluation + report generation
│
├── sql/
│   ├── create_tables.sql          # DB schema setup
│   ├── high_risk_customers.sql    # Business analytics queries
│   └── churn_trend.sql            # Churn trend analysis queries
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### 1. Prerequisites
- Python 3.11+ and pip
- Node.js 18+ and npm

### 2. Clone the Repository
```bash
git clone https://github.com/KajalRathod27/Churn_Prediction_ChurnAI.git
cd Churn_Prediction_ChurnAI
```

### 3. Start Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn api_server:app --reload --port 8000
# API docs available at http://localhost:8000/docs
```

### 4. Start Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
# App available at http://localhost:5173
```

### 5. Set Environment Variable
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
```

---

## 🧩 Features — All 8 Pages Implemented

| # | Feature | Page | Description |
|---|---------|------|-------------|
| 1 | **Live Dashboard** | DashboardPage | KPIs, model performance, business insights, system status |
| 2 | **Real-time Prediction** | PredictPage | Single customer churn scoring with retention actions |
| 3 | **Batch Prediction** | BatchPage | CSV upload → bulk scoring → downloadable results |
| 4 | **ROI Calculator** | ROIPage | Retention campaign financial impact analysis |
| 5 | **SQL Analytics** | SQLPage | Live SQL queries on customer + predictions DB |
| 6 | **Visualization Gallery** | VisPage | 30+ EDA charts, correlations, live dataset stats |
| 7 | **Model Reports** | ModelPage | ROC curves, confusion matrices, SHAP explainability |
| 8 | **Report Files** | Dashboard | PNG chart viewer with lightbox zoom |

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check — system status |
| GET | `/status` | Model + data availability check |
| GET | `/dashboard/kpis` | Total customers, churned, churn rate, revenue at risk |
| GET | `/dashboard/model_performance` | ROC-AUC, Recall, F1 for all models |
| GET | `/dashboard/insights` | Key business insight cards |
| POST | `/predict` | Single customer churn prediction (XGBoost) |
| POST | `/predict/batch` | Bulk CSV scoring — returns JSON summary + top 30 |
| POST | `/predict/batch/download` | Bulk CSV scoring — streams scored CSV file |
| POST | `/roi/calculate` | Campaign ROI calculation with waterfall data |
| GET | `/eda/correlation` | Top-N feature correlations with Churn |
| GET | `/eda/overview` | Dataset shape, churn distribution, charge stats |
| GET | `/sql/kpis` | Live KPIs from SQLite DB |
| GET | `/sql/high_risk_customers` | High-value customers at HIGH risk |
| GET | `/sql/churn_by_contract` | Churn rate by contract type |
| GET | `/sql/tenure_cohort` | Churn rate by tenure cohort |
| GET | `/sql/churn_by_internet` | Churn rate by internet service |
| GET | `/sql/unactioned_high_risk` | HIGH-risk customers with no action taken |
| GET | `/sql/schema_stats` | Live row counts for both DB tables |
| POST | `/sql/custom` | Execute custom SELECT SQL query |
| GET | `/api/reports/list` | List all generated report PNG files |
| GET | `/reports/{name}.png` | Serve static report image |

Interactive Swagger docs: **https://churn-prediction-churnai.onrender.com/docs**

---

## 🤖 Machine Learning Models

### Model Performance Comparison

| Model | ROC-AUC | Recall | F1 Score |
|-------|---------|--------|----------|
| **XGBoost (Primary)** | **87.4%** | **84.1%** | **81.7%** |
| LightGBM | 86.8% | 83.2% | 80.4% |
| Random Forest | 86.3% | 79.5% | 75.2% |
| ANN (Deep Learning) | 85.1% | 81.0% | 78.5% |
| Logistic Regression | 82.2% | 75.8% | 71.3% |

### Why XGBoost as Primary Model?
- Highest ROC-AUC at **87.4%** — best discrimination between churners and non-churners
- Recall of **84.1%** — correctly flags 84 out of every 100 actual churners
- Built-in regularization prevents overfitting on imbalanced classes
- Efficient sparse feature interaction handling for one-hot encoded features

### Key Churn Predictors (SHAP Analysis)
1. **Contract Type** — Month-to-month customers churn at 43% vs 3% for 2-year contracts
2. **Tenure** — First 12 months is critical intervention window (47% churn rate)
3. **Monthly Charges** — High charges combined with low tenure = highest risk
4. **Internet Service** — Fiber optic users have 30% higher churn than DSL
5. **Payment Method** — Electronic check users show ~45% churn rate

---

## 📊 End-to-End ML Pipeline

```
Raw Data (teleco_churn.csv)
        ↓
  preprocessing.py
  → Handle nulls, type conversions, encoding
        ↓
  feature_engineering.py
  → tenure cohorts, revenue_per_tenure, contract_risk flags
        ↓
  train.py
  → Train 5 models, cross-validation, hyperparameter tuning
        ↓
  evaluate.py
  → ROC-AUC, Recall, F1, confusion matrices, 30+ report PNGs
        ↓
  api_server.py (FastAPI)
  → /predict, /batch, /sql, /roi, /eda endpoints
        ↓
  React Frontend
  → Dashboard, Predict, Batch, ROI, SQL, Vis, Model pages
```

---

## 💼 Job Relevance

### 📊 Data Analyst
- Full EDA pipeline with 30+ visualizations
- Correlation analysis, class imbalance study
- SQL-powered business analytics (cohort, contract, internet segmentation)
- KPI dashboards with live data

### 🤖 Data Scientist
- 5-model training and evaluation pipeline
- Feature engineering (13 derived features)
- SHAP explainability for transparent AI decisions
- Stratified train/test split with cross-validation

### ⚙️ ML Engineer
- FastAPI async REST serving layer
- Model serialization with joblib (.pkl) and Keras (.h5)
- Pydantic schema validation for all prediction inputs
- Batch inference with CSV streaming response

### 🌐 Full Stack Developer
- React 18 + Vite SPA with 8 page components
- Fully responsive layout — mobile, tablet, desktop
- REST API with CORS, static file serving, SQLite integration
- Deployed: Netlify (frontend) + Render (backend)

---

## 💰 Business Impact

For a typical 1,000-customer cohort at 26% churn rate and $65 average monthly revenue:

| Metric | Value |
|--------|-------|
| Customers predicted to churn | ~260 identified |
| Annual revenue at risk | ~$202,800 |
| Revenue saved (40% retention success) | ~$81,120 |
| Campaign cost ($25 per customer) | $6,500 |
| **Net ROI of retention campaign** | **~1,148%** |

---

## 🗄️ Database Schema

### `customers` table
```sql
CREATE TABLE customers (
  customer_id      TEXT PRIMARY KEY,
  tenure           INTEGER,
  monthly_charges  REAL,
  contract         TEXT,
  internet_service TEXT,
  senior_citizen   INTEGER,
  churn            INTEGER,
  ...16 columns total
);
```

### `predictions` table
```sql
CREATE TABLE predictions (
  prediction_id  INTEGER PRIMARY KEY,
  customer_id    TEXT,
  model_version  TEXT,
  churn_prob     REAL,
  risk_category  TEXT,    -- HIGH / MEDIUM / LOW
  action_taken   TEXT
);
```

---

## 📈 Visualization Reports (30+)

| Category | Reports |
|----------|---------|
| **EDA** | `eda_dashboard.png`, `eda_insights.png`, `correlation_heatmap.png`, `class_imbalance.png` |
| **Feature Analysis** | `graph1_services_vs_churn.png` → `graph7_heatmap.png` |
| **Model Performance** | `all_models_roc_comparison.png`, `all_models_metric_comparison.png`, `model_comparison_bar.png` |
| **Confusion Matrices** | `confusion_matrix.png`, `confusion_matrix_lightgbm.png` |
| **SHAP Explainability** | `shap_bar.png`, `shap_summary.png`, `shap_waterfall_highrisk.png`, `shap_dependence.png`, `shap_force_plot.png` |
| **Business Analysis** | `churn_by_payment.png`, `revenue_waterfall.png`, `roi_analysis.png`, `risk_distribution.png` |

---

## 🌐 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Netlify | https://churnpredictionai.netlify.app |
| Backend API | Render | https://churn-prediction-churnai.onrender.com |
| API Docs | Render | https://churn-prediction-churnai.onrender.com/docs |

### Deploy Your Own

**Backend (Render):**
- Root Directory: `backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn api_server:app --host 0.0.0.0 --port $PORT`

**Frontend (Netlify):**
- Base Directory: `frontend`
- Build Command: `npm run build`
- Publish Directory: `dist`
- Environment Variable: `VITE_API_URL=https://your-render-url.onrender.com`

> ⚠️ Render free tier sleeps after 15 mins inactivity — first request may take 50 seconds. Use UptimeRobot to keep it awake.

---

## 🔮 Future Enhancements

- **Real-time streaming** — Apache Kafka for live event-driven churn scoring
- **Deep learning expansion** — LSTM models for sequential customer behaviour
- **Advanced segmentation** — K-Means clustering for micro-segment targeting
- **A/B testing framework** — measure retention campaign effectiveness
- **MLflow tracking** — experiment logging and model versioning
- **Docker containerization** — portable deployment with auto-scaling
- **Cross-industry adaptation** — banking (account closure), SaaS (subscription cancellation)

---

## 📋 Dataset

**IBM Telco Customer Churn Dataset**
- 7,043 telecom customers
- 21 features: demographics, services, contract, billing, churn status
- ~26% churn rate (class imbalance handled via stratified sampling)
- Source: IBM Sample Data Sets

---

## 🛠️ Tech Stack Summary

```
Frontend:     React 18, Vite, Custom CSS, JetBrains Mono, Outfit Font
Backend:      FastAPI, Uvicorn, Pydantic, Python 3.11
ML:           XGBoost, LightGBM, Scikit-learn, Keras/TensorFlow, SHAP
Data:         Pandas, NumPy, SQLite, StandardScaler
Visualization:Matplotlib, Seaborn
Deployment:   Netlify + Render + Git LFS + UptimeRobot
```
