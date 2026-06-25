import { useRef, useState } from "react";
import { predictImage, predictText } from "../api.js";
import ResultCard from "../components/ResultCard.jsx";

const TABS = ["Upload Image", "Scan Camera", "Search Text"];

const CATEGORIES = [
  { name: "Plastic", color: "border-blue-500/40 bg-blue-500/10", desc: "Bottles, bags, containers, straws" },
  { name: "Paper", color: "border-amber-500/40 bg-amber-500/10", desc: "Newspaper, cardboard, envelopes" },
  { name: "Glass", color: "border-cyan-500/40 bg-cyan-500/10", desc: "Bottles, jars, windowpanes" },
  { name: "Metal", color: "border-zinc-400/40 bg-zinc-400/10", desc: "Cans, foil, scrap metal" },
  { name: "Organic", color: "border-green-500/40 bg-green-500/10", desc: "Food scraps, peels, garden waste" },
  { name: "E-Waste", color: "border-red-500/40 bg-red-500/10", desc: "Phones, batteries, chargers" },
];

const STEPS = [
  { number: "01", title: "Choose input", desc: "Upload a photo, scan with your camera, or describe the item in text." },
  { number: "02", title: "AI classifies", desc: "Our model identifies the waste category with confidence score." },
  { number: "03", title: "Get guidance", desc: "Receive disposal instructions, recycling method, and material breakdown." },
  { number: "04", title: "Track impact", desc: "Every classification logs to your environmental impact dashboard." },
];

export default function ClassifyPage() {
  const [tab, setTab] = useState(TABS[0]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState("");
  const videoRef = useRef(null);
  const classifyRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const data = await predictImage(file);
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setError("Camera access denied or unavailable.");
    }
  }

  function captureFrame() {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) handleFile(new File([blob], "capture.jpg", { type: "image/jpeg" }));
    }, "image/jpeg");
  }

  async function handleTextSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const data = await predictText(text);
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-white">
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accentDim/10 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 py-20 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            AI-powered waste classification
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-4 max-w-2xl">
            Classify waste.<br />
            <span className="text-accent">Protect the planet.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mb-8">
            Upload a photo or describe any item and our AI instantly tells you how to dispose of it correctly, and tracks your environmental impact.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => classifyRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 bg-accent text-background rounded font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Classify now
            </button>
            <button
              onClick={() => classifyRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 border border-white/20 rounded text-sm hover:border-accent hover:text-accent transition-colors"
            >
              See how it works
            </button>
          </div>
          <div className="flex gap-8 mt-12">
            {[["6", "Waste categories"], ["88%", "Text classifier accuracy"], ["4", "REST APIs"], ["Real-time", "predictions"]].map(([val, label]) => (
              <div key={label}>
                <div className="text-xl font-bold text-accent">{val}</div>
                <div className="text-xs text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 border-b border-white/10">
        <div className="text-xs text-accent uppercase tracking-widest mb-3">How it works</div>
        <h2 className="text-2xl font-bold mb-10">Four steps to smarter recycling</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div key={s.number} className="space-y-3">
              <div className="text-3xl font-bold text-accent/30">{s.number}</div>
              <div className="font-semibold text-sm">{s.title}</div>
              <div className="text-xs text-white/50 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 border-b border-white/10">
        <div className="text-xs text-accent uppercase tracking-widest mb-3">Categories</div>
        <h2 className="text-2xl font-bold mb-10">6 waste types we classify</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CATEGORIES.map((c) => (
            <div key={c.name} className={`border rounded-lg p-4 ${c.color} transition-all hover:scale-[1.02]`}>
              <div className="font-semibold text-sm mb-1">{c.name}</div>
              <div className="text-xs text-white/50">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div ref={classifyRef} className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div>
          <div className="text-xs text-accent uppercase tracking-widest mb-3">Classify</div>
          <h2 className="text-2xl font-bold">Try it now</h2>
          <p className="text-white/50 text-sm mt-1">Upload a photo, scan live, or describe the item in words.</p>
        </div>

        <div className="flex gap-2 border-b border-white/10">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); }}
              className={`px-4 py-2 text-sm border-b-2 -mb-px transition-colors ${
                tab === t ? "border-accent text-accent" : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Upload Image" && (
          <div className="border border-dashed border-white/20 rounded-lg p-10 text-center space-y-4 hover:border-accent/50 transition-colors">
            <input type="file" accept="image/*" id="file-input" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
            <label htmlFor="file-input" className="cursor-pointer text-accent text-sm underline block">Choose an image</label>
            <p className="text-white/30 text-xs">JPG, PNG supported</p>
            {preview && <img src={preview} alt="preview" className="max-h-64 mx-auto rounded border border-white/10" />}
          </div>
        )}

        {tab === "Scan Camera" && (
          <div className="space-y-4">
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black border border-white/10" />
            <div className="flex gap-3">
              <button onClick={startCamera} className="px-4 py-2 text-sm border border-white/20 rounded hover:border-accent">Start camera</button>
              <button onClick={captureFrame} className="px-4 py-2 text-sm bg-accent text-background rounded font-medium">Capture & classify</button>
            </div>
          </div>
        )}

        {tab === "Search Text" && (
          <form onSubmit={handleTextSubmit} className="flex gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. broken phone charger, banana peel..."
              className="flex-1 bg-surface border border-white/10 rounded px-4 py-2 text-sm focus:outline-none focus:border-accent"
            />
            <button type="submit" className="px-4 py-2 text-sm bg-accent text-background rounded font-medium">Classify</button>
          </form>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Classifying...
          </div>
        )}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <ResultCard result={result} />
      </div>
    </div>
  );
}
