"""
models/material_composition.py
Heuristic material-composition breakdown per waste category.
Swap for a regression/classification model trained on material datasets later.
"""

_COMPOSITION = {
    "plastic": {"recyclable_plastic": 0.85, "additives": 0.10, "contaminants": 0.05},
    "paper": {"cellulose_fiber": 0.90, "ink_coating": 0.07, "contaminants": 0.03},
    "glass": {"silica": 0.95, "coatings": 0.03, "contaminants": 0.02},
    "metal": {"recoverable_metal": 0.92, "coatings": 0.05, "contaminants": 0.03},
    "organic": {"biodegradable_matter": 0.97, "non_biodegradable": 0.03},
    "e-waste": {"metals": 0.40, "plastics": 0.35, "hazardous_components": 0.15, "glass": 0.10},
}


def predict_composition(category: str) -> dict:
    return _COMPOSITION.get(category, {"unknown": 1.0})
