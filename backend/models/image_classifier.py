"""
models/image_classifier.py

Waste image classification - PyTorch / torchvision version.
"""
import io
from PIL import Image

CATEGORIES = ["plastic", "paper", "glass", "metal", "organic", "e-waste"]

DISPOSAL_INSTRUCTIONS = {
    "plastic": "Rinse and place in the dry-waste recycling bin. Remove caps if a different plastic type.",
    "paper": "Keep dry, flatten boxes, place in the paper recycling bin. Avoid greasy/food-stained paper.",
    "glass": "Rinse thoroughly. Place in the glass collection bin; do not mix with ceramics.",
    "metal": "Rinse cans, place in the metal recycling bin. Sharp edges should be wrapped first.",
    "organic": "Place in the compost/wet-waste bin. Keep separate from plastics.",
    "e-waste": "Do NOT bin with household waste. Drop off at an authorized e-waste collection center.",
}

_IMAGENET_KEYWORD_MAP = {
    "plastic": "plastic", "bottle": "plastic", "water bottle": "plastic", "pop bottle": "plastic",
    "paper": "paper", "envelope": "paper", "carton": "paper", "newspaper": "paper", "book jacket": "paper",
    "glass": "glass", "wine bottle": "glass", "beer bottle": "glass", "vase": "glass",
    "can": "metal", "tin can": "metal", "soup bowl": "metal", "spoon": "metal", "screwdriver": "metal",
    "banana": "organic", "orange": "organic", "vegetable": "organic", "fruit": "organic", "broccoli": "organic",
    "cellular telephone": "e-waste", "laptop": "e-waste", "remote control": "e-waste",
    "computer keyboard": "e-waste", "mouse": "e-waste", "modem": "e-waste",
}

_model = None
_categories = None
_transform = None


def _load_model():
    global _model, _categories, _transform
    if _model is None:
        import torch
        from torchvision.models import mobilenet_v2, MobileNet_V2_Weights

        weights = MobileNet_V2_Weights.IMAGENET1K_V1
        _model = mobilenet_v2(weights=weights)
        _model.eval()
        _categories = weights.meta["categories"]
        _transform = weights.transforms()
    return _model


def _map_to_waste_category(imagenet_label: str) -> str:
    label = imagenet_label.lower()
    for kw, category in _IMAGENET_KEYWORD_MAP.items():
        if kw in label:
            return category
    return "plastic"


def classify_image(image_bytes: bytes) -> dict:
    import torch

    model = _load_model()
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    batch = _transform(img).unsqueeze(0)

    with torch.no_grad():
        logits = model(batch)
        probs = torch.nn.functional.softmax(logits[0], dim=0)
        top_prob, top_idx = torch.max(probs, dim=0)

    top_label = _categories[top_idx.item()]
    category = _map_to_waste_category(top_label)

    return {
        "category": category,
        "confidence": round(float(top_prob), 4),
        "material_type": top_label.replace("_", " "),
        "disposal_instructions": DISPOSAL_INSTRUCTIONS[category],
    }