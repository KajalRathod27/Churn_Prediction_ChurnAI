"sql/churn_trend.sql": `-- ============================================================
-- Churn Trend Analytics Queries
-- ============================================================

-- ── 1. Monthly churn trend ────────────────────────────────────
SELECT
    DATE_TRUNC('month', c.created_at)                        AS month,
    COUNT(*)                                                  AS total_customers,
    SUM(CASE WHEN c.churn THEN 1 ELSE 0 END)                 AS actual_churned,
    SUM(CASE WHEN p.risk_category='HIGH' THEN 1 ELSE 0 END)  AS predicted_high_risk,
    ROUND(
        100.0 * SUM(CASE WHEN c.churn THEN 1 ELSE 0 END)
        / NULLIF(COUNT(*), 0), 2
    )                                                         AS churn_rate_pct,
    ROUND(SUM(CASE WHEN c.churn THEN c.monthly_charges ELSE 0 END), 2) AS revenue_lost
FROM customers c
LEFT JOIN predictions p USING (customer_id)
GROUP BY DATE_TRUNC('month', c.created_at)
ORDER BY month DESC;


-- ── 2. Churn by contract type (trend) ────────────────────────
SELECT
    c.contract,
    COUNT(*)                                          AS total,
    SUM(CASE WHEN c.churn THEN 1 ELSE 0 END)         AS churned,
    ROUND(
        100.0 * SUM(CASE WHEN c.churn THEN 1 ELSE 0 END) / COUNT(*), 2
    )                                                 AS churn_rate_pct,
    ROUND(AVG(c.monthly_charges), 2)                 AS avg_monthly_charges,
    ROUND(AVG(c.tenure), 1)                          AS avg_tenure_months
FROM customers c
GROUP BY c.contract
ORDER BY churn_rate_pct DESC;


-- ── 3. High-risk customers not yet actioned ───────────────────
SELECT
    c.customer_id,
    c.tenure,
    c.monthly_charges,
    ROUND(p.churn_prob * 100, 2) AS churn_pct,
    p.predicted_at
FROM customers c
JOIN predictions p USING (customer_id)
WHERE p.risk_category = 'HIGH'
  AND p.action_taken  IS NULL
ORDER BY p.churn_prob DESC
LIMIT 50;


-- ── 4. Retention campaign effectiveness ──────────────────────
SELECT
    p.action_taken,
    COUNT(*)                                           AS targeted,
    SUM(CASE WHEN p.outcome='retained' THEN 1 END)    AS retained,
    SUM(CASE WHEN p.outcome='churned'  THEN 1 END)    AS churned,
    ROUND(
        100.0 * SUM(CASE WHEN p.outcome='retained' THEN 1 END)
        / NULLIF(COUNT(*), 0), 2
    )                                                  AS success_rate_pct
FROM predictions p
WHERE p.action_taken IS NOT NULL
GROUP BY p.action_taken
ORDER BY success_rate_pct DESC;


-- ── 5. Cohort analysis  — churn by tenure group ───────────────
SELECT
    CASE
        WHEN c.tenure BETWEEN 0  AND 12 THEN '0–12 months'
        WHEN c.tenure BETWEEN 13 AND 24 THEN '13–24 months'
        WHEN c.tenure BETWEEN 25 AND 48 THEN '25–48 months'
        ELSE '48+ months'
    END                                                 AS tenure_group,
    COUNT(*)                                            AS customers,
    SUM(CASE WHEN c.churn THEN 1 ELSE 0 END)           AS churned,
    ROUND(
        100.0 * SUM(CASE WHEN c.churn THEN 1 ELSE 0 END) / COUNT(*), 2
    )                                                   AS churn_rate_pct,
    ROUND(AVG(c.monthly_charges), 2)                   AS avg_charges
FROM customers c
GROUP BY tenure_group
ORDER BY churn_rate_pct DESC;
