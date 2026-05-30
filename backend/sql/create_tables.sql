"sql/create_tables.sql": `-- ============================================================
-- Customer Churn Database — Full Schema
-- Compatible with PostgreSQL & MySQL
-- ============================================================

-- Drop if exists (dev convenience)
DROP TABLE IF EXISTS predictions;
DROP TABLE IF EXISTS customers;

-- ── Main customers table ────────────────────────────────────
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
    created_at         TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- ── ML Predictions table ────────────────────────────────────
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

-- ── Indexes ─────────────────────────────────────────────────
CREATE INDEX idx_cust_contract   ON customers(contract);
CREATE INDEX idx_cust_churn      ON customers(churn);
CREATE INDEX idx_cust_monthly    ON customers(monthly_charges DESC);
CREATE INDEX idx_pred_churn_prob ON predictions(churn_prob DESC);
CREATE INDEX idx_pred_risk       ON predictions(risk_category);
CREATE INDEX idx_pred_date       ON predictions(predicted_at DESC);