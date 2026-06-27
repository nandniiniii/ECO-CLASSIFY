RECYCLING_METHODS = {
    "plastic": "Mechanical recycling - clean, sort by resin code, send to a plastics recycler.",
    "paper": "Pulping and re-sheeting at a paper recycling mill.",
    "glass": "Crush, melt and remold at a glass recycling facility.",
    "metal": "Shred and smelt at a scrap metal recycler.",
    "organic": "Composting or biogas/anaerobic digestion.",
    "e-waste": "Specialized e-waste dismantling for safe metal/chemical recovery.",
}

_KEYWORDS = {
    "plastic": ["plastic", "wrapper", "bag", "polythene", "container", "straw", "jug", "packet", "sachet", "tray", "foam", "styrofoam"],
    "paper": ["paper", "newspaper", "cardboard", "carton", "box", "notebook", "magazine", "envelope", "tissue", "receipt"],
    "glass": ["glass", "jar", "wine bottle", "beer bottle", "mirror", "windowpane", "vase", "tumbler", "drinking glass", "broken glass"],
    "metal": ["metal", "can", "tin", "aluminium", "aluminum", "foil", "scrap", "wire", "nail", "steel", "copper", "iron"],
    "organic": ["food", "peel", "vegetable", "fruit", "leftover", "leaf", "compost", "banana", "rotten", "apple", "core", "seed", "eggshell", "coffee", "tea", "garden", "grass"],
    "e-waste": ["phone", "charger", "laptop", "battery", "circuit", "electronic", "tv", "computer", "cable", "mouse", "keyboard", "remote", "remote control", "dead remote", "tablet", "monitor", "printer", "camera", "headphone", "earphone"],
}

_PRIORITY_PHRASES = [
    ("wine bottle", "glass"),
    ("beer bottle", "glass"),
    ("glass bottle", "glass"),
    ("drinking glass", "glass"),
    ("broken glass", "glass"),
    ("plastic bottle", "plastic"),
    ("water bottle", "plastic"),
    ("remote control", "e-waste"),
    ("dead remote", "e-waste"),
    ("apple core", "organic"),
    ("fruit peel", "organic"),
    ("vegetable peel", "organic"),
]


def classify_text(description: str) -> dict:
    text = description.lower()

    for phrase, category in _PRIORITY_PHRASES:
        if phrase in text:
            return {
                "category": category,
                "recycling_method": RECYCLING_METHODS[category],
            }

    scores = {cat: 0 for cat in _KEYWORDS}
    for category, words in _KEYWORDS.items():
        for w in words:
            if w in text:
                scores[category] += 1

    best_category = max(scores, key=scores.get)
    if scores[best_category] == 0:
        best_category = "plastic"

    return {
        "category": best_category,
        "recycling_method": RECYCLING_METHODS[best_category],
    }