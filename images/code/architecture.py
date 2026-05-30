from PIL import Image, ImageDraw, ImageFont

# 📁 Output folder (same directory)
OUTPUT = ""

# ---------------- FONT HELPER ----------------
def get_font(size=16, bold=False):
    try:
        if bold:
            return ImageFont.truetype("arialbd.ttf", size)
        return ImageFont.truetype("arial.ttf", size)
    except:
        return ImageFont.load_default()

# ---------------- CENTER TEXT ----------------
def center_text(draw, text, x, y, font, color):
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    draw.text((x - w // 2, y), text, font=font, fill=color)

# ---------------- ROUNDED RECT ----------------
def draw_rounded_rect(draw, box, radius, fill, outline, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

# ---------------- ARROW ----------------
def draw_arrow(draw, start, end, color, width=2, head_size=8):
    draw.line([start, end], fill=color, width=width)

    # Arrow head
    x1, y1 = end
    draw.polygon([
        (x1, y1),
        (x1 - head_size, y1 - head_size),
        (x1 + head_size, y1 - head_size)
    ], fill=color)

# ---------------- MAIN FUNCTION ----------------
def make_architecture():
    W, H = 1400, 900
    img = Image.new("RGB", (W, H), "#F8F9FA")
    draw = ImageDraw.Draw(img)

    # Title
    tf = get_font(36, bold=True)
    center_text(draw, "System Architecture — Multi-Layer Stack", W // 2, 40, tf, "#1A237E")

    layers = [
        {
            "title": "LAYER 5 — FRONTEND (React + Vite)",
            "color": "#E3F2FD", "border": "#1565C0",
            "items": ["Home.jsx", "DashboardPage.jsx", "PredictPage.jsx",
                      "BatchPage.jsx", "ROIPage.jsx", "SQLPage.jsx",
                      "ModelPage.jsx", "VisPage.jsx"],
        },
        {
            "title": "LAYER 4 — BACKEND API (FastAPI)",
            "color": "#E8F5E9", "border": "#2E7D32",
            "items": ["GET /status", "POST /predict", "POST /batch-predict",
                      "GET /analytics", "GET /roi", "GET /sql-query",
                      "GET /model-info", "GET /visualizations"],
        },
        {
            "title": "LAYER 3 — ML MODELS",
            "color": "#FFF8E1", "border": "#F57F17",
            "items": ["xgboost.pkl", "random_forest.pkl", "logistic_regression.pkl",
                      "lightgbm.pkl", "ann_model.h5", "scaler.pkl"],
        },
        {
            "title": "LAYER 2 — ANALYTICS",
            "color": "#EDE7F6", "border": "#4527A0",
            "items": ["EDA / Correlation", "SHAP Explainability", "ROC / PR Curves",
                      "SQL Queries", "ROI Calculator", "Feature Importance"],
        },
        {
            "title": "LAYER 1 — DATA",
            "color": "#FCE4EC", "border": "#C62828",
            "items": ["teleco_churn.csv", "featured_data.csv",
                      "preprocessing.py", "feature_engineering.py",
                      "SQLite DB", "scaler.pkl"],
        },
    ]

    lh = 120
    y_start = 100
    pad = 80

    for idx, layer in enumerate(layers):
        y = y_start + idx * (lh + 20)

        draw_rounded_rect(draw, [pad, y, W - pad, y + lh],
                          radius=14,
                          fill=layer["color"],
                          outline=layer["border"],
                          width=3)

        # Title
        ltf = get_font(20, bold=True)
        draw.text((pad + 20, y + 12), layer["title"], font=ltf, fill=layer["border"])

        # Chips
        chip_x = pad + 20
        chip_y = y + 55
        max_width = W - pad - 40

        for item in layer["items"]:
            cf = get_font(14)
            bbox = draw.textbbox((0, 0), item, font=cf)
            cw = bbox[2] - bbox[0] + 24

            if chip_x + cw > max_width:
                chip_x = pad + 20
                chip_y += 36

            draw_rounded_rect(draw,
                              [chip_x, chip_y, chip_x + cw, chip_y + 28],
                              radius=8,
                              fill="white",
                              outline=layer["border"],
                              width=2)

            draw.text((chip_x + 12, chip_y + 6), item, font=cf, fill="#333333")
            chip_x += cw + 10

    # Arrows
    for i in range(len(layers) - 1):
        y_bot = y_start + (i + 1) * (lh + 20) - 10
        cx = W // 2

        draw_arrow(draw, (cx - 20, y_bot - 10), (cx - 20, y_bot - 30),
                   color="#455A64", width=3, head_size=10)

        draw_arrow(draw, (cx + 20, y_bot - 30), (cx + 20, y_bot - 10),
                   color="#455A64", width=3, head_size=10)

    # Side annotations
    ann = get_font(14)
    annots = ["HTTP / REST", "Model Inference", "SQL / SHAP", "Pipeline I/O"]

    for i, a in enumerate(annots):
        y_mid = y_start + (i + 1) * (lh + 20) - 20
        draw.text((W - pad + 10, y_mid), a, font=ann, fill="#546E7A")

    # Save
    img.save(OUTPUT + "diagram_architecture.png", dpi=(200, 200))
    print("✅ High-quality diagram saved as diagram_architecture.png")


# ---------------- RUN ----------------
if __name__ == "__main__":
    make_architecture()