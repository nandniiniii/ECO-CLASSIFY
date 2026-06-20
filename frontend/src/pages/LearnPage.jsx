const TOPICS = [
  {
    title: "Plastic",
    body: "Identified by resin codes 1-7. PET and HDPE (codes 1, 2) are the most widely recycled. Always rinse before disposal to avoid contaminating a whole batch.",
  },
  {
    title: "Paper",
    body: "Recyclable up to ~5-7 times before fibers become too short. Keep dry and free of food grease, which is the #1 reason paper gets rejected at recycling facilities.",
  },
  {
    title: "Glass",
    body: "Infinitely recyclable without quality loss. Sort by color where possible (clear, green, brown) since mixed-color glass has fewer reuse options.",
  },
  {
    title: "Metal",
    body: "Aluminum recycling uses ~95% less energy than producing new aluminum from ore. Steel and aluminum are both fully recyclable indefinitely.",
  },
  {
    title: "Organic",
    body: "Composting organic waste avoids methane generation that happens when it's sent to landfill. A home compost bin can process most kitchen scraps.",
  },
  {
    title: "E-waste",
    body: "Contains both valuable recoverable metals and hazardous materials (lead, mercury). Never put it in household trash — use certified e-waste collection points.",
  },
];

export default function LearnPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Learn</h1>
        <p className="text-white/50 text-sm mt-1">Quick reference on how each waste category should be handled.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {TOPICS.map((t) => (
          <div key={t.title} className="border border-white/10 rounded-lg p-5 bg-surface">
            <h2 className="text-accent font-semibold mb-2">{t.title}</h2>
            <p className="text-sm text-white/70 leading-relaxed">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
