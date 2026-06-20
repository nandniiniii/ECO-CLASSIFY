"""
models/text_classifier.py

Rule-based + keyword-scoring text classifier for waste descriptions
(e.g. "broken laptop charger", "banana peel", "plastic milk jug").

This is a legitimate, explainable baseline (TF-IDF-style keyword scoring)
and is genuinely useful in production as a fast fallback even after you
add an ML model. To upgrade: swap `classify_text` internals for a
scikit-learn TfidfVectorizer + LogisticRegression pipeline trained on a
labeled waste-description dataset; keep the same return contract.
"""

RECYCLING_METHODS = {
    "plastic": "Mechanical recycling - clean, sort by resin code, send to a plastics recycler.",
    "paper": "Pulping and re-sheeting at a paper recycling mill.",
    "glass": "Crush, melt and remold at a glass recycling facility.",
    "metal": "Shred and smelt at a scrap metal recycler.",
    "organic": "Composting or biogas/anaerobic digestion.",
    "e-waste": "Specialized e-waste dismantling for safe metal/chemical recovery.",
}

_KEYWORDS = {
    "plastic": ["plastic", "bottle", "wrapper", "bag", "polythene", "container", "straw", "jug", "packet"],
    "paper": ["paper", "newspaper", "cardboard", "carton", "box", "notebook", "magazine", "envelope"],
    "glass": ["glass", "jar", "bottle of wine", "mirror", "windowpane"],
    "metal": ["metal", "can", "tin", "aluminium", "aluminum", "foil", "scrap", "wire", "nail"],
    "organic": ["food", "peel", "vegetable", "fruit", "leftover", "leaf", "compost", "banana", "rotten"],
    "e-waste": ["phone", "charger", "laptop", "battery", "circuit", "wire", "electronic", "tv", "computer", "cable", "mouse", "keyboard"],
}


def classify_text(description: str) -> dict:
    text = description.lower()
    scores = {cat: 0 for cat in _KEYWORDS}
    for category, words in _KEYWORDS.items():
        for w in words:
            if w in text:
                scores[category] += 1

    best_category = max(scores, key=scores.get)
    if scores[best_category] == 0:
        best_category = "plastic"  # fallback when no keyword hits

    return {
        "category": best_category,
        "recycling_method": RECYCLING_METHODS[best_category],
    }
