import { useEffect, useState } from "react";
import { getImpact } from "../api.js";

export default function ImpactPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getImpact().then(setData).catch((e) => setError(e.message));
  }, []);

  const stats = [
    { label: "Carbon saved", value: data?.totals?.carbon_saved_kg, unit: "kg CO2e" },
    { label: "Energy saved", value: data?.totals?.energy_saved_kwh, unit: "kWh" },
    { label: "Waste diverted", value: data?.totals?.waste_diverted_kg, unit: "kg" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Environmental impact</h1>
        <p className="text-white/50 text-sm mt-1">Aggregated across everything classified on this platform.</p>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-white/10 rounded-lg p-6 bg-surface">
            <div className="text-3xl font-bold text-accent">{s.value ?? "—"}</div>
            <div className="text-xs text-white/40 mt-1">{s.unit}</div>
            <div className="text-sm text-white/70 mt-2">{s.label}</div>
          </div>
        ))}
      </div>

      {data?.items_classified_by_category && Object.keys(data.items_classified_by_category).length > 0 && (
        <div className="border border-white/10 rounded-lg p-6 bg-surface space-y-3">
          <div className="text-sm text-white/60">Items classified by category</div>
          {Object.entries(data.items_classified_by_category).map(([cat, count]) => (
            <div key={cat} className="flex items-center gap-3 text-sm">
              <span className="w-24 capitalize text-white/70">{cat}</span>
              <div className="flex-1 h-2 bg-white/10 rounded">
                <div
                  className="h-2 bg-accent rounded"
                  style={{ width: `${Math.min(100, count * 10)}%` }}
                />
              </div>
              <span className="text-white/50 w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
