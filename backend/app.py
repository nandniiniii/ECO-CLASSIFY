"""
app.py - Eco-Classify backend entrypoint.

Run:
    pip install -r requirements.txt
    python app.py
Server starts on http://localhost:5000
"""
from flask import Flask, jsonify
from flask_cors import CORS

from apis.image_api import image_api
from apis.text_api import text_api
from apis.impact_api import impact_api, centers_api


def create_app():
    app = Flask(__name__)
    CORS(app)  # allow the React frontend (different port) to call these APIs

    app.register_blueprint(image_api)
    app.register_blueprint(text_api)
    app.register_blueprint(impact_api)
    app.register_blueprint(centers_api)

    @app.route("/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok", "service": "eco-classify-backend"}), 200

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
