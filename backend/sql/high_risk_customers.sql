"sql/high_risk_customers.sql": `-- ============================================================
-- High-Risk Customer Analytics Queries
-- ============================================================

-- ── 1. Top 100 high-value customers at risk ──────────────────
SELECT
    c.customer_id,
    c.tenure,
    c.monthly_charges,
    c.total_charges,
    c.contract,
    c.internet_service,
    c.payment_method,
    ROUND(p.churn_prob * 100, 2)    AS churn_probability_pct,
    p.risk_category,
    c.monthly_charges * 12           AS annual_revenue_at_risk
FROM customers c
JOIN predictions p ON c.customer_id = p.customer_id
WHERE p.risk_category  = 'HIGH'
  AND c.monthly_charges > 60
ORDER BY annual_revenue_at_risk DESC
LIMIT 100;


-- ── 2. Risk distribution across contract types ───────────────
SELECT
    c.contract,
    p.risk_category,
    COUNT(*)                         AS customer_count,
    ROUND(AVG(p.churn_prob)*100, 2)  AS avg_churn_prob_pct,
    ROUND(AVG(c.monthly_charges),2)  AS avg_monthly_charges,
    SUM(c.monthly_charges * 12)      AS total_annual_revenue_at_risk
FROM customers c
JOIN predictions p ON c.customer_id = p.customer_id
GROUP BY c.contract, p.risk_category
ORDER BY c.contract, p.risk_category;


-- ── 3. Senior citizens at high risk ──────────────────────────
SELECT
    c.customer_id,
    c.tenure,
    c.monthly_charges,
    ROUND(p.churn_prob * 100, 2) AS churn_pct,
    c.contract,
    c.internet_service
FROM customers c
JOIN predictions p ON c.customer_id = p.customer_id
WHERE c.senior_citizen = TRUE
  AND p.risk_category  = 'HIGH'
ORDER BY p.churn_prob DESC;


-- ── 4. Revenue at risk summary ────────────────────────────────
SELECT
    p.risk_category,
    COUNT(*)                                              AS customers,
    ROUND(AVG(p.churn_prob)*100, 2)                      AS avg_churn_pct,
    ROUND(SUM(c.monthly_charges), 2)                     AS monthly_revenue_at_risk,
    ROUND(SUM(c.monthly_charges * 12), 2)                AS annual_revenue_at_risk
FROM customers c
JOIN predictions p USING (customer_id)
GROUP BY p.risk_category
ORDER BY avg_churn_pct DESC;
