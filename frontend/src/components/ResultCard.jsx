import { useEffect, useRef } from "react";

const CATEGORY_COLOR = {
  plastic: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  paper: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  glass: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  metal: "bg-zinc-400/15 text-zinc-300 border-zinc-400/30",
  organic: "bg-accent/15 text-accent border-accent/30",
  "e-waste": "bg-red-500/15 text-red-300 border-red-500/30",
};

const IMPACT_PER_KG = {
  plastic: [1.5, 5.8],
  paper: [0.9, 4.0],
  glass: [0.3, 0.3],
  metal: [2.0, 9.0],
  organic: [0.5, 0.1],
  "e-waste": [3.5, 12.0],
};

export default function ResultCard({ result }) {
  const cardRef = useRef(null);
  const impactRef = useRef(null);

  useEffect(() => {
    if (!result) return;
    const card = cardRef.current;
    const impact = impactRef.current;
    if (!card || !impact) return;
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    impact.style.opacity = "0";
    impact.style.transform = "translateY(10px)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        setTimeout(() => {
          impact.style.transition = "opacity 0.45s ease, transform 0.45s ease";
          impact.style.opacity = "1";
          impact.style.transform = "translateY(0)";
        }, 300);
      });
    });
  }, [result]);

  if (!result) return null;

  const badgeClass = CATEGORY_COLOR[result.category] || "bg-white/10 text-white border-white/20";
  const [co2, kwh] = IMPACT_PER_KG[result.category] || [0.5, 1.0];

  return (
    <div ref={cardRef} className="border border-white/10 rounded-lg overflow-hidden bg-surface">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded border text-xs uppercase tracking-wide ${badgeClass}`}>
            {result.category}
          </span>
          {result.material_type && (
            <span className="text-sm text-white/60">{result.material_type}</span>
          )}
        </div>
        {typeof result.confidence === "number" && (
          <span className="text-xs text-white/40">
            confidence: {(result.confidence * 100).toFixed(1)}%
          </span>
        )}
      </div>
      {result.disposal_instructions && (
        <div className="px-5 py-4 border-b border-white/10">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-1.5">Disposal</div>
          <p className="text-sm text-white/80 leading-relaxed">{result.disposal_instructions}</p>
        </div>
      )}
      {result.recycling_method && (
        <div className="px-5 py-4 border-b border-white/10">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-1.5">Recycling method</div>
          <p className="text-sm text-white/80 leading-relaxed">{result.recycling_method}</p>
        </div>
      )}
      {result.material_composition && (
        <div className="px-5 py-4 border-b border-white/10">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Material composition</div>
          <div className="space-y-2">
            {Object.entries(result.material_composition).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2 text-xs">
                <span className="w-36 text-white/60 truncate">{k.replace(/_/g, " ")}</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded">
                  <div className="h-1.5 bg-accent rounded transition-all duration-700" style={{ width: `${v * 100}%` }} />
                </div>
                <span className="text-white/50 w-10 text-right">{Math.round(v * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div ref={impactRef} className="px-5 py-4">
        <div className="text-xs text-white/40 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          Environmental impact (est. per item)
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "kg CO2 saved", value: co2.toFixed(1), color: "text-accent" },
            { label: "kWh energy", value: kwh.toFixed(1), color: "text-cyan-400" },
            { label: "kg diverted", value: "1.0", color: "text-amber-400" },
          ].map((s) => (
            <div key={s.label} className="bg-background rounded-lg p-3 text-center">
              <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
