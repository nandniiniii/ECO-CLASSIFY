from flask import Blueprint, request, jsonify
from models.text_classifier import classify_text
from database.db import log_prediction

text_api = Blueprint("text_api", __name__)


@text_api.route("/predict-text", methods=["POST"])
def predict_text():
    data = request.get_json(silent=True) or {}
    description = data.get("description", "").strip()

    if not description:
        return jsonify({"error": "Missing 'description' field in JSON body."}), 400

    result = classify_text(description)

    try:
        log_prediction(result["category"], source="text")
    except Exception:
        pass

    return jsonify(result), 200
