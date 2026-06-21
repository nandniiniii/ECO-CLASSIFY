"""
evaluation/test_set.py
A small hand-labeled test set for evaluating the text classifier.
This is real evaluation data - genuine ground-truth labels we wrote,
used to compute genuine accuracy/precision/recall, not invented numbers.
"""

TEXT_TEST_SET = [
    ("broken phone charger", "e-waste"),
    ("old laptop battery", "e-waste"),
    ("used aluminium can", "metal"),
    ("empty water bottle", "plastic"),
    ("cardboard pizza box", "paper"),
    ("banana peel", "organic"),
    ("wine bottle", "glass"),
    ("plastic shopping bag", "plastic"),
    ("newspaper stack", "paper"),
    ("rotten vegetables", "organic"),
    ("broken mobile phone screen", "e-waste"),
    ("tin can of beans", "metal"),
    ("glass jar", "glass"),
    ("milk carton", "paper"),
    ("apple core", "organic"),
    ("scrap copper wire", "metal"),
    ("plastic straw", "plastic"),
    ("dead remote control", "e-waste"),
    ("broken drinking glass", "glass"),
    ("vegetable peels", "organic"),
    ("old keyboard", "e-waste"),
    ("aluminium foil", "metal"),
    ("plastic food container", "plastic"),
    ("torn cardboard box", "paper"),
    ("leftover food scraps", "organic"),
]
