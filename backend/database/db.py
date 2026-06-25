import os
from pymongo import MongoClient
from datetime import datetime

_env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env")
if os.path.exists(_env_path):
    with open(_env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ[key.strip()] = val.strip()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "eco_classify")

_client = None

def get_db():
    global _client
    if _client is None:
        _client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    return _client[DB_NAME]

def log_prediction(category: str, source: str, confidence: float = None):
    db = get_db()
    db.predictions.insert_one({
        "category": category,
        "source": source,
        "confidence": confidence,
        "timestamp": datetime.utcnow(),
    })

def seed_recycling_centers():
    db = get_db()
    if db.centers.count_documents({}) > 0:
        return
    db.centers.insert_many([
        {"name": "GreenLoop Recycling Hub", "address": "Sector 32, Ludhiana, Punjab", "lat": 30.901, "lng": 75.857, "accepts": ["plastic", "paper", "metal"]},
        {"name": "EcoCycle Centre", "address": "Model Town, Ludhiana, Punjab", "lat": 30.915, "lng": 75.831, "accepts": ["glass", "e-waste"]},
        {"name": "Punjab E-Waste Collection Point", "address": "Industrial Area A, Ludhiana, Punjab", "lat": 30.880, "lng": 75.870, "accepts": ["e-waste", "metal"]},
        {"name": "Organic Compost Yard", "address": "Sarabha Nagar, Ludhiana, Punjab", "lat": 30.895, "lng": 75.845, "accepts": ["organic"]},
    ])
