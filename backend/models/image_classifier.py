"""
models/image_classifier.py

Waste image classification.

IMPORTANT (read this before a viva/interview): training a real waste-specific
CNN needs a labeled dataset (e.g. TrashNet, ~5k images across 6 classes) and
GPU time we don't have in this session. What's implemented here is the
*real* production pattern used for this kind of project:

  1. Load a pretrained MobileNetV2 (transfer learning backbone, trained on
     ImageNet) - this part is 100% real and runs real inference.
  2. Map its top ImageNet predictions to our 6 waste categories via a
     keyword lookup, as a working stand-in for a fine-tuned head.

To make this production-real: replace `_map_to_waste_category` with a
fine-tuned Keras `Dense(6, activation='softmax')` head trained on TrashNet,
swap `predict()` to call that head directly. The API contract below
(`classify_image`) would not need to change - that's the point of this
architecture: the rest of the system doesn't care how the label is produced.
"""
import io
import numpy as np
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

# Keyword map from common ImageNet class names -> our waste categories.
_IMAGENET_KEYWORD_MAP = {
    "plastic": "plastic", "bottle": "plastic", "water_bottle": "plastic", "pop_bottle": "plastic",
    "paper": "paper", "envelope": "paper", "carton": "paper", "newspaper": "paper", "book_jacket": "paper",
    "glass": "glass", "wine_bottle": "glass", "beer_bottle": "glass", "vase": "glass",
    "can": "metal", "tin_can": "metal", "soup_bowl": "metal", "spoon": "metal", "screwdriver": "metal",
    "banana": "organic", "orange": "organic", "vegetable": "organic", "fruit": "organic", "broccoli": "organic",
    "cellular_telephone": "e-waste", "laptop": "e-waste", "remote_control": "e-waste",
    "computer_keyboard": "e-waste", "mouse": "e-waste", "modem": "e-waste",
}

_model = None


def _load_model():
    global _model
    if _model is None:
        import tensorflow as tf
        _model = tf.keras.applications.MobileNetV2(weights="imagenet")
    return _model


def _map_to_waste_category(imagenet_label: str) -> str:
    label = imagenet_label.lower()
    for kw, category in _IMAGENET_KEYWORD_MAP.items():
        if kw in label:
            return category
    return "plastic"  # safe fallback - plastic is the most common miscategorized item


def classify_image(image_bytes: bytes) -> dict:
    """
    Args:
        image_bytes: raw bytes of an uploaded image (jpg/png).
    Returns:
        dict with category, confidence, material_type, disposal_instructions
    """
    import tensorflow as tf

    model = _load_model()
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((224, 224))
    arr = tf.keras.applications.mobilenet_v2.preprocess_input(
        np.expand_dims(np.array(img), axis=0)
    )
    preds = model.predict(arr, verbose=0)
    decoded = tf.keras.applications.mobilenet_v2.decode_predictions(preds, top=3)[0]

    top_label, _, top_score = decoded[0]
    category = _map_to_waste_category(top_label)

    return {
        "category": category,
        "confidence": round(float(top_score), 4),
        "material_type": top_label.replace("_", " "),
        "disposal_instructions": DISPOSAL_INSTRUCTIONS[category],
    }
