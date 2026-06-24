const TOPICS = [
  {
    name: "Plastic",
    emoji: "🧴",
    color: "border-blue-500/40",
    accent: "text-blue-300",
    body: "Identified by resin codes 1-7. PET (code 1) and HDPE (code 2) are the most widely recycled. Always rinse before disposal — food contamination is the number one reason plastic gets rejected at recycling facilities.",
    fact: "Only 9% of all plastic ever produced has been recycled.",
    tip: "Remove caps — they are often a different plastic type.",
  },
  {
    name: "Paper",
    emoji: "📄",
    color: "border-amber-500/40",
    accent: "text-amber-300",
    body: "Paper fibers can only be recycled 5-7 times before they become too short to bond. Keep paper dry and grease-free — a single greasy pizza box can contaminate an entire batch.",
    fact: "Recycling 1 ton of paper saves 17 trees and 7,000 gallons of water.",
    tip: "Shred sensitive documents before recycling — shredded paper is still recyclable.",
  },
  {
    name: "Glass",
    emoji: "🫙",
    color: "border-cyan-500/40",
    accent: "text-cyan-300",
    body: "Glass is infinitely recyclable without any loss of quality or purity. Sort by color where possible (clear, green, brown) since mixed-color glass has fewer reuse options.",
    fact: "A glass bottle takes 1 million years to decompose in a landfill.",
    tip: "Never mix ceramics, pyrex, or drinking glasses with bottle glass — they have different melting points.",
  },
  {
    name: "Metal",
    emoji: "🥫",
    color: "border-zinc-400/40",
    accent: "text-zinc-300",
    body: "Aluminum recycling uses 95% less energy than producing new aluminum from raw ore. Steel and aluminum are both fully recyclable indefinitely with no quality loss.",
    fact: "Recycling one aluminum can saves enough energy to run a TV for 3 hours.",
    tip: "Crush cans to save space, but keep them recognizable as metal containers.",
  },
  {
    name: "Organic",
    emoji: "🍌",
    color: "border-green-500/40",
    accent: "text-accent",
    body: "When organic waste goes to landfill it generates methane — a greenhouse gas 25x more potent than CO₂. Composting converts it into nutrient-rich soil instead.",
    fact: "Food waste is the single largest category of material in landfills.",
    tip: "A home compost bin can process most kitchen scraps in 2-3 months.",
  },
  {
    name: "E-Waste",
    emoji: "💻",
    color: "border-red-500/40",
    accent: "text-red-300",
    body: "E-waste contains both valuable recoverable metals (gold, silver, copper) and hazardous materials (lead, mercury, cadmium). Never put it in household trash — use certified e-waste collection points.",
    fact: "E-waste is the fastest growing waste stream in the world.",
    tip: "Wipe all personal data before dropping off any device at an e-waste centre.",
  },
];

export default function LearnPage() {
  return (
    <div className="text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-xs text-accent uppercase tracking-widest mb-3">Learn</div>
        <h1 className="text-3xl font-bold mb-2">Waste disposal guide</h1>
        <p className="text-white/50 text-sm mb-12">Everything you need to know about the 6 waste categories we classify.</p>

        <div className="space-y-6">
          {TOPICS.map((t) => (
            <div key={t.name} className={`border ${t.color} rounded-lg overflow-hidden bg-surface`}>
              <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
                <span className="text-2xl">{t.emoji}</span>
                <h2 className={`font-bold text-lg ${t.accent}`}>{t.name}</h2>
              </div>
              <div className="px-6 py-5 grid sm:grid-cols-3 gap-6">
                <div className="sm:col-span-2">
                  <p className="text-sm text-white/70 leading-relaxed mb-4">{t.body}</p>
                  <div className="flex items-start gap-2">
                    <span className="text-accent text-xs mt-0.5">→</span>
                    <p className="text-xs text-white/50 leading-relaxed"><span className="text-white/70">Tip:</span> {t.tip}</p>
                  </div>
                </div>
                <div className="bg-background rounded-lg p-4 flex flex-col justify-center">
                  <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Did you know</div>
                  <p className="text-xs text-white/70 leading-relaxed">{t.fact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
