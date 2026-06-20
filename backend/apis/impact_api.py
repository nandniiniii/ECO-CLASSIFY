from flask import Blueprint, request, jsonify
from models.environmental_impact import estimate_impact
from database.db import get_db, seed_recycling_centers
import math

impact_api = Blueprint("impact_api", __name__)
centers_api = Blueprint("centers_api", __name__)


@impact_api.route("/impact", methods=["GET"])
def get_impact():
    """
    Aggregates all logged predictions into total environmental impact.
    Optional query param: category to filter, weight_kg per item (default 1.0).
    """
    db = get_db()
    weight_kg = float(request.args.get("weight_kg", 1.0))

    totals = {"carbon_saved_kg": 0.0, "energy_saved_kwh": 0.0, "waste_diverted_kg": 0.0}
    breakdown = {}

    try:
        cursor = db.predictions.find({})
        for doc in cursor:
            cat = doc.get("category")
            impact = estimate_impact(cat, weight_kg)
            for k in totals:
                totals[k] += impact[k]
            breakdown[cat] = breakdown.get(cat, 0) + 1
    except Exception:
        pass  # if DB unreachable, return zeros rather than erroring

    totals = {k: round(v, 3) for k, v in totals.items()}

    return jsonify({
        "totals": totals,
        "items_classified_by_category": breakdown,
    }), 200


@centers_api.route("/centers", methods=["GET"])
def get_centers():
    """
    Returns nearby recycling centers. If lat/lng query params are given,
    sorts by approximate distance (haversine); otherwise returns all.
    """
    db = get_db()
    lat = request.args.get("lat", type=float)
    lng = request.args.get("lng", type=float)
    category = request.args.get("category")

    try:
        seed_recycling_centers()
        query = {"accepts": category} if category else {}
        centers = list(db.centers.find(query, {"_id": 0}))
    except Exception:
        return jsonify({"error": "Database unavailable. Make sure MongoDB is running (see README)."}), 503

    if lat is not None and lng is not None:
        def haversine_km(lat1, lng1, lat2, lng2):
            R = 6371
            p1, p2 = math.radians(lat1), math.radians(lat2)
            dphi = math.radians(lat2 - lat1)
            dlmb = math.radians(lng2 - lng1)
            a = math.sin(dphi / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dlmb / 2) ** 2
            return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

        for c in centers:
            c["distance_km"] = round(haversine_km(lat, lng, c["lat"], c["lng"]), 2)
        centers.sort(key=lambda c: c["distance_km"])
    else:
        for c in centers:
            c["distance_km"] = None

    return jsonify(centers), 200
