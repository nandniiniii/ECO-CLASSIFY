import { useRef, useState } from "react";
import { predictImage, predictText } from "../api.js";
import ResultCard from "../components/ResultCard.jsx";

const TABS = ["Upload Image", "Scan Camera", "Search Text"];

export default function ClassifyPage() {
  const [tab, setTab] = useState(TABS[0]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

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
      streamRef.current = stream;
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
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Classify your waste</h1>
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
        <div className="border border-dashed border-white/20 rounded-lg p-10 text-center space-y-4">
          <input
            type="file"
            accept="image/*"
            id="file-input"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <label htmlFor="file-input" className="cursor-pointer text-accent text-sm underline">
            Choose an image
          </label>
          {preview && <img src={preview} alt="preview" className="max-h-64 mx-auto rounded" />}
        </div>
      )}

      {tab === "Scan Camera" && (
        <div className="space-y-4">
          <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg bg-black" />
          <div className="flex gap-3">
            <button onClick={startCamera} className="px-4 py-2 text-sm border border-white/20 rounded hover:border-accent">
              Start camera
            </button>
            <button onClick={captureFrame} className="px-4 py-2 text-sm bg-accent text-background rounded font-medium">
              Capture & classify
            </button>
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
          <button type="submit" className="px-4 py-2 text-sm bg-accent text-background rounded font-medium">
            Classify
          </button>
        </form>
      )}

      {loading && <p className="text-white/50 text-sm">Classifying...</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <ResultCard result={result} />
    </div>
  );
}
