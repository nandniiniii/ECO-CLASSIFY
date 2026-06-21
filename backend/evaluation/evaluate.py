"""
evaluation/evaluate.py

Runs the text classifier against a hand-labeled test set and computes
genuine accuracy, per-category precision/recall, and a confusion matrix.
Writes the results to evaluation/metrics.json so the frontend Analytics
page can display real, computed numbers - not fabricated ones.

Run manually whenever the classifier logic changes:
    python evaluation/evaluate.py
"""
import json
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.text_classifier import classify_text
from evaluation.test_set import TEXT_TEST_SET

CATEGORIES = ["plastic", "paper", "glass", "metal", "organic", "e-waste"]


def evaluate():
    y_true = []
    y_pred = []

    for description, true_label in TEXT_TEST_SET:
        result = classify_text(description)
        y_true.append(true_label)
        y_pred.append(result["category"])

    total = len(y_true)
    correct = sum(1 for t, p in zip(y_true, y_pred) if t == p)
    accuracy = round(correct / total, 4)

    # per-category precision / recall
    per_category = {}
    confusion = {a: {b: 0 for b in CATEGORIES} for a in CATEGORIES}

    for t, p in zip(y_true, y_pred):
        confusion[t][p] += 1

    for cat in CATEGORIES:
        tp = confusion[cat][cat]
        predicted_as_cat = sum(confusion[other][cat] for other in CATEGORIES)
        actual_cat = sum(confusion[cat][other] for other in CATEGORIES)
        precision = round(tp / predicted_as_cat, 4) if predicted_as_cat else None
        recall = round(tp / actual_cat, 4) if actual_cat else None
        per_category[cat] = {"precision": precision, "recall": recall, "support": actual_cat}

    metrics = {
        "model": "text_classifier (rule-based keyword scoring)",
        "test_set_size": total,
        "accuracy": accuracy,
        "per_category": per_category,
        "confusion_matrix": confusion,
    }

    out_path = os.path.join(os.path.dirname(__file__), "metrics.json")
    with open(out_path, "w") as f:
        json.dump(metrics, f, indent=2)

    print(json.dumps(metrics, indent=2))
    return metrics


if __name__ == "__main__":
    evaluate()
