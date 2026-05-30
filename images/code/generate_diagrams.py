from PIL import Image, ImageDraw, ImageFont
import os

OUTPUT = r"C:\Users\bhara\OneDrive\Desktop\Churn_Prediction\output"

def get_font(size=14, bold=False):
    try:
        if bold:
            return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", size)
    except:
        return ImageFont.load_default()

def draw_rounded_rect(draw, xy, radius=10, fill=None, outline=None, width=2):
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle([x1, y1, x2, y2], radius=radius, fill=fill, outline=outline, width=width)

def draw_arrow(draw, start, end, color="#555555", width=2, head_size=10):
    draw.line([start, end], fill=color, width=width)
    # Arrowhead
    x1, y1 = start
    x2, y2 = end
    import math
    angle = math.atan2(y2 - y1, x2 - x1)
    ax1 = x2 - head_size * math.cos(angle - 0.4)
    ay1 = y2 - head_size * math.sin(angle - 0.4)
    ax2 = x2 - head_size * math.cos(angle + 0.4)
    ay2 = y2 - head_size * math.sin(angle + 0.4)
    draw.polygon([(x2, y2), (ax1, ay1), (ax2, ay2)], fill=color)

def center_text(draw, text, cx, cy, font, fill):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((cx - tw // 2, cy - th // 2), text, font=font, fill=fill)

# ─────────────────────────────────────────────────────────────
# DIAGRAM 1: End-to-End Workflow
# ─────────────────────────────────────────────────────────────
def make_workflow():
    W, H = 1100, 520
    img = Image.new("RGB", (W, H), "#FAFBFD")
    draw = ImageDraw.Draw(img)

    # Title
    tf = get_font(22, bold=True)
    center_text(draw, "End-to-End ML Workflow", W // 2, 32, tf, "#1A237E")

    # Step definitions: (label, sub-label, color_bg, color_border)
    steps = [
        ("1. Raw Data\nIngestion",   "teleco_churn.csv",      "#E3F2FD", "#1565C0"),
        ("2. Data\nPreprocessing",   "preprocessing.py",      "#E8F5E9", "#2E7D32"),
        ("3. Feature\nEngineering",  "feature_engineering.py","#FFF8E1", "#F57F17"),
        ("4. Model\nTraining",       "train.py",               "#FCE4EC", "#C62828"),
        ("5. Model\nEvaluation",     "evaluate.py",            "#EDE7F6", "#4527A0"),
        ("6. Prediction\nAPI",       "api_server.py",          "#E0F7FA", "#00695C"),
        ("7. React\nDashboard",      "App.jsx / components",   "#FFF3E0", "#E65100"),
    ]

    n = len(steps)
    box_w, box_h = 118, 82
    gap = 20
    total_w = n * box_w + (n - 1) * gap
    x0 = (W - total_w) // 2
    y0 = 90

    boxes = []
    for i, (label, sub, bg, border) in enumerate(steps):
        x = x0 + i * (box_w + gap)
        y = y0
        draw_rounded_rect(draw, [x, y, x + box_w, y + box_h], radius=10, fill=bg, outline=border, width=2)
        lf = get_font(12, bold=True)
        sf = get_font(9)
        # Draw label lines
        lines = label.split("\n")
        if len(lines) == 2:
            center_text(draw, lines[0], x + box_w // 2, y + 22, lf, border)
            center_text(draw, lines[1], x + box_w // 2, y + 38, lf, border)
        else:
            center_text(draw, label, x + box_w // 2, y + 30, lf, border)
        center_text(draw, sub, x + box_w // 2, y + 64, sf, "#555555")
        boxes.append((x, y, box_w, box_h))

    # Arrows between boxes
    for i in range(len(boxes) - 1):
        bx, by, bw, bh = boxes[i]
        nx, ny, _, _ = boxes[i + 1]
        draw_arrow(draw, (bx + bw, by + bh // 2), (nx, by + bh // 2), color="#37474F", width=2, head_size=9)

    # ── Second row: outputs / artifacts ──────────────────────
    y2 = 230
    artifacts = [
        ("Raw Dataset",     "CSV file",           "#E3F2FD", "#1565C0"),
        ("Processed Data",  "featured_data.csv",  "#E8F5E9", "#2E7D32"),
        ("Feature Matrix",  "Encoded features",   "#FFF8E1", "#F57F17"),
        ("Trained Models",  ".pkl / .h5 files",   "#FCE4EC", "#C62828"),
        ("Reports & Plots", "metrics / ROC",      "#EDE7F6", "#4527A0"),
        ("REST Endpoints",  "POST /predict",       "#E0F7FA", "#00695C"),
        ("UI Pages",        "Dashboard / ROI",     "#FFF3E0", "#E65100"),
    ]

    art_boxes = []
    for i, (label, sub, bg, border) in enumerate(artifacts):
        x = x0 + i * (box_w + gap)
        y = y2
        draw_rounded_rect(draw, [x, y, x + box_w, y + 70], radius=8, fill=bg, outline=border, width=1)
        lf2 = get_font(10, bold=True)
        sf2 = get_font(9)
        center_text(draw, label, x + box_w // 2, y + 22, lf2, border)
        center_text(draw, sub,   x + box_w // 2, y + 50, sf2, "#555555")
        art_boxes.append((x, y))

    # Down arrows from top row to artifact row
    for i in range(len(boxes)):
        bx, by, bw, bh = boxes[i]
        ax, ay = art_boxes[i]
        draw_arrow(draw, (bx + bw // 2, by + bh), (ax + box_w // 2, ay), color="#90A4AE", width=1, head_size=7)

    # Legend label
    lf3 = get_font(11, bold=True)
    draw.text((x0, y2 + 85), "Outputs / Artifacts per Stage", font=lf3, fill="#546E7A")

    # ── Data flow note at bottom ──────────────────────────────
    y3 = 360
    arrow_colors = ["#1565C0", "#2E7D32", "#F57F17", "#C62828", "#4527A0", "#00695C"]
    flow_labels  = ["teleco_churn.csv", "cleaned", "features", "trained", "evaluated", "API ready"]
    seg_w = total_w // 6
    for i in range(6):
        x_s = x0 + i * seg_w
        draw_arrow(draw, (x_s, y3 + 12), (x_s + seg_w - 8, y3 + 12), color=arrow_colors[i], width=3, head_size=10)
        ff = get_font(9)
        center_text(draw, flow_labels[i], x_s + seg_w // 2, y3 - 5, ff, arrow_colors[i])

    # Section label
    draw.text((x0, y3 + 25), "  ← Data transforms as it moves through each pipeline stage →", font=get_font(9), fill="#78909C")

    img.save(OUTPUT + "diagram_workflow.png", dpi=(150, 150))
    print("diagram_workflow.png saved")

# ─────────────────────────────────────────────────────────────
# DIAGRAM 2: System Architecture
# ─────────────────────────────────────────────────────────────
def make_architecture():
    W, H = 1100, 640
    img = Image.new("RGB", (W, H), "#F8F9FA")
    draw = ImageDraw.Draw(img)

    tf = get_font(22, bold=True)
    center_text(draw, "System Architecture — Multi-Layer Stack", W // 2, 30, tf, "#1A237E")

    layers = [
        {
            "title": "LAYER 5 — FRONTEND  (React + Vite)",
            "color": "#E3F2FD", "border": "#1565C0",
            "items": ["Home.jsx", "DashboardPage.jsx", "PredictPage.jsx",
                      "BatchPage.jsx", "ROIPage.jsx", "SQLPage.jsx",
                      "ModelPage.jsx", "VisPage.jsx"],
        },
        {
            "title": "LAYER 4 — BACKEND API  (FastAPI · api_server.py)",
            "color": "#E8F5E9", "border": "#2E7D32",
            "items": ["GET /status", "POST /predict", "POST /batch-predict",
                      "GET /analytics", "GET /roi", "GET /sql-query",
                      "GET /model-info", "GET /visualizations"],
        },
        {
            "title": "LAYER 3 — ML MODELS  (Scikit-learn · XGBoost · Keras)",
            "color": "#FFF8E1", "border": "#F57F17",
            "items": ["xgboost.pkl", "random_forest.pkl", "logistic_regression.pkl",
                      "lightgbm.pkl", "ann_model.h5", "scaler.pkl"],
        },
        {
            "title": "LAYER 2 — ANALYTICS  (SHAP · Matplotlib · SQLite)",
            "color": "#EDE7F6", "border": "#4527A0",
            "items": ["EDA / Correlation", "SHAP Explainability", "ROC / PR Curves",
                      "SQL Business Queries", "ROI Calculator", "Feature Importance"],
        },
        {
            "title": "LAYER 1 — DATA  (CSV · SQLite · Feature Engineering)",
            "color": "#FCE4EC", "border": "#C62828",
            "items": ["teleco_churn.csv (raw)", "featured_data.csv (processed)",
                      "preprocessing.py", "feature_engineering.py",
                      "SQLite DB", "scaler.pkl"],
        },
    ]

    lh = 86
    y_start = 68
    pad = 50

    for idx, layer in enumerate(layers):
        y = y_start + idx * (lh + 8)
        draw_rounded_rect(draw, [pad, y, W - pad, y + lh], radius=10,
                          fill=layer["color"], outline=layer["border"], width=2)
        # Title
        ltf = get_font(12, bold=True)
        draw.text((pad + 14, y + 8), layer["title"], font=ltf, fill=layer["border"])
        # Items as chips
        chip_x = pad + 14
        chip_y = y + 34
        for item in layer["items"]:
            cf = get_font(9)
            bbox = draw.textbbox((0, 0), item, font=cf)
            cw = bbox[2] - bbox[0] + 18
            if chip_x + cw > W - pad - 14:
                break
            draw_rounded_rect(draw, [chip_x, chip_y, chip_x + cw, chip_y + 24],
                               radius=5, fill="white", outline=layer["border"], width=1)
            draw.text((chip_x + 9, chip_y + 5), item, font=cf, fill="#333333")
            chip_x += cw + 8

    # Bidirectional arrows between layers
    for i in range(len(layers) - 1):
        y_bot = y_start + (i + 1) * (lh + 8) - 2
        cx = W // 2
        draw_arrow(draw, (cx - 12, y_bot - 4), (cx - 12, y_bot - 16), color="#546E7A", width=2, head_size=7)
        draw_arrow(draw, (cx + 12, y_bot - 16), (cx + 12, y_bot - 4), color="#546E7A", width=2, head_size=7)

    # Side annotations
    ann = get_font(9)
    annots = ["HTTP / REST", "Model Inference", "SQL / SHAP", "Pipeline I/O"]
    for i, a in enumerate(annots):
        y_mid = y_start + (i + 1) * (lh + 8) - 12
        draw.text((W - pad + 6, y_mid), a, font=ann, fill="#78909C")

    img.save(OUTPUT + "diagram_architecture.png", dpi=(150, 150))
    print("diagram_architecture.png saved")

# ─────────────────────────────────────────────────────────────
# DIAGRAM 3: Prediction API Flow
# ─────────────────────────────────────────────────────────────
def make_api_flow():
    W, H = 900, 480
    img = Image.new("RGB", (W, H), "#FAFBFD")
    draw = ImageDraw.Draw(img)

    tf = get_font(20, bold=True)
    center_text(draw, "Prediction API Request / Response Flow", W // 2, 26, tf, "#1A237E")

    nodes = [
        (80,  200, 130, 64, "#E3F2FD", "#1565C0", "User / Frontend\n(React UI)"),
        (270, 200, 130, 64, "#E8F5E9", "#2E7D32", "FastAPI\nBackend"),
        (460, 120, 130, 64, "#FFF8E1", "#F57F17", "Scaler\n(preprocessing)"),
        (460, 200, 130, 64, "#FCE4EC", "#C62828", "XGBoost\nModel"),
        (460, 280, 130, 64, "#EDE7F6", "#4527A0", "SHAP\nExplainer"),
        (660, 200, 130, 64, "#E0F7FA", "#00695C", "Response\nFormatter"),
        (850, 200, 130, 64, "#FFF3E0", "#E65100", "Dashboard\nDisplay"),
    ]

    def node_cx(n): return n[0] + n[2] // 2
    def node_cy(n): return n[1] + n[3] // 2
    def node_right(n): return n[0] + n[2], n[1] + n[3] // 2
    def node_left(n):  return n[0], n[1] + n[3] // 2
    def node_top(n):   return n[0] + n[2] // 2, n[1]
    def node_bottom(n):return n[0] + n[2] // 2, n[1] + n[3]

    for x, y, w, h, bg, border, label in nodes:
        draw_rounded_rect(draw, [x, y, x + w, y + h], radius=10, fill=bg, outline=border, width=2)
        lf = get_font(11, bold=True)
        lines = label.split("\n")
        if len(lines) == 2:
            center_text(draw, lines[0], x + w // 2, y + h // 2 - 9, lf, border)
            center_text(draw, lines[1], x + w // 2, y + h // 2 + 9, lf, border)
        else:
            center_text(draw, label, x + w // 2, y + h // 2, lf, border)

    # Arrows + labels
    arrows = [
        (nodes[0], nodes[1], "POST /predict\n{tenure, charges...}", "top"),
        (nodes[1], nodes[2], "scale features", "top"),
        (nodes[1], nodes[3], "predict proba", "mid"),
        (nodes[1], nodes[4], "explain features", "bot"),
        (nodes[2], nodes[5], "", ""),
        (nodes[3], nodes[5], "", ""),
        (nodes[4], nodes[5], "", ""),
        (nodes[5], nodes[6], "JSON response\n{prob, risk, reco}", "top"),
    ]

    af = get_font(8)
    for src, dst, lbl, pos in arrows:
        sx, sy = node_right(src)
        dx, dy = node_left(dst)
        if src == nodes[1]:
            if dst == nodes[2]:
                sx, sy = node_cx(src), nodes[1][1]
                dx, dy = node_cx(dst), nodes[2][1] + nodes[2][3]
                draw_arrow(draw, (sx, sy), (dx, dy), color="#555", width=2, head_size=8)
                center_text(draw, lbl, (sx + dx) // 2 + 18, (sy + dy) // 2, af, "#777")
                continue
            elif dst == nodes[4]:
                sx, sy = node_cx(src), nodes[1][1] + nodes[1][3]
                dx, dy = node_cx(dst), nodes[4][1]
                draw_arrow(draw, (sx, sy), (dx, dy), color="#555", width=2, head_size=8)
                center_text(draw, lbl, (sx + dx) // 2 + 18, (sy + dy) // 2, af, "#777")
                continue
        if src in [nodes[2], nodes[3], nodes[4]] and dst == nodes[5]:
            sx2, sy2 = node_right(src)
            dx2, dy2 = node_left(dst)
            draw_arrow(draw, (sx2, sy2), (dx2, dy2), color="#555", width=2, head_size=8)
            continue
        draw_arrow(draw, (sx, sy), (dx, dy), color="#555", width=2, head_size=8)
        if lbl:
            mx, my = (sx + dx) // 2, (sy + dy) // 2
            lines2 = lbl.split("\n")
            for li, line in enumerate(lines2):
                center_text(draw, line, mx, my - 12 + li * 13, af, "#444")

    # Step numbers
    for i, (x, y, w, h, *_) in enumerate(nodes):
        sf2 = get_font(9, bold=True)
        draw.ellipse([x + w - 18, y - 2, x + w + 2, y + 18], fill="#37474F")
        center_text(draw, str(i + 1), x + w - 8, y + 8, sf2, "white")

    img.save(OUTPUT + "diagram_api_flow.png", dpi=(150, 150))
    print("diagram_api_flow.png saved")

# ─────────────────────────────────────────────────────────────
# DIAGRAM 4: Model Performance Bar Chart
# ─────────────────────────────────────────────────────────────
def make_performance_chart():
    W, H = 820, 420
    img = Image.new("RGB", (W, H), "#FAFBFD")
    draw = ImageDraw.Draw(img)

    tf = get_font(20, bold=True)
    center_text(draw, "Model Performance Comparison", W // 2, 24, tf, "#1A237E")

    models  = ["Logistic\nRegression", "Random\nForest", "XGBoost"]
    metrics = {
        "ROC-AUC": [82.2, 86.3, 87.4],
        "Recall":  [75.8, 79.5, 84.1],
        "F1 Score":[71.3, 75.2, 81.7],
    }
    colors = ["#42A5F5", "#66BB6A", "#FFA726"]
    metric_names = list(metrics.keys())

    chart_x, chart_y = 80, 60
    chart_w, chart_h = 660, 290
    n_models = len(models)
    n_metrics = len(metric_names)
    group_w = chart_w // n_models
    bar_w = group_w // (n_metrics + 1)

    # Axes
    draw.line([(chart_x, chart_y), (chart_x, chart_y + chart_h)], fill="#333", width=2)
    draw.line([(chart_x, chart_y + chart_h), (chart_x + chart_w, chart_y + chart_h)], fill="#333", width=2)

    # Y grid lines and labels
    for v in [60, 70, 80, 90, 100]:
        y_pos = chart_y + chart_h - int((v - 60) / 40 * chart_h)
        draw.line([(chart_x, y_pos), (chart_x + chart_w, y_pos)], fill="#DDDDDD", width=1)
        gf = get_font(9)
        draw.text((chart_x - 36, y_pos - 6), f"{v}%", font=gf, fill="#555")

    # Bars
    for mi, model_label in enumerate(models):
        group_cx = chart_x + mi * group_w + group_w // 2
        for ki, mname in enumerate(metric_names):
            val = metrics[mname][mi]
            bar_h_px = int((val - 60) / 40 * chart_h)
            bx = group_cx - (n_metrics * bar_w) // 2 + ki * bar_w
            by = chart_y + chart_h - bar_h_px
            draw.rectangle([bx, by, bx + bar_w - 4, chart_y + chart_h], fill=colors[ki])
            vf = get_font(8, bold=True)
            center_text(draw, f"{val}%", bx + bar_w // 2 - 2, by - 10, vf, colors[ki])
        # Model label
        mf = get_font(10, bold=True)
        lines = model_label.split("\n")
        for li, line in enumerate(lines):
            center_text(draw, line, group_cx, chart_y + chart_h + 16 + li * 14, mf, "#333")

    # Legend
    lx, ly = chart_x + chart_w - 200, chart_y + 10
    for ki, mname in enumerate(metric_names):
        draw.rectangle([lx, ly + ki * 20, lx + 14, ly + ki * 20 + 14], fill=colors[ki])
        draw.text((lx + 20, ly + ki * 20), mname, font=get_font(10), fill="#333")

    img.save(OUTPUT + "diagram_performance.png", dpi=(150, 150))
    print("diagram_performance.png saved")

make_workflow()
make_architecture()
make_api_flow()
make_performance_chart()
print("All diagrams generated.")