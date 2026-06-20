const CATEGORY_COLOR = {
  plastic: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  paper: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  glass: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  metal: "bg-zinc-400/15 text-zinc-300 border-zinc-400/30",
  organic: "bg-accent/15 text-accent border-accent/30",
  "e-waste": "bg-red-500/15 text-red-300 border-red-500/30",
};

export default function ResultCard({ result }) {
  if (!result) return null;
  const badgeClass = CATEGORY_COLOR[result.category] || "bg-white/10 text-white border-white/20";

  return (
    <div className="border border-white/10 rounded-lg p-6 bg-surface space-y-4">
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded border text-xs uppercase tracking-wide ${badgeClass}`}>
          {result.category}
        </span>
        {typeof result.confidence === "number" && (
          <span className="text-xs text-white/50">
            confidence: {(result.confidence * 100).toFixed(1)}%
          </span>
        )}
      </div>

      {result.material_type && (
        <div className="text-sm text-white/70">
          Detected as: <span className="text-white">{result.material_type}</span>
        </div>
      )}

      {result.disposal_instructions && (
        <div>
          <div className="text-xs text-white/40 mb-1">Disposal</div>
          <p className="text-sm text-white/80">{result.disposal_instructions}</p>
        </div>
      )}

      {result.recycling_method && (
        <div>
          <div className="text-xs text-white/40 mb-1">Recycling method</div>
          <p className="text-sm text-white/80">{result.recycling_method}</p>
        </div>
      )}

      {result.material_composition && (
        <div>
          <div className="text-xs text-white/40 mb-2">Material composition</div>
          <div className="space-y-1.5">
            {Object.entries(result.material_composition).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2 text-xs">
                <span className="w-36 text-white/60 truncate">{k.replace(/_/g, " ")}</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded">
                  <div className="h-1.5 bg-accent rounded" style={{ width: `${v * 100}%` }} />
                </div>
                <span className="text-white/50 w-10 text-right">{Math.round(v * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
