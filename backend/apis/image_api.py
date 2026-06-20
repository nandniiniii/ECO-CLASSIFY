from flask import Blueprint, request, jsonify
from models.image_classifier import classify_image
from models.material_composition import predict_composition
from database.db import log_prediction

image_api = Blueprint("image_api", __name__)


@image_api.route("/predict-image", methods=["POST"])
def predict_image():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided. Send as multipart/form-data with key 'image'."}), 400

    file = request.files["image"]
    image_bytes = file.read()

    if not image_bytes:
        return jsonify({"error": "Empty image file."}), 400

    try:
        result = classify_image(image_bytes)
    except Exception as e:
        return jsonify({"error": f"Failed to process image: {str(e)}"}), 500

    result["material_composition"] = predict_composition(result["category"])

    try:
        log_prediction(result["category"], source="image", confidence=result["confidence"])
    except Exception:
        pass  # don't fail the request if logging/db is unreachable

    return jsonify(result), 200
