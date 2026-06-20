"""
database/db.py
MongoDB connection layer for Eco-Classify.
Uses a single shared client (connection pooling handled by PyMongo).
"""
import os
from pymongo import MongoClient
from datetime import datetime

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "eco_classify")

_client = None


def get_db():
    """Lazily create and return the MongoDB database handle."""
    global _client
    if _client is None:
        _client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    return _client[DB_NAME]


def log_prediction(category: str, source: str, confidence: float = None):
    """Store every prediction for the Environmental Impact dashboard to aggregate later."""
    db = get_db()
    db.predictions.insert_one({
        "category": category,
        "source": source,            # "image" | "text"
        "confidence": confidence,
        "timestamp": datetime.utcnow(),
    })


def seed_recycling_centers():
    """Idempotent seed so /centers has demo data out of the box."""
    db = get_db()
    if db.centers.count_documents({}) > 0:
        return
    db.centers.insert_many([
        {"name": "GreenLoop Recycling Hub", "address": "Sector 32, Ludhiana, Punjab", "lat": 30.901, "lng": 75.857, "accepts": ["plastic", "paper", "metal"]},
        {"name": "EcoCycle Centre", "address": "Model Town, Ludhiana, Punjab", "lat": 30.915, "lng": 75.831, "accepts": ["glass", "e-waste"]},
        {"name": "Punjab E-Waste Collection Point", "address": "Industrial Area A, Ludhiana, Punjab", "lat": 30.880, "lng": 75.870, "accepts": ["e-waste", "metal"]},
        {"name": "Organic Compost Yard", "address": "Sarabha Nagar, Ludhiana, Punjab", "lat": 30.895, "lng": 75.845, "accepts": ["organic"]},
    ])
