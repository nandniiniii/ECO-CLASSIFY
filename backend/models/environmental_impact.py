"""
models/environmental_impact.py
Per-kg estimates of carbon and energy saved by recycling vs landfill,
sourced from typical EPA WARM model magnitudes (illustrative, not exact -
swap with a regression model trained on lifecycle-assessment data for
true production use).
"""

_IMPACT_PER_KG = {
    # category: (kg CO2e saved, kWh energy saved)
    "plastic": (1.5, 5.8),
    "paper": (0.9, 4.0),
    "glass": (0.3, 0.3),
    "metal": (2.0, 9.0),
    "organic": (0.5, 0.1),
    "e-waste": (3.5, 12.0),
}


def estimate_impact(category: str, weight_kg: float = 1.0) -> dict:
    co2, energy = _IMPACT_PER_KG.get(category, (0.5, 1.0))
    return {
        "carbon_saved_kg": round(co2 * weight_kg, 3),
        "energy_saved_kwh": round(energy * weight_kg, 3),
        "waste_diverted_kg": round(weight_kg, 3),
    }
